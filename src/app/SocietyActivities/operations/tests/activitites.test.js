import {
  call, put,
} from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import {
  edit,
} from '../../../utils';

import { societyDetails } from '../../components/tests/fixtures';
import {
  approveActivity,
  rejectActivity,
} from '../activities.data';

describe('approveActivity generator', () => {
  let generator;
  const { id, name, message } = societyDetails;
  const url = 'logged-activities/approve';
  const action = {
    type: types.APPROVE_ACTIVITY_REQUEST,
    payload: { id, name },
  };

  it('approves a logged activity successfully', () => {
    const result = {
      data: {
        ...societyDetails,
      },
    };

    generator = approveActivity(action);
    expect(generator.next().value).toEqual(put(actions.approveActivityPageLoading()));
    expect(generator.next().value).toEqual(call(edit, url, { loggedActivitiesIds: [id] }));

    expect(generator.next(id, message, name, result.data).value).toEqual(
      put(actions.approveActivitySuccess(result.data.id)),
    );
  });

  it('approve activity error', () => {
    generator = approveActivity(action);
    expect(generator.next().value).toEqual(put(actions.approveActivityPageLoading()));

    expect(generator.next().value).toEqual(call(edit, url, { loggedActivitiesIds: [id] }));

    expect(generator.throw().value).toEqual(
      put(actions.approveActivityPageError('There was an error completing the requested action')),
    );
  });
});

describe('rejectActivity generator', () => {
  let generator;
  const { id } = societyDetails;
  const url = `logged-activities/review/${id}`;
  const status = 'pending';
  const action = {
    type: types.REJECT_ACTIVITY_REQUEST,
    payload: { id, status },
  };

  it('reject activity error', () => {
    generator = rejectActivity(action);
    expect(generator.next().value).toEqual(put(actions.rejectActivityPageLoading()));

    expect(generator.next().value).toEqual(call(edit, url, { status }));
    expect(generator.throw().value).toEqual(
      put(actions.rejectActivityPageError('There was an error completing the requested action')),
    );
  });
});
