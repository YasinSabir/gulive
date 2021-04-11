import {AppConfig} from '@common/core/config/app-config';

export const BELINK_CONFIG: AppConfig = {
    assetsPrefix: 'client',
    navbar: {
        defaultPosition: 'homepage-navbar',
        defaultColor: 'primary',
        dropdownItems: [
            {route: '/dashboard', name: 'Dashboard', icon: 'link'},
        ]
    },
    auth: {
        redirectUri: '/dashboard',
        adminRedirectUri: '/dashboard',
    },
    accountSettings: {
        hideNavbar: false,
    },
    customPages: {
        hideNavbar: false,
    },
    admin: {
        analytics: {
            channels: [
                {name: 'link reports', route: '/admin/analytics/links'},
                {name: 'google analytics', route: '/admin/analytics/google'}
            ]
        },
        ads: [
            {
                slot: 'ads.splash.top',
                description: 'Top of link splash page',
            },
            {
                slot: 'ads.splash.bottom',
                description: 'Bottom of link splash page',
            },
            {
                slot: 'ads.dashboard.top',
                description: 'Top of user dashboard page',
            },
            {
                slot: 'ads.frame.top',
                description: 'Top of link frame page',
            },
            {
                slot: 'ads.landing.top',
                description: 'Top of landing page',
            },
            {
                slot: 'ads.page.top',
                description: 'Top of custom link page',
            },
        ],
        pages: [
            {name: 'links', icon: 'link', route: 'links', permission: 'links.view'},
            // {name: 'api keys', icon: 'link', route: 'api-keys' , permission: 'links.view'},
            {name: 'link groups', icon: 'copy-link', route: 'link-groups', permission: 'link_groups.view'},
            {name: 'link overlays', icon: 'tooltip', route: 'link-overlays', permission: 'link_overlays.view'},
            {name: 'tracking pixels', icon: 'tracking', route: 'pixels', permission: 'tracking_pixels.view'},
            {name: 'custom domains', icon: 'www', route: 'custom-domains', permission: 'custom_domains.view'},
        ]
    },
};
