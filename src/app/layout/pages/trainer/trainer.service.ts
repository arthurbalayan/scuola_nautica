import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BoatSession } from '../../../models/boat-session';
import { CourseType } from '../../../models/course-type';
import { SessionInBoatLogin } from '../../../models/session-in-boat-login';

const API_URL = 'sessioni-in-barca-login';

@Injectable()
export class TrainerService {

    constructor(private http: HttpClient) { }

    /**
     * @description POST to get data
     * @param token one time for requests
     */
    getData(token: string): Observable<SessionInBoatLogin> {
        return this.http.post<SessionInBoatLogin>(environment.apiUrl + API_URL, { token });
    }

    /**
     * @description GET course types
     */
    getCourseTypes(): Observable<CourseType[]> {
        return this.http.get<CourseType[]>(environment.apiUrl + 'tipi-corso');
    }

    /**
     * @description save changes
     * @param id of session
     * @param session new data
     * @param token in url
     */
    saveData(id: number, session, token: string): Observable<BoatSession> {
        const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
        return this.http.put<BoatSession>(environment.apiUrl + `sessioni-in-barca/${ id }`, session, { headers });
    }
}
