import { AngularFirestore } from 'angularfire2/firestore';
import {  AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private db: AngularFireDatabase, private afs: AngularFirestore) {
    }

    getUserList() {
        return this.afs.collection('users').snapshotChanges().pipe(map(actions => {
            return actions.map(action => {
                const data: any = action.payload.doc.data();
                data.docId = action.payload.doc.id;
                return data;
            });
        }));
    }


    sendMessage(chatId: string, messageData: any) {
        return this.db.list(`${chatId}/messages`).push({...messageData});
    }

    updateOnlineStatus(docId: string, status: string) {
        return this.afs.collection('users').doc(docId).update({status});
    }
}
