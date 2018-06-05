const initialState = {
  userInfo: {},
  myActivities: {
    requesting: false,
    activities: [],
    error: null,
    message: null,
  },
  societyInfo: {
    requesting: false,
    info: {
      name: '',
      image: '',
      loggedActivities: [],
      totalPoints: 0,
      usedPoints: 0,
      remainingPoints: 0,
    },
    error: {},
  },
  categories: {
    requesting: false,
    categories: [],
    error: {},
  },
  societyActivities: {
    activities: [],
    requesting: false,
    error: {},
  },
  userProfile: {
    requesting: false,
    info: {
      society: {
        name: '',
      },
    },
    error: {},
  },
};

export default initialState;
