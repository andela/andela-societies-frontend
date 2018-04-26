import capitalizeString from './stringFormatter';

const filterActivities = (status, context) => {
  const filteredActivities = context[Object.keys(context)[0]]
    .filter(activity => capitalizeString(activity.status) === status);
  return {
    [Object.keys(context)[1]]: status === context.initialStatus
      ? context[Object.keys(context)[0]] : filteredActivities,
  };
};

export default filterActivities;
