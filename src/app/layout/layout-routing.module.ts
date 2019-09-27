import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UsersPaginateComponent } from './users-paginate/users-paginate.component';
import { RegisterComponent } from './register/register.component';
import { EvaluationsComponent } from './evaluations/evaluations.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EvaluationListComponent } from './evaluation-list/evaluation-list.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            { path: 'users-paginate', component: UsersPaginateComponent },
            { path: 'add', component: RegisterComponent },
            { path: 'evaluate', component: EvaluationsComponent },
            { path: 'details/:id', component: UserDetailComponent },
            { path: 'evaluate-paginate', component: EvaluationListComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
