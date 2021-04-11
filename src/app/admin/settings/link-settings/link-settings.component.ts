import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SettingsPanelComponent} from '@common/admin/settings/settings-panel.component';
import {BehaviorSubject} from 'rxjs';
import {CustomDomain} from '@common/custom-domain/custom-domain';

@Component({
    selector: 'link-settings',
    templateUrl: './link-settings.component.html',
    styleUrls: ['./link-settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {'class': 'settings-panel'},
})
export class LinkSettingsComponent extends SettingsPanelComponent implements OnInit {
    public customDomains$ = new BehaviorSubject<CustomDomain[]>([]);
    public defaultDomain: string;

    public ngOnInit() {
        this.valueLists.get(['domains']).subscribe(response => {
            this.customDomains$.next(response.domains);
        });

        this.defaultDomain = this.settings.getBaseUrl()
            .replace(/\/$/, '');
    }
}
