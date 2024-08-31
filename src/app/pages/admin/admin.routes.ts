import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/admin/admin.component').then((m) => m.AdminComponent),
    },
];
