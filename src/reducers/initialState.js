const initialState = {
  dashboard: {
    error: null,
    dlevel: '',
    society: '',
    loading: false,
    pointsEarned: 0,
    userActivities: [],
    activitiesLogged: 0,
    categories: [],
    activity: {},
  },
  sidebar: {
    error: '',
    userRole: {},
  },
  society: {
    loading: false,
    error: false,
    istelle: {
      pointsEarned: 0,
      usedPoints: 0,
      remainingPoints: 0,
      redemptions: [],
      loggedActivities: [],
      activitiesLogged: 0,
    },
    phoenix: {
      pointsEarned: 0,
      usedPoints: 0,
      remainingPoints: 0,
      redemptions: [],
      loggedActivities: [],
      activitiesLogged: 0,
    },
    invictus: {
      pointsEarned: 0,
      usedPoints: 0,
      remainingPoints: 0,
      redemptions: [],
      loggedActivities: [],
      activitiesLogged: 0,
    },
    sparks: {
      pointsEarned: 0,
      usedPoints: 0,
      remainingPoints: 0,
      redemptions: [],
      loggedActivities: [],
      activitiesLogged: 0,
    },
  },
};

export default initialState;
