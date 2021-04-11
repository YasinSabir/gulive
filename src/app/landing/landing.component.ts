import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import {AppHttpClient} from '@common/core/http/app-http-client.service';
import {BehaviorSubject} from 'rxjs';
import {Settings} from '@common/core/config/settings.service';
import {Translations} from '@common/core/translations/translations.service';
import {HomepageContent} from './homepage-content';
import {GenericBackendResponse} from '@common/core/types/backend-response';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {CurrentUser} from '@common/auth/current-user';

interface HomepageStats {
    links: number;
    clicks: number;
    users: number;
}

@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
    public stats$ = new BehaviorSubject<HomepageStats>(null);
    public content: HomepageContent;
    public overlayBackground: SafeStyle;

    constructor(
        private http: AppHttpClient,
        public settings: Settings,
        private i18n: Translations,
        private cd: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        public currentUser: CurrentUser,
    ) {}

    ngOnInit() {
        this.settings.all$().subscribe(() => {
            this.content = this.settings.getJson('homepage.appearance');
            this.overlayBackground = this.sanitizer.bypassSecurityTrustStyle(
                `linear-gradient(45deg, ${this.content.headerOverlayColor1} 0%, ${this.content.headerOverlayColor2} 100%)`
            );
            this.cd.markForCheck();
        });
        this.http.get<GenericBackendResponse<{stats: HomepageStats}>>('homepage/stats').subscribe(response => {
            this.stats$.next(response.stats);
        });
    }

    public copyrightText() {
        const year = (new Date()).getFullYear();
        return this.i18n.t('Copyright © :year, All Rights Reserved', {year});
    }

    public scrollToFeatures() {
        document.querySelector('.first-secondary-feature')
            .scrollIntoView({block: 'center', inline: 'center', behavior: 'smooth'});
    }
}
