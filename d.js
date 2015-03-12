/**
 d.js CSS html generation framework
 Licence LGPLv3 2015
 * 
 * Main function are
 * 
 * js2css
 * dataBind
 * addLink() in conjonction with links

 d.js API:
 links: object<function()> map of onclick callback
 button: function
 sfield:
 label:
 
 pseudo-directive: 
  1. scan bind attribute: loop on DOM, add onchange  event when input/select/textarea found.
  2. scan bind value == {{}} keep variable on element when found:Algo
	when {{}} found change to dom element value
	when value found store Dom element for future change
	when change do apply
	on apply set innerHtml to value elements.
 
 */

d=new function(){
this.extend=function(me,o){
	for(k in o){
		me[k]=o[k];
	}
};
var me=this;
this.extend(this,{
	links: {},
	t:function(tag, text, p){return "<"+tag+(p?' '+p:'')+">"+(text?text:'')+"</"+tag+">";	},
	button: function(value,onclick){
		me.links[value]=onclick;
		return '<input type="button" class="btn" name="'+value+'" value="'+value+'"/>';
	},
	addLink: function(){
		for(link in me.links){
			console.log(link);
			document.getElementsByName(link)[0].addEventListener("click", me.links[link]);
		}
	},
	sfield: function(field, input){
		return '<div class="centered"><label>'+field+': </label>'+
				'<select name="'+input+'"> <option>Human</option><option>Computer</option></select></div>';
	},
	label: function(title, value){
		return '<div class="centered"><label>'+title+': </label>'+
				'<span>'+value+' </span></div>';
	},
	pushForm: function(o){
		for(var key in o){
			var elts = document.getElementsByName(key);
			for(var i=0;i<elts.length;i++){
				elts[i].value=o[key];
			}
		}
	},
	pullForm: function(o){
		for(var key in o){
			var elts = document.getElementsByName(key);
			for(var i=0;i<elts.length;i++){
				o[key]=elts[i].value;
			}
		}
	},
	insertTag: true,
	prettyPrint: true,


	/**
	 * Map<Map<<String>> elem: map of map of CSS strings
	 * syntax simplification: _ replaced by -
	 * number replaced by numberpx or #number
	 */
	js2css : function(js){
		if (this.insertTag) {
			monstyle=document.createElement('style');
			document.head.appendChild(monstyle);
		}
		var allCss='';
		var curly=this.prettyPrint?'\n}\n':'}';
		
		for (var k in js){
			css = k + '{';
			
			for (var l in js[k]){
				var prop=l.replace('_','-'); 
				var value=js[k][l];
				if (typeof value === 'number' ){
					if(l.indexOf('color')>=0){
						value ="#"+value.toString(16);
					}else{
						value +="px";
					}
				}
				if (this.prettyPrint) css += '\n\t';
				css += prop + ': ' + value +';';
			}
			css += curly;
			if (this.insertTag) monstyle.sheet.insertRule(css,0);
			//console.log(css);
			allCss += css + '\n';
		}
		return allCss;
	},
	
	InputBinding: function InputBinding(scope,key,input){
		var moncul=this;
		this.change=function(){
			scope[key]=input[0].value;
		}
	},
	/**
		databind angular (free) style)
		obj: your scope
		elt: your DOM part optional, document is default.
		* 
		* Algo: nChange: updates scope
		* 		$apply: update input
		* 
	*/
	dataBind: function(obj, elt){
		elt=elt||document;
		for( key in obj){
			var input = elt.getElementsByName(key);
			if (input.length){
				input[0].onchange=new d.InputBinding(obj,key,input).change;
			}
		}
		obj.$apply=function(){me.apply(obj,elt)};
		obj.$apply();
	},
	
	apply: function(obj,elt){
		for( key in obj){
			var input = elt.getElementsByName(key);
			if (input.length){
				input[0].value=obj[key];
			}
		}
	}

}

);//eof extends
}//eof functiond

