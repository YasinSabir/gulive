import {SelectOptionLists} from '@common/core/services/value-lists.service';
import {LinkOverlay} from '../link-overlay/link-overlay';
import {TrackingPixel} from '../pixels/tracking-pixel';
import {LinkGroup} from '../../shared/link/link-group';

export const LINK_PAGE_TYPE = 'link_page';

export interface LinkOptionsList extends SelectOptionLists {
    overlays?: LinkOverlay[];
    pixels?: TrackingPixel[];
    groups?: LinkGroup[];
}
