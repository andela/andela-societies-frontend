import React from 'react';

/**
 * @name Breadcrumb
 * @summary Renders the Breadcrumb in the header section
 */
const Breadcrumb = () => (
  <div className="breadcrumb">
    <a href="/" className="breadcrumb__link">Dashboard</a>
    <a href="/" className="breadcrumb__link">My Activities</a>
  </div>
);

export default Breadcrumb;
