import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CustomHomepage} from '@common/pages/shared/custom-homepage.service';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {Settings} from '@common/core/config/settings.service';
import {NavigationEnd, Router} from '@angular/router';
import {MetaTagsService} from '@common/core/meta/meta-tags.service';
import {filter} from 'rxjs/operators';
import cssVars from 'css-vars-ponyfill';
import {CookieNoticeService} from '@common/gdpr/cookie-notice/cookie-notice.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

    // TODO: need to rename "container" to "be-container" before removing this
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    constructor(
        private customHomepage: CustomHomepage,
        private settings: Settings,
        private httpClient: AppHttpClient,
        private router: Router,
        private meta: MetaTagsService,
        private cookieNotice: CookieNoticeService,
    ) {}

    ngOnInit() {
        this.customHomepage.select();
        this.settings.setHttpClient(this.httpClient);
        this.meta.init();

        // google analytics
        if (this.settings.get('analytics.tracking_code')) {
            this.triggerAnalyticsPageView();
        }

        this.loadCssVariablesPolyfill();
        this.cookieNotice.maybeShow();
    }

    private triggerAnalyticsPageView() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe((e: NavigationEnd) => {
                if ( ! window['ga']) return;
                window['ga']('set', 'page', e.urlAfterRedirects);
                window['ga']('send', 'pageview');
            });
    }

    private loadCssVariablesPolyfill() {
        const isNativeSupport = typeof window !== 'undefined' &&
            window['CSS'] &&
            window['CSS'].supports &&
            window['CSS'].supports('(--a: 0)');
        if ( ! isNativeSupport) {
            cssVars();
        }
    }
}
