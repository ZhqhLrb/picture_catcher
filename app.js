const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

var targetUrl = 'http://image.baidu.com/';

var dir = './img';

request(targetUrl, (err, res, body) => {
    var $ = cheerio.load(body);
    var imgs = $('img');
    for (var index in imgs) {
        if (parseInt(index)) {
            var imgUrl = imgs[index].attribs.src;
            var fileName = imgUrl.substr(-4);
            if (imgUrl.indexOf('/') < 2) {
                continue;
            }
            if (fileName.indexOf('.') === -1) {
                continue;
            }
            download(imgUrl, dir, Math.floor(Math.random()*10000) + fileName);
        }
    }
    console.log('图片下载完成');
});

function download (url, dir, fileName) {
    request(url).pipe(fs.createWriteStream(dir + '/' + fileName));
};