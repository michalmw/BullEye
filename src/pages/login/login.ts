import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {DashboardPage} from "../dashboard/dashboard";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {
    this.afAuth.auth.signInWithEmailAndPassword(this.username.value, this.password.value).then(
      (user) => {
        this.navCtrl.setRoot(DashboardPage);
      }
    ).catch( (err) => {
      let alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: err.message,
        buttons: ['OK']
      });
      alert.present();
    })

  }

}
