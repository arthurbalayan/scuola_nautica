import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainersService } from './trainers.service';
import { Subscription } from 'rxjs';
import { Trainer } from '../../../models/trainer';
import { TRAINERS_COLUMNS } from '../../../constants/columns';

@Component({
    selector   : 'app-trainers',
    templateUrl: './trainers.component.html',
    styleUrls  : ['./trainers.component.scss']
})
export class TrainersComponent implements OnInit, OnDestroy {
    rows: Trainer[]; // rows for datatable
    columns; // columns from COLUMNS const
    subs: Subscription;
    title: string;

    constructor(private trainersService: TrainersService,
                private route: ActivatedRoute) {
        this.columns = TRAINERS_COLUMNS;
        route.data.subscribe(data => this.title = data.title);
    }

    ngOnInit() {
        this.subs = this.trainersService.getTrainers().subscribe(res => this.rows = res);
    }

    ngOnDestroy(): void {
        if (this.subs) {
            this.subs.unsubscribe();
        }
    }
}
