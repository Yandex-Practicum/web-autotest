var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.arrayIteratorImpl=function(a){var d=0;return function(){return d<a.length?{done:!1,value:a[d++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var d="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return d?d.call(a):$jscomp.arrayIterator(a)};
$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,e){a!=Array.prototype&&a!=Object.prototype&&(a[d]=e.value)};
$jscomp.polyfill=function(a,d,e,g){if(d){e=$jscomp.global;a=a.split(".");for(g=0;g<a.length-1;g++){var c=a[g];c in e||(e[c]={});e=e[c]}a=a[a.length-1];g=e[a];d=d(g);d!=g&&null!=d&&$jscomp.defineProperty(e,a,{configurable:!0,writable:!0,value:d})}};$jscomp.FORCE_POLYFILL_PROMISE=!1;
$jscomp.polyfill("Promise",function(a){function d(){this.batch_=null}function e(b){return b instanceof c?b:new c(function(f,a){f(b)})}if(a&&!$jscomp.FORCE_POLYFILL_PROMISE)return a;d.prototype.asyncExecute=function(b){null==this.batch_&&(this.batch_=[],this.asyncExecuteBatch_());this.batch_.push(b);return this};d.prototype.asyncExecuteBatch_=function(){var b=this;this.asyncExecuteFunction(function(){b.executeBatch_()})};var g=$jscomp.global.setTimeout;d.prototype.asyncExecuteFunction=function(b){g(b,
0)};d.prototype.executeBatch_=function(){for(;this.batch_&&this.batch_.length;){var b=this.batch_;this.batch_=[];for(var f=0;f<b.length;++f){var a=b[f];b[f]=null;try{a()}catch(l){this.asyncThrow_(l)}}}this.batch_=null};d.prototype.asyncThrow_=function(b){this.asyncExecuteFunction(function(){throw b;})};var c=function(b){this.state_=0;this.result_=void 0;this.onSettledCallbacks_=[];var f=this.createResolveAndReject_();try{b(f.resolve,f.reject)}catch(k){f.reject(k)}};c.prototype.createResolveAndReject_=
function(){function b(b){return function(c){a||(a=!0,b.call(f,c))}}var f=this,a=!1;return{resolve:b(this.resolveTo_),reject:b(this.reject_)}};c.prototype.resolveTo_=function(b){if(b===this)this.reject_(new TypeError("A Promise cannot resolve to itself"));else if(b instanceof c)this.settleSameAsPromise_(b);else{a:switch(typeof b){case "object":var a=null!=b;break a;case "function":a=!0;break a;default:a=!1}a?this.resolveToNonPromiseObj_(b):this.fulfill_(b)}};c.prototype.resolveToNonPromiseObj_=function(b){var a=
void 0;try{a=b.then}catch(k){this.reject_(k);return}"function"==typeof a?this.settleSameAsThenable_(a,b):this.fulfill_(b)};c.prototype.reject_=function(b){this.settle_(2,b)};c.prototype.fulfill_=function(b){this.settle_(1,b)};c.prototype.settle_=function(b,a){if(0!=this.state_)throw Error("Cannot settle("+b+", "+a+"): Promise already settled in state"+this.state_);this.state_=b;this.result_=a;this.executeOnSettledCallbacks_()};c.prototype.executeOnSettledCallbacks_=function(){if(null!=this.onSettledCallbacks_){for(var b=
0;b<this.onSettledCallbacks_.length;++b)h.asyncExecute(this.onSettledCallbacks_[b]);this.onSettledCallbacks_=null}};var h=new d;c.prototype.settleSameAsPromise_=function(b){var a=this.createResolveAndReject_();b.callWhenSettled_(a.resolve,a.reject)};c.prototype.settleSameAsThenable_=function(b,a){var c=this.createResolveAndReject_();try{b.call(a,c.resolve,c.reject)}catch(l){c.reject(l)}};c.prototype.then=function(b,a){function d(b,a){return"function"==typeof b?function(a){try{e(b(a))}catch(m){f(m)}}:
a}var e,f,g=new c(function(b,a){e=b;f=a});this.callWhenSettled_(d(b,e),d(a,f));return g};c.prototype.catch=function(b){return this.then(void 0,b)};c.prototype.callWhenSettled_=function(b,a){function c(){switch(d.state_){case 1:b(d.result_);break;case 2:a(d.result_);break;default:throw Error("Unexpected state: "+d.state_);}}var d=this;null==this.onSettledCallbacks_?h.asyncExecute(c):this.onSettledCallbacks_.push(c)};c.resolve=e;c.reject=function(a){return new c(function(b,c){c(a)})};c.race=function(a){return new c(function(b,
c){for(var d=$jscomp.makeIterator(a),g=d.next();!g.done;g=d.next())e(g.value).callWhenSettled_(b,c)})};c.all=function(a){var b=$jscomp.makeIterator(a),d=b.next();return d.done?e([]):new c(function(a,c){function g(b){return function(c){f[b]=c;h--;0==h&&a(f)}}var f=[],h=0;do f.push(void 0),h++,e(d.value).callWhenSettled_(g(f.length-1),c),d=b.next();while(!d.done)})};return c},"es6","es3");var http=require("http"),port=3E3,set_cookie=[],dataFromServer={};
function get(a){return new Promise(function(d,e){e={host:"localhost",port:port,path:"/"+a,method:"GET",headers:{Cookie:set_cookie}};"token"in dataFromServer&&(e.headers.authorization="Bearer "+dataFromServer.token);http.request(e,function(a){a.setEncoding("utf8");var c="";a.on("data",function(a){c+=a});a.on("end",function(){d({done:!0,data:{res:a,rawData:c}})})}).on("error",function(a){d({done:!1})}).end()})}
(new Promise(function(a,d){var e=20,g=!1,c=setInterval(function(){e--;0===e&&(clearInterval(c),d());g&&(clearInterval(c),a());get("cards").then(function(a){a.done&&(g=!0)})},1E3)})).catch(function(a){return process.exit(1)});