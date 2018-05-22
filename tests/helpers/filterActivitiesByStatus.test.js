import filterActvitiesByStatus from '../../src/helpers/filterActivitiesByStatus';
import society from '../../src/fixtures/society';

describe('filterActvitiesByStatus', () => {
  it('should return activities with the specified status', () => {
    expect(filterActvitiesByStatus(society.loggedActivities, 'pending').length).toBe(2);
  });
});
