// require('./init.js');

var tt = require('twitter-text');

var $ = window.jQuery;

function autolinkTweetText() {
  $('.twitter-tweet-text:not(.twitter-tweet-text-autolinked)').each(function() {
    var $this = $(this);
    $this.addClass('twitter-tweet-text-autolinked').html(tt.autoLink($this.html()));
  });
}

$(autolinkTweetText);

// monkey patch twttr.widgets.load, which is called when more results are displayed
var origTwttrWidgetsLoad = twttr.widgets.load;
twttr.widgets.load = function() {
  autolinkTweetText();
  origTwttrWidgetsLoad.apply(this, arguments);
}


// tt.autoLink('...');
