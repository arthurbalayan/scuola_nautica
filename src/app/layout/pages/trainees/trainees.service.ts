import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StateService } from '../../../core/state/state.service';
import { Student } from '../../../models/student';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs/operators';

const API_URL = 'allievi';

@Injectable({ providedIn: 'root' })
export class TraineesService {

    constructor(private http: HttpClient,
                private state: StateService) {
    }

    /**
     * @description GET All students from server
     */
    getStudents(): Observable<Student[]> {
        return this.state.state[API_URL] ? of(this.state.state[API_URL])
                                         :
               this.http.get<Student[]>(environment.apiUrl + API_URL).pipe(tap(val => this.state.state[API_URL] = val));
    }
}
