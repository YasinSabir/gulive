import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardHostComponent} from './dashboard-host/dashboard-host.component';
import {LinkIndexComponent} from './link/link-index/link-index.component';
import {LinkShowComponent} from './link/link-show/link-show.component';
import {LinkShowResolverService} from './link/link-show/link-show-resolver.service';
import {LinkReportsResolverService} from '../shared/link/link-reports-resolver.service';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {LinkGroupIndexComponent} from './link-group/link-group-index/link-group-index.component';
import {LinkGroupAnalyticsPageComponent} from './link-group/link-group-analytics-page/link-group-analytics-page.component';
import {LinkOverlayIndexComponent} from './link-overlay/link-overlay-index/link-overlay-index.component';
import {TrackingPixelIndexComponent} from './pixels/tracking-pixel-index/tracking-pixel-index.component';
import {CheckPermissionsGuard} from '@common/guards/check-permissions-guard.service';
import {WorkspaceIndexComponent} from './workspaces/workspace-index/workspace-index.component';
import {CrupdateCustomPageComponent} from '../../common/pages/custom-pages-index/crupdate-custom-page/crupdate-custom-page.component';
import {LINK_PAGE_BASE_URI} from './link-page-base-uri';
import {LinkDomainComponent} from './link-domain/link-domain.component';
import {CrupdateLinkOverlayPageComponent} from './link-overlay/link-overlay-index/crupdate-link-overlay-page/crupdate-link-overlay-page.component';
import {LinkGroupLinksIndexComponent} from './link-group/link-groups-links-index/link-group-links-index.component';
import {LinkPageComponent} from './link-page/link-page.component';
import {ApiKeysIndexComponent} from './api-keys/api-keys-index/api-keys-index.component';


const routes: Routes = [
     {path: '', component: DashboardHostComponent, canActivate: [CheckPermissionsGuard], children: [
        {path: '', resolve: {reports: LinkReportsResolverService}, component: DashboardHomeComponent, data: {name: 'Dashboard'}},

        // link
        {path: 'links', component: LinkIndexComponent, data: {name: 'Links'}},
        {path: 'links/:linkId', resolve: {api: LinkShowResolverService}, component: LinkShowComponent, data: {name: 'Link Statistics'}},

        // api keys
        {path: 'api-keys', component: ApiKeysIndexComponent, data: {name: 'Api Keys'}},

        // group
        {path: 'link-groups', component: LinkGroupIndexComponent, data: {name: 'Link Groups'}},
        {path: 'link-groups/:groupId/links', component: LinkGroupLinksIndexComponent},
        {path: 'link-groups/:groupId/analytics', component: LinkGroupAnalyticsPageComponent, data: {name: 'Link Group Statistics'}},

        // custom domain
        {path: 'custom-domains', component: LinkDomainComponent, data: {name: 'Custom Domains'}},

        // link overlay
        {path: 'link-overlays', component: LinkOverlayIndexComponent, data: {name: 'Link Overlays'}},
        {path: 'link-overlays/new', component: CrupdateLinkOverlayPageComponent},
        {path: 'link-overlays/edit/:id', component: CrupdateLinkOverlayPageComponent},

        // tracking pixels
        {path: 'pixels', component: TrackingPixelIndexComponent, data: {name: 'Tracking Pixels'}},

        // workspaces
        {path: 'workspaces', component: WorkspaceIndexComponent, data: {name: 'Workspaces'}},

        // link pages
        {
            path: 'link-pages',
            component: LinkPageComponent,
            data: {permissions: ['link_pages.view'], name: 'Link Pages', endpoint: LINK_PAGE_BASE_URI}
        },
        {
            path: 'link-pages/new',
            component: CrupdateCustomPageComponent,
            data: {permissions: ['link_pages.create'], name: 'Add New Page', hideSlug: true, endpoint: LINK_PAGE_BASE_URI}
        },
        {
            path: 'link-pages/:id/edit',
            component: CrupdateCustomPageComponent,
            data: {permissions: ['link_pages.update'], name: 'Edit Page', hideSlug: true, endpoint: LINK_PAGE_BASE_URI}
        },
    ]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
