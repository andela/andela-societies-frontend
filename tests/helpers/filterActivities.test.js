import filterActivities from '../../src/helpers/filterActivities';

describe('filter Activities', () => {
  const activities = [
    {
      id: 1,
      category: 'Category 1',
      date: '2017-11-03',
      activity: '',
      points: 250,
      status: 'Pending',
    },
    {
      id: 2,
      category: 'category 2',
      date: '2017-11-03',
      activity: '',
      points: 250,
      status: 'Approved',
    },
  ];

  const context = {
    allActivities: activities,
    filteredActivities: activities,
    selectedStatus: 'All',
    initialStatus: 'All',
    showUserDetails: true,
  };

  it('should return activities  with status pending if `Pending` status is selected', () => {
    expect(filterActivities('Pending', context).filteredActivities[0]).toBe(activities[0]);
  });
  it('should return all activities if `All` status is selected', () => {
    expect(filterActivities('All', context).filteredActivities).toBe(activities);
  });
});
