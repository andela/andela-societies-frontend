import React from 'react';
import PropTypes from 'prop-types';

/**
 * @name Stats
 * @summary Renders a summary of statistics
 * @return {jxs} React node for the Stats component
 */
const Stats = props => (
  <section className='stats'>
    <h1 className='stats__heading'>My stats</h1>
    <div className='stats__content'>
      {
        props.stats.map(stat => (
          <div className='stats__stat' key={stat.name + stat.value}>
            <div className='stats__value'>{stat.value}</div>
            <div className='stats__statName'>{stat.name}</div>
          </div>
        ))
      }
    </div>
  </section>
);

/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {Object[]} stats - Statistics to display
  */
Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Stats;
