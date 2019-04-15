import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AllieviReport } from '../../../models/allievi-report';

const API_URL = 'allievi/reports';

@Injectable()
export class ReportsService {

    constructor(private http: HttpClient) {}

    /**
     * @description POST to get reports data
     * @param studentsId array of students ids
     */
    getReports(studentsId: number[]): Observable<AllieviReport[]> {
        return this.http.post<AllieviReport[]>(environment.apiUrl + API_URL, { allievoIds: studentsId })
            .pipe(map(value => value['allievi']));
    }
}
