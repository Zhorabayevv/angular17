import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ui-router-navigate',
    templateUrl: './routerNavigate.component.html',
    styleUrls: ['./routerNavigate.component.scss'],
})
export class RouterComponent implements OnInit, OnChanges {
    public routers: Record<string, string>[] = [];

    constructor(private _router: Router) {}

    ngOnInit(): void {
        this.initializeValues();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initializeValues();
    }

    private initializeValues() {
        const url = this._router.url;
        const segments = url.split('/').filter((segment) => segment);
        this.routers = segments.map((segment, index) => ({
            link: segments.slice(0, index + 1).join('/'),
            name: segment,
        }));
    }
}
