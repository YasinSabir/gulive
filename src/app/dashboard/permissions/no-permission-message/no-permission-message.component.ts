import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    Optional
} from '@angular/core';
import {OverlayPanelRef} from '../../../../common/core/ui/overlay-panel/overlay-panel-ref';
import {OVERLAY_PANEL_DATA} from '../../../../common/core/ui/overlay-panel/overlay-panel-data';
import {LinkUsageService} from '../../../shared/link/link-usage.service';
import {Settings} from '../../../../common/core/config/settings.service';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
    selector: 'no-permission-message',
    templateUrl: './no-permission-message.component.html',
    styleUrls: ['./no-permission-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoPermissionMessageComponent implements OnInit, OnDestroy {
    public transValues: {
        resource?: string,
        type?: string,
    } = {};
    public createFailType: 'overQuota' | 'noPermission';
    public userOwnsWorkspace: boolean;
    public forWorkspace: boolean;
    private usageSub: Subscription;
    public action: 'create'|'delete'|'update';

    constructor(
        @Optional() private overlayPanelRef: OverlayPanelRef,
        @Inject(OVERLAY_PANEL_DATA) @Optional() public data: {permission: string},
        private linkUsage: LinkUsageService,
        public settings: Settings,
    ) {}

    ngOnInit() {
        this.usageSub = this.linkUsage.response$.pipe(take(1)).subscribe(response => {
            // links.create
            const [resource, action] = this.data.permission.split('.');
            this.action = action as any;
            this.createFailType = response.usage[resource].createFailType;
            this.userOwnsWorkspace = response.userOwnsWorkspace;
            this.forWorkspace = response.forWorkspace;
            this.transValues = {
                resource: resource.replace('_', ' '),
                type: this.forWorkspace ? 'workspace' : 'plan',
            };
        });
    }

    ngOnDestroy() {
        this.usageSub.unsubscribe();
    }

    public close() {
        this.overlayPanelRef && this.overlayPanelRef.close();
    }
}
