import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class UtilityService {

    constructor() {
    }

    /**
     * @description construct Inputs Array
     * @param obj traine
     */
    static constructInputsArray(obj: any): string[] {
        const temp = Object.keys(obj);
        return temp.filter(val => val !== 'id');
    }

    /**
     * @description construct formGroup
     * @param keys of formGroup
     * @param obj object passed to constructInputsArray
     */
    static toFormGroup(keys: string[], obj: any): FormGroup {
        const group: any = {};

        keys.forEach(question => {
            group[question] = new FormControl(obj ? obj[question] : '',
                Validators[question === 'email' ? 'email' : 'required']);
        });
        return new FormGroup(group);
    }
}
