import React, { Component } from 'react';
import PropType from 'prop-types';

import TruncateDescription from '../TruncateDescription';
import Delete from '../svgIcons/categoryIcons/Delete';

// constants
import clickActions from '../../constants/clickAction';

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

  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
  * @name handleCategoryClick
  * @summary responds to clicking on a category card
  */
  handleCategoryClick = () => {
    const { id, handleClick } = this.props;
    const { EDIT } = clickActions;
    handleClick(EDIT, id);
  }

  renderDeleteButton() {
    const { DELETE } = clickActions;
    const { handleClick, id } = this.props;
    return (
      <div className='deleteCategoryButtons'>
        <button
          name='delete'
          className='deleteCategory__button'
          type='button'
          onClick={() => handleClick(DELETE, id)}
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
      <div className='category' onClick={this.handleCategoryClick}>
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
