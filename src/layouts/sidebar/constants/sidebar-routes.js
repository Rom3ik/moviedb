import {FiCommand, FiDisc, FiHelpCircle, FiHome, FiSearch, FiSettings} from "react-icons/fi";

export const SidebarRoutes = [
    {
        name: 'Home',
        identifier: 'dashboard',
        icon: <FiHome />
    },
    {
        name: 'Discovery',
        identifier: 'discovery',
        icon: <FiDisc />
    }
    ,
    {
        name: 'Community',
        identifier: 'community',
        icon: <FiCommand />
    }
    ,
    {
        name: 'Search',
        identifier: 'search',
        icon: <FiSearch />
    }
    ,
    {
        name: 'Settings',
        identifier: 'settings',
        icon: <FiSettings />
    },
    {
        name: 'Help',
        identifier: 'help',
        icon: <FiHelpCircle/>
    }
]
