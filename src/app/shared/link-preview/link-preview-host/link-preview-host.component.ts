import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit
} from '@angular/core';
import {Bootstrapper} from '@common/core/bootstrapper.service';
import {Link} from '../../link/link';
import {BehaviorSubject} from 'rxjs';
import {MetaTag, MetaTagsService} from '@common/core/meta/meta-tags.service';
import {LinkGroup} from '../../link/link-group';

interface LinkResponse {
    link: Link;
    seo: MetaTag[];
}

interface LinkGroupResponse {
    linkGroup: LinkGroup;
    seo: MetaTag[];
}

@Component({
    selector: 'link-preview-host',
    templateUrl: './link-preview-host.component.html',
    styleUrls: ['./link-preview-host.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkPreviewHostComponent implements OnInit {
    public link: Link;
    public linkGroup: LinkGroup;
    public passwordConfirmed$ = new BehaviorSubject<boolean>(false);

    constructor(
        private bootstrapper: Bootstrapper,
        private metaTags: MetaTagsService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        if (this.bootstrapper.data.linkResponse) {
            const {link, seo} = this.bootstrapper.data.linkResponse as LinkResponse;
            this.link = link;
            this.metaTags.latestMetaTags$.next(seo);
        } else if (this.bootstrapper.data.linkGroupResponse) {
            const {linkGroup, seo} = this.bootstrapper.data.linkGroupResponse as LinkGroupResponse;
            this.linkGroup = linkGroup;
            this.metaTags.latestMetaTags$.next(seo);
        }
        this.cd.markForCheck();
    }

    public hidePasswordPanel() {
        if (this.link.type === 'direct') {
            window.location.replace(this.link.long_url);
        } else {
            this.passwordConfirmed$.next(true);
        }
    }
}
