import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ClassSession } from '../../../../models/class-session';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ClassSessionService } from '../class-session.service';
import { takeUntil } from 'rxjs/operators';
import { Student } from '../../../../models/student';
import { UtilityService } from '../../../../core/utility/utility.service';

@Component({
    selector   : 'app-class-session-edit',
    templateUrl: './class-session-edit.component.html',
    styleUrls  : ['./class-session-edit.component.scss']
})
export class ClassSessionEditComponent implements OnInit, OnDestroy {
    id: number;
    session: ClassSession;
    trainees: Student[];
    form: FormGroup;
    inputsArray: string[];
    subs: Subject<any>;
    progressStatus = false;
    selected = [];
    selectedStudents = new FormControl();

    constructor(private route: ActivatedRoute,
                private router: Router,
                private sessionService: ClassSessionService,
                private snackBar: MatSnackBar) {
        this.id = +this.route.snapshot.params.id;
        this.subs = new Subject();
    }

    ngOnInit() {
        if (this.id) {
            this.sessionService.getSession(this.id)
                .pipe(takeUntil(this.subs))
                .subscribe((res: ClassSession) => {
                    this.session = res;
                    this.inputsArray = UtilityService.constructInputsArray(this.session);
                    this.form = UtilityService.toFormGroup(this.inputsArray, this.session);
                });

            this.sessionService.getSessionStudents(this.id)
                .pipe(takeUntil(this.subs))
                .subscribe(
                    res => this.trainees = res,
                    error1 => {
                        this.snackBar.open('Oops something went wrong', 'Close', {
                            duration: 2000
                        });
                    });
        } else {
            this.inputsArray = UtilityService.constructInputsArray(new ClassSession());
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
                this.sessionService.updateSession(this.id, {...this.form.value, allieviCount: undefined})
                    .pipe(takeUntil(this.subs))
                    .subscribe(res => {

                        this.sessionService.saveSessionStudents(this.id, this.selected.map(val => val.id))
                            .pipe(takeUntil(this.subs))
                            .subscribe(resp => {
                                this.progressStatus = false;
                                this.snackBar.open('Successfully Updated', 'Close', {
                                    duration: 2000
                                });
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
                    this.progressStatus = false;
                    this.sessionService.saveSessionStudents(res.id, this.selectedStudents.value.map(val => val.id))
                        .pipe(takeUntil(this.subs))
                        .subscribe(resp => {
                            this.progressStatus = false;
                            this.snackBar.open('Successfully Created', 'Close', {
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.router.navigate([`../`], { relativeTo: this.route });
                            }, 2000);
                        });
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
