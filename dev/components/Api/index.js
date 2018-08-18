const crypto = require("crypto");

const marvelURL = "https://gateway.marvel.com/v1/public/",
  apiKey = `apikey=${API_PUBLIC_KEY}`;

const getMarvelCharacters = options => {
  const { offset, name, exactMatch, sortName, limit, } = Object.assign(
    {
      offset: 0,
      name: "",
      exactMatch: false,
      sortName: "",
      limit: 20,
    },
    options
  );
  const ts = new Date().getTime();
  const hash = crypto.createHash("md5").update(ts + API_PUBLIC_KEY + API_PRIVATE_KEY).digest("hex");
  let url = `${marvelURL}characters?${apiKey}&offset=${offset}&orderBy=${sortName}name&limit=${limit}&ts=${ts}&hash=${hash}`;

  if (name) {
    if (exactMatch) url += `&name=${name}`;
    else url += `&nameStartsWith=${name}`;
  }
  
  return fetch(url)
    .then(res => res.json())
    .then(resObj => {
      try {
        if (resObj.code === 200) {
          if (offset > resObj.data.total) {
            throw new Error("Page does not exist.");
          } else {
            const pages = Math.floor(resObj.data.total / limit);
            return {
              characters: resObj.data.results,
              maxPage: resObj.data.total % limit > 0 ? pages + 1 : pages,
            };
          }
        } else {
          throw new Error(
            `Marvel API bad response. Status code ${resObj.code}.`
          );
        }
      } catch (e) {
        console.error(e);
        return {
          characters: [],
          maxPage: 0,
        };
      }
    });
};

export default getMarvelCharacters;