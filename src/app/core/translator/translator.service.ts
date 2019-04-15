import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslatorService {

    private defaultLanguage = 'en';

    private availablelangs = [
        { code: 'en', text: 'English' },
        { code: 'it', text: 'Italian' }
    ];

    constructor(public translate: TranslateService) {

        if (!translate.getDefaultLang()) {
            translate.setDefaultLang(this.defaultLanguage);
        }

        this.useLanguage();
    }

    useLanguage(lang: string = null) {
        this.translate.use(lang || this.translate.getDefaultLang());
    }

    getAvailableLanguages() {
        return this.availablelangs;
    }

}
