import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LinkService} from '../../shared/link/link.service';
import {BehaviorSubject} from 'rxjs';
import {Link} from '../../shared/link/link';
import copy from 'copy-to-clipboard';
import {Toast} from '@common/core/ui/toast.service';
import {Messages} from '../../messages.enum';
import {finalize} from 'rxjs/operators';
import {HomepageContent} from '../homepage-content';
import {Settings} from '@common/core/config/settings.service';
import {RecaptchaService} from '@common/core/services/recaptcha.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import * as urlRegex from 'url-regex';
import {Router} from '@angular/router';

@Component({
    selector: 'new-link-form',
    templateUrl: './new-link-form.component.html',
    styleUrls: ['./new-link-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewLinkFormComponent implements AfterViewInit {
    @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;
    @Input() content: HomepageContent;
    public newLinkControl = new FormControl();
    public campaignSource = new FormControl();
    public campaignMedium = new FormControl();
    public campaignName = new FormControl();
    public campaignTerm = new FormControl();
    public campaignContext = new FormControl();
    public activeLink$ = new BehaviorSubject<Link>(null);
    public loading$ = new BehaviorSubject<boolean>(false);
    public show: boolean = false;
    public buttonName: any = 'Advanced Option';

    constructor(
        private link: LinkService,
        private toast: Toast,
        private settings: Settings,
        private recaptcha: RecaptchaService,
        private router: Router,
    ) {
    }

    ngAfterViewInit() {
        this.recaptcha.loadIfEnableFor('link_creation');
    }

    public toggle() {
        this.show = !this.show;

        // CHANGE THE NAME OF THE BUTTON.
        if (this.show) {
            this.buttonName = 'hide Advanced Option';
        } else {
            this.buttonName = 'Show Advanced Option';
        }
    }

    public submit() {
        if (this.activeLink$.value) {
            this.copyLink();
        } else {
            this.createLink();
        }
    }

    public setParam(url) {
        const longUrl = new URL(url);
        const Params = longUrl.searchParams;
        Params.append('campaignSource', this.campaignSource.value);
        Params.append('campaignMedium', this.campaignMedium.value);
        Params.append('campaignName', this.campaignName.value);
        Params.append('campaignTerm', this.campaignTerm.value);
        Params.append('campaignContext', this.campaignContext.value);
        longUrl.search = Params.toString();
        return longUrl.toString();
    }

    private copyLink() {
        const success = copy(this.activeLink$.value.short_url);
        if (success) {
            this.toast.open(Messages.LINK_COPY_SUCCESS);
            this.activeLink$.next(null);
            this.newLinkControl.reset();
        }
    }

    private async createLink() {
        this.loading$.next(true);

        if (!await this.recaptcha.verify('link_creation')) {
            return this.loading$.next(false);
        }

        if (this.urlInvalid(this.newLinkControl.value)) {
            this.toast.open('That is not a valid url');
            return;
        }

        const payload = {
            type: this.settings.get('links.default_type', 'direct'),
            long_url: this.setParam(this.newLinkControl.value),
            // long_url: this.newLinkControl.value,
        };
        this.link.create(payload)
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                const newLink = (response as { link: Link }).link;
                this.activeLink$.next(newLink);
                const myString = newLink.short_url;
                const emoji = decodeURIComponent(myString.substring(myString.indexOf('%') + 0));

                let url = '';
                if (myString.includes('localhost')) {
                    const data = new URL(myString).origin;
                    url = data + '/belink-link-shorterner';
                } else {
                    url = new URL(myString).origin;
                }
                // this.newLinkControl.setValue(newLink.short_url);
                // console.log('Original -' + newLink.short_url);
                // console.log('With Emoji Encoded -' + url + emoji);
                this.newLinkControl.setValue(url + '/' + emoji);
                this.campaignSource.setValue('');
                this.campaignMedium.setValue('');
                this.campaignName.setValue('');
                this.campaignTerm.setValue('');
                this.campaignContext.setValue('');
                this.input.nativeElement.select();
                this.toast.open(Messages.LINK_SHORTEN_SUCCESS);
            }, (errResponse: BackendErrorResponse) => {
                console.log(errResponse);
                // ERROR--
                if (errResponse.messages.auth == '0') {
                    this.router.navigate(['login']);
                    // this.toast.open(Messages.LINK_LOGIN_REQUIRED);
                } else {
                    this.toast.open(errResponse?.errors?.long_url || Messages.LINK_SHORTEN_FAIL);
                }
            });
    }

    private urlInvalid(url: string) {
        return !urlRegex({exact: true, strict: false}).test(url);
    }
}
