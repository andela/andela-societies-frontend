import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';

import { pointsToDollarConverter } from '../../utils';
import { TableComponent, TruncateDescriptionContainer, StatusIndicatorComponent } from '../../common/components';

const RedemptionsComponent = ({ activities }) => {
  let tableBodyHtml;
  const columnNames = ['Cash', 'Date', 'Event', 'Points', 'Status'];
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          There are no redemptions
        </td>
      </tr>
    );
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, createdAt, name, value, status,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{`${pointsToDollarConverter(value)} USD`}</td>
          <td>{dateFns.format(createdAt, 'MMM DD YYYY')}</td>
          <td>
            <TruncateDescriptionContainer description={name} wordCount={80} />
          </td>
          <td>{value}</td>
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

RedemptionsComponent.defaultProps = {
  activities: [],
};

RedemptionsComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default RedemptionsComponent;
