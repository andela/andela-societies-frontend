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
    redemptionActivities: activities,
    filteredRedemptionActivities: activities,
    selectedStatus: 'All',
    initialStatus: 'All',
  };

  it('should return correct date format', () => {
    expect(filterActivities('Pending', context).filteredRedemptionActivities[0]).toBe(activities[0]);
  });
});
