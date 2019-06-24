import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import ACTIVITY_STATUS from '../constants';

const AlertDialogComponent = ({
  open, onClose, message, status,
}) => (
  <Dialog
    disableEscapeKeyDown
    onClose={onClose}
    open={open}
    scroll='body'
    PaperProps={{
      style: {
        width: '502px',
        height: '247px',
        maxwidth: '502px',
        overflow: 'visible',
        padding: '30px 50px 0 50px',
      },
    }}
  >
    <div className='alert-dialog'>
      <div className='alert-dialog__icon'>
        <CloseIcon aria-label='Close' onClick={onClose} className='alert-dialog__close' />
      </div>

      {/* Dialog Title */}
      <div>
        <p className='alert-dialog__title'>{message}</p>
        {/* Icon */}
        {
          status === ACTIVITY_STATUS.APPROVED && (
            <div className='alert-dialog__checkmark' />
          )
        }
        { status === ACTIVITY_STATUS.REJECTED && (
          <ErrorOutlineIcon className='alert-dialog__error' />
        )
        }
      </div>
    </div>
  </Dialog>
);

AlertDialogComponent.defaultProps = {
  open: false,
  message: '',
  onClose: null,
  status: null,
};

AlertDialogComponent.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
};

export default AlertDialogComponent;
