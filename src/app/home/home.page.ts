/**
* Ionic 4 Firebase Email Auth
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;
  email: string = '';
  password: string = '';
  username: string = '';
  image: number;
  phone: number;
  error: string;
  userWantsToSignup: boolean = false;
  linkError: string = '';
  constructor(private toastController: ToastController, public loadingController: LoadingController, private fireauth: AngularFireAuth, private router: Router) { }


  ionViewDidEnter() {
    this.fireauth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    })
  }

  updateEmail() {
    this.user.updateEmail(this.email)
      .then(() => {
        this.email = '';
        this.presentToast('Email updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateUsername() {
    this.user.updateProfile({
      displayName: this.username
    })
      .then((data) => {
        console.log(data);
        this.username = '';
        this.presentToast('Username updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateImage() {

    this.user.updateProfile({
      photoURL: `https://picsum.photos/id/${this.image}/200/200`
    })
      .then((data) => {
        console.log(data);
        this.image = null;
        this.presentToast('Image updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updatePassword() {
    this.user.updatePassword(this.password)
      .then(() => {
        this.password = '';
        this.presentToast('Password updated', false, 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  logout() {
    this.fireauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }

  async presentToast(message, show_button, position, duration) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: show_button,
      position: position,
      duration: duration
    });
    toast.present();
  }
}
