import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../../../models/student';
import { TraineesService } from './trainees.service';
import { TRAINEES_COLUMNS } from '../../../constants/columns';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-trainees',
    templateUrl: './trainees.component.html',
    styleUrls: ['./trainees.component.scss']
})
export class TraineesComponent implements OnInit, OnDestroy {

    rows: Student[]; // rows for datatable
    columns; // columns from COLUMNS const
    subs: Subscription;
    title: string;

    constructor(private traineesService: TraineesService, private route: ActivatedRoute) {
        this.columns = TRAINEES_COLUMNS;
        route.data.subscribe(data => this.title = data.title);
    }

    ngOnInit() {
        this.subs = this.traineesService.getStudents().subscribe(res => {
            this.rows = res;
        });
    }

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
