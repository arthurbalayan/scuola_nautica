import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    valForm: FormGroup;

    constructor(public settings: SettingsService,
                private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {

        this.valForm = fb.group({
            username: [null, Validators.required],
            password: [null, Validators.required]
        });

    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            // login process
            this.authService.login(value).subscribe(res => {
                this.router.navigate(['/']);
            });
        }
    }

    ngOnInit() {
        if (this.authService.token) {
            this.router.navigate(['/']);
        }
    }

}
