import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Observable, defer } from 'rxjs';

import { SharedModule } from './shared/shared.module';
import { LoginService } from './pages/login/services/login.service';
import { AlertService } from './shared/services/alert.service';
import { ModalService } from './shared/services/modal.service';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [AlertService],
    imports: [CommonModule, RouterModule, HttpClientModule, TranslateModule, SharedModule],
})
export class AppComponent implements OnInit {
    public isOpen$: Observable<boolean> = defer(() => this._modal.isOpen$);
    public registered: boolean = false;
    public isMenuOpen: boolean = true;
    public isOpenProfile: boolean = false;

    constructor(
        private _translateService: TranslateService,
        private _loginService: LoginService,
        private _modal: ModalService,
    ) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    private initializeValues(): void {
        const isMenuOpenStr = localStorage.getItem('isMenuOpen');

        this.isMenuOpen = isMenuOpenStr ? JSON.parse(isMenuOpenStr) : true;
        this._loginService.isLoggedIn.subscribe((loggedIn) => {
            this.registered = loggedIn;
        });
    }

    public menuToggle(isOpen: boolean): void {
        this.isMenuOpen = isOpen;

        localStorage.setItem('isMenuOpen', String(isOpen));
    }

    public openProfile(): void {
        event?.stopPropagation();

        this.isOpenProfile = true;
    }

    public closeProfile(): void {
        this.isOpenProfile = false;
    }

    private switchLanguage(language: string): void {
        this._translateService.use(language);
        localStorage.lang = language;
    }
}
