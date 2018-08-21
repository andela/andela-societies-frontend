import React from 'react';
import { mount, shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Categories from '../../src/containers/Categories';
import storeFixture from '../../src/fixtures/store';
import categories from '../../src/fixtures/categories';

const store = createMockStore(storeFixture);
const history = { push: () => { }, location: { pathname: '' } };
const deleteCategory = jest.fn();
const handleClick = jest.fn();
const fetchCategories = jest.fn();

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <Categories.WrappedComponent
        categories={categories}
        history={history}
        fetchCategories={() => {}}
        deleteCategory={deleteCategory}
        requesting={false}
      />
    </MemoryRouter>
  </Provider>,
);

let shallowWrapper;

describe('<Categories />', () => {
  beforeEach(() => {
    shallowWrapper = shallow(<Categories.WrappedComponent
      history={history}
      fetchCategories={fetchCategories}
      deleteCategory={deleteCategory}
      handleClick={handleClick}
      categories={categories}
      requesting
    />);
  });

  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
    expect(mounted.length).toBe(1);
  });

  it('should render loader when requesting categories', () => {
    shallowWrapper.setProps({ requesting: true });
    expect(shallowWrapper.find('Loader').length).toBe(1);
  });

  it('should render PageHeader', () => {
    expect(shallowWrapper.find('PageHeader').length).toBe(1);
  });

  it('should delete selected category', () => {
    const category =
      {
        description: 'Participating in a press interview for Andela marketing',
        id: 'id2',
        name: 'Press Interview',
        value: 100,
      };

    const instance = shallowWrapper.instance();

    jest.spyOn(instance, 'handleClick');
    instance.handleClick(category.id);
    expect(instance.handleClick).toHaveBeenCalled();
  });

  it('should display SnackBar Component', () => {
    const mountedWrapper = shallowWrapper.setState({
      message: {
        type: 'success',
        text: 'Category Created Successfully',
      },
      categories,
    });

    expect(mountedWrapper.find('SnackBar').length).toBe(1);
  });
});
