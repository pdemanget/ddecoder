/**
====================================================
					Ddecoder
					by p.demanget
created: 2015-02-18
modified: -
 
 global objects:
 -app
 * 
 use "d.js" to add link:
 * in html button name= (same name as the link)
 *  d.links.name=callback
 * d.addlink => loop on all html by name
 
 purpose: bidirectionnal conversion of
 base64
 UTF-8
 YAML
 hex
 hex color
 
 djs specific
 js2css
 js2html
 
====================================================
*/

var app={
	addLink: function(){
		d.links.start=app.start;
		d.links.select=app.select;
		d.links.options=app.options;
		d.links.help=app.help;
	},
	start:function(){
		var json = JSON.parse( app.values.js);
		var html = d.js2css(json);
		app.values.html=html;
		app.values.$apply();
	},
	select:function(){
		alert(app.values.js);
		
	},options:function(){
		alert("options");
		
	},help:function(){
		alert("help");
	},values:{
		js:"",
		html:""
	},
	init:function(){
		//link input to variable with d.js
		d.dataBind(app.values);
	}
	
};



function pageLoaded(){
	d.js2css(css);
	doHash();
	app.addLink();
	d.addLink();
	app.init();
}

function doHash(){
	if (window.location.hash=="#options"){
		d.links.options();
	}
}


window.onhashchange=doHash;
