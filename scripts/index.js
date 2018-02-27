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
//response.items
const decorateResponse = function(response) {
  // const results = response.items.map((item, index) => render(item));
  const results = response.items.map((item, index) => [item.id, item.snippet.title, item.snippet.thumbnails.high.url]);
  console.log(results);

};

// TASK:
// 1. Create a `generateVideoItemHtml` function that receives the decorated object
// 2. Using the object, return an HTML string containing all the expected data
// TEST IT!
const generateVideoItemHtml = function(video) {
  return `
  <li>test</li>
  `
};

// TASK:
// 1. Create a `addVideosToStore` function that receives an array of decorated video
// objects and sets the array as the value held in store.items
// TEST IT!
const addVideosToStore = function(videos) {

};

// TASK:
// 1. Create a `render` function
// 2. Map through `store.videos`, sending each `video` through your `generateVideoItemHtml`
// 3. Add your array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
  const videoResults = store.videos.map(video => generateVideoItemHtml(video));
  $('.results').html(videoResults);
};

// TASK:
// x1. Create a `handleFormSubmit` function that adds an event listener to the form
// 2. The listener should:
//   xa) Prevent default event
//   xb) Retrieve the search input from the DOM
//   xc) Clear the search input field
//   xd) Invoke the `fetchVideos` function, sending in the search value
//   ---->e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the `addVideosToStore` function
//   g) Inside the callback, run the `render` function
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
