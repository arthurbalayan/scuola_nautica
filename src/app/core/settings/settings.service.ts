import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable()
export class SettingsService {

    private user: any;
    private app: any;
    private layout: any;

    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {

        // User Settings
        // -----------------------------------
        this.user = {
            name   : 'John',
            job    : 'ng-developer',
            picture: 'assets/img/user/02.jpg'
        };

        // App Settings
        // -----------------------------------
        this.app = {
            name       : 'Scuola Nautica',
            description: 'Scuola Nautica',
            year       : ((new Date()).getFullYear())
        };

        // Layout Settings
        // -----------------------------------
        this.layout = {
            isFixed        : true,
            isCollapsed    : this.storage.get('isCollapsed'),
            isBoxed        : false,
            isRTL          : false,
            horizontal     : false,
            isFloat        : false,
            asideHover     : false,
            theme          : null,
            asideScrollbar : false,
            isCollapsedText: false,
            useFullLayout  : false,
            hiddenFooter   : false,
            offsidebarOpen : false,
            asideToggled   : false,
            viewAnimation  : 'ng-fadeInUp'
        };

    }

    getAppSetting(name) {
        return name ? this.app[name] : this.app;
    }

    getUserSetting(name) {
        return name ? this.user[name] : this.user;
    }

    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }

    setAppSetting(name, value) {
        if (typeof this.app[name] !== 'undefined') {
            this.app[name] = value;
        }
    }

    setUserSetting(name, value) {
        if (typeof this.user[name] !== 'undefined') {
            this.user[name] = value;
        }
    }

    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name) {
        if (name === 'isCollapsed') {
            this.storage.set('isCollapsed', !this.getLayoutSetting(name));
        }
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}
