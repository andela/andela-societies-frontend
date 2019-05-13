import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { TableComponent, TruncateDescriptionContainer, ActionsComponent } from '../../common/components';

const ApproveActivitiesComponent = ({ activities }) => {
  let tableBodyHtml;
  const columnNames = ['Activity', 'Date', 'Points', 'Description', 'Actions'];
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          There is no activities to approve
        </td>
      </tr>
    );
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, activityDate, points, description, category,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{category}</td>
          <td>{format(new Date(activityDate), 'MMM dd yyyy')}</td>
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

ApproveActivitiesComponent.defaultProps = {
  activities: [],
};

ApproveActivitiesComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ApproveActivitiesComponent;
