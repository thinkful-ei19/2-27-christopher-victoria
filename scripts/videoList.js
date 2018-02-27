const generateVideoItemHtml = function(video) {
    //Temporary HTML string for test purposes.
    return `
    <li>
    <div>
      <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank"><img src="${video.thumbnail}"></a>
      <h2>${video.title}</h2>
    </div>
    </li>
    `
  };

  const render = function() {
    const videoHtmlArr = store.videos.map(item => generateVideoItemHtml(item))
    let htmlString = '';
    for (i=0; i<videoHtmlArr.length; i++) {
      htmlString += videoHtmlArr[i];
    }
    $('.results').html(htmlString);
  };  

  const handleFormSubmit = function() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      fetchVideos(searchTerm);
      setVideos(objArray);
      render();
    })
  };

  const bindEventListeners = function() {
    handleFormSubmit();
}
  