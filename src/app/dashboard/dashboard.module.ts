import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardHostComponent} from './dashboard-host/dashboard-host.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule} from '@angular/router';
import {LinkOptionsFormComponent} from './link/link-options-form/link-options-form.component';
import {ChipsModule} from '../../common/core/ui/chips/chips.module';
import {LinkIndexComponent} from './link/link-index/link-index.component';
import {CrupdateLinkModalComponent} from './link/crupdate-link-modal/crupdate-link-modal.component';
import {LinkShowComponent} from './link/link-show/link-show.component';
import {ChartsModule} from '@common/shared/charts/charts.module';
import {LinkGroupIndexComponent} from './link-group/link-group-index/link-group-index.component';
import {DashboardHomeComponent} from './dashboard-home/dashboard-home.component';
import {SharedModule} from '../shared/shared.module';
import {CrupdateLinkGroupModalComponent} from './link-group/crupdate-link-group-modal/crupdate-link-group-modal.component';
import {LinkGroupAnalyticsPageComponent} from './link-group/link-group-analytics-page/link-group-analytics-page.component';
import {AttachLinkModalComponent} from './link-group/attach-link-modal/attach-link-modal.component';
import {CustomDomainModule} from '@common/custom-domain/custom-domain.module';
import {LinkOverlayIndexComponent} from './link-overlay/link-overlay-index/link-overlay-index.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {LinkTypeMenuComponent} from './link/link-type-menu/link-type-menu.component';
import {DatetimeInputModule} from '@common/core/ui/datetime-input/datetime-input.module';
import {LinkUsageInfoComponent} from './dashboard-host/link-usage-info/link-usage-info.component';
import {UpgradePanelComponent} from './dashboard-host/upgrade-panel/upgrade-panel.component';
import {TrackingPixelIndexComponent} from './pixels/tracking-pixel-index/tracking-pixel-index.component';
import {CrupdateTrackingPixelModalComponent} from './pixels/crupdate-tracking-pixel-modal/crupdate-tracking-pixel-modal.component';
import {TranslationsModule} from '@common/core/translations/translations.module';
import {MatIconModule} from '@angular/material/icon';
import {FormatPipesModule} from '@common/core/ui/format-pipes/format-pipes.module';
import {ClickChartsModule} from './click-charts/click-charts.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {ColorPickerInputModule} from '@common/core/ui/color-picker/color-picker-input/color-picker-input.module';
import {LoadingIndicatorModule} from '@common/core/ui/loading-indicator/loading-indicator.module';
import {NoResultsMessageModule} from '@common/core/ui/no-results-message/no-results-message.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {InfoPopoverModule} from '@common/core/ui/info-popover/info-popover.module';
import {MaterialNavbarModule} from '@common/core/ui/material-navbar/material-navbar.module';
import {AdHostModule} from '@common/core/ui/ad-host/ad-host.module';
import {Modal} from '@common/core/ui/dialogs/modal.service';
import {SlugControlModule} from '@common/shared/form-controls/slug-control/slug-control.module';
import {WorkspaceIndexComponent} from './workspaces/workspace-index/workspace-index.component';
import {CrupdateWorkspaceModalComponent} from './workspaces/crupdate-workspace-modal/crupdate-workspace-modal.component';
import {WorkspaceSelectorComponent} from './dashboard-host/workspace-selector/workspace-selector.component';
import {WorkspaceRoleModalComponent} from './workspaces/workspace-role-modal/workspace-role-modal.component';
import {MatRadioModule} from '@angular/material/radio';
import {ManageWorkspaceMembersModalComponent} from './workspaces/manage-workspace-members-modal/manage-workspace-members-modal.component';
import {DatatableModule} from '../../common/datatable/datatable.module';
import {LinkTableFiltersComponent} from './link/link-index/link-table-filters/link-table-filters.component';
import {SelectUserInputModule} from '../../common/core/ui/select-user-input/select-user-input.module';
import {LinkTableComponent} from './link/link-index/link-table/link-table.component';
import {RemoveProtocolPipe} from './link/link-index/link-table/remove-protocol.pipe';
import {PermissionAwareButtonDirective} from './permission-aware-button.directive';
import {NoPermissionMessageComponent} from './permissions/no-permission-message/no-permission-message.component';
import {SkeletonModule} from '../../common/core/ui/skeleton/skeleton.module';
import { LinkDomainComponent } from './link-domain/link-domain.component';
import { LinkPageComponent } from './link-page/link-page.component';
import {CustomPageIndexModule} from '../../common/pages/custom-pages-index/custom-page-index.module';
import { CrupdateLinkOverlayPageComponent } from './link-overlay/link-overlay-index/crupdate-link-overlay-page/crupdate-link-overlay-page.component';
import { GenericPagePreviewComponent } from './link-overlay/link-overlay-index/crupdate-link-overlay-page/generic-page-preview/generic-page-preview.component';
import { LinkGroupLinksIndexComponent } from './link-group/link-groups-links-index/link-group-links-index.component';
import {ApiKeysIndexComponent} from './api-keys/api-keys-index/api-keys-index.component';
import {ApiKeysTableFiltersComponent} from './api-keys/api-keys-index/api-keys-table-filters/api-keys-table-filters.component';
import {ApiKeysTableComponent} from './api-keys/api-keys-index/api-keys-table/api-keys-table.component';
import {ApiKeysShowComponent} from './api-keys/api-keys-show/api-keys-show.component';
import {ApiKeysOptionsFormComponent} from './api-keys/api-keys-options-form/api-keys-options-form.component';
import {CrupdateApiKeysModalComponent} from './api-keys/crupdate-api-keys-modal/crupdate-api-keys-modal.component';


