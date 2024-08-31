import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AlertType, IAlert } from '../interfaces/alert.interface';

@Injectable()
export class AlertService {
    private subject$$: Subject<IAlert> = new Subject<IAlert>();
    private maxAlerts: number = 3;
    private alerts: IAlert[] = [];

    constructor() {}

    public onAlert(): Observable<IAlert> {
        return this.subject$$.asObservable();
    }

    public success(title: string, message: string, autoCloseValue?: boolean): void {
        const autoClose = autoCloseValue === undefined ? true : autoCloseValue;

        this.alert({ autoClose, type: AlertType.Success, message, title });
    }

    public error(title: string, message: string, autoCloseValue?: boolean): void {
        const autoClose = autoCloseValue === undefined ? true : autoCloseValue;

        this.alert({ autoClose, type: AlertType.Error, message, title });
    }

    public warn(title: string, message: string, autoCloseValue?: boolean): void {
        const autoClose = autoCloseValue === undefined ? true : autoCloseValue;

        this.alert({ autoClose, type: AlertType.Warning, message, title });
    }

    private alert(alert: IAlert): void {
        alert.id = alert.id || this.generateID();

        if (alert.autoClose) {
            setTimeout(() => this.clear(alert.id), 1500);
        }

        if (this.alerts.length >= this.maxAlerts) {
            this.clear(this.alerts[0].id);
        }

        this.alerts.push(alert);
        this.subject$$.next(alert);
    }

    public clear(id: string | undefined): void {
        const index = this.alerts.findIndex((alert) => alert.id === id);

        if (index !== -1) {
            const removedAlert = this.alerts.splice(index, 1)[0];

            this.subject$$.next({ ...removedAlert, message: undefined });
        }
    }

    private generateID(): string {
        const randomPart = crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
        const timePart = Date.now().toString(36);

        return randomPart + timePart;
    }
}
