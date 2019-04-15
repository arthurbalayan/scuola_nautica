import { Component, OnInit } from '@angular/core';
import { Trainer } from '../../../../models/trainer';

@Component({
    selector   : 'app-trainer-edit',
    templateUrl: './trainer-edit.component.html',
    styleUrls  : ['./trainer-edit.component.scss']
})
export class TrainerEditComponent implements OnInit {
    trainer: Trainer;
    component = 'istruttori';

    constructor() {
        this.trainer = new Trainer();
    }

    ngOnInit() {

    }
}
