const numberOfItems = 4;

export const activity = {
  id: '',
  category: 'Participating in a tech event',
  date: '2017-11-03',
  activity: '',
  points: 250,
  status: 'default',
  owner: 'Lawrence Wachira',
  activityDate: '2017-11-03',
  name: 'insert name here',
  society: '',
};

const activityIDs = ['8437fa68-8e6b-11e8-a05c-9801a7ae0330', '8437fa68-8e6b-11e8-a05c-9801a7ae0331',
  '8437fa68-8e6b-11e8-a05c-9801a7ae0332', '8437fa68-8e6b-11e8-a05c-9801a7ae0333'];

const statuses = ['pending', 'expired', 'approved', 'default'];

const societies = [
  {
    id: '1',
    name: 'iStelle',
  },
  {
    id: '2',
    name: 'invictus',
  },
  {
    id: '3',
    name: 'sparks',
  },
  {
    id: '4',
    name: 'phoenix',
  }];

const descriptions = [
  'Mentored teens how to code. (DBC 2016 at Redemption camp)',
  'Jim Shelton of ChanZuckerberginitiative sits down with Andela fellows ' +
  'at Andela\'s Nairobi HQ in a Facebook Live event',
];

const activities = [];

for (let i = 0; i < numberOfItems; i += 1) {
  activities.push({
    ...activity,
    id: activityIDs[Math.floor(Math.random() * activityIDs.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    activity: descriptions[Math.floor(Math.random() * descriptions.length)],
    society: societies[Math.floor(Math.random() * societies.length)],
  });
}

export const myloggedActivities = {
  activitiesLogged: 4,
  data: activities,
  pointsEarned: 300,
  society: 'Phoenix',
}

export default activities;