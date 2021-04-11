import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingComponent} from './landing/landing.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AuthModule} from '@common/auth/auth.module';
import {AccountSettingsModule} from '@common/account-settings/account-settings.module';
import {PagesModule} from '@common/pages/shared/pages.module';
import {NewLinkFormComponent} from './landing/new-link-form/new-link-form.component';
import {APP_CONFIG} from '@common/core/config/app-config';
import {LinkPreviewModule} from './shared/link-preview/link-preview.module';
import {CORE_PROVIDERS} from '@common/core/core-providers';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {TranslationsModule} from '@common/core/translations/translations.module';
import {AdHostModule} from '@common/core/ui/ad-host/ad-host.module';
import {MaterialNavbarModule} from '@common/core/ui/material-navbar/material-navbar.module';
import {MatIconModule} from '@angular/material/icon';
import {ContactPageModule} from '@common/contact/contact-page.module';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AppFooterModule} from './shared/app-footer/app-footer.module';
import {CookieNoticeModule} from '@common/gdpr/cookie-notice/cookie-notice.module';
import {BELINK_CONFIG} from './belink-config';
import {FormatPipesModule} from '@common/core/ui/format-pipes/format-pipes.module';
import {LoadingIndicatorModule} from '@common/core/ui/loading-indicator/loading-indicator.module';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        NewLinkFormComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([], {scrollPositionRestoration: 'top'}),
        AuthModule,
        AccountSettingsModule,
        PagesModule,
        AppRoutingModule,
        LinkPreviewModule,
        AdHostModule,
        MaterialNavbarModule,
        ContactPageModule,
        TranslationsModule,
        AppFooterModule,
        CookieNoticeModule,
        FormatPipesModule,
        LoadingIndicatorModule,

        // material
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule,

        // for new link form component
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [
        ...CORE_PROVIDERS,
        {
            provide: APP_CONFIG,
            useValue: BELINK_CONFIG,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
