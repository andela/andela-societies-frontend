import capitalizeString from './stringFormatter';

const filterActivities = (status, context) => {
  const filteredActivities = context.allActivities
    .filter(activity => capitalizeString(activity.status) === status);
  return {
    filteredActivities: status === context.initialStatus
      ? context.allActivities : filteredActivities,
  };
};

export default filterActivities;
