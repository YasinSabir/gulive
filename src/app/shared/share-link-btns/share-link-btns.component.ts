import {Component, ChangeDetectionStrategy, Input, HostBinding} from '@angular/core';
import {shareLinkSocially} from '@common/core/utils/share-link-socially';
import {Messages} from '../../messages.enum';
import * as copy from 'copy-to-clipboard';
import {Link} from '../link/link';
import {Toast} from '@common/core/ui/toast.service';
import {Translations} from '@common/core/translations/translations.service';

@Component({
    selector: 'share-link-btns',
    templateUrl: './share-link-btns.component.html',
    styleUrls: ['./share-link-btns.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareLinkBtnsComponent {
    @Input() link: Link;
    @Input() showCopyBtn = false;
    @Input() @HostBinding('class.colored') colored = false;

    constructor(
        private toast: Toast,
        private i18n: Translations,
    ) {}

    public shareUsing(network: 'facebook'|'twitter') {
        shareLinkSocially(network, this.link.short_url, this.i18n.t('Check out this link'));
    }

    public copyQr() {
        const result = copy(this.link.short_url + '/qr');
        if (result) {
            this.toast.open(Messages.QR_COPY_SUCCESS);
        }
    }
}
