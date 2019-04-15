import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { LayoutComponent } from '../layout/layout.component';
import { Error404Component } from './pages/error404/error404.component';
import { Error500Component } from './pages/error500/error500.component';

export const routes = [
    {
        path       : '',
        component  : LayoutComponent,
        canActivate: [AuthGuard],
        children   : [
            {
                path        : 'allievi',
                data        : { title: 'Allievi' },
                loadChildren: '../layout/pages/trainees/trainees.module#TraineesModule'
            },
            {
                path        : 'istruttori',
                data        : { title: 'Istruttori' },
                loadChildren: '../layout/pages/trainers/trainers.module#TrainersModule'
            },
            {
                path        : 'sessioni-in-aula',
                data        : { title: 'Sessioni In Aula' },
                loadChildren: '../layout/pages/class-session/class-session.module#ClassSessionModule'
            },
            {
                path        : 'sessioni-in-barca',
                data        : { title: 'Sessioni In Barca' },
                loadChildren: '../layout/pages/boat-session/boat-session.module#BoatSessionModule'
            },
            {
                path        : 'reports/:page',
                data        : { title: 'Reports' },
                loadChildren: '../layout/pages/reports/reports.module#ReportsModule'
            },
            {
                path      : '',
                redirectTo: 'sessioni-in-aula', pathMatch: 'full'
            },
            {
                path      : '**',
                redirectTo: 'login'
            }
        ]
    },
    {
        path        : 'login',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path        : 'istruttores',
        loadChildren: '../layout/pages/trainer/trainer.module#TrainerModule'
    },
    {
        path     : '404',
        component: Error404Component
    },
    {
        path     : '500',
        component: Error500Component
    },
    {
        path      : '',
        redirectTo: 'sessioni-in-aula', pathMatch: 'full'
    },
    // Not found
    {
        path      : '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoutesModule {
}
