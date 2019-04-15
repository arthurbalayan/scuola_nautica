import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilityService } from '../../../../core/utility/utility.service';
import { BoatSession } from '../../../../models/boat-session';
import { CourseType } from '../../../../models/course-type';
import { Student } from '../../../../models/student';
import { Trainer } from '../../../../models/trainer';
import { TrainersService } from '../../trainers/trainers.service';
import { BoatSessionService } from '../boat-session.service';

@Component({
    selector   : 'app-boat-session-edit',
    templateUrl: './boat-session-edit.component.html',
    styleUrls  : ['./boat-session-edit.component.scss']
})
export class BoatSessionEditComponent implements OnInit, OnDestroy {
    id: number;
    session: BoatSession;
    courseTypes: Observable<CourseType[]>;
    trainees: Student[];
    traineesPresent: Student[];
    trainers: Trainer[];
    form: FormGroup;
    inputsArray: string[];
    subs: Subject<any>;
    progressStatus = false;
    selected = [];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private sessionService: BoatSessionService,
                private trainersService: TrainersService,
                private snackBar: MatSnackBar) {
        this.id = +this.route.snapshot.params.id;
        this.subs = new Subject();

        trainersService.getTrainers()
            .pipe(takeUntil(this.subs))
            .subscribe(res => this.trainers = res);
        this.courseTypes = sessionService.getCourseTypes();
    }

    ngOnInit() {
        if (this.id) {
            this.sessionService.getSession(this.id)
                .pipe(takeUntil(this.subs))
                .subscribe((res: BoatSession) => {
                    this.session = res;
                    this.inputsArray = UtilityService.constructInputsArray(this.session);
                    this.form = UtilityService.toFormGroup(this.inputsArray, this.session);
                });

            this.sessionService.getSessionStudents(this.id)
                .pipe(takeUntil(this.subs))
                .subscribe(
                    res => {
                        this.trainees = res.prenotati;
                        this.traineesPresent = res.presenti;
                    },
                    error1 => {
                        this.snackBar.open('Oops something went wrong', 'Close', {
                            duration: 2000
                        });
                    });
        } else {
            this.inputsArray = UtilityService.constructInputsArray(new BoatSession());
            this.form = UtilityService.toFormGroup(this.inputsArray, this.session);

            this.sessionService.getStudents().subscribe(res => this.trainees = res);
        }
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

    /**
     * @description update data
     */
    onSubmit(): void {

        if (this.form.valid) {

            this.progressStatus = true;
            if (this.id) {
                const data = {
                    ...this.form.value,
                    prenotatiCount: undefined,
                    presentiCount : undefined
                };
                this.sessionService.updateSession(this.id, data)
                    .pipe(takeUntil(this.subs))
                    .subscribe(res => {
                        this.sessionService.saveSessionStudents(this.id,
                            {
                                prenotati: this.trainees.map(val => val.id),
                                presenti : this.selected.map(val => val.id)
                            })
                            .pipe(takeUntil(this.subs))
                            .subscribe(resp => {
                                this.sessionService.updateArray(this.id, {
                                    ...data,
                                    istruttoreNomeCognome: (this.trainers.filter(value => value.id === data.istruttoreId))[0].Nome + ' ' +
                                        (this.trainers.filter(value => value.id === data.istruttoreId))[0].Cognome,
                                    prenotatiCount       : this.trainees.length,
                                    presentiCount        : this.selected.length
                                });
                                this.progressStatus = false;
                                this.snackBar.open('Successfully Updated', 'Close', {
                                    duration: 2000
                                });
                                this.router.navigate([`../`], { relativeTo: this.route });
                            }, error1 => {
                                this.progressStatus = false;
                                this.snackBar.open('Can\'t Save Students', 'Close', {
                                    duration: 2000
                                });
                            });
                    }, error1 => {
                        this.progressStatus = false;
                        this.snackBar.open('Can\'t Save Data', 'Close', {
                            duration: 2000
                        });
                    });

            } else {
                this.sessionService.newSession(this.form.value).subscribe(res => {

                    this.sessionService.saveSessionStudents(res.id, {
                        prenotati: this.trainees.map(val => val.id),
                        presenti : this.trainees.map(val => val.id)
                    })
                        .pipe(takeUntil(this.subs))
                        .subscribe(resp => {
                            this.sessionService.pushToArray({
                                ...res,
                                istruttoreNomeCognome: (this.trainers.filter(value => value.id === res.istruttoreId))[0].Nome + ' ' +
                                    (this.trainers.filter(value => value.id === res.istruttoreId))[0].Cognome,
                                prenotatiCount       : this.trainees.length,
                                presentiCount        : this.selected.length
                            });

                            this.progressStatus = false;
                            this.snackBar.open('Successfully Created', 'Close', {
                                duration: 2000
                            });
                            this.router.navigate([`../`], { relativeTo: this.route });
                            setTimeout(() => {
                                this.router.navigate([`../`], { relativeTo: this.route });
                            }, 2000);
                        }, error1 => this.progressStatus = false);
                }, error1 => this.progressStatus = false);
            }
        }
    }

    /**
     * @description delete the session
     */
    onDelete() {
        if (this.id) {
            this.progressStatus = true;
            this.sessionService.deleteSession(this.id).subscribe(res => {
                this.progressStatus = false;

                this.snackBar.open('Successfully Deleted', 'Close', {
                    duration: 2000
                });
                this.router.navigate([`../`], { relativeTo: this.route });
            }, error1 => this.progressStatus = false);
        }
    }

    onSelect({ selected }) {
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {

    }

    add() {
        this.selected.push(this.trainees[1], this.trainees[3]);
    }

    update() {
        this.selected = [this.trainees[1], this.trainees[3]];
    }

    remove() {
        this.selected = [];
    }

    displayCheck(row) {
        return row.name !== 'Ethel Price';
    }
}
