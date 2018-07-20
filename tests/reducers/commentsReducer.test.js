// reducer
import commentsReducer from '../../src/reducers/commentsReducer';

// actions
import {
  moreInfoRequest,
  moreInfoFailure,
  moreInfoSuccess,
} from '../../src/actions/commentActions';

// fixtures
import comment from '../../src/fixtures/comments';

// initial state
import initialState from '../../src/reducers/initialState';

const defaultState = initialState.commentsInfo;
let expectedState;
const error = 'Error encountered while submitting your comment. Try again';

describe('Comments Reducer tests', () => {
  it('should return the default state when given no action ', () => {
    expect(commentsReducer(defaultState, {})).toEqual(defaultState);
  });

  it('should set requesting state to true when given MORE_INFO_REQUEST action ', () => {
    expectedState = {
      ...defaultState,
      message: {
        type: 'info',
        text: 'Sending ...',
      },
      requesting: true,
    };
    expect(commentsReducer(defaultState, moreInfoRequest())).toEqual(expectedState);
  });

  it('should set hasError state to true when given MORE_INFO_FAILURE action ', () => {
    expectedState = {
      ...defaultState,
      requesting: false,
      hasError: true,
      message: {
        type: 'error',
        text: error,
      },
    };
    expect(commentsReducer(defaultState, moreInfoFailure(error))).toEqual(expectedState);
  });

  it('should set messaging type to success when given MORE_INFO_SUCCESS action ', () => {
    const commentData = {
      data: comment,
      message: 'Successfully submitted your comment',
    };
    expectedState = {
      ...defaultState,
      requesting: false,
      hasError: false,
      comment: [comment],
      message: {
        type: 'success',
        text: 'Successfully submitted your comment',
      },
    };
    expect(commentsReducer(defaultState, moreInfoSuccess({ ...commentData }))).toEqual(expectedState);
  });
});
