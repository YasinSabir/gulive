import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Link} from '../../link/link';
import {timer} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'link-splash',
    templateUrl: './link-splash.component.html',
    styleUrls: ['./link-splash.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkSplashComponent {
    @Input() link: Link;

    public timeout$ = timer(0, 1000).pipe(
        map(i => this.redirectTime() - i),
        takeWhile(n => n >= 0)
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

    public imgUrl() {
        return `${this.settings.getBaseUrl(true)}${this.link.hash}/img`;
    }

    public redirectTime() {
        return this.settings.get('links.redirect_time', 10);
    }
}
