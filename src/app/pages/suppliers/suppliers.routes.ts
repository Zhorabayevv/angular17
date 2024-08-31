import { Routes } from '@angular/router';

export const suppliersRoutes: Routes = [
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: '',
        loadComponent: () =>
            import('./components/suppliers/suppliers.component').then((m) => m.SuppliersComponent),
        children: [
            {
                path: 'list',
                loadComponent: () =>
                    import('./components/suppliersList/suppliersList.component').then(
                        (m) => m.SuppliersListComponent,
                    ),
            },
            {
                path: 'action-log',
                loadComponent: () =>
                    import('./components/suppliersLog/suppliersLog.component').then(
                        (m) => m.SuppliersLogComponent,
                    ),
            },
        ],
    },
];
