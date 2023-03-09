
const url = '123.56.217.170:8080'

function getRequestUrl() {
  return 'http://'+url+'/';
}

function getWebsokcetUrl() {
  return 'ws://'+url+'/socket/';
}

module.exports = {
	getUrl : getRequestUrl,
	getWebsokcetUrl:getWebsokcetUrl,
}