import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chat-footer',
  templateUrl: './chat-footer.component.html',
  styleUrls: ['./chat-footer.component.scss']
})
export class ChatFooterComponent implements OnInit {

    @Output() send = new EventEmitter();
    message: string;
    @ViewChild('textBox', {static: false}) textBox: ElementRef;

    constructor() { }

    ngOnInit(): void {
    }

    sendMessage() {
        if (this.message.trim() !== '' || this.message.trim().length !== 0 ) {
            this.send.emit(this.message.trim());
        }
        this.message = '';
    }


    resize() {
        this.textBox.nativeElement.style.height = '18px';
        this.textBox.nativeElement.style.height = this.textBox.nativeElement.scrollHeight + 'px';
    }
}
