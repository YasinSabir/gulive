import {LinkRule} from './link-rule';
import {Tag} from '@common/core/types/models/Tag';
import {LinkOverlay} from '../../dashboard/link-overlay/link-overlay';
import {CustomPage} from '@common/core/types/models/CustomPage';
import {TrackingPixel} from '../../dashboard/pixels/tracking-pixel';
import {User} from '@common/core/types/models/User';

export type LinkType = 'direct'|'frame'|'splash'|'overlay'|'page';

export interface Link {
    id: number;
    hash: string;
    title: string;
    image: string;
    alias: string|null;
    description: string;
    expires_at: string;
    password?: string;
    has_password: boolean;
    disabled: boolean;
    domain_id: number;
    short_url: string;
    long_url: string;
    type: LinkType;
    type_id: number|null;
    custom_page?: LinkOverlay|CustomPage|null;
    user_id: number;
    created_at: string;
    updated_at: string;
    rules: LinkRule[];
    tags?: Tag[];
    pixels?: TrackingPixel[];
    clicks_count?: number;
    user?: User;
    deleted_at?: string;
}
