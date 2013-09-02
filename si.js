var fs = require('fs');
var http = require('http');
var htmlparser = require('htmlparser2');
var path = require('path');
var async = require('async');
var request = require('request');

var source = process.argv[2];

//var tagName = process.argv[3] == '--img' ? 'img' : 'a';
//console.log('Mode: ' + tagName);
var tagName = 'a';

var timestamp = Math.round(new Date().getTime() / 1000);

var imageDir = './images';
var destinationDir = imageDir + '/' + timestamp;

var imageList=[];

var limit = 30;

console.log("Welcome to steal-images.js.");

//create IMG dir if doesn't exists
fs.exists(imageDir, function (exists) {
  if(exists){ 
  	console.log("Image dir already exists.");
  }
  else{
  	fs.mkdir(imageDir, function(){
  		console.log('Image dir created.');
  	});
  }
});


var createDestinationDir = function(callback){
  	fs.mkdir(destinationDir, function(){
  		console.log('Destination dir created.');
  		callback();
  	});
};

//get parser ready
var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){
    	//console.log('Tag checked: ' + name);
        if(name === tagName){
        	//var name = tagName == 'a' ? attribs.href : attribs.src;
        	//console.log(name);
        	name = attribs.href;
        	var url = source + name;
        	var ext = path.extname(attribs.href).toLowerCase();
            if(ext === '.jpg' || ext === '.jpeg' || ext == '.gif' || ext == '.png'){
            	var fn = function(){
            		request.head(url, function(err, res, body){
            			console.log(name + ' downloaded.');
					    request(url).pipe(fs.createWriteStream(destinationDir + '/' + name));
					});
            	};
            	imageList.push(fn);
            }  
        }
    }
});

var getHtml = function(){
	//request URL
	http.get(source, function(res) {
		//get content to parser
		res.on('data', function(chunk){
			parser.write(chunk);
		});
		res.on('end', function(){
			console.log('HTML parsed. ' + imageList.length + ' images found.');
			parser.end();
			if(imageList.length > 0)
				createDestinationDir(executeSave);
			else
				console.log('Nothing to save.');
		});
			//get image sources to array
	}).on('error', function(e) {
	  console.log("Error fetching remote URL: " + e.message);
	});
};

var executeSave = function(){
	async.parallel(imageList, function(err, results){
		if(err)
		  console.log('Something went wrong: ' + err.message);
		else
		  console.log('Image donwloads are done.');
	});
};

//after INIT need to call getHtml
if(!source)
	console.log('Missing source URL');
else
	getHtml();