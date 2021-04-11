import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input, OnDestroy,
    OnInit, Optional,
    ViewContainerRef
} from '@angular/core';
import {ActiveWorkspace} from './workspaces/active-workspace.service';
import {MatButton} from '@angular/material/button';
import {CurrentUser} from '../../common/auth/current-user';
import {OverlayPanel} from '../../common/core/ui/overlay-panel/overlay-panel.service';
import {OverlayPanelRef} from '../../common/core/ui/overlay-panel/overlay-panel-ref';
import {TOP_POSITION} from '../../common/core/ui/overlay-panel/positions/top-position';
import {NoPermissionMessageComponent} from './permissions/no-permission-message/no-permission-message.component';
import {LinkUsageService} from '../shared/link/link-usage.service';
import {LinkUsageResponse} from '../shared/link/link-usage-response';
import {ucFirst} from '../../common/core/utils/uc-first';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Directive({
    selector: '[permissionAwareButton]',
})
export class PermissionAwareButtonDirective implements OnInit, OnDestroy {
    @Input('permissionAwareButton') permission: string;
    @Input() resource: {user_id: number};
    private overlayRef: OverlayPanelRef<NoPermissionMessageComponent>;
    private hoverListener: HTMLDivElement;
    private usageSub: Subscription;

    constructor(
        private activeWorkspace: ActiveWorkspace,
        private el: ElementRef<HTMLButtonElement>,
        @Optional() private matButton: MatButton,
        private currentUser: CurrentUser,
        private overlay: OverlayPanel,
        private viewContainerRef: ViewContainerRef,
        private usage: LinkUsageService,
        private router: Router,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnInit() {
        if ( ! this.insideAdmin() && this.matButton) {
            this.matButton.disabled = true;
            this.usageSub = this.usage.response$
                .subscribe(response => {
                    this.checkPermission(response);
                });
        }
    }

    ngOnDestroy() {
        this.usageSub?.unsubscribe();
    }

    private checkPermission(usageInfo: LinkUsageResponse) {
        const [resourceName, action] = this.permission.split('.');
        const editingOwnResource = this.resource?.user_id === this.currentUser.get('id');
        // link.create => usage[links].canCreate
        if (!usageInfo.userOwnsWorkspace && !editingOwnResource && !usageInfo.usage[resourceName][`can${ucFirst(action)}`]) {
            this.createHoverListener();
            this.matButton.disabled = true;
        } else {
            this.hoverListener?.remove();
            this.matButton.disabled = false;
        }
        this.cd.markForCheck();
    }

    private createHoverListener() {
        if ( ! this.hoverListener ) {
            const el = document.createElement('div');
            el.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0';
            el.addEventListener('mouseenter', () => {
                this.matButton.disabled && this.showMessage();
            });
            el.addEventListener('mouseleave', (e) => {
                if ( ! this.matButton.disabled) {
                    return false;
                }
                const toElement = (e['toElement'] || e.relatedTarget) as HTMLElement;
                if ( !toElement || toElement.nodeName.toLowerCase() !== 'no-permission-message') {
                    this.hideMessage();
                }
            });
            this.el.nativeElement.appendChild(el);
            this.hoverListener = el;
        }
    }

    public showMessage() {
        if (this.overlayRef) {
            this.hideMessage();
        }
        this.overlayRef = this.overlay.open(NoPermissionMessageComponent, {
            origin: this.el,
            position: TOP_POSITION,
            hasBackdrop: false,
            scrollStrategy: 'close',
            viewContainerRef: this.viewContainerRef,
            data: {permission: this.permission},
        });
        this.overlayRef.getPanelEl().addEventListener('mouseleave', () => {
            this.hideMessage();
        });
    }

    public hideMessage() {
        if (this.overlayRef) {
            this.overlayRef.close();
            this.overlayRef = null;
        }
    }

    private insideAdmin() {
        return this.router.url.indexOf('admin') > -1;
    }
}
