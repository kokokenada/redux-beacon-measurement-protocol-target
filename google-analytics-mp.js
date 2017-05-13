
var config;
var lastPage;


function calcURL(event) {
  console.log(event)
  var str= 'v=1' +
    '&ds=web' +
    `&tid=${config.trackingId}` +
    `&cid=${config.clientId}` +
    `&ua=${encodeURI(config.userAgent)}` +
    (config.userId ? `&uid=${config.userId}` : '') +
    `&t=${event.hitType}` +
    (event.page ? `&dp=${event.page}` : `&dp=${lastPage}`) + // Note use of lastPage
    (event.title ? `&dt=${event.title}` : '') +
    (event.location ? `&cg1=${event.location}` : '') +
    (event.eventCategory ? `&ec=${event.eventCategory}` : '') +
    (event.eventAction ? `&ea=${event.eventAction}` : '') +
    (event.eventLabel ? `&el=${event.eventLabel}` : '') +
    (event.eventValue ? `&ev=${event.eventValue}` : '') +
    ' ';
  return str;
}

function GoogleAnalyticsMeasurementProtocol(events) {
  events.forEach((event) => {
    if (event.hitType === 'pageview') {
      lastPage = event.page;
    }
    config.callback({url: calcURL(event)});
  });
}

function setConfig(newConfig) {
  config = newConfig;
}

module.exports = { GoogleAnalyticsMeasurementProtocol, setConfig };

function XhrPost(data) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function () {
//    console.log('onreadystatechange');
//    console.log(request.status);
//    console.log(request.responseText);
//    console.log(request.responseType)
  };
  var url = 'http://www.google-analytics.com/collect?' + data.url;
  request.open("POST", url, true);
  request.send('');
//  console.log('post')
//  console.log(url)
}

module.exports = {
  GoogleAnalyticsMeasurementProtocol: GoogleAnalyticsMeasurementProtocol,
  setConfig: setConfig,
  XhrPost: XhrPost
};