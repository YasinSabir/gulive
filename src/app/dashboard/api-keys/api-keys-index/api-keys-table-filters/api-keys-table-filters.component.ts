import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DatatableService} from '../../../../../common/datatable/datatable.service';
import {Model} from '../../../../../common/core/types/models/model';

@Component({
    selector: 'api-keys-table-filters',
    templateUrl: './api-keys-table-filters.component.html',
    styleUrls: ['./api-keys-table-filters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiKeysTableFiltersComponent implements OnInit {
    @Input() showUserFilter = false;

    public form = this.fb.group({
        status: null,
        password: null,
        expiration: null,
        type: null,
        user_id: null,
    });

    constructor(
        private fb: FormBuilder,
        private datable: DatatableService<Model>,
    ) {
        this.form.patchValue(this.datable.filters$.value);
    }

    ngOnInit() {
        this.form.valueChanges.subscribe(value => {
            this.datable.filters$.next(value);
        });
    }
}
