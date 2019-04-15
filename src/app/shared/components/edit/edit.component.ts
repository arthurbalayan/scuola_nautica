import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressbarConfig } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StateService } from '../../../core/state/state.service';
import { UtilityService } from '../../../core/utility/utility.service';

export function getProgressbarConfig(): ProgressbarConfig {
    return Object.assign(new ProgressbarConfig(), { animate: true, striped: true, max: 100 });
}

@Component({
    selector   : 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls  : ['./edit.component.scss'],
    providers  : [{ provide: ProgressbarConfig, useFactory: getProgressbarConfig }]
})
export class EditComponent<T> implements OnInit, OnDestroy {
    id: number | undefined;
    data: T;
    form: FormGroup;
    inputsArray: string[];
    subs: Subject<any>;
    progressStatus = false;

    @Input() component: string;
    @Input() obj: T;

    constructor(private http: HttpClient,
                private snackBar: MatSnackBar,
                private router: Router,
                private route: ActivatedRoute,
                private state: StateService) {

        this.id = +this.route.snapshot.params.id;
        this.subs = new Subject<any>();
    }

    ngOnInit() {
        if (this.id) {
            this.http.get<T>(environment.apiUrl + this.component + `/${ this.id }`)
                .pipe(takeUntil(this.subs))
                .subscribe((res: T) => {
                    this.data = res;
                    this.inputsArray = UtilityService.constructInputsArray(this.data);
                    this.form = UtilityService.toFormGroup(this.inputsArray, this.data);
                });
        } else {
            this.inputsArray = UtilityService.constructInputsArray(this.obj);
            this.form = UtilityService.toFormGroup(this.inputsArray, this.data);
        }
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

    /**
     * @description save changes to the api
     */
    onSubmit(): void {
        if (this.form.valid) {

            this.progressStatus = true;
            if (this.id) {
                this.http.put<T>(environment.apiUrl + this.component + `/${ this.id }`, this.form.value)
                    .pipe(takeUntil(this.subs))
                    .subscribe(res => {
                        this.progressStatus = false;
                        this.updateArray(this.component, this.id, { ...this.form.value, id: this.id });
                        this.snackBar.open('Successfully Updated', 'Close', {
                            duration: 2000
                        });
                    }, error1 => this.progressStatus = false);
            } else {
                this.http.post<T>(environment.apiUrl + this.component, this.form.value)
                    .pipe(takeUntil(this.subs))
                    .subscribe(res => {
                        this.progressStatus = false;
                        this.pushToArray(res);
                        this.snackBar.open('Successfully Created', 'Close', {
                            duration: 2000
                        });
                        setTimeout(() => {
                            this.router.navigate([`../`], { relativeTo: this.route });
                        }, 2000);
                    }, error1 => this.progressStatus = false);
            }
        }
    }

    /**
     * @description delete student
     */
    onDelete(): void {
        if (this.id) {
            this.progressStatus = true;

            this.http.delete(environment.apiUrl + this.component + `/${ this.id }`)
                .pipe(takeUntil(this.subs))
                .subscribe(res => {
                    this.progressStatus = false;

                    this.state.state[this.component] = this.deleteArrayElement(this.state.state[this.component], this.id);

                    this.snackBar.open('Successfully Deleted', 'Close', {
                        duration: 2000
                    });
                    setTimeout(() => {
                        this.router.navigate([`../`], { relativeTo: this.route });
                    }, 2000);
                }, error1 => this.progressStatus = false);
        }
    }

    /**
     * @description update the array by id in session storage
     * @param component the name of array
     * @param id of the array index
     * @param newData of the index
     */
    updateArray(component: string, id: number, newData: T): void {
        const arr = this.state.state[component];
        if (arr) {
            this.state.state[component] = arr.map(value => value.id === id ? newData : value);
        }
    }

    /**
     * @description push to array in state
     * @param item in the array
     */
    pushToArray(item: any): void {
        const newArr = this.state.state[this.component];
        newArr.push(item);
        this.state.state[this.component] = newArr;
    }

    /**
     * @description delet array element
     * @param arr in storage
     * @param id of the element
     */
    deleteArrayElement(arr: any[], id: number): any[] {
        let index;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                index = i;
            }
        }
        arr.splice(index, 1);
        return arr;
    }
}
