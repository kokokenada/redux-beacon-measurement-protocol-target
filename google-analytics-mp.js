'use strict';

var config = void 0;
var lastPage = void 0;

function calcURL(event) {
  return 'www.google-analytics.com?v=1' + '&ds=web' + ('&tid=' + config.trackingId) + ('&cid=' + config.clientId) + ('&ua=' + encodeURI(config.userAgent)) + (config.userId ? '&uid=' + config.userId : '') + ('&t=' + event.hitType) + (event.page ? '&dp=' + event.page : '&dp=' + lastPage) + ( // Note use of lastPage
  event.title ? '&dt=' + event.title : '') + (event.location ? '&cg1=' + event.location : '') + (event.eventCategory ? '&ec=' + event.eventCategory : '') + (event.eventAction ? '&ea=' + event.eventAction : '') + (event.eventLabel ? '&el=' + event.eventLabel : '') + (event.eventValue ? '&ev=' + event.eventValue : '') + '';
}

function GoogleAnalyticsMeasurementProtocol(events) {
  if (typeof window === 'undefined') {
    return;
  }
  if (typeof window.ga !== 'function') {
    throw new Error('window.ga is not defined, Have you forgotten to include Google Analytics?');
  }
  events.forEach(function (event) {
    if (event.hitType === 'pageview') {
      lastPage = event.page;
    }
    config.callback(calcURL(event));
  });
}

function setConfig(newConfig) {
  config = newConfig;
}


function XhrPost(data) {
  let request = new XMLHttpRequest();
  request.open("POST", data.url, true);
  request.setRequestHeader("Content-Type", "/collect HTTP/1.1");
  request.send('');
}

module.exports = {
  GoogleAnalyticsMeasurementProtocol: GoogleAnalyticsMeasurementProtocol,
  setConfig: setConfig,
  XhrPost: XhrPost
};