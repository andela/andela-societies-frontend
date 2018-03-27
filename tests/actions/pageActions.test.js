import sinon from 'sinon';
import pageActions from '../../src/actions/pageActions';

describe('actions/pageActions', () => {
  const pathname = '';
  it('should return an function', () => {
    expect(typeof pageActions(pathname)).toBe('function');
  });
  it('should dispatch an action', () => {
    const dispatch = sinon.stub();
    pageActions(pathname)(dispatch);
    expect(dispatch.calledOnce).toBe(true);
  });
});
