import React from 'react';
import { mount, shallow } from 'enzyme';
import ActivityCard from '../../../src/components/activities/ActivityCard';
import activity from '../../../src/fixtures/activity';
import { redemption } from '../../../src/fixtures/redemptions';

describe('<ActivityCard />', () => {
  const handleClickToEdit = jest.fn();
  const props = {
    page: '/u/verify-activities',
  };
  const wrapper = mount.bind(
    null,
    <ActivityCard {...activity} />,
  );

  let shallowWrapper;

  beforeEach(() => {
    shallowWrapper = shallow(<ActivityCard {...props} {...activity} />);
  });

  it('should render without crashing', () => {
    expect(wrapper).not.toThrowError();
  });

  it('should set default showUserDetails to false', () => {
    expect(wrapper().find('.activity__owner').length).toBe(0);
  });

  it('should render at least a description', () => {
    expect(wrapper().find('.activity__description').length).toBe(1);
  });

  it('should show user details', () => {
    const showUserDetails = true;
    const card = mount.bind(
      null,
      <ActivityCard showUserDetails={showUserDetails} {...activity} />,
    );
    expect(card().find('.activity__owner').length).toBe(1);
  });

  it('should render activity details', () => {
    expect(wrapper().find('.activity').length).toBe(1);
  });

  it('should render approve and reject buttons on verify activities page', () => {
    shallowWrapper.setProps({ status: 'in review', showButtons: true });
    expect(shallowWrapper.find('.verifyButtons__button').length).toBe(2);
  });

  it('should render check box on verify activities page cards', () => {
    expect(shallowWrapper.find('.activity__checkbox').length).toBe(1);
  });

  it('should change state when a checkbox of an activity is clicked', () => {
    shallowWrapper.setState({ isActivityChecked: true });
    const checkbox = shallowWrapper.find('.activity__checkbox');
    checkbox.simulate('change');
    expect(shallowWrapper.state().isActivityChecked).toBe(false);
  });

  it('should call handleClickToEdit with redemption id when handleClickableAreaClick is called', () => {
    const userCanEdit = true;
    const component = shallow((
      <ActivityCard
        {...redemption}
        handleClickToEdit={handleClickToEdit}
        userCanEdit={userCanEdit}
      />
    ));
    const instance = component.instance();
    instance.handleClickableAreaClick();
    expect(handleClickToEdit).toBeCalledWith(redemption.id);
  });

  it('should show more info button', () => {
    const userCanEdit = true;
    const showMoreInfoButton = true;
    const showButtons = true;
    const component = shallow((
      <ActivityCard
        {...redemption}
        handleClickToEdit={handleClickToEdit}
        userCanEdit={userCanEdit}
        showButtons={showButtons}
        showMoreInfoButton={showMoreInfoButton}
      />
    ));
    expect(component.find('.verifyButtons__button--moreInfo').length).toBe(1);
  });

  describe('Verify Buttons', () => {
    let component;
    const handleClick = jest.fn();

    beforeEach(() => {
      const userCanEdit = true;
      const showMoreInfoButton = true;
      const showButtons = true;
      component = mount((
        <ActivityCard
          {...redemption}
          handleClickToEdit={handleClickToEdit}
          userCanEdit={userCanEdit}
          showButtons={showButtons}
          showMoreInfoButton={showMoreInfoButton}
          handleClick={handleClick}
        />
      ));
      handleClick.mockClear();
    });

    it('should call handleclick when approve button is clicked', () => {
      component.find('button.verifyButtons__button--approve').simulate('click');
      expect(handleClick.mock.calls.length).toEqual(1);
    });

    it('should call handleclick when reject button is clicked', () => {
      component.find('button.verifyButtons__button--reject').simulate('click');
      expect(handleClick.mock.calls.length).toEqual(1);
    });

    it('should call handleclick when moreInfo button is clicked', () => {
      component.find('button.verifyButtons__button--moreInfo').simulate('click');
      expect(handleClick.mock.calls.length).toEqual(1);
    });
  });
});
