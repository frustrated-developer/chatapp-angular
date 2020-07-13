import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ContactListComponent } from '../components/contact-list/contact-list.component';
import { ChatboxComponent } from '../components/chatbox/chatbox.component';
import { MaterialModule } from '../shared/material.module';
import { DateFormatPipe } from '../services/date-format.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatHeaderComponent } from '../components/chat-header/chat-header.component';
import { ChatFooterComponent } from '../components/chat-footer/chat-footer.component';


@NgModule({
    declarations: [
        ChatComponent,
        ContactListComponent,
        ChatboxComponent,
        DateFormatPipe,
        ChatHeaderComponent,
        ChatFooterComponent
    ],
    imports: [
        CommonModule,
        ChatRoutingModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ChatModule { }
