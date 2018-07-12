const numberOfItems = 9;

const activity = {
  id: '',
  category: 'Participating in a tech event',
  date: '2017-11-03',
  activity: '',
  points: 250,
  status: 'default',
  owner: 'Lawrence Wachira',
  activityDate: '2017-11-03',
  name: 'insert name here',
  societyName: '',
};

const statuses = ['pending', 'expired', 'approved', 'default'];
const societyIds = [1, 2, 3, 4];

const descriptions = [
  'Mentored teens how to code. (DBC 2016 at Redemption camp)',
  'Jim Shelton of ChanZuckerberginitiative sits down with Andela fellows ' +
  'at Andela\'s Nairobi HQ in a Facebook Live event',
];

const arr = [];

for (let i = 0; i < numberOfItems; i += 1) {
  arr.push({
    ...activity,
    id: Math.random().toString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    activity: descriptions[Math.floor(Math.random() * descriptions.length)],
    societyName: societyIds[Math.floor(Math.random() * statuses.length)],
  });
}

export default arr;
