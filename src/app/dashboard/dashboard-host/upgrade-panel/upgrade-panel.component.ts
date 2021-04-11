import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import {Settings} from '@common/core/config/settings.service';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {OverlayPanel} from '@common/core/ui/overlay-panel/overlay-panel.service';
import {LinkUsageInfoComponent} from '../link-usage-info/link-usage-info.component';
import {RIGHT_POSITION} from '@common/core/ui/overlay-panel/positions/right-position';
import {OverlayPanelRef} from '@common/core/ui/overlay-panel/overlay-panel-ref';
import {CurrentUser} from '@common/auth/current-user';

@Component({
    selector: 'upgrade-panel',
    templateUrl: './upgrade-panel.component.html',
    styleUrls: ['./upgrade-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpgradePanelComponent implements OnInit {
    @ViewChild('infoIcon', { read: ElementRef }) infoIcon: ElementRef<HTMLElement>;
    @Input() @HostBinding('class.compact') compact = false;
    private overlayRef: OverlayPanelRef<LinkUsageInfoComponent>;

    constructor(
        public settings: Settings,
        public linkUsage: LinkUsageService,
        public currentUser: CurrentUser,
        private overlay: OverlayPanel,
    ) {}

    ngOnInit() {
        this.linkUsage.reload();
    }

    public openPopover() {
        if (this.overlayRef) {
           this.closePopover();
        }
        const position = {...RIGHT_POSITION};
        position[0].offsetY = -15;
        this.overlayRef = this.overlay.open(LinkUsageInfoComponent, {
            origin: this.infoIcon,
            position: RIGHT_POSITION,
            hasBackdrop: false,
        });
    }

    public closePopover() {
        this.overlayRef && this.overlayRef.close();
        this.overlayRef = null;
    }

    public togglePopover() {
        if (this.overlayRef) {
            this.closePopover();
        } else {
            this.openPopover();
        }
    }
}
