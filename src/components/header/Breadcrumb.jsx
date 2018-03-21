import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/**
 * @name Breadcrumb
 * @summary Renders the Breadcrumb in the header section
 */
const Breadcrumb = props => (
  <div className='breadcrumb'>
    <a href='/' className='breadcrumb__link'>Dashboard</a>
    <a href={props.pageInfo.url} className='breadcrumb__link'>{props.pageInfo.title}</a>
  </div>
);

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
