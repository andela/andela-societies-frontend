import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

/**
 * @name Breadcrumb
 * @summary Renders the Breadcrumb in the header section
 */
const Breadcrumb = (props) => {
  const breadcrumbLinkClass = props.pageInfo.url.split('/')[1] === 'society' ? 'breadcrumb__link--white' : '';

  let titleHtml = '';
  if (props.pageInfo.title.toLowerCase() !== 'home') {
    titleHtml = props.pageInfo.title;
  }

  return (
    <div className='breadcrumb'>
      <Link to='/u/' className={`breadcrumb__link ${breadcrumbLinkClass}`}>Dashboard</Link>
      <Link to={props.pageInfo.url} className={`breadcrumb__link ${breadcrumbLinkClass}`}>
        {titleHtml}
      </Link>
    </div>
  );
};

/**
 * @name propTypes
 * @type {PropType}
 * @param {Object} propTypes - React PropTypes
 * @property {Object} pageInfo - An object that contains the url and title of a page
*/
Breadcrumb.propTypes = {
  pageInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  pageInfo: state.pageInfo,
});

export default connect(mapStateToProps)(Breadcrumb);
