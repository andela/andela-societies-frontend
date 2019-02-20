import React from 'react';
import PropTypes from 'prop-types';

import { TableComponent } from '../../common/components';

const MyActivitiesComponent = (props) => {
  const { userActivities } = props;
  const columnNames = ['Activity', 'Date', 'Description', 'Points', 'Status'];
  return (
    <TableComponent tableHeadings={columnNames}>
      {userActivities.map(activity => (
        <tr key={activity.activityId}>
          <td>{activity.activity}</td>
          <td>{activity.activityDate}</td>
          <td>{activity.description}</td>
          <td>{activity.points}</td>
          <td>{activity.status}</td>
        </tr>
      ))}
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
