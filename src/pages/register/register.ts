import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public alertCtrl: AlertController,
              public afDB: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signIn() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.username.value, this.password.value).then(
      (user) => {
        console.log('Return ', user);
        let users = this.afDB.list('/users');
        users.push({
          'email': this.username.value
        });
      }
    ).catch(
      (err) => {
        let alert = this.alertCtrl.create({
          title: 'Register Error',
          subTitle: err.message,
          buttons: ['OK']
        });
        alert.present();
      }
    )
    // console.log(`Zarejestruj dla storny ${this.username.value}, ${this.password.value}`);
  }

}
