import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { AlertService } from 'src/app/shared/services/alert.service';
import { AlertType, IAlert } from 'src/app/shared/interfaces/alert.interface';

@Component({
    selector: 'ui-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(-50px)' }),
                animate('0.3s ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('0.3s ease-in-out', style({ opacity: 0, transform: 'translateY(-50px)' })),
            ]),
        ]),
    ],
})
export class AlertComponent implements OnInit, OnDestroy {
    private unsubscribe$$: Subject<void> = new Subject<void>();
    public alerts: IAlert[] = [];
    private alertSubscription: Subscription;

    constructor(private _alertService: AlertService) {}

    ngOnInit(): void {
        this.initializeListeners();
    }

    ngOnDestroy(): void {
        this.unsubscribe$$.next();
        this.unsubscribe$$.complete();
    }

    initializeListeners(): void {
        this.alertSubscription = this._alertService
            .onAlert()
            .pipe(takeUntil(this.unsubscribe$$))
            .subscribe((alert) => {
                if (alert.message === undefined || alert.type === undefined) {
                    const indexToRemove = this.alerts.findIndex((alert) => alert.id === alert.id);

                    this.alerts.splice(indexToRemove, 1);
                    return;
                }

                this.alerts.push(alert);

                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 1500);
                }
            });
    }

    removeAlert(alert: IAlert) {
        if (!this.alerts.includes(alert)) return;

        this.alerts = this.alerts.filter((x) => x !== alert);
    }

    cssClass(alert: IAlert): string {
        if (!alert) return '';

        const classes = ['alert'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert-success',
            [AlertType.Error]: 'alert-danger',
            [AlertType.Warning]: 'alert-warning',
        };

        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }
}
