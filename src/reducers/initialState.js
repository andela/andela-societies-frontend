const initialState = {
  userInfo: {},
  myActivities: {
    requesting: false,
    failed: false,
    activities: [],
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
};

export default initialState;
