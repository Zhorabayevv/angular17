import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/pages/login/services/login.service';
import { IMenuItem } from 'src/app/shared/interfaces/sidebar.interface';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Input('isMenuOpen') isMenuOpenProps: boolean = true;
    @Input('activeProfile') activeProfileProps: boolean = true;

    @Output('menuToggle') menuToggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output('openProfile') openProfileEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    public searchValue: string;
    public menuItems: IMenuItem[] = [
        {
            icon: 'users',
            label: 'suppliers',
            link: 'suppliers',
        },
        {
            icon: 'chart-line-up',
            label: 'Дома',
            link: 'houses',
        },
        {
            icon: 'clipboard-list',
            label: 'Диспетчерская',
            link: 'clipboard',
        },
        {
            icon: 'bell',
            label: 'notification',
            badge: true,
            isActive: false,
            children: [
                {
                    label: 'Входящие',
                    link: 'incoming',
                    count: 21,
                },
                {
                    label: 'Отправленные',
                    link: 'sent',
                    count: 49,
                },
                {
                    label: 'Избранные',
                    link: 'favorites',
                    count: 6,
                },
                {
                    label: 'Корзина',
                    link: 'basket',
                    count: 17,
                },
            ],
        },
        {
            icon: 'gear',
            label: 'settings',
            link: 'admin',
        },
        {
            icon: 'triangle-exclamation',
            label: 'Пусто',
            link: 'empty',
        },
        {
            icon: 'headphones-alt-2',
            label: 'Служба поддержки',
            link: 'support',
        },
    ];
    public userContent: Record<string, string> = {
        name: 'Y. Abylaikhan',
        email: 'abyltrouble@gmail.com',
    };

    constructor(
        private _router: Router,
        private _loginService: LoginService,
    ) {}

    public menuToggler(): void {
        this.isMenuOpenProps = !this.isMenuOpenProps;

        this.menuToggleEvent.emit(this.isMenuOpenProps);
    }

    public openProfile(): void {
        this.activeProfileProps = true;
        this.openProfileEvent.emit(this.activeProfileProps);
    }

    public logout(): void {
        this._loginService.logout();
        this._router.navigate(['/login']);
    }
}
