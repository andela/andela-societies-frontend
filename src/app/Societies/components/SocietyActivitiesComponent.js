import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableComponent, StatusIndicatorComponent, TruncateDescriptionContainer } from '../../common/components';

const SocietyActivitiesComponent = (props) => {
  const { activities } = props;
  const columnNames = ['Name', 'Activity', 'Points', 'Date', 'Description', 'Status'];
  let tableBodyHtml;
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          Your society does not have logged any activities
        </td>
      </tr>
    );
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, owner, points, activityDate, description, status,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{owner}</td>
          <td>{activity.activity}</td>
          <td>{points}</td>
          <td>{dateFns.format(activityDate, 'MMM DD YYYY')}</td>
          <td>
            <TruncateDescriptionContainer description={description} wordCount={80} />
          </td>
          <td>
            <StatusIndicatorComponent status={status} />
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

SocietyActivitiesComponent.defaultProps = {
  activities: [],
};

SocietyActivitiesComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SocietyActivitiesComponent;
