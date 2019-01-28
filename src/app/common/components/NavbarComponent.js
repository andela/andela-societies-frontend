import React from 'react';

const NavbarComponent = () => (
  <nav className='navbar navbar-light'>
    <form className='form-inline col-sm-12'>
      <div className='input-group input-group-merge'>
        <input
          type='search'
          aria-label='Search'
          placeholder='Search ...'
          className='form-control form-control-search'
        />
        <div className='input-group-append '>
          <span className='input-group-text fa fa-search input-group-icon' id='basic-addon1' />
        </div>
      </div>
    </form>
  </nav>
);

export default NavbarComponent;
