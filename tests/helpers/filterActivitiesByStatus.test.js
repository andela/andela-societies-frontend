import filterActvitiesByStatus from '../../src/helpers/filterActivitiesByStatus';
import society from '../../src/fixtures/society';

describe('dateFormatter', () => {
  it('should return correct date format', () => {
    expect(filterActvitiesByStatus(society.loggedActivities, 'pending').length).toBe(2);
  });
});
