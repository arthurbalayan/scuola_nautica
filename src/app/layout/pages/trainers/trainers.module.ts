import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainersComponent } from './trainers.component';
import { RouterModule, Routes } from '@angular/router';
import { TrainersService } from './trainers.service';
import { SharedModule } from '../../../shared/shared.module';
import { TrainerEditComponent } from './trainer-edit/trainer-edit.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

const routes: Routes = [
    {
        path     : '',
        component: TrainersComponent
    },
    {
        path     : ':id',
        component: TrainerEditComponent
    }
];


@NgModule({
    declarations: [
        TrainersComponent,
        TrainerEditComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ],
    providers   : [
        TrainersService
    ]
})
export class TrainersModule {
}
