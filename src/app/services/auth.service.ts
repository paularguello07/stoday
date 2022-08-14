import { inject, Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User, UserInfo } from '@firebase/auth';
import { Observable, Subject } from 'rxjs';
import firebase from 'firebase/compat';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { switchMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAccessSubject = new Subject();
  user$: Observable<User> | undefined;
  constructor(private firestore: AngularFirestore,private afauth: AngularFireAuth) {
    
  }


  async register(name:string, email: string, password: string) {
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred);
        this.firestore.collection('users')
        .doc(cred.user?.uid)
        .set({
          display_name:name,
          email:email,
          password:password
        })
        .then(() => {
          console.log('User added!');
        });
    })
    } catch (err) {
      console.log("error en login: ", err);
      alert("Hola Mundo!")
      return null;
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log("error en login: ", err);
      alert("Hola Mundo!")
      return null;
    }
  }

  getUserLogged(): Promise<any> {
    return this.afauth.authState.pipe(first()).toPromise()
}
  logout() {
    this.afauth.signOut();
  }


}