import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {RoomPage} from "../room/room";

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  user;
  rooms;
  constructor(private afAuth: AngularFireAuth,
              private afDB: AngularFireDatabase,
              public navCtrl: NavController, public navParams: NavParams) {
    // this.user = this.afAuth.auth.currentUser.email;
    this.rooms = this.afDB.list('/rooms');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  newRoom() {
    this.navCtrl.push(RoomPage, {'room': 'new'})
  }
  selectRoom(key) {
    this.navCtrl.push(RoomPage, {'room': key})
  }
  remove(key) {
    this.rooms.remove(key);
  }

}
