// modules
import { ChatRoutingModule } from './chat-routing.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { NgModule } from '@angular/core';

// components
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ChatComponent } from './chat.component';
import { ChatFooterComponent } from './components/chat-footer/chat-footer.component';
import { ChatHeaderComponent } from './components/chat-header/chat-header.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';

// services
import { DateFormatPipe } from '../shared/services/date-format.pipe';


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
