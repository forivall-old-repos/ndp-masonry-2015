import express from 'express';
import proxy from 'express-http-proxy';
import url from 'url';
import path from 'path';
const app = express();
app.use('/site_timeline', proxy('amandeepnijjar.ndp.ca', {
  forwardPath(req, res) {
    var proxypath = path.join('/site_timeline', url.parse(req.url).path);
    console.log(`proxying ${req.url} to ${proxypath}`);
    return proxypath;
  }
}));
app.use('/', express.static('chrome-saved'));
var port;
const server = app.listen(port = +process.argv[2] || 8000, function() {
  console.log(`server running on port ${port}`);
})
