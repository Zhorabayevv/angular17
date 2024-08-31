import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';

@Component({
    standalone: true,
    selector: 'app-not-found',
    templateUrl: './notFound.component.html',
    styleUrl: './notFound.component.scss',
    imports: [CommonModule, RouterLink, SharedModule],
})
export class PageNotFoundComponent {}
