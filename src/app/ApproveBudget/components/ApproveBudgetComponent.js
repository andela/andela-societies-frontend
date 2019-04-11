import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';

import ActionsComponent from '../../VerifyActivities/components/ActionsComponent';
import { TableComponent, TruncateDescriptionContainer } from '../../common/components';
import { pointsToDollarConverter } from '../../utils';

const ApproveBudgetComponent = ({ activities }) => {
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
          <td>{dateFns.format(createdAt, 'MMM DD YYYY')}</td>
          <td>{`${pointsToDollarConverter(value)} USD`}</td>
          <td>
            <TruncateDescriptionContainer description={name} wordCount={80} />
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

ApproveBudgetComponent.defaultProps = {
  activities: [],
};

ApproveBudgetComponent.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.shape({})),
};

export default ApproveBudgetComponent;
