import { Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

// Routes
const adminRoutes = () => import('./pages/admin/admin.routes').then((m) => m.adminRoutes);
const suppliersRoutes = () =>
    import('./pages/suppliers/suppliers.routes').then((m) => m.suppliersRoutes);
const notificationRoutes = () =>
    import('./pages/notification/notification.routes').then((m) => m.notificationRoutes);

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'suppliers',
        pathMatch: 'full',
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./pages/login/components/login.component').then((m) => m.LoginComponent),
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        loadChildren: adminRoutes,
        canActivate: [AuthGuard],
    },
    {
        path: 'suppliers',
        loadChildren: suppliersRoutes,
        canActivate: [AuthGuard],
    },
    {
        path: 'notification',
        loadChildren: notificationRoutes,
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/notFound/notFound.component').then((m) => m.PageNotFoundComponent),
    },
];
