// var twttr = window.twttr;
// var tt = twttr.txt;
var tt = require('twitter-text');
var ni = require('nimble');
// var humanizeUrl = require('humanize-url');
// var truncateUrl = require('truncate-url');
function displayUrl(url) {
  // return humanizeUrl(truncateUrl(url.replace(/\/?(\?[^?]*)?$/,''), 40));
  var result, shurl = url.replace(/^https?:\/\/(www\.)?/,'').replace(/\/?(\?[^?]*)?$/,'');
  return ((shurl.length > 50) && (result = /^(.{0,40}\/)/.exec(shurl))) ? result[1] + '…' : shurl;
}

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
      link.display_url = displayUrl(response['long-url']);
      callback(null, link);
    });
  }, callback);
}
module.exports.getUrlEntities = getUrlEntities

function autolinkAndExpandUrls(text, callback) {
  getUrlEntities(text, function(err, entities) {
    if (err) { return callback(err); }
    callback(null, tt.autoLink(text, {urlEntities: entities, target: '_blank'}));
  });
}
module.exports.autolinkAndExpandUrls = autolinkAndExpandUrls

function autolinkTweetText() {
  $('.twitter-tweet-text:not(.twitter-tweet-text-autolinked) > a > span').each(function() {
    var $this = $(this);
    var origText = $this.html();
    $this.closest('.twitter-tweet-text').addClass('twitter-tweet-text-autolinked');
    autolinkAndExpandUrls(origText, function(err, text) {
      if (err) { return; }
      $this.html(text);
    });
  });
  // replace second retweet button with open tweet link
  $('.tw-share').each(function() {
    var $this = $(this);
    $this.removeClass('tw-share').addClass('tw-view-tweet');
    var $a = $this.find('a');
    $a.attr('href', $a.attr('href').replace('intent/retweet?tweet_id=', 'statuses/'));
  })
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
