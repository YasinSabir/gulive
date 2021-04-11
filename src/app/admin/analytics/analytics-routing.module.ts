import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnalyticsHostComponent} from '@common/admin/analytics/components/analytics-host/analytics-host.component';
import {ClickAnalyticsHostComponent} from './click-analytics-host/click-analytics-host.component';
import {DefaultAnalyticsComponent} from '@common/admin/analytics/components/default-analytics/default-analytics.component';

const routes: Routes = [
    {
        path: '',
        component: AnalyticsHostComponent,
        children: [
            {path: '', redirectTo: 'links'},
            {
                path: 'links',
                component: ClickAnalyticsHostComponent,
            },
            {
                path: 'google',
                component: DefaultAnalyticsComponent,
            },
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AnalyticsRoutingRoutingModule { }
