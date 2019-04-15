import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BOAT_SESSION_COLUMNS } from '../../../constants/columns';
import { BoatSession } from '../../../models/boat-session';
import { BoatSessionService } from './boat-session.service';

@Component({
    selector   : 'app-boat-session',
    templateUrl: './boat-session.component.html',
    styleUrls  : ['./boat-session.component.scss']
})
export class BoatSessionComponent implements OnInit, OnDestroy {
    sessions: BoatSession[];
    columns; // columns from COLUMNS const
    expandable = true;
    subscription: Subscription;
    title: string;

    constructor(private sessionsService: BoatSessionService,
                private route: ActivatedRoute) {

        this.columns = BOAT_SESSION_COLUMNS;
        route.data.subscribe(data => this.title = data.title);
    }

    ngOnInit() {
        this.subscription = this.sessionsService.getSessions().subscribe((res: BoatSession[]) => this.sessions = res);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
