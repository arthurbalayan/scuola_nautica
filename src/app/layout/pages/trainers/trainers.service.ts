import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StateService } from '../../../core/state/state.service';
import { Trainer } from '../../../models/trainer';

const API_URL = 'istruttori';

@Injectable({ providedIn: 'root' })
export class TrainersService {

    constructor(private http: HttpClient,
                private state: StateService) {
    }

    /**
     * @description GET request for all trainers
     * @return Observable of trainers
     */
    getTrainers(): Observable<Trainer[]> {
        return this.state.state[API_URL] ? of(this.state.state[API_URL])
                                         :
               this.http.get<Trainer[]>(environment.apiUrl + API_URL).pipe(tap(val => this.state.state[API_URL] = val));
    }
}
