const httpreq = require('httpreq');
const unzip = require('unzip-crx');
const prompt = require('prompt');
const os = require('os');

var host,type;

console.log('-----------------------Parameters explained-----------------------');
console.log('Host: Url to download extension from. ex: https://demo.letznav.com');
console.log('Type: editor (or) player');
console.log('Destination: Path to extract the extension. ex: D:\path');
console.log('-------------------------------------------------------------------')

prompt.start();
prompt.get(['Host', 'Type', 'Destination'], function (err, result) {
    if(err){
		console.log(err);
	}
	else{
		host = result.Host;
		type= result.Type === 'player' ? 'player' : 'editor';

		var  api = '/api/public/admin/extensions/'+ type + '/letznav_' + type + '.crx';
		var url = host + api;
		var user = os.userInfo().username;
		var dir = 'C:\\Users\\' + user + '\\Downloads\\letznav_' + type + '.crx';
		
		console.log('Downloading from: ', url);
		
		httpreq.download(url, dir,
		 function (err, progress){
		  if (err) return console.log('Progress ',err);
		  console.log(progress);
		}, function (err, res){
		  if (err) return console.log('Result ',err);
		  console.log('Downloaded crx file...')
		  unzip(dir, result.Destination).then(()=>{
			console.log("Successfully unzipped your crx file..");
			})
		});
	}
  });
 

 	
 

  
 
