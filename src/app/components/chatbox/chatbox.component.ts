import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.component.html',
    styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnChanges, AfterViewInit {

    @Input() messages: any;
    @Input() chatId: any;
    @Input() reciever: any;
    @Output() send = new EventEmitter();
    @Input() isFooter;
    currentUser;
    message: string;
    scrollPosition;
    showFab = false;
    @ViewChild('chatWrapper', {static: false}) chatWrapper: ElementRef;

    constructor(private localStorageService: LocalStorageService) { }

    ngOnInit(): void {
        this.currentUser = this.localStorageService.getItem('user');
    }

    ngOnChanges(): void {
        this.scrollPosition = 0;
        setTimeout(() => {
            this.scrollToBottom();
        }, 100);
    }

    ngAfterViewInit() {
    }

    scrollChat(event) {
        // console.log(event);
    }

    redirectTo(url) {
        window.open(url, '_blank');
    }

    scrollEvent(event) {
        let scrollTop = this.chatWrapper.nativeElement.scrollTop;
        if (this.scrollPosition - scrollTop > 150) {
            this.showFab = true;
        } else {
            this.showFab = false;
        }
    }

    scrollToBottom() {
        this.chatWrapper.nativeElement.scrollTop = this.chatWrapper.nativeElement.scrollHeight;
        this.scrollPosition = this.chatWrapper.nativeElement.scrollTop;
    }


}
