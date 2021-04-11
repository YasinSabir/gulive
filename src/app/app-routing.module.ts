import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {AuthGuard} from '@common/guards/auth-guard.service';
import {ContactComponent} from '@common/contact/contact.component';
import {LinkPreviewHostComponent} from './shared/link-preview/link-preview-host/link-preview-host.component';
import {NOT_FOUND_ROUTES} from '@common/pages/not-found-routes';
import {RegisterComponent} from '@common/auth/register/register.component';
import {LoginComponent} from '@common/auth/login/login.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', component: LandingComponent},
    {path: 'link-groups/:slug', redirectTo: ':slug'},
    {path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [AuthGuard]},
    {path: 'admin', loadChildren: () => import('src/app/admin/app-admin.module').then(m => m.AppAdminModule), canLoad: [AuthGuard]},
    {path: 'billing', loadChildren: () => import('@common/billing/billing.module').then(m => m.BillingModule)},

    {path: 'workspace/join/register', component: RegisterComponent, data: {message: 'To join your team on :siteName, create an account'}},
    {path: 'workspace/join/login', component: LoginComponent, data: {message: 'To join your team on :siteName, login to your account'}},

    {path: 'contact', component: ContactComponent},
    {
        path: '**',
        pathMatch: 'full',
        component: LinkPreviewHostComponent,
        data: {willSetSeo: true},
    },
    ...NOT_FOUND_ROUTES,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
