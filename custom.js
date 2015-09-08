!function() {

if (typeof jQuery === 'undefined') {
  return;
}

$('#xJs').closest('.candidate-timeline2-item').hide();

function loadStylesheet(href, callback) {
  var el = document.createElement('LINK');
  el.type = "text/css";
  el.rel = "stylesheet";
  el.href = href;
  el.addEventListener('load', callback);
  document.head.appendChild(el);
}
function loadScript(src, callback) {
  var el = document.createElement('SCRIPT');
  el.type = "text/javascript";
  el.src = src;
  el.addEventListener('load', callback);
  document.body.appendChild(el);
}
loadScript('https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.2/masonry.pkgd.min.js', function() {
loadStylesheet('/sites/default/files/multisite/648138/IMCE/front-page-custom.css', function() {

var $timelineContent = $('#xJs').closest('.timeline-content');
var $sidebarNav = $('.block--sidebar-page-nav');

var $inlineMenu = $('<div class="candidate-timeline2-inline-menu"><h2>Menu</h2></div>');
$inlineMenu.append($sidebarNav.clone());
// $timelineContent.prepend($inlineMenu);
$('.block--candidate-timeline2').prepend($inlineMenu);

$timelineContent.masonry({
  columnWidth: 500,
  isFitWidth: true,
  transitionDuration: 0,
  itemSelector: '.candidate-timeline2-item',
  stamp: $inlineMenu
});

var $loadMoreLink = $('.candidate-timeline2-load-more-link');
$loadMoreLink.on('click', function() {
  setTimeout(function() {
    $timelineContent.masonry('layout');
  }, 100);
});

function layoutOnTwitterLoaded() {
  if (!window.twttr) {
    setTimeout(layoutOnTwitterLoaded, 100);
    return;
  }
  $timelineContent.masonry('layout');
  var twttr = window.twttr;
  twttr.events.bind('loaded', function() {
    setTimeout(function() {
      $timelineContent.masonry('layout');
    }, 100);
  });
}
layoutOnTwitterLoaded();

});});

}();
