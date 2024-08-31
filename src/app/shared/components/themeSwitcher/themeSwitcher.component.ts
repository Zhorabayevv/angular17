import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ui-theme-switcher',
    templateUrl: './themeSwitcher.component.html',
    styleUrl: './themeSwitcher.component.scss',
})
export class ThemeSwitcherComponent {
    @Input('light') lightProps: boolean = true;

    @Output('lightTheme') lightThemeEvent: EventEmitter<boolean> = new EventEmitter<boolean>(true);

    public default: boolean = true;

    constructor() {}

    public changeTheme(): void {
        this.default = false;
        this.lightProps = !this.lightProps;
        this.lightThemeEvent.emit(!this.lightProps);
    }
}
