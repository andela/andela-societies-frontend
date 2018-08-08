import React, { Component } from 'react';
import PropType from 'prop-types';

import TruncateDescription from '../TruncateDescription';
import Delete from '../svgIcons/categoryIcons/Delete';

/**
 * @summary Renders an category card
 * @class categoryCard
 * @extends React.Component
*/
class CategoryCard extends Component {
  /**
  * @name propTypes
  * @type {PropType}
  * @param {Object} propTypes - React PropTypes
  * @property {String} name - The type of a Category
  * @property {Number} value - The value the category is worth
  * @property {String} id - id of the category
  * @property {number} wordCount - number of words for the name
  * @property {String} page - The page accessed by user
  * @property {func} handleClick - handleClick event
  */
  static propTypes = {
    name: PropType.string,
    description: PropType.string,
    value: PropType.number,
    handleClick: PropType.func,
    id: PropType.string.isRequired,
    wordCount: PropType.number,
  };

  static defaultProps = {
    name: '',
    description: '',
    value: 0,
    handleClick: () => { },
    wordCount: 80,
  };

  /**
   * @name getDerivedStateFromProps
   * @summary Lifecylce methods that updates state of iscategoryChecked if category is checked or not
   * @param {Object} nextProps
   * @returns {Object} state
   */
  static getDerivedStateFromProps(nextProps) {
    const { selectedCategories } = nextProps;
    return {
      isCategoryChecked: selectedCategories ? selectedCategories.includes(nextProps.id) : false,
    };
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDeleteButton() {
    return (
      <div className='deleteCategoryButtons'>
        <button
          name='delete'
          className='deleteCategory__button'
          type='button'
          onClick={() => this.props.handleClick(this.props.id)}
        >
          <Delete />
        </button>
      </div>
    );
  }

  renderPoints() {
    const { value } = this.props;
    return (
      <span className='category__points'>
        <span className='category__pointsCount'>
          {value}
        </span>
        points
      </span>
    );
  }

  render() {
    const {
      name,
      description,
      wordCount,
    } = this.props;

    return (
      <div className='category'>
        <div className='category__right'>
          <div className='category__header'>
            <div>
              <span className='category__category'>{name}</span>
            </div>
          </div>
          <div className='category__content'>
            <TruncateDescription description={description} wordCount={wordCount} />
          </div>
          <div className='category__footer'>
            {
              this.renderPoints()
            }
            {
              this.renderDeleteButton()
            }
          </div>
        </div>
      </div>
    );
  }
}
export default CategoryCard;
