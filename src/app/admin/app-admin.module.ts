import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {BaseAdminModule} from '@common/admin/base-admin.module';
import {ChipsModule} from '../../common/core/ui/chips/chips.module';
import {LinkSettingsComponent} from './settings/link-settings/link-settings.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {ConfirmModalModule} from '@common/core/ui/confirm-modal/confirm-modal.module';
import {RECAPTCHA_ACTIONS} from '@common/admin/settings/recaptcha/recaptcha-actions.token';
import {DashboardModule} from '../dashboard/dashboard.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BaseAdminModule,
        ConfirmModalModule,
        DashboardModule,

        ChipsModule,
        MatProgressBarModule,
        MatTabsModule,
    ],
    declarations: [
        LinkSettingsComponent
    ],
    providers: [
        {provide: RECAPTCHA_ACTIONS, multi: true, useValue: [
            {name: 'Link Creation', key: 'recaptcha.enable_for_link_creation', description: 'Enable recaptcha integration when creating links from homepage or user dashboard.'}
        ]}
    ]
})
export class AppAdminModule {
}
