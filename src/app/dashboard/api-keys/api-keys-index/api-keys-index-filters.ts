import {DataTableFilter} from '@common/shared/data-table/filter-panel/data-table-filters';
import {PaginatedDataTableSource} from '../common/shared/data-table/data/paginated-data-table-source';
import {Link} from '../../../shared/link/link';

export const LINK_INDEX_FILTERS: DataTableFilter[] = [
    {
        name: 'status',
        column: 'status',
        type: 'select',
        options: [
            {name: 'all'},
            {name: 'enabled', value: 'enabled'},
            {name: 'disabled', value: 'disabled'},
            {name: 'expired', value: 'expired'},
        ]
    },
    {
        name: 'password',
        column: 'password',
        type: 'select',
        options: [
            {name: 'all'},
            {name: 'with_password', value: true},
            {name: 'without_password', value: false}
        ]
    },
    {
        name: 'expiration',
        column: 'expires_at',
        type: 'select',
        options: [
            {name: 'all'},
            {name: 'with_expiration_date', value: true},
            {name: 'without_expiration_date', value: false}
        ]
    },
    {
        name: 'type',
        column: 'type',
        type: 'select',
        options: [
            {name: 'all'},
            {name: 'direct'},
            {name: 'overlay'},
            {name: 'frame'},
            {name: 'custom_page'},
        ]
    },
    {
        name: 'user',
        column: 'user_id',
        type: 'user-select',
        condition: (dataSource: PaginatedDataTableSource<Link>) => {
            return !dataSource.config.staticParams.userId;
        }
    },
];
