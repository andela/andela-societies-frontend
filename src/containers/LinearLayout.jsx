import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from '../common/ErrorMessage';

const createItems = items => (
  items.map(item => (
    <div className='linear-layout__panel' key={item.props.id}>{item}</div>
  ))
);

const LinearLayout = ({ items }) => {
  let linearLayoutHtml = '';
  if (items.length) {
    linearLayoutHtml = (
      <div className='linear-layout'>
        {createItems(items)}
      </div>
    );
  } else {
    linearLayoutHtml = (<ErrorMessage message='There are no activities at the moment' />);
  }
  return linearLayoutHtml;
};

LinearLayout.defaultProps = {
  items: [],
};

LinearLayout.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LinearLayout;
