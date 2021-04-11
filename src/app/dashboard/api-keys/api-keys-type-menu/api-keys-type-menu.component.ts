import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {LinkType} from '../../../shared/link/link';
import {LinkOptionsList} from '../types';
import {Settings} from '../../../../common/core/config/settings.service';

@Component({
    selector: 'api-keys-type-menu',
    templateUrl: './api-keys-type-menu.component.html',
    styleUrls: ['./api-keys-type-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ApiKeysTypeMenuComponent,
        multi: true,
    }]
})
export class ApiKeysTypeMenuComponent implements ControlValueAccessor {
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
