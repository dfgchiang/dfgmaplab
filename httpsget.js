// from https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
// node10.10
const https = require('https');
var qurl = 'https://map.dfg.ca.gov/arcgis/rest/services/Base_Maps/GeoReference/MapServer/1?f=pjson';
qurl = 'https://wombat.vectronic-wildlife.com:9443/v2/collar/18461/gps?collarkey=68C9B8A4BAD4EC91BA2E6582DFC6E5B5D2EFEAF18DA697AD6ED87DA8CD6179B36F420223714105432FD39CC11EF71511EA486D1669B2E7DF3398A2B30850E619AECA40B1A8C614CED47B66F8DEF6DC324816DE62F06F46114CF66B9D857F2801D3A12AF37E157ACB60D9C5E4868A1D0E8304AFDA39D64FD9DB24A156852BEDDBE27782091E3973B4D59F6D79E2B0F0471038D2C45C763A50454FCD4F664CB6F44F2D8BA71BA9FEF2BF182ECF8E57623B4F4CA019BBA813924474F6423C481E6A791AE37C43C36E920FDEC90B3F65CDCB647BC92A0476081846141E3F155C87970B04DF4E83060CB9D98840EA50C3D42BF1B51769E72F163ED89FA055B302C24E';
var arg2 = '&afterAcquisition=2019-06-14T01:01:01'
qurl = qurl + arg2;
https.get(qurl, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data)[0].acquisitionTime);//.description);
    //currentVersion);//explanation);
    console.log(JSON.parse(data)[0].longitude);//.description);
    console.log(JSON.parse(data)[0].latitude);//.description);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
//20190615 dfgchiang
