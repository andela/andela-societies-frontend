import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const Item = ({
  categoryId, categories, handleChange, handleClick,
}) => (
  <TextField
    required
    value={categoryId}
    select
    label='Category'
    margin='normal'
    fullWidth
    onChange={handleChange}
    onClick={handleClick}
  >
    {categories.map(option => (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    ))}
  </TextField>
);


Item.defaultProps = {
  categories: [],
  categoryId: '',
  handleChange: () => {},
  handleClick: () => {},
};

Item.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})),
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  categoryId: PropTypes.string,
};

export default Item;
