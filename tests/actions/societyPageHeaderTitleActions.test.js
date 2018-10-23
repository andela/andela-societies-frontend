import sinon from 'sinon';
import societyPageHeaderTitleActions from '../../src/actions/societyPageHeaderTitleActions';

describe('actions/societyPageHeaderTitleActions', () => {
  const societyPageHeadertitle = 'Activities';
  it('should return an function', () => {
    expect(typeof societyPageHeaderTitleActions(societyPageHeadertitle)).toBe('function');
  });
  it('should dispatch an action', () => {
    const dispatch = sinon.stub();
    societyPageHeaderTitleActions(societyPageHeadertitle)(dispatch);
    expect(dispatch.calledOnce).toBe(true);
  });
});
