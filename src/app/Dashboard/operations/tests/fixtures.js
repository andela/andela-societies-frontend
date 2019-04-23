const numberOfItems = 4;

export const activity = {
  id: '',
  category: 'Tech events',
  date: '2017-11-03',
  createdAt: '2017-11-03',
  activity: 'Participating in a tech event',
  points: 250,
  status: 'default',
  owner: 'Lawrence Wachira',
  activityDate: '2017-11-03',
  name: 'insert name here',
  society: '',
};

const activityItem = {
  data: {
    activityId: 'eefad176-43cd-11e8-b3b9-9801a7ae0329',
    name: null,
    createdAt: '2018-06-03T18:31:25.783099+00:00',
    description: 'blah blah',
    societyId: 'eef704b0-43cd-11e8-97fb-9801a7ae0329',
    activity: '2018-jun-bootcamp-18',
    category: 'Bootcamp Interviews',
    society: 'Phoenix',
    activityTypeId: 'eef0e594-43cd-11e8-87a7-9801a7ae0329',
    approvedBy: null,
    status: 'pending',
    modifiedAt: null,
    owner_photo: 'https://lh3.googleusercontent.com/-Ke1NKb5MPuk/AAAAAAAAAAI/AAAAAAAAABg/8ofOe_CueLA/photo.jpg?sz=50',
    id: '87d137f6-4724-11e8-97ee-9801a7ae0329',
    points: 100,
    redeemed: false,
    reviewedBy: null,
    date: '2018-06-03',
    user: 'Lawrence Wachira',
  },
  message: 'Activity logged successfully',
};

export const myActivityItem = {
  activity: activityItem,
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
  'Jim Shelton of ChanZuckerberginitiative sits down with Andela fellows '
  + 'at Andela\'s Nairobi HQ in a Facebook Live event',
];

const category = {};

export const categories = [{
  createdAt: '2018-04-19T12:33:59.112718+00:00',
  description: 'Interviewing candidate for a fellow recruiting event',
  id: 'eef0e594-43cd-11e8-87a7-9801a7ae0329',
  modifiedAt: null,
  name: 'Bootcamp Interviews',
  supportsMultipleParticipants: true,
  photo: null,
  value: 20,
},
{
  createdAt: '2018-04-19T12:33:59.116177+00:00',
  description: 'Participating in a Hackathon',
  id: 'eef48c80-43cd-11e8-9362-9801a7ae0329',
  modifiedAt: null,
  name: 'Hackathon',
  supportsMultipleParticipants: false,
  photo: null,
  value: 100,
}];

const activities = [];

for (let i = 0; i < numberOfItems; i += 1) {
  activities.push({
    ...activity,
    id: activityIDs[Math.floor(Math.random() * activityIDs.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    society: societies[Math.floor(Math.random() * societies.length)],
  });
}

export const myloggedActivities = {
  level: { name: 'D1 developer' },
  activitiesLogged: 4,
  data: activities,
  pointsEarned: 300,
  activity: category,
  society: 'Phoenix',
  categoryError: 'Categories load failed',
  logError: 'Log activity points failed',
};

export default activities;
