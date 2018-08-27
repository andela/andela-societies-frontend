/* eslint react/forbid-prop-types: 0 */
import React, { Component } from 'react';
import PropType from 'prop-types';

import TruncateDescription from '../TruncateDescription';
import Delete from '../svgIcons/categoryIcons/Delete';
import EditIcon from '../svgIcons/categoryIcons/Edit';
import Button from '../../common/Button';

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
  * @name renderCategoryButtons
  * @summary Displays edit, delete action and respond to their clicks
  */
  renderCategoryButtons = () => {
    const { DELETE, EDIT } = clickActions;
    const { handleClick, id } = this.props;
    return (
      <div className='categoryButtons'>
        <Button
          name='edit'
          className='categoryButtons__edit'
          type='button'
          value={<EditIcon />}
          onClick={() => handleClick(EDIT, id)}
        />
        <Button
          name='delete'
          className='categoryButtons__delete'
          type='button'
          value={<Delete />}
          onClick={() => handleClick(DELETE, id)}
        />
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
              this.renderCategoryButtons()
            }
          </div>
        </div>
      </div>
    );
  }
}
export default CategoryCard;
