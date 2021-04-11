import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'app-footer',
    templateUrl: './app-footer.component.html',
    styleUrls: ['./app-footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFooterComponent {
    constructor(public settings: Settings) {}

    public year() {
        return new Date().getFullYear();
    }
}
