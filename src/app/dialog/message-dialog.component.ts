import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./progress.dialog.css']
})

export class MessageDialogComponent implements OnInit {
    title = 'Info';
    message = '';
    messages = [];
    hasActions = true;
    constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<MessageDialogComponent>) {
        this.title = data.title;
        this.message = data.message;
        this.messages = data.messages || [];
        this.hasActions = data.hasActions;
    }
    ngOnInit() { }
}
