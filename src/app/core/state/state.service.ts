import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StateService {
    state: any = {};
    state$ = new Subject<any>();

    constructor() { }

    getState(): Observable<any> {
        return this.state$.asObservable().pipe(map(value => this.state = Object.assign({}, ...this.state, ...value)));
    }
}
