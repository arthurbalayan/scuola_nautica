import { NgModule } from '@angular/core';

import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { HeaderComponent } from './partials/header/header.component';
import { NavsearchComponent } from './partials/header/navsearch/navsearch.component';
import { OffsidebarComponent } from './partials/offsidebar/offsidebar.component';
import { UserblockComponent } from './partials/sidebar/userblock/userblock.component';
import { UserblockService } from './partials/sidebar/userblock/userblock.service';
import { FooterComponent } from './partials/footer/footer.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        UserblockService
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule { }
