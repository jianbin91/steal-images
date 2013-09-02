var fs = require('fs');
var http = request('http');

var imageDir = './images';

var source = process.argv[2];

var imageList=[];

console.log("Welcome to steal-images.js.");

//init
fs.exists(imageDir, function (exists) {
  if(exists){ 
  	console.log("Image dir already exists.");
  }
  else{
  	fs.mkdir(imagedir, function(){
  		console.log('Image dir created.');
  	});
  }
  
});

//create IMG dir if doesn't exists

//create dest dir if doesn't exists

//request URL
http.get(source, function(res) {
  //get content to parser
	res.on('data', function(data){
		
	});
		//get image sources to array
}).on('error', function(e) {
  console.log("Error fetching remote URL: " + e.message);
});

	
		
			
			
//iterate array

	//fetch image url as stream to dest dir

//all done.