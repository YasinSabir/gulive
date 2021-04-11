import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Toast} from '@common/core/ui/toast.service';
import {ApiKey} from '../api-keys/api-key';
import {Messages} from '../../messages.enum';
import {LinkGroup} from '../link/link-group';
import {hasKey} from '@common/core/utils/has-key';
import {Settings} from '@common/core/config/settings.service';
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
    selector: 'copy-api-btn',
    templateUrl: './copy-api-btn.component.html',
    styleUrls: ['./copy-api-btn.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyApiBtnComponent {
    @Input() model: ApiKey|LinkGroup;

    constructor(private toast: Toast, private settings: Settings, private clipboard: Clipboard) {}

    public copyLink() {
        let url: string;
        if (hasKey('api_key', this.model)) {
            url = this.model.api_key;
        }
        const status = this.clipboard.copy(url);
        if (status) {
            this.toast.open(Messages.LINK_COPY_SUCCESS);
        }
    }
}
