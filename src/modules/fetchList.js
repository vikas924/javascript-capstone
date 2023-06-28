const fetchShows = async (baseUrl) => {
  const url = baseUrl;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const resData = data.slice(0, 12);
    return resData;
  } catch (error) {
    return error;
  }
};

const fetchdata = async (baseUrl) => {
  const url = baseUrl;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export { fetchShows, fetchdata };