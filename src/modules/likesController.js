const fetchLikes = async (involvmentUrl) => {
  const url = `${involvmentUrl}likes`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const text = await response.text();
      if (text.trim() === '') {
        return {};
      }
      const data = JSON.parse(text);
      return data;
    }
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    return error;
  }
};

export default fetchLikes;