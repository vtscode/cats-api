const baseURL = "https://api.thecatapi.com/v1";

const getBreeds = async (page = 0, limit = 10) => {
  try {
    const res = await fetch(`${baseURL}/breeds?limit=${limit}&page=${page}`);
    const body = await res.json();
    return body;
  } catch (err) {
    console.error("getBreed :", err);
    throw Error(err);
  }
};
const getBreedDetails = async (id) => {
  try {
    if (!Boolean(id)) {
      throw Error("ID breed required !");
    }
    const res = await fetch(`${baseURL}/breeds/${id}`);
    const body = await res.json();
    return body;
  } catch (err) {
    console.error("getBreedDetails :", err);
    throw Error(err);
  }
};
const getBreedImage = async (id, limit = 8) => {
  try {
    if (!Boolean(id)) {
      throw Error("ID breed required !");
    }
    const res = await fetch(
      `${baseURL}/images/search?breed_ids=${id}&limit=${limit}`
    );
    const body = await res.json();
    return body;
  } catch (err) {
    console.error("getBreedImage :", err);
    throw Error(err);
  }
};
export { getBreeds, getBreedDetails };
