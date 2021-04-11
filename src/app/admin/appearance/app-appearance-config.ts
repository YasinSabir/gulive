import {HomepageAppearancePanelComponent} from './homepage-appearance-panel/homepage-appearance-panel.component';
import {AppearanceEditorConfig} from '../../../common/admin/appearance/appearance-editor-config.token';

export const APP_APPEARANCE_CONFIG: AppearanceEditorConfig = {
    defaultRoute: '/',
    navigationRoutes: [
        '/',
        'dashboard',
    ],
    menus: {
        positions: [
            'dashboard-navbar',
            'dashboard-sidebar',
            'homepage-navbar',
            'admin-navbar',
            'custom-page-navbar',
            'footer',
        ],
        availableRoutes: [
            'dashboard',
            'dashboard/links',
            'dashboard/groups',
            'dashboard/custom-domains',
            'dashboard/link-overlays',
            'dashboard/custom-pages',
            'dashboard/pixels',
            'dashboard/workspaces',
        ]
    },
    sections: [
        {
            name: 'homepage',
            component: HomepageAppearancePanelComponent,
            position: 1,
        }
    ]
};
