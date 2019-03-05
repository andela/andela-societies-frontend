import fetchMock from 'fetch-mock';
import { takeEvery, call, put } from 'redux-saga/effects';

import types from '../types';
import actions from '../actions';
import { get, post } from '../../../utils/api';
import {
  handleCategoriesLoad, watchCategoriesLoad, watchLogActivityPoints, addNewActivity,
} from '../logPoints.data';

describe('Log Activity saga', () => {
  let generator;
  describe('watchCategoriesLoad generator', () => {
    it('takes CATEGORIES.LOAD action', () => {
      generator = watchCategoriesLoad();
      expect(generator.next().value).toEqual(takeEvery(types.CATEGORIES.LOAD, handleCategoriesLoad));
    });
  });

  describe('handleCategoriesLoad generator', () => {
    it('calls get api get activity util with url', async () => {
      generator = handleCategoriesLoad(types.CATEGORIES.LOAD_SUCCESS);
      expect(generator.next().value).toEqual(call(get, 'activity-types'));
      expect(generator.next().value).toEqual(put(actions.setCategories()));
    });
  });

  describe('addNewActivity generator', () => {
    it('calls post api post/log activity util with url', async () => {
      generator = addNewActivity(types.LOG_POINTS.POST_REQUEST);
      expect(generator.next().value).toEqual(call(
        post, 'logged-activities', types.LOG_POINTS.POST_REQUEST.activity,
      ));
      expect(generator.next().value).toEqual(put(actions.logPointsSuccess()));
      fetchMock.reset();
    });
  });

  describe('watchLogActivityPoints generator', () => {
    it('takes LOG_POINTS.POST_REQUEST action', () => {
      generator = watchLogActivityPoints();
      expect(generator.next().value).toEqual(takeEvery(types.LOG_POINTS.POST_REQUEST, addNewActivity));
    });
  });
});
