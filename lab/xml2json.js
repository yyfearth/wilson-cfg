// minified
function xml2json(b,g,h){function j(b,g){if(!b)return null;var c="",a=null;if(b.childNodes&&0<b.childNodes.length)for(var i=0;i<b.childNodes.length;i++){var d=b.childNodes[i],f=d.nodeType,e=d.localName||d.nodeName||"",h=d.text||d.nodeValue||"";if(8!=f)if(3==f||4==f||!e)c+=h.replace(/^\s+|\s+$/g,"");else if(a=a||{},a[e]){if(!(a[e]instanceof Array)||!a[e].length)a[e]=[a[e]];a[e].push(j(d,!0))}else a[e]=j(d,!1)}if(b.attributes&&!k&&0<b.attributes.length){a=a||{};for(d=0;d<b.attributes.length;d++)e=b.attributes[d],f=e.name||"",e=e.value,a[f]?(!(a[f]instanceof Array)&&a[f].length&&(a[f]=[a[f]]),a[f].push(e)):a[f]=e}if(a){if(""!=c){d=new String(c);for(i in a)d[i]=a[i];a=d}if(c=a.text?("object"==typeof a.text?a.text:[a.text||""]).concat([c]):c)a.text=c;c=""}a=a||c;if(l){c&&(a={});if(c=a.text||c||"")a.text=c;!g&&!(a instanceof Array)&&(a=[a])}return a}var l=g,k=h;if(!b)return{};"string"==typeof b&&(b=q(b));if(b.nodeType){if(3==b.nodeType||4==b.nodeType)return b.nodeValue;b=9==b.nodeType?b.documentElement:b;g=j(b,!0);b=b=null;return g}}function q(b){var g;try{var h=new DOMParser;h.async=!1;g=h.parseFromString(b,"text/xml")}catch(j){throw Error("Error parsing XML string");}return g};


/*
### XML to JSON Plugin v1.0 - 2008-07-01 ###
* http://www.fyneworks.com/ - diego@fyneworks.com
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
###
Website: http://www.fyneworks.com/jquery/xml-to-json/
*/
/*
# INSPIRED BY: http://www.terracoder.com/
AND: http://www.thomasfrank.se/xml_to_json.html
AND: http://www.kawa.net/works/js/xml/objtree-e.html
*/
/*
This simple script converts XML (document of code) into a JSON object. It is the combination of 2
'xml to json' great parsers (see below) which allows for both 'simple' and 'extended' parsing modes.
*/
// converts xml documents and xml text to json object
function xml2json(xml, extended, textonly) {
	if (!xml)
		return {}; // quick fail
	//### PARSER LIBRARY
	// Core function
	function parseXML(node, simple) {
		if (!node)
			return null;
		var txt = '', obj = null, att = null;
		var nt = node.nodeType, nn = node.localName || node.nodeName || '';
		var nv = node.text || node.nodeValue || '';
		//window.console && console.log(['x2j',nn,nt,nv.length+' bytes']); // DBG
		if (node.childNodes) {
			if (node.childNodes.length > 0) {
				//window.console && console.log(['x2j',nn,'CHILDREN',node.childNodes]); // DBG
				for (var n = 0; n < node.childNodes.length; n++) {
					var cn = node.childNodes[n];
					var cnt = cn.nodeType,
					cnn = cn.localName || cn.nodeName || '';
					var cnv = cn.text || cn.nodeValue || '';
					//window.console && console.log(['x2j',nn,'node>a',cnn,cnt,cnv]); // DBG
					if (cnt == 8) {
						//window.console && console.log(['x2j',nn,'node>b',cnn,'COMMENT (ignore)']); // DBG
						continue; // ignore comment node
					} else if (cnt == 3 || cnt == 4 || !cnn) {
						// ignore white-space in between tags
						txt += cnv.replace(/^\s+|\s+$/g, '');
						// make sure we ditch trailing spaces from markup
					} else {
						//window.console && console.log(['x2j',nn,'node>e',cnn,'OBJECT']); // DBG
						obj = obj || {};
						if (obj[cnn]) {
							//window.console && console.log(['x2j',nn,'node>f',cnn,'ARRAY']);
							if (!(obj[cnn] instanceof Array) || !obj[cnn].length)
								obj[cnn] = [obj[cnn]];
							obj[cnn].push(parseXML(cn, true)); // simple
						} else {
							//window.console && console.log(['x2j',nn,'node>g',cnn,'dig deeper...']); // DBG
							obj[cnn] = parseXML(cn);
						}
					}
				}
			} //node.childNodes.length>0
		} //node.childNodes
		if (node.attributes && !textonly) {
			if (node.attributes.length > 0) {
				//window.console && console.log(['x2j',nn,'ATTRIBUTES',node.attributes]) // DBG
				att = {};
				obj = obj || {};
				for (var a = 0; a < node.attributes.length; a++) {
					var at = node.attributes[a];
					var atn = at.name || '',
					atv = at.value;
					att[atn] = atv;
					if (obj[atn]) {
						//window.console && console.log(['x2j',nn,'attr>',atn,'ARRAY']); // DBG
						if (!(obj[atn] instanceof Array || !obj[atn].length))
							obj[atn] = [obj[atn]]; //[ obj[ atn ] ];
						obj[atn].push(atv);
					} else {
						//window.console && console.log(['x2j',nn,'attr>',atn,'TEXT']); // DBG
						obj[atn] = atv;
					}
				}
				//obj['attributes'] = att;
			} //node.attributes.length>0
		} //node.attributes
		if (obj) {
			if (txt != '') {
				var t = new String(txt);
				for (var n in obj)
					t[n] = obj[n];
				obj = t;
			}
			txt = (obj.text) ? (typeof(obj.text) == 'object' ? obj.text: [obj.text || '']).concat([txt]) : txt;
			if (txt)
				obj.text = txt;
			txt = '';
		};
		var out = obj || txt;
		//console.log([extended, simple, out]);
		if (extended) {
			if (txt)
				out = {};
			txt = out.text || txt || '';
			if (txt)
				out.text = txt;
			if (!simple && !(out instanceof Array))
				out = [out];
		};
		return out;
	}; // parseXML

	// Core Function End
	// Utility functions
	function isNum(s) {
		return (typeof s == "number") || String((s && typeof s == "string") ? s: '').test(/^((-)?([0-9]*)((\.{0,1})([0-9]+))?$)/);
	};

	// Utility functions End
	//### PARSER LIBRARY END
	// Convert plain text to xml
	if (typeof xml == 'string')
		xml = text2xml(xml);

	// Quick fail if not xml (or if this is a node)
	if (!xml.nodeType)
		return;
	if (xml.nodeType == 3 || xml.nodeType == 4)
		return xml.nodeValue;

	// Find xml root node
	var root = (xml.nodeType == 9) ? xml.documentElement: xml;

	// Convert xml to json
	var out = parseXML(root, true); // simple

	// Clean-up memory
	xml = null;
	root = null;

	// Send output
	return out;
}

// Convert text to XML DOM
function text2xml(str) {
	// NOTE: I'd like to use jQuery for this, but jQuery makes all tags uppercase
	//return $(xml)[0];
	var out;
	try {
		var xml = window.DOMParser ? new DOMParser() : new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
	} catch(e) {
		throw new Error("XML Parser could not be instantiated")
	};
	try {
		if (window.DOMParser)
			out = xml.parseFromString(str, "text/xml");
		else
			out = (xml.loadXML(str)) ? xml: false;
	} catch(e) {
		throw new Error("Error parsing XML string")
	};
	return out;
}