import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableComponent, StatusIndicatorComponent, TruncateDescriptionContainer } from '../../common/components';

const MyActivitiesComponent = (props) => {
  const { userActivities } = props;
  const columnNames = ['Activity', 'Date', 'Description', 'Points', 'Status'];
  let tableBodyHtml;
  if (!userActivities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={5} className='myactivities__table__data'> You have not logged any activities </td>
      </tr>
    );
  } else {
    tableBodyHtml = userActivities.map((activity) => {
      const {
        id, activityDate, description, points, status,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{activity.activity}</td>
          <td>{dateFns.format(activityDate, 'MMM DD YYYY')}</td>
          <td>
            <TruncateDescriptionContainer description={description} wordCount={80} />
          </td>
          <td>{points}</td>
          <td><StatusIndicatorComponent status={status} /></td>
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

MyActivitiesComponent.defaultProps = {
  userActivities: [],
};

MyActivitiesComponent.propTypes = {
  userActivities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MyActivitiesComponent;
