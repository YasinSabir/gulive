import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnInit,
    ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LinkOverlayComponent} from '../../../../shared/link-overlay/link-overlay.component';
import {LinkOverlayService} from '../../link-overlay.service';
import {Toast} from '../../../../../common/core/ui/toast.service';
import {Translations} from '../../../../../common/core/translations/translations.service';
import {LinkOverlay} from '../../link-overlay';
import {Messages} from '../../../../messages.enum';
import {finalize} from 'rxjs/operators';
import {BackendErrorResponse} from '../../../../../common/core/types/backend-error-response';
import {BehaviorSubject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'crupdate-link-overlay-page',
    templateUrl: './crupdate-link-overlay-page.component.html',
    styleUrls: ['./crupdate-link-overlay-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrupdateLinkOverlayPageComponent implements AfterViewInit, OnInit {
    @ViewChild(LinkOverlayComponent, {static: true}) overlayCmp: LinkOverlayComponent;
    public loading$ = new BehaviorSubject(false);
    public errors: Partial<LinkOverlay> = {};
    public overlay: LinkOverlay;

    public form = this.fb.group({
        name: [''],
        position: [''],
        theme: [''],
        message: [''],
        label: [''],
        label_position: [''],
        btn_link: [''],
        btn_text: [''],
        colors: this.fb.group({
            'bg-color': this.fb.control(['']),
            'text-color': this.fb.control(['']),
            'label-bg-color': this.fb.control(['']),
            'label-color': this.fb.control(['']),
            'btn-bg-color': this.fb.control(['']),
            'btn-text-color': this.fb.control(['']),
        }),
    });

    constructor(
        private fb: FormBuilder,
        private linkOverlays: LinkOverlayService,
        private toast: Toast,
        private i18n: Translations,
        private cd: ChangeDetectorRef,
        private router: Router,
        public route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params.id) {
                this.loading$.next(true);
                this.linkOverlays.get(params.id)
                    .pipe(finalize(() => this.loading$.next(false)))
                    .subscribe(response => {
                        this.overlay = response.linkOverlay;
                        this.form.patchValue({...this.overlay});
                    });
            }
        });
    }

    ngAfterViewInit() {
        if ( ! this.route.snapshot.params.id) {
            this.form.patchValue({...this.getDefaultValue()});
        }
    }

    public confirm() {
        this.loading$.next(true);
        const request = this.overlay ?
            this.linkOverlays.update(this.overlay.id, this.form.value) :
            this.linkOverlays.create(this.form.value);

        const msg = this.overlay ?
            Messages.LINK_OVERLAY_UPDATE_SUCCESS :
            Messages.LINK_OVERLAY_CREATE_SUCCESS;

        request
            .pipe(finalize(() => this.loading$.next(false)))
            .subscribe(() => {
                this.toast.open(msg);
                this.router.navigate([this.route.snapshot.params.id ? '../../' : '../'], {relativeTo: this.route});
            }, (errResponse: BackendErrorResponse) => {
                this.errors = errResponse.errors;
                this.cd.markForCheck();
            });
    }

    public colorControls() {
        return (this.form.get('colors') as FormGroup).controls;
    }

    public colorViewName(name: string) {
        return name.replace(/-/g, ' ')
            .replace('bg', 'background')
            .replace('btn', 'button');
    }

    private getDefaultValue() {
        const defaults = {
            position: 'bottom-left',
            theme: 'default',
            message: this.i18n.t('Your message here'),
            label: this.i18n.t('Label'),
            btn_text: this.i18n.t('Button Text'),
            btn_link: 'https://google.com',
            colors: {},
        };
        const style = this.overlayCmp.getComputedStyle();
        Object.keys(this.colorControls()).forEach(key => {
            defaults.colors[key] = style.getPropertyValue('--' + key).trim();
        });
        return defaults;
    }
}
