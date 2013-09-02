# steal-images.js

This is a short command line script to download images from a webpage via GET.

The script only searches for links with images in the href attribute for now, so works for example with apache default dir listings.

Later I will add img tag support and clean up the code, it's a little messy right now.

## Usage

Simply call from command line with an URL parameter:
$ node si.js http://sample.com/images/

By the way, don't be a dick, only download images you have the permissions for :)