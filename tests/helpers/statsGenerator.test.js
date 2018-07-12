import statsGenerator from '../../src/helpers/statsGenerator';
import { redemptions } from '../../src/fixtures/redemptions';

let stats = [
  {
    value: 0,
    name: 'Activities logged',
  },
  {
    value: 0,
    name: 'Points earned',
  },
];

describe('statsGenerator', () => {
  it('returns stats of 0 activites and points given when empty array', () => {
    expect(statsGenerator([], 'Activities logged', 'Points earned')).toEqual(stats);
  });
  it('returns relevant stats given when redemptions/activities array', () => {
    stats = [
      {
        value: redemptions.length,
        name: 'Pending redemptions',
      },
      {
        value: redemptions.reduce((accumulator, currentValue) => (accumulator + currentValue.value), 0),
        name: 'Total points',
      },
    ];
    expect(statsGenerator(redemptions, 'Pending redemptions', 'Total points')).toEqual(stats);
  });
});
