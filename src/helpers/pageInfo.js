import MyActivities from '../containers/MyActivities';
import VerifyActivities from '../containers/VerifyActivities';
import HomeIcon from '../components/svgIcons/menuIcons/Home';
import MyActivitiesIcon from '../components/svgIcons/menuIcons/MyActivities';
import VerifyActivitiesIcon from '../components/svgIcons/menuIcons/VerifyActivities';
import RedemptionsIcon from '../components/svgIcons/menuIcons/Redemptions';
import InvictusIcon from '../components/svgIcons/societyIcons/Invictus';
import IstelleIcon from '../components/svgIcons/societyIcons/Istelle';
import SparksIcon from '../components/svgIcons/societyIcons/Sparks';
import PhoenixIcon from '../components/svgIcons/societyIcons/Phoenix';

const pageInfo = {
  pages: [
    {
      title: 'Home',
      url: '/u/my-activities',
      component: MyActivities,
      menuIcon: HomeIcon,
    },
    {
      title: 'My Activities',
      url: '/u/my-activities',
      component: MyActivities,
      menuIcon: MyActivitiesIcon,
    },
    {
      title: 'Verify Activitites',
      url: '/u/verify-activities',
      component: VerifyActivities,
      menuIcon: VerifyActivitiesIcon,
    },
    {
      title: 'Redemptions',
      url: '/u/verify-activities',
      component: VerifyActivities,
      menuIcon: RedemptionsIcon,
    },
  ],
  societyPages: [
    {
      url: '/',
      title: 'iStelle',
      menuIcon: IstelleIcon,
    },
    {
      url: '/',
      title: 'Invictus',
      menuIcon: InvictusIcon,
    },
    {
      url: '/',
      title: 'Sparks',
      menuIcon: SparksIcon,
    },
    {
      url: '/',
      title: 'Phoenix',
      menuIcon: PhoenixIcon,
    },
  ],
};

export default pageInfo;
