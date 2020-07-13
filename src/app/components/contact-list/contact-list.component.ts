import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    @Input() list;
    @Output() clickUser = new EventEmitter();
    contactList = [];
    constructor() { }

    ngOnInit(): void {

        this.contactList = [
            { name: 'User 1', id: '2' },
            { name: 'User 2', id: '3'}
        ];
    }

    getUserChat(id: any) {
        this.clickUser.emit(id);
    }

}
