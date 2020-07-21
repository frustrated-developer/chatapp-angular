import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    @Input() list;
    @Output() clickUser = new EventEmitter();

    currentUser;
    constructor(private authService: AuthService, private localStorageService: LocalStorageService) {
        this.currentUser = this.localStorageService.getItem('user');
        this.currentUser.status = 'online';
    }

    ngOnInit(): void {
    }

    getUserChat(id: any) {
        this.clickUser.emit(id);
    }

    logout(){
        this.authService.logout();
    }

}
