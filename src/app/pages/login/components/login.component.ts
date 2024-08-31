import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LoginService } from '../services/login.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { IShortEntity } from 'src/app/shared/interfaces/shortEntity.interface';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ILoginContentType } from '../interfaces/login.interface';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [
        CommonModule,
        NgxMaskDirective,
        NgxMaskPipe,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        SharedModule,
    ],
    providers: [provideNgxMask()],
})
export class LoginComponent implements OnInit {
    public title: string = this._translateService.instant('Авторизация');
    public isContentType: ILoginContentType = 'auth';
    public tabs: IShortEntity[] = [
        {
            code: 'phone',
            name: 'Телефон',
        },
        {
            code: 'email',
            name: 'Почта',
        },
    ];
    public selectedTabCode?: string;
    public authForm: FormGroup;

    constructor(
        private _router: Router,
        private _loginService: LoginService,
        private _translateService: TranslateService,
        private _fb: FormBuilder,
        private _sharedService: SharedService,
        private _alertService: AlertService,
    ) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    private initializeValues(): void {
        this.authForm = this._fb.group({
            password: [null, Validators.required],
            rememberMe: [false],
        });

        this.selectTab(this.tabs[0].code);
    }

    public login(contentType: string): void {
        switch (contentType) {
            case 'auth':
                const body = {
                    email: this.authForm.get('email')?.value,
                    password: this.authForm.get('password')?.value,
                    rememberMe: this.authForm.get('rememberMe')?.value,
                };

                this._loginService.login(body);
                this._router.navigate(['/suppliers']);
                this._alertService.success('Добро пожаловать!', 'Успешный вход');
                break;

            case 'register':
                // this._loginService.login(body);

                this.toggleRegister('success-reg');

                break;

            case 'success-reg':
                this.toggleRegister('auth');

                break;
        }
    }

    public selectTab(tabCode?: string): void {
        this.selectedTabCode = tabCode;

        if (tabCode === 'phone') {
            this.authForm.removeControl('email');

            this.authForm.addControl('phone', this._fb.control(null, Validators.required));
        } else {
            this.authForm.removeControl('phone');

            this.authForm.addControl(
                'email',
                this._fb.control(null, [Validators.required, Validators.email]),
            );
        }
    }

    public rememberMeToggle(value: boolean, controlName: string): void {
        this.authForm.get(controlName)?.setValue(value);
    }

    public edsLogin(): void {}

    public toggleRegister(type: 'auth' | 'register' | 'success-reg'): void {
        this.isContentType = type;
        this.authForm.reset();

        switch (type) {
            case 'auth':
                this.title = this._translateService.instant('Авторизация');
                this.selectTab(this.tabs[0].code);
                break;

            case 'register':
                this.title = this._translateService.instant('Регистрация');
                this.authForm = this._fb.group({
                    email: [null, [Validators.required, Validators.email]],
                    password: [null, Validators.required],
                    confirmPassword: [null, Validators.required],
                    agreeTerms: [false, Validators.requiredTrue],
                });

                this.authForm
                    .get('confirmPassword')
                    ?.setValidators([
                        Validators.required,
                        this._sharedService.confirmPasswordValidator('password', this.authForm),
                    ]);

                break;

            case 'success-reg':
                this.title = this._translateService.instant(
                    'Проверьте указанную вами электронную почту',
                );
                break;
        }
    }
}
