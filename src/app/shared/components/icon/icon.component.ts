import { Component, Input } from '@angular/core';

@Component({
    selector: 'ui-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
    @Input('icon') iconProps: string = '';
    @Input('deg') degProps: string = '';

    constructor() {}

    public styleObject(): Record<string, string> {
        return {
            '-webkit-mask-image': `url(assets/icons/${this.iconProps}.svg)`,
            'mask-image': `url(assets/icons/${this.iconProps}.svg)`,
        };
    }
}
