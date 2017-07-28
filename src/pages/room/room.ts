import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2/database";
import {AngularFireAuth, AngularFireAuthModule} from "angularfire2/auth";

/**
 * Generated class for the RoomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  isOwner = false;
  reqParam;
  rooms: FirebaseListObservable<any>;
  room: FirebaseObjectObservable<any>;
  user;
  tmpPoint = [];
  playerPointer = 0;
  playerReview = 1;
  players = [];

  constructor(private afDB: AngularFireDatabase,
              private afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.user = this.afAuth.auth.currentUser.email;
    this.reqParam = this.navParams.get('room');
    this.rooms = this.afDB.list('/rooms');

    if (this.reqParam === 'new') {
        let newRoom = this.rooms.push(
            {
                'createdAt': new Date(),
                'owner': this.afAuth.auth.currentUser.email,
                'playerPointer': 0,
                'playerReview': 1
            }
        );
        this.room = this.afDB.object('/rooms/' + newRoom.key);
        this.playerInRooms('new');
        this.isOwner = true;

    } else {

        this.room = this.afDB.object('/rooms/' + this.reqParam);
        this.playerInRooms('exist');
    }
  }
  checkOwner(room) {
    if (room.owner === this.user) {
      this.isOwner = true;
    }
  }
  playerInRooms(status) {
    if (status === 'new') {
      this.room.update({players: [this.buildObjPlayer(this.user)]})
    } else {
      this.room.subscribe(
        r => {
          this.players = r.players;
          this.playerPointer = r.playerPointer;
          this.playerReview = r.playerReview;
          let index = r.players.map(p => p.email).indexOf(this.user);
          if (index === -1) {
            r.players.push(this.buildObjPlayer(this.user));
            this.room.update(r);
          } else {
            this.checkOwner(r);
          }
        }
      )
    }
  }


  buildObjPlayer(email) {
    return {
      'email': email,
      'score': 301,
      'historical': []
    }
  }

  changePoint(value) {
    this.tmpPoint.push(value);
  }
  confirmPoint() {
    var points = this.tmpPoint.reduce( (a,b) => {return a+b}, 0);
    var newVal;
    this.room.subscribe(
      r => {
        let indexOf = r.players.map(p => p.email).indexOf(this.players[this.playerPointer].email);
        r.players[indexOf].score -= points;
        newVal = r;
      }
    )
    this.room.update(newVal);
    this.changePlayer();
    this.tmpPoint = [];

  }
  deletePlayer(email) {
    var listOfPlayers;

    this.room.subscribe(
      r => {
        let indexOf = r.players.map(p => p.email).indexOf(email);
        r.players.splice(indexOf, 1);
        listOfPlayers = r;
      }
    )

    this.room.update(listOfPlayers);
  }
  newGame() {
    var changedRoom;
    this.room.subscribe(
      r => {
        for(let i = 0; i < r.players.length; i++) {
          r.players[i]['score'] = 301;
        }
        changedRoom = r;
      }
    )
    this.room.update(changedRoom);
    this.playerPointer = 0;
  }
  changePlayer() {
      var currentPointer = this.playerPointer;
      if    (this.playerPointer < this.players.length -1 ) {
          this.playerPointer++;
      } else {
          this.playerPointer = 0;
      }
      this.playerReview = currentPointer;
      var tmpRoom;
      this.room.subscribe(
          r => {
              r.playerPointer = this.playerPointer;
              r.playerReview = this.playerReview;
              tmpRoom = r;
          }
      )
      this.room.update(tmpRoom);
  }

}
