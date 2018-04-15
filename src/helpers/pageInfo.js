import MyActivities from '../containers/MyActivities';
import Society from '../containers/Society';
import VerifyActivities from '../containers/VerifyActivities';
import HomeIcon from '../components/svgIcons/menuIcons/Home';
import MyActivitiesIcon from '../components/svgIcons/menuIcons/MyActivities';
import VerifyActivitiesIcon from '../components/svgIcons/menuIcons/VerifyActivities';
import RedemptionsIcon from '../components/svgIcons/menuIcons/Redemptions';
import InvictusIcon from '../components/svgIcons/societyIcons/Invictus';
import IstelleIcon from '../components/svgIcons/societyIcons/Istelle';
import SparksIcon from '../components/svgIcons/societyIcons/Sparks';
import PhoenixIcon from '../components/svgIcons/societyIcons/Phoenix';
import Redemptions from '../containers/Redemptions';

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
      url: '/u/redemptions',
      component: Redemptions,
      menuIcon: RedemptionsIcon,
    },
  ],
  societyPages: [
    {
      url: '/society/istelle',
      title: 'iStelle',
      component: Society,
      menuIcon: IstelleIcon,
    },
    {
      url: '/society/invictus',
      title: 'Invictus',
      component: Society,
      menuIcon: InvictusIcon,
    },
    {
      url: '/society/sparks',
      title: 'Sparks',
      component: Society,
      menuIcon: SparksIcon,
    },
    {
      url: '/society/phoenix',
      title: 'Phoenix',
      component: Society,
      menuIcon: PhoenixIcon,
    },
  ],
};

export default pageInfo;
