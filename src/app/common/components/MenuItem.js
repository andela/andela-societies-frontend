import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const Item = ({ categoryOption, categories, handleChange }) => (
  <TextField
    required
    value={categoryOption}
    select
    label='Category'
    margin='normal'
    fullWidth
    onChange={handleChange}
  >
    {categories.map(option => (
      <MenuItem key={option.id} value={option}>
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);


Item.defaultProps = {
  categories: [],
  categoryOption: {},
  handleChange: () => {},
};

Item.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  handleChange: PropTypes.func,
  categoryOption: PropTypes.objectOf(PropTypes.shape({})),
};

export default Item;
