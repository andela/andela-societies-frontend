import moment from 'moment';

const formatDate = date => (
  moment(date).format('LL')
);

export default formatDate;
