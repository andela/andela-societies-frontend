// Third party libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import promptModal from 'sweetalert';

// Components
import CategoryCard from '../components/categories/CategoryCard';
import Page from './Page';
import PageHeader from '../components/header/PageHeader';
import LinearLayout from '../containers/LinearLayout';
import Loader from '../components/loaders/Loader';
import SnackBar from '../components/notifications/SnackBar';

// Actions
import { fetchCategories } from '../actions/categoriesActions';
import { deleteCategory } from '../actions/deleteCategoryActions';

class Categories extends Component {
  /**
    * @name Categories
    * @type {propTypes}
    * @param {Object} props - React PropTypes`
    */
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    fetchCategories: PropTypes.func,
    requesting: PropTypes.bool.isRequired,
    deleteCategory: PropTypes.func,
    history: PropTypes.shape({
      location: PropTypes.shape({ pathname: PropTypes.string }),
      pathname: PropTypes.string,
    }),
  }

  /**
   * @name defaultProps
   */
  static defaultProps = {
    history: {
      location: {
        pathname: '',
      },
    },
    fetchCategories: () => {},
    deleteCategory: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedCategories: [],
    };
  }

  componentDidMount() {
    const { history } = this.props;
    this.props.fetchCategories();
    sessionStorage.setItem('Location', history.location.pathname);
  }

  handleClick = (categoryId) => {
    promptModal({
      title: 'Are you sure?',
      text: 'Once deleted, category cannot be recovered!',
      icon: 'warning',
      buttons: ['Cancel', 'Delete it'],
      closeModal: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.deleteCategory(categoryId);
        }
      });
  }

  /**
   * @name renderLayout
   * @summary renders different layout depending on role
   * @returns {void}
   */
  renderLayout() {
    const {
      selectedCategories,
    } = this.state;
    const { categories } = this.props;
    const page = this.props.history.location.pathname;
    return (
      <LinearLayout
        items={
          categories.map((category) => {
            const {
              id,
              name,
              description,
              value,
            } = category;
            return (<CategoryCard
              id={id}
              name={name}
              description={description}
              value={value}
              page={page}
              handleClick={this.handleClick}
              selectedCategories={selectedCategories}
              handleDeselectCategory={this.handleDeselectCategory}
              wordCount={70}
            />);
          })
        }
      />
    );
  }

  /**
   * @name categories
   * @summary Renders Categories page
   * @return React node that displays the Categories page
   */
  render() {
    const { requesting } = this.props;
    const { message } = this.state;
    let snackBarMessage = '';
    if (message) {
      snackBarMessage = <SnackBar message={message} />;
    }
    const hideFilter = true;
    const categoriesHTML = requesting ?
      (
        <div className='categories'>
          <Loader />
        </div>
      )
      :
      this.renderLayout();

    return (
      <Page>
        <div className='mainContent'>
          <div className='Categories'>
            <PageHeader
              title='Categories'
              hideFilter={hideFilter}
              handleSelectAllClick={this.handleSelectAllClick}
            />
            <div className='activities'>
              {
                categoriesHTML
              }
            </div>
          </div>
        </div>
        {snackBarMessage}
      </Page>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories.categories,
  requesting: state.categories.requesting,
});

export default connect(mapStateToProps, {
  fetchCategories,
  deleteCategory,
})(Categories);
