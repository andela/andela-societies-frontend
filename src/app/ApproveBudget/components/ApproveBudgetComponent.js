import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import { TableComponent, TruncateDescriptionContainer, ActionsComponent } from '../../common/components';
import { pointsToDollarConverter } from '../../utils';

const ApproveBudgetComponent = ({ activities, handleApproveOrRejectClick }) => {
  let tableBodyHtml;
  const columnNames = ['Name', 'Date', 'Amount', 'Description', 'Actions'];
  if (!activities.length) {
    tableBodyHtml = (
      <tr className='myactivities__table__row'>
        <td colSpan={6} className='myactivities__table__data'>
          There is no budget to approve
        </td>
      </tr>
    );
  } else {
    tableBodyHtml = activities.map((activity) => {
      const {
        id, user, createdAt, value, name,
      } = activity;
      return (
        <tr key={id} className='myactivities__table__row'>
          <td>{user.name}</td>
          <td>{format(new Date(createdAt), 'MMM dd yyyy')}</td>
          <td>{`${pointsToDollarConverter(value)} USD`}</td>
          <td>
            <TruncateDescriptionContainer description={name} wordCount={80} />
          </td>
          <td>
            <ActionsComponent id={id} onClick={handleApproveOrRejectClick} />
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

ApproveBudgetComponent.defaultProps = {
  activities: [],
  handleApproveOrRejectClick: null,
};

ApproveBudgetComponent.propTypes = {
  handleApproveOrRejectClick: PropTypes.func,
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ApproveBudgetComponent;
