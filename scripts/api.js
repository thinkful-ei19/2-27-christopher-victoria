const API_KEY = 'AIzaSyBco2kUNnQlmcmemhUS9SlcW0XwW_1LNeQ';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: `${searchTerm}`,
      part: 'snippet',
      key: API_KEY,
    }
    const decorateResponse = function(response) {
        const results = response.items.map((item, index) => [item.id.videoId, item.snippet.title, item.snippet.thumbnails.high.url]);
        const objArray = [];
        for (i=0; i<results.length; i++) {
          let makeObject = {
            id: results[i][0],
            title: results[i][1],
            thumbnail: results[i][2]
          }
          objArray.push(makeObject);
        }
        return objArray;
      };
    $.getJSON(BASE_URL, query, (response) => {
      return decorateResponse(response);
    });
  };
  