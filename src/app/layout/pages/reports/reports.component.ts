import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllieviReport } from '../../../models/allievi-report';
import { TraineesService } from '../trainees/trainees.service';
import { ReportsService } from './reports.service';

@Component({
    selector   : 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls  : ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    title: string;
    data: any;
    fakeData = [
        {
            name : 'Germany',
            value: 8940000
        },
        {
            name : 'USA',
            value: 5000000
        }
    ];

    constructor(private route: ActivatedRoute,
                private reportsService: ReportsService,
                private traineesService: TraineesService) {
        this.route.params.subscribe(value => console.log(value));
        this.route.data.subscribe(value => this.title = value.title);
    }

    ngOnInit() {
        this.traineesService.getStudents().subscribe(value => {
            this.reportsService.getReports(value.map(val => val.id))
                .subscribe((value1: AllieviReport[]) => {
                    console.log(value1);
                    this.data = value1;
                });
        });
    }
}
