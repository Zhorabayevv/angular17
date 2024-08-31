import { Routes } from '@angular/router';

export const notificationRoutes: Routes = [
    {
        path: '',
        redirectTo: 'incoming',
        pathMatch: 'full',
    },
    {
        path: 'incoming',
        loadComponent: () =>
            import('./components/notificationIncoming/notificationIncoming.component').then(
                (m) => m.NotificationIncomingComponent,
            ),
    },
];
