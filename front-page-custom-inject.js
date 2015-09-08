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
var $sidebarNav = $('.block--sidebar-page-nav');
var $inlineMenu = $('<div class="candidate-timeline2-inline-menu"><h2>Menu</h2></div>');
$inlineMenu.append($sidebarNav.clone());
$timelineContent.prepend($inlineMenu);

$timelineContent.masonry({
  // columnWidth: 100,
  columnWidth: 500,
  // columnWidth: '.candidate-timeline2-item',
  isFitWidth: true,
  // gutter: -1,
  transitionDuration: 0,
  percentPosition: true,
  itemSelector: '.candidate-timeline2-item',
  stamp: $inlineMenu
});

var twttr = window.twttr;
twttr.events.bind('loaded', function() {
  setTimeout(function() {
    $timelineContent.masonry();
  }, 100);
});

var $loadMoreLink = $('.candidate-timeline2-load-more-link');
$loadMoreLink.on('click', function() {
  setTimeout(function() {
    $timelineContent.masonry();
  }, 100);
})

});

}();
