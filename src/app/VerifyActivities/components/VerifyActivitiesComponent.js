import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import ActionsComponent from './ActionsComponent';
import { TableComponent, TruncateDescriptionContainer } from '../../common/components';

const VerifyActivitiesComponent = ({ activities }) => {
  let tableBodyHtml;
  const columnNames = ['Name', 'Date', 'Activity', 'Points', 'Description', 'Actions'];
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          There are no activities to verify
        </td>
      </tr>
    );
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, owner, date, description, points, category,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{owner}</td>
          <td>{format(new Date(date), 'MMM DD YYYY')}</td>
          <td>{category}</td>
          <td>{points}</td>
          <td>
            <TruncateDescriptionContainer description={description} wordCount={80} />
          </td>
          <td>
            <ActionsComponent />
          </td>
        </tr>
      );
    });
  }
  return (
    <TableComponent tableClassName='myactivities__table' tableHeadings={columnNames}>
      {tableBodyHtml}
    </TableComponent>
  );
};

VerifyActivitiesComponent.defaultProps = {
  activities: [],
};

VerifyActivitiesComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default VerifyActivitiesComponent;