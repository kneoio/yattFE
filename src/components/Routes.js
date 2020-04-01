import { Home, ContentPaste, Notifications, AccountCircle } from '@material-ui/icons';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';

const Routes = [
    {
        path: '/home',
        sidebarName: 'Home',
        navbarName: 'Home',
        icon: Home,
        component: HomePage
    },
    {
        path: '/profile',
        sidebarName: 'Profile',
        navbarName: 'Profile',
        icon: AccountCircle,
        component: ProfilePage
    }

];

export default Routes;