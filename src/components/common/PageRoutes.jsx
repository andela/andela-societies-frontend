import React from 'react';
import { Route } from 'react-router-dom';
import App from '../../containers/App';
import pageInfo from '../../helpers/pageInfo';

const pages = [
  'my-activities',
  'verify-activities',
];

const PageRoutes = () => (
  pages.map(page => (
    <Route
      path={`/u/${page}/`}
      component={
        props => (<App pageInfo={
          pageInfo.find(_pageInfo => props.location.pathname === _pageInfo.url)
        }
        />)}
      key={page}
    />
  ))
);

export default PageRoutes;
