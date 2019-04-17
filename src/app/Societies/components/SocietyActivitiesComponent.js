import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import { TableComponent, StatusIndicatorComponent, TruncateDescriptionContainer } from '../../common/components';
import { pointsToDollarConverter } from '../../utils';

const SocietyActivitiesComponent = ({ activities, selectedTab }) => {
  let columnNames = ['Name', 'Activity', 'Points', 'Date', 'Description', 'Status'];
  let tableBodyHtml;
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          Your society does not have any activities
        </td>
      </tr>
    );
  } else if (selectedTab === 'redemptions') {
    columnNames = ['Points', 'Cash', 'Event', 'Date', 'Status'];
    tableBodyHtml = activities.map((activity) => {
      const {
        id, value, name, createdAt, status,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{value}</td>
          <td>{`${pointsToDollarConverter(value)} USD`}</td>
          <td>
            <TruncateDescriptionContainer description={name} wordCount={80} />
          </td>
          <td>{format(new Date(createdAt), 'MMM dd yyyy')}</td>
          <td>
            <StatusIndicatorComponent status={status} />
          </td>
        </tr>
      );
    });
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, owner, points, activityDate, description, status, category,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{owner}</td>
          <td>{category}</td>
          <td>{points}</td>
          <td>{format(new Date(activityDate), 'MMM dd yyyy')}</td>
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
  selectedTab: 'activities',
};

SocietyActivitiesComponent.propTypes = {
  selectedTab: PropTypes.string,
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SocietyActivitiesComponent;
