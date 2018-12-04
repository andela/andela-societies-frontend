import React from 'react';
import { Link } from 'react-router-dom';

const pageNotFound = () => (
  <div className='not-found'>
    <div className='not-found__code'>
      <div className='not-found__four'>4</div>
      <div className='not-found__zero'>0</div>
      <div className='not-found__four'>4</div>
    </div>
    <div className='not-found__text'>
      <article>
        The page you are trying to access does not exist. However you can go back
        <Link to='/' className='home-404'> home</Link>.
      </article>
    </div>
  </div>
);

export default pageNotFound;
