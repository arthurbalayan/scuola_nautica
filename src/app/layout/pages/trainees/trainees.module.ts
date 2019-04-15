import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraineesComponent } from './trainees.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { TraineeEditComponent } from './trainee-edit/trainee-edit.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule } from '@angular/material';

const routes: Routes = [
    {
        path     : '',
        component: TraineesComponent
    },
    {
        path     : ':id',
        component: TraineeEditComponent
    },
    {
        path     : 'new',
        component: TraineeEditComponent
    }
];

@NgModule({
    declarations: [
        TraineesComponent,
        TraineeEditComponent
    ],
    imports     : [
        CommonModule,
        RouterModule.forChild(routes),
        SharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule
    ]
})
export class TraineesModule {
}
