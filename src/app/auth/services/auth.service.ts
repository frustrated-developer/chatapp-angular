import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as fierbase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private db: AngularFireDatabase) {
    }


    login(data: any) {
        const username = data.username;
        return this.db.list('users').valueChanges().pipe(map(actions => {
            return actions.map((action: any) => {
                if (action.username === username) {
                    data.status = true;
                    data.data = action;
                }
                return data;
            });
        }));
    }

    public singup(data: any) {
        return this.db.list('users', ref => ref.orderByChild('username').equalTo(data.username)).query.once('value');
    }

    insertUser(data: any) {
        return this.db.list('users').push(data);
    }

}
