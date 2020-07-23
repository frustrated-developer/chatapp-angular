import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';

import { FirebaseService } from './services/firebase.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    // var
    currentuserData: any = [];
    contactList;
    messages;
    finalChat = [];
    isFooter = false;
    reciever;
    chatId;

    constructor(
        private firebaseService: FirebaseService,
        private db: AngularFireDatabase,
        private localStorageService: LocalStorageService,
    ) {
    }

    ngOnInit(): void {
        this.currentuserData = this.localStorageService.getItem('user');
        this.getContactList();
    }


    getContactList() {
        this.updateUserStatus();
        this.firebaseService.getUserList().subscribe((response) => {
            this.contactList = response.filter((s: any) => s.username !== this.currentuserData.username);
        });
    }

    updateUserStatus() {
        this.firebaseService.updateOnlineStatus(this.currentuserData.docId, 'online');
    }

    getUserChat(event) {
        this.reciever = event;
        this.isFooter = true;
        this.chatId = this.getChatId(event.docId);
        const list = this.db.list<any>(`${this.chatId}/messages`).valueChanges();
        list.subscribe((response: any) => {
            this.messages = response;
            this.messages = response.map((s: any) => ({ ...s,
                date: moment(s.timestamp).format('MMMM DD'),
            }));
            this.arrangeMessageDateWise();
        });
    }

    sendMessage(event: any) {
        const date = new Date();
        const message = {
            senderId: this.currentuserData.docId,
            reciverId: this.reciever.docId,
            content: event,
            timestamp: date.getTime(),
        };
        this.firebaseService.sendMessage(this.chatId, message);
    }

    getChatId(recieverId) {
        let chatId = '';
        if (this.currentuserData.docId <= recieverId) {
            chatId = `${this.currentuserData.docId}-${recieverId}`;
        } else {
            chatId = `${recieverId}-${this.currentuserData.docId}`;
        }
        return chatId;
    }


    // arrange  messages data into date wise array
    arrangeMessageDateWise() {
        const chatMap = this.groupBy(this.messages, msg => msg.date);
        this.finalChat = [];
        chatMap.forEach((value, key) => {
            const item = {
                date: key,
                data: value
            };
            this.finalChat.push(item);
        });
    }

    // function / logic to group messages date wise.
    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }

    ngOnDestroy(): void {
        this.firebaseService.updateOnlineStatus(this.currentuserData.docId, 'offline');
    }
}
