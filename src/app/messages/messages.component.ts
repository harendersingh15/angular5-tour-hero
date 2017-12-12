import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { MessageService } from '../message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: [],
    // inputs:[ 'greet', 'greetmessage']
})

export class MessagesComponent implements OnInit {

    constructor(private messageService: MessageService) { }

    @Input() greet: string | number;
    @Input() greetMessage: string;
    @Output() message = new EventEmitter<any>();

    ngOnInit() {
        this.getGreet();
    }

    // ngOnChanges(changes:  SimpleChange) {

    //      console.log(changes);
    //     // for (let chg in changes) {
    //     //     let chng = changes[chg];
    //     //     let cur  = JSON.stringify(chng.currentValue);
    //     //     let prev = JSON.stringify(chng.previousValue);
    //     //    // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    //     // }

    // }

    getGreet() {
        console.log(new Date());

        debounceTime(500);
        console.log(new Date());
      //  alert(`greet is = ${this.greet}`);
        this.message.emit({ 'id': 1, 'name': 'harender' });
    }

}
