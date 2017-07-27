import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./firebase.config";
import {HomePage} from "../pages/home/home";
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {AngularFireAuthModule} from "angularfire2/auth";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {RoomPage} from "../pages/room/room";

@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    HomePage,
    RoomPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    RoomPage,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
