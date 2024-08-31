import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    standalone: true,
    selector: 'app-suppliers-log',
    templateUrl: './suppliersLog.component.html',
    styleUrls: ['./suppliersLog.component.scss'],
    imports: [CommonModule, TranslateModule, RouterModule],
})
export class SuppliersLogComponent {
    constructor() {}
}
