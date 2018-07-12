const generateIdForSociety = societyName => ({
  istelle: 1,
  invictus: 2,
  phoenix: 3,
  sparks: 4,
})[societyName.toLowerCase()];

export default generateIdForSociety;
