import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Toast} from '@common/core/ui/toast.service';
import {Link} from '../link/link';
import {Messages} from '../../messages.enum';
import {LinkGroup} from '../link/link-group';
import {hasKey} from '@common/core/utils/has-key';
import {Settings} from '@common/core/config/settings.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
    selector: 'copy-link-btn',
    templateUrl: './copy-link-btn.component.html',
    styleUrls: ['./copy-link-btn.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyLinkBtnComponent {
    @Input() model: Link|LinkGroup;

    constructor(private toast: Toast, private settings: Settings, private clipboard: Clipboard) {}

    public copyLink() {
        let url: string;
        if (hasKey('short_url', this.model)) {
            url = this.model.short_url;
        } else {
            url =  `${this.settings.getBaseUrl(true)}/${this.model.hash}`;
        }
        const status = this.clipboard.copy(url);
        if (status) {
            this.toast.open(Messages.LINK_COPY_SUCCESS);
        }
    }
}
