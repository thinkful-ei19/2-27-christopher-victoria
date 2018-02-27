const API_KEY = 'AIzaSyBco2kUNnQlmcmemhUS9SlcW0XwW_1LNeQ';

const store = {
  videos: [],

};

// TASK: Add the Youtube Search Base URL here:
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

// TASK:
// x1. Create a `fetchVideos` function that receives a `searchTerm` and `callback`
// x2. Use `searchTerm` to construct the right query object based on the Youtube API docs
// x3. Make a getJSON call using the query object and sending the provided callback in as the last argument
// TEST IT! Execute this function and console log the results inside the callback.
const fetchVideos = function(searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    part: 'snippet',
    key: API_KEY,
  }
  $.getJSON(BASE_URL, query, (response) => {
    console.log(response);
    return decorateResponse(response);
  });
};

// TASK:
// x1. Create a `decorateResponse` function that receives the Youtube API response
// x2. Map through the response object's `items` array
// x3. Return an array of objects, where each object contains the keys `id`, `title`,
// `thumbnail` which each hold the appropriate values from the API item object. You
// WILL have to dig into several nested properties!
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.
const decorateResponse = function(response) {
  // const results = response.items.map((item, index) => render(item));
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
  console.log(objArray);
  addVideosToStore(objArray);
  render();
};

// TASK:
// x1. Create a `generateVideoItemHtml` function that receives the decorated object
// x2. Using the object, return an HTML string containing all the expected data
// TEST IT!
const generateVideoItemHtml = function(video) {
  //Temporary HTML string for test purposes.
  return `
  <li>
    <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank"><img src="${video.thumbnail}"></a>
    <h2>${video.title}</h2>
  </li>
  `
};



// TASK:
// x1. Create a `addVideosToStore` function that receives an array of decorated video
// objects and sets the array as the value held in store.items
// TEST IT!
const addVideosToStore = function(videos) {
 store.videos = videos
};

// TASK:
// x1. Create a `render` function
// x2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
// x3. Add your array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
  const videoHtmlArr = store.videos.map(item => generateVideoItemHtml(item))
  console.log(videoHtmlArr);
  let htmlString = '';
  for (i=0; i<videoHtmlArr.length; i++) {
    htmlString += videoHtmlArr[i];
  }
  console.log(htmlString);
  $('.results').html(htmlString);
};

// TASK:
// x1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   xa) Prevent default event
//   xb) Retrieve the search input from the DOM
//   xc) Clear the search input field
//   xd) Invoke the `fetchVideos` function, sending in the search value
//   xe) Inside the callback, send the API response through the `decorateResponse` function
//   xf) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   xg) Inside the callback, run the `render` function
// TEST IT!
const handleFormSubmit = function() {
  $('form').on('submit', function(event) {
    event.preventDefault();
    const searchTerm = $('#search-term').val();
    $('#search-term').val('');
    fetchVideos(searchTerm);
  })
};

// When DOM is ready:
$(function () {
  // TASK:
  // 1. Run `handleFormSubmit` to bind the event listener to the DOM
  handleFormSubmit();
});
