import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Student } from '../../../models/student';

@Injectable()
export class NgxdatatableService {

    constructor(private http: HttpClient) { }

    /**
     * @description get students list
     * @param url sessioni-in-barca or sessioni-in-aula
     * @param id of session
     */
    getStudents(url: string, id: number): Observable<Array<Student[]>> {
        return this.http.get<Array<Student[]>>(environment.apiUrl + `${ url }/${ id }/allievi`)
            .pipe(map(value => {
                if (value['prenotati']) {
                    return [value['prenotati'], value['presenti']];
                } else {
                    return [value];
                }
            }));
    }
}
