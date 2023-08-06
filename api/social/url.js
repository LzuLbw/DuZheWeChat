
const url = 'localhost:8080'

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