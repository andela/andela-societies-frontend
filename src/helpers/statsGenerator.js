/**
 * @name statsGenerator
 * @summary Generates an stats for a given array
 * @param {Array} arr - activity/redemption array to get stats from
 * @param {String} activityLabel - label for the number of activities/redemptions
 * @param {String} pointsLabel - label for the total number of points
 * @return {Array} stats
 */
const statsGenerator = (arr, activityLabel, pointsLabel) => {
  const stats = [];
  if (arr.length > 0) {
    const points = arr.reduce((accumulator, currentValue) =>
      (currentValue.points ? accumulator + currentValue.points : accumulator + currentValue.value), 0);
    stats.push({ value: arr.length, name: activityLabel }, { value: points, name: pointsLabel });
  } else {
    stats.push({ value: 0, name: activityLabel }, { value: 0, name: pointsLabel });
  }
  return stats;
};
export default statsGenerator;