@NgModule({
    declarations: [
        DashboardHostComponent,
        DashboardHomeComponent,
        LinkOptionsFormComponent,
        LinkIndexComponent,
        CrupdateLinkModalComponent,
        LinkShowComponent,
        LinkGroupIndexComponent,
        CrupdateLinkGroupModalComponent,
        LinkGroupAnalyticsPageComponent,
        AttachLinkModalComponent,
        LinkOverlayIndexComponent,
        LinkTypeMenuComponent,
        LinkUsageInfoComponent,
        UpgradePanelComponent,
        TrackingPixelIndexComponent,
        CrupdateTrackingPixelModalComponent,
        ApiKeysIndexComponent,
        ApiKeysOptionsFormComponent,
        ApiKeysShowComponent,
        ApiKeysTableComponent,
        ApiKeysTableFiltersComponent,
        CrupdateApiKeysModalComponent,

        // workspace
        WorkspaceIndexComponent,
        CrupdateWorkspaceModalComponent,
        WorkspaceSelectorComponent,
        WorkspaceRoleModalComponent,
        ManageWorkspaceMembersModalComponent,
        LinkTableFiltersComponent,
        LinkTableComponent,
        RemoveProtocolPipe,
        PermissionAwareButtonDirective,
        NoPermissionMessageComponent,
        LinkDomainComponent,
        LinkPageComponent,
        CrupdateLinkOverlayPageComponent,
        GenericPagePreviewComponent,
        LinkGroupLinksIndexComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        DashboardRoutingModule,
        TranslationsModule,
        FormatPipesModule,
        ClickChartsModule,
        FormsModule,
        ReactiveFormsModule,
        ColorPickerInputModule,
        LoadingIndicatorModule,
        NoResultsMessageModule,
        InfoPopoverModule,
        MaterialNavbarModule,
        AdHostModule,
        SlugControlModule,

        SkeletonModule,

        DatatableModule,
        SelectUserInputModule,

        SharedModule,
        ChartsModule,
        CustomDomainModule,
        CustomPageIndexModule,
        ChipsModule,
        DatetimeInputModule,

        // material
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSidenavModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatRadioModule,
    ],
    providers: [
        Modal,
    ]
})
export class DashboardModule {
}
