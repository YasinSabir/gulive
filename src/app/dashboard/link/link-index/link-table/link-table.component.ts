import {ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';
import {Link} from '../../../../shared/link/link';
import {Router} from '@angular/router';
import {ActiveWorkspace} from '../../../workspaces/active-workspace.service';

@Component({
    selector: 'link-table',
    templateUrl: './link-table.component.html',
    styleUrls: ['./link-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkTableComponent implements OnInit {
    @Input() links: Link[] = [];
    @Input() showOwnerColumn = false;
    @ContentChild('editButton') editButtonTemplate: TemplateRef<Link>;

    constructor(
        private router: Router,
        public activeWorkspace: ActiveWorkspace,
    ) {
    }


    ngOnInit() {
        console.log(decodeURIComponent('http://localhost/belink-link-shorterner/%E2%9B%84'));
    }

    public decodeURL_(param: string){
        return decodeURIComponent(param);
    }

    public getParentRoute(): string {
        return this.router.url.indexOf('admin') > -1 ? 'admin' : 'dashboard';
    }
}
