import React, { Component } from 'react';
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
class Stats extends Component {
  /**
   * React component lifecycle method getDerivedStateFromProps
   * @param {Object} nextProps - received props
   */
  static getDerivedStateFromProps(nextProps) {
    return {
      title: nextProps.title,
      page: nextProps.page,
      stats: nextProps.stats,
    };
  }

  /**
   * @name propTypes
   * @type {PropType}
   *
   * @property {string} title - Society name
   * @property {string} page - page type
   * @property {Object[]} stats - Statistics to display
   */
  static propTypes = {
    title: PropTypes.string,
    page: PropTypes.string,
    stats: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })).isRequired,
  };

  /**
   * @name defaultProps
   * @property {string} title - Society name
   * @property {string} page - page type
   */
  static defaultProps = {
    title: '',
    page: '',
  };

  /**
   * Stats component class constructor
   * @param {object} props - title, stats and page information
   */
  constructor(props) {
    super(props);
    const { title, stats, page } = this.props;
    this.state = {
      title,
      stats,
      page,
    };
  }

  /**
   * Render Stats Component
   * @return {object} JSX for Stats Component
   */
  render() {
    const { title, page, stats } = this.state;
    /**
     * @name icons
     * Society icons
     */
    const icons = {
      invictus: InvictusIcon,
      istelle: IstelleIcon,
      phoenix: PhoenixIcon,
      sparks: SparksIcon,
    };

    const SocietyIcon = title && icons[title.toLowerCase()];
    /**
     * @function hasIcon
     * @returns {bool} whether society icon is in icons object
     */
    const hasIcon = () => (
      Object.keys(icons).find(statsTitle => statsTitle === title.toLowerCase())
    );

    return (
      <section className='stats'>
        {
          page === 'society' ?
            <span className='sidebar__navIcon sidebar__navIcon--black'>
              {hasIcon() ? <SocietyIcon /> : null}
            </span>
            :
            null
        }
        <h1 className='stats__heading'>{title}</h1>
        <div className='stats__content'>
          {
            stats.map(stat => (
              <div className='stats__stat' key={stat.name + stat.value}>
                <div className='stats__value'>{stat.value}</div>
                <div className='stats__statName'>{stat.name}</div>
              </div>
            ))
          }
        </div>
      </section>
    );
  }
}

export default Stats;
