const filterActivitiesByStatus = (activities, status) => (
  activities.filter(activity => activity.status.toLowerCase() === status)
);

export default filterActivitiesByStatus;
