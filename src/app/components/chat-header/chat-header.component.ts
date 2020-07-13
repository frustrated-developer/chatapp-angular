import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss']
})
export class ChatHeaderComponent implements OnInit {

    @Input() isFooter;
    @Input() reciever;
    constructor() { }

    ngOnInit(): void {
    }

}
