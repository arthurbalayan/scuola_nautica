import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassSessionComponent } from './class-session.component';
import { RouterModule, Routes } from '@angular/router';
import { ClassSessionService } from './class-session.service';
import { SharedModule } from '../../../shared/shared.module';
import { ClassSessionEditComponent } from './class-session-edit/class-session-edit.component';

const routes: Routes = [
    {
        path     : '',
        component: ClassSessionComponent
    },
    {
        path     : ':id',
        component: ClassSessionEditComponent
    },
    {
        path     : 'new',
        component: ClassSessionEditComponent
    }
];

@NgModule({
    declarations: [
        ClassSessionComponent,
        ClassSessionEditComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers   : [
        ClassSessionService
    ]
})
export class ClassSessionModule {
}
