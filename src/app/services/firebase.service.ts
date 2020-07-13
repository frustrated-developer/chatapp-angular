import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db: AngularFireDatabase) {
    }



    getUserList() {
        return this.db.list('users').valueChanges();
    }


    sendMessage(chatId: string, messageData: any) {
        return this.db.list(`messages/${chatId}`).push({...messageData});
    }

}
