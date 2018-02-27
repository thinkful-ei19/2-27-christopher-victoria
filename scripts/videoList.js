const generateVideoItemHtml = function(video) {
    //Temporary HTML string for test purposes.
    return `
    <li class="video-item">
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank"><img src="${video.thumbnail}"></a>
      <h2>${video.title}</h2>
    </li>
    `
  };

  const render = function() {
    console.log('render ran');
    const videoHtmlArr = store.videos.map(item => generateVideoItemHtml(item));
    let htmlString = '';
    for (i=0; i<videoHtmlArr.length; i++) {
      htmlString += videoHtmlArr[i];
    }
    console.log(htmlString);
    $('.results').html(htmlString);
  };  

  const handleFormSubmit = function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      fetchVideos(searchTerm, function(response) {
        render();
      });
    })
  };

  const bindEventListeners = function() {
    handleFormSubmit();
}
  