import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StateService } from '../../../core/state/state.service';
import { BoatSession } from '../../../models/boat-session';
import { BoatSessionStudents } from '../../../models/boat-session-students';
import { CourseType } from '../../../models/course-type';
import { Student } from '../../../models/student';
import { TraineesService } from '../trainees/trainees.service';

const API_URL = 'sessioni-in-barca'; // Global api url part

@Injectable()
export class BoatSessionService {

    constructor(private http: HttpClient,
                private state: StateService,
                private traineesService: TraineesService) {
    }

    /**
     * @description GET request to All boat sessions
     */
    getSessions(): Observable<BoatSession[]> {
        return this.state.state[API_URL] ? of(this.state.state[API_URL])
                                         :
               this.http.get<BoatSession[]>(environment.apiUrl + API_URL)
                   .pipe(tap(val => this.state.state = Object.assign({}, ...this.state.state, { [API_URL]: val })));
    }

    /**
     * @description GET request to get sessions students
     * @param id of the session
     */
    getSessionStudents(id: number): Observable<BoatSessionStudents> {
        return this.http.get<BoatSessionStudents>(environment.apiUrl + API_URL + `/${ id }/allievi`);
    }

    /**
     * @description GET request to get session data
     * @param id of the session
     */
    getSession(id: number): Observable<BoatSession> {
        return this.http.get<BoatSession>(environment.apiUrl + API_URL + `/${ id }`);
    }

    /**
     * @description POST create new session
     * @param session new session
     */
    newSession(session: BoatSession): Observable<BoatSession> {
        return this.http.post<BoatSession>(environment.apiUrl + API_URL, session);
    }

    /**
     * @description PUT update session
     * @param id of session
     * @param session new data
     */
    updateSession(id: number, session: BoatSession): Observable<BoatSession> {
        return this.http.put<BoatSession>(environment.apiUrl + API_URL + `/${ id }`, session);
    }

    /**
     * @description DELETE session
     * @param id of session
     */
    deleteSession(id: number): Observable<null> {
        return this.http.delete<null>(environment.apiUrl + API_URL + `/${ id }`)
            .pipe(tap(val => {
                this.deleteArrayItem(id);
            }));
    }

    /**
     * @description POST request to save
     * @param id of session
     * @param students array of students ids
     */
    saveSessionStudents(id: number, students: { prenotati: number[], presenti: number[] }): Observable<any> {
        return this.http.post(environment.apiUrl + API_URL + `/${ id }/allievi`, students);
    }

    /**
     * @description GET All students from server
     */
    getStudents(): Observable<Student[]> {
        return this.traineesService.getStudents();
    }

    /**
     * @description push to array of sessions
     * @param session new
     */
    pushToArray(session: any): void {
        const data = this.state.state[API_URL];
        if (data) {
            data.push(session);
            this.state.state[API_URL] = data;
        }
    }

    /**
     * @description update array
     * @param id of session
     * @param session new
     */
    updateArray(id: number, session: BoatSession): void {
        const data = this.state.state[API_URL];
        if (data) {
            this.state.state[API_URL] = data.map(value => value.id === id ? { id, ...session } : value);
        }
    }

    /**
     * @description delete array item
     * @param id of session
     */
    deleteArrayItem(id: number): void {
        const data = this.state.state[API_URL];
        let index;
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === id) {
                    index = i;
                }
            }
            data.splice(index, 1);
            this.state.state[API_URL] = data;
        }
    }

    /**
     * @description GET course types
     */
    getCourseTypes(): Observable<CourseType[]> {
        return this.http.get<CourseType[]>(environment.apiUrl + 'tipi-corso');
    }
}
