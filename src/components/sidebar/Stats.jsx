import React from 'react';
import PropTypes from 'prop-types';
import InvictusIcon from '../svgIcons/societyIcons/Invictus';
import IstelleIcon from '../svgIcons/societyIcons/Istelle';
import PhoenixIcon from '../svgIcons/societyIcons/Phoenix';
import SparksIcon from '../svgIcons/societyIcons/Sparks';

/**
 * @name Stats
 * @summary Renders a summary of statistics
 * @return {jxs} React node for the Stats component
 */
const Stats = (props) => {
  const icons = {
    invictus: InvictusIcon,
    istelle: IstelleIcon,
    phoenix: PhoenixIcon,
    sparks: SparksIcon,
  };

  const SocietyIcon = icons[props.title.toLowerCase()];

  return (
    <section className='stats'>
      {
        props.page === 'society' ?
          <span className='sidebar__navIcon sidebar__navIcon--black'>
            <SocietyIcon />
          </span>
          :
          null
      }
      <h1 className='stats__heading'>{props.title}</h1>
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
};

Stats.defaultProps = {
  title: '',
  page: '',
};

/**
    * @name propTypes
    * @type {PropType}
    * @param {Object} propTypes - React PropTypes
    * @property {Object[]} stats - Statistics to display
  */
Stats.propTypes = {
  title: PropTypes.string,
  page: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default Stats;
