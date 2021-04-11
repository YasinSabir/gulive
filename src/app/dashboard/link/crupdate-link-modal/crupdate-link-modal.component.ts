import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {Link} from '../../../shared/link/link';
import {LinkForm} from '../../../shared/link/link.form';
import {LinkService} from '../../../shared/link/link.service';
import {Toast} from '@common/core/ui/toast.service';
import {Messages} from '../../../messages.enum';
import {LinkGroup} from '../../../shared/link/link-group';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {CurrentUser} from '@common/auth/current-user';
import {LinkOptionsList} from '../types';
import {Settings} from '@common/core/config/settings.service';
import {finalize} from 'rxjs/operators';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import * as urlRegex from 'url-regex';
import {Translations} from '@common/core/translations/translations.service';
import {RecaptchaService} from '@common/core/services/recaptcha.service';
import {BackendErrorResponse} from '@common/core/types/backend-error-response';
import {CrupdateLinkSelectValuesService} from '../crupdate-link-select-values.service';

interface CrupdateLinkModalData {
    link: Link;
    group?: LinkGroup;
}

@Component({
    selector: 'crupdate-link-modal',
    templateUrl: './crupdate-link-modal.component.html',
    styleUrls: ['./crupdate-link-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('bodyExpansion', [
            state('false', style({height: '0px', visibility: 'hidden'})),
            state('true', style({height: '*', visibility: 'visible'})),
            transition('true <=> false',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ])
    ],
    providers: [LinkForm],
})
export class CrupdateLinkModalComponent implements OnInit {
    public loading$ = new BehaviorSubject(false);
    public updating$ = new BehaviorSubject(false);
    public optionsVisible$ = new BehaviorSubject(false);
    public linkOptions$ = new BehaviorSubject<LinkOptionsList>(null);
    public multiple$ = new ReplaySubject(1);

    constructor(
        private dialogRef: MatDialogRef<CrupdateLinkModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateLinkModalData,
        public linkForm: LinkForm,
        private links: LinkService,
        private toast: Toast,
        private selectValues: CrupdateLinkSelectValuesService,
        private currentUser: CurrentUser,
        public settings: Settings,
        private i18n: Translations,
        private recaptcha: RecaptchaService,
    ) {
        if (data.link) {
            this.updating$.next(true);
            this.linkForm.patchValue(data.link);
        }
    }

    ngOnInit() {
        this.selectValues.get().subscribe(response => {
            this.linkOptions$.next(response);
        });

        this.multiple$.subscribe(() => {
            this.linkForm.formGroup.patchValue({
                long_url: '',
                multiple_urls: '',
                alias: '',
            });
        });
    }

    public async confirm() {
        const payload = this.getPayload();

        if (payload.multiple_urls) {
            if (payload.multiple_urls.some(u => this.urlInvalid(u))) {
                return this.linkForm.setErrors({multiple_urls: this.i18n.t('Some of the urls are not valid.')});
            }
        } else if (this.urlInvalid(payload.long_url))  {
            return this.linkForm.setErrors({long_url: this.i18n.t('This url is invalid.')});
        }

        this.loading$.next(true);

        if ( ! await this.recaptcha.verify('link_creation')) {
            return this.loading$.next(false);
        }

        const request = this.updating$.value ?
            this.links.update(this.data.link.id, payload) :
            this.links.create(payload);

        request.pipe(finalize(() => this.loading$.next(false)))
            .subscribe(response => {
                if (payload.multiple_urls) {
                    this.toast.open(Messages.MULTIPLE_LINKS_CREATE_SUCCESS);
                    this.close((response as {links: Link[]}).links);
                } else {
                    this.toast.open(this.updating$.value ? Messages.LINK_UPDATE_SUCCESS : Messages.LINK_CREATE_SUCCESS);
                    this.close((response as {link: Link}).link);
                }
            }, (errResponse: BackendErrorResponse) => this.linkForm.setErrors(errResponse.errors));
    }

    public close(data?: Link|Link[]) {
        this.dialogRef.close(data);
    }

    public toggleOptions() {
        this.optionsVisible$.next(!this.optionsVisible$.value);
    }

    public typeViewName() {
        const type = this.linkForm.formGroup.get('type').value;
        return type.split(':')[0];
    }

    private getPayload() {
        const payload = this.linkForm.value();
        if (this.data.group) {
            payload.groups = [...payload.groups, this.data.group.id];
        }
        return payload;
    }

    public toggleMultiple(e: MatSlideToggleChange) {
        this.multiple$.next(e.checked);
        this.optionsVisible$.next(false);
    }

    private urlInvalid(url: string) {
        return !urlRegex({exact: true, strict: false}).test(url);
    }
}
