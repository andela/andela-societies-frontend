import React from 'react';
import PropTypes from 'prop-types';

import { TableComponent } from '../../common/components';
import TruncateDescriptionComponent from './TruncateDescriptionComponent';

const MyActivitiesComponent = (props) => {
  const { userActivities } = props;
  const columnNames = ['Activity', 'Date', 'Description', 'Points', 'Status'];
  return (
    <TableComponent tableHeadings={columnNames}>
      {userActivities.map((activity) => {
        const {
          activityId, activityDate, description, points, status,
        } = activity;
        return (
          <tr key={activityId}>
            <td>{activity.activity}</td>
            <td>{activityDate}</td>
            <td>
              <TruncateDescriptionComponent description={description} wordCount={50} />
            </td>
            <td>{points}</td>
            <td>{status}</td>
          </tr>
        );
      })}
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
