import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LinkType} from '../../../shared/link/link';
import {LinkOptionsList} from '../types';
import {Settings} from '@common/core/config/settings.service';

@Component({
    selector: 'link-type-menu',
    templateUrl: './link-type-menu.component.html',
    styleUrls: ['./link-type-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: LinkTypeMenuComponent,
        multi: true,
    }]
})
export class LinkTypeMenuComponent implements ControlValueAccessor {
    @ViewChild('rootMenu', {static: true}) matMenu: MatMenu;
    @Input() linkOptions: LinkOptionsList;
    public value: string;
    private propagateChange: Function;

    constructor(
        private cd: ChangeDetectorRef,
        public settings: Settings,
    ) {}

    public writeValue(value: string) {
        this.value = value;
        this.cd.detectChanges();
    }

    public registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public selectValue(value: LinkType|string) {
        this.value = value;
        this.propagateChange(value);
    }
}
