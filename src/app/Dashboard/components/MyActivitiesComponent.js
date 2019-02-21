import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';

import { TableComponent } from '../../common/components';
import TruncateDescriptionComponent from './TruncateDescriptionComponent';

const MyActivitiesComponent = (props) => {
  const { userActivities } = props;
  const columnNames = ['Activity', 'Date', 'Description', 'Points', 'Status'];
  return (
    <TableComponent tableClassName='myactivities__table' tableHeadings={columnNames}>
      {userActivities.map((activity) => {
        const {
          activityId, activityDate, description, points, status,
        } = activity;
        return (
          <tr key={activityId} className='myactivities__table__row'>
            <td>{activity.activity}</td>
            <td>{dateFns.format(activityDate, 'MMM DD YYYY')}</td>
            <td>
              <TruncateDescriptionComponent description={description} wordCount={80} />
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
