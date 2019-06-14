const search = (searchText, data) => {
  if (searchText) {
    const results = data
      .filter(activity => Object.values(activity)
        .some(value => value && value.toString().toLowerCase().includes(searchText.toLowerCase())));
    return results;
  }
  return data;
};

export default search;
