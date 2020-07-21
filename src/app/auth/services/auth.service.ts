import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private afs: AngularFirestore,
        private localStorageService: LocalStorageService,
        private router: Router
        ) {
    }


    login(data: any) {
        return this.afs.collection('users', ref => ref.where('username', '==', data.username)).get();
    }

    public singup(data: any) {
        return this.afs.collection('users', ref => ref.where('username', '==', data.username)).get();
    }

    insertUser(data: any) {
        return this.afs.collection('users').add({...data});
    }

    logout() {
        this.localStorageService.clearAll();
        this.router.navigate(['auth']);
    }

}
