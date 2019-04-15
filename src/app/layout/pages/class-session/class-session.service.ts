import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { StateService } from '../../../core/state/state.service';
import { ClassSession } from '../../../models/class-session';
import { Student } from '../../../models/student';
import { TraineesService } from '../trainees/trainees.service';

const API_URL = 'sessioni-in-aula';

@Injectable()
export class ClassSessionService {

    constructor(private http: HttpClient,
                private state: StateService,
                private traineesService: TraineesService) {
    }

    /**
     * @description GET all sessions
     */
    getSessions(): Observable<ClassSession[]> {
        return this.state.state[API_URL] ? of(this.state.state[API_URL])
                                         :
               this.http.get<ClassSession[]>(environment.apiUrl + API_URL)
                   .pipe(tap(val => this.state.state = Object.assign({}, ...this.state.state, { [API_URL]: val })));
    }

    /**
     * @description GET sessions students
     * @param id of session
     */
    getSessionStudents(id: number): Observable<Student[]> {
        return this.http.get<Student[]>(environment.apiUrl + API_URL + `/${ id }/allievi`);
    }

    /**
     * @description POST create new session
     * @param session new session
     */
    newSession(session: ClassSession): Observable<ClassSession> {
        return this.http.post<ClassSession>(environment.apiUrl + API_URL, session)
            .pipe(tap(val => {
                this.pushToArray(val);
            }));
    }

    /**
     * @description GET session data
     * @param id of session
     */
    getSession(id: number): Observable<ClassSession> {
        return this.http.get<ClassSession>(environment.apiUrl + API_URL + `/${ id }`);
    }

    /**
     * @description PUT update session
     * @param id of sesion
     * @param session new data
     */
    updateSession(id: number, session: ClassSession): Observable<ClassSession> {
        return this.http.put<ClassSession>(environment.apiUrl + API_URL + `/${ id }`, session)
            .pipe(tap(value => this.updateArray(value.id, value)));
    }

    /**
     * @description DELETE session
     * @param id of session
     */
    deleteSession(id: number): Observable<null> {
        return this.http.delete<null>(environment.apiUrl + API_URL + `/${ id }`)
            .pipe(tap(value => this.deleteArrayItem(id)));
    }

    /**
     * @description POST request to save
     * @param id of session
     * @param students array of students ids
     */
    saveSessionStudents(id: number, students: number[]): Observable<any> {
        return this.http.post(environment.apiUrl + API_URL + `/${ id }/allievi`, students);
    }

    /**
     * @description GET All students from server
     */
    getStudents(): Observable<Student[]> {
        return this.traineesService.getStudents();
    }

    /**
     * @description update array of sessions
     * @param id of session
     * @param session new session
     */
    updateArray(id: number, session: ClassSession): void {
        const data = this.state.state[API_URL];
        if (data) {
            this.state.state = Object.assign({}, ...this.state.state, {
                [API_URL]: data.map(value => value.id === id ? { id, ...session } : value)
            });
        }
    }

    /**
     * @description push to array of sessions
     * @param session new
     */
    pushToArray(session: ClassSession): void {
        const data = this.state.state[API_URL];
        if (data) {
            data.push(session);
            this.state.state = Object.assign({}, ...this.state.state, { [API_URL]: data });
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
            this.state.state = Object.assign({}, ...this.state.state, { [API_URL]: data });
        }
    }
}
