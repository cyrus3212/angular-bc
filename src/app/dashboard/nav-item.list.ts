import { NavModel } from './nav.model';

export const NAVIGATION_ITEMS: NavModel[] = [
    {
        id: 0,
        icon: 'fa-dashboard',
        label: 'Dashboard'
    },
    {
        id: 1,
        icon: 'fa-clock-o',
        label: 'Promotion Management'
    },
    {
        id: 2,
        icon: 'fa-bookmark',
        label: 'Promotion Assignment'
    },
    {
        id: 4,
        icon: 'fa-line-chart',
        label: 'Reports'
    },
    {
        id: 5,
        icon: 'fa-building-o',
        label: 'Merchant Management'
    },
    {
        id: 6,
        icon: 'fa-briefcase',
        label: 'Branch Management'
    },
    {
        id: 7,
        icon: 'fa-book',
        label: 'Franchise Management'
    },
    {
        id: 8,
        icon: 'fa-cloud-upload',
        label: 'Import List'
    }
];

export const NAVIGATION_ITEMS_ADMIN: NavModel[] = [
    {
        id: 3,
        icon: 'fa-users',
        label: 'User Management'
    }
];
