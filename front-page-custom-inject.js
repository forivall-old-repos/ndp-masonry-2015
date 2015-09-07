!function() {

function loadStylesheet(href, callback) {
  var el = document.createElement('LINK');
  el.type = "text/css";
  el.rel = "stylesheet";
  el.href = href;
  el.addEventListener('load', callback);
  document.head.appendChild(el);
}
loadStylesheet('front-page-custom.css', function() {

var $timelineContent = $('#page_customization_anchor').closest('.timeline-content');
$timelineContent.masonry({
  // columnWidth: 100,
  columnWidth: 500,
  isFitWidth: true,
  gutter: 5,
  transitionDuration: 0,
  itemSelector: '.candidate-timeline2-item'
});

var twttr = window.twttr;
twttr.events.bind('loaded', function() {
  setTimeout(function() {
    $timelineContent.masonry();
  }, 100);
});

});

}();
