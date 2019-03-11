import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';

const Item = ({ categories }) => (
  <Fragment>
    {categories.map(option => (
      <MenuItem key={option.id} value={option}>
        {option.name}
      </MenuItem>
    ))}
  </Fragment>
);


Item.defaultProps = {
  categories: '',
};

Item.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
};

export default Item;
