import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoatSessionComponent } from './boat-session.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { BoatSessionService } from './boat-session.service';
import { BoatSessionEditComponent } from './boat-session-edit/boat-session-edit.component';

const routes: Routes = [
    {
        path     : '',
        component: BoatSessionComponent
    },
    {
        path     : ':id',
        component: BoatSessionEditComponent
    },
    {
        path     : 'new',
        component: BoatSessionEditComponent
    }
];

@NgModule({
    declarations: [
        BoatSessionComponent,
        BoatSessionEditComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers   : [
        BoatSessionService
    ]
})
export class BoatSessionModule {
}
