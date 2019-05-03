import search from '../search';
import activities from '../../Dashboard/operations/tests/fixtures'

describe('Search util', () => {
  it('returns data that matches search text', () => {
    const expectedResults = activities.filter(activity => Object.values(activity)
    .some(value => value && value.toString().toLowerCase().includes('mentored'.toLowerCase())));
    expect(search('mentored', activities)).toEqual(expectedResults);
  });

  it('returns unsearched results', () => {
    expect(search('', activities)).toEqual(activities);
  });
});
