import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilityService } from '../../../core/utility/utility.service';
import { CourseType } from '../../../models/course-type';
import { SessionInBoatLogin } from '../../../models/session-in-boat-login';
import { TrainerService } from './trainer.service';

@Component({
    selector   : 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls  : ['./trainer.component.scss']
})
export class TrainerComponent implements OnInit, OnDestroy {
    token: string;
    subs: Subject<any>;
    data: SessionInBoatLogin;
    form: FormGroup;
    inputsArray: string[];
    progressStatus = false;
    courseTypes: Observable<CourseType[]>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private trainerService: TrainerService,
                private snackBar: MatSnackBar) {
        this.token = route.snapshot.params.token;
        this.subs = new Subject<any>();
    }

    ngOnInit() {
        if (this.token) {
            this.trainerService.getData(this.token)
                .pipe(takeUntil(this.subs))
                .subscribe((res: SessionInBoatLogin) => {
                    this.data = res;
                    this.inputsArray = UtilityService.constructInputsArray(this.data.sib);
                    this.form = UtilityService.toFormGroup(this.inputsArray, this.data.sib);
                }, error1 => this.router.navigate(['/404']));

            this.courseTypes = this.trainerService.getCourseTypes();

        } else {
            this.router.navigate(['/404']);
        }
    }

    ngOnDestroy(): void {

    }

    /**
     * @description save changes to the api
     */
    onSubmit(): void {
        if (this.form.valid) {

            this.progressStatus = true;

            this.trainerService.saveData(this.data.sib.id, this.form.value, this.data.token).subscribe(value => {
                this.progressStatus = false;

                this.snackBar.open('Successfully Saved', 'Close', {
                    duration: 2000
                });
            }, error1 => this.progressStatus = false);
        }
    }

}
