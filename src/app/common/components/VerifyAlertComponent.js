import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';

const VerifyAlertModal = (props) => {
  const { children, open } = props;
  return (
    <Dialog
      disableEscapeKeyDown
      open={open}
      scroll='body'
      PaperProps={{
        style: {
          width: '498px',
          maxwidth: '498px',
          height: '300px',
          padding: '50px 66px 0 66px',
          top: '30%',
          textAlign: 'center',
        },
      }}
    >
      <div id='dialog'>
        {children}
      </div>
    </Dialog>
  );
};


VerifyAlertModal.defaultProps = {
  open: false,
};

VerifyAlertModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  open: PropTypes.bool,
};


export default VerifyAlertModal;
