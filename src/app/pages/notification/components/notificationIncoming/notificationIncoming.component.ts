import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-notification-incoming',
    templateUrl: './notificationIncoming.component.html',
    styleUrls: ['./notificationIncoming.component.scss'],
    imports: [CommonModule, TranslateModule, SharedModule, RouterModule],
})
export class NotificationIncomingComponent {
    constructor() {}
}
