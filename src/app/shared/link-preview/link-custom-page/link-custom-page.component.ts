import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Link} from '../../link/link';
import {timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Settings} from '@common/core/config/settings.service';
import {CustomPage} from '@common/core/types/models/CustomPage';

@Component({
    selector: 'link-custom-page',
    templateUrl: './link-custom-page.component.html',
    styleUrls: ['./link-custom-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkCustomPageComponent {
    @Input() link: Link;

    // redirect user after 10 seconds
    public timeout$ = timer(0, 1000).pipe(
        map(i => this.redirectTime() - i),
        takeWhile(n => n > 0)
    );

    constructor(private settings: Settings) {
        if (this.redirectTime() > 0) {
            this.timeout$.subscribe(seconds => {
                if (seconds === 0) {
                    this.redirect();
                }
            });
        }
    }

    public redirect() {
        window.location.href = this.link.long_url;
    }

    public redirectTime() {
        return this.settings.get('links.redirect_time', 10);
    }

    public shouldHideNav(): boolean {
        return (this.link?.custom_page as CustomPage)?.hide_nav;
    }
}
