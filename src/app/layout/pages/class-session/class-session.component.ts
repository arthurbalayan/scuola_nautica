import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CLASS_SESSION_COLUMNS } from '../../../constants/columns';
import { ClassSession } from '../../../models/class-session';
import { ClassSessionService } from './class-session.service';

@Component({
    selector   : 'app-class-session',
    templateUrl: './class-session.component.html',
    styleUrls  : ['./class-session.component.scss']
})
export class ClassSessionComponent implements OnInit, OnDestroy {
    sessions: ClassSession[];
    columns; // columns from COLUMNS const
    subscription: Subscription;
    title: string;
    expandable = true;

    constructor(private sessionsService: ClassSessionService, private route: ActivatedRoute) {
        this.columns = CLASS_SESSION_COLUMNS;
        route.data.subscribe(data => this.title = data.title);
    }

    ngOnInit() {
        this.subscription = this.sessionsService.getSessions().subscribe((res: ClassSession[]) => {
            this.sessions = res;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
