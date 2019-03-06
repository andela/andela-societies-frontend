const initialState = {
  dashboard: {
    error: null,
    society: '',
    loading: false,
    pointsEarned: 0,
    userActivities: [],
    activitiesLogged: 0,
  },
  society: {
    loading: false,
    error: false,
    pointsEarned: 0,
    usedPoints: 0,
    remainingPoints: 0,
    loggedActivities: [],
    activitiesLogged: 0,
  },
};

export default initialState;
