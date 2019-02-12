export const validToken = {
  UserInfo: {
    name: 'John Dorian',
    picture: 'http://imagehost.com/1',
    roles: {
      Andelan: 'asdawiaesdasd',
      Fellow: 'sdfsfseefsdfdsf',
    },
  },
  exp: 9523624387,
};

export const invalidToken = {
  UserInfo: {
    name: 'Jane Doe',
    picture: 'http://imagehost.com/2',
    roles: {
      Andelan: '',
      Technology: 'sdfsfseefsdfdsf',
    },
  },
  exp: 9523624387,
};
