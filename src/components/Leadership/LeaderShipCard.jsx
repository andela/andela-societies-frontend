import React from 'react';
import PropTypes from 'prop-types';

const LeaderShipCard = ({
  image,
  role,
  name,
}) => (
  <div className='card-user'>
    <img src={image} alt='society-leader-pic' className='background-image' />
    <div className='content'>
      <h3>{name}</h3>
      <h3>{role}</h3>
    </div>
  </div>
);

LeaderShipCard.propTypes = {
  image: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default LeaderShipCard;
