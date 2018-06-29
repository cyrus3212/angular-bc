import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// guards
import { AuthenticationGuard } from './guard/authentication.guard';

// declare views
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardSummaryComponent } from './dashboard/dashboard-summary.component';
import { PromotionManagementComponent } from './promotion/promo-management.component';
import { PromoAssignmentComponent } from './promotion/promo-assignment/promo-assignment.component';
import { AdminManagementComponent } from './admin/admin-management.component';
import { ImportlistComponent } from './importlist/importlist.component';

const routes: Routes = [
    {
        path: 'login',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticationGuard],
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                component: DashboardSummaryComponent
            },
            {
                path: 'promo-management',
                component: PromotionManagementComponent
            },
            {
                path: 'promo-assignment',
                component: PromoAssignmentComponent
            },
            {
                path: 'admin-management',
                component: AdminManagementComponent
            },
            {
                path: 'import-list',
                component: ImportlistComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
