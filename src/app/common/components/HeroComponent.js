import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name HeroComponent
 * @description this is the blue background on every page
 */
export const HeroComponent = (props) => {
  const { children } = props;
  return (
    <section className='hero'>
      {children}
    </section>
  );
};

HeroComponent.defaultProps = {
  children: null,
};


HeroComponent.propTypes = {
  children: PropTypes.node,
};

export default HeroComponent;
