import React from 'react';
import PropTypes from 'prop-types';

const createItems = items => (
  items.map(item => (
    <div className='linear-layout__panel' key={item.props.id}>{item}</div>
  ))
);

const LinearLayout = ({ items }) => (
  (
    <div className='linear-layout'>
      {createItems(items)}
    </div>
  )
);

LinearLayout.defaultProps = {
  items: [],
};

LinearLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LinearLayout;
