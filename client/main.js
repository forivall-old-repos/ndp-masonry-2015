// require('./init.js');

var ni = require('nimble');
var tt = require('twitter-text');

var $ = window.jQuery;
// // wrap $.ajax in standard node style callbacks
var $ajax = $.ajax;
// var $ajax = require('najax'); // node
function http(type, url, data, dataType, callback) {
  var options = {};
  options.type = type;
  options.data = data;
  options.dataType = dataType;
  options.success = function(data, code, xhr) { callback(null, data, { code: code, xhr: xhr}); };
  options.error = function(xhr, code) { callback({ code: code, xhr: xhr }); };
  $ajax(url, options);
}

function getUrlEntities(text, callback) {
  ni.map(tt.extractUrlsWithIndices(text), function(link, callback) {
    http('GET', 'http://api.longurl.org/v2/expand', {url: link.url, format: 'json'}, 'jsonp', function(err, response) {
      // ignore errors
      if (err) { return callback(null, link); }
      link.expanded_url = response['long-url'];
      link.display_url = response['long-url'].replace(/^https?:\/\//,'').replace(/\/?(\?[^?]*)?$/,'');
      callback(null, link);
    });
  }, callback);
}
module.exports.getUrlEntities = getUrlEntities

function autolinkAndExpandUrls(text, callback) {
  getUrlEntities(text, function(err, entities) {
    if (err) { return callback(err); }
    callback(null, tt.autoLink(text, {urlEntities: entities}));
  });
}
module.exports.autolinkAndExpandUrls = autolinkAndExpandUrls

function autolinkTweetText() {
  $('.twitter-tweet-text:not(.twitter-tweet-text-autolinked)').each(function() {
    var $this = $(this);
    var origText = $this.html();
    $this.addClass('twitter-tweet-text-autolinked');
    autolinkAndExpandUrls(origText, function(err, text) {
      if (err) { return; }
      $this.html(text);
    });
  });
}
module.exports.autolinkTweetText = autolinkTweetText;

$(autolinkTweetText);

// monkey patch twttr.widgets.load, which is called when more results are displayed
function monkeyPatchTwttrLoad() {
  if (!(typeof twttr !== 'undefined' && twttr != null && twttr.widgets != null && typeof twttr.widgets.load === 'function')) {
    setTimeout(monkeyPatchTwttrLoad, 100);
    return;
  }
  var origTwttrWidgetsLoad = twttr.widgets.load;
  twttr.widgets.load = function() {
    autolinkTweetText();
    origTwttrWidgetsLoad.apply(this, arguments);
  }
};
monkeyPatchTwttrLoad();
