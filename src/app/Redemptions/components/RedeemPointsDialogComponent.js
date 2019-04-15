import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import { ButtonComponent } from '../../common/components';

import centers from '../contants';

const RedeemPointsDialogComponent = ({
  open,
  date,
  errors,
  reason,
  center,
  points,
  usdValue,
  onClose,
  onChange,
  handleRedemptionSubmit,
}) => (
  <Dialog
    disableEscapeKeyDown
    onClose={onClose}
    open={open}
    scroll='body'
    PaperProps={{
      style: {
        width: '498px',
        maxwidth: '498px',
        height: '750px',
        overflow: 'visible',
        padding: '30px 86px 0 86px',
      },
    }}
  >
    <div className='redeem-points'>
      <div className='redeem-points__icon'>
        <CloseIcon aria-label='Close' onClick={onClose} />
      </div>
      <div className='redeem-points__image' />

      {/* Dialog Title */}
      <p className='redeem-points__title'>Request Cash</p>

      {/* Dialog Content */}
      <form className='redeem-points__form'>
        <TextField
          name='usdValue'
          type='number'
          value={usdValue}
          onChange={onChange}
          label='How much is needed (USD)'
          className='redeem-points__input'
        />
        <FormHelperText error={!!errors.usdValue} className='redeem-points__error'>
          {errors.usdValue}
        </FormHelperText>
        {usdValue && (
          <div className='redeem-points__description'>
            <i className='fa fa-info-circle' aria-hidden />
            &nbsp;
            {`${usdValue} USD = ${points} Points`}
          </div>
        )}
        <TextField
          name='date'
          type='date'
          value={date}
          onChange={onChange}
          label='When ?'
          className='redeem-points__input'
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormHelperText error={!!errors.date} className='redeem-points__error'>
          {errors.date}
        </FormHelperText>
        <TextField
          name='reason'
          value={reason}
          onChange={onChange}
          label='What for ?'
          className='redeem-points__input'
        />
        <FormHelperText error={!!errors.reason} className='redeem-points__error'>
          {errors.reason}
        </FormHelperText>
        <FormControl>
          <InputLabel className='redeem-points__label' htmlFor='age-simple'>
            Which center ?
          </InputLabel>
          <Select
            fullWidth
            name='center'
            value={center}
            onChange={onChange}
            error={!!errors.center}
            className='redeem-points__input'
            input={<Input name='center' id='age-simple' />}
          >
            {centers.map(item => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!errors.center} className='redeem-points__error'>
            {errors.center}
          </FormHelperText>
        </FormControl>
        {/* Action buttons */}
        <ButtonComponent className='redeem-points__button' onClick={handleRedemptionSubmit}>
          <span>Redeem</span>
        </ButtonComponent>
      </form>
    </div>
  </Dialog>
);

RedeemPointsDialogComponent.defaultProps = {
  date: '',
  reason: '',
  points: '',
  center: '',
  errors: {},
  open: false,
  usdValue: null,
  onClose: null,
  onChange: null,
  handleRedemptionSubmit: null,
};

RedeemPointsDialogComponent.propTypes = {
  open: PropTypes.bool,
  date: PropTypes.string,
  onClose: PropTypes.func,
  center: PropTypes.string,
  points: PropTypes.number,
  onChange: PropTypes.func,
  reason: PropTypes.string,
  errors: PropTypes.shape({}),
  handleRedemptionSubmit: PropTypes.func,
  usdValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default RedeemPointsDialogComponent;
