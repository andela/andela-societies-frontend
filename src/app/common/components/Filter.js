import React from 'react';
import PropTypes from 'prop-types';
import capitalize from '../../utils/capitalize';

const Filter = ({
  filterBy, handleClick, show, filterRef,
}) => (
  <div className='dropdown'>
    <div ref={filterRef} className={`dropdown-menu filter ${show ? 'show' : ''}`} aria-labelledby='dropdownMenuButton'>
      {filterBy.map((item, index) => (
        <div key={item.name} className='dropdown-item filter__option'>
          <input
            className='form-check-input'
            type='checkbox'
            value={item.name}
            id={item.name}
            onClick={handleClick(index)}
            checked={item.checked}
            readOnly
          />
          <div className='form-check-label filter__text' htmlFor={item.name} id={item.name}>
            {capitalize(item.name)}
          </div>
        </div>
      ))}
    </div>
  </div>
);

Filter.propTypes = {
  filterBy: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  show: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  filterRef: PropTypes.shape({}).isRequired,
};

export default Filter;
