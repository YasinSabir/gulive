import {LinkIndexComponent} from '../dashboard/link/link-index/link-index.component';
import {LinkShowResolverService} from '../dashboard/link/link-show/link-show-resolver.service';
import {LinkShowComponent} from '../dashboard/link/link-show/link-show.component';
import {LinkGroupIndexComponent} from '../dashboard/link-group/link-group-index/link-group-index.component';
import {LinkGroupAnalyticsPageComponent} from '../dashboard/link-group/link-group-analytics-page/link-group-analytics-page.component';
import {CustomDomainIndexComponent} from '@common/custom-domain/custom-domain-index/custom-domain-index.component';
import {LinkOverlayIndexComponent} from '../dashboard/link-overlay/link-overlay-index/link-overlay-index.component';
import {TrackingPixelIndexComponent} from '../dashboard/pixels/tracking-pixel-index/tracking-pixel-index.component';
import {LinkSettingsComponent} from './settings/link-settings/link-settings.component';
import {Routes} from '@angular/router';
import {CrupdateLinkOverlayPageComponent} from '../dashboard/link-overlay/link-overlay-index/crupdate-link-overlay-page/crupdate-link-overlay-page.component';
import {LinkGroupLinksIndexComponent} from '../dashboard/link-group/link-groups-links-index/link-group-links-index.component';

export const APP_ADMIN_ROUTES: Routes = [
    // link
    {path: 'links', component: LinkIndexComponent},
    {path: 'links/:linkId', resolve: {api: LinkShowResolverService}, component: LinkShowComponent},

    // group
    {path: 'link-groups', component: LinkGroupIndexComponent, data: {name: 'Link Groups'}},
    {path: 'link-groups/:groupId/links', component: LinkGroupLinksIndexComponent},
    {path: 'link-groups/:groupId/analytics', component: LinkGroupAnalyticsPageComponent, data: {name: 'Link Group Statistics'}},

    // custom domain
    {path: 'custom-domains', component: CustomDomainIndexComponent},

    // link overlay
    {path: 'link-overlays', component: LinkOverlayIndexComponent},
    {path: 'link-overlays/new', component: CrupdateLinkOverlayPageComponent},
    {path: 'link-overlays/edit/:id', component: CrupdateLinkOverlayPageComponent},

    // tracking pixels
    {path: 'pixels', component: TrackingPixelIndexComponent},
];

export const APP_SETTING_ROUTES: Routes = [
    {path: 'links', component: LinkSettingsComponent}
];
