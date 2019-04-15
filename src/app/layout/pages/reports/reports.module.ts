import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';

const routes: Routes = [
    {
        path     : '**',
        component: ReportsComponent
    }
];

@NgModule({
    declarations: [
        ReportsComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers   : [
        ReportsService
    ]
})
export class ReportsModule {
}
