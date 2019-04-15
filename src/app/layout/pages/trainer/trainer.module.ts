import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TrainerComponent } from './trainer.component';
import { TrainerService } from './trainer.service';

const routes: Routes = [
    {
        path     : ':token',
        component: TrainerComponent
    }
];

@NgModule({
    declarations: [
        TrainerComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule
    ],
    providers   : [
        TrainerService
    ]
})
export class TrainerModule {
}
