import generateIdForSociety from '../../src/helpers/societyNames';

describe('SocietyNames', () => {
  it('it should return id of the society passed', () => {
    const id = generateIdForSociety('istelle');
    expect(id).toEqual(1);
  });
});
