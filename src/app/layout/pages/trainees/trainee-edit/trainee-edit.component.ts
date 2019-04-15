import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/student';

@Component({
    selector: 'app-trainee-edit',
    templateUrl: './trainee-edit.component.html',
    styleUrls: ['./trainee-edit.component.scss']
})
export class TraineeEditComponent implements OnInit {
    traine: Student;
    component = 'allievi';

    constructor() {
        this.traine = new Student();
    }

    ngOnInit() {

    }
}
