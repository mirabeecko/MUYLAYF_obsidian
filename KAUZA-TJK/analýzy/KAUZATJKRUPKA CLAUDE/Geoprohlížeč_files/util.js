/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/util","exports ../errors/RequestError ../errors/CancelError ../Deferred ../io-query ../_base/array ../_base/lang ../promise/Promise ../has".split(" "),function(f,q,m,r,n,t,h,u,v){function w(a){return p(a)}function x(a){return void 0!==a.data?a.data:a.text}f.deepCopy=function(a,c){for(var e in c){var d=a[e],b=c[e];d!==b&&(!b||"object"!==typeof b||b instanceof FormData?a[e]=b:"[object Date]"===Object.prototype.toString.call(b)?a[e]=new Date(b):h.isArray(b)?a[e]=f.deepCopyArray(b):
d&&"object"===typeof d?f.deepCopy(d,b):a[e]=f.deepCopy({},b))}return a};f.deepCopyArray=function(a){var c=[];a.forEach(function(a){"object"===typeof a?c.push(f.deepCopy({},a)):c.push(a)});return c};f.deepCreate=function(a,c){c=c||{};var e=h.delegate(a),d,b;for(d in a)(b=a[d])&&"object"===typeof b&&(e[d]=f.deepCreate(b,c[d]));return f.deepCopy(e,c)};var p=Object.freeze||function(a){return a};f.deferred=function(a,c,e,d,b,k){var g=new r(function(b){c&&c(g,a);return b&&(b instanceof q||b instanceof m)?
b:new m("Request canceled",a)});g.response=a;g.isValid=e;g.isReady=d;g.handleResponse=b;e=g.then(w).otherwise(function(b){b.response=a;throw b;});f.notify&&e.then(h.hitch(f.notify,"emit","load"),h.hitch(f.notify,"emit","error"));d=e.then(x);b=new u;for(var l in d)d.hasOwnProperty(l)&&(b[l]=d[l]);b.response=e;p(b);k&&g.then(function(a){k.call(g,a)},function(b){k.call(g,a,b)});g.promise=b;g.then=b.then;return g};f.addCommonMethods=function(a,c){t.forEach(c||["GET","POST","PUT","DELETE"],function(c){a[("DELETE"===
c?"DEL":c).toLowerCase()]=function(d,b){b=h.delegate(b||{});b.method=c;return a(d,b)}})};f.parseArgs=function(a,c,e){var d=c.data,b=c.query;!d||e||"object"!==typeof d||v("native-xhr2")&&(d instanceof ArrayBuffer||d instanceof Blob)||(c.data=n.objectToQuery(d));b?("object"===typeof b&&(b=n.objectToQuery(b)),c.preventCache&&(b+=(b?"\x26":"")+"request.preventCache\x3d"+ +new Date)):c.preventCache&&(b="request.preventCache\x3d"+ +new Date);a&&b&&(a+=(~a.indexOf("?")?"\x26":"?")+b);return{url:a,options:c,
getHeader:function(a){return null}}};f.checkStatus=function(a){a=a||0;return 200<=a&&300>a||304===a||1223===a||!a}});
//# sourceMappingURL=util.js.map