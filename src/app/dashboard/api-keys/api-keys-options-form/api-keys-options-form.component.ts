import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import {LinkForm} from '../../../shared/link/link.form';
import {Settings} from '@common/core/config/settings.service';
import {ucFirst} from '@common/core/utils/uc-first';
import {BehaviorSubject} from 'rxjs';
import {LinkOptionsList} from '../types';

@Component({
    selector: 'api-keys-options-form',
    templateUrl: './api-keys-options-form.component.html',
    styleUrls: ['./api-keys-options-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiKeysOptionsFormComponent implements OnChanges {
    @Input() linkOptions: LinkOptionsList;
    public defaultHost$ = new BehaviorSubject<string>(null);

    public aliasMin: number;
    public aliasMax: number;

    constructor(
        public linkForm: LinkForm,
        public settings: Settings,
    ) {
        this.aliasMin = this.settings.get('links.alias_min');
        this.aliasMax = this.settings.get('links.alias_max');
    }

    public ngOnChanges(changes: SimpleChanges) {
        if (changes.linkOptions.currentValue) {
            const defaultHost = this.settings.get('custom_domains.default_host');
            if (defaultHost) {
                this.defaultHost$.next(this.linkOptions.domains.find(d => d.host === defaultHost).host);
            } else {
                const baseUrl = this.settings.getBaseUrl()
                    .replace(/\/$/, '')
                    .replace(/(^\w+:|^)\/\//, '');
                this.defaultHost$.next(baseUrl);
            }
        }
    }

    public capitalize(string: string): string {
        return ucFirst(string);
    }
}
