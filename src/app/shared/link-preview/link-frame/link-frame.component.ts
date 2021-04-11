import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {Link} from '../../link/link';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'link-frame',
    templateUrl: './link-frame.component.html',
    styleUrls: ['./link-frame.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkFrameComponent {
    private _link: Link;
    @Input() public set link(link: Link) {
        this._link = link;
        this.safeUrl =  this.sanitizer.bypassSecurityTrustResourceUrl(this.link.long_url);
    }
    public get link() {
        return this._link;
    }
    public safeUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}
}
