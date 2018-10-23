import SocietyPageHeaderTitleReducer from '../../src/reducers/societyPageHeaderReducer';
import { PAGE_HEADER_TITLE_CHANGE } from '../../src/types';

describe('SocietyPageHeaderTitleReducer', () => {
  const state = 'Activities';
  let action;

  beforeEach(() => {
    action = {
      type: PAGE_HEADER_TITLE_CHANGE,
      data: 'LeaderShip',
    };
  });

  it('should return the initial state', () => {
    expect(SocietyPageHeaderTitleReducer(undefined, {})).toEqual('Activities');
  });

  it('should return the proper title when PAGE_HEADER_TITLE_CHANGE action is dispatched', () => {
    const result = SocietyPageHeaderTitleReducer(state, action);
    expect(result).toBe(action.data);
  });

  it('should return the default state when an action other than PAGE_HEADER_TITLE_CHANGE is fired', () => {
    action.type = 'OTHER_ACTION';
    const result = SocietyPageHeaderTitleReducer(state, action);
    expect(result).toBe(state);
  });
});

