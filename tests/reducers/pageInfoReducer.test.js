import pageInfoReducer from '../../src/reducers/pageInfoReducer';
import { TITLE_CHANGE } from '../../src/types/pageActionTypes';

describe('pageInfoReducer', () => {
  const state = {
    title: '',
    url: '',
  };
  let action;

  beforeEach(() => {
    action = {
      type: TITLE_CHANGE,
      data: {
        title: 'foo',
        url: '/foo',
      },
    };
  });

  it('should return the proper data when TITLE_CHANGE action is dispatched', () => {
    const result = pageInfoReducer(state, action);
    expect(result.title).toBe(action.data.title);
    expect(result.url).toBe(action.data.url);
  });

  it('should return the default state when an action other than TITLE_CHANGE is fired', () => {
    action.type = 'OTHER_ACTION';
    const result = pageInfoReducer(state, action);
    expect(result.title).toBe(state.title);
    expect(result.url).toBe(state.url);
  });
});
