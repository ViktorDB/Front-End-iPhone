require=(function e(h,j,l){function m(a,c){if(!j[a]){if(!h[a]){var d=typeof require=="function"&&require;
if(!c&&d){return d(a,!0)}if(i){return i(a,!0)}throw new Error("Cannot find module '"+a+"'")
}var b=j[a]={exports:{}};h[a][0].call(b.exports,function(g){var f=h[a][1][g];return m(f?f:g)
},b,b.exports,e,h,j,l)}return j[a].exports}var i=typeof require=="function"&&require;
for(var k=0;k<l.length;k++){m(l[k])}return m})({1:[function(d,g,f){g.exports={ambient:[{platform:"desktop",browser:"safari",type:"h264"},{platform:"desktop",browser:"chrome",type:"h264"},{platform:"desktop",browser:"firefox",type:"h264"},{platform:"desktop",browser:"ie",browser_version:9,type:"h264"},{platform:"tablet",browser:"safari mobile",type:"flow"},{platform:"handheld",browser:"safari mobile",type:"flow"}],scrollable:[{platform:"desktop",browser:"safari",type:"h264"},{platform:"desktop",browser:"chrome",type:"h264"},{platform:"desktop",browser:"firefox",type:"h264"},{platform:"desktop",browser:"ie",browser_version:9,type:"h264"},{platform:"tablet",browser:"safari mobile",browser_version:8,type:"flow"},{platform:"handheld",browser:"safari mobile",browser_version:8,type:"flow"}],scrubbable:[{platform:"desktop",browser:"safari",type:"h264"},{platform:"desktop",browser:"chrome",type:"h264"},{platform:"desktop",browser:"firefox",type:"h264"},{platform:"desktop",browser:"ie",browser_version:9,type:"h264"},{platform:"tablet",browser:"safari mobile",type:"flow"},{platform:"handheld",browser:"safari mobile",type:"flow"}],sizes:[{retina:true,min_viewport_width:1024,type:"large_2x"},{retina:false,min_viewport_width:1024,type:"large"},{retina:true,min_viewport_width:768,type:"medium_2x"},{retina:false,min_viewport_width:768,type:"medium"},{min_viewport_width:0,type:"xsmall_2x"}]}
},{}],2:[function(g,i,h){var j=g("./ac-ajax/Ajax");var k=g("./ac-ajax/Request");
i.exports=new j();i.exports.Ajax=j;i.exports.Request=k},{"./ac-ajax/Ajax":3,"./ac-ajax/Request":4}],3:[function(g,i,h){var j=g("./Request");
var k=function(){};k._Request=j;k.prototype={_defaults:{timeout:5000},_extend:function(){for(var a=1;
a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},create:function(a){return new j(a)},get:function(a){a=this._getOptions({method:"get"},a);
return this.create(a).send()},getJSON:function(a){return this.get(a).then(function(b){return JSON.parse(b.responseText)
})},head:function(a){a=this._getOptions({method:"head"},a);return this.create(a).send()
},post:function(a){a=this._getOptions({method:"post"},a);return this.create(a).send()
}};i.exports=k},{"./Request":4}],4:[function(f,h,g){var i=function(a){this._initialize(a)
};i.prototype={_addReadyStateChangeHandler:function(){this.xhr.onreadystatechange=function(a){if(this.xhr.readyState===4){clearTimeout(this._timeout);
if(this.xhr.status>=200&&this.xhr.status<300){this.resolve(this.xhr)}else{this.reject(this.xhr)
}}}.bind(this)},_getPromise:function(){this.promise=new Promise(function(a,b){this.resolve=a;
this.reject=b}.bind(this))},_initialize:function(a){var b=this._validateConfiguration(a);
if(b){throw b}this._configuration=a;var c=this._configuration.method.toUpperCase();
this.xhr=new XMLHttpRequest();this._getPromise();this.xhr.open(c,this._configuration.url);
this._setRequestHeaders(a.headers);this._addReadyStateChangeHandler()},_sendXHR:function(){if(this.xhr){if(this._configuration&&this._configuration.data){this.xhr.send(this._configuration.data)
}else{this.xhr.send()}}},_setRequestHeaders:function(a){if(a){a.forEach(function(b){this.xhr.setRequestHeader(b.name,b.value)
},this)}},_setTimeout:function(a){if(!a){if(this._configuration&&this._configuration.timeout){a=this._configuration.timeout
}else{clearTimeout(this._timeout);this._timeout=null}}if(this._timeout!==null){clearTimeout(this._timeout)
}if(a>0){this._timeout=setTimeout(function(){this.xhr.abort();this.reject()}.bind(this),a)
}},_timeout:null,_validateConfiguration:function(a){if(!a){return"Must provide a configuration object"
}var b=[];var c=a.headers;if(!a.url){b.push("Must provide a url")}if(!a.method){b.push("Must provide a method")
}if(c){if(!Array.isArray(c)){return"Must provide an array of headers"}this._validateHeaders(c,b)
}return b.join(", ")},_validateHeaders:function(b,a){for(var c=0,d=b.length;c<d;
c++){if(!b[c].hasOwnProperty("name")||!b[c].hasOwnProperty("value")){a.push("Must provide a name and value key for all headers");
break}}},promise:null,reject:null,resolve:null,send:function(){this._setTimeout();
this._sendXHR();return this.promise},xhr:null};h.exports=i},{}],5:[function(d,g,f){g.exports.InlineStyleRenderer=d("./ac-style-renderer/InlineStyleRenderer");
g.exports.LogRenderer=d("./ac-style-renderer/LogRenderer")},{"./ac-style-renderer/InlineStyleRenderer":6,"./ac-style-renderer/LogRenderer":7}],6:[function(j,i,k){var h=(function(){var a,b;
if(h){return}b=document.createElement("div");a=["transform","webkitTransform","MozTransform","msTransform","oTransform"];
a.some(function(c){if(c in b.style){h=c;return true}});return h})();var g={transformFunctions:["none","matrix","translate","translateX","translateY","scale","scaleX","scaleY","rotate","skewX","skewY","matrix3d","translate3d","translateZ","scale3d","scaleZ","rotate3d","rotateX","rotateY","rotateZ","perspective"],render:function(a,c){var b=this._parseProps(c);
b.forEach(function(d){a.style[d.prop]=d.value})},_mergeTransformProps:function(b){var a=b.reduce(this._partialPropValue.bind(this),"");
return{prop:h,value:a}},_partialPropValue:function(c,b){var a=this._parseTransformFunction(b.prop);
var d=[c," ",a,"(",b.value,")"].join("");return d},_parseTransformFunction:function(a){return a.replace("transform-","")
},_isTransformFunction:function(a){return this.transformFunctions.indexOf(a)!==-1
},_parseProps:function(b){var c=[];var d=[];var r;var a;var q;for(var f=0,p=b.length;
f<p;f++){q=b[f];r=this._isTransformFunction(q.prop);[].push.call(r?d:c,q)}if(d.length){a=this._mergeTransformProps(d);
c.push(a)}return c}};i.exports=g},{}],7:[function(d,g,f){g.exports={render:function(a,b){var c=(arguments.length<2)?a:b;
console.log(c)}}},{}],8:[function(d,g,f){f.Clock=d("./ac-animation-sequencer/Clock");
f.PlayerMonitor=d("./ac-animation-sequencer/PlayerMonitor");f.Timeline=d("./ac-animation-sequencer/Timeline");
f.Tween=d("./ac-animation-sequencer/Tween");f.BasicPlayer=d("./ac-animation-sequencer/player/BasicPlayer");
f.MediaPlayer=d("./ac-animation-sequencer/player/MediaPlayer");f.Pause=d("./ac-animation-sequencer/controllers/Pause");
f.MediaGroup=d("./ac-animation-sequencer/controllers/MediaGroup");f.BaseClip=d("./ac-animation-sequencer/clip/BaseClip");
f.CompositeClip=d("./ac-animation-sequencer/clip/CompositeClip");f.TimedClip=d("./ac-animation-sequencer/clip/TimedClip");
f.TweenClip=d("./ac-animation-sequencer/clip/TweenClip");f.ElementClip=d("./ac-animation-sequencer/clip/ElementClip");
f.VideoClip=d("./ac-animation-sequencer/clip/VideoClip");f.ReversibleVideo=d("./ac-animation-sequencer/adapters/ReversibleVideo")
},{"./ac-animation-sequencer/Clock":9,"./ac-animation-sequencer/PlayerMonitor":10,"./ac-animation-sequencer/Timeline":11,"./ac-animation-sequencer/Tween":12,"./ac-animation-sequencer/adapters/ReversibleVideo":15,"./ac-animation-sequencer/clip/BaseClip":16,"./ac-animation-sequencer/clip/CompositeClip":17,"./ac-animation-sequencer/clip/ElementClip":18,"./ac-animation-sequencer/clip/TimedClip":19,"./ac-animation-sequencer/clip/TweenClip":20,"./ac-animation-sequencer/clip/VideoClip":21,"./ac-animation-sequencer/controllers/MediaGroup":22,"./ac-animation-sequencer/controllers/Pause":23,"./ac-animation-sequencer/player/BasicPlayer":24,"./ac-animation-sequencer/player/MediaPlayer":25}],9:[function(g,k,h){function i(){this._currentTimeMS=0;
this._playbackRate=1;this._paused=true;this._resetStartTime()}var j=i.prototype;
j._updateCurrentTime=function(){var a,b=Date.now();if(this._paused){a=0}else{a=(b-this._startTime)
}this._currentTimeMS+=(a*this._playbackRate);this._startTime=b};j._resetStartTime=function(){this._startTime=Date.now()
};j.play=function(){this._resetStartTime();this._paused=false;return this};j.pause=function(){this._updateCurrentTime();
this._paused=true;return this};j.isPaused=function(){return this._paused};j.getCurrentTime=function(){this._updateCurrentTime();
return this._currentTimeMS/1000};j.setCurrentTime=function(a){if(isNaN(a)){return
}this._resetStartTime();this._currentTimeMS=a*1000};j.getPlaybackRate=function(){return this._playbackRate
};j.setPlaybackRate=function(a){if(isNaN(a)){return}this._playbackRate=a};k.exports=i
},{}],10:[function(o,m,j){var k=o("ac-event-emitter").EventEmitter;var i=o("./vendor/utils");
function n(b,a,c){c=(Array.isArray(a)?c:a)||{};a=(Array.isArray(a)?a:[]);this._player=b;
this._isMonitoring=true;this._times=[0];this._previous=0;this._currentTimeIndex=0;
this._options=i.defaults({active:true,readyEvent:"canplaythrough",autoInit:false},c);
if(this._options.autoInit){this.addPlayerListener(this._options.readyEvent,this._init.bind(this,a))
}}var l=n.prototype=new k();l.addPlayerListener=function(a,b){if(typeof this._player.addEventListener==="function"){this._player.addEventListener(a,b)
}else{if(typeof this._player.on==="function"){this._player.on(a,b)}}};l._init=function(a){if(this._initialized){return
}this.addTime(this._player.duration);if(a&&a.length){a.forEach(this.addTime.bind(this))
}this._resetNextTimes();this._attachEvents();if(this._options.active){this._listen()
}this.trigger("ready");this._initialized=true};l._attachEvents=function(){this.addPlayerListener("play",this._handlePlay.bind(this));
if(!this._options.active){this.addPlayerListener("timeupdate",this._listen.bind(this))
}this.addPlayerListener("seeking",this._handleSeek.bind(this));this.addPlayerListener("ratechange",this._handleRateChange.bind(this))
};l.addTime=function(b,a){b=parseFloat(b);if(isNaN(b)){throw new TypeError('Invalid time "'+b+'", expected Number"')
}if(this._times.indexOf(b)===-1){this._times.push(b);this._times.sort(function(c,d){return c-d
})}if(typeof a==="function"){this.on("time:"+b,a)}this._resetNextTimes()};l._handleSeek=function(){var a=this._player.currentTime;
var b=this._times.indexOf(a);this._currentTimeIndex=(b!==-1)?b:this._calcCurrentTimeIndex(a);
this._resetNextTimes()};l._handlePlay=function(){this._resetNextTimes();this._listen()
};l._handleRateChange=function(){var b=this._player.currentTime;var a=b===this._player.duration;
var c=this._times.indexOf(b)!==-1;this._currentTimeIndex=(a||c)?this._currentTimeIndex:this._calcCurrentTimeIndex(b);
this._resetNextTimes()};l._resetNextTimes=function(){var a=this._calcNextTimeIndex(this._currentTimeIndex);
if(i.isNum(a)){this._nextTimeIndex=a;this._nextTimePoint=this._times[a]}};l._calcCurrentTimeIndex=function(a){var d,b,c,f;
c=this._calcTimeIndices(a);b=c[0];d=c[1];f=(this._forwards())?b:d;return(this._validTimeIndex(f))?f:null
};l._validTimeIndex=function(a){return(0<=a&&a<=this._times.length-1)};l._calcNextTimeIndex=function(b){var a=b+((this._forwards())?1:-1);
return(this._validTimeIndex(a))?a:null};l._calcTimeIndices=function(a){var b=this._times.reduce(function(d,c,f){return(a>=this._times[d+1])?f:d
}.bind(this),0);return[b,b+1]};l._reachedNextTime=function(a){var b=this._forwards();
var d=this._nextTimePoint;var c=!this._player.paused||a===0||a===this._player.duration;
var g=b&&a>=d;var f=!b&&a<=d;return c&&(g||f)};l._forwards=function(){return this._player.playbackRate>0
};l._listen=function(){var b=this._player.currentTime;var c=this._previous;var a=this._reachedNextTime(b);
if(a){this._enterTimePoint(c)}this._previous=b;if(this._options.active&&!this._player.paused){window.requestAnimationFrame(this._listen.bind(this))
}};l._enterTimePoint=function(b){var c=this._calcNextTimeIndex(this._currentTimeIndex);
if(!i.isNum(c)){return}var a=this._times[c];this.trigger("time:"+a,{previous:b,next:this._player.currentTime,requested:a});
this._currentTimeIndex=c;this._resetNextTimes()};m.exports=n},{"./vendor/utils":28}],11:[function(j,q,k){var l=j("./clip/CompositeClip");
var m=j("./clip/TimedClip");var n="Invalid duration for the following clip; must be number greater than or equal to zero (0)";
var o='Invalid clip type: "';var p={clipTypes:{Tween:j("./clip/TweenClip"),Element:j("./clip/ElementClip")},create:function(a){if(this.validTimeline(a)){return this._buildTimeline(a)
}if(this.debug&&console&&typeof console.warn==="function"){console.warn("Timeline: invalid timeline data:",a)
}return null},validTimeline:function(a){return Array.isArray(a)&&a.every(this._validClip.bind(this))
},_getClipType:function(a){if(typeof a==="string"&&this.clipTypes[a]){a=this.clipTypes[a]
}if(this._isValidClipType(a)){return a}return false},_isValidClipType:function(a){return(a&&a.create)
},_validate:function(){return true},_buildTimeline:function(a){var b=a.map(this._createTimedClip.bind(this));
return new l(b)},_createTimedClip:function(a){var b=this._getClipType(a.clip);return new m(b.create(a),a)
},_validClip:function(a){var b;var d=this._getClipType(a.clip);var c=this._validDuration(a);
if(!d){throw new TypeError(o+a.clip+'"\n\n'+JSON.stringify(a))}b=d.validate||this._validate;
return c&&b(a)},_validDuration:function(b){var a=b.duration;var c=typeof a==="number"&&a>0;
if(!c){throw new TypeError(n+"\n\n"+JSON.stringify(b))}return c}};q.exports=p},{"./clip/CompositeClip":17,"./clip/ElementClip":18,"./clip/TimedClip":19,"./clip/TweenClip":20}],12:[function(t,u,r){var n=t("./vendor/KeySpline");
var p=t("./vendor/EasingFunctions");var l="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var s="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var m=t("./vendor/utils");function o(a){a=a||{};m.defaultProps(this,o.defaults,a);
this._easingFunction=this._createEasing(this.easing)}o.defaults={from:0,to:1,duration:1,easing:"linear"};
var q=o.prototype;q._createEasing=function(b){var a;if(typeof b==="string"){a=this._createPredefinedEasing(b)
}else{if(Array.isArray(b)){a=this._createBezierEasing(b)}else{if(typeof b==="function"){a=b
}else{throw new TypeError(l+b)}}}return a};q._createBezierEasing=function(b){var d;
var c=b;var a=b.every(function(f){return(typeof f==="number")});if(b.length!==4||!a){throw new TypeError(s+b)
}d=new n(c[0],c[1],c[2],c[3]);return function(i,f,g,h){return f+d.get(i/h)*g}};
q._createPredefinedEasing=function(c){var a=p[c];var b="";if(!a){b+='Easing function "'+a;
b+='" not recognized among the following: ';b+=Object.keys(p).join(", ");throw new Error(b)
}return a};q._getInterpolatedValue=function(b,c,d,a){return this._easingFunction(b,c,d,a)
};q.valueAtLocation=function(a){if(a<0||a>1){return null}var b=this.duration*a;
return this.valueAtTime(b)};q.valueAtPercent=function(a){if(a<0||a>100){return null
}return this.valueAtLocation(a/100)};q.valueAtTime=function(a){if(a<0||a>this.duration){return null
}return this._getInterpolatedValue(a,this.from,this.to-this.from,this.duration)
};u.exports=o},{"./vendor/EasingFunctions":26,"./vendor/KeySpline":27,"./vendor/utils":28}],13:[function(k,j,g){function h(a){this._media=a
}var i=h.prototype;i.on=function(){this._media.addEventListener.apply(this._media,arguments)
};i.off=function(){this._media.removeEventListener.apply(this._media,arguments)
};i.getCurrentTime=function(){return this._media.currentTime};i.setCurrentTime=function(a){this._media.currentTime=a
};i.getDuration=function(){return this._media.duration};i.getPlaybackRate=function(){return this._media.playbackRate
};i.setPlaybackRate=function(a){this._media.playbackRate=a};j.exports=h},{}],14:[function(m,l,i){if(typeof Object.defineProperties!=="function"){return
}var j=m("ac-event-emitter").EventEmitter;function h(a){this._player=a}var k=h.prototype=new j();
k.addEventListener=function(){this._player.on.apply(this._player,arguments)};k.removeEventListener=function(){this._player.on.apply(this._player,arguments)
};k.play=function(){this._player.play.apply(this._player,arguments)};k.pause=function(){this._player.pause.apply(this._player,arguments)
};Object.defineProperties(h.prototype,{paused:{get:function(){return this._player.isPaused()
},set:function(a){this._player.setPaused(a)}},currentTime:{get:function(){return this._player.getCurrentTime()
},set:function(a){this._player.setCurrentTime(a)}},duration:{get:function(){return this._player.getDuration()
}},playbackRate:{get:function(){return this._player.getPlaybackRate()},set:function(a){this.trigger("ratechange",{rate:a});
this._player.setPlaybackRate(a)}}});l.exports=h},{}],15:[function(h,m,i){if(typeof Object.defineProperties!=="function"){return
}var k=h("ac-event-emitter").EventEmitter;function j(a){this._media=a;this._lastTime=null;
j.passThroughEvents.forEach(this.passThroughEvent.bind(this));j.interceptedEvents.forEach(this.interceptEvent.bind(this))
}j.interceptedEvents=["seeking","play"];j.passThroughEvents=["abort","canplay","canplaythrough","durationchange","emptied","ended","error","loadeddata","loadedmetadata","loadstart","mozaudioavailable","pause","playing","progress","ratechange","seeked","suspend","timeupdate","volumechange","waiting"];
var l=j.prototype=new k();l.addEventListener=function(b){var a=j.passThroughEvents;
if(a.indexOf(b)>-1){this._media.addEventListener.apply(this._media,arguments)}else{this.on.apply(this,arguments)
}};l.removeEventListener=function(b){var a=j.passThroughEvents;if(a.indexOf(b)>-1){this._media.removeEventListener.apply(this._media,arguments)
}else{this.off.apply(this,arguments)}};l.passThroughEvent=function(a){this._media.addEventListener(a,this._passThrough.bind(this))
};l.interceptEvent=function(b){var a=this["_on"+b];if(typeof a!=="undefined"){this._media.addEventListener(b,a.bind(this))
}};l._passThrough=function(a){this.trigger(a.type,a)};l._onseeking=function(){if(!this._playing){this.trigger("seeking")
}};l._onplay=function(){this.trigger("play")};l.play=function(){if(this.playbackRate<0){this._playing=true;
this._lastTime=null;window.requestAnimationFrame(this._update.bind(this));this.trigger("play")
}else{this._media.play()}};l.load=function(){this._media.load()};l._stop=function(a){a.preventDefault();
a.stopPropagation()};l._update=function(b){var a=b-(this._lastTime||b);var c=this._media.currentTime+((a*this.playbackRate)/1000);
if(c<=0){this._media.currentTime=0;this._playing=false;this.trigger("returned",{type:"returned"})
}else{this._media.currentTime=c;this.trigger("timeupdate",{type:"timeupdate"})}this._lastTime=b;
if(this._playing){window.requestAnimationFrame(this._update.bind(this))}};l.pause=function(){this._playing=false;
this._media.pause()};Object.defineProperties(j.prototype,{currentTime:{get:function(){return this._media.currentTime
},set:function(a){this._media.currentTime=a}},duration:{get:function(){return this._media.duration
}},buffered:{get:function(){return this._media.buffered}},playbackRate:{get:function(){return this._media.playbackRate
},set:function(a){this._media.playbackRate=a}},paused:{get:function(){return !this._playing&&this._media.paused
},set:function(a){this._media.paused=a}}});m.exports=j},{}],16:[function(v,w,t){var q=v("../vendor/KeySpline");
var p=v("ac-style-renderer").LogRenderer;var r=v("../vendor/EasingFunctions");var m="Easing option must be one of: String, Array[Number:4], or Function. Given: ";
var u="KeySpline easing expected an array of exactly four (4) numbers, given: ";
var n=v("ac-event-emitter").EventEmitter;function o(b,a){this.options=a||{};this._renderer=this.options.renderer||p;
this._duration=b;this._currentTime=0;this._easingFunction=this._createEasing(this.options.easing||o.DEFAULT_EASING)
}o.DEFAULT_EASING="linear";var s=o.prototype=new n();s._createEasing=function(a){var b;
if(typeof a==="string"){b=this._createPredefinedEasing(a)}else{if(Array.isArray(a)){b=this._createBezierEasing(a)
}else{if(typeof a==="function"){b=a}else{throw new TypeError(m+a)}}}return b};s._createBezierEasing=function(a){var c;
var b=a;var d=a.every(function(f){return(typeof f==="number")});if(a.length!==4||!d){throw new TypeError(u+a)
}c=new q(b[0],b[1],b[2],b[3]);return function(i,f,g,h){return c.get(i/h)*g}};s._createPredefinedEasing=function(b){var c=r[b];
var a="";if(!c){a+='Easing function "'+c;a+='" not recognized among the following: ';
a+=Object.keys(r).join(", ");throw new Error(a)}return c};s._getInterpolatedValue=function(a,b,c,d){return this._easingFunction(a,b,c,d)
};s.getDuration=function(){return this._duration};s.getCurrentTime=function(){return this._currentTime
};s.setCurrentTime=function(a){this._currentTime=a;this.update()};s.getPlaybackRate=function(){return this._playbackRate
};s.setPlaybackRate=function(a){this._playbackRate=a};s.update=function(){};w.exports=o
},{"../vendor/EasingFunctions":26,"../vendor/KeySpline":27,"ac-style-renderer":5}],17:[function(h,m,i){var j=h("./TimedClip");
function k(a){if(a&&a.length){this._clips=a.map(this._ensureTimedClip);this._duration=this._calcDuration()
}}var l=k.prototype;l._calcDuration=function(b){b=b||this._clips;var a=b.reduce(function(d,c){var f=c.getStartDelay()+c.getDuration();
return(f>d)?f:d},0);return a};l._ensureTimedClip=function(a){if(!(a instanceof j)){a=new j(a)
}return a};l._getLocalTime=function(b,a){return a-b.getStartDelay()};l._getEligibleClips=function(){return this._clips
};l.addClip=function(a){a=this._ensureTimedClip(a);this._clips.push(a);this._duration=this._calcDuration()
};l.on=function(){var a=arguments;this._clips.forEach(function(b){b.on.apply(b,a)
})};l.off=function(){var a=arguments;this._clips.forEach(function(b){b.off.apply(b,a)
})};l.trigger=function(){var a=arguments;this._clips.forEach(function(b){b.trigger.apply(b,a)
})};l.setEasingDirection=function(a){this._clips.forEach(function(b){b.setEasingDirection(a)
})};l.getDuration=function(){return this._duration};l.getCurrentTime=function(){return this._currentTime
};l.setCurrentTime=function(a,b){var c=this._getEligibleClips();if(!c||!c.length){return
}c.forEach(function(f){var d=this._getLocalTime(f,a);f.setCurrentTime(d,b)}.bind(this))
};l.getPlaybackRate=function(){return this._playbackRate};l.setPlaybackRate=function(a){if(isNaN(a)){return
}this._playbackRate=a};m.exports=k},{"./TimedClip":19}],18:[function(s,u,r){var m=s("../vendor/utils");
var o=s("../Tween");var l=s("./BaseClip");var n=s("ac-style-renderer").InlineStyleRenderer;
var t="Invalid element or selector: ";function p(a){a=m.defaults(p.DEFAULTS,a);
this.props=a.props||[];if(a.selector||typeof a.element==="string"){this.el=document.querySelector(a.selector||a.element)
}else{this.el=a.element}if(!this.el||!this.el.nodeType||this.el.nodeType!==1){throw new TypeError(t+a.element)
}if(!a.renderer){this.renderer=n}l.call(this,a.duration,a);this._initProps()}p.DEFAULTS={props:[],selector:null,element:".default_selector",renderer:n,duration:1};
p.create=function(a){return new p(a)};p.validate=function(a){var b="selector" in a||"element" in a;
return b};var q=p.prototype=new l();q._initProps=function(){this.props.forEach(function(a){a.tween=this._createTween({easing:a.easing||l.DEFAULT_EASING,from:a.from,to:a.to,duration:this.getDuration()})
}.bind(this))};q._createTween=function(a){return new o(a)};q.update=function(a){if(this.props.length<1){return
}var b=this.props.map(function(c){var f=c.tween;var g=c.units;var d=f.valueAtTime(a);
d=(g?(d+g):d);return{prop:c.property,value:d}});this._renderer.render(this.el,b);
this.trigger("tween_update",{el:this.el,context:b})};q.getCurrentTime=function(){return this._currentTime
};q.setCurrentTime=function(a){if(a<0||a>this.getDuration()){return}this._currentTime=a;
this.update(this._currentTime)};u.exports=p},{"../Tween":12,"../vendor/utils":28,"./BaseClip":16,"ac-style-renderer":5}],19:[function(m,l,i){var h=m("../vendor/utils");
function j(a,b){b=h.defaults(j.DEFAULTS,(b||{}));this._clip=a;this._startDelay=b.startDelay||0;
this._loop=b.loop||false;this._fill=b.fill||"none"}j.DEFAULTS={fill:"none",loop:false,startDelay:0};
j.FILL_MODES=["none","forwards","backwards","both"];var k=j.prototype;k._show=function(){if(this._isHidden){this._isHidden=false;
this._clip.show()}};k._applyFill=function(o){if(this.getFill()==="none"){return
}var a=this.getDuration();var c=o>a;var d=this.getFill();var f=c&&d==="forwards";
var g=!c&&d==="backwards";var b=d==="both"||f||g;if(b){this._clip.setCurrentTime((c)?a:0)
}};k._hide=function(){if(!this._isHidden){this._isHidden=true;this._clip.hide()
}};k.setEasingDirection=function(a){return this._clip.setEasingDirection(a)};k.on=function(){this._clip.on.apply(this._clip,arguments)
};k.off=function(){this._clip.off.apply(this._clip,arguments)};k.trigger=function(){this._clip.trigger.apply(this._clip,arguments)
};k.getCurrentTime=function(){return this._currentTime};k.setCurrentTime=function(a,b){if(a<0||a>this.getDuration()){this._clip.inEffect=false;
this._applyFill(a)}else{this._clip.inEffect=true;this._clip.setCurrentTime(a,b)
}};k.getDuration=function(){return this._clip.getDuration()};k.getStartDelay=function(){return this._startDelay
};k.setStartDelay=function(a){if(h.isNum(a)){this._startDelay=a}};k.getLoop=function(){return this._loop
};k.setLoop=function(a){this._loop=!!a};k.getFill=function(){return this._fill};
k.setFill=function(a){var b=j.FILL_MODES;if(b.indexOf(a.toLowerCase())!==-1){this._fill=a
}};l.exports=j},{"../vendor/utils":28}],20:[function(m,l,h){var j=m("./BaseClip");
function i(a,b,c){if(typeof a==="object"){c=a;a=c.duration;b=c.props}j.call(this,a,c);
this.props=b||[];this._initializePropEasing();this._lastComputedTime=0;this._easingDirection=1
}i.create=function(a){return new i(a.duration,a.props)};i.validate=function(a){return(Array.isArray(a.props)&&a.props.length>0)
};i.DEFAULT_EASING="linear";var k=i.prototype=new j();k._initializePropEasing=function(){this.props.forEach(function(a){a.easing=this._createEasing(a.easing||j.DEFAULT_EASING)
}.bind(this))};k.setEasingDirection=function(a){this._easingDirection=a};k.update=function(a){var c=(this._easingDirection===-1);
if(this.options.reverseEase!==true){c=false}var b=this.getDuration(),d={};if(this.props.length<1){return
}this.props.forEach(function(o){var f;var g=o.property;if(c){f=o.easing(this.getDuration()-a,o.to,-(o.to-o.from),b)
}else{f=o.easing(a,o.from,(o.to-o.from),b)}d[g]=f}.bind(this));this.trigger("tween_update",d)
};k.getCurrentTime=function(){return this._currentTime};k.setCurrentTime=function(a){if(a<0){a=0
}if(a>this.getDuration()){a=this.getDuration()}if(a<0||a>this.getDuration()){return
}this._currentTime=a;this.update(this._currentTime)};l.exports=i},{"./BaseClip":16}],21:[function(k,j,g){var h=k("../adapters/MediaAsClip");
function i(a,b){if(console){console.warn("VideoClip deprecated, please use adapters/MediaAsClip.")
}return new h(a,b)}j.exports=i},{"../adapters/MediaAsClip":13}],22:[function(q,p,k){if(typeof Object.defineProperties!=="function"){return
}var m=q("ac-event-emitter").EventEmitter;var l=q("../Clock");var j=q("../vendor/utils");
function n(){var a=[].slice.call(arguments);this._mediaElements=a.filter(this._validateMediaElements);
this._clock=new l()}var o=n.prototype=new m();o.addEventListener=o.on;o.removeEventListener=o.off;
o._validateMediaElements=function(a){return(typeof a.play==="function")&&(typeof a.pause==="function")
};o._updateCurrentTime=function(a){this._lastTime=this._clock.currentTime;this._mediaElements.forEach(function(b){b.currentTime=a
})};o._isValidTime=function(a){return(0<=a)&&(a<=this.duration)};o.play=function(){this.paused=false;
this._clock.play();j.invoke(this._mediaElements,"play");this.trigger("play")};o.pause=function(){this.paused=true;
this._clock.pause();j.invoke(this._mediaElements,"pause");this.trigger("pause")
};Object.defineProperties(n.prototype,{paused:{get:function(){return this._paused
},set:function(a){this._paused=!!a}},currentTime:{get:function(){return this._clock.getCurrentTime()
},set:function(a){if(this._isValidTime(a)){this.trigger("seeking",{time:a});this._updateCurrentTime(a);
this.trigger("seeked",{time:a})}}},playbackRate:{get:function(){return this._clock.getPlaybackRate()
},set:function(a){if(!j.isNum(a)){return}this._clock.setPlaybackRate(a);this._mediaElements.forEach(function(b){b.playbackRate=a
});this.trigger("ratechange",{rate:a})}},duration:{get:function(){return this._duration
},set:function(a){this._duration=a}}});p.exports=n},{"../Clock":9,"../vendor/utils":28}],23:[function(i,n,j){var k=i("ac-event-emitter").EventEmitter;
var o=i("../PlayerMonitor");function m(a,c,b){b=b||{};this._player=a;this._monitor=new o(this._player,b);
this._monitor.on("ready",this._initPauses.bind(this,c));this._previousPauseIndex=0;
this._player.addEventListener("play",this._exitPause.bind(this),false)}var l=m.prototype=new k();
l._initPauses=function(a){this._pauses=this._processPauses(a);this._attachPauses(this._pauses)
};l._processPauses=function(a){a=a.filter(function(b){return(0<b)&&(b<this._player.duration)
}.bind(this));a=a.sort(function(b,c){return b-c});if(a[0]!==0){a.unshift(0)}if(a[a.length-1]!==this._player.duration){a.push(this._player.duration)
}return a};l._attachPauses=function(a){a.forEach(function(b){this._monitor.addTime(b,this._enterPause.bind(this))
}.bind(this))};l._enterPause=function(a){var c=a.requested;var d=this._previousPauseIndex;
var b=this._pauses.indexOf(c);if(d===b){return}this._atPausePoint=true;this._player.pause();
this._player.currentTime=c;this.trigger("pauseenter",{from:d,to:b});this._previousPauseIndex=b
};l._exitPause=function(){var b=this._player.currentTime;var c=this._forwards();
var a=c&&b===this._player.duration;var d=!c&&b===0;if(this._atPausePoint&&!(a||d)){this._atPausePoint=false;
this.trigger("pauseexit",{from:this._previousPauseIndex,to:this._calcNextPauseIndex()})
}};l._forwards=function(){return this._player.playbackRate>0};l._calcNextPauseIndex=function(){var b=this._previousPauseIndex;
var a=this._forwards();return b+((a)?1:-1)};n.exports=m},{"../PlayerMonitor":10}],24:[function(p,o,j){var m=p("ac-event-emitter").EventEmitter;
var l=p("../Clock");var q=p("../adapters/PlayerAsMedia");function k(a,b){b=b||{};
if(!a){throw new TypeError("BasicPlayer: Invalid clip provided",a)}this._clip=a;
this._paused=true;this.setClock(b.clock||new l());window.setTimeout(this._triggerStart.bind(this),0)
}var n=k.prototype=new m();n.addEventListener=n.on;n.removeEventListener=n.off;
n.play=function(){this._paused=false;this._clock.play();this._update();this.trigger("play")
};n.pause=function(){this.setPaused(true);this._clock.pause();this.trigger("pause")
};n._triggerStart=function(){this.trigger("canplay");this.trigger("canplaythrough")
};n._updateCurrentTime=function(a){this._clock.setCurrentTime(a);this._lastTime=this._clip.setCurrentTime(a)
};n._update=function(){var a=this._clock.getCurrentTime();var g=this.getDuration();
var b=this._clock.getPlaybackRate();var c=b>0;var f=c&&a>=g;var d=!c&&a<=0;if(f||d){a=(f)?g:0;
this.pause();this._updateCurrentTime(a)}this.trigger("timeupdate",{previous:this._lastTime,time:a});
if(f){this.trigger("ended")}if(d){this.trigger("returned")}if(!this.isPaused()){this._updateCurrentTime(a);
window.requestAnimationFrame(this._update.bind(this))}};n._isValidTime=function(a){return(0<=a)&&(a<=this.getDuration())
};n.asMedia=function(){return new q(this)};n.isPaused=function(){return this._paused
};n.setPaused=function(a){this._paused=!!a};n.getCurrentTime=function(){return this._clock.getCurrentTime()
};n.setCurrentTime=function(a){if(this._isValidTime(a)){this.trigger("seeking",{time:a});
this._updateCurrentTime(a);this.trigger("seeked",{time:a})}};n.getPlaybackRate=function(){return this._clock.getPlaybackRate()
};n.setPlaybackRate=function(a){this._clock.setPlaybackRate(a);this.trigger("ratechange",{rate:a})
};n.getDuration=function(){return this._clip.getDuration()};n.setClock=function(a){this._clock=a
};n.getClock=function(){return this._clock};o.exports=k},{"../Clock":9,"../adapters/PlayerAsMedia":14}],25:[function(j,i,k){var g=j("./BasicPlayer");
function h(b,c){var a=new g(b,c);if(console){console.warn("MediaPlayer module deprecated, please use adapters/PlayerAsMedia or #toMedia method on instances of BasicPlayer")
}return a.asMedia()}i.exports=h},{"./BasicPlayer":24}],26:[function(ac,ap,M){var Q={linear:function V(c,a,d,b){return d*c/b+a
},easeInQuad:function ag(c,a,d,b){return d*(c/=b)*c+a},easeOutQuad:function ar(c,a,d,b){return -d*(c/=b)*(c-2)+a
},easeInOutQuad:function O(c,a,d,b){if((c/=b/2)<1){return d/2*c*c+a}return -d/2*((--c)*(c-2)-1)+a
},easeInCubic:function W(c,a,d,b){return d*(c/=b)*c*c+a},easeOutCubic:function al(c,a,d,b){return d*((c=c/b-1)*c*c+1)+a
},easeInOutCubic:function am(c,a,d,b){if((c/=b/2)<1){return d/2*c*c*c+a}return d/2*((c-=2)*c*c+2)+a
},easeInQuart:function ak(c,a,d,b){return d*(c/=b)*c*c*c+a},easeOutQuart:function N(c,a,d,b){return -d*((c=c/b-1)*c*c*c-1)+a
},easeInOutQuart:function S(c,a,d,b){if((c/=b/2)<1){return d/2*c*c*c*c+a}return -d/2*((c-=2)*c*c*c-2)+a
},easeInQuint:function ah(c,a,d,b){return d*(c/=b)*c*c*c*c+a},easeOutQuint:function at(c,a,d,b){return d*((c=c/b-1)*c*c*c*c+1)+a
},easeInOutQuint:function P(c,a,d,b){if((c/=b/2)<1){return d/2*c*c*c*c*c+a}return d/2*((c-=2)*c*c*c*c+2)+a
},easeInSine:function aa(c,a,d,b){return -d*Math.cos(c/b*(Math.PI/2))+d+a},easeOutSine:function ao(c,a,d,b){return d*Math.sin(c/b*(Math.PI/2))+a
},easeInOutSine:function ae(c,a,d,b){return -d/2*(Math.cos(Math.PI*c/b)-1)+a},easeInExpo:function aq(c,a,d,b){return(c===0)?a:d*Math.pow(2,10*(c/b-1))+a
},easeOutExpo:function Y(c,a,d,b){return(c===b)?a+d:d*(-Math.pow(2,-10*c/b)+1)+a
},easeInOutExpo:function ad(c,a,d,b){if(c===0){return a}if(c===b){return a+d}if((c/=b/2)<1){return d/2*Math.pow(2,10*(c-1))+a
}return d/2*(-Math.pow(2,-10*--c)+2)+a},easeInCirc:function X(c,a,d,b){return -d*(Math.sqrt(1-(c/=b)*c)-1)+a
},easeOutCirc:function an(c,a,d,b){return d*Math.sqrt(1-(c=c/b-1)*c)+a},easeInOutCirc:function ab(c,a,d,b){if((c/=b/2)<1){return -d/2*(Math.sqrt(1-c*c)-1)+a
}return d/2*(Math.sqrt(1-(c-=2)*c)+1)+a},easeInElastic:function K(f,c,h,d){var a=1.70158;
var g=0;var b=h;if(f===0){return c}if((f/=d)===1){return c+h}if(!g){g=d*0.3}if(b<Math.abs(h)){b=h;
a=g/4}else{a=g/(2*Math.PI)*Math.asin(h/b)}return -(b*Math.pow(2,10*(f-=1))*Math.sin((f*d-a)*(2*Math.PI)/g))+c
},easeOutElastic:function L(f,c,h,d){var a=1.70158;var g=0;var b=h;if(f===0){return c
}if((f/=d)===1){return c+h}if(!g){g=d*0.3}if(b<Math.abs(h)){b=h;a=g/4}else{a=g/(2*Math.PI)*Math.asin(h/b)
}return b*Math.pow(2,-10*f)*Math.sin((f*d-a)*(2*Math.PI)/g)+h+c},easeInOutElastic:function Z(f,c,h,d){var a=1.70158;
var g=0;var b=h;if(f===0){return c}if((f/=d/2)===2){return c+h}if(!g){g=d*(0.3*1.5)
}if(b<Math.abs(h)){b=h;a=g/4}else{a=g/(2*Math.PI)*Math.asin(h/b)}if(f<1){return -0.5*(b*Math.pow(2,10*(f-=1))*Math.sin((f*d-a)*(2*Math.PI)/g))+c
}return b*Math.pow(2,-10*(f-=1))*Math.sin((f*d-a)*(2*Math.PI)/g)*0.5+h+c},easeInBack:function R(d,b,f,c,a){if(a===undefined){a=1.70158
}return f*(d/=c)*d*((a+1)*d-a)+b},easeOutBack:function ai(d,b,f,c,a){if(a===undefined){a=1.70158
}return f*((d=d/c-1)*d*((a+1)*d+a)+1)+b},easeInOutBack:function U(d,b,f,c,a){if(a===undefined){a=1.70158
}if((d/=c/2)<1){return f/2*(d*d*(((a*=(1.525))+1)*d-a))+b}return f/2*((d-=2)*d*(((a*=(1.525))+1)*d+a)+2)+b
},easeInBounce:function T(c,a,d,b){return d-Q.easeOutBounce(b-c,0,d,b)+a},easeOutBounce:function aj(c,a,d,b){if((c/=b)<(1/2.75)){return d*(7.5625*c*c)+a
}else{if(c<(2/2.75)){return d*(7.5625*(c-=(1.5/2.75))*c+0.75)+a}else{if(c<(2.5/2.75)){return d*(7.5625*(c-=(2.25/2.75))*c+0.9375)+a
}else{return d*(7.5625*(c-=(2.625/2.75))*c+0.984375)+a}}}},easeInOutBounce:function af(c,a,d,b){if(c<b/2){return Q.easeInBounce(c*2,0,d,b)*0.5+a
}return Q.easeOutBounce(c*2-b,0,d,b)*0.5+d*0.5+a}};ap.exports=Q},{}],27:[function(f,i,g){
/*! MIT License
 *
 * KeySpline - use bezier curve for transition easing function
 * Copyright (c) 2012 Gaetan Renaudeau <renaudeau.gaetan@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
function h(a,d,b,q){this.get=function(j){if(a===d&&b===q){return j
}return t(p(j),d,q)};function r(k,j){return 1-3*j+3*k}function s(k,j){return 3*j-6*k
}function u(j){return 3*j}function t(j,l,k){return((r(l,k)*j+s(l,k))*j+u(l))*j}function c(j,l,k){return 3*r(l,k)*j*j+2*s(l,k)*j+u(l)
}function p(k){var m=k;for(var l=0;l<4;++l){var j=c(m,a,b);if(j===0){return m}var n=t(m,a,b)-k;
m-=n/j}return m}}i.exports=h},{}],28:[function(d,g,f){g.exports={isNum:function(a){return typeof a==="number"
},isArray:function(a){var b=Object.prototype.toString;return b.call(a)==="[object Array]"
},addClass:function(b,a){b.classList.add(a)},removeClass:function(b,a){b.classList.remove(a)
},hasClass:function(b,a){return b.contains(a)},defaults:function(b,c){var i={};
c=c||{};for(var a in b){if(b.hasOwnProperty(a)){i[a]=(c[a]!=null)?c[a]:b[a]}}return i
},defaultProps:function(b,c,k){var j=this.defaults(c,k);for(var a in j){if(j.hasOwnProperty(a)){b[a]=j[a]
}}},invoke:function(a,c){var b=[].slice.call(arguments,2);if(!Array.isArray(a)){throw new Error("List is not an array")
}a.forEach(function(k){var j=k[c];if(j&&typeof j==="function"){j.apply(k,b)}})}}
},{}],29:[function(k,i,g){var j={cssPropertyAvailable:k("./ac-feature/cssPropertyAvailable"),localStorageAvailable:k("./ac-feature/localStorageAvailable")};
var h=Object.prototype.hasOwnProperty;j.threeDTransformsAvailable=function(){if(typeof this._threeDTransformsAvailable!=="undefined"){return this._threeDTransformsAvailable
}var a,c;try{this._threeDTransformsAvailable=false;if(h.call(window,"styleMedia")){this._threeDTransformsAvailable=window.styleMedia.matchMedium("(-webkit-transform-3d)")
}else{if(h.call(window,"media")){this._threeDTransformsAvailable=window.media.matchMedium("(-webkit-transform-3d)")
}}if(!this._threeDTransformsAvailable){if(!(c=document.getElementById("supportsThreeDStyle"))){c=document.createElement("style");
c.id="supportsThreeDStyle";c.textContent="@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
document.querySelector("head").appendChild(c)}if(!(a=document.querySelector("#supportsThreeD"))){a=document.createElement("div");
a.id="supportsThreeD";document.body.appendChild(a)}this._threeDTransformsAvailable=(a.offsetHeight===3)||c.style.MozTransform!==undefined||c.style.WebkitTransform!==undefined
}return this._threeDTransformsAvailable}catch(b){return false}};j.canvasAvailable=function(){if(typeof this._canvasAvailable!=="undefined"){return this._canvasAvailable
}var a=document.createElement("canvas");this._canvasAvailable=!!(typeof a.getContext==="function"&&a.getContext("2d"));
return this._canvasAvailable};j.sessionStorageAvailable=function(){if(typeof this._sessionStorageAvailable!=="undefined"){return this._sessionStorageAvailable
}try{if(typeof window.sessionStorage!=="undefined"&&typeof window.sessionStorage.setItem==="function"){window.sessionStorage.setItem("ac_browser_detect","test");
this._sessionStorageAvailable=true;window.sessionStorage.removeItem("ac_browser_detect","test")
}else{this._sessionStorageAvailable=false}}catch(a){this._sessionStorageAvailable=false
}return this._sessionStorageAvailable};j.cookiesAvailable=function(){if(typeof this._cookiesAvailable!=="undefined"){return this._cookiesAvailable
}this._cookiesAvailable=(h.call(document,"cookie")&&!!navigator.cookieEnabled)?true:false;
return this._cookiesAvailable};j.__normalizedScreenWidth=function(){if(typeof window.orientation==="undefined"){return window.screen.width
}return window.screen.width<window.screen.height?window.screen.width:window.screen.height
};j.touchAvailable=function(){return !!(("ontouchstart" in window)||window.DocumentTouch&&document instanceof window.DocumentTouch)
};j.isDesktop=function(){if(!this.touchAvailable()&&!window.orientation){return true
}return false};j.isHandheld=function(){return !this.isDesktop()&&!this.isTablet()
};j.isTablet=function(){return !this.isDesktop()&&this.__normalizedScreenWidth()>480
};j.isRetina=function(){var b=["min-device-pixel-ratio:1.5","-webkit-min-device-pixel-ratio:1.5","min-resolution:1.5dppx","min-resolution:144dpi","min--moz-device-pixel-ratio:1.5"];
var a;if(window.devicePixelRatio!==undefined){if(window.devicePixelRatio>=1.5){return true
}}else{for(a=0;a<b.length;a+=1){if(window.matchMedia("("+b[a]+")").matches===true){return true
}}}return false};j.svgAvailable=function(){return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1")
};i.exports=j},{"./ac-feature/cssPropertyAvailable":30,"./ac-feature/localStorageAvailable":31}],30:[function(o,m,i){var l=null;
var k=null;var j=null;var n=null;m.exports=function(u){if(l===null){l=document.createElement("browserdetect").style
}if(k===null){k=["-webkit-","-moz-","-o-","-ms-","-khtml-",""]}if(j===null){j=["Webkit","Moz","O","ms","Khtml",""]
}if(n===null){n={}}u=u.replace(/([A-Z]+)([A-Z][a-z])/g,"$1\\-$2").replace(/([a-z\d])([A-Z])/g,"$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/,"").toLowerCase();
switch(u){case"gradient":if(n.gradient!==undefined){return n.gradient}u="background-image:";
var b="gradient(linear,left top,right bottom,from(#9f9),to(white));";var c="linear-gradient(left top,#9f9, white);";
l.cssText=(u+k.join(b+u)+k.join(c+u)).slice(0,-u.length);n.gradient=(l.backgroundImage.indexOf("gradient")!==-1);
return n.gradient;case"inset-box-shadow":if(n["inset-box-shadow"]!==undefined){return n["inset-box-shadow"]
}u="box-shadow:";var a="#fff 0 1px 1px inset;";l.cssText=k.join(u+a);n["inset-box-shadow"]=(l.cssText.indexOf("inset")!==-1);
return n["inset-box-shadow"];default:var d=u.split("-");var t=d.length;var f;var g;
var h;if(d.length>0){u=d[0];for(g=1;g<t;g+=1){u+=d[g].substr(0,1).toUpperCase()+d[g].substr(1)
}}f=u.substr(0,1).toUpperCase()+u.substr(1);if(n[u]!==undefined){return n[u]}for(h=j.length-1;
h>=0;h-=1){if(l[j[h]+u]!==undefined||l[j[h]+f]!==undefined){n[u]=true;return true
}}return false}}},{}],31:[function(j,i,g){var h=null;i.exports=function k(){if(h===null){h=!!(window.localStorage&&window.localStorage.non_existent!==null)
}return h}},{}],32:[function(P,U,A){var F=Object.prototype.toString;var M=Object.prototype.hasOwnProperty;
var V=typeof Array.prototype.indexOf==="function"?function(b,a){return b.indexOf(a)
}:function(b,c){for(var a=0;a<b.length;a++){if(b[a]===c){return a}}return -1};var N=Array.isArray||function(a){return F.call(a)=="[object Array]"
};var C=Object.keys||function(c){var b=[];for(var a in c){if(c.hasOwnProperty(a)){b.push(a)
}}return b};var D=typeof Array.prototype.forEach==="function"?function(b,a){return b.forEach(a)
}:function(b,c){for(var a=0;a<b.length;a++){c(b[a])}};var L=function(d,b,a){if(typeof d.reduce==="function"){return d.reduce(b,a)
}var c=a;for(var f=0;f<d.length;f++){c=b(c,d[f])}return c};var z=/^[0-9]+$/;function T(c,d){if(c[d].length==0){return c[d]={}
}var a={};for(var b in c[d]){if(M.call(c[d],b)){a[b]=c[d][b]}}c[d]=a;return a}function H(c,g,a,b){var f=c.shift();
if(M.call(Object.prototype,a)){return}if(!f){if(N(g[a])){g[a].push(b)}else{if("object"==typeof g[a]){g[a]=b
}else{if("undefined"==typeof g[a]){g[a]=b}else{g[a]=[g[a],b]}}}}else{var d=g[a]=g[a]||[];
if("]"==f){if(N(d)){if(""!=b){d.push(b)}}else{if("object"==typeof d){d[C(d).length]=b
}else{d=g[a]=[g[a],b]}}}else{if(~V(f,"]")){f=f.substr(0,f.length-1);if(!z.test(f)&&N(d)){d=T(g,a)
}H(c,d,f,b)}else{if(!z.test(f)&&N(d)){d=T(g,a)}H(c,d,f,b)}}}}function S(f,h,b){if(~V(h,"]")){var c=h.split("["),g=c.length,d=g-1;
H(c,f,"base",b)}else{if(!z.test(h)&&N(f.base)){var i={};for(var a in f.base){i[a]=f.base[a]
}f.base=i}K(f.base,h,b)}return f}function J(c){if("object"!=typeof c){return c}if(N(c)){var b=[];
for(var d in c){if(M.call(c,d)){b.push(c[d])}}return b}for(var a in c){c[a]=J(c[a])
}return c}function R(a){var b={base:{}};D(C(a),function(c){S(b,c,a[c])});return J(b.base)
}function Q(a){var b=L(String(a).split("&"),function(i,d){var c=V(d,"="),f=E(d),h=d.substr(0,f||c),g=d.substr(f||c,d.length),g=g.substr(V(g,"=")+1,g.length);
if(""==h){h=d,g=""}if(""==h){return i}return S(i,I(h),I(g))},{base:{}}).base;return J(b)
}A.parse=function(a){if(null==a||""==a){return{}}return"object"==typeof a?R(a):Q(a)
};var G=A.stringify=function(a,b){if(N(a)){return O(a,b)}else{if("[object Object]"==F.call(a)){return B(a,b)
}else{if("string"==typeof a){return W(a,b)}else{return b+"="+encodeURIComponent(String(a))
}}}};function W(a,b){if(!b){throw new TypeError("stringify expects an object")}return b+"="+encodeURIComponent(a)
}function O(c,b){var a=[];if(!b){throw new TypeError("stringify expects an object")
}for(var d=0;d<c.length;d++){a.push(G(c[d],b+"["+d+"]"))}return a.join("&")}function B(b,c){var a=[],d=C(b),g;
for(var h=0,f=d.length;h<f;++h){g=d[h];if(""==g){continue}if(null==b[g]){a.push(encodeURIComponent(g)+"=")
}else{a.push(G(b[g],c?c+"["+encodeURIComponent(g)+"]":encodeURIComponent(g)))}}return a.join("&")
}function K(d,a,c){var b=d[a];if(M.call(Object.prototype,a)){return}if(undefined===b){d[a]=c
}else{if(N(b)){b.push(c)}else{d[a]=[b,c]}}}function E(d){var c=d.length,f,b;for(var a=0;
a<c;++a){b=d[a];if("]"==b){f=false}if("["==b){f=true}if("="==b&&!f){return a}}}function I(a){try{return decodeURIComponent(a.replace(/\+/g," "))
}catch(b){return a}}},{}],33:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),create:d("./ac-object/create"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isDate:d("./ac-object/isDate"),isEmpty:d("./ac-object/isEmpty"),isRegExp:d("./ac-object/isRegExp"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":34,"./ac-object/create":35,"./ac-object/defaults":36,"./ac-object/extend":37,"./ac-object/getPrototypeOf":38,"./ac-object/isDate":39,"./ac-object/isEmpty":40,"./ac-object/isRegExp":41,"./ac-object/toQueryParameters":42}],34:[function(g,k,h){var i=g("./extend");
k.exports=function j(a){return i({},a)}},{"./extend":37}],35:[function(g,j,h){var i=function(){};
j.exports=function k(a){if(arguments.length>1){throw new Error("Second argument not supported")
}if(a===null||typeof a!=="object"){throw new TypeError("Object prototype may only be an Object.")
}if(typeof Object.create==="function"){return Object.create(a)}else{i.prototype=a;
return new i()}}},{}],36:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"){throw new TypeError("defaults: must provide a defaults object")
}b=b||{};if(typeof b!=="object"){throw new TypeError("defaults: options must be a typeof object")
}return i({},a,b)}},{"./extend":37}],37:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(){var a;var b;if(arguments.length<2){a=[{},arguments[0]]}else{a=[].slice.call(arguments)
}b=a.shift();a.forEach(function(c){if(c!=null){for(var d in c){if(h.call(c,d)){b[d]=c[d]
}}}});return b}},{}],38:[function(k,j,g){var h=Object.prototype.hasOwnProperty;
j.exports=function i(a){if(Object.getPrototypeOf){return Object.getPrototypeOf(a)
}else{if(typeof a!=="object"){throw new Error("Requested prototype of a value that is not an object.")
}else{if(typeof this.__proto__==="object"){return a.__proto__}else{var c=a.constructor;
var b;if(h.call(a,"constructor")){b=c;if(!(delete a.constructor)){return null}c=a.constructor;
a.constructor=b}return c?c.prototype:null}}}}},{}],39:[function(f,h,g){h.exports=function i(a){return Object.prototype.toString.call(a)==="[object Date]"
}},{}],40:[function(k,j,g){var h=Object.prototype.hasOwnProperty;j.exports=function i(b){var a;
if(typeof b!=="object"){throw new TypeError("ac-base.Object.isEmpty : Invalid parameter - expected object")
}for(a in b){if(h.call(b,a)){return false}}return true}},{}],41:[function(i,h,f){h.exports=function g(a){return window.RegExp?a instanceof RegExp:false
}},{}],42:[function(k,i,g){var h=k("qs");i.exports=function j(a){if(typeof a!=="object"){throw new TypeError("toQueryParameters error: argument is not an object")
}return h.stringify(a)}},{qs:32}],43:[function(d,g,f){d("ac-polyfills");g.exports.Asset=d("./ac-asset-loader/AssetLoader/Asset");
g.exports.Asset.Ajax=d("./ac-asset-loader/AssetLoader/Asset/Ajax");g.exports.Asset.Ajax.JSON=d("./ac-asset-loader/AssetLoader/Asset/Ajax/JSON");
g.exports.Asset.Img=d("./ac-asset-loader/AssetLoader/Asset/Img");g.exports.Asset.Video=d("./ac-asset-loader/AssetLoader/Asset/Video");
g.exports.Asset.Video.Element=d("./ac-asset-loader/AssetLoader/Asset/Video/Element");
g.exports.Asset.Binary=d("./ac-asset-loader/AssetLoader/Asset/Binary");g.exports.Asset.Binary.Chunk=d("./ac-asset-loader/AssetLoader/Asset/Binary/Chunk");
g.exports.AssetLoader=d("./ac-asset-loader/AssetLoader");g.exports.AssetLoader.Queue=d("./ac-asset-loader/AssetLoader/Queue")
},{"./ac-asset-loader/AssetLoader":44,"./ac-asset-loader/AssetLoader/Asset":45,"./ac-asset-loader/AssetLoader/Asset/Ajax":46,"./ac-asset-loader/AssetLoader/Asset/Ajax/JSON":47,"./ac-asset-loader/AssetLoader/Asset/Binary":48,"./ac-asset-loader/AssetLoader/Asset/Binary/Chunk":49,"./ac-asset-loader/AssetLoader/Asset/Img":50,"./ac-asset-loader/AssetLoader/Asset/Video":51,"./ac-asset-loader/AssetLoader/Asset/Video/Element":52,"./ac-asset-loader/AssetLoader/Queue":53}],44:[function(B,C,w){var u;
var x=B("ac-object");var p=B("ac-event-emitter").EventEmitter;var q=B("./AssetLoader/Asset/Ajax");
var y=B("./AssetLoader/Asset/Ajax/JSON");var v=B("./AssetLoader/Asset/Img");var r=B("./AssetLoader/Asset/Video");
var s=B("../utils/destroy");var A=B("./AssetLoader/Queue");var z={};function t(a,c){this.options=x.defaults(z,c||{});
var b=this._generateAssets(a);this._queue=new A(b,this.options);this._timeoutDuration=this.options.timeout;
this._timeout=null;this._proxyListeners()}u=t.prototype=new p();u.load=function(){if(this._timeoutDuration){this._timeout=window.setTimeout(this._onTimeout.bind(this),this._timeoutDuration)
}return this._queue.start()};u._clearTimeout=function(){window.clearTimeout(this._timeout);
this._timeout=null};u.pause=function(){this._clearTimeout();return this._queue.pause()
};u.destroy=function(){s(this,true)};u._onTimeout=function(){this._queue.abort();
this._queue.destroy();this.trigger("timeout")};u._generateAssets=function(a){if(this._boundGenerateAsset===undefined){this._boundGenerateAsset=this._generateAsset.bind(this)
}a=[].concat(a);var b=a.map(this._boundGenerateAsset);return b};u._generateAsset=function(a,b){if(t.isValidAsset(a)){a.index=b;
return a}if(typeof a!=="string"||a===""){return null}if(!!a.match(/\.json$/)){return new y(a,b)
}if(!!a.match(/\.(xml|txt)$/)){return new q(a,b)}return new v(a,b)};u._proxyListeners=function(){this._boundOnResolved=this._onResolved.bind(this);
this._boundOnRejected=this._onRejected.bind(this);this._boundOnProgress=this._onProgress.bind(this);
this._queue.on("resolved",this._boundOnResolved);this._queue.on("rejected",this._boundOnRejected);
this._queue.on("progress",this._boundOnProgress)};u._onResolved=function(a){this._clearTimeout();
this.trigger("loaded",a)};u._onRejected=function(a){this.trigger("error",a)};u._onProgress=function(a){this.trigger("progress",a)
};t.isValidAsset=function(a){return !!(a&&(typeof a.load==="function")&&(typeof a.destroy==="function"))
};t.isValidAssetLoader=function(a){return !!(a&&(typeof a.load==="function")&&(typeof a.pause==="function")&&(typeof a.destroy==="function"))
};C.exports=t},{"../utils/destroy":54,"./AssetLoader/Asset/Ajax":46,"./AssetLoader/Asset/Ajax/JSON":47,"./AssetLoader/Asset/Img":50,"./AssetLoader/Asset/Video":51,"./AssetLoader/Queue":53,"ac-object":33}],45:[function(p,n,j){var l;
var q=p("ac-deferred").Deferred;var m=p("ac-event-emitter").EventEmitter;var o=p("../../utils/destroy");
function k(a,b){this.src=a;this.index=b;this.data=null;this._boundOnLoad=this._onLoad.bind(this);
this._boundOnError=this._onError.bind(this)}l=k.prototype=new m();l.load=function(){this._load()
};l.destroy=function(){o(this)};l._load=function(){this.data={src:this.src};window.setTimeout(this._onLoad.bind(this),20)
};l._onLoad=function(){this.trigger("loaded",this)};l._onError=function(){this.trigger("error",this.data)
};n.exports=k},{"../../utils/destroy":54}],46:[function(p,n,j){var l;var q=p("ac-ajax");
var k=p("ac-object");var m=p("../Asset");function o(a,b){m.apply(this,arguments)
}l=o.prototype=k.create(m.prototype);l._load=function(){q.get({url:this.src}).then(this._boundOnLoad,this._boundOnError)
};l._onLoad=function(a){this.data=a.response;m.prototype._onLoad.call(this)};n.exports=o
},{"../Asset":45,"ac-ajax":2,"ac-object":33}],47:[function(o,n,i){var l;var j=o("ac-object");
var m=o("../Ajax");function k(a){m.apply(this,arguments)}l=k.prototype=j.create(m.prototype);
l._onLoad=function(a){try{m.prototype._onLoad.call(this,{response:JSON.parse(a.response)})
}catch(b){this._onError(b)}};n.exports=k},{"../Ajax":46,"ac-object":33}],48:[function(t,u,q){var l=t("ac-ajax");
var r=t("ac-object");var m=t("./Binary/Chunk");var n=t("./../Asset");var s={chunkSize:1024*1024};
function p(a,b){n.apply(this,arguments);this.options=r.defaults(s,b||{});this._totalSize=null;
this._rangeObjects={};this._contentType=null;this._request=null;this._numLoaded=0;
this._numRanges=0}var o=p.prototype=r.create(n.prototype);o.pause=function(){var a;
if(this._request!==null){this._request.xhr.abort()}for(a in this._rangeObjects){if(this._rangeObjects[a].isLoaded()===false){this._rangeObjects[a].pause()
}}};o._load=function(){if(this._boundQueueRangeRequests===undefined){this._boundQueueRangeRequests=this._queueRangeRequests.bind(this)
}if(this._totalSize===null){this._getMetaData().then(this._boundQueueRangeRequests)
}else{this._queueRangeRequests()}};o._getOrCreateRangeObject=function(d){var a=this._rangeObjects[d.toString()];
var b;var c;if(a===undefined){b=(this.options.chunkSize-1);c=d+b;if(c>this._totalSize){b=null
}a=this._rangeObjects[d.toString()]=new m(this.src,{start:d,length:b});this._numRanges+=1
}return a};o._onRangeLoad=function(){this._numLoaded+=1;if(this._numLoaded===this._numRanges){this._afterAllChunksLoaded()
}};o._queueRangeRequests=function(){var d;var f=[];var c;var b;var a;for(var g=0;
g<this._totalSize;g+=this.options.chunkSize){a=this._getOrCreateRangeObject(g);
a.on("loaded",this._onRangeLoad,this);a.load()}};o._afterAllChunksLoaded=function(){var b;
var c=[];for(var a in this._rangeObjects){c.push(this._rangeObjects[a].data)}b=new Blob(c,{type:this._contentType});
this.trigger("loaded",b)};o._afterHeadRequest=function(a){this._totalSize=parseInt(a.getResponseHeader(["Content-Length"]));
this._contentType=a.getResponseHeader(["Content-Type"]);this._request=null};o._getMetaData=function(){if(!this._boundAfterHeadRequest){this._boundAfterHeadRequest=this._afterHeadRequest.bind(this)
}this._request=l.create({method:"HEAD",url:this.src,timeout:2*1000});return this._request.send().then(this._boundAfterHeadRequest,this._boundOnError)
};u.exports=p},{"./../Asset":45,"./Binary/Chunk":49,"ac-ajax":2,"ac-object":33}],49:[function(r,s,o){var n;
var k=r("ac-ajax");var p=r("ac-object");var m=r("../../Asset");var q={start:0,length:null};
function l(a,b){m.apply(this,arguments);this.options=p.defaults(q,b||{});this._request=null;
this.data=null}n=l.prototype=p.create(m.prototype);n.pause=function(){if(this._request!==null){this._request.xhr.abort();
this._request=null}};n.isLoaded=function(){return(this.data!==null)};n._load=function(){this._request=k.create({url:this.src+"?"+this._buildQueryString(),method:"get",timeout:30*1000,headers:[{name:"Range",value:this._buildRangeString()}]});
this._request.xhr.responseType="arraybuffer";this._request.send().then(this._boundOnLoad)
};n._onLoad=function(a){this.data=a.response;this._request=null;m.prototype._onLoad.call(this,this.data)
};n._buildRangeString=function(){var a="bytes="+this.options.start+"-";if(this.options.length!==null){a+=(this.options.start+this.options.length)
}return a};n._buildQueryString=function(){var a=this.options.start.toString();if(this.options.length!==undefined){a+=(this.options.start+this.options.length)
}return a};s.exports=l},{"../../Asset":45,"ac-ajax":2,"ac-object":33}],50:[function(o,n,i){var l;
var j=o("ac-object");var m=o("../Asset");function k(a,b){m.apply(this,arguments)
}l=k.prototype=j.create(m.prototype);l._load=function(){var a=new Image();this.data=a;
this._boundOnLoad=this._onLoad.bind(this);a.onload=this._boundOnLoad;a.onerror=this._boundOnError;
a.src=this.src};n.exports=k},{"../Asset":45,"ac-object":33}],51:[function(v,w,r){var o;
var s=v("ac-feature");var t=v("ac-object");var q=v("./Binary");var n=v("../Asset");
var p=v("./Video/Element");var u={chunkSize:1024*1024,forceElementLoading:false};
function m(b,a){n.apply(this,arguments);this.options=t.defaults(u,a||{});this._binary=this.options.binary||this._createAssetType()
}o=m.prototype=t.create(n.prototype);o._canUseBlob=function(){return(window.Blob!==undefined&&window.URL!==undefined&&typeof window.URL.createObjectURL==="function"&&s.isDesktop()===true)
};o._createAssetType=function(){if(this._canUseBlob()&&this.options.forceElementLoading!==true){return new q(this.src,this.options)
}return new p(this.src,this.options)};o._load=function(){this._binary.on("loaded",this._boundOnLoad);
this._binary.on("error",this._boundOnError);this._binary.load()};o._onLoad=function(b){var a=b;
if(b instanceof window.Blob){a=this.options.element;if(!a){a=document.createElement("video")
}if(a.getAttribute("type")!==b.type){a.setAttribute("type",b.type)}a.src=window.URL.createObjectURL(b)
}n.prototype._onLoad.call(this,a)};o.pause=function(){this._binary.pause()};o.destroy=function(){this._binary.destroy();
n.prototype.destroy.call(this)};w.exports=m},{"../Asset":45,"./Binary":48,"./Video/Element":52,"ac-feature":29,"ac-object":33}],52:[function(t,u,p){var q=t("ac-feature");
var r=t("ac-object");var l=t("./../../../../utils/round");var m=t("./../../Asset");
var s={};function n(a,b){m.apply(this,arguments);this.options=r.defaults(s,b||{});
this._boundOnVideoProgress=null;this._boundOnTimeUpdate=null;this._boundOnCanPlayThrough=null
}var o=n.prototype=r.create(m.prototype);o._onVideoProgress=function(a){if(this.data&&this.data.buffered.length>0&&l(this.data.buffered.end(0),4)===l(this.data.duration,4)){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._boundOnVideoProgress=null;this.data.muted=false;this._onLoad()}};o._onTimeUpdate=function(a){this.data.pause();
this.data.currentTime=0;this.data.removeEventListener("timeupdate",this._boundOnTimeUpdate);
this._boundOnTimeUpdate=null};o._onCanPlayThrough=function(a){if(this._boundOnTimeUpdate===null){this._boundOnTimeUpdate=this._onTimeUpdate.bind(this)
}if(q.isDesktop()){this.data.addEventListener("timeupdate",this._boundOnTimeUpdate);
this.data.play()}this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._boundOnCanPlayThrough=null};o._load=function(){this.data=this.options.element;
if(!this.data){this.data=document.createElement("video")}this.data.muted=true;if(this.options.type){this.data.setAttribute("type",this.options.type)
}if(this._boundOnVideoProgress===null){this._boundOnVideoProgress=this._onVideoProgress.bind(this);
this._boundOnCanPlayThrough=this._onCanPlayThrough.bind(this);this.data.addEventListener("progress",this._boundOnVideoProgress);
this.data.addEventListener("canplaythrough",this._boundOnCanPlayThrough)}this.data.setAttribute("preload","auto");
this.data.src=this.src;this.data.load()};o._unbindEvent=function(b,a){if(typeof a==="function"){this.data.removeEventListener(b,a)
}};o.pause=function(){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._boundOnVideoProgress=null;this._boundOnCanPlayThrough=null;this._boundOnTimeUpdate=null;
this.data.removeAttribute("src");this.data=undefined;this.trigger("pause")};u.exports=n
},{"./../../../../utils/round":55,"./../../Asset":45,"ac-feature":29,"ac-object":33}],53:[function(t,u,p){var o;
var q=t("ac-object");var n=t("ac-deferred").Deferred;var l=t("ac-event-emitter").EventEmitter;
var m=t("../../utils/destroy");var r={threads:4};function s(a,b){this.options=q.defaults(r,b||{});
this._queue=a;this._active=[];this._allowedThreads=this.options.threads;this._availableThreads=this._allowedThreads;
this._deferred=new n();this._data=[];this.paused=true;this.loaded=false;this.promise=this._deferred.promise()
}o=s.prototype=new l();o.start=function(){var a=this._availableThreads;var b;this.paused=false;
if(a>this._queue.length){a=this._queue.length}for(b=1;b<=a;b++){this._startNewThread()
}return this.promise};o.pause=function(){this.paused=true;var a=[];this._active.forEach(function(c,b){if(typeof c.pause==="function"){this._queue.unshift(c);
this._releaseThread();c.off("loaded");c.off("error");c.pause();a.push(b)}},this);
a.forEach(function(b){this._active.splice(b,1)},this)};o.destroy=function(){this.pause();
m(this)};o._startNewThread=function(){var a=this._queue.shift();this._occupyThread();
if(a&&typeof a.load==="function"){var b=function(d){this._onProgress(d);this._active.splice(this._active.indexOf(a),1);
a.off("error",c)};var c=function(d){this._onError();a.off("loaded",b)};a.once("loaded",b,this);
a.once("error",c,this);a.load()}else{this._onError()}this._active.push(a)};o._onResolved=function(){if(this._errored){return false
}this._deferred.resolve(this._data);this.trigger("resolved",this._data)};o._onError=function(a){if(this._errored){return false
}this._errored=true;this._deferred.reject(a);this.trigger("rejected",a)};o.abort=function(){this._deferred.reject()
};o._onProgress=function(a){if(this._errored){return false}this._releaseThread();
this._data[a.index]=a.data;this.trigger("progress",a.data);if(this._queue.length<=0){if(this._availableThreads>=this._allowedThreads){this._onResolved()
}}else{if(!this.paused&&!this._errored){this._startNewThread()}}};o._occupyThread=function(){this._availableThreads--;
if(this._availableThreads<0){throw"AssetLoader.Queue: Available thread count cannot be negative."
}};o._releaseThread=function(){this._availableThreads++;if(this._availableThreads>this._allowedThreads){throw"AssetLoader.Queue: Available thread count cannot be more than allowed thread amount."
}};u.exports=s},{"../../utils/destroy":54,"ac-object":33}],54:[function(f,h,g){h.exports=function i(b,a){if(typeof b.off==="function"){b.off()
}window.setTimeout(function(){var c;for(c in b){if(b.hasOwnProperty(c)){if(a&&b[c]&&typeof b[c].destroy==="function"){b[c].destroy()
}b[c]=null}}})}},{}],55:[function(d,g,f){g.exports=function(b,a){return Math.round(b*Math.pow(10,a))/Math.pow(10,a)
}},{}],56:[function(m,l,h){var j=m("./ac-clock/Clock"),k=m("./ac-clock/ThrottledClock"),i=m("./ac-clock/sharedClockInstance");
i.Clock=j;i.ThrottledClock=k;l.exports=i},{"./ac-clock/Clock":57,"./ac-clock/ThrottledClock":58,"./ac-clock/sharedClockInstance":59}],57:[function(o,n,i){var l;
var m=o("ac-event-emitter").EventEmitter;var j=new Date().getTime();function k(){m.call(this);
this.lastFrameTime=null;this._animationFrame=null;this._active=false;this._startTime=null;
this._boundOnAnimationFrame=this._onAnimationFrame.bind(this)}l=k.prototype=new m(null);
l.start=function(){if(this._active){return}this._tick()};l.stop=function(){if(this._active){window.cancelAnimationFrame(this._animationFrame)
}this._animationFrame=null;this.lastFrameTime=null;this._active=false};l.destroy=function(){this.stop();
this.off();var a;for(a in this){if(this.hasOwnProperty(a)){this[a]=null}}};l.isRunning=function(){return this._active
};l._tick=function(){if(!this._active){this._active=true}this._animationFrame=window.requestAnimationFrame(this._boundOnAnimationFrame)
};l._onAnimationFrame=function(b){var a=0;if(this.lastFrameTime===null){this.lastFrameTime=new Date().getTime()-j
}else{a=b-this.lastFrameTime}var c=0,d;if(a!==0){c=1000/a}d={time:b,delta:a,fps:c,naturalFps:c};
this.trigger("update",d);this.trigger("draw",d);this._animationFrame=null;this.lastFrameTime=b;
if(this._active!==false){this._tick()}};n.exports=k},{}],58:[function(o,n,i){var l;
var j=o("./sharedClockInstance"),m=o("ac-event-emitter").EventEmitter;function k(a,b){if(a===null){return
}m.call(this);b=b||{};this._fps=a||null;this._clock=b.clock||j;this._lastThrottledTime=null;
this._clockEvent=null;this._clock.on("update",this._onClockUpdate,this)}l=k.prototype=new m(null);
l.setFps=function(a){this._fps=a;return this};l.getFps=function(){return this._fps
};l.start=function(){this._clock.start();return this};l.stop=function(){this._clock.stop();
return this};l.isRunning=function(){return this._clock.isRunning()};l.destroy=function(){this._clock.off("update",this._onClockUpdate,this);
this._clock.destroy.call(this)};l._onClockUpdate=function(b){if(this._lastThrottledTime===null){this._lastThrottledTime=this._clock.lastFrameTime
}var a=b.time-this._lastThrottledTime;if(!this._fps){throw new TypeError("FPS is not defined.")
}if(a<(1000/this._fps)){return}this._clockEvent=b;this._clockEvent.delta=a;this._clockEvent.fps=1000/a;
this._lastThrottledTime=this._clockEvent.time;this._clock.once("draw",this._onClockDraw,this);
this.trigger("update",this._clockEvent)};l._onClockDraw=function(){this.trigger("draw",this._clockEvent)
};n.exports=k},{"./sharedClockInstance":59}],59:[function(f,i,g){var h=f("./Clock");
i.exports=new h()},{"./Clock":57}],60:[function(d,g,f){g.exports.Curve=d("./ac-curves/Curve");
g.exports.Point=d("./ac-curves/Point");g.exports.Point.BezierPoint=d("./ac-curves/Point/BezierPoint")
},{"./ac-curves/Curve":61,"./ac-curves/Point":63,"./ac-curves/Point/BezierPoint":64}],61:[function(i,m,j){var k=i("./Point/BezierPoint");
var n=i("./Curve/Segment");var l;function o(a){this.__defineAccuracy();this.__definePoints();
this.__defineCoords();this.__defineSegments();this.points=a;this.interpolation=true
}l=o.prototype;l.map=function(a,c,d){var f=[];var b;a=a||this.startPoint.coords[0];
c=c||this.endPoint.coords[0];d=d||1;for(b=a;b<=c;b+=d){f.push(this.x(b)[0].coords[1])
}return f};l.addPoint=function(b,a){b=k.create(b);a=a||this.points.length;this.points.splice(a,0,b);
this.update();return b};l.replacePoint=function(b,a){b=(typeof b==="number")?b:this.points.indexOf(b);
if(b>=0&&this.points[b]){this.points[b]=k.create(a)}this.update()};l.split=function(d){var a;
var b;var c=null;d=this.point(d);if(d){this.__segments.some(function(g,f){if(g.coords.indexOf(d)>=0){a=g.t(d);
b=g.split(a);this.points[f]=b[0].startPoint;this.points[f+1]=b[1].endPoint;c=this.addPoint(b[0].endPoint,f+1);
this.update();return true}},this)}return c};l.update=function(){this.__segments=[]
};l.point=function(d,g){var f=false;var b=Infinity;var c;var a;this.__segments.forEach(function(h){c=h.point(d,g);
if(c){a=c.distance(d);if(a<=b){b=a;f=c}}},this);return f};l.x=function(a){return this.__coordsForAxisAtValue(0,a)
};l.y=function(a){return this.__coordsForAxisAtValue(1,a)};l.__coordsForAxisAtValue=function(a,g){var b;
var c;var f;var d=this.__coords.filter(function(q){var h;if(b){c=(b.coords[a]<q.coords[a])?b:q;
f=(c===b)?q:b;if(c.coords[a]<=g&&g<=f.coords[a]){if(this.interpolation&&c.coords[a]!==g){h=this.__interpolate(a,g,c,f)
}else{h=q}}}b=q;return h}.bind(this));return d};l.__interpolate=function(s,b,r,f){var g=Math.abs(s-1);
var a=(f.coords[s]-r.coords[s]);var h=(f.coords[g]-r.coords[g]);var c=(b-r.coords[s])/a;
var d=[];d[s]=b;d[g]=r.coords[g]+(h*c);return new k(d)};l.__definePoints=function(){var a;
Object.defineProperty(this,"points",{get:function(){return a},set:function(b){a=[];
if(b&&b.length){b.forEach(this.addPoint,this)}this.update()}});Object.defineProperty(this,"startPoint",{get:function(){return a[0]
},set:function(b){a[0]=k.create(b);this.update()}});Object.defineProperty(this,"endPoint",{get:function(){return a[a.length-1]
},set:function(b){a[a.length-1]=k.create(b);this.update()}})};l.__defineAccuracy=function(){var a=null;
Object.defineProperty(this,"accuracy",{get:function(){return a},set:function(b){a=b;
this.update()}})};l.__defineCoords=function(){var a=[];Object.defineProperty(this,"__coords",{get:function(){if(a.length){return a
}this.__segments.forEach(function(b){a=a.concat(b.coords)},this);a.push(this.endPoint);
return a},set:function(b){if(!b||b.length===0){a=[]}}})};l.__defineSegments=function(){var a=[];
Object.defineProperty(this,"__segments",{get:function(){if(a.length){return a}var b;
this.points.forEach(function(c){if(b){a.push(new n(b,c,this.accuracy))}b=c},this);
return a},set:function(b){if(!b||b.length===0){a=[];this.__coords=[]}}})};m.exports=o
},{"./Curve/Segment":62,"./Point/BezierPoint":64}],62:[function(j,o,k){var m=j("../Point");
var l=j("../Point/BezierPoint");var p=1/100;var n;function q(b,c,a){this.__defineAccuracy(a);
this.__defineCoords();Object.defineProperties(this,{startPoint:{value:l.create(b),enumerable:true,writable:true},endPoint:{value:l.create(c),enumerable:true,writable:true},p0:{enumerable:true,get:function(){return this.startPoint.coords
},set:function(d){var f=this.startPoint;if(f.cp1&&f.cp1===f.coords){f.cp1=d}if(f.cp2&&f.cp2===f.coords){f.cp2=d
}f.coords=d}},p1:{enumerable:true,get:function(){return(this.startPoint.cp2)?this.startPoint.cp2:this.startPoint.coords
},set:function(d){var f=this.startPoint;f.cp2=d}},p2:{enumerable:true,get:function(){return(this.endPoint.cp1)?this.endPoint.cp1:this.endPoint.coords
},set:function(d){var f=this.endPoint;f.cp1=d}},p3:{enumerable:true,get:function(){return this.endPoint.coords
},set:function(d){var f=this.endPoint;if(f.cp1&&f.cp1===f.coords){f.cp1=d}if(f.cp2&&f.cp2===f.coords){f.cp2=d
}f.coords=d}}})}n=Object.create({});q.prototype=n;n.split=function(a){return q.split(this,a)
};n.t=function(f){var i;var c=[];var a=[];var d;var g;var b=false;var h=this.coords.concat([this.endPoint]);
f=f.coords?f.coords:f;h.some(function(u,t){if(i){c[0]=Math.max(i.coords[0],u.coords[0]);
c[1]=Math.max(i.coords[1],u.coords[1]);a[0]=Math.min(i.coords[0],u.coords[0]);a[1]=Math.min(i.coords[1],u.coords[1]);
if(a[0]<=f[0]&&f[0]<=c[0]){if(a[1]<=f[1]&&f[1]<=c[1]){b=(t-1)*this.accuracy;d=Math.sqrt(Math.pow(c[0]-a[0],2)+Math.pow(c[1]-a[1],2));
g=Math.sqrt(Math.pow(f[0]-a[0],2)+Math.pow(f[1]-a[1],2));b+=(g/d)*this.accuracy;
return true}}}i=u},this);return b};n.x=function(a){return this.__axis(a,0)};n.y=function(a){return this.__axis(a,1)
};n.point=function(c,f){var d=false;var b=Infinity;var a;f=f||3;c=m.create(c);this.coords.forEach(function(g){a=g.distance(c);
if(a<b){if(a<=f){d=g}b=a}});return d};n.__axis=function(a,b){return Math.pow((1-a),3)*this.p0[b]+3*Math.pow((1-a),2)*a*this.p1[b]+3*(1-a)*Math.pow(a,2)*this.p2[b]+Math.pow(a,3)*this.p3[b]
};n.__defineAccuracy=function(a){a=a||p;Object.defineProperty(this,"accuracy",{get:function(){return a
},set:function(b){a=b;this.coords=[]}})};n.__defineCoords=function(){var a=[];Object.defineProperty(this,"coords",{get:function(){var b;
if(a.length){return a}for(b=0;b<=1;b+=this.accuracy){a.push(new l([this.x(b),this.y(b)]))
}return a},set:function(b){if(!b||b.length===0){a=[]}}})};q.split=function(b,y){y=y||0.5;
var t=[];var d=[];var c=[];var z=[];var i=[];var g=[];var h=l.create(b.startPoint);
var A=l.create(b.endPoint);var a;var f=h.lockHandles;var x=A.lockHandles;h.lockHandles=A.lockHandles=false;
t[0]=((1-y)*b.p0[0])+(y*b.p1[0]);t[1]=((1-y)*b.p0[1])+(y*b.p1[1]);d[0]=((1-y)*b.p1[0])+(y*b.p2[0]);
d[1]=((1-y)*b.p1[1])+(y*b.p2[1]);c[0]=((1-y)*b.p2[0])+(y*b.p3[0]);c[1]=((1-y)*b.p2[1])+(y*b.p3[1]);
z[0]=((1-y)*t[0])+(y*d[0]);z[1]=((1-y)*t[1])+(y*d[1]);i[0]=((1-y)*d[0])+(y*c[0]);
i[1]=((1-y)*d[1])+(y*c[1]);g[0]=((1-y)*z[0])+(y*i[0]);g[1]=((1-y)*z[1])+(y*i[1]);
a=new l(g,z,i);h.cp2=t;A.cp1=c;h.lockHandles=!!f;A.lockHandles=!!x;return[new q(h,a),new q(a,A)]
};o.exports=q},{"../Point":63,"../Point/BezierPoint":64}],63:[function(g,k,h){var i;
function j(a){Object.defineProperties(this,{coords:{value:a,writable:true,enumerable:true}})
}i=Object.create({});j.prototype=i;i.distance=function(a){return j.distanceBetweenPoints(this,a)
};j.create=function(d,b){var c;b=b||j;if(d===undefined){return new b([null,null])
}else{if(d&&d.coords&&Array.isArray(d.coords)&&d.coords.length===2){c=new b(d.coords);
c.lockHandles=false;for(var a in c){if(d.hasOwnProperty(a)&&a!=="coords"&&a!=="lockHandles"){c[a]=d[a]
}}c.lockHandles=d.lockHandles;return c}else{if(Array.isArray(d)){return new b(d)
}else{throw"Point.create: Input must be an Array of coords, a Point, or a sub-class of Point."
}}}};j.distanceBetweenPoints=function(a,b){a=j.create(a);b=j.create(b);var c=Math.abs(a.coords[0]-b.coords[0]);
var d=Math.abs(a.coords[1]-b.coords[1]);return Math.sqrt(Math.pow(c,2)+Math.pow(d,2))
};k.exports=j},{}],64:[function(h,m,i){var k=h("../Point");var l;function j(c,a,b){k.apply(this,arguments);
Object.defineProperties(this,{lockHandles:{writable:true,value:false},lockHandleLengths:{writable:true,value:true},cp1:{enumerable:true,get:function(){return a||(a=this.coords)
},set:function(d){a=d;if(this.lockHandles){b=this.__lockToHandle(a,this.lockHandleLengths)
}}},cp2:{enumerable:true,get:function(){return b||(b=this.coords)},set:function(d){b=d;
if(this.lockHandles){a=this.__lockToHandle(b,this.lockHandleLengths)}}}})}l=Object.create(k.prototype);
j.prototype=l;l.__lockToHandle=function(b,c){var d=this.coords;var f=b[0]-d[0];
var a=b[1]-d[1];return[d[0]-f,d[1]-a]};j.create=function(a){return k.create(a,j)
};m.exports=j},{"../Point":63}],65:[function(d,g,f){g.exports.DOMEmitter=d("./ac-dom-emitter/DOMEmitter")
},{"./ac-dom-emitter/DOMEmitter":66}],66:[function(h,m,i){var k;var l=h("ac-event-emitter").EventEmitter;
function j(a){if(a===null){return}this.el=a;this._bindings={};this._eventEmitter=new l()
}k=j.prototype;k._parseEventNames=function(a){if(!a){return[a]}return a.split(" ")
};k._onListenerEvent=function(a,b){this.trigger(a,b,false)};k._setListener=function(a){this._bindings[a]=this._onListenerEvent.bind(this,a);
this._addEventListener(a,this._bindings[a])};k._removeListener=function(a){this._removeEventListener(a,this._bindings[a]);
delete this._bindings[a]};k._addEventListener=function(b,a,c){if(this.el.addEventListener){this.el.addEventListener(b,a,c)
}else{if(this.el.attachEvent){this.el.attachEvent("on"+b,a)}else{target["on"+b]=a
}}return this};k._removeEventListener=function(b,a,c){if(this.el.removeEventListener){this.el.removeEventListener(b,a,c)
}else{this.el.detachEvent("on"+b,a)}return this};k.on=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(d,f,g){if(!this.has(g)){this._setListener(g)}this._eventEmitter.on(g,d,f)
}.bind(this,a,b));return this};k.off=function(d,a,b){var c=Array.prototype.slice.call(arguments,0);
d=this._parseEventNames(d);d.forEach(function(q,r,f,g){if(f.length===0){this._eventEmitter.off();
var s;for(s in this._bindings){if(this._bindings.hasOwnProperty(s)){this._removeListener(s)
}}return}this._eventEmitter.off(g,q,r);if(!this.has(g)){this._removeListener(g)
}}.bind(this,a,b,c));return this};k.once=function(c,a,b){c=this._parseEventNames(c);
c.forEach(function(d,f,g){if(!this.has(g)){this._setListener(g)}this._eventEmitter.once.call(this,g,d,f)
}.bind(this,a,b));return this};k.has=function(a){if(this._eventEmitter&&this._eventEmitter.has(a)){return true
}return false};k.trigger=function(c,b,a){c=this._parseEventNames(c);c.forEach(function(f,d,g){this._eventEmitter.trigger(g,f,d)
}.bind(this,b,a));return this};k.destroy=function(){this.off();this.el=this._eventEmitter=this._bindings=null
};m.exports=j},{}],67:[function(d,g,f){g.exports=d(32)},{}],68:[function(d,g,f){g.exports=d(33)
},{"./ac-object/clone":69,"./ac-object/create":70,"./ac-object/defaults":71,"./ac-object/extend":72,"./ac-object/getPrototypeOf":73,"./ac-object/isDate":74,"./ac-object/isEmpty":75,"./ac-object/isRegExp":76,"./ac-object/toQueryParameters":77}],69:[function(d,g,f){g.exports=d(34)
},{"./extend":72}],70:[function(d,g,f){g.exports=d(35)},{}],71:[function(d,g,f){g.exports=d(36)
},{"./extend":72}],72:[function(d,g,f){g.exports=d(37)},{}],73:[function(d,g,f){g.exports=d(38)
},{}],74:[function(d,g,f){g.exports=d(39)},{}],75:[function(d,g,f){g.exports=d(40)
},{}],76:[function(d,g,f){g.exports=d(41)},{}],77:[function(d,g,f){g.exports=d(42)
},{qs:67}],78:[function(f,h,g){var i=f("./ac-element-engagement/ElementEngagement");
h.exports=new i();h.exports.ElementEngagement=i},{"./ac-element-engagement/ElementEngagement":79}],79:[function(s,t,q){var p;
var r=s("ac-object");var o=s("ac-base").Element;var n=s("ac-element-tracker").ElementTracker;
var l={timeToEngage:500,inViewThreshold:0.75,stopOnEngaged:true};var m={thresholdEnterTime:0,thresholdExitTime:0,inThreshold:false,engaged:false,tracking:true};
var u=function(){n.call(this)};p=u.prototype=new n();p._decorateTrackedElement=function(a,b){var c;
c=r.defaults(l,b||{});r.extend(a,c);r.extend(a,m)};p._attachElementListeners=function(a){a.on("thresholdenter",this._thresholdEnter,this);
a.on("thresholdexit",this._thresholdExit,this);a.on("enterview",this._enterView,this);
a.on("exitview",this._exitView,this)};p._removeElementListeners=function(a){a.off("thresholdenter",this._thresholdEnter);
a.off("thresholdexit",this._thresholdExit);a.off("enterview",this._enterView);a.off("exitview",this._exitView)
};p._attachAllElementListeners=function(){this.elements.forEach(function(a){if(!a.stopOnEngaged){this._attachElementListeners(a)
}else{if(!a.engaged){this._attachElementListeners(a)}}},this)};p._removeAllElementListeners=function(){this.elements.forEach(function(a){this._removeElementListeners(a)
},this)};p._elementInViewPastThreshold=function(c){var b=this.windowDelegate.innerHeight;
var a=false;if(c.pixelsInView===b){a=true}else{a=(c.percentInView>c.inViewThreshold)
}return a};p._ifInView=function(b,c){var a=b.inThreshold;n.prototype._ifInView.apply(this,arguments);
if(!a&&this._elementInViewPastThreshold(b)){b.inThreshold=true;b.trigger("thresholdenter",b);
if(typeof b.timeToEngage==="number"&&b.timeToEngage>=0){b.engagedTimeout=window.setTimeout(this._engaged.bind(this,b),b.timeToEngage)
}}};p._ifAlreadyInView=function(b){var a=b.inThreshold;n.prototype._ifAlreadyInView.apply(this,arguments);
if(a&&!this._elementInViewPastThreshold(b)){b.inThreshold=false;b.trigger("thresholdexit",b);
if(b.engagedTimeout){window.clearTimeout(b.engagedTimeout);b.engagedTimeout=null
}}};p._engaged=function(a){a.engagedTimeout=null;this._elementEngaged(a);a.trigger("engaged",a);
this.trigger("engaged",a)};p._thresholdEnter=function(a){a.thresholdEnterTime=Date.now();
a.thresholdExitTime=0;this.trigger("thresholdenter",a)};p._thresholdExit=function(a){a.thresholdExitTime=Date.now();
this.trigger("thresholdexit",a)};p._enterView=function(a){this.trigger("enterview",a)
};p._exitView=function(a){this.trigger("exitview",a)};p._elementEngaged=function(a){a.engaged=true;
if(a.stopOnEngaged){this.stop(a)}};p.stop=function(a){if(this.tracking&&!a){this._removeAllElementListeners();
n.prototype.stop.call(this)}if(a&&a.tracking){a.tracking=false;this._removeElementListeners(a)
}};p.start=function(a){if(!a){this._attachAllElementListeners();n.prototype.start.call(this)
}if(a&&!a.tracking){if(!a.stopOnEngaged){a.tracking=true;this._attachElementListeners(a)
}else{if(!a.engaged){a.tracking=true;this._attachElementListeners(a)}}}};p.addElement=function(c,b){var a=n.prototype.addElement.call(this,c);
this._decorateTrackedElement(a,b);return a};p.addElements=function(a,b){[].forEach.call(a,function(c){this.addElement(c,b)
},this)};t.exports=u},{"ac-base":false,"ac-element-tracker":91,"ac-object":68}],80:[function(d,g,f){g.exports=d(32)
},{}],81:[function(d,g,f){g.exports=d(33)},{"./ac-object/clone":82,"./ac-object/create":83,"./ac-object/defaults":84,"./ac-object/extend":85,"./ac-object/getPrototypeOf":86,"./ac-object/isDate":87,"./ac-object/isEmpty":88,"./ac-object/isRegExp":89,"./ac-object/toQueryParameters":90}],82:[function(d,g,f){g.exports=d(34)
},{"./extend":85}],83:[function(d,g,f){g.exports=d(35)},{}],84:[function(d,g,f){g.exports=d(36)
},{"./extend":85}],85:[function(d,g,f){g.exports=d(37)},{}],86:[function(d,g,f){g.exports=d(38)
},{}],87:[function(d,g,f){g.exports=d(39)},{}],88:[function(d,g,f){g.exports=d(40)
},{}],89:[function(d,g,f){g.exports=d(41)},{}],90:[function(d,g,f){g.exports=d(42)
},{qs:80}],91:[function(f,i,g){var h=f("./ac-element-tracker/ElementTracker");i.exports=new h();
i.exports.ElementTracker=h},{"./ac-element-tracker/ElementTracker":92}],92:[function(y,z,v){var u;
var w=y("ac-object");var t=y("ac-base").Element;var r=y("ac-base").Array;var p=y("window-delegate").WindowDelegate;
var s=y("./TrackedElement");var o=y("ac-event-emitter").EventEmitter;var x={autoStart:false};
function A(a,b){this.options=w.clone(x);this.options=typeof b==="object"?w.extend(this.options,b):this.options;
this.windowDelegate=p;this.tracking=false;this.elements=[];if(a&&(Array.isArray(a)||this._isNodeList(a)||t.isElement(a))){this.addElements(a)
}if(this.options.autoStart){this.start()}}u=A.prototype=new o();var q=/^\[object (HTMLCollection|NodeList|Object)\]$/;
u._isNodeList=function(a){if(!a){return false}if(typeof a.length!=="number"){return false
}if(typeof a[0]==="object"&&(!a[0]||!a[0].nodeType)){return false}return q.test(Object.prototype.toString.call(a))
};u._registerElements=function(a){a=[].concat(a);a.forEach(function(b){if(this._elementInDOM(b)){var c=new s(b);
c.offsetTop=c.element.offsetTop;this.elements.push(c)}},this)};u._registerTrackedElements=function(b){var a=[].concat(b);
a.forEach(function(c){if(this._elementInDOM(c.element)){c.offsetTop=c.element.offsetTop;
this.elements.push(c)}},this)};u._elementInDOM=function(a){var b=false;var c=document.getElementsByTagName("body")[0];
if(t.isElement(a)&&c.contains(a)){b=true}return b};u._onVPChange=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};u._elementPercentInView=function(a){return a.pixelsInView/a.height};u._elementPixelsInView=function(d){var a=0;
var b=d.top;var c=d.bottom;var f=this.windowDelegate.innerHeight;if(b<=0&&c>=f){a=f
}else{if(b>=0&&b<f&&c>f){a=f-b}else{if(b<0&&(c<f&&c>=0)){a=d.bottom}else{if(b>=0&&c<=f){a=d.height
}}}}return a};u._ifInView=function(b,a){if(!a){b.trigger("enterview",b)}};u._ifAlreadyInView=function(a){if(!a.inView){a.trigger("exitview",a)
}};u.addElements=function(a){a=this._isNodeList(a)?r.toArray(a):[].concat(a);a.forEach(function(b){this.addElement(b)
},this)};u.addElement=function(a){var b;if(t.isElement(a)){b=new s(a);this._registerTrackedElements(b)
}return b};u.removeElement=function(a){var b=[];var c;this.elements.forEach(function(f,d){if(f===a||f.element===a){b.push(d)
}});c=this.elements.filter(function(d,f){return b.indexOf(f)<0?true:false});this.elements=c
};u.stop=function(){if(this.tracking===true){this.tracking=false;this.windowDelegate.off("scroll resize orientationchange",this._onVPChange)
}};u.start=function(){if(this.tracking===false){this.tracking=true;this.windowDelegate.on("scroll resize orientationchange",this._onVPChange,this);
this.refreshAllElementStates()}};u.refreshAllElementStates=function(){this.elements.forEach(function(a){this.refreshElementState(a)
},this)};u.refreshElementState=function(c){var b=t.getBoundingBox(c.element);var a=c.inView;
c=w.extend(c,b);c.pixelsInView=this._elementPixelsInView(c);c.percentInView=this._elementPercentInView(c);
c.inView=c.pixelsInView>0;if(c.inView){this._ifInView(c,a)}if(a){this._ifAlreadyInView(c)
}return c};z.exports=A},{"./TrackedElement":93,"ac-base":false,"ac-object":81,"window-delegate":263}],93:[function(h,m,i){var l;
var j=h("ac-dom-emitter").DOMEmitter;function k(a){if(a.nodeType&&a.nodeType>0){this.element=a
}else{throw new TypeError("TrackedElement: "+a+" is not a valid DOM element")}this.inView=false;
this.percentInView=0;this.pixelsInView=0;this.offsetTop=0;this.top=0;this.right=0;
this.bottom=0;this.left=0;this.width=0;this.height=0;j.call(this,a)}l=k.prototype=new j(null);
m.exports=k},{"ac-dom-emitter":65}],94:[function(n,m,i){var l=n("./ac-browser/BrowserData");
var j=/applewebkit/i;var k=n("./ac-browser/IE");var o=l.create();o.isWebKit=function(b){var a=b||window.navigator.userAgent;
return a?!!j.test(a):false};o.lowerCaseUserAgent=navigator.userAgent.toLowerCase();
if(o.name==="IE"){o.IE={documentMode:k.getDocumentMode()}}m.exports=o},{"./ac-browser/BrowserData":95,"./ac-browser/IE":96}],95:[function(g,k,h){var j=g("./data");
function i(){}i.prototype={__getBrowserVersion:function(d,c){if(!d||!c){return}var a=j.browser.filter(function(m){return m.identity===c
})[0];var f=a.versionSearch||c;var b=d.indexOf(f);if(b>-1){return parseFloat(d.substring(b+f.length+1))
}},__getName:function(a){return this.__getIdentityStringFromArray(a)},__getIdentity:function(a){if(a.string){return this.__matchSubString(a)
}else{if(a.prop){return a.identity}}},__getIdentityStringFromArray:function(d){for(var a=0,c=d.length,b;
a<c;a++){b=this.__getIdentity(d[a]);if(b){return b}}},__getOS:function(a){return this.__getIdentityStringFromArray(a)
},__getOSVersion:function(d,a){if(!d||!a){return}var b=j.os.filter(function(l){return l.identity===a
})[0];var m=b.versionSearch||a;var c=new RegExp(m+" ([\\d_\\.]+)","i");var f=d.match(c);
if(f!==null){return f[1].replace(/_/g,".")}},__matchSubString:function(b){var c=b.subString;
if(c){var a=c.test?!!c.test(b.string):b.string.indexOf(c)>-1;if(a){return b.identity
}}}};i.create=function(){var b=new i();var a={};a.name=b.__getName(j.browser);a.version=b.__getBrowserVersion(j.versionString,a.name);
a.os=b.__getOS(j.os);a.osVersion=b.__getOSVersion(j.versionString,a.os);return a
};k.exports=i},{"./data":97}],96:[function(d,g,f){g.exports={getDocumentMode:function(){var a;
if(document.documentMode){a=parseInt(document.documentMode,10)}else{a=5;if(document.compatMode){if(document.compatMode==="CSS1Compat"){a=7
}}}return a}}},{}],97:[function(d,g,f){g.exports={browser:[{string:window.navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:window.navigator.userAgent,subString:/silk/i,identity:"Silk"},{string:window.navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:window.navigator.userAgent,subString:/mobile\/[^\s]*\ssafari\//i,identity:"Safari Mobile",versionSearch:"Version"},{string:window.navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:window.navigator.vendor,subString:"iCab",identity:"iCab"},{string:window.navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:window.navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:window.navigator.vendor,subString:"Camino",identity:"Camino"},{string:window.navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:window.navigator.userAgent,subString:"MSIE",identity:"IE",versionSearch:"MSIE"},{string:window.navigator.userAgent,subString:"Trident",identity:"IE",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:window.navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],os:[{string:window.navigator.platform,subString:"Win",identity:"Windows",versionSearch:"Windows NT"},{string:window.navigator.platform,subString:"Mac",identity:"OS X"},{string:window.navigator.userAgent,subString:"iPhone",identity:"iOS",versionSearch:"iPhone OS"},{string:window.navigator.userAgent,subString:"iPad",identity:"iOS",versionSearch:"CPU OS"},{string:window.navigator.userAgent,subString:/android/i,identity:"Android"},{string:window.navigator.platform,subString:"Linux",identity:"Linux"}],versionString:window.navigator.userAgent||window.navigator.appVersion||undefined}
},{}],98:[function(d,g,f){g.exports=d(29)},{"./ac-feature/cssPropertyAvailable":99,"./ac-feature/localStorageAvailable":100}],99:[function(d,g,f){g.exports=d(30)
},{}],100:[function(d,g,f){g.exports=d(31)},{}],101:[function(f,i,g){var h=f("./ac-experience-reporter/ExperienceReporter");
i.exports=new h();i.exports.ExperienceReporter=h},{"./ac-experience-reporter/ExperienceReporter":103}],102:[function(g,j,h){var k=function(a,b){this._data=a;
this._environment=b;this.experienceObject=this._matchExperienceToEnvironment()||{};
this.experience=this.experienceObject.type||"static";return this};var i=k.prototype;
i._matchExperienceToEnvironment=function(){var b=false;var a=this._filterByEnvironment();
if(a.length>0){b=a.length===1?a[0]:this._filterBySpecificity(a)}return b};i._filterByEnvironment=function(){var a=this._data.filter(function(c){var d=false;
for(var b in c){if(b!=="type"&&c.hasOwnProperty(b)){if(b==="min_viewport_width"||b==="min_viewport_height"){d=this._environment[b]>=c[b]
}else{d=c[b]===this._environment[b]}if(!d){break}}}return d},this);return a};i._filterBySpecificity=function(a){var b=a;
var d=0;var c=[];b.forEach(function(f){var m=Object.keys(f).length;d=m>d?m:d});
b.forEach(function(f){var m=Object.keys(f).length;if(m===d){c.push(f)}});return c[0]
};j.exports=k},{}],103:[function(q,o,j){var p=q("./ExperienceObject");var k=q("ac-feature");
var l=q("ac-browser");function m(){this._environment=this._setEnvironment()}var n=m.prototype;
n.newExperience=function(a){return new p(a,this._environment)};n.getEnvironment=function(){return this._environment
};n._setEnvironment=function(){var a={platform:this._setPlatform(),os:l.os.toLowerCase(),os_version:parseInt(l.osVersion,10).toString(),browser:l.name.toLowerCase(),browser_version:parseInt(l.version,10).toString(),retina:k.isRetina(),min_viewport_width:document.documentElement.clientWidth,min_viewport_height:document.documentElement.clientHeight};
return a};n._setPlatform=function(){var a="desktop";if(k.isTablet()){a="tablet"
}else{if(k.isHandheld()){a="handheld"}}return a};o.exports=m},{"./ExperienceObject":102,"ac-browser":94,"ac-feature":98}],104:[function(f,h,g){var i=f("./ac-ajax/Ajax");
h.exports=new i();h.exports.Ajax=i},{"./ac-ajax/Ajax":105}],105:[function(k,i,h){var g=k("ac-deferred").Deferred;
var j=function(){};j.prototype={_Deferred:g,_defaults:{timeout:5000},_addReadyStateChangeHandler:function(a){a.xhr.onreadystatechange=function(b){if(a.xhr.readyState===4){clearTimeout(a.timeout);
if(a.xhr.status>=200&&a.xhr.status<300){a.deferred.resolve(a.xhr)}else{a.deferred.reject(a.xhr)
}}}},_addTimeout:function(b,a){if(a){b.timeout=setTimeout(function(){b.xhr.abort();
b.deferred.reject()},a)}},_extend:function(){for(var a=1;a<arguments.length;a++){for(var b in arguments[a]){if(arguments[a].hasOwnProperty(b)){arguments[0][b]=arguments[a][b]
}}}return arguments[0]},_getOptions:function(b,a){return this._extend({},this._defaults,a,b)
},_sendRequest:function(a){var b=this._validateConfiguration(a);if(b){throw b}var c={xhr:new XMLHttpRequest()};
c.deferred=new g();c.xhr.open(a.method,a.url);this._setRequestHeaders(c,a.headers);
this._addTimeout(c,a.timeout);this._addReadyStateChangeHandler(c);c.xhr.send(a.data);
return c.deferred.promise()},_setRequestHeaders:function(b,a){if(a){a.forEach(function(c){b.xhr.setRequestHeader(c.name,c.value)
})}},_validateConfiguration:function(a){if(!a){return"Must provide a configuration object"
}var b=[];var c=a.headers;if(!a.url){b.push("Must provide a url")}if(c){if(!Array.isArray(c)){return"Must provide an array of headers"
}this._validateHeaders(c,b)}return b.join(", ")},_validateHeaders:function(b,a){for(var c=0,d=b.length;
c<d;c++){if(!b[c].hasOwnProperty("name")||!b[c].hasOwnProperty("value")){a.push("Must provide a name and value key for all headers");
break}}},checkURL:function(a){a=this._getOptions({method:"head"},a);return this._sendRequest(a)
},get:function(a){a=this._getOptions({method:"get"},a);return this._sendRequest(a)
},post:function(a){a=this._getOptions({method:"post"},a);return this._sendRequest(a)
}};i.exports=j},{}],106:[function(d,g,f){g.exports=d(2)},{"./ac-ajax/Ajax":107,"./ac-ajax/Request":108}],107:[function(d,g,f){g.exports=d(3)
},{"./Request":108}],108:[function(d,g,f){g.exports=d(4)},{}],109:[function(d,g,f){g.exports=d(29)
},{"./ac-feature/cssPropertyAvailable":110,"./ac-feature/localStorageAvailable":111}],110:[function(d,g,f){g.exports=d(30)
},{}],111:[function(d,g,f){g.exports=d(31)},{}],112:[function(d,g,f){arguments[4][43][0].apply(f,arguments)
},{"./ac-asset-loader/AssetLoader":113,"./ac-asset-loader/AssetLoader/Asset":114,"./ac-asset-loader/AssetLoader/Asset/Ajax":115,"./ac-asset-loader/AssetLoader/Asset/Ajax/JSON":116,"./ac-asset-loader/AssetLoader/Asset/Binary":117,"./ac-asset-loader/AssetLoader/Asset/Binary/Chunk":118,"./ac-asset-loader/AssetLoader/Asset/Img":119,"./ac-asset-loader/AssetLoader/Asset/Video":120,"./ac-asset-loader/AssetLoader/Asset/Video/Element":121,"./ac-asset-loader/AssetLoader/Queue":122}],113:[function(d,g,f){arguments[4][44][0].apply(f,arguments)
},{"../utils/destroy":123,"./AssetLoader/Asset/Ajax":115,"./AssetLoader/Asset/Ajax/JSON":116,"./AssetLoader/Asset/Img":119,"./AssetLoader/Asset/Video":120,"./AssetLoader/Queue":122,"ac-object":157}],114:[function(d,g,f){g.exports=d(45)
},{"../../utils/destroy":123}],115:[function(d,g,f){g.exports=d(46)},{"../Asset":114,"ac-ajax":106,"ac-object":157}],116:[function(d,g,f){g.exports=d(47)
},{"../Ajax":115,"ac-object":157}],117:[function(d,g,f){g.exports=d(48)},{"./../Asset":114,"./Binary/Chunk":118,"ac-ajax":106,"ac-object":157}],118:[function(d,g,f){g.exports=d(49)
},{"../../Asset":114,"ac-ajax":106,"ac-object":157}],119:[function(d,g,f){g.exports=d(50)
},{"../Asset":114,"ac-object":157}],120:[function(d,g,f){arguments[4][51][0].apply(f,arguments)
},{"../Asset":114,"./Binary":117,"./Video/Element":121,"ac-feature":109,"ac-object":157}],121:[function(t,u,p){var q=t("ac-feature");
var r=t("ac-object");var l=t("./../../../../utils/round");var m=t("./../../Asset");
var s={};function n(a,b){m.apply(this,arguments);this.options=r.defaults(s,b||{});
this._boundOnVideoProgress=null;this._boundOnTimeUpdate=null;this._boundOnCanPlayThrough=null;
this._videoDuration=null}var o=n.prototype=r.create(m.prototype);o._onVideoProgress=function(a){if(this.data&&this.data.buffered.length>0&&this._videoDuration&&l(this.data.buffered.end(0),4)===l(this._videoDuration,4)){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this.data.muted=false;this._onLoad()}};o._onTimeUpdate=function(a){this.data.pause();
this.data.currentTime=0;this.data.removeEventListener("timeupdate",this._boundOnTimeUpdate);
this._boundOnTimeUpdate=null};o._onCanPlayThrough=function(a){if(this._boundOnTimeUpdate===null){this._boundOnTimeUpdate=this._onTimeUpdate.bind(this)
}if(q.isDesktop()){this.data.addEventListener("timeupdate",this._boundOnTimeUpdate);
this.data.play()}this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._boundOnCanPlayThrough=null};o._onMetaDataLoaded=function(a){this._videoDuration=this.data.duration;
this._onVideoProgress(a)};o._load=function(){this.data=this.options.element;if(!this.data){this.data=document.createElement("video")
}this.data.muted=true;if(this.options.type){this.data.setAttribute("type",this.options.type)
}if(this._boundOnVideoProgress===null){this._boundOnVideoProgress=this._onVideoProgress.bind(this);
this._boundOnCanPlayThrough=this._onCanPlayThrough.bind(this);this._boundMetaDataLoaded=this._onMetaDataLoaded.bind(this);
this.data.addEventListener("progress",this._boundOnVideoProgress);this.data.addEventListener("canplaythrough",this._boundOnCanPlayThrough);
this.data.addEventListener("loadedmetadata",this._boundMetaDataLoaded)}this.data.setAttribute("preload","auto");
this.data.src=this.src;this.data.load()};o._unbindEvent=function(b,a){if(typeof a==="function"){this.data.removeEventListener(b,a)
}};o.pause=function(){this._unbindEvent("canplaythrough",this._boundOnCanPlayThrough);
this._unbindEvent("timeupdate",this._boundOnTimeUpdate);this._unbindEvent("progress",this._boundOnVideoProgress);
this._unbindEvent("loadedmetadata",this._boundMetaDataLoaded);this._boundOnVideoProgress=null;
this._boundOnCanPlayThrough=null;this._boundOnTimeUpdate=null;this._boundMetaDataLoaded=null;
this.data.removeAttribute("src");this.data=undefined;this.trigger("pause")};u.exports=n
},{"./../../../../utils/round":124,"./../../Asset":114,"ac-feature":109,"ac-object":157}],122:[function(d,g,f){g.exports=d(53)
},{"../../utils/destroy":123,"ac-object":157}],123:[function(d,g,f){g.exports=d(54)
},{}],124:[function(d,g,f){g.exports=d(55)},{}],125:[function(d,g,f){g.exports.playerFactory=d("./ac-flow-x/flow/playerFactory");
g.exports.Flow=d("./ac-flow-x/flow/FlowController");g.exports.SyncPlayer=d("./ac-flow-x/flow/SyncPlayer");
g.exports.MaskedFlow=d("./ac-flow-x/flow/MaskedFlow")},{"./ac-flow-x/flow/FlowController":127,"./ac-flow-x/flow/MaskedFlow":129,"./ac-flow-x/flow/SyncPlayer":131,"./ac-flow-x/flow/playerFactory":154}],126:[function(B,C,A){var y,u=false,v=B("ac-deferred").Deferred,s=B("ac-deferred").all,p=B("ac-event-emitter").EventEmitter,t=B("./compositor/decorator/Keyframe"),w=B("./compositor/decorator/Superframe"),x=B("./compositor/decorator/SuperKeyframe"),q=B("./compositor/decorator/Cache"),r=B("./compositor/decorator/Benchmark");
function z(b,a){p.call(this);this._compositor=b;this.options=a||{};this.gotoFrame
}y=z.prototype=new p(null);y._gotoImageFrame=function(a){if(this._rendering){return(new v()).resolve()
}else{if(this._currentFrame===a){return(new v()).resolve()}}this._rendering=true;
if(u){console.groupCollapsed("gotoFrame:"+a+" currentFrame:"+this._currentFrame)
}return this._compositor.compositeFrames(this._currentFrame,a).then(function(){this._rendering=false;
this._currentFrame=a;if(u){console.groupEnd()}}.bind(this))};y._gotoBinaryFrame=function(a){if(this._currentFrame===a){return(new v()).resolve()
}return this._compositor.compositeFrames(this._currentFrame,a).then(function(b){if(b){this._compositor.applyBinaryFrame(b)
}this._currentFrame=a;this.trigger("composite")}.bind(this))};y.init=function(a){var b;
if(a.nodeName==="CANVAS"){b=a}else{b=document.createElement("canvas");a.appendChild(b)
}if(this.options.renderType==="binary"){this.gotoFrame=this._gotoBinaryFrame}else{if(this.options.renderType==="default"){this.gotoFrame=this._gotoImageFrame
}}return this._compositor.init(b).then(function(c){return s([this._compositor.createDiffRender(c).then(this._decorateCompositor.bind(this))])
}.bind(this))};y._decorateCompositor=function(){var c=this._compositor,a=this._compositor._diffRender.flowData,b=this._compositor.canvas;
if(this.options.renderType==="binary"){}else{if(a.superframeFrequency){c=new w(c,a.superframeFrequency)
}if(a.version===3){c=new t(c)}if(a.version===3&&a.superframeFrequency){c=new x(c)
}if(this.options.keyframeCache){c=new q(c,this.options.keyframeCache)}if(this.options.benchmark){c=new r(c)
}}if(c===this._compositor){return(new v()).resolve()}else{this._compositor=c;return this._compositor.init(b)
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(y,{_currentFrame:{value:0,enumerable:false,writable:true},frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true}});C.exports=z},{"./compositor/decorator/Benchmark":134,"./compositor/decorator/Cache":135,"./compositor/decorator/Keyframe":136,"./compositor/decorator/SuperKeyframe":137,"./compositor/decorator/Superframe":138}],127:[function(u,x,t){var r,s=u("./Flow"),v=u("./Player"),n=u("./LoadController"),p=u("./compositor/BinaryCompositor"),q=u("./compositor/Sequence");
var w={fileFormat:"jpg",baseName:"flow",imageUrlPattern:"###",startframeFileFormat:null,endframeFileFormat:null,basePath:null,manifestPath:null,manifestFileFormat:"json",diffPath:null,framePath:null};
var y={superframes:false,reversable:false,keyframeCache:8,benchmark:false,preload:true,multithread:false,preventDraw:false,renderType:"default"};
var o=function(b,a){b=b||{};a=a||{};this._flow=null;this._compositor=null;this._oader=null;
this.options=this._setDefaults(b,y);this._dataOptions=this._setDefaults(a,w);if(!this.options.element){this.options.element=document.createElement("canvas")
}this._flow=this._createFlow(this._compositor,this.options,this._dataOptions);v.call(this,this.options.element,this._flow);
if(this.options.preload){this.load()}};r=o.prototype=new v(null);r.destroy=function(){this.pause();
this.off();this._flow.off();this._flow=this._nullProperties(this._flow);this._nullProperties(this)
};r._nullProperties=function(a){var b;for(b in a){if(a.hasOwnProperty(b)){a[b]=null
}}return a};r._createFlow=function(d,c,a){var f=this._assembleAssetPaths(a);var b=[f.startframe,f.endframe];
this.loader=new n(this,f.manifest,b,f.imageUrlPattern);if(c.renderType==="binary"){this._compositor=new p(b,f.imageUrlPattern,this.loader,c.multithread,c.preventDraw)
}else{this._compositor=new q(b,f.imageUrlPattern,this.loader)}return new s(this._compositor,c)
};r._assembleAssetPaths=function(a){var b=a.basePath?this._forceTrailingSlash(a.basePath):null;
var f=a.framePath?this._forceTrailingSlash(a.framePath):null;var g=a.diffPath?this._forceTrailingSlash(a.diffPath):null;
var c=a.manifestPath?this._forceTrailingSlash(a.manifestPath):null;var h=a.baseName+"_";
var d={};d.startframe=(f||b)+h+"startframe."+(a.startframeFileFormat||a.fileFormat);
d.endframe=(f||b)+h+"endframe."+(a.endframeFileFormat||a.fileFormat);d.imageUrlPattern=(g||b)+h+a.imageUrlPattern+"."+a.fileFormat;
d.manifest=(c||b)+h+"manifest."+a.manifestFileFormat;return d};r._forceTrailingSlash=function(a){if(a.lastIndexOf("/")!==a.length-1){a=a+"/"
}return a};r._setDefaults=function(b,a){var c;for(c in a){if(a.hasOwnProperty(c)){if(typeof b[c]==="undefined"){b[c]=a[c]
}}}return b};x.exports=o},{"./Flow":126,"./LoadController":128,"./Player":130,"./compositor/BinaryCompositor":132,"./compositor/Sequence":133}],128:[function(v,w,u){var t,q=v("ac-asset-loader").AssetLoader,m=v("ac-event-emitter").EventEmitter,s=v("./data/provider/Async"),r=v("ac-deferred").Deferred,p=v("ac-deferred").all;
var n={start:"start",pause:"pause",error:"error",complete:"loaded",destroy:"destroy"};
var o=function(c,a,d,b){this._flow=c;this._manifestUrl=a;this._keyframeUrls=d;this._imageUrlPattern=b;
this.state={manifestLoaded:false,keyframesLoaded:false,diffsLoaded:false,diffCountLoaded:0,totalDiffs:null};
this.assets={keyframes:null,manifest:null,diffs:null};this._promises={};this._loaders={};
this._activeLoaders=[];this._resumeQueue=[];this._paused=true;this._shouldPause=false;
this._boundOnManifestLoaded=this._onManifestLoaded.bind(this);this._boundOnKeyframesLoaded=this._onKeyframesLoaded.bind(this);
this._boundOnDiffsLoaded=this._onDiffsLoaded.bind(this);this._boundOnManifestAndKeyframesLoaded=this._onManifestAndKeyframesLoaded.bind(this);
this._boundOnComplete=this._onComplete.bind(this)};t=o.prototype=new m(null);t.setManifestUrl=function(a){this._manifestUrl=a;
return this};t.setKeyframeUrls=function(a){this._keyframeUrls=a;return this};t.setImageUrlPattern=function(a){this._imageUrlPattern=a;
return this};t.load=function(){if(this._paused&&(this._activeLoaders.length>0||this._resumeQueue.length>0)){this._resume();
return}this._flow.load().then(this._boundOnComplete);return};t.pause=function(){this._shouldPause=true;
var b,a=this._activeLoaders.length;for(b=0;b<a;b++){this._activeLoaders[b].pause()
}this._paused=true};t.destroy=function(){var c,a,b;this.trigger(n.destroy);this.off();
for(c in this._loaders){if(this._loaders.hasOwnProperty(c)){}}for(a in this._promises){if(this._promises.hasOwnProperty(a)){this._promises[a].reject()
}}for(b in this){if(this.hasOwnProperty(b)){this[b]=null}}};t._resume=function(){this._shouldPause=false;
var b,a=this._activeLoaders.length;for(b=0;b<a;b++){this._activeLoaders[b].load()
}var c,d=this._resumeQueue.length;for(c=0;c<d;c++){this._resumeQueue[c].call(this)
}this._resumeQueue=[];this._paused=false};t.loadManifest=function(){this._promises.manifest=this._promises.manifest||new r();
var a=this._promises.manifest.promise();if(this._shouldPause){this._resumeQueue.push(this.loadManifest);
return a}if(this.assets.manifest){return this._promises.manifest.resolve(this.assets.manifest)
}this._paused=false;this._loaders.manifest=new s({url:this._getManifestAssetsData()});
this._activeLoaders.push(this._loaders.manifest);this._loaders.manifest.load().then(this._boundOnManifestLoaded);
return a};t.loadKeyframes=function(){this._promises.keyframes=this._promises.keyframes||new r();
var a=this._promises.keyframes.promise();if(this._shouldPause){this._resumeQueue.push(this.loadKeyframes);
return a}if(this.assets.keyframes){return this._promises.keyframes.resolve(this.assets.keyframes)
}this._paused=false;this._loaders.keyframes=new q(this._getKeyframesAssetsData());
this._activeLoaders.push(this._loaders.keyframes);this._loaders.keyframes.load().then(this._boundOnKeyframesLoaded);
return a};t.loadDiffs=function(){this._promises.diffs=this._promises.diffs||new r();
var a=this._promises.diffs.promise();if(this._shouldPause){this._resumeQueue.push(this.loadDiffs);
return a}if(this.assets.diffs){return this._promises.diffs.resolve(this.assets.diffs)
}this._paused=false;this._activeLoader=this._loaders.diffs=new q(this._getDiffsAssetsData());
this._activeLoaders.push(this._loaders.diffs);this._loaders.diffs.load().then(this._boundOnDiffsLoaded);
return a};t._getManifestAssetsData=function(){return this._manifestUrl};t._getKeyframesAssetsData=function(){return this._keyframeUrls
};t._getDiffsAssetsData=function(){var d=this.assets.manifest.imagesRequired,a=[],c,f,b=this._imageUrlPattern.match(/#/g).length;
for(c=1;c<=d;c++){f="0000"+c;f=f.substring(f.length-b);a.push(this._imageUrlPattern.replace(/#{2,}/g,f))
}return a};t._onManifestLoaded=function(a){this.assets.manifest=a;this.state.manifestLoaded=true;
this._paused=true;this._removeFromActiveLoaders(this._loaders.manifest);this._promises.manifest.resolve(this.assets.manifest)
};t._onKeyframesLoaded=function(a){this.assets.keyframes=a;this.state.keyframeLoaded=true;
this._paused=true;this._removeFromActiveLoaders(this._loaders.keyframes);this._promises.keyframes.resolve(this.assets.keyframes)
};t._onDiffsLoaded=function(a){this.assets.diffs=a;this.state.diffsLoaded=true;
this._paused=true;this._removeFromActiveLoaders(this._loaders.diffs);this._promises.diffs.resolve(this.assets.diffs)
};t._onManifestAndKeyframesLoaded=function(){if(!this.state.diffsLoaded){this.loadDiffs()
}return this._promises.diffs};t._removeFromActiveLoaders=function(b){var c,a=this._activeLoaders.length;
for(c=0;c<a;c++){if(this._activeLoaders[c]===b){this._activeLoaders.splice(c,1);
return}}};t._onComplete=function(){this.trigger(n.complete)};w.exports=o},{"./data/provider/Async":146,"ac-asset-loader":112}],129:[function(t,u,q){var o,p=t("./FlowController"),r=t("./SyncPlayer"),n=t("ac-deferred").Deferred,l=t("ac-deferred").all;
var s={preventDraw:true,renderType:"binary"};function m(d,c,a,f,b,g){a=this._setDefaultOptions(a);
f=this._setDefaultOptions(f);this.flow=new p(d,a,b);this.mask=new p(c,f,g);r.apply(this,[this.flow,this.mask]);
this._flowDefer=null;this._maskDefer=null;this._boundOnSyncRender=this._onSyncRender.bind(this);
this._boundOnFlowTimeUpdate=this._onFlowTimeUpdate.bind(this);this._boundOnMaskTimeUpdate=this._onMaskTimeUpdate.bind(this);
this.flow._flow.on("composite",this._boundOnFlowTimeUpdate);this.mask._flow.on("composite",this._boundOnMaskTimeUpdate);
this._bindSyncRender()}o=m.prototype=new r(null);o._setDefaultOptions=function(b){b=b||{};
var a;for(a in s){if(s.hasOwnProperty(a)){if(typeof b[a]==="undefined"){b[a]=s[a]
}}}return b};o._bindSyncRender=function(){this._flowDefer=new n();this._maskDefer=new n();
l([this._flowDefer,this._maskDefer]).then(this._boundOnSyncRender)};o._onFlowTimeUpdate=function(){if(this._flowDefer){this._flowDefer.resolve()
}};o._onMaskTimeUpdate=function(){if(this._maskDefer){this._maskDefer.resolve()
}};o._onSyncRender=function(){this._flowDefer=this._maskDefer=null;this._applyMask();
this._bindSyncRender()};o._applyMask=function(){if(!this.flow._compositor.imageData){return
}var d=this.flow._compositor.imageData.data,c=this.mask._compositor.imageData.data,a,b=d.length;
for(a=0;a<b;a+=4){d[a+3]=c[a]}this.flow._compositor.applyBinaryFrame({buf8:d},true)
};u.exports=m},{"./FlowController":127,"./SyncPlayer":131}],130:[function(p,o,j){var m,k=false,q=p("ac-deferred").Deferred,l=p("ac-dom-emitter").DOMEmitter;
function n(a,b){this._flow=b;this._domEmitter=new l(a);this._frameRate=30;this.element=a;
this.paused=true;this.loop=false;this._boundAdvanceTimeToGlobal=this._advanceToTimeGlobal.bind(this);
this._onBoundGlobalTimeUpdate=this._onGlobalTimeUpdate.bind(this);this._onBoundLocalTimeUpdate=this._onLocalTimeUpdate.bind(this)
}m=n.prototype;m._timeToFrame=function(b){var a;a=Math.round(b/this.duration*this._flow.frameCount);
a=a%(this._flow.frameCount+1);return(a<0)?this._flow.frameCount+a:a};m._advanceToTimeGlobal=function(b){this._prevTime=this._prevTime||b;
this._currentTime+=((b-this._prevTime)/1000)*this.playbackRate;this._prevTime=b;
this._pauseAfterRender=false;var a=this._timeToFrame(this._currentTime);if(!this.loop){if(this.playbackRate>0&&this._currentTime>this.duration){a=this._flow.frameCount;
this._currentTime=this.duration;this._pauseAfterRender=true}else{if(this.playbackRate<0&&this._currentTime<0){a=0;
this._currentTime=0;this._pauseAfterRender=true}}}else{this._currentTime=(this.duration+this._currentTime)%this.duration
}if(!this.paused&&!this.seeking){return this._flow.gotoFrame(a).then(this._onBoundGlobalTimeUpdate)
}else{return(new q()).reject()}};m._onGlobalTimeUpdate=function(){this.trigger("timeupdate");
if(this._pauseAfterRender){this.paused=true;this.trigger("ended")}else{this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}};m._onLocalTimeUpdate=function(){this.seeking=false;this.trigger("timeupdate");
this.trigger("seeked");this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
};m._advanceToTimeLocal=function(a){if(!this.seeking){this.seeking=true;this.trigger("seeking");
this._currentTime=1*a;this._prevTime=null;window.cancelAnimationFrame(this._requestAnimationFrame);
this._flow.gotoFrame(this._timeToFrame(a)).then(this._onBoundLocalTimeUpdate)}if(k){console.log("advance to time "+a+" from "+this._currentTime)
}};m.load=function(){this.trigger("loadstart");return this._flow.init(this.element).then(this.trigger.bind(this,"canplaythrough"))
};m.play=function(){if(this.paused){this.paused=false;this.trigger("play");this._prevTime=null;
this._requestAnimationFrame=window.requestAnimationFrame(this._boundAdvanceTimeToGlobal)
}return this};m.pause=function(){if(!this.paused){this.paused=true;window.cancelAnimationFrame(this._requestAnimationFrame);
this.trigger("pause")}return this};m.on=function(){this._domEmitter.on.apply(this._domEmitter,arguments)
};m.once=function(){this._domEmitter.once.apply(this._domEmitter,arguments)};m.trigger=function(){this._domEmitter.trigger.apply(this._domEmitter,arguments)
};m.off=function(){this._domEmitter.off.apply(this._domEmitter,arguments)};m.setRenderOperation=function(a){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.renderOperation=a
}return this};m.setBeforeRenderOperation=function(a){if(this._flow&&this._flow._compositor&&this._flow._compositor._diffRender){this._flow._compositor._diffRender.beforeRenderOperation=a
}};m.setBeforeDrawOperation=function(a){if(this._flow&&this._flow._compositor){this._flow._compositor.beforeDrawOperation=a
}};m.setAfterDrawOperation=function(a){if(this._flow&&this._flow._compositor){this._flow._compositor.afterDrawOperation=a
}};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(m,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:m._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(a){if(isFinite(a)){this._frameRate=a;this.trigger("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(a){if(isFinite(a)){this._playbackRate=1*a;
this.trigger("ratechange")}},enumerable:true},duration:{get:function(){return this._flow.frameCount/this.frameRate
},enumerable:true}});o.exports=n},{"ac-dom-emitter":65}],131:[function(n,m,i){var k,o=n("ac-deferred").Deferred,j=n("ac-deferred").all;
function l(){this.flows=Array.prototype.slice.call(arguments,0)}k=l.prototype;k.on=function(){return this._each("on",arguments)
};k.off=function(){return this._each("off",arguments)};k.load=function(){var f=new o(),a=[],b,d=this.flows.length,c;
for(b=0;b<d;b++){c=this.flows[b];a.push(c.load())}j(a).then(f.resolve.bind(f));
return f.promise()};k.play=function(){return this._each("play",arguments)};k.pause=function(){return this._each("pause",arguments)
};k.destroy=function(){this._each("destroy",arguments);var a;for(a in this){if(this.hasOwnProperty(a)){if(this[a] instanceof o){this[a].reject()
}this[a]=null}}};k.setRenderOperation=function(){return this._each("setRenderOperation",arguments)
};k.setBeforeRenderOperation=function(){return this._each("setBeforeRenderOperation",arguments)
};k.setBeforeDrawOperation=function(){return this._each("setBeforeDrawOperation",arguments)
};k.setAfterDrawOperation=function(){return this._each("setAfterDrawOperation",arguments)
};k._dispatchEvent=function(a){return this._each("_dispatchEvent",arguments)};k._advanceToTimeGlobal=function(){return this._each("_advanceToTimeGlobal",arguments)
};k._advanceToTimeLocal=function(){return this._each("_advanceToTimeLocal",arguments)
};k._each=function(f,b){b=Array.prototype.slice.call(b,0);var a,d=this.flows.length,c;
for(a=0;a<d;a++){c=this.flows[a];c[f].apply(c,b)}return this};Object.defineProperties(k,{_currentTime:{value:0,enumerable:false,writable:true},_playbackRate:{value:1,enumerable:false,writable:true},_loop:{value:false,enumerable:false,writable:true},currentTime:{get:function(){return this._currentTime*1
},set:k._advanceToTimeLocal,enumerable:true},frameRate:{get:function(){return this._frameRate
},set:function(a){if(isFinite(a)){this._frameRate=a;this._dispatchEvent("durationchange")
}},enumerable:true},playbackRate:{get:function(){return this._playbackRate*1},set:function(a){if(isFinite(a)){this._playbackRate=1*a;
this.flows.forEach(function(b,c){c.playbackRate=b}.bind(this,this._playbackRate))
}},enumerable:true},duration:{get:function(){return this._flow[0].frameCount/this.frameRate
},enumerable:true},loop:{get:function(){return this._loop},set:function(a){if(typeof a==="boolean"){this._loop=a;
this.flows.forEach(function(c,b){b.loop=c}.bind(this,this._loop))}},enumerable:true}});
m.exports=l},{}],132:[function(q,r,p){var o,k=false,s=q("../diff/BinaryRender"),n=q("../diff/BinaryMultithreadRender"),l=q("ac-deferred").Deferred;
var m=function(d,a,f,b,c){this._keyframes=d;this._imageUrlPattern=a;this._loadController=f;
this._useMultithreading=b;this._preventDraw=c};o=m.prototype;o._getURLObject=function(){return window.URL||window.webkitURL||null
};o._supportsMultithread=function(){if(this._getURLObject()&&window.Worker&&window.Blob){return true
}return false};o._initDiffRender=function(a){this._images=a;this.canvas.height=a[0].height;
this.canvas.width=a[0].width;this.applyFrame(a[0])};o.init=function(a){this.canvas=a||document.createElement("canvas");
this.context=a.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};o.createDiffRender=function(a){if(this._useMultithreading&&this._supportsMultithread()){this._diffRender=new n(a,this._imageUrlPattern)
}else{this._diffRender=new s(a,this._imageUrlPattern,this._loadController)}return this._diffRender.init()
};o.applyFrame=function(a){var b=this.context,c;b.drawImage(a,0,0);if(this._diffRender){this._diffRender.forceBinaryComposite();
c=this._diffRender.forceKeyframeRender(this.canvas,this.context);if(!this.imageData){this.imageData=this.context.createImageData(c.width,c.height)
}this.imageData.data.set(c.buf8)}};o.applyBinaryFrame=function(b,a){if(!this.imageData){this.imageData=this.context.createImageData(b.width,b.height)
}if(this._beforeDrawOperation){b=this._beforeDrawOperation(b)}this.imageData.data.set(b.buf8);
if(!this._preventDraw||a){this.context.putImageData(this.imageData,0,0)}if(this._afterDrawOperation){b=this._afterDrawOperation(b)
}};o.calculateRenderCount=function(c,b){var a=0;if(Math.abs(b-c)>=b){c=1;a=1}else{if(Math.abs(b-c)>=(this.frameCount-b)&&this._images[1]){c=this.frameCount-2;
a=1}}if(b>0&&b<this.frameCount-1){return Math.abs(c-b)+a}else{return a}};o.compositeFrames=function(b,f){var g=new l(),a;
f=(this.frameCount<f)?this.frameCount-1:(f<0)?0:f;b=(this.frameCount-2<b)?this.frameCount-2:(b<0)?0:b;
var d,c,a;if(Math.abs(f-b)>=f){b=1;if(k){console.log("applying start keyframe")
}this.applyFrame(this._images[0]);return g.resolve()}else{if(Math.abs(f-b)>=(this.frameCount-f)&&this._images[1]){b=this.frameCount-2;
if(k){console.log("applying end keyframe")}this.applyFrame(this._images[1]);return g.resolve()
}}d=(b>f)?-1:(b<f)?1:0;if(f>0&&f<this.frameCount-1){while(b!==f){c=this._diffRender.renderDiff(this.canvas,b,this.context);
b+=d}}if(c){c.then(g.resolve.bind(g))}else{g.resolve()}return g.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(o,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(a){return this._canvas=a
},enumerable:true},mainCompositor:{get:function(){var a=this;while(a._compositor){a=a._compositor
}return a},enumerable:true},_beforeDrawOperation:{value:undefined,enumerable:false,writable:true},_afterDrawOperation:{value:undefined,enumerable:false,writable:true},beforeDrawOperation:{get:function(){return this._beforeDrawOperation
},set:function(a){if(typeof a==="function"){this._beforeDrawOperation=a;return}this._beforeDrawOperation=undefined
},enumerable:true},afterDrawOperation:{get:function(){return this._afterDrawOperation
},set:function(a){if(typeof a==="function"){this._afterDrawOperation=a;return}this._afterDrawOperation=undefined
},enumerable:true}});r.exports=m},{"../diff/BinaryMultithreadRender":148,"../diff/BinaryRender":149}],133:[function(t,u,s){var p=0,v;
function n(){if(!v){v=document.getElementById("counter")}p++;v.textContent=p}var r,m=false,q=t("../diff/Render"),o=t("ac-deferred").Deferred;
function w(b,a,c,d){this._keyframes=b;this._imageUrlPattern=a;this._loadController=c;
this._renderType=d||"default"}r=w.prototype;r._initDiffRender=function(a){this._images=a;
this.canvas.height=a[0].height;this.canvas.width=a[0].width;this.applyFrame(a[0]);
return new o().resolve()};r.init=function(a){this.canvas=a||document.createElement("canvas");
this.context=a.getContext("2d");return this._loadController.loadKeyframes().then(this._initDiffRender.bind(this)).then(this._loadController.loadManifest.bind(this._loadController))
};r.createDiffRender=function(a){this._diffRender=new q(a,this._imageUrlPattern,this._loadController);
return this._diffRender.init()};r.applyFrame=function(b){var a=this.context;a.drawImage(b,0,0)
};r.calculateRenderCount=function(a,c){var b=0;if(Math.abs(c-a)>=c){a=1;b=1}else{if(Math.abs(c-a)>=(this.frameCount-c)&&this._images[1]){a=this.frameCount-2;
b=1}}if(c>0&&c<this.frameCount-1){return Math.abs(a-c)+b}else{return b}};r.compositeFrames=function(a,c){var d=new o();
c=(this.frameCount<c)?this.frameCount-1:(c<0)?0:c;a=(this.frameCount-2<a)?this.frameCount-2:(a<0)?0:a;
var b;if(m){console.groupCollapsed("Rendering diff frames: "+a+"..."+c)}if(Math.abs(c-a)>=c){a=1;
if(m){console.log("applying start keyframe")}this.applyFrame(this._images[0])}else{if(Math.abs(c-a)>=(this.frameCount-c)&&this._images[1]){a=this.frameCount-2;
if(m){console.log("applying end keyframe")}this.applyFrame(this._images[1])}}b=(a>c)?-1:(a<c)?1:0;
if(c>0&&c<this.frameCount-1){while(a!==c){this._diffRender.renderDiff(this.canvas,a);
a+=b}}if(m){console.groupEnd()}d.resolve(a);return d.promise()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(r,{frameCount:{get:function(){return this._diffRender.frames.length+2
},enumerable:true},canvas:{get:function(){return this._canvas},set:function(a){return this._canvas=a
},enumerable:true},mainCompositor:{get:function(){var a=this;while(a._compositor){a=a._compositor
}return a},enumerable:true}});u.exports=w},{"../diff/Render":151}],134:[function(h,m,i){var l,j=h("../../../stats/Benchmark");
function k(a){this._compositor=a}l=k.prototype;l.init=function(b){var a=new j("init");
a.start();return this._compositor.init.apply(this._compositor,arguments).then(a.end.bind(a))
};l.applyFrame=function(){var a=new j("applyFrame");a.start();this._compositor.applyFrame.apply(this._compositor,arguments);
a.end.bind(a)};l.calculateRenderCount=function(){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};l.compositeFrames=function(){var a=new j("renderFrames");a.start();return this._compositor.compositeFrames.apply(this._compositor,arguments).then(a.end.bind(a))
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(l,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});k.prototype=l;m.exports=k},{"../../../stats/Benchmark":155}],135:[function(l,k,m){var j,h=false;
function i(a,b){this._compositor=a;this._keyframeInterval=b||8;this._keyframes=[]
}j=i.prototype;j._getClosestKeyframe=function(c){var b=c%this._keyframeInterval,a=Math.floor(c/this._keyframeInterval)+((b>(this._keyframeInterval/2))?1:0);
return a};j._getFrameFromKeyframe=function(a){return a*this._keyframeInterval};
j._saveKeyframe=function(a){var c,b=Math.floor(a/this._keyframeInterval);if(a%this._keyframeInterval===0&&!this._keyframes[b]){if(h){console.log("saving keyframe "+a)
}c=document.createElement("canvas");c.width=this._compositor.canvas.width;c.height=this._compositor.canvas.height;
c.getContext("2d").drawImage(this._compositor.canvas,0,0);this._keyframes[b]=c}};
j.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};j.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};j.calculateRenderCount=function(b,a){b=this._getFrameFromKeyframe(this._getClosestKeyframe(a));
return this._compositor.calculateRenderCount(b,a)+1};j.compositeFrames=function(d,b){var a=this._getClosestKeyframe(b);
if(h){console.groupCollapsed("Rendering frames: "+d+"..."+b)}if(this._keyframes[a]&&(this._compositor.calculateRenderCount(d,b)>this.calculateRenderCount(d,b))){d=this._getFrameFromKeyframe(a);
if(h){console.log("applying prerendered keyframe: "+d)}this.applyFrame(this._keyframes[a]);
return this._compositor.compositeFrames(d,b).then(function c(){if(h){console.groupEnd()
}})}else{return this._compositor.compositeFrames(d,b).then(function c(){if(h){console.groupEnd()
}},null,this._saveKeyframe.bind(this))}};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(j,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true}});k.exports=i},{}],136:[function(o,n,j){var m,k=false,p=o("../../keyframe/Render"),q=o("ac-deferred").Deferred;
function l(a){this._compositor=a;this._flowDataProvider=this.mainCompositor._loadController._loaders.manifest
}m=l.prototype;m.init=function(a){this._keyframeDiffRender=new p(this._flowDataProvider._data,this.mainCompositor._imageUrlPattern);
return this._keyframeDiffRender.init()};m.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};m.applyKeyframe=function(b,a){this._keyframeDiffRender.renderKeyframe(this.canvas,b,a)
};m.compositeFrames=function(c,a){if(!this._isKeyframeDiff(a-1)){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}var b=new q();if(k){console.groupCollapsed("Rendering keyframe diff image: "+(c-1))
}this.applyKeyframe(a-1);if(k){console.groupEnd()}b.resolve(c-1);return b.promise()
};m._isKeyframeDiff=function(a){return a in this._keyframeDiffRender._loader._keyframes
};m.calculateRenderCount=function(b,a){return this._compositor.calculateRenderCount.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(m,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});n.exports=l},{"../../keyframe/Render":153}],137:[function(n,m,i){var l,j=false,o=n("ac-deferred").Deferred;
function k(a){this._compositor=a;this._frames=this.mainCompositor._loadController._loaders.manifest._data.frames;
this._superframeInterval=this.mainCompositor._diffRender.flowData.superframeFrequency
}l=k.prototype;l.init=function(a){return this._compositor.init.apply(this._compositor,arguments)
};l.applyFrame=function(a){return this._compositor.applyFrame.apply(this._compositor,arguments)
};l.applyKeyframe=function(b,a){this._compositor.applyKeyframe.apply(this._compositor,arguments)
};l.compositeFrames=function(f,b){var a,c,d=new o();if(b<1||b>this.frameCount-2){return this._compositor.compositeFrames.apply(this._compositor,arguments)
}if(this._isKeyframeDiff(b-1)){a=Math.abs(f-b)===1?true:false;if(j){console.groupCollapsed("Drawing superKeyframe image: "+(b-1))
}this.applyKeyframe(b-1,a);if(j){console.groupEnd()}d.resolve(f-1);return d.promise()
}if(Math.abs(b-f)>this._superframeInterval){c=this._getShortestRender(f,b);if(this._isKeyframeDiff(c-1)||c<=0||c>=this.frameCount-2){return this._compositeFromSuperKeyframe(c,b)
}}if(j){console.log("SuperKeyframe compositor handing off to slave compositor: fromFrame:"+f+" toFrame:"+b)
}return this._compositor.compositeFrames.apply(this._compositor,[f,b])};l._getShortestRender=function(f,c){var a=this._compositor.calculateRenderCount,b=this._getClosestSuperKeyframe(c-1),d=a.apply(this._compositor,[b,c])+1,g=a.apply(this._compositor,[f,c]);
if(d<=g){return b}else{return f}};l._compositeFromSuperKeyframe=function(a,c){var f=this.canvas.getContext("2d"),d=(a<=0)?this.mainCompositor._images[0]:(a>=this.frameCount-2?this.mainCompositor._images[1]:this._frames[a-1].image),b;
if(j){console.log("Drawing superKeyframe for composite base: superKeyframe "+(a-1))
}f.drawImage(d,0,0);return this._compositor.compositeFrames.call(this._compositor,a,c)
};l._getClosestSuperFrame=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};l._getClosestSuperKeyframe=function(c){var g,f,a,b,d=this._frames.length;if(c<d+1&&c>0){b=c-1;
while(b>=0){if(this._frames[b].type==="keyframe"){g=b+1;break}b-=1}b=c+1;while(b<=d-1){if(this._frames[b].type==="keyframe"){f=b+1;
break}b+=1}}g=g?g:0;f=f?f:this.frameCount;a=(c-g)<(f-c)?g:f;return a};l._isKeyframeDiff=function(a){return this._compositor._isKeyframeDiff.apply(this._compositor,arguments)
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(l,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});m.exports=k},{}],138:[function(m,l,h){var k,i=false;function j(a,b){this._compositor=a;
this._superframeInterval=b||4}k=j.prototype;k._getClosestSuperframe=function(a){return Math.round(a/this._superframeInterval)*this._superframeInterval
};k.init=function(a){this._screenCanvas=a};k.applyFrame=function(){this._compositor.applyFrame.apply(this._compositor,arguments)
};k.calculateRenderCount=function(c,a){var b=this._getClosestSuperframe(c);if(Math.abs(b-a)>this._superframeInterval/2){c=b+((c>a)?-1:1)*this._superframeInterval;
return this.calculateRenderCount(c,a)+1}else{return Math.abs(b-a)+1}};k.compositeFrames=function(f,b){var a,d;
if(b<=0||b>=this.frameCount-2){this._compositor.compositeFrames(f,b)}if(f>this.frameCount-2){f=this.frameCount-2
}else{if(f<=0){f=1}}d=this._getClosestSuperframe(f);if(i){console.groupCollapsed("Rendering : "+f+"..."+b)
}if(this._compositor.calculateRenderCount(f,b)>this.calculateRenderCount(f,b)){if(i){console.groupCollapsed("Rendering (superframe) : "+d)
}a=this._compositor.compositeFrames(d,d).then(function c(){if(i){console.groupEnd()
}var g=d+((f>b)?-1:1)*this._superframeInterval;this._compositor.compositeFrames(d,g).then(function(){return this.compositeFrames(g,b)
}.bind(this))}.bind(this))}else{if(i){console.groupCollapsed("Rendering (final frames) : "+f+"..."+b)
}a=this._compositor.compositeFrames(f,b).then(function c(){if(i){console.groupEnd()
}}.bind(this))}a.then(function c(){if(i){console.groupEnd()}}.bind(this));return a
};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(k,{frameCount:{get:function(){return this._compositor.frameCount
},enumerable:true},canvas:{get:function(){return this._compositor.canvas},set:function(a){return this._compositor.canvas=a
},enumerable:true},mainCompositor:{get:function(){return this._compositor.mainCompositor
},enumerable:true}});l.exports=j},{}],139:[function(p,o,q){var m,n=p("ac-event-emitter").EventEmitter,k=p("./MultithreadProcess"),l=p("./MultithreadProcessInterface");
var j=function(a){n.call(this);this._function=a};m=j.prototype=new n(null);m.exec=function(a,b){b=b||{};
if(!this._processURL){this._processURL=this._createThreadProcessURL(this._function)
}if(this._process){this.terminateProcess()}if(!this._process){this._process=new window.Worker(this._processURL);
this._process.onmessage=this._onMessage.bind(this)}var c;if(b.transfer){c=[a]}this._process.postMessage(a,c);
return this};m.run=function(f,a,c){c=c||{};var b={name:f,data:a||{}};var d;if(c.transfer){d=[b]
}this._process.postMessage(b,d);this.trigger(f,a)};m.destroy=function(){this.terminateProcess();
this._function=null;this._processURL=null;return this};m.terminateProcess=function(){if(this._process){this._process.terminate();
this._process=null}return this};m._createThreadProcessURL=function(a){var b=this._compileProcess(a),c=new window.Blob([b],{type:"text/javascript"});
return this._getURLObject().createObjectURL(c)};m._getURLObject=function(){return window.URL||window.webkitURL||null
};m._compileProcess=function(b){var f=k.toString();var d=/(['|"]){{INTERFACE}}\1/,c=/(['|"]){{PROCESS}}\1/;
f=f.replace(d,"("+l.toString()+")();");f=f.replace(c,b.toString());var a="(",g=")();";
return a+f+g};m._handleTrigger=function(b,a){this.trigger(b,a)};m._onMessage=function(a){if(!a.data){return
}var c=a.data.evt,b=a.data.data;if(c==="__trigger__"){this._handleTrigger(b.trigger,b.data)
}return this};o.exports=j},{"./MultithreadProcess":140,"./MultithreadProcessInterface":141}],140:[function(i,h,f){var g=function(){var a="{{PROCESS}}",b="{{INTERFACE}}";
this.processInstance;this.onmessage=function(c,k,d){d=d||{};if(!k.processInstance){k.processInstance=new c(this)
}else{k.processInstance._onMessage(d.data.name,d.data.data)}}.bind(b,a,this)};h.exports=g
},{}],141:[function(f,i,g){var h=function(){return{trigger:function(a,b,d){var c={trigger:a,data:b};
this._post("__trigger__",c,d)},_post:function(k,a,c){c=c||{};var d,b={evt:k,data:a};
if(c.transfer){d=[a]}postMessage(b,d)}}};i.exports=h},{}],142:[function(g,k,h){var j;
var i=function(a){this._interface=a;this.trigger=function(b,c,d){this._interface.trigger(b,c,d);
return this};this.renderFrameDiffs=function(b){var f=b.binaryFrame,q=b.compositingData,r=b.frameData,c=b.sourceImagesData,p=r.length,d;
for(d=0;d<p;d++){f=this._applyBlocksToBinaryFrame(f,r[d],c,q)}this.trigger("frameReady",f)
};this._applyBlocksToBinaryFrame=function(X,I,b,P){var U=I.block,d=Math.floor(U/P.blocksPerFullDiff),Q=P.imageWidth,y=I.length,K=P.columnsInCanvas,L=P.canvasWidth,H=U%P.blocksPerFullDiff,Y=Q/P.blockSize;
var c=(H%Y)*P.blockSize,f=Math.floor(H/(Y||1))*P.blockSize,R=(I.location%K)*P.blockSize,S=Math.floor(I.location/K)*P.blockSize;
var M,O,x,V,W,N,J,T;while(y>0){J=Math.min((y*P.blockSize),L-R,Q-c);T=J/P.blockSize;
V=b[d];for(O=0;O<P.blockSize;O++){for(M=0;M<J;M++){W=(f+O)*Q+(c+M);N=(S+O)*L+(R+M);
X.buf32[N]=V[W]}}y-=T;if(y>0){if((c+=J)>=Q){c=0;f+=P.blockSize}if((H+=T)>=P.blocksPerFullDiff){H=0;
c=0;f=0;d+=1;if(d===P.imagesRequired-1){Q=P.imageWidth}}if((R+=J)>=L){R=0;S+=P.blockSize
}U+=T}}return X};this._onMessage=function(b,c){if(typeof this[b]==="function"){this[b](c)
}}};k.exports=i},{}],143:[function(f,i,g){function h(b,a){this.location=b;this.length=a
}i.exports=h},{}],144:[function(i,h,f){function g(){}h.exports=g},{}],145:[function(o,n,i){var k=o("./Manifest"),j=o("./Block"),l;
var m={parseData:function(b){l=0;var a=b.frames.map(this._parseFrame,this);return Object.create(k.prototype,{version:{value:b.version},framecount:{value:b.frameCount},blockSize:{value:b.blockSize},imagesRequired:{value:b.imagesRequired},reversible:{value:b.reversible},superframeFrequency:{value:b.superframeFrequency},frames:{value:a}})
},_valueForCharAt:function(a,c){var b=a.charCodeAt(c);if(b>64&&b<91){return b-65
}if(b>96&&b<123){return b-71}if(b>47&&b<58){return b+4}if(b===43){return 62}if(b===47){return 63
}throw"Invalid Bas64 character: "+a.charAt(c)},_createNumberFromBase64Range:function(a,f,b){var c=0,d;
while(b--){d=this._valueForCharAt(a,f++);c+=(d<<b*6)}return c},_parseFrame:function(c){var b,f=[],c=c.value||c,a,d;
for(b=0;b<c.length;b+=5){d=this._createNumberFromBase64Range(c,b,3);a=this._createNumberFromBase64Range(c,b+3,2);
f.push(Object.create(j.prototype,{location:{value:d,enumerable:true},length:{value:a,enumerable:true},block:{value:(l+=a)-a,enumerable:true}}))
}return f}};n.exports=m},{"./Block":143,"./Manifest":144}],146:[function(o,n,i){var l,j=o("ac-ajax").Ajax,k=o("../processor");
function m(b,a){this._url=b;this._ajaxAdaptor=a||new j()}l=m.prototype;l.load=function(){return this._ajaxAdaptor.get(this._url).then(function(b){try{var c=b.response||b.responseText;
return JSON.parse(c)}catch(a){if(DEBUG){console.log("Failed to parse manifest data")
}}}).then(function(a){this._data=a;return k.parseData(a)}.bind(this))};n.exports=m
},{"../processor":145,"ac-ajax":104}],147:[function(m,l,i){var j,h=m("ac-deferred").Deferred;
var k=function(a){if(typeof a==="string"){a=[a]}this.srcArr=a};j=k.prototype;j._request=function(a){var c=new h();
var b=new XMLHttpRequest();b.addEventListener("load",function(){var d=b.response;
c.resolve(d)});b.responseType="arrayBuffer";b.open("get",a,true);b.send();return c.promise()
};j.load=function(){this._deferred=new h();var a=[];var b,c=this.srcArr,d=c.length;
for(b=0;b<d;b++){a.push(this._request(c[b]))}h.all(a).then(function(f){this._deferred.resolve(f)
}.bind(this));return this._deferred.promise()};l.exports=k},{}],148:[function(s,t,r){var n=false;
var p,l=s("./Loader"),o=s("ac-deferred").Deferred,u=s("../compositor/multithread/MultithreadController"),q=s("../compositor/multithread/MultithreadRenderer");
function m(a,b){this.flowData=a;this.flowData.imageUrlPattern=b;this.ArrayBufferCompositor=document.createElement("canvas");
this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");this.sourceImagesData={};
this._processor=new u(q);this._processor.exec();window.processor=this._processor
}p=m.prototype;p._storeImages=function(a){if(n){console.log("loaded images")}this.images=a;
this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new o()).resolve()};p._getImageDataAsArrayBuffer=function(d,c,a){a=a||c;
this.ArrayBufferCompositor.width=c;this.ArrayBufferCompositor.height=a;this.ArrayBufferCompositorContext.drawImage(d,0,0);
var b=new Uint32Array(this.ArrayBufferCompositorContext.getImageData(0,0,c,a).data.buffer);
return b};p._processDataConstants=function(){this._compositingConstants={images:[]};
var a,b=this.images.length;for(a=0;a<b;a++){this._compositingConstants.images[a]={};
this._compositingConstants.images[a].width=this.images[a].width}return(new o()).resolve()
};p._setFrameRequirements=function(d){var f=d[0],h=d[d.length-1];var g=this._getImageIndexOfBlock(f.block),b=this._getImageIndexOfBlock(h.block+h.length);
var a,c={};for(a=g;a<b+1;a++){if(this.sourceImagesData[a]){c[a]=this.sourceImagesData[a]
}else{c[a]=this._getImageDataAsArrayBuffer(this.images[a],this.images[a].width)
}}this.sourceImagesData=c;return c};p._getImageIndexOfBlock=function(a){return Math.floor(a/this._blocksPerFullDiff)
};p._setCompositingData=function(b,a){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:a.canvas.width,canvasHeight:a.canvas.height,blocksPerFullDiff:this._blocksPerFullDiff,blockSize:this.flowData.blockSize,imagesRequired:this.flowData.imagesRequired};
var c=a.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(c)
};p._createBinaryFrame=function(c,a,b){return{buf8:c,buf32:new Uint32Array(c.buffer),width:a,height:b}
};p._getBinaryImageArrayLength=function(a){return a.canvasWidth};p._compositeBinaryFrame=function(c,d){var g,b=c.length,h=new o();
var f=this._setFrameRequirements(c);var a;if(this._lastBinaryFrame){a=this._lastBinaryFrame
}else{a=this._createBinaryFrame(d.imageData,d.canvasWidth,d.canvasHeight)}this._processor.run("renderFrameDiffs",{binaryFrame:a,frameData:c,compositingData:d,sourceImagesData:f});
this._processor.once("frameReady",h.resolve.bind(h));return h.promise()};p._getSourceImageAs32Bit=function(a){return new Uint32Array(this.sourceImagesData[a].data.buffer)
};p._applyBlocksToBinaryFrame=function(T,a,K){var Q=a.block,b=Math.floor(Q/this._blocksPerFullDiff),x=this._compositingConstants.images[b].width,c=a.length,g=K.columnsInCanvas,i=K.canvasWidth,f=Q%this._blocksPerFullDiff,U=x/this.flowData.blockSize;
var L=(f%U)*this.flowData.blockSize,O=Math.floor(f/(U||1))*this.flowData.blockSize,y=(a.location%g)*this.flowData.blockSize,M=Math.floor(a.location/g)*this.flowData.blockSize;
var h,j,P,R,S,k,d,N;while(c>0){d=Math.min((c*this.flowData.blockSize),i-y,x-L);
N=d/this.flowData.blockSize;R=this.sourceImagesData[b];for(j=0;j<this.flowData.blockSize;
j++){for(h=0;h<d;h++){S=(O+j)*x+(L+h);k=(M+j)*i+(y+h);T.buf32[k]=R[S]}}c-=N;if(c>0){if((L+=d)>=x){L=0;
O+=this.flowData.blockSize}if((f+=N)>=this._blocksPerFullDiff){f=0;L=0;O=0;b+=1;
if(b===this.flowData.imagesRequired-1){x=this._compositingConstants.images[b].width
}}if((y+=d)>=i){y=0;M+=this.flowData.blockSize}Q+=N}}return T};p.init=function(){console.log("LOADED BINARY");
if(n){console.log("load images")}return new l(this.flowData.imageUrlPattern,this.flowData.imagesRequired).load({binary:true}).then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};p.renderDiff=function(f,c){var d=f.getContext("2d"),a=new o();if(!this._compositingData){this._setCompositingData(f,d)
}c-=1;if(n){this._frameToRender=c}var b=this._compositeBinaryFrame(this.frames[c],this._compositingData);
b.then(function(g,h){this._lastBinaryFrame=h;g.resolve(h)}.bind(this,a));return a.promise()
};p.getBinaryDataFromFlowDataBlock=function(a){};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(p,{frames:{get:function(){return this.flowData.frames},set:function(a){this.flowData.frames=a
},enumerable:true}});t.exports=m},{"../compositor/multithread/MultithreadController":139,"../compositor/multithread/MultithreadRenderer":142,"./Loader":150}],149:[function(m,l,o){var k,i=false,n=m("ac-deferred").Deferred;
function j(a,c,b){this.flowData=a;this.flowData.imageUrlPattern=c;this._loadController=b;
this.ArrayBufferCompositor=document.createElement("canvas");this.ArrayBufferCompositorContext=this.ArrayBufferCompositor.getContext("2d");
this.sourceImagesData={};this._forceBinaryComposite=true}k=j.prototype;k._storeImages=function(a){if(i){console.log("loaded images")
}this.images=a;this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new n()).resolve()};k._getImageDataAsArrayBuffer=function(b,a,c){c=c||a;
if(this.ArrayBufferCompositor.width!==a){this.ArrayBufferCompositor.width=a}if(this.ArrayBufferCompositor.height!==c){this.ArrayBufferCompositor.height=c
}this.ArrayBufferCompositorContext.drawImage(b,0,0);var d={buf8:this.ArrayBufferCompositorContext.getImageData(0,0,a,c).data};
d.buf32=new Uint32Array(d.buf8.buffer);return d};k._processDataConstants=function(){this._compositingConstants={images:[]};
var a,b=this.images.length;for(a=0;a<b;a++){this._compositingConstants.images[a]={};
this._compositingConstants.images[a].width=this.images[a].width}return(new n()).resolve()
};k._setFrameRequirements=function(g){var h=g[0],b=g[g.length-1];var r=this._getImageIndexOfBlock(h.block),d=this._getImageIndexOfBlock(b.block+b.length),a=d+1;
var c,f={};for(c=r;c<a;c++){if(this.sourceImagesData[c]){f[c]=this.sourceImagesData[c]
}else{f[c]=this._getImageDataAsArrayBuffer(this.images[c],this.images[c].width)
}}this.sourceImagesData=f};k._getImageIndexOfBlock=function(a){return Math.floor(a/this._blocksPerFullDiff)
};k._setCompositingData=function(c,b){this._compositingData={imageWidth:this._compositingConstants.images[0].width,canvasWidth:b.canvas.width,canvasHeight:b.canvas.height};
var a=b.getImageData(0,0,this._compositingData.canvasWidth,this._compositingData.canvasHeight).data;
this._compositingData.columnsInCanvas=this._compositingData.canvasWidth/this.flowData.blockSize,this._compositingData.imageData=new Uint8ClampedArray(a)
};k._createBinaryFrame=function(a,b,c){return{buf8:a,buf32:new Uint32Array(a.buffer),width:b,height:c}
};k._getBinaryImageArrayLength=function(a){return a.canvasWidth};k._compositeBinaryFrame=function(f,a){var b,d=f.length;
this._setFrameRequirements(f);var c;if(this._lastBinaryFrame&&!this._forceBinaryComposite){c=this._lastBinaryFrame
}else{c=this._createBinaryFrame(a.imageData,a.canvasWidth,a.canvasHeight);if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(c);
c=this.forceApplyFilter(c,a)}else{if(this._cleanBinaryFrame){this._cleanBinaryFrame=null
}}this._forceBinaryComposite=false}if(this._beforeRenderOperation){c=this._beforeRenderOperation(c)
}for(b=0;b<d;b++){c=this._applyBlocksToBinaryFrame(c,f[b],a)}return c};k._applyBlocksToBinaryFrame=function(af,Z,P){var S=this.flowData.blockSize,U=this._blocksPerFullDiff,x=this.flowData.imagesRequired,ab=Z.block,a=Math.floor(ab/U),V=this._compositingConstants.images[a].width,b=Z.length,f=P.columnsInCanvas,g=P.canvasWidth,ac=P.canvasHeight,d=ab%U,ag=V/S;
var R=(d%ag)*S,T=Math.floor(d/(ag||1))*S,X=(Z.location%f)*S,Y=Math.floor(Z.location/f)*S;
var h,N,O,Q,W,ad,ae,y,c,aa;while(b>0){c=Math.min((b*S),g-X,V-R);aa=c/S;ad=this.sourceImagesData[a];
for(N=0;N<S;N++){for(h=0;h<c;h++){O=X+h;Q=Y+N;ae=(T+N)*V+(R+h);y=Q*g+O;if(this._renderOperation){this._cleanBinaryFrame.buf32[y]=ad.buf32[ae];
ad=this._renderOperation(ad,(ae*4),O,Q,g,ac)}af.buf32[y]=ad.buf32[ae]}}b-=aa;if(b>0){if((R+=c)>=V){R=0;
T+=S}if((d+=aa)>=U){d=0;R=0;T=0;a+=1;if(a===x-1){V=this._compositingConstants.images[a].width
}}if((X+=c)>=g){X=0;Y+=S}ab+=aa}}return af};k._cloneBinaryFrame=function(b){var a=b.buf8.buffer.slice(0);
return{buf8:new Uint8ClampedArray(a),buf32:new Uint32Array(a),width:b.width,height:b.height}
};k.init=function(){if(i){console.log("load images")}return this._loadController.loadDiffs().then(this._storeImages.bind(this)).then(this._processDataConstants.bind(this))
};k.renderDiff=function(c,a,b){var b=b||c.getContext("2d");if(!this._compositingData||this._forceBinaryComposite){this._setCompositingData(c,b)
}a-=1;if(i){this._frameToRender=a}var d=this._compositeBinaryFrame(this.frames[a],this._compositingData);
this._lastBinaryFrame=d;return new n().resolve(d)};k.forceBinaryComposite=function(){this._forceBinaryComposite=true;
return this};k.forceApplyFilter=function(b,u){if(this._renderOperation){var f,v,a,h,t,g=u.canvasWidth,d=u.canvasHeight,c=b.buf32.length;
for(f=0;f<c;f++){v=f%g;if(f>0){a=Math.floor(f/g)}else{a=0}b=this._renderOperation(b,(f*4),v,a,g,d)
}}return b};k.forceKeyframeRender=function(c,b){this._setCompositingData(c,b);var a=this._compositingData,d=this._createBinaryFrame(a.imageData,a.canvasWidth,a.canvasHeight);
if(this._renderOperation){this._cleanBinaryFrame=this._cloneBinaryFrame(d);d=this.forceApplyFilter(d,a)
}return d};if(typeof Object.defineProperties!=="function"){return function(){}}Object.defineProperties(k,{frames:{get:function(){return this.flowData.frames
},set:function(a){this.flowData.frames=a},enumerable:true},_beforeRenderOperation:{value:undefined,enumerable:false,writable:true},_renderOperation:{value:undefined,enumerable:false,writable:true},beforeRenderOperation:{get:function(){return this._beforeRenderOperation
},set:function(a){if(typeof a==="function"){this._beforeRenderOperation=a;return
}this._beforeRenderOperation=undefined},enumerable:true},renderOperation:{get:function(){return this._renderOperation
},set:function(a){if(typeof a==="function"){this.forceBinaryComposite();this._renderOperation=a;
return}this._renderOperation=undefined;this.forceBinaryComposite()},enumerable:true}});
l.exports=j},{}],150:[function(o,n,i){var l,j=o("ac-asset-loader").AssetLoader,m=o("./BinaryLoader");
function k(b,d){var c,f,a=b.match(/#/g).length;this.imagesUrls=[];if(!d){throw new Error("0 images provided")
}for(c=1;c<=d;c++){f="0000"+c;f=f.substring(f.length-a);this.imagesUrls.push(b.replace(/#{2,}/g,f))
}}l=k.prototype;l.load=function(a){a=a||{};return new j(this.imagesUrls).load()
};n.exports=k},{"./BinaryLoader":147,"ac-asset-loader":112}],151:[function(m,l,o){var k,i=false,n=m("ac-deferred").Deferred;
function j(a,c,b){this.flowData=a;this.flowData.imageUrlPattern=c;this._loadController=b
}k=j.prototype;k._storeImages=function(a){if(i){console.log("loaded images")}this.images=a;
this._blocksPerFullDiff=(a[0].width/this.flowData.blockSize)*(a[0].height/this.flowData.blockSize);
return(new n()).resolve()};k._applyDiffRange=function(x,a){var c=a.block,h=a.length,y=x.canvas.width/this.flowData.blockSize,f=Math.floor(c/this._blocksPerFullDiff),A=this.images[f].width,z=c%this._blocksPerFullDiff,B=A/this.flowData.blockSize,C=(z%B)*this.flowData.blockSize,D=Math.floor(z/(B||1))*this.flowData.blockSize,b=(a.location%y)*this.flowData.blockSize,d=Math.floor(a.location/y)*this.flowData.blockSize,g,E;
while(h){g=Math.min((h*this.flowData.blockSize),x.canvas.width-b,A-C);E=g/this.flowData.blockSize;
if(i){if(typeof this.renderDebugger!=="undefined"&&this._frameToRender>0){this.renderDebugger.registerComparison(this._frameToRender,{image:f,block:c,x:C,y:D})
}}x.drawImage(this.images[f],C,D,g,this.flowData.blockSize,b,d,g,this.flowData.blockSize);
h-=E;if(h){if((C+=g)>=A){C=0;D+=this.flowData.blockSize}if((z+=E)>=this._blocksPerFullDiff){z=0;
C=0;D=0;f+=1;if(f===this.flowData.imagesRequired-1){A=this.images[f].width}}if((b+=g)>=x.canvas.width){b=0;
d+=this.flowData.blockSize}c+=E}}};k.init=function(){if(i){console.log("load images")
}return this._loadController.loadDiffs().then(this._storeImages.bind(this))};k.renderDiff=function(d,a){var c=d.getContext("2d");
a-=1;if(i){this._frameToRender=a;console.log("applying diff frame : "+(a+1))}this.frames[a].forEach(function b(f){this._applyDiffRange(c,f)
}.bind(this))};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(k,{frames:{get:function(){return this.flowData.frames},set:function(a){this.flowData.frames=a
},enumerable:true}});l.exports=j},{}],152:[function(m,l,o){var k,j=m("ac-asset-loader").AssetLoader,n=m("ac-deferred").Deferred;
function i(d,a){var b,c=d.match(/#/g).length;this._keyframes={};d=d.replace(/([^#]+)(#+)(\..*)/,"$1key_$2$3");
this._imageUrls=[];if(a.frames){a.frames.forEach(function(g,f){if(g.type==="keyframe"){b="0000"+f;
b=b.substring(b.length-c);this._imageUrls.push(d.replace(/#+/g,b));this._keyframes[f]=g
}}.bind(this))}}k=i.prototype;k.load=function(){if(this._imageUrls.length>0){return new j(this._imageUrls).load()
}return(new n()).resolve()};if(typeof Object.defineProperties!=="function"){return function(){}
}Object.defineProperties(k,{keyframes:{get:function(){return this._keyframes},enumerable:true}});
l.exports=i},{"ac-asset-loader":112}],153:[function(o,n,i){var m,j=false,k=o("./Loader");
function l(a,b){this.flowData=a;this.flowData.imageUrlPattern=b}m=l.prototype;m._storeImages=function(d){var b=0,a;
if(d&&d.length>0){if(j){console.log("loaded keyframe diff images")}for(var c in this._loader._keyframes){if(this._loader._keyframes.hasOwnProperty(c)){a=d[b];
this._loader._keyframes[c].image=a;b+=1}}}if(j){if(!d||d.length===0){console.log("no keyframe diff images to load")
}}};m.init=function(){if(j){console.log("loading keyframe diff images")}this._loader=new k(this.flowData.imageUrlPattern,this.flowData);
return this._loader.load().then(this._storeImages.bind(this))};m.renderKeyframe=function(s,t,a){var u=s.getContext("2d"),h=this._loader.keyframes[t],g=h.image,c=h.x,d=h.y,b=h.width,f=h.height;
if(j){console.log("applying keyframe diff image: "+t);console.log("x:"+c+" y:"+d+" w:"+b+" h:"+f)
}if(a===true){if(j){console.log("drawing superKeyframe sub-rectangle")}u.drawImage(g,c,d,b,f,c,d,b,f)
}else{if(this.flowData.reversible){if(j){console.log("drawing superKeyframe full image")
}u.drawImage(g,0,0)}else{if(j){console.log("drawing keyframe full image")}u.drawImage(g,c,d,b,f)
}}};n.exports=l},{"./Loader":152}],154:[function(f,i,g){function h(p,o,b,d,a){var r,q,c,s;
a=a||{};a={keyframeCache:(typeof a.keyframeCache==="undefined")?8:a.keyframeCache,benchmark:(typeof a.benchmark==="undefined")?false:a.benchmark,preload:(typeof a.preload==="undefined")?true:a.preload,renderType:a.renderType||"default",multithread:a.multithread||false};
o=o||[p.getAttribute("data-start-frame")];if(p.getAttribute("data-end-frame")){o.push(p.getAttribute("data-end-frame"))
}b=b||p.getAttribute("data-image-url-pattern");c=(typeof d==="string")?new FlowDataProviderAsync(d):new FlowDataProviderSync(d);
if(a.renderType==="binary"){r=new AC_BinaryCompositor(o,b,c,a.multithread)}else{if(a.renderType==="default"){r=new AC_FlowCompositorSequence(o,b,c)
}}q=new AC_FlowPlayer(p,new AC_Flow(r,a));if(a.preload){q.load()}return q}i.exports=h
},{}],155:[function(g,k,h){var i;function j(a){this.name=a}i=j.prototype;i.start=function(){if(DEBUG){console.log("▼▼▼ start "+this.name+" benchmark");
this.startTime=new Date().getTime();console.time(this.name)}};i.end=function(){if(DEBUG){this.endTime=new Date().getTime();
console.log("▲▲▲ end "+this.name+" benchmark "+(this.endTime-this.startTime)/1000+" sec");
console.time(this.timeEnd)}};k.exports=j},{}],156:[function(d,g,f){g.exports=d(32)
},{}],157:[function(d,g,f){g.exports=d(33)},{"./ac-object/clone":158,"./ac-object/create":159,"./ac-object/defaults":160,"./ac-object/extend":161,"./ac-object/getPrototypeOf":162,"./ac-object/isDate":163,"./ac-object/isEmpty":164,"./ac-object/isRegExp":165,"./ac-object/toQueryParameters":166}],158:[function(d,g,f){g.exports=d(34)
},{"./extend":161}],159:[function(d,g,f){g.exports=d(35)},{}],160:[function(d,g,f){g.exports=d(36)
},{"./extend":161}],161:[function(d,g,f){g.exports=d(37)},{}],162:[function(d,g,f){g.exports=d(38)
},{}],163:[function(d,g,f){g.exports=d(39)},{}],164:[function(d,g,f){g.exports=d(40)
},{}],165:[function(d,g,f){g.exports=d(41)},{}],166:[function(d,g,f){g.exports=d(42)
},{qs:156}],167:[function(k,i,h){var j=k("./ac-media-object/create");var g=k("./ac-media-object/cname");
i.exports={create:j,cname:g}},{"./ac-media-object/cname":177,"./ac-media-object/create":178}],168:[function(q,r,o){var l=q("ac-event-emitter").EventEmitter;
var s=q("../eventNames");var m=2;function k(){this._items=[];this._loadingItem=null;
this._active=false}var n=k.prototype=new l();n.load=function(){this._active=true;
return this._loadNext()};n._loadNext=function(){if(this._items.length===0){return
}this._loadingItem=this._items.shift();this._loadItem(this._loadingItem)};n._loadItem=function(b){var a;
this._loadingItem=b;a=b.asset.load();a.then(this._itemLoaded.bind(this,b));return a
};n._itemLoaded=function(a,b){this.trigger(s.progress,{asset:a.asset,binaries:b});
if(this._active===true){this._loadNext()}};n.pause=function(){if(this._loadingItem){this._loadingItem.asset.pause();
this._items.unshift(this._loadingItem);this._loadingItem=null}this._active=false
};n.getItems=function(){return this._items};n.remove=function(f){var a=this._active;
var b;var d;var c=null;if(this._loadingItem&&this._loadingItem.asset===f){d=this._loadingItem;
this.pause()}for(b=0;b<this._items.length;b+=1){if(this._items[b].asset===f){d=this._items[b];
c=b;break}}d.asset.destroy();if(c!==null){this._items.splice(c,1)}if(a&&this._active===false){this.load()
}};n.add=function(a,c){var b=this._active;var d=true;c=(typeof c==="number")?c:m;
if(this._loadingItem&&this._loadingItem.priority<=c){d=false}if(d===true){this.pause()
}this._items.push({asset:a,priority:c});this._sort();if(b&&this._active===false){this.load()
}};n._sort=function(){this._items.sort(function(a,b){if(a.priority<b.priority){return -1
}return 1})};var p=new k();p.load();p.LoadingQueue=k;r.exports=p},{"../eventNames":179}],169:[function(A,D,x){var v=A("ac-base").Element;
var y=A("ac-object");var s=A("ac-ajax");var u=A("../utils/destroy");var r=A("ac-event-emitter").EventEmitter;
var E=A("../eventNames");var F=A("./MediaObject/Loader");var B=A("./MediaObject/Loader/QueuedLoader");
var G=A("./MediaObject/View");var w;var z={preload:false,autoplay:false,fadeToEndframe:false,transitionDuration:0.4,frameRate:24,queueLoading:false,loadPriority:null};
var C={posterframeSrc:".posterframe",endstateSrc:".endstate"};var t=function(c,a,b){this.container=v.getElementById(c);
if(!this.container){throw"MediaObject: requires valid DOM Node for ‘container’"
}this.options=y.defaults(z,b||{});this.mediaSrc=y.defaults(C,a||{});if(this.mediaSrc.basePath){this.mediaSrc.basePath=this._forceTrailingSlash(this.mediaSrc.basePath)
}this._media=null;this._mediaElement=null;this._mediaEmitter=null;this._loadObject=null;
this._totalFrames=null;this.duration=null;this.ended=false;this.loader=null;this.dataOptionsAttribute="mediaObject";
this.dataAssetOptionsAttribute="mediaObject-asset";this.ready=false;this._updateOptionsFromDataAttribute();
this._mediaExistsSrc=this._constructMediaExistsSrc();this.view=new G(this);if(this.options.preload===true||this.options.autoplay===true){this.load()
}};w=t.prototype=new r();w.enhance=function(){if(!this.view.enhanced){this._generate();
this.view.enhance().then(function(){this.trigger(E.enhance,this)}.bind(this))}};
w.degrade=function(){this.view.degrade();this.trigger(E.degrade,this)};w._generate=function(){if(this.loader===null){if(this.options.queueLoading){this.loader=new B(this._loadObject,this.options.loadPriority);
this.prioritize=this.loader.prioritize.bind(this.loader)}else{this.loader=new F(this._loadObject)
}this._addEventListeners()}};w._forceTrailingSlash=function(a){if(a&&a.lastIndexOf("/")!==a.length-1){a=a+"/"
}return a};w._updateOptionsFromDataAttribute=function(){var b=this._parseDataAttributeOptions(this.container,this.dataOptionsAttribute);
var a=this._parseDataAttributeOptions(this.container,this.dataAssetOptionsAttribute);
y.defaults(this.options,b||{});y.defaults(this.mediaSrc,a||{})};w._parseDataAttributeOptions=function(c,f){c=v.getElementById(c);
var b=c.getAttribute("data-"+f);var g;var d={};var a;if(b&&b.length>0){g=b.split(",");
if(g&&g.length>0){g.forEach(function(h){a=h.split(":");d[a[0]]=a[1]})}}return d
};w._constructMediaExistsSrc=function(){var b="";var a=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):"";
b=a+this.mediaSrc.filename+"."+this.mediaSrc.fileFormat;return b};w.load=function(){if(this.loader===null||this.loader.loaded!==true){this._generate();
this.trigger(E.loadstart,this);this._load();return this.loader.load()}};w._load=function(){this.once(E.loaded,this._onReady,this)
};w.play=function(a){if(!this.ready){this.load();this.options.autoplay=true;return
}if(!this._media.paused){return false}this._play(a);this.trigger(E.play,this)};
w._play=function(a){if(this.ready&&this._media!==null){if(typeof a==="number"){this.setPlaybackRate(a)
}this._media.play()}};w.pause=function(){if(this._media.paused){return false}this._pause();
this.trigger(E.pause,this)};w._pause=function(){this._media.pause()};w.reset=function(){this._reset()
};w._reset=function(){if(this.ready){this.setTime(0)}};w.stop=function(){this.options.autoplay=false;
this._stop();this.trigger(E.stop,this)};w._stop=function(){this._pause();this.reset()
};w.setTime=function(a){if(a<0){a=0}if(a>this.duration){a=this.duration}return this._media.currentTime=a
};w.goToFrame=function(a){var b=a/this.options.frameRate;return this.setTime(b)
};w.goToDurationPercent=function(b){var a=b*this.duration;return this.setTime(a)
};w.currentFrame=function(){return Math.floor(this.currentTime()*this.options.frameRate)
};w.currentTime=function(){return this._media.currentTime};w.getCurrentTime=function(){return this._media.currentTime
};w.getPlaybackRate=function(){return this._media.playbackRate};w.setPlaybackRate=function(a){return this._media.playbackRate=a
};w._addEventListeners=function(){this._mediaEmitter.on(E.ended,this._onEnded,this);
this.loader.once(E.loaded,this._onLoad,this);this.loader.once(E.errored,this._onError,this)
};w.destroy=function(){this.trigger(E.destroy,this);this._mediaEmitter.off();u(this,true)
};w._getTotalFrames=function(){return this.duration*this.options.frameRate};w.mediaExists=function(){this._request=s.create({method:"HEAD",url:this._mediaExistsSrc,timeout:2000});
return this._request.send()};w._onReady=function(){this.ready=true;this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames();this._mediaEmitter.on("durationchange",function(){this.duration=this._media.duration;
this._totalFrames=this._getTotalFrames()},this);this.trigger(E.ready,this);if(this.options.autoplay===true){this.options.autoplay=false;
if(this.view.enhanced===false){this.enhance()}this.play()}};w._onEnded=function(){this.ended=true;
this.trigger(E.ended,this)};w._onLoad=function(){this.loaded=true;this.trigger(E.loaded,this)
};w._onError=function(){this.degrade()};D.exports=t},{"../eventNames":179,"../utils/destroy":180,"./MediaObject/Loader":171,"./MediaObject/Loader/QueuedLoader":172,"./MediaObject/View":174,"ac-ajax":2,"ac-base":false,"ac-object":157}],170:[function(u,w,q){try{var x=u("ac-flow-x").Flow
}catch(s){}var r=u("ac-object");var y=u("../../eventNames");var n=u("../MediaObject");
var o;var t={};var v={};var p=function(c,a,b){a=r.defaults(v,a||{});b=r.defaults(t,b||{});
this.canvas=null;n.apply(this,arguments)};o=p.prototype=r.create(n.prototype);o._generate=function(){if(this._media!==null||x===undefined){return
}var c;var b=document.createElement("canvas");var d={element:b,preload:false,superFrames:this.options.superFrames||false,reversable:this.options.reversable||false,keyframeCache:this.options.keyframeCache||8,benchmark:this.options.benchmark||false,multithread:this.options.multithread||false,preventDraw:this.options.preventDraw||false,renderType:this.options.renderType||"default"};
var a={basePath:this.mediaSrc.basePath||null,baseName:this.mediaSrc.filename||"flow",imageUrlPattern:this.mediaSrc.imageUrlPattern||"###",fileFormat:this.mediaSrc.fileFormat||"jpg",startframeFileFormat:this.mediaSrc.startframeFileFormat||null,endframeFileFormat:this.mediaSrc.endframeFileFormat||null,manifestPath:this.mediaSrc.manifestPath||null,manifestFileFormat:this.mediaSrc.manifestFileFormat||"json",diffPath:this.mediaSrc.diffPath||null,framePath:this.mediaSrc.framePath||null};
c=new x(d,a);c.frameRate=this.options.frameRate;this._media=c;this._mediaElement=c.element;
this._mediaEmitter=c;this._loadObject=c.loader;n.prototype._generate.call(this);
return this.mediaObject};o._constructMediaExistsSrc=function(){var c="";var a=this.mediaSrc.basePath?this._forceTrailingSlash(this.mediaSrc.basePath):null;
var d=this.mediaSrc.filename?this.mediaSrc.filename+"_":"_";var b=this.mediaSrc.manifestPath?this._forceTrailingSlash(this.mediaSrc.manifestPath):null;
c=(b||a)+d+"manifest."+(this.mediaSrc.manifestFileFormat||"json");return c};o._load=function(){this._mediaEmitter.once("canplaythrough",this._onReady,this)
};w.exports=p},{"../../eventNames":179,"../MediaObject":169,"ac-flow-x":125,"ac-object":157}],171:[function(j,p,k){var q=j("../../utils/destroy");
var n=j("ac-event-emitter").EventEmitter;var l=j("../../eventNames");var o;var m=function(a){this.loadObject=a;
this.loaded=false;this.loadObject.once(l.loaded,this._onLoad,this);this.loadObject.once(l.errored,this._onError,this)
};o=m.prototype=new n();o.load=function(){if(!this.loaded){return this._load()}};
o.pause=function(){if(!this.loaded){this.loadObject.pause()}};o._load=function(){return this.loadObject.load()
};o._onLoad=function(){this.loaded=true;this.trigger(l.loaded)};o._onError=function(){this.trigger(l.errored)
};o.destroy=function(){this.pause();q(this,true)};p.exports=m},{"../../eventNames":179,"../../utils/destroy":180}],172:[function(p,r,m){var o=p("ac-object");
var s=p("../../../eventNames");var n=p("../../LoadingQueue");var k=p("../Loader");
var l;var q=function(a,b){this.priority=b;k.apply(this,[a])};l=q.prototype=o.create(k.prototype);
l.prioritize=function(a){this.priority=a;this.loadObject.pause();n.remove(this.loadObject);
this.load()};l._load=function(){if(this.promise){n.add(this.loadObject,this.priority)
}else{this.promise=new Promise(function(a,b){this.loadObject.once(s.loaded,a);this.loadObject.once(s.errored,b);
n.add(this.loadObject,this.priority)}.bind(this))}return this.promise};r.exports=q
},{"../../../eventNames":179,"../../LoadingQueue":168,"../Loader":171,"ac-object":157}],173:[function(D,F,A){var t=D("ac-base").Environment;
var B=D("ac-object");var u=D("ac-asset-loader").AssetLoader;var w=D("ac-deferred").Deferred;
var y=D("ac-deferred").all;var v=D("ac-dom-emitter").DOMEmitter;var G=D("../../eventNames");
var x=D("../MediaObject");var r=D("ac-asset-loader").Asset.Video;var z;var C={loop:false};
var E={filename:"h264",fileFormat:"mp4"};var s=function(c,a,b){a=B.defaults(E,a||{});
b=B.defaults(C,b||{});x.call(this,c,a,b)};z=s.prototype=B.create(x.prototype);z._generate=function(){if(this._media!==null){return
}var d=document.createElement("video");var c=this._mediaExistsSrc;var a=new r(c,{element:d,forceElementLoading:this.options.forceElementLoading});
var b=new u(a);if(this.options.loop===true){d.setAttribute("loop","true")}this._media=d;
this._mediaElement=d;this._mediaEmitter=new v(d);this._loadObject=b;x.prototype._generate.call(this)
};z._triggerEndedWhilePlayingInReverse=function(){if(this._media.currentTime===0){this._media.pause();
this.trigger(G.ended,this);this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse)
}};z._hidePosterOnTimeupdate=function(){if(this._media.currentTime>0){this.view.hideCoverElement(this.view.posterframe);
this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate)}};z._load=function(){var b;
var a=new w();var c=new w();if(typeof this._boundOnReady!=="function"){this._boundOnReady=this._onReady.bind(this)
}this._mediaEmitter.once("loadedmetadata",function(){if(b){window.clearInterval(b)
}a.resolve()},this);this.once(G.loaded,function(){c.resolve();if(t.Browser.name==="Safari"&&!!this._media.src.match(/^blob/)&&a.promise().status()==="pending"){b=window.setInterval(function(){if(!this._media||!this._media.duration){return true
}return isNaN(this._media.duration)}.bind(this),20);window.setTimeout(function(){window.clearInterval(b)
},7000)}},this);return y([a.promise(),c.promise()]).then(this._boundOnReady)};z._play=function(a){this._mediaEmitter.on("timeupdate",this._hidePosterOnTimeupdate,this);
x.prototype._play.apply(this,arguments);if(this.getPlaybackRate()<0){this._mediaEmitter.on("timeupdate",this._triggerEndedWhilePlayingInReverse,this)
}};z._stop=function(){this._mediaEmitter.off("timeupdate",this._hidePosterOnTimeupdate);
this._mediaEmitter.off("timeupdate",this._triggerEndedWhilePlayingInReverse);x.prototype._stop.call(this)
};z._onReady=function(){x.prototype._onReady.call(this);this._boundOnReady=null
};F.exports=s},{"../../eventNames":179,"../MediaObject":169,"ac-asset-loader":43,"ac-base":false,"ac-dom-emitter":65,"ac-object":157}],174:[function(u,v,t){var r=u("ac-base").Element;
var w=u("../../eventNames");var n=u("ac-asset-loader").AssetLoader;var q=u("ac-deferred").Deferred;
var o=u("ac-deferred").all;var p=/\w+\.(?:jpg|png)$/;var y={posterframe:"mediaObject-posterframe",endstate:"mediaObject-endstate"};
function x(a){this.container=a.container;this.mediaObject=a;this.enhanced=false;
this.posterframe=null;this.endstate=null;this.mediaObject.on(w.play,this._onPlay,this);
this.mediaObject.on(w.pause,this._onPause,this);this.mediaObject.on(w.ended,this._onEnded,this)
}var s=x.prototype;s.enhance=function(){var b=new q();var c;var a;var d=function(h){this.posterframe=h||null
}.bind(this);var f=function(h){this.endstate=h||null}.bind(this);var g=function(){r.addClassName(this.container,"mediaObject-enhanced");
r.addClassName(this.mediaObject._mediaElement,"mediaObject-element");this.enhanced=true;
window.requestAnimationFrame(function(){this.hideCoverElement(this.endstate);this._inject();
r.setStyle(this.mediaObject._mediaElement,{visibility:"hidden"});window.requestAnimationFrame(function(){r.getBoundingBox(this.mediaObject._mediaElement);
r.setStyle(this.mediaObject._mediaElement,{visibility:"visible"});b.resolve()}.bind(this))
}.bind(this))}.bind(this);if(!this.enhanced){a=this._createCoverElement(this.mediaObject.mediaSrc.posterframeSrc,y.posterframe);
c=this._createCoverElement(this.mediaObject.mediaSrc.endstateSrc,y.endstate);a.then(d);
c.then(f);o([a,c]).then(g)}else{b.reject()}return b};s.degrade=function(){this.showCoverElement(this.endstate,false);
window.requestAnimationFrame(function(){this._remove();this.posterframe=null;this.endstate=null;
this.enhanced=false;r.addClassName(this.container,"mediaObject-degraded");this.mediaObject.destroy()
}.bind(this))};s._createCoverElement=function(a,d){var c;var b;if(p.test(a)){b=this._loadImage(a,d)
}else{c=r.select(a,this.container);b=new q().resolve(c)}return b};s._loadImage=function(a,c){var d=new n([a]);
function b(f){var g=f[0];g.width=g.width;g.height=g.height;g.alt="";g.className=c;
return g}return d.load().then(b)};s._inject=function(){r.insert(this.mediaObject._mediaElement,this.container);
[this.posterframe,this.endstate].forEach(function(a){if(a&&!this.container.contains(a)){r.insert(a,this.container)
}},this)};s._remove=function(){var a=[this.mediaObject._mediaElement];if(!p.test(this.mediaObject.posterframeSrc)){a.push(this.posterframe)
}a.forEach(function(b){if(r.isElement(b)&&this.container.contains(b)){this.container.removeChild(b)
}},this)};s.hideCoverElements=function(){this.hideCoverElement(this.posterframe);
this.hideCoverElement(this.endstate)};s.hideCoverElement=function(a,b){if(a){if(b){this._addOpacityTransition(a)
}else{this._removeTransition(a)}window.requestAnimationFrame(function(){r.setStyle(a,{opacity:0,zIndex:1})
}.bind(this))}};s.showCoverElement=function(a,b){var c=function(){this._removeTransition.bind(this,a);
r.removeVendorPrefixEventListener(a,"transitionEnd",c)}.bind(this);if(a){if(b){this._addOpacityTransition(a);
r.addVendorPrefixEventListener(a,"transitionEnd",c)}else{this._removeTransition(a)
}window.requestAnimationFrame(function(){r.setStyle(a,{opacity:1,zIndex:1001})}.bind(this))
}};s._removeTransition=function(a){r.setVendorPrefixStyle(a,"transition","none")
};s._addOpacityTransition=function(a){r.setVendorPrefixStyle(a,"transition","opacity "+this.mediaObject.options.transitionDuration+"s ease-out")
};s._onPlay=function(){r.removeClassName(this.container,"mediaObject-ended");r.addClassName(this.container,"mediaObject-playing");
this.hideCoverElements()};s._onPause=function(){r.removeClassName(this.container,"mediaObject-playing")
};s._onEnded=function(){r.removeClassName(this.container,"mediaObject-playing");
r.addClassName(this.container,"mediaObject-ended");if(this.endstateElement){this.showCoverElement(this.endstate,false)
}};v.exports=x},{"../../eventNames":179,"ac-asset-loader":43,"ac-base":false}],175:[function(q,r,n){var l=q("./KeyframeOnPause/ImageOverlayController");
var m,p=q("ac-object"),s=q("ac-clock");var o={overlayLoadDelay:250,overlayClassName:"image-overlay",overlayDirPath:"./overlay",overlayPrefix:"image_",overlayPattern:"####",overlayFileType:"png",clock:s};
var k=function(){};m=k.prototype;m.decorate=function(a,c){var b=p.defaults(o,c);
a.keyframeOnPauseController=new l(a,b);a.container.appendChild(a.keyframeOnPauseController.el);
return a};r.exports=new k()},{"./KeyframeOnPause/ImageOverlayController":176,"ac-clock":56,"ac-object":157}],176:[function(i,o,j){var l,m=i("ac-event-emitter").EventEmitter,k=i("ac-dom-emitter").DOMEmitter;
var n=function(a,b){this.mediaObject=a;this.options=b;this.active=false;this.el=this._createOverlay();
this._overlaySetTime=null;this._setEventTarget();this._bindEvents()};l=n.prototype;
l.applyOverlay=function(a){a=a||this.mediaObject.currentFrame();var c=this._getImagePath(a),b=this._getContainerDimensions(this.mediaObject.container);
this.el.style.backgroundImage="url("+c+")";this.el.style.backgroundSize=b.width+"px "+b.height+"px";
this.active=true;this.mediaObject.trigger("overlay-applied")};l.removeOverlay=function(){this.el.style.backgroundImage="inherit";
this.active=false;this.mediaObject.trigger("overlay-removed")};l._createOverlay=function(){var a=document.createElement("div");
a.className=this.options.overlayClassName;return a};l._onMetadataLoaded=function(){var a=this.mediaObject.width,b=this.mediaObject.height;
this.el.style.width=a;this.el.style.height=b};l._getContainerDimensions=function(b){b=b||this.mediaObject.container;
var c={width:b.offsetWidth,height:b.offsetHeight},a;if(!c.width||!c.height){a=b.getBoundingClientRect();
c.width=a.width;c.height=a.height}return c};l._getImagePath=function(a){var g=this.options.overlayDirPath,d=this.options.overlayFileType,b=this.options.overlayPrefix,c=this.options.overlayPattern,h=c.length,q=a+"",f=q.length;
while(f<h){q="0"+q;f++}return g+"/"+b+q+"."+d};l._bindEvents=function(){this._eventsTarget.on("timeupdate pause",this._onMediaObjectScrub,this);
this._eventsTarget.on("play",this._onMediaObjectPlay,this);this.options.clock.on("draw",this._clockApplyImageOverlay,this)
};l._setEventTarget=function(){this._eventsTarget=this.mediaObject._mediaEmitter
};l._onMediaObjectPlay=function(){this.removeOverlay()};l._onMediaObjectScrub=function(){this._debounceImageOverlay()
};l._debounceImageOverlay=function(){this._overlaySetTime=Date.now()+this.options.overlayLoadDelay
};l._clockApplyImageOverlay=function(){if(!this.mediaObject._media.paused||!this._overlaySetTime||this._overlaySetTime>Date.now()){return
}this._overlaySetTime=null;this.applyOverlay()};o.exports=n},{"ac-dom-emitter":65}],177:[function(k,j,h){var i=(function(){var a="http://images.apple.com/global/elements/blank.gif";
return a.replace(/global\/.*/,"")}());j.exports=function g(a){if(!!a.match(/(^http(s?))/)){return a
}if(a.match(/^\/(?!\/)/)){a=i+a.replace(/^\//,"");a=a.replace(/(^.+)(\/105\/)/,"$1/")
}return a}},{}],178:[function(o,m,i){var k=o("./MediaObject/Flow");var j=o("./MediaObject/Video");
var l=o("./MediaObject/decorators/KeyframeOnPause");m.exports=function n(d,a,b){b=b||{};
var c=null;if(b.type==="h264"){c=new j(d,a,b)}if(b.type==="flow"){c=new k(d,a,b)
}if(b.keyframeOverlay){c=l.decorate(c,b.keyframeOverlay)}return c}},{"./MediaObject/Flow":170,"./MediaObject/Video":173,"./MediaObject/decorators/KeyframeOnPause":175}],179:[function(d,g,f){g.exports={degrade:"degrade",destroy:"destroy",ended:"ended",enhance:"enhance",errored:"error",loaded:"loaded",loadstart:"loadstart",pause:"pause",play:"play",progress:"progress",ready:"ready",stop:"stop"}
},{}],180:[function(d,g,f){g.exports=d(54)},{}],181:[function(d,g,f){g.exports=d(32)
},{}],182:[function(d,g,f){g.exports={clone:d("./ac-object/clone"),defaults:d("./ac-object/defaults"),extend:d("./ac-object/extend"),getPrototypeOf:d("./ac-object/getPrototypeOf"),isEmpty:d("./ac-object/isEmpty"),toQueryParameters:d("./ac-object/toQueryParameters")}
},{"./ac-object/clone":183,"./ac-object/defaults":184,"./ac-object/extend":185,"./ac-object/getPrototypeOf":186,"./ac-object/isEmpty":187,"./ac-object/toQueryParameters":188}],183:[function(d,g,f){g.exports=d(34)
},{"./extend":185}],184:[function(g,k,h){var i=g("./extend");k.exports=function j(a,b){if(typeof a!=="object"||typeof b!=="object"){throw new TypeError("defaults: must provide a defaults and options object")
}return i({},a,b)}},{"./extend":185}],185:[function(d,g,f){g.exports=d(37)},{}],186:[function(d,g,f){g.exports=d(38)
},{}],187:[function(d,g,f){g.exports=d(40)},{}],188:[function(d,g,f){g.exports=d(42)
},{qs:181}],189:[function(d,g,f){g.exports={DeferredQueue:d("./ac-deferredqueue/DeferredQueue"),Action:d("./ac-deferredqueue/Action")}
},{"./ac-deferredqueue/Action":190,"./ac-deferredqueue/DeferredQueue":191}],190:[function(g,j,h){function k(a,b){if(typeof a!=="function"){throw new TypeError("Deferred Queue func must be a function.")
}this._options=b||{};this._options.delay=this._options.delay||0;this.__func=a}var i=k.prototype;
i.run=function(){var a=this.__func;if(typeof this._options.delay==="number"&&this._options.delay>0){window.setTimeout(function(){a()
},this._options.delay*1000)}else{a()}};j.exports=k},{}],191:[function(m,k,i){var l=m("./Action");
function h(a){this._options=a||{};this._options.autoplay=this._options.autoplay||false;
this._options.asynchronous=this._options.asynchronous||false;this._isPlaying=false;
this._isRunningAction=false;this._queue=[];this.didFinish=this.__didFinish.bind(this)
}var j=h.prototype;j.add=function(b,c){var d={};var a;if(c>0){d.delay=c}a=new l(b,d);
this._queue.push(a);if(!this._isPlaying&&this._options.autoplay===true){this.start()
}else{if(this._isPlaying){this.__runNextAction()}}};j.remove=function(a){this._queue=this._queue.filter(function(b){return b!==a
})};j.start=function(){if(this._isPlaying){return false}this._isPlaying=true;this.__runNextAction()
};j.stop=function(){if(!this._isPlaying){return false}this._isPlaying=false};j.clear=function(){this._queue=[];
this.stop()};j.__didFinish=function(){this._isRunningAction=false;this.__runNextAction()
};j.__runNextAction=function(){if(!this._isPlaying){return false}if(this._queue.length&&!this._isRunningAction){var a=this._queue.shift();
a.run();if(this._options.asynchronous===true){this._isRunningAction=true;return
}this.__runNextAction()}};k.exports=h},{"./Action":190}],192:[function(d,g,f){g.exports=d(32)
},{}],193:[function(d,g,f){g.exports=d(33)},{"./ac-object/clone":194,"./ac-object/create":195,"./ac-object/defaults":196,"./ac-object/extend":197,"./ac-object/getPrototypeOf":198,"./ac-object/isDate":199,"./ac-object/isEmpty":200,"./ac-object/isRegExp":201,"./ac-object/toQueryParameters":202}],194:[function(d,g,f){g.exports=d(34)
},{"./extend":197}],195:[function(d,g,f){g.exports=d(35)},{}],196:[function(d,g,f){g.exports=d(36)
},{"./extend":197}],197:[function(d,g,f){g.exports=d(37)},{}],198:[function(d,g,f){g.exports=d(38)
},{}],199:[function(d,g,f){g.exports=d(39)},{}],200:[function(d,g,f){g.exports=d(40)
},{}],201:[function(d,g,f){g.exports=d(41)},{}],202:[function(d,g,f){g.exports=d(42)
},{qs:192}],203:[function(d,g,f){f.ScrollView=d("./ac-scrollview/ScrollView")},{"./ac-scrollview/ScrollView":210}],204:[function(i,h,g){function f(){}f.prototype={on:function(){return this._parent.on.apply(this._parent,arguments)
},off:function(){return this._parent.off.apply(this._parent,arguments)},trigger:function(){return this._parent.trigger.apply(this._parent,arguments)
},once:function(){return this._parent.once.apply(this._parent,arguments)},setEnabled:function(a){this._parent.setEnabled.apply(this._parent,arguments)
},isEnabled:function(){return this._parent.isEnabled.apply(this._parent,arguments)
}};h.exports=f},{}],205:[function(m,l,n){var j=function(a,b){return Math.max(0,Math.min(a,b))
};var k=function(c,b){var a={x:0,y:0};if(c.x<0){a.x=-c.x}else{if(c.x>b.x){a.x=b.x-c.x
}}if(c.y<0){a.y=-c.y}else{if(c.y>b.y){a.y=b.y-c.y}}return a};var o=function(b,a){b.x=j(b.x,a.x);
b.y=j(b.y,a.y);return b};var i=function(c,d,b){var a=k(d,b);if(a.x!==0){d.x=c.x+((d.x-c.x)*0.5)
}if(a.y!==0){d.y=c.y+((d.y-c.y)*0.5)}return d};l.exports={calculateOverscrollAmount:k,constrainValue:j,constrainToScrollBounds:o,halfInputIfOutsideOfScrollBounds:i}
},{}],206:[function(i,o,j){var k=i("./BaseInputDecorator");var m=4;function l(a){this._parent=a;
this._currentAxis=undefined}var n=l.prototype=new k();n.inputStart=function(d,a,c,b){this._currentAxis=false;
this._firstTouch={x:d,y:a};this._parent.inputStart.apply(this._parent,arguments)
};n.inputMove=function(d,a,c,b){if(!this._currentAxis){if(Math.abs(d-this._firstTouch.x)>m){this._currentAxis="x"
}else{if(Math.abs(a-this._firstTouch.y)>m){this._currentAxis="y"}}}if(this._currentAxis==="x"){a=this._firstTouch.y
}else{if(this._currentAxis==="y"){d=this._firstTouch.x}}this._parent.inputMove.apply(this._parent,arguments)
};n.inputEnd=function(b,a){this._parent.inputEnd.apply(this._parent,arguments)};
o.exports=l},{"./BaseInputDecorator":204}],207:[function(s,t,q){var l=s("./utilities").assign;
var m=s("./Constraints");var n=s("./utilities").fastFivePointPrecision;var o=(1000/60);
var r={friction:{x:0.95,y:0.95},outOfBounds:{deceleration:0.05,acceleration:0.1}};
function u(b){this.options=l({},r,b||{});if(b&&b.friction){var a=b.friction;if(typeof a!=="object"||!("x" in a)||!("y" in a)){throw new TypeError("InertiaCalculator expects custom friction to be an object with numeric x/y properties.")
}}if(b&&b.outOfBounds){var c=b.outOfBounds;if(typeof c!=="object"||!("acceleration" in c)||!("deceleration" in c)){throw new TypeError("InertiaCalculator expects custom outOfBounds coefficients to be an object with numeric acceleration/deceleration properties.")
}}}var p=u.prototype;p.calculateInertiaPositions=function(b,h,a,f,g){var c=[];if(!g){g=this.options.friction
}h={x:h.x*o,y:h.y*o};if(a.x===0){h.x=0}if(a.y===0){h.y=0}while(Math.abs(h.x)>0.01||Math.abs(h.y)>0.01){if(c.length>5000){console.warn("potential loop detected.");
return c}b.x=b.x+h.x;b.y=b.y+h.y;h.x=h.x*g.x;h.y=h.y*g.y;b.x=n(b.x);b.y=n(b.y);
var d=m.calculateOverscrollAmount(b,a);if(d.x!==0){if(d.x*h.x<=0){h.x+=d.x*this.options.outOfBounds.deceleration
}else{h.x=d.x*this.options.outOfBounds.acceleration}}if(d.y!==0){if(d.y*h.y<=0){h.y+=d.y*this.options.outOfBounds.deceleration
}else{h.y=d.y*this.options.outOfBounds.acceleration}}if(f){m.constrainToScrollBounds(b,a)
}c.push({x:b.x,y:b.y,velocity:{x:n(h.x/o),y:n(h.y/o)}})}if(c.length>1){var i=c[c.length-1];
i.x=Math.round(i.x);i.y=Math.round(i.y);m.constrainToScrollBounds(i,a)}return c
};p.calculateInitialVelocity=function(g,d){var f={};var a=1-this.options.friction.x;
var c=1-this.options.friction.y;var h=d.x-g.x;f.x=n((a*h)/o);var b=d.y-g.y;f.y=n((c*b)/o);
return f};p.calculateFrictionToStopAtPoint=function(d,g,f){var c={};var a=Math.abs(f.x-d.x);
c.x=n(1-((Math.abs(g.x)*o)/a));var b=Math.abs(f.y-d.y);c.y=n(1-((Math.abs(g.y)*o)/b));
c.y=Math.min(1,c.y);c.x=Math.min(1,Math.max(0,c.x));c.y=Math.min(1,Math.max(0,c.y));
if(isNaN(c.x)){c.x=0}if(isNaN(c.y)){c.y=0}return c};t.exports=u},{"./Constraints":205,"./utilities":217}],208:[function(o,n,i){var l=o("ac-event-emitter").EventEmitter;
var k=o("ac-clock").Clock;function j(a){this._clock=new k();this._isPlaying=false;
this._scroll=a;this._currentFrameCnt=0;this._accumulatedTime=0;this._currentAnimationDuration=0;
this._clock.on("draw",this._draw,this)}var m=j.prototype=new l();m.stop=function(){if(this._isPlaying){this._clock.stop();
this._isPlaying=false;this.trigger("end")}this._frames=[]};m.isPlaying=function(){return this._isPlaying
};m.getCurrentFrame=function(){return this._currentFrame};m.getNextFrame=function(a){this._accumulatedTime+=a.delta;
var b=Math.round(this._accumulatedTime/(1000/60));this._currentFrame=this._frames[b];
return this._currentFrame};m._draw=function(a){var b=this.getNextFrame(a);if(!this._isPlaying||(this._accumulatedTime>this._currentAnimationDuration)){this._isPlaying=false;
this.trigger("end");this._clock.stop();return}this._scroll.setPosition(b)};m.play=function(a){if(this._isPlaying){return
}this._frames=a;this._isPlaying=true;this._accumulatedTime=0;this._currentFrameCnt=this._frames.length-1;
this._currentFrame=this._frames[0];this._currentAnimationDuration=(this._currentFrameCnt/60)*1000;
this._clock.start()};n.exports=j},{"ac-clock":56}],209:[function(j,q,k){var l=j("./BaseInputDecorator");
var m=45;var n=-m;function p(b,a){this._parent=b;this._axis=a;this._inputs=[];this._startTouchMove=null;
this._shouldPreventDefault=null}var o=p.prototype=new l();o._calculateTouchAngles=function(){var f={x:0,y:0};
var b=this._inputs[this._inputs.length-1];var i=this._inputs[0];var d=b.x-i.x;var g=b.y-i.y;
var h=Math.sqrt(d*d+g*g);if(h===0){return false}var a=Math.asin(g/h);var c=Math.acos(d/h);
f.x=a*(180/Math.PI);f.y=c*(180/Math.PI);f.y-=90;return f};o.inputStart=function(d,a,c,b){this._inputs=[{x:d,y:a}];
this._startTouchMove={x:d,y:a,timeStamp:c,e:b};this._checkToPreventDefault=true;
this._parent.inputStart.apply(this._parent,arguments)};o._angleTest=function(a){return(a<=m&&a>=n)?true:false
};o._preventDefault=function(d,a,c,b){b.preventDefault();this._shouldPreventDefault=true;
this._parent.inputMove.apply(this._parent,arguments)};o.inputMove=function(d,f,c,b){this._inputs[1]={x:d,y:f};
var a=this._calculateTouchAngles();if((this._axis==="y"&&this._angleTest(a.y))||(this._axis==="x"&&this._angleTest(a.x))||(this._axis===true&&(this._angleTest(a.x)||this._angleTest(a.y)))){if(this._shouldPreventDefault!==false){this._preventDefault.apply(this,arguments)
}}else{if(this._shouldPreventDefault===true){this._preventDefault.apply(this,arguments)
}else{this._shouldPreventDefault=false}}};o.inputEnd=function(b,a){this._shouldPreventDefault=true;
this._parent.inputEnd.apply(this._parent,arguments)};q.exports=p},{"./BaseInputDecorator":204}],210:[function(G,M,v){var C=G("./utilities").assign;
var J=G("ac-event-emitter").EventEmitter;var y=G("./InertiaCalculator");var L=G("./input/MouseWheel");
var H=G("./input/MouseDrag");var B=G("./input/Touch");var A=G("./input/Input");
var x=G("./InputPreventDefault");var z=G("./DirectionalLock");var u=G("./model/Scroll");
var K=G("./Transition");var I=G("./Constraints");var E=G("./InertiaPlayer");var F={alwaysBounceHorizontal:false,alwaysBounceVertical:false,bounces:true,directionalLockEnabled:false,mouseDrag:true,mouseWheel:true,preventDefault:true,scrollingEnabled:true,touch:true};
function w(a,b){if(!a||!a instanceof Element){throw new Error("Element required as first argument for constructor.")
}if(!b||b===null||!b.width||!b.height||!b.contentSize){throw new Error("Scroll View requires a second argument, an object, specifying width, height, and contentSize.")
}this.options=C({},F,b);C(this,{_element:a,_width:this.options.width,_height:this.options.height,_contentSize:this.options.contentSize,_isDecelerating:false});
this._scroll=new u();this._inputNormalize=new A(this._scroll);this._inputNormalize.setEnabled(this.options.scrollingEnabled);
if(this.options.preventDefault){this._inputNormalize=new x(this._inputNormalize,this.options.preventDefault)
}if(this.options.directionalLockEnabled){this._inputNormalize=new z(this._inputNormalize)
}this._inputNormalize.on("input_start",this.inputStart,this);this._inputNormalize.on("input_move",this.inputMove,this);
this._inputNormalize.on("input_end",this.inputEnd,this);if(this.options.touch===true){this._touch=new B(this._inputNormalize,a)
}if(this.options.mouseWheel===true){this._mouseWheel=new L(this._inputNormalize,a)
}if(this.options.mouseDrag===true){this._mouseDrag=new H(this._inputNormalize,a)
}this._inertiaCalculator=new y(this.options);this._inertiaPlayer=new E(this._scroll);
this._inertiaPlayer.on("end",function(){this._isDecelerating=false;this.trigger("didEndDecelerating")
},this);this._scroll.propagateTo(this)}var D=w.prototype=new J();D.isDecelerating=function(){return this._isDecelerating
};D._animateToPosition=function(c){var b=this;var a=this.getPosition();this._transition=new K({draw:function(d){b.setPosition({y:a.y+(c.y-a.y)*d,x:a.x+(c.x-a.x)*d})
}});this._transition.play()};D._handleConstraints=function(c){var f=this.getContentSize();
var d=this.getHeight();var a=this.getWidth();var b=this.getScrollDistance();c=I.halfInputIfOutsideOfScrollBounds(this.getPosition(),c,b);
if(!this.options.alwaysBounceHorizontal&&f.height>d&&f.width<=a){c.x=0}if(!this.options.alwaysBounceVertical&&f.width>a&&f.height<=d){c.y=0
}if(this.options.bounces===false){return I.constrainToScrollBounds(c,b)}return c
};D.setScrollingEnabled=function(a){this._inputNormalize.setEnabled(a)};D.isScrollingEnabled=function(){return this._inputNormalize.isEnabled()
};D.getPosition=function(){return this._scroll.getPosition()};D.setPosition=function(d,c){if(c===undefined){this._scroll.setPosition(d);
if(this._inertiaPlayer.isPlaying()){var a=this.getPosition();var b=this._inertiaPlayer.getCurrentFrame();
var f=this._inertiaCalculator.calculateInertiaPositions(a,b.velocity,this.getScrollDistance(),!this.options.bounces);
this._inertiaPlayer.stop();this._inertiaPlayer.play(f)}}else{if(c===false){this._inertiaPlayer.stop();
this._scroll.setPosition(d)}else{this._inertiaPlayer.stop();this._animateToPosition(d)
}}};D.inertialScrollTo=function(d,c){if(this._inertiaPlayer.isPlaying()){this._inertiaPlayer.stop()
}var a=this.getPosition();var f=I.calculateOverscrollAmount(a,this.getScrollDistance());
if(f.x!==0){c.x=0.1}if(f.y!==0){c.y=0.1}var b=this._inertiaCalculator.calculateFrictionToStopAtPoint(this.getPosition(),c,d);
var g=this._inertiaCalculator.calculateInertiaPositions(a,c,this.getScrollDistance(),!this.options.bounces,b);
this._inertiaPlayer.play(g)};D.setHeight=function(a){this._height=a};D.setWidth=function(a){this._width=a
};D.getHeight=function(){return this._height};D.getWidth=function(){return this._width
};D.setContentSize=function(a){this._contentSize.height=a.height;this._contentSize.width=a.width;
return this};D.getContentSize=function(){return this._contentSize};D.getScrollYDistance=function(){var a=this._contentSize.height-this._height;
if(a<0){a=0}return a};D.getScrollXDistance=function(){var a=this._contentSize.width-this._width;
if(a<0){a=0}return a};D.getScrollDistance=function(){return{x:this.getScrollXDistance(),y:this.getScrollYDistance()}
};D.inputStart=function(a){this._tracking=false;this._isDecelerating=false;this._inertiaPlayer.stop();
this.trigger("inputStart",a)};D.inputMove=function(a){if(!this._tracking){this._tracking=true;
this.trigger("willBeginTracking")}if(a&&a.originalEvent&&a.originalEvent.type==="mousewheel"){a=I.constrainToScrollBounds(a,this.getScrollDistance())
}a=this._handleConstraints(a);this._scroll.setPosition({x:a.x,y:a.y,timeStamp:a.timeStamp,originalEvent:a.originalEvent})
};D.inputEnd=function(c){var g=c.velocity;var b=this.getPosition();var d=this.getScrollDistance();
var i=I.calculateOverscrollAmount(b,d);var a=this._inertiaCalculator.calculateInitialVelocity(i,{x:0,y:0});
if(this._contentSize.width===this._width&&!this.options.alwaysBounceHorizontal){g.x=0
}else{if(this._contentSize.height===this._height&&!this.options.alwaysBounceVertical){g.y=0
}}if(g.x===0&&i.x!==0){g.x=a.x}if(g.y===0&&i.y!==0){g.y=a.y}if(g.x===0&&g.y===0){this.trigger("didEndTracking",false);
this.trigger("willEndTracking",{velocity:g,targetPosition:b,originalEvent:c.originalEvent})
}else{var f=this._inertiaCalculator.calculateInertiaPositions(b,g,this.getScrollDistance(),!this.options.bounces);
var h=f[f.length-1];this.trigger("willEndTracking",{velocity:g,targetPosition:h,originalEvent:c.originalEvent});
this.trigger("didEndTracking",true);this._isDecelerating=true;this.trigger("willBeginDecelerating");
this._inertiaPlayer.play(f)}};M.exports=w},{"./Constraints":205,"./DirectionalLock":206,"./InertiaCalculator":207,"./InertiaPlayer":208,"./InputPreventDefault":209,"./Transition":211,"./input/Input":212,"./input/MouseDrag":213,"./input/MouseWheel":214,"./input/Touch":215,"./model/Scroll":216,"./utilities":217}],211:[function(q,r,o){var k=q("./utilities").assign;
var p={duration:350};var l=function(b,c,d,a){b/=a/2;if(b<1){return d/2*b*b+c}b--;
return -d/2*(b*(b-2)-1)+c};var s=function(b,c,d,a){b/=a;return -d*b*(b-2)+c};function m(a){k(this,p,a);
if(!a.draw){throw new Error("no draw function specified")}}var n=m.prototype;n.update=function(a){if(!this.startTime){this.startTime=a
}var b=(a-this.startTime)/this.duration;var c=l(b,0,1,1);if(b<1){this.draw(c);this._raf=window.requestAnimationFrame(this.update.bind(this))
}else{this.draw(1)}};n.play=function(){window.requestAnimationFrame(this.update.bind(this))
};n.stop=function(){window.cancelAnimationFrame(this._raf)};r.exports=m},{"./utilities":217}],212:[function(i,o,j){var m=i("ac-event-emitter").EventEmitter;
var k=i("../utilities").fastFivePointPrecision;function l(a){this._startingInputPosition=null;
this._lastInputPosition=null;this._inputPositions=[];this._scroll=a;this._enabled=true
}var n=l.prototype=new m();n._addPosition=function(b){this._inputPositions.push(b);
var a=Date.now();if(this._inputPositions.length>=3&&(a-this._inputPositions[0].timeStamp>100)){this._inputPositions.shift()
}};n._pruneOldPositions=function(){var a=Date.now();this._inputPositions=this._inputPositions.filter(function(b){if(a-b.timeStamp<100){return b
}})};n._calculateVelocity=function(){var b={x:0,y:0};this._pruneOldPositions();
if(this._inputPositions.length<2){return b}var a=this._inputPositions[0];var d=this._inputPositions[this._inputPositions.length-1];
var c=(d.timeStamp-a.timeStamp);b.x=-(d.x-a.x)/c;b.y=-(d.y-a.y)/c;b.x=k(b.x);b.y=k(b.y);
return b};n.setEnabled=function(a){this._enabled=a};n.isEnabled=function(){return this._enabled
};n.inputStart=function(f,a,c,d){if(!this._enabled){return}var b={x:f,y:a,timeStamp:c};
this._addPosition(b);this._startingInputPosition=b;this.trigger("input_start",{timeStamp:c,originalEvent:d})
};n.inputMove=function(f,g,b,d){if(!this._enabled){return}var a={x:f,y:g,timeStamp:b};
this._addPosition(a);this._lastInputPosition=a;var c=this.getScrollValues();this.trigger("input_move",{x:c.x,y:c.y,timeStamp:b,originalEvent:d})
};n.inputEnd=function(a,b){if(!this._enabled){return}this.trigger("input_end",{lastInputPosition:this._lastInputPosition,timeStamp:a,originalEvent:b,velocity:this._calculateVelocity()});
this._positions=[];this._lastInputPosition=null;this._startingInputPosition=null
};n.getScrollValues=function(){var a=this._inputPositions[this._inputPositions.length-2];
var b=this._scroll.getPosition();return{x:(a.x-this._lastInputPosition.x)+b.x,y:(a.y-this._lastInputPosition.y)+b.y}
};o.exports=l},{"../utilities":217}],213:[function(g,k,h){var i=g("ac-dom-emitter").DOMEmitter;
function j(b,a){this._input=b;this._element=a;this._domEmitter=new i(a);a.style.webkitUserSelect="none";
this.bindDOMEvents()}j.prototype={bindDOMEvents:function(){var d=this._input;var b=this._element;
var c=this;var a=function(m){d.inputMove(m.pageX,m.pageY,m.timeStamp,m)};var f=function(m){if(m.type==="mouseout"&&b.contains(m.relatedTarget)){return
}c._domEmitter.off("mousemove",a);c._domEmitter.off("mouseup",f);c._domEmitter.off("mouseout",f);
d.inputEnd(m.timeStamp,m)};c._domEmitter.on("mousedown",function(m){if(m.target.tagName.match(/input|textarea|select/i)){return
}d.inputStart(m.pageX,m.pageY,m.timeStamp,m);c._domEmitter.on("mousemove",a);c._domEmitter.on("mouseup",f);
c._domEmitter.on("mouseout",f)})}};k.exports=j},{"ac-dom-emitter":65}],214:[function(l,k,m){var j=l("ac-dom-emitter").DOMEmitter;
var h=l("../utilities").assign;function i(b,a){this._inputController=b;this._element=a;
this._domEmitter=new j(a);this._scrollTop=0;this._scrollLeft=0;this._timeout=null;
this._hasStarted=false;this._boundMouseWheelComplete=this.mouseWheelComplete.bind(this);
this._lastEvent=null;this._velocities=[];this.bindDOMEvents()}i.prototype={mouseWheelComplete:function(){this._scrollTop=0;
this._scrollLeft=0;this._hasStarted=false;this._inputController.inputEnd(new Date().getTime(),this._lastEvent);
this._lastEvent=null},onMouseWheel:function(a){var c;var d;var b;if(this._hasStarted===false){this._inputController.inputStart(this._scrollLeft,this._scrollTop,a.timeStamp,a);
this._hasStarted=true}c=this._scrollTop+a.wheelDeltaY;d=this._scrollLeft+a.wheelDeltaX;
this._lastEvent=h({},a);this._scrollTop=c;this._scrollLeft=d;this._inputController.inputMove(this._scrollLeft,this._scrollTop,a.timeStamp,a);
window.clearTimeout(this._timeout);this._timeout=window.setTimeout(this._boundMouseWheelComplete,100)
},bindDOMEvents:function(){this._domEmitter.on("mousewheel",this.onMouseWheel.bind(this))
}};k.exports=i},{"../utilities":217,"ac-dom-emitter":65}],215:[function(k,j,h){var i=k("ac-dom-emitter").DOMEmitter;
function g(b,a){this._input=b;this._element=a;this._domEmitter=new i(a);this.bindDOMEvents()
}g.prototype={bindDOMEvents:function(){var b=this._input;var a=this._element;this._domEmitter.on("touchstart",function(c){if(c.touches&&c.touches[0]&&c.touches[0].target&&c.touches[0].target.tagName.match(/input|textarea|select/i)){return
}b.inputStart(c.pageX,c.pageY,c.timeStamp,c)});this._domEmitter.on("touchmove",function(c){b.inputMove(c.pageX,c.pageY,c.timeStamp,c)
});this._domEmitter.on("touchend touchcancel",function(c){b.inputEnd(c.timeStamp,c)
})}};j.exports=g},{"ac-dom-emitter":65}],216:[function(h,m,i){var k=h("ac-event-emitter").EventEmitter;
function j(){this.x=0;this.y=0}var l=j.prototype=new k();l.setPosition=function(a){if(a.x===this.x&&a.y===this.y){return
}this.x=a.x;this.y=a.y;this.trigger("scroll",{x:this.x,y:this.y,originalEvent:a.originalEvent})
};l.getPosition=function(){return{x:this.x,y:this.y}};m.exports=j},{}],217:[function(l,k,m){var h=function(b,c){var a=Math.pow(10,c);
return ~~(b*a)/a};var j=function(a){return h(a,5)};var i=function(p,a){var f=function(n){if(typeof n!=="object"||n===null||n===undefined){throw new TypeError("assign: target and sources must be objects")
}return n};var g=function(n){p[n]=c[n]};p=f(p);var c;for(var d=1,b=arguments.length;
d<b;d++){c=f(arguments[d]);Object.keys(c).forEach(g)}return p};k.exports={assign:i,fastFivePointPrecision:j,fastPrecision:h}
},{}],218:[function(d,g,f){g.exports.Smoother=d("./smoother/Smoother")},{"./smoother/Smoother":219}],219:[function(i,h,f){h.exports=g;
function g(a){a=a||this.sampling;this.pool=new Array(a);this.raw=0;this.value=0
}g.prototype.sampling=3;g.prototype.smooth=function(d,a){var b=0;var l=this.pool.length;
if(typeof this.pool[l-this.sampling]!=="undefined"){for(var c=this.sampling;c>0;
c--){b+=this.pool[l-c]}b+=d;b/=(this.sampling+1)}else{b=d}if(!a){this.raw=d;this._track(b,true)
}return b};g.prototype._track=function(a,b){if(b){this.value=a}else{this.raw=this.value=a
}this.pool.push(a);this.pool.shift()}},{}],220:[function(d,g,f){g.exports.WindowDelegate=d("./window-delegate/WindowDelegate");
g.exports.windowEmitter=d("./window-delegate/windowEmitter")},{"./window-delegate/WindowDelegate":221,"./window-delegate/windowEmitter":222}],221:[function(m,k,i){var j;
var h=m("./windowEmitter");function l(){this._emitter=h;this._setWindowDimensionValues();
try{this._setScrollValues()}catch(a){}this.on("resize",this._setWindowDimensionValues.bind(this));
this.on("scroll",this._setScrollValues.bind(this));this.on("touchstart",this._touchScrollStart.bind(this));
this.on("touchend",this._setZoomValues.bind(this))}j=l.prototype;j.on=function(){this._emitter.on.apply(this._emitter,arguments);
return this};j.once=function(){this._emitter.once.apply(this._emitter,arguments);
return this};j.off=function(){this._emitter.off.apply(this._emitter,arguments);
return this};j.has=function(){return this._emitter.has.apply(this._emitter,arguments)
};j.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};j.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};j.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};j.isZoomed=function(){return this.clientWidth>this.innerWidth};j._setWindowDimensionValues=function(){this.clientWidth=document.documentElement.clientWidth;
this.clientHeight=document.documentElement.clientHeight;this.innerWidth=window.innerWidth||this.clientWidth;
this.innerHeight=window.innerHeight||this.clientHeight};j._setZoomValues=function(){var a=this.innerWidth;
this.innerWidth=window.innerWidth;if(a!==this.innerWidth){this.innerHeight=window.innerHeight;
this.trigger("zoom");if(a<this.innerWidth){this.trigger("zoomIn")}else{this.trigger("zoomOut")
}}else{setTimeout(this._setZoomValues.bind(this),500)}};j._updateScrollX=function(){this.scrollX=(window.pageXOffset!==undefined)?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft;
this.maxScrollX=document.body.scrollWidth-this.innerWidth;return this.scrollX};
j._updateScrollY=function(){this.scrollY=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
this.maxScrollY=document.body.scrollHeight-this.innerHeight;return this.scrollY
};j._setScrollValues=function(){var a=this.scrollX,b=this.scrollY;this._updateScrollX();
this._updateScrollY();if(this.scrollX!==a){this.trigger("scrollX")}if(this.scrollY!==b){this.trigger("scrollY")
}this._scrollStop()};j._scrollStop=function(){if(typeof window.ontouchstart==="undefined"){if(this._scrollStopTimer){clearTimeout(this._scrollStopTimer)
}this._scrollStopTimer=setTimeout(function(){clearTimeout(this._scrollStopTimer);
this.trigger("scrollStop")}.bind(this),300)}};j._touchScrollStart=function(){this._updateScrollX();
this._updateScrollY();this.once("touchend",this._touchScrollStop.bind(this,this.scrollX,this.scrollY))
};j._touchScrollStop=function(b,c,a){this._updateScrollX();this._updateScrollY();
if(b!==this.scrollX||c!==this.scrollY){setTimeout(this._touchScrollStop.bind(this,this.scrollX,this.scrollY,true),300)
}else{if(a){this.trigger("scrollStop")}}};k.exports=new l()},{"./windowEmitter":222}],222:[function(f,i,g){var h=f("ac-dom-emitter").DOMEmitter;
i.exports=new h(window)},{"ac-dom-emitter":65}],223:[function(d,g,f){g.exports.ScrollTimeUpdate=d("./scroll-time-update/ScrollTimeUpdate");
g.exports.ElementScrollTimeUpdate=d("./scroll-time-update/ElementScrollTimeUpdate")
},{"./scroll-time-update/ElementScrollTimeUpdate":224,"./scroll-time-update/ScrollTimeUpdate":225}],224:[function(o,l,i){var m=o("./ScrollTimeUpdate"),n=o("window-delegate").WindowDelegate;
var k;var j=function(a,b){b=b||{};this.el=a;this._updateOnResize=false;m.call(this,0,0,b);
this.setOffsets();this._clock.on("update",this._onResizeClockUpdate,this);this._clock.on("draw",this._onResizeClockDraw,this);
n.on("resize orientationchange",this._onResize,this)};k=j.prototype=new m(null);
k.setOffsets=function(){var b=this.el.getBoundingClientRect(),c=n.scrollY,a=b.top+c,d=b.bottom+c;
if(this.options.startInView){a=a-n.innerHeight}if(typeof this.options.offsetTop==="function"){a=a+this.options.offsetTop()
}else{if(typeof this.options.offsetTop==="number"){a=a+this.options.offsetTop}}if(typeof this.options.offsetBottom==="function"){d=d-this.options.offsetBottom()
}else{if(typeof this.options.offsetBottom==="number"){d=d-this.options.offsetBottom
}}this.min=a;this.max=d;this._distance=this.max-this.min;return this};k._onResize=function(){this._updateOnResize=true
};k._onResizeClockUpdate=function(){if(!this._updateOnResize){return}this.setOffsets()
};k._onResizeClockDraw=function(){if(!this._updateOnResize){return}this.setCurrentTime();
this._updateOnResize=false};l.exports=j},{"./ScrollTimeUpdate":225,"window-delegate":220}],225:[function(s,t,r){var q,m=s("ac-event-emitter").EventEmitter,u=s("ac-clock"),l=s("window-delegate").WindowDelegate,o=s("smoother").Smoother,n=s("ac-dom-emitter").DOMEmitter;
var p=function(c,b,a){if(c===null){return}m.call(this);this.options=a||{};this.min=c;
this.max=b;this._distance=b-c;this._clock=this.options.clock||u;this._emitter=l;
this._lastTime=null;this._timeObj=null;if(this.options.el){this._target=this.options.el;
this._emitter=new n(this.options.el)}this._shouldUpdate=false;this._shouldDraw=false;
this._didInitializeSmoothing=false;this._emitter.on("scroll",this._debounceTimeUpdate,this);
this._clock.on("update",this._onClockUpdate,this);this._clock.on("draw",this._onClockDraw,this);
if(this.options.smooth){this._enableSmoothing(true)}};q=p.prototype=new m(null);
q.setCurrentTime=function(b,a){b=b||this._getCalculatedCurrentTime();if(b===this._lastTime){return
}this._timeObj={time:b,lastTime:this._lastTime};this._triggerUpdate();if(a){this._triggerDraw()
}else{this._shouldDraw=true}this._lastTime=b};q.start=function(){this._clock.start()
};q.stop=function(){this._clock.stop()};q.setSmoothing=function(a){if(typeof a!=="boolean"){return
}if(a){this._enableSmoothing();return}this._disableSmoothing()};q._getCalculatedCurrentTime=function(){var d=l.scrollY,a=this.min,b=this.max,c=this._distance;
if(this._target){d=this._target.scrollTop}if(d<a){d=a}if(d>b){d=b}return(d-a)/(c)
};q._debounceTimeUpdate=function(){this._shouldUpdate=true};q._triggerUpdate=function(){this.trigger("_update",this._timeObj);
if(!this.options.smooth){this.trigger("update",this._timeObj)}};q._triggerDraw=function(){this.trigger("_draw",this._timeObj);
if(!this.options.smooth){this.trigger("draw",this._timeObj)}};q._onClockUpdate=function(){if(!this._shouldUpdate){return
}this.setCurrentTime();this._shouldUpdate=false};q._onClockDraw=function(){if(!this._shouldDraw){return
}this._triggerDraw();this._shouldDraw=false};q._initializeSmoothing=function(){this.options.smoothingPrecision=this.options.smoothingPrecision||4;
this.options.smoothingPoolSize=this.options.smoothingPoolSize||o.prototype.sampling;
this._smoother=new o(this.options.smoothingPoolSize);this._smoothedValues=this._lastSmoothedValues=this._lastUpdateEvent={time:null,lastTime:null};
this._didUpdateSmootherTrack=false;this._shouldUpdateAndDraw=false;this._didInitializeSmoothing=true
};q._enableSmoothing=function(a){if(!this._didInitializeSmoothing){this._initializeSmoothing()
}if(!this.options.smooth||a){this.on("_update",this._updateSmoothing,this);this._clock.on("update",this._smoothOnUpdate,this);
this._clock.on("draw",this._smoothOnDraw,this);this.options.smooth=true}};q._disableSmoothing=function(){this.off("_update",this._updateSmoothing,this);
this._clock.off("update",this._smoothOnUpdate,this);this._clock.off("draw",this._smoothOnDraw,this);
this.options.smooth=false};q._updateSmoothing=function(a){a.lastTime=a.lastTime||0;
this._lastUpdateEvent=a;this._didUpdateSmootherTrack=true};q._smoothOnUpdate=function(){var b=(this._didUpdateSmootherTrack||this._lastSmoothedValues.time!==this._smoothedValues.time||this._lastSmoothedValues.lastTime!==this._smoothedValues.lastTime);
if(!b){this._shouldUpdateAndDraw=false;return}this._didUpdateSmootherTrack=false;
var c=this._lastUpdateEvent.lastTime,a={};a.lastTime=this._smoothedValues.time;
a.time=this._smoother.smooth(this._lastUpdateEvent.time);if(a.lastTime===null){a.lastTime=parseFloat(c.toFixed(this.options.smoothingPrecision))
}a.time=parseFloat(a.time.toFixed(this.options.smoothingPrecision));a.lastTime=a.lastTime;
this._lastSmoothedValues=this._smoothedValues;this._smoothedValues=a;this._shouldUpdateAndDraw=true;
this.trigger("update",this._smoothedValues)};q._smoothOnDraw=function(a){if(!this._shouldUpdateAndDraw){return
}this.trigger("draw",this._smoothedValues);this._shouldUpdateAndDraw=false};t.exports=p
},{"ac-clock":56,"ac-dom-emitter":65,smoother:218,"window-delegate":220}],226:[function(d,g,f){g.exports.createAmbient=d("./factories/createAmbient");
g.exports.createBasicPlayer=d("./factories/createBasicPlayer");g.exports.createClickToPlay=d("./factories/createClickToPlay");
g.exports.createGrabber=d("./factories/createGrabber");g.exports.createScrubOnScroll=d("./factories/createScrubOnScroll")
},{"./factories/createAmbient":244,"./factories/createBasicPlayer":245,"./factories/createClickToPlay":246,"./factories/createGrabber":247,"./factories/createScrubOnScroll":248}],227:[function(q,o,j){var k=q("ac-object");
var p=q("../utils/destroy");var n;var l={};function m(a,b,c){this.options=k.defaults(l,c||{});
this.mediaObject=a;if(b&&this.View){this.view=new this.View(b,this.options)}this._setupMediaObjectListeners()
}n=m.prototype={};n.View=q("./Controller/View");n.destroy=function(){p(this,false)
};n._setupMediaObjectListeners=function(){this.mediaObject.on("play",this._onPlay,this);
this.mediaObject.on("ended",this._onEnded,this);this.mediaObject.on("pause",this._onPause,this);
this.mediaObject.on("stop",this._onStop,this);this.mediaObject.on("timeupdate",this._onTimeupdate,this);
this.mediaObject.once("loadstart",this._onLoadstart,this);this.mediaObject.once("loaded",this._onLoad,this);
this.mediaObject.once("ready",this._onReady,this)};n._onPlay=function(){};n._onEnded=function(){};
n._onPause=function(){};n._onStop=function(){};n._onTimeupdate=function(){};n._onLoadstart=function(){};
n._onLoad=function(){};n._onReady=function(){};o.exports=m},{"../utils/destroy":249,"./Controller/View":232,"ac-object":193}],228:[function(q,o,j){var k=q("ac-object");
var m=q("../Controller");var n;var l={behavior:"play",stopableWhilePlaying:true,disableWhilePlaying:false};
function p(a,b,c){m.call(this,a,b,k.defaults(l,c||{}));this.view.on("click",this._onTriggerClicked,this);
if(this.options.behavior==="stop"||this.options.behavior==="pause"){this.view.disable()
}}n=p.prototype=k.create(m.prototype);n.View=q("./View/Trigger");n._onTriggerClicked=function(a){if(this.options.behavior==="play"){if(this.view.active&&this.options.stopableWhilePlaying){this.mediaObject.stop()
}else{this.mediaObject.play()}}else{if(this.options.behavior==="stop"){this.mediaObject.stop()
}else{if(this.options.behavior==="pause"){this.mediaObject.pause()}}}};n._reset=function(){this.view.deactivate();
this.view.enable()};n._setupMediaObjectListeners=function(){this.mediaObject.on("play",this._onPlay,this);
this.mediaObject.on("pause",this._onPause,this);this.mediaObject.on("ended",this._onEnded,this);
this.mediaObject.on("stop",this._onStop,this)};n._onPlay=function(){if(this.options.behavior==="play"){this.view.activate()
}else{if(this.options.behavior==="pause"){this.view.deactivate()}}if(this.options.disableWhilePlaying){this.view.disable()
}else{if(this.options.behavior==="stop"||this.options.behavior==="pause"){this.view.enable()
}}};n._onPause=function(){if(this.options.behavior==="play"){this.view.removeReplayState();
this.view.deactivate();this.view.enable()}else{if(this.options.behavior==="pause"){this.view.activate()
}}};n._onStop=function(){this._onEnded()};n._onEnded=function(){if(this.options.behavior==="play"){this.view.addReplayState();
this.view.enable()}else{if(this.options.behavior==="stop"||this.options.behavior==="pause"){this.view.disable()
}else{this.view.enable()}}this.view.deactivate()};o.exports=p},{"../Controller":227,"./View/Trigger":234,"ac-object":193}],229:[function(u,w,q){var s=u("ac-object");
var o=u("ac-base").Element;var r=u("ac-scrollview").ScrollView;var n=u("../Controller");
var v=u("ac-clock");var p;var t={continuous:true,speed:0.25,direction:1,mouseWheel:false,mouseDrag:true,friction:0.88,bounces:false,clock:v};
function m(b,c,a){n.call(this,b,c,s.defaults(t,a||{}));this._value=null;this._setupScrollView();
this._trackScrollView();this._setupClock()}p=m.prototype=s.create(n.prototype);
p.View=u("./View/Grabbable");p._setupMediaObjectListeners=function(){};p._setupScrollView=function(){var a=o.getBoundingBox(this.view.element);
this._totalDistance=a.width*(1/this.options.speed);this._scrollview=new r(this.view.element,{contentSize:{width:this._totalDistance*2,height:a.height},friction:{x:this.options.friction,y:0.95},width:this._totalDistance,height:this._totalDistance,mouseWheel:this.options.mouseWheel,mouseDrag:this.options.mouseDrag,preventDefault:true,bounces:!this.options.continuous&&this.options.bounces});
this._scrollview.setPosition({x:this._totalDistance,y:0})};p._trackScrollView=function(){this._scrollview.on("willBeginTracking",function(a){this.view.setGrabbing(true)
},this);this._scrollview.on("didEndTracking",function(a){this.view.setGrabbing(false)
},this);this._scrollview.on("scroll",this._onScroll,this)};p._setupClock=function(){if(!this.options.clock.isRunning()){this.options.clock.start()
}this.options.clock.on("draw",this._draw,this)};p._onScroll=function(a){if(a.x>=this._totalDistance||a.x<=0){if(this.options.continuous){this._scrollview.setPosition({x:(this._totalDistance/2),y:0})
}else{}}this._value=(a.x%(this._totalDistance/2))/(this._totalDistance/2);this._value=(this.options.direction<0)?1-this._value:this._value
};p._draw=function(a){if(this._value!==null){this.mediaObject.goToDurationPercent(this._value)
}this._value=null};w.exports=m},{"../Controller":227,"./View/Grabbable":233,"ac-base":false,"ac-clock":56,"ac-object":193,"ac-scrollview":203}],230:[function(u,v,q){var o=u("ac-base").Element;
var s=u("ac-object");var w=u("scroll-time-update").ElementScrollTimeUpdate;var n=u("../Controller");
var m=u("window-delegate").WindowDelegate;var p;var t={reversed:false,smooth:true,startInView:false,offsetTop:false,offsetBottom:false};
function r(b,a){this.tracker=null;n.call(this,b,null,s.defaults(t,a||{}))}p=r.prototype=s.create(n.prototype);
p.View=null;p.start=function(){this.tracker.on("draw",this._draw,this);this.tracker.start()
};p.stop=function(){this.tracker.off("draw",this._draw);this.tracker.stop()};p.setSmoothing=function(a){this.options.smooth=!!a;
if(this.tracker){this.tracker.setSmoothing(this.options.smooth)}};p.setOffsets=function(b,a){if(this.tracker){b=this._parseOffset(b);
a=this._parseOffset(a);if(b){this.tracker.options.offsetTop=b}if(a){this.tracker.options.offsetBottom=a
}this.tracker.setOffsets();this.tracker.setCurrentTime(null,true)}};p._parseOffset=function(b){var c;
var a;if(typeof b==="number"||typeof b==="function"){return b}else{if(typeof b==="string"){if(/\%$/.test(b)){b=(parseFloat(b,10)/100);
a=function(){c=o.getBoundingBox(this).height;return c}.bind(this.mediaObject.view.container);
m.on("resize orientationchange",a);a();return function(){return b*c}}else{if(/vh$/.test(b)){b=(parseFloat(b,10)/100);
return function(){return b*m.innerHeight}}}}}return false};p._setupMediaObjectListeners=function(){if(this.mediaObject.ready){this._onReady()
}else{this.mediaObject.once("ready",this._onReady,this)}};p._onReady=function(){var a=s.clone(this.options);
a.startInView=!a.startInView;a.offsetTop=this._parseOffset(a.offsetTop);a.offsetBottom=this._parseOffset(a.offsetBottom);
this.tracker=new w(this.mediaObject.container,a);this.start()};p._draw=function(a){if(this.options.reversed){this.mediaObject.goToDurationPercent(1-a.time)
}else{this.mediaObject.goToDurationPercent(a.time)}};v.exports=r},{"../Controller":227,"ac-base":false,"ac-object":193,"scroll-time-update":223,"window-delegate":263}],231:[function(q,r,n){var o=q("ac-object");
var s=q("ac-element-engagement");var l=q("../Controller");var m;var p={reversed:false,timeToEngage:500};
function k(a,b){l.call(this,a,null,o.defaults(p,b||{}))}m=k.prototype={};m.destroy=function(){this.tracker.off();
l.prototype.destroy.call(this)};m._setupMediaObjectListeners=function(){if(this.mediaObject.ready){this._onReady()
}else{this.mediaObject.once("ready",this._onReady,this)}};m._onReady=function(){this.tracker=s.addElement(this.mediaObject.container);
if(!s.tracking){s.start()}this.tracker.once("engaged",this._onEngaged,this)};m._onEngaged=function(){if(this.options.reversed){this.mediaObject.setTime(this.mediaObject.duration);
this.mediaObject.setPlaybackRate(-1)}this.mediaObject.play();this.tracker.once("exitview",this._onExitView,this)
};m._onExitView=function(){this.mediaObject.stop()};r.exports=k},{"../Controller":227,"ac-element-engagement":78,"ac-object":193}],232:[function(s,t,p){var n=s("ac-base").Element;
var q=s("ac-object");var m=s("../../utils/destroy");var l=s("ac-event-emitter").EventEmitter;
var o;var r={stateNameActive:"renderplayer-active",stateNameDisabled:"renderplayer-disabled",stateNameReplay:"renderplayer-replay"};
function u(a,b){this.options=q.defaults(r,b||{});this.element=n.getElementById(a);
if(this.element===null){throw"RenderPlayer.Controller.View: Incorrect view element reference."
}}o=u.prototype=new l();o.addReplayState=function(){n.addClassName(this.element,this.options.stateNameReplay)
};o.removeReplayState=function(){n.removeClassName(this.element,this.options.stateNameReplay)
};o.activate=function(){this.active=true;n.addClassName(this.element,this.options.stateNameActive)
};o.deactivate=function(){this.active=false;n.removeClassName(this.element,this.options.stateNameActive)
};o.disable=function(){this.disabled=true;n.addClassName(this.element,this.options.stateNameDisabled)
};o.enable=function(){this.disabled=false;n.removeClassName(this.element,this.options.stateNameDisabled)
};o.destroy=function(){m(this)};t.exports=u},{"../../utils/destroy":249,"ac-base":false,"ac-object":193}],233:[function(r,s,o){var m=r("ac-base").Element;
var p=r("ac-object");var l=r("../View");var q={};function k(a,b){l.call(this,a,p.defaults(q,b||{}));
m.addClassName(this.element,"renderplayer-grabbable")}var n=k.prototype=p.create(l.prototype);
n.setGrabbing=function(a){if(a){m.addClassName(document.body,"renderplayer-grabbing")
}else{m.removeClassName(document.body,"renderplayer-grabbing")}};s.exports=k},{"../View":232,"ac-base":false,"ac-object":193}],234:[function(u,v,r){var p=u("ac-base").Element;
var n=u("ac-base").Function;var w=u("ac-base").Event;var s=u("ac-object");var o=u("../View");
var t={};function m(b,a){o.call(this,b,s.defaults(t,a||{}));this._boundOnClick=n.bindAsEventListener(this._onClick,this);
p.addEventListener(this.element,"click",this._boundOnClick)}var q=m.prototype=s.create(o.prototype);
q._onClick=function(a){w.stop(a);if(!this._disabled){this.trigger("click",a)}};
v.exports=m},{"../View":232,"ac-base":false,"ac-object":193}],235:[function(h,k,i){var l=h("../utils/destroy");
var j;function m(c,a,b){this.mediaObject=c;this.enhanceFunc=a;this.options=b||{};
this.mediaObject.once("enhance",this._onEnhance,this);this._loadedCheck()}j=m.prototype={};
j._enhance=function(){if(this.options.autoEnhance===false){return}if(!this.mediaObject.view.enhanced){this.mediaObject.enhance()
}};j.destroy=function(){l(this,false)};j._loadedCheck=function(){if(this.mediaObject.ready){this._onReady()
}else{this.mediaObject.load();this.mediaObject.once("ready",this._onReady,this)
}};j._onEnhance=function(){this.mediaObject.off("ready",this._onReady,this);this.enhanceFunc();
this.mediaObject.trigger("enhanced");this.destroy()};j._onReady=function(){this._enhance()
};k.exports=m},{"../utils/destroy":249}],236:[function(p,q,n){var o=p("ac-object");
var k=p("../../utils/destroy");var s=p("ac-element-engagement");var l=p("../Enhancer");
var m;function r(c,a,b){l.apply(this,arguments)}m=r.prototype=o.create(l.prototype);
m._inViewCheck=function(){if(this.mediaObject&&!this.mediaObject.view.enhanced){this.tracker=s.addElement(this.mediaObject.container);
if(!s.tracking){s.start()}s.refreshElementState(this.tracker);if(!this.tracker.inView){this._enhance()
}else{this.tracker.once("exitview",this._enhance,this)}}};m._onReady=function(){this._inViewCheck()
};q.exports=r},{"../../utils/destroy":249,"../Enhancer":235,"ac-element-engagement":78,"ac-object":193}],237:[function(m,l,i){var k;
function h(){this._active=null}k=h.prototype;k.add=function(a){a._originalPlayMethod=a.play;
a.play=this.play.bind(this,a)};k.play=function(a){if(a){this._play(a)}};k._play=function(a){if(this._active!==a){this.stop()
}this._active=a;if(!this._active._originalPlayMethod){this.add(this._active)}this._active._originalPlayMethod.call(this._active);
this._active.once("pause",this.stop,this);this._active.once("stop",this.stop,this);
this._active.once("ended",this.stop,this)};k.stop=function(a){if(this._active){this._active.off("pause",this.stop);
this._active.off("stop",this.stop);this._active.off("ended",this.stop);if(a===undefined){this._active.stop()
}}this._active=null};var j=new h();j.PlayController=h;l.exports=j},{}],238:[function(r,s,p){var q=r("ac-object");
var k=r("ac-deferredqueue").DeferredQueue;var l=r("../PlayController").PlayController;
var n;function m(){l.call(this);this.deferredQueue=new k({autoplay:true,asynchronous:true})
}n=m.prototype=q.create(l.prototype);n._play=function(a){a.once("play",this._onPlay,this);
this.deferredQueue.add(a._originalPlayMethod.bind(a))};n._onPlay=function(a){this._active=a;
this._active.once("pause",this.stop,this);this._active.once("stop",this.stop,this);
this._active.once("ended",this.stop,this)};n.stop=function(a){l.prototype.stop.call(this,a);
this.deferredQueue.didFinish()};var o=new m();o.QueuedPlayController=m;s.exports=o
},{"../PlayController":237,"ac-deferredqueue":189,"ac-object":193}],239:[function(i,h,g){h.exports=function f(a){if(a!==null){a.container.classList.add("renderplayer-canplay");
return true}return false}},{}],240:[function(f,i,g){var h=f("ac-clock").ThrottledClock;
i.exports=new h(30)},{"ac-clock":56}],241:[function(f,h,g){h.exports=function i(a,c){var b=document.createElement("a");
if(a){b.innerHTML=a}b.setAttribute("href","#");if(c&&c.parentNode){c.parentNode.replaceChild(b,c);
b.appendChild(c)}return b}},{}],242:[function(n,m,o){var i=n("ac-object");var l;
var k={pause:true,stop:true,ended:true};m.exports=function j(a,b,d){d=i.defaults(k,d||{});
var c=function(){b();b=function(){}};for(var f in d){if(d[f]){a.once(f,c)}}}},{"ac-object":193}],243:[function(f,i,g){i.exports=function h(a){a.once("loadstart",function(){a.container.classList.add("loading")
});a.once("loaded",function(){a.container.classList.remove("loading")})}},{}],244:[function(A,B,w){var t=A("ac-base").Element;
var y=A("ac-object");var s=A("./behaviors/canPlay");var v=A("./../ac-renderplayer/Controller/UserEngaged");
var p=A("./createScrubOnScroll");var q=A("./behaviors/doAfterPlay");var x=A("../ac-renderplayer/Enhancer");
var C=A("../ac-renderplayer/Enhancer/OutOfViewEnhancer");var u=A("../ac-renderplayer/PlayController/QueuedPlayController");
var z={reversed:false,startInView:false,tiedToScrollAfterPlayed:false,degradeAfterPlayed:true};
B.exports=function r(b,d,a){var c={};var f;d=y.defaults(z,d||{});if(!s(b)){return null
}u.add(b);if(d.startInView){new x(b,function(){f=new v(b,{reversed:d.reversed})
},a)}else{new C(b,function(){f=new v(b,{reversed:d.reversed})},a)}c.controllers=[f];
if(d.tiedToScrollAfterPlayed){q(b,function(){var i;var g=t.cumulativeOffset(b.container);
var h={};if(d.startInView){h.startInView=true;h.reversed=!d.reversed;h.offsetTop=g.top*-1
}i=p(b,h);c.controllers.push(i)},{ended:d.startInView})}else{if(d.degradeAfterPlayed){q(b,b.degrade.bind(b))
}}return c}},{"../ac-renderplayer/Enhancer":235,"../ac-renderplayer/Enhancer/OutOfViewEnhancer":236,"../ac-renderplayer/PlayController/QueuedPlayController":238,"./../ac-renderplayer/Controller/UserEngaged":231,"./behaviors/canPlay":239,"./behaviors/doAfterPlay":242,"./createScrubOnScroll":248,"ac-base":false,"ac-object":193}],245:[function(q,s,m){var l=q("ac-base").Element;
var k=q("./behaviors/canPlay");var o=q("../ac-renderplayer/Controller");var n=q("../ac-renderplayer/Enhancer");
var r=q("../ac-renderplayer/Enhancer/OutOfViewEnhancer");s.exports=function p(f,d){d=d||{};
var a={};var c;if(!k(f)){return null}var b=function(){var g=new o(f);a.controllers=[g]
};if(d.preventEnhanceInView){new r(f,b,d)}else{new n(f,b,d)}return a}},{"../ac-renderplayer/Controller":227,"../ac-renderplayer/Enhancer":235,"../ac-renderplayer/Enhancer/OutOfViewEnhancer":236,"./behaviors/canPlay":239,"ac-base":false}],246:[function(y,z,u){var s=y("ac-base").Element;
var w=y("ac-object");var r=y("./behaviors/canPlay");var t=y("../ac-renderplayer/Controller/ClickToPlay");
var A=y("./behaviors/createTrigger");var B=y("../ac-renderplayer/PlayController");
var p=y("./behaviors/spinner");var x={trigger:null};var v=function(d,a){var f={};
var c=s.isElement(d)?d:A("",a.container);var b=c.href.replace(/.*#/,"");if(b==="play"||b==="stop"||b==="pause"){f.behavior=b
}else{if(b==="replay"){f.behavior="play";f.stopableWhilePlaying=false;f.disableWhilePlaying=true
}}return new t(a,c,f)};var C=function(a,c){if(typeof a==="string"){a=s.selectAll(a)
}a=[].concat(a);var b=a.map(function(d){return v(d,c)});return b};z.exports=function q(a,c){var b={};
c=w.defaults(x,c||{});if(!r(a)){return null}B.add(a);p(a);b.controllers=C(c.trigger,a);
a.enhance();return b}},{"../ac-renderplayer/Controller/ClickToPlay":228,"../ac-renderplayer/PlayController":237,"./behaviors/canPlay":239,"./behaviors/createTrigger":241,"./behaviors/spinner":243,"ac-base":false,"ac-object":193}],247:[function(v,w,q){var s=v("ac-object");
var p=v("./behaviors/canPlay");var u=v("./behaviors/clock30fps");var o=v("../ac-renderplayer/Controller/Grabber");
var r=v("../ac-renderplayer/Enhancer");var n=v("./behaviors/spinner");var t={clock:u};
w.exports=function m(b,a){var c={};a=s.defaults(t,a||{});if(!p(b)){return null}n(b);
new r(b,function(){var d=new o(b,b.container,a);c.controllers=[d]});return c}},{"../ac-renderplayer/Controller/Grabber":229,"../ac-renderplayer/Enhancer":235,"./behaviors/canPlay":239,"./behaviors/clock30fps":240,"./behaviors/spinner":243,"ac-object":193}],248:[function(w,x,r){var t=w("ac-object");
var q=w("./behaviors/canPlay");var v=w("./behaviors/clock30fps");var n=w("./../ac-renderplayer/Controller/ScrubOnScroll");
var s=w("../ac-renderplayer/Enhancer");var p=w("../utils/getAttribute");var y=w("../ac-renderplayer/Enhancer/OutOfViewEnhancer");
var u={clock:v,enhanceInView:false};x.exports=function o(b,d,a){var c={};d=t.defaults(u,d||{});
d.offsetTop=d.offsetTop||p(b.container,"data-offsetTop",true);d.offsetBottom=d.offsetBottom||p(b.container,"data-offsetBottom",true);
if(!q(b)){return null}var f=function(){var g=new n(b,d);c.setOffsets=function(h,i){g.setOffsets(h,i)
};c.setSmoothing=function(h){g.setSmoothing(h)};c.controllers=[g]};if(d.startInView||d.enhanceInView){new s(b,f,a)
}else{new y(b,f,a)}return c}},{"../ac-renderplayer/Enhancer":235,"../ac-renderplayer/Enhancer/OutOfViewEnhancer":236,"../utils/getAttribute":250,"./../ac-renderplayer/Controller/ScrubOnScroll":230,"./behaviors/canPlay":239,"./behaviors/clock30fps":240,"ac-object":193}],249:[function(d,g,f){g.exports=d(54)
},{}],250:[function(i,h,g){h.exports=function f(b,c,d){var a=b.getAttribute(c)||null;
if(a){if(a==="true"){a=true}else{if(a==="false"){a=false}else{if(d){a=parseFloat(a,10)
}}}}return a}},{}],sAbXaO:[function(require,module,exports){
/*! Dust - Asynchronous Templating - v2.3.3
* http://linkedin.github.io/dustjs/
* Copyright (c) 2014 Aleksander Williams; Released under the MIT License */
(function(root){var dust={},NONE="NONE",ERROR="ERROR",WARN="WARN",INFO="INFO",DEBUG="DEBUG",loggingLevels=[DEBUG,INFO,WARN,ERROR,NONE],EMPTY_FUNC=function(){},logger=EMPTY_FUNC,loggerContext=this;
dust.debugLevel=NONE;dust.silenceErrors=false;if(root&&root.console&&root.console.log){logger=root.console.log;
loggerContext=root.console}dust.log=function(message,type){if(dust.isDebug&&dust.debugLevel===NONE){logger.call(loggerContext,'[!!!DEPRECATION WARNING!!!]: dust.isDebug is deprecated.  Set dust.debugLevel instead to the level of logging you want ["debug","info","warn","error","none"]');
dust.debugLevel=INFO}type=type||INFO;if(loggingLevels.indexOf(type)>=loggingLevels.indexOf(dust.debugLevel)){if(!dust.logQueue){dust.logQueue=[]
}dust.logQueue.push({message:message,type:type});logger.call(loggerContext,"[DUST "+type+"]: "+message)
}if(!dust.silenceErrors&&type===ERROR){if(typeof message==="string"){throw new Error(message)
}else{throw message}}};dust.onError=function(error,chunk){logger.call(loggerContext,"[!!!DEPRECATION WARNING!!!]: dust.onError will no longer return a chunk object.");
dust.log(error.message||error,ERROR);if(!dust.silenceErrors){throw error}else{return chunk
}};dust.helpers={};dust.cache={};dust.register=function(name,tmpl){if(!name){return
}dust.cache[name]=tmpl};dust.render=function(name,context,callback){var chunk=new Stub(callback).head;
try{dust.load(name,chunk,Context.wrap(context,name)).end()}catch(err){dust.log(err,ERROR)
}};dust.stream=function(name,context){var stream=new Stream();dust.nextTick(function(){try{dust.load(name,stream.head,Context.wrap(context,name)).end()
}catch(err){dust.log(err,ERROR)}});return stream};dust.renderSource=function(source,context,callback){return dust.compileFn(source)(context,callback)
};dust.compileFn=function(source,name){name=name||null;var tmpl=dust.loadSource(dust.compile(source,name));
return function(context,callback){var master=callback?new Stub(callback):new Stream();
dust.nextTick(function(){if(typeof tmpl==="function"){tmpl(master.head,Context.wrap(context,name)).end()
}else{dust.log(new Error("Template ["+name+"] cannot be resolved to a Dust function"),ERROR)
}});return master}};dust.load=function(name,chunk,context){var tmpl=dust.cache[name];
if(tmpl){return tmpl(chunk,context)}else{if(dust.onLoad){return chunk.map(function(chunk){dust.onLoad(name,function(err,src){if(err){return chunk.setError(err)
}if(!dust.cache[name]){dust.loadSource(dust.compile(src,name))}dust.cache[name](chunk,context).end()
})})}return chunk.setError(new Error("Template Not Found: "+name))}};dust.loadSource=function(source,path){return eval(source)
};if(Array.isArray){dust.isArray=Array.isArray}else{dust.isArray=function(arr){return Object.prototype.toString.call(arr)==="[object Array]"
}}dust.nextTick=(function(){return function(callback){setTimeout(callback,0)}})();
dust.isEmpty=function(value){if(dust.isArray(value)&&!value.length){return true
}if(value===0){return false}return(!value)};dust.filter=function(string,auto,filters){if(filters){for(var i=0,len=filters.length;
i<len;i++){var name=filters[i];if(name==="s"){auto=null;dust.log("Using unescape filter on ["+string+"]",DEBUG)
}else{if(typeof dust.filters[name]==="function"){string=dust.filters[name](string)
}else{dust.log("Invalid filter ["+name+"]",WARN)}}}}if(auto){string=dust.filters[auto](string)
}return string};dust.filters={h:function(value){return dust.escapeHtml(value)},j:function(value){return dust.escapeJs(value)
},u:encodeURI,uc:encodeURIComponent,js:function(value){if(!JSON){dust.log("JSON is undefined.  JSON stringify has not been used on ["+value+"]",WARN);
return value}else{return JSON.stringify(value)}},jp:function(value){if(!JSON){dust.log("JSON is undefined.  JSON parse has not been used on ["+value+"]",WARN);
return value}else{return JSON.parse(value)}}};function Context(stack,global,blocks,templateName){this.stack=stack;
this.global=global;this.blocks=blocks;this.templateName=templateName}dust.makeBase=function(global){return new Context(new Stack(),global)
};Context.wrap=function(context,name){if(context instanceof Context){return context
}return new Context(new Stack(context),{},null,name)};Context.prototype.get=function(path,cur){if(typeof path==="string"){if(path[0]==="."){cur=true;
path=path.substr(1)}path=path.split(".")}return this._get(cur,path)};Context.prototype._get=function(cur,down){var ctx=this.stack,i=1,value,first,len,ctxThis;
dust.log("Searching for reference [{"+down.join(".")+"}] in template ["+this.getTemplateName()+"]",DEBUG);
first=down[0];len=down.length;if(cur&&len===0){ctxThis=ctx;ctx=ctx.head}else{if(!cur){while(ctx){if(ctx.isObject){ctxThis=ctx.head;
value=ctx.head[first];if(value!==undefined){break}}ctx=ctx.tail}if(value!==undefined){ctx=value
}else{ctx=this.global?this.global[first]:undefined}}else{ctx=ctx.head[first]}while(ctx&&i<len){ctxThis=ctx;
ctx=ctx[down[i]];i++}}if(typeof ctx==="function"){var fn=function(){try{return ctx.apply(ctxThis,arguments)
}catch(err){return dust.log(err,ERROR)}};fn.isFunction=true;return fn}else{if(ctx===undefined){dust.log("Cannot find the value for reference [{"+down.join(".")+"}] in template ["+this.getTemplateName()+"]")
}return ctx}};Context.prototype.getPath=function(cur,down){return this._get(cur,down)
};Context.prototype.push=function(head,idx,len){return new Context(new Stack(head,this.stack,idx,len),this.global,this.blocks,this.getTemplateName())
};Context.prototype.rebase=function(head){return new Context(new Stack(head),this.global,this.blocks,this.getTemplateName())
};Context.prototype.current=function(){return this.stack.head};Context.prototype.getBlock=function(key,chk,ctx){if(typeof key==="function"){var tempChk=new Chunk();
key=key(tempChk,this).data.join("")}var blocks=this.blocks;if(!blocks){dust.log("No blocks for context[{"+key+"}] in template ["+this.getTemplateName()+"]",DEBUG);
return}var len=blocks.length,fn;while(len--){fn=blocks[len][key];if(fn){return fn
}}};Context.prototype.shiftBlocks=function(locals){var blocks=this.blocks,newBlocks;
if(locals){if(!blocks){newBlocks=[locals]}else{newBlocks=blocks.concat([locals])
}return new Context(this.stack,this.global,newBlocks,this.getTemplateName())}return this
};Context.prototype.getTemplateName=function(){return this.templateName};function Stack(head,tail,idx,len){this.tail=tail;
this.isObject=head&&typeof head==="object";this.head=head;this.index=idx;this.of=len
}function Stub(callback){this.head=new Chunk(this);this.callback=callback;this.out=""
}Stub.prototype.flush=function(){var chunk=this.head;while(chunk){if(chunk.flushable){this.out+=chunk.data.join("")
}else{if(chunk.error){this.callback(chunk.error);dust.log("Chunk error ["+chunk.error+"] thrown. Ceasing to render this template.",WARN);
this.flush=EMPTY_FUNC;return}else{return}}chunk=chunk.next;this.head=chunk}this.callback(null,this.out)
};function Stream(){this.head=new Chunk(this)}Stream.prototype.flush=function(){var chunk=this.head;
while(chunk){if(chunk.flushable){this.emit("data",chunk.data.join(""))}else{if(chunk.error){this.emit("error",chunk.error);
dust.log("Chunk error ["+chunk.error+"] thrown. Ceasing to render this template.",WARN);
this.flush=EMPTY_FUNC;return}else{return}}chunk=chunk.next;this.head=chunk}this.emit("end")
};Stream.prototype.emit=function(type,data){if(!this.events){dust.log("No events to emit",INFO);
return false}var handler=this.events[type];if(!handler){dust.log("Event type ["+type+"] does not exist",WARN);
return false}if(typeof handler==="function"){handler(data)}else{if(dust.isArray(handler)){var listeners=handler.slice(0);
for(var i=0,l=listeners.length;i<l;i++){listeners[i](data)}}else{dust.log("Event Handler ["+handler+"] is not of a type that is handled by emit",WARN)
}}};Stream.prototype.on=function(type,callback){if(!this.events){this.events={}
}if(!this.events[type]){dust.log("Event type ["+type+"] does not exist. Using just the specified callback.",WARN);
if(callback){this.events[type]=callback}else{dust.log("Callback for type ["+type+"] does not exist. Listener not registered.",WARN)
}}else{if(typeof this.events[type]==="function"){this.events[type]=[this.events[type],callback]
}else{this.events[type].push(callback)}}return this};Stream.prototype.pipe=function(stream){this.on("data",function(data){try{stream.write(data,"utf8")
}catch(err){dust.log(err,ERROR)}}).on("end",function(){try{return stream.end()}catch(err){dust.log(err,ERROR)
}}).on("error",function(err){stream.error(err)});return this};function Chunk(root,next,taps){this.root=root;
this.next=next;this.data=[];this.flushable=false;this.taps=taps}Chunk.prototype.write=function(data){var taps=this.taps;
if(taps){data=taps.go(data)}this.data.push(data);return this};Chunk.prototype.end=function(data){if(data){this.write(data)
}this.flushable=true;this.root.flush();return this};Chunk.prototype.map=function(callback){var cursor=new Chunk(this.root,this.next,this.taps),branch=new Chunk(this.root,cursor,this.taps);
this.next=branch;this.flushable=true;callback(branch);return cursor};Chunk.prototype.tap=function(tap){var taps=this.taps;
if(taps){this.taps=taps.push(tap)}else{this.taps=new Tap(tap)}return this};Chunk.prototype.untap=function(){this.taps=this.taps.tail;
return this};Chunk.prototype.render=function(body,context){return body(this,context)
};Chunk.prototype.reference=function(elem,context,auto,filters){if(typeof elem==="function"){elem.isFunction=true;
elem=elem.apply(context.current(),[this,context,null,{auto:auto,filters:filters}]);
if(elem instanceof Chunk){return elem}}if(!dust.isEmpty(elem)){return this.write(dust.filter(elem,auto,filters))
}else{return this}};Chunk.prototype.section=function(elem,context,bodies,params){if(typeof elem==="function"){elem=elem.apply(context.current(),[this,context,bodies,params]);
if(elem instanceof Chunk){return elem}}var body=bodies.block,skip=bodies["else"];
if(params){context=context.push(params)}if(dust.isArray(elem)){if(body){var len=elem.length,chunk=this;
if(len>0){if(context.stack.head){context.stack.head["$len"]=len}for(var i=0;i<len;
i++){if(context.stack.head){context.stack.head["$idx"]=i}chunk=body(chunk,context.push(elem[i],i,len))
}if(context.stack.head){context.stack.head["$idx"]=undefined;context.stack.head["$len"]=undefined
}return chunk}else{if(skip){return skip(this,context)}}}}else{if(elem===true){if(body){return body(this,context)
}}else{if(elem||elem===0){if(body){return body(this,context.push(elem))}}else{if(skip){return skip(this,context)
}}}}dust.log("Not rendering section (#) block in template ["+context.getTemplateName()+"], because above key was not found",DEBUG);
return this};Chunk.prototype.exists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(!dust.isEmpty(elem)){if(body){return body(this,context)}}else{if(skip){return skip(this,context)
}}dust.log("Not rendering exists (?) block in template ["+context.getTemplateName()+"], because above key was not found",DEBUG);
return this};Chunk.prototype.notexists=function(elem,context,bodies){var body=bodies.block,skip=bodies["else"];
if(dust.isEmpty(elem)){if(body){return body(this,context)}}else{if(skip){return skip(this,context)
}}dust.log("Not rendering not exists (^) block check in template ["+context.getTemplateName()+"], because above key was found",DEBUG);
return this};Chunk.prototype.block=function(elem,context,bodies){var body=bodies.block;
if(elem){body=elem}if(body){return body(this,context)}return this};Chunk.prototype.partial=function(elem,context,params){var partialContext;
partialContext=dust.makeBase(context.global);partialContext.blocks=context.blocks;
if(context.stack&&context.stack.tail){partialContext.stack=context.stack.tail}if(params){partialContext=partialContext.push(params)
}if(typeof elem==="string"){partialContext.templateName=elem}partialContext=partialContext.push(context.stack.head);
var partialChunk;if(typeof elem==="function"){partialChunk=this.capture(elem,partialContext,function(name,chunk){partialContext.templateName=partialContext.templateName||name;
dust.load(name,chunk,partialContext).end()})}else{partialChunk=dust.load(elem,this,partialContext)
}return partialChunk};Chunk.prototype.helper=function(name,context,bodies,params){var chunk=this;
try{if(dust.helpers[name]){return dust.helpers[name](chunk,context,bodies,params)
}else{dust.log("Invalid helper ["+name+"]",WARN);return chunk}}catch(err){dust.log(err,ERROR);
return chunk}};Chunk.prototype.capture=function(body,context,callback){return this.map(function(chunk){var stub=new Stub(function(err,out){if(err){chunk.setError(err)
}else{callback(out,chunk)}});body(stub.head,context).end()})};Chunk.prototype.setError=function(err){this.error=err;
this.root.flush();return this};function Tap(head,tail){this.head=head;this.tail=tail
}Tap.prototype.push=function(tap){return new Tap(tap,this)};Tap.prototype.go=function(value){var tap=this;
while(tap){value=tap.head(value);tap=tap.tail}return value};var HCHARS=new RegExp(/[&<>\"\']/),AMP=/&/g,LT=/</g,GT=/>/g,QUOT=/\"/g,SQUOT=/\'/g;
dust.escapeHtml=function(s){if(typeof s==="string"){if(!HCHARS.test(s)){return s
}return s.replace(AMP,"&amp;").replace(LT,"&lt;").replace(GT,"&gt;").replace(QUOT,"&quot;").replace(SQUOT,"&#39;")
}return s};var BS=/\\/g,FS=/\//g,CR=/\r/g,LS=/\u2028/g,PS=/\u2029/g,NL=/\n/g,LF=/\f/g,SQ=/'/g,DQ=/"/g,TB=/\t/g;
dust.escapeJs=function(s){if(typeof s==="string"){return s.replace(BS,"\\\\").replace(FS,"\\/").replace(DQ,'\\"').replace(SQ,"\\'").replace(CR,"\\r").replace(LS,"\\u2028").replace(PS,"\\u2029").replace(NL,"\\n").replace(LF,"\\f").replace(TB,"\\t")
}return s};if(typeof exports==="object"){module.exports=dust}else{root.dust=dust
}})(this)},{}],"dust-runtime":[function(d,g,f){g.exports=d("sAbXaO")},{}],"ac-video-templates":[function(d,g,f){g.exports=d("OnUF3R")
},{}],OnUF3R:[function(d,g,f){g.exports=(function(){var a=d("./dust-runtime");(function(){a.register("controlBarDefault",b);
function b(h,k){return h.write('<div aria-label="Video playback" class="').reference(k._get(false,["values","controlbarskinning"]),k,"h").write(' acv-controller-disabled" role="toolbar"><div class="ac-video-controlbar-elements"><button aria-label="').reference(k._get(false,["values","localizedText","mutevolume"]),k,"h").write('" data-ac-video-element="minVolumeButton" class="acv-button acv-minvolume" tabindex="0"></button><div data-ac-video-element="volumeSlider" class="acv-button acv-volumeslider ac-media-volume-slider"><div class="acv-volumeslider-inputrange"></div></div><button aria-label="').reference(k._get(false,["values","localizedText","fullvolume"]),k,"h").write('" data-ac-video-element="maxVolumeButton" class="acv-button acv-maxvolume" tabindex="0"></button><button aria-label="').reference(k._get(false,["values","localizedText","play"]),k,"h").write('" data-ac-video-element="playPauseButton" class="acv-button acv-playpause" tabindex="0" role="button"></button>').notexists(k._get(false,["values","disablecaptionscontrol"]),k,{block:c},null).exists(k._get(false,["values","usesFullScreen"]),k,{block:i},null).write('<div data-ac-video-element="progressSlider" class="acv-button acv-progressslider"><span aria-label="').reference(k._get(false,["values","localizedText","elapsed"]),k,"h").write('" class="acv-text acv-text-first acv-currenttime" data-ac-video-element="currentTimeText" role="timer" tabindex="0"></span><div class="acv-progressslider-inputrange"></div><span aria-label="').reference(k._get(false,["values","localizedText","remaining"]),k,"h").write('" class="acv-text acv-text-last acv-remainingtime" data-ac-video-element="remainingTimeText" role="timer" tabindex="0"></span></div>').reference(k._get(false,["values","controlsTemplateString"]),k,"h",["s"]).write("</div></div>")
}function c(h,k){return h.write('<button aria-label="').reference(k._get(false,["values","localizedText","captionscontrol"]),k,"h").write('" data-ac-video-element="captionsButton" class="acv-button acv-captions" tabindex="0"></button>')
}function i(h,k){return h.write('<button aria-label="Enable Full Screen" data-ac-video-element="fullScreenButton" class="acv-button acv-fullscreen" tabindex="0"></button>')
}return b})();(function(){a.register("controlBarStream",b);function b(c,i){return c.write('<div aria-label="Video playback" class="').reference(i._get(false,["values","controlbarskinning"]),i,"h").write('" aria-role="toolbar"><div class="ac-video-controlbar-elements"><button aria-label="Min Volume" data-ac-video-element="minVolumeButton" class="acv-button acv-minvolume" tabindex="0"></button><div data-ac-video-element="volumeSlider" class="acv-button acv-volumeslider ac-media-volume-slider"><div class="acv-volumeslider-inputrange"></div></div><button aria-label="Max Volume" data-ac-video-element="maxVolumeButton" class="acv-button acv-maxvolume" tabindex="0"></button><button aria-label="Play" data-ac-video-element="playPauseButton" class="acv-button acv-playpause" tabindex="0" role="button"></button><button aria-label="Enable Captions" data-ac-video-element="captionsButton" class="acv-button acv-captions" tabindex="0"></button><button aria-label="Enable Full Screen" data-ac-video-element="fullScreenButton" class="acv-button acv-fullscreen" tabindex="0"></button><div class="acv-button acv-progressslider"><span aria-label="Elapsed" class="acv-text acv-text-first acv-currenttime" data-ac-video-element="currentTimeText" aria-role="timer" tabindex="0"></span></div>').reference(i._get(false,["values","controlsTemplateString"]),i,"h",["s"]).write("</div></div>")
}return b})();(function(){a.register("controlBarString",b);function b(c,i){return c.write('<div class="ac-video-controlbar" style="width:').reference(i._get(false,["values","width"]),i,"h").write('px;">').reference(i._get(false,["values","controlsTemplateString"]),i,"h",["s"]).write("</div>")
}return b})();(function(){a.register("elementEmbed",b);function b(h,i){return h.write('<embed src="').reference(i._get(false,["source"]),i,"h").write('" ').notexists(i._get(false,["responsive"]),i,{block:c},null).write(" ").notexists(i._get(false,["responsive"]),i,{block:j},null).write(' class="ac-video-media" id="').reference(i._get(false,["values","id"]),i,"h").write('" wmode="transparent" name="').reference(i._get(false,["values","id"]),i,"h").write('" type="').reference(i._get(false,["type"]),i,"h").write('" width="').reference(i._get(false,["values","width"]),i,"h").write('" height="').reference(i._get(false,["values","height"]),i,"h").write('" scale="tofit" enablejavascript="true" postdomevents="true" controller="false" ').exists(i._get(false,["values","autoplay"]),i,{block:k},null).write(' poster="').reference(i._get(false,["values","poster"]),i,"h").write('" bgcolor="').reference(i._get(false,["values","bgcolor"]),i,"h").write('" style="width:').reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write('px;"  pluginspage="www.apple.com/quicktime/download">')
}function c(h,i){return h.write(' width="').reference(i._get(false,["values","width"]),i,"h").write('" height="').reference(i._get(false,["values","height"]),i,"h").write('"')
}function j(h,i){return h.write(' style="width:').reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write('px;"')
}function k(h,i){return h.write("autoplay")}return b})();(function(){a.register("elementObject",b);
function b(h,i){return h.write('<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" wmode="transparent" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0" id="').reference(i._get(false,["values","id"]),i,"h").write('" name="').reference(i._get(false,["values","id"]),i,"h").write('" class="ac-video-media movie-object" type="').reference(i._get(false,["type"]),i,"h").write('" style="behavior:url(#').reference(i._get(false,["values","eventId"]),i,"h").write("); ").notexists(i._get(false,["responsive"]),i,{block:c},null).write('" ').notexists(i._get(false,["responsive"]),i,{block:k},null).write(' bgcolor="').reference(i._get(false,["values","bgcolor"]),i,"h").write('" poster="').reference(i._get(false,["values","poster"]),i,"h").write('"><param name="enablejavascript" value="true" /><param name="postdomevents" value="true" />').exists(i._get(false,["values","autoplay"]),i,{block:l},null).notexists(i._get(false,["values","autoplay"]),i,{block:m},null).write('<param name="scale" value="tofit" /><param name="controller" value="false" /><param name="kioskmode" value="true" /><param name="src" value="').reference(i._get(false,["source"]),i,"h").write('" /><param name="pluginspace" value="http://www.apple.com/qtactivex/qtplugin.cab" /><param name="wmode" value="transparent"></object>')
}function c(h,i){return h.write("width:").reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write("px;")
}function k(h,i){return h.write(' width="').reference(i._get(false,["values","width"]),i,"h").write('" height="').reference(i._get(false,["values","height"]),i,"h").write('" ')
}function l(h,i){return h.write('<param name="autoplay" value="true" />')}function m(h,i){return h.write('<param name="autoplay" value="false" />')
}return b})();(function(){a.register("elementObjectEvent",b);function b(c,i){return c.write('<object id="').reference(i._get(false,["values","eventId"]),i,"h").write('" wmode="transparent" classid="clsid:CB927D12-4FF7-4a9e-A169-56E4B8A75598" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=7,2,1,0"></object>')
}return b})();(function(){a.register("elementVideo",o);function o(h,i){return h.write('<video crossorigin="anonymous" class="ac-video-media" id="').reference(i._get(false,["values","id"]),i,"h").write('" poster="').reference(i._get(false,["values","poster"]),i,"h").write('" ').exists(i._get(false,["values","controls"]),i,{block:p},null).write(" ").exists(i._get(false,["values","autoplay"]),i,{block:q},null).write(" ").exists(i._get(false,["values","preload"]),i,{block:r},null).write(' x-webkit-airplay="').reference(i._get(false,["values","airplay"]),i,"h").write('" ').exists(i._get(false,["values","bgcolor"]),i,{block:s},null).write(" ").notexists(i._get(false,["responsive"]),i,{block:b},null).write(' style="').notexists(i._get(false,["responsive"]),i,{block:c},null).write('" ><source src="').reference(i._get(false,["source"]),i,"h").write('" type="').reference(i._get(false,["type"]),i,"h").write('" />').exists(i._get(false,["captionsTrack"]),i,{block:n},null).write("</video>")
}function p(h,i){return h.write("controls")}function q(h,i){return h.write("autoplay")
}function r(h,i){return h.write('preload="').reference(i._get(false,["values","preload"]),i,"h").write('"')
}function s(h,i){return h.write('bgcolor="').reference(i._get(false,["values","bgcolor"]),i,"h").write('"')
}function b(h,i){return h.write('width="').reference(i._get(false,["values","width"]),i,"h").write('" height="').reference(i._get(false,["values","height"]),i,"h").write('"')
}function c(h,i){return h.write("width:").reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write("px;")
}function n(h,i){return h.write('<track src="').reference(i._get(false,["captionsTrack"]),i,"h").write('" kind="captions" srclang="en" label="English" default />')
}return o})();(function(){a.register("masterTemplate",b);function b(h,i){return h.write('<div class="ac-video-wrapper ').reference(i._get(false,["values","targetId"]),i,"h").write(" ac-video-template-").reference(i._get(false,["videoTemplate"]),i,"h").write(" ").exists(i._get(false,["values","usesFullScreen"]),i,{block:c},null).write('" id="').reference(i._get(false,["values","wrapperId"]),i,"h").write('" ').notexists(i._get(false,["responsive"]),i,{block:p},null).write('><div class="ac-video-event-blockade" ').notexists(i._get(false,["responsive"]),i,{block:q},null).write('>&nbsp; &nbsp; &nbsp; &nbsp;</div><button aria-label="Close Video" data-ac-video-element="closeButton" class="acv-button acv-close icon icon-before icon-closealt" tabindex="0"><label class="ac-element-label acv-text">Close</label></button>').exists(i._get(false,["values","poster"]),i,{block:r},null).exists(i._get(false,["values","endframe"]),i,{block:s},null).exists(i._get(false,["videoTemplate"]),i,{block:t},null).exists(i._get(false,["values","controlbar"]),i,{block:v},null).write("</div>")
}function c(h,i){return h.write("ac-video-has-fullscreen")}function p(h,i){return h.write('style="width:').reference(i._get(false,["values","width"]),i,"h").write("px;height:").reference(i._get(false,["values","height"]),i,"h").write('px"')
}function q(h,i){return h.write('style="width:').reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write('px;"')
}function r(h,i){return h.write('<img width="').reference(i._get(false,["values","width"]),i,"h").write('px" height="').reference(i._get(false,["values","height"]),i,"h").write('px" src="').reference(i._get(false,["values","poster"]),i,"h").write('" class="ac-video-posterframe" data-ac-video-element="posterframe" alt="" />')
}function s(h,i){return h.write('<img width="').reference(i._get(false,["values","width"]),i,"h").write('px" height="').reference(i._get(false,["values","height"]),i,"h").write('px" src="').reference(i._get(false,["values","endframe"]),i,"h").write('" class="ac-video-endframe acv-hide" data-ac-video-element="endframe" alt="" />')
}function t(h,i){return h.partial(u,i,null)}function u(h,i){return h.reference(i._get(false,["videoTemplate"]),i,"h")
}function v(h,i){return h.partial(w,i,null)}function w(h,i){return h.reference(i._get(false,["values","controlbar"]),i,"h")
}return b})();(function(){a.register("native",b);function b(h,k){return h.write('<div class="ac-video-wrapper native-controlbar ').reference(k._get(false,["values","targetId"]),k,"h").write('" id="').reference(k._get(false,["values","wrapperId"]),k,"h").write('" style="width:').reference(k._get(false,["values","width"]),k,"h").write("px;height:").reference(k._get(false,["values","height"]),k,"h").write('px;"><button aria-label="Close Video" data-ac-video-element="closeButton" class="acv-button acv-close icon icon-before icon-closealt" tabindex="0"><label class="ac-element-label acv-text">Close</label></button><div class="acv-native-playbutton"></div>').exists(k._get(false,["videoTemplate"]),k,{block:c},null).write("</div>")
}function c(h,k){return h.partial(i,k,null)}function i(h,k){return h.reference(k._get(false,["videoTemplate"]),k,"h")
}return b})();(function(){a.register("noVideoSupport",b);function b(c,i){return c.write('<div class="ac-video-wrapper ').reference(i._get(false,["values","targetId"]),i,"h").write(' acv-no-video-support" id="').reference(i._get(false,["values","wrapperId"]),i,"h").write('" style="width:').reference(i._get(false,["values","width"]),i,"h").write("px;height:").reference(i._get(false,["values","height"]),i,"h").write('px;"><a onclick="s_objectID=&quot;http://www.apple.com/quicktime/download/_1&quot;;return this.s_oc?this.s_oc(e):true" href="').reference(i._get(false,["values","localizedText","downloadquicktimeurl"]),i,"h").write('" class="ac-video-quicktime-download"><span class="ac-video-quicktime-download-title">').reference(i._get(false,["values","localizedText","downloadquicktimetitle"]),i,"h").write('</span><span class="ac-video-quicktime-download-text">').reference(i._get(false,["values","localizedText","downloadquicktimetext"]),i,"h").write('</span><span class="ac-video-quicktime-download-button">').reference(i._get(false,["values","localizedText","downloadquicktimebutton"]),i,"h").write("</span></a></div>")
}return b})();(function(){a.register("steamVideoElement",b);function b(h,i){return h.write('<video crossorigin="anonymous" class="ac-video-media" id="').reference(i._get(false,["values","id"]),i,"h").write('" poster="').reference(i._get(false,["values","poster"]),i,"h").write('" ').exists(i._get(false,["values","controls"]),i,{block:c},null).write(" ").exists(i._get(false,["values","autoplay"]),i,{block:k},null).write(" ").exists(i._get(false,["values","preload"]),i,{block:l},null).write(' width="').reference(i._get(false,["values","width"]),i,"h").write('" height="').reference(i._get(false,["values","height"]),i,"h").write('" x-webkit-airplay="').reference(i._get(false,["values","airplay"]),i,"h").write('" bgcolor="').reference(i._get(false,["values","bgcolor"]),i,"h").write('" style="width:').reference(i._get(false,["values","width"]),i,"h").write("px; height:").reference(i._get(false,["values","height"]),i,"h").write('px;"><source src="').reference(i._get(false,["source"]),i,"h").write('" type="').reference(i._get(false,["type"]),i,"h").write('" />').exists(i._get(false,["captionsTrack"]),i,{block:m},null).write("</video>")
}function c(h,i){return h.write("controls")}function k(h,i){return h.write("autoplay")
}function l(h,i){return h.write('preload="').reference(i._get(false,["values","preload"]),i,"h").write('"')
}function m(h,i){return h.write('<track src="').reference(i._get(false,["captionsTrack"]),i,"h").write('" kind="captions" srclang="en" label="English" default />')
}return b})();return a})()},{"./dust-runtime":"sAbXaO"}],255:[function(d,g,f){g.exports=d(218)
},{"./smoother/Smoother":256}],256:[function(d,g,f){g.exports=d(219)},{}],257:[function(d,g,f){g.exports=d(220)
},{"./window-delegate/WindowDelegate":258,"./window-delegate/windowEmitter":259}],258:[function(d,g,f){g.exports=d(221)
},{"./windowEmitter":259}],259:[function(d,g,f){g.exports=d(222)},{"ac-dom-emitter":65}],260:[function(d,g,f){g.exports=d(223)
},{"./scroll-time-update/ElementScrollTimeUpdate":261,"./scroll-time-update/ScrollTimeUpdate":262}],261:[function(d,g,f){g.exports=d(224)
},{"./ScrollTimeUpdate":262,"window-delegate":257}],262:[function(d,g,f){g.exports=d(225)
},{"ac-clock":56,"ac-dom-emitter":65,smoother:255,"window-delegate":257}],263:[function(d,g,f){arguments[4][220][0].apply(f,arguments)
},{"./window-delegate/WindowDelegate":264,"./window-delegate/windowEmitter":265}],264:[function(m,k,i){var j;
var h=m("./windowEmitter");function l(){this._emitter=h;this._setWindowDimensionValues();
this._setScrollValues();this.on("resize",this._setWindowDimensionValues.bind(this));
this.on("scroll",this._setScrollValues.bind(this));this.on("touchstart",this._touchScrollStart.bind(this));
this.on("touchend",this._setZoomValues.bind(this))}j=l.prototype;j.on=function(){this._emitter.on.apply(this._emitter,arguments);
return this};j.once=function(){this._emitter.once.apply(this._emitter,arguments);
return this};j.off=function(){this._emitter.off.apply(this._emitter,arguments);
return this};j.has=function(){return this._emitter.has.apply(this._emitter,arguments)
};j.trigger=function(){this._emitter.trigger.apply(this._emitter,arguments);return this
};j.propagateTo=function(){this._emitter.propagateTo.apply(this._emitter,arguments);
return this};j.stopPropagatingTo=function(){this._emitter.stopPropagatingTo.apply(this._emitter,arguments);
return this};j.isZoomed=function(){return this.clientWidth>this.innerWidth};j._setWindowDimensionValues=function(){this.clientWidth=document.documentElement.clientWidth;
this.clientHeight=document.documentElement.clientHeight;this.innerWidth=window.innerWidth||this.clientWidth;
this.innerHeight=window.innerHeight||this.clientHeight};j._setZoomValues=function(){var a=this.innerWidth;
this.innerWidth=window.innerWidth;if(a!==this.innerWidth){this.innerHeight=window.innerHeight;
this.trigger("zoom");if(a<this.innerWidth){this.trigger("zoomIn")}else{this.trigger("zoomOut")
}}else{setTimeout(this._setZoomValues.bind(this),500)}};j._updateScrollX=function(){this.scrollX=(window.pageXOffset!==undefined)?window.pageXOffset:(document.documentElement||document.body.parentNode||document.body).scrollLeft;
this.maxScrollX=document.body.scrollWidth-this.innerWidth;return this.scrollX};
j._updateScrollY=function(){this.scrollY=(window.pageYOffset!==undefined)?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop;
this.maxScrollY=document.body.scrollHeight-this.innerHeight;return this.scrollY
};j._setScrollValues=function(){var a=this.scrollX,b=this.scrollY;this._updateScrollX();
this._updateScrollY();if(this.scrollX!==a){this.trigger("scrollX")}if(this.scrollY!==b){this.trigger("scrollY")
}this._scrollStop()};j._scrollStop=function(){if(typeof window.ontouchstart==="undefined"){if(this._scrollStopTimer){clearTimeout(this._scrollStopTimer)
}this._scrollStopTimer=setTimeout(function(){clearTimeout(this._scrollStopTimer);
this.trigger("scrollStop")}.bind(this),300)}};j._touchScrollStart=function(){this._updateScrollX();
this._updateScrollY();this.once("touchend",this._touchScrollStop.bind(this,this.scrollX,this.scrollY))
};j._touchScrollStop=function(b,c,a){this._updateScrollX();this._updateScrollY();
if(b!==this.scrollX||c!==this.scrollY){setTimeout(this._touchScrollStop.bind(this,this.scrollX,this.scrollY,true),300)
}else{if(a){this.trigger("scrollStop")}}};k.exports=new l()},{"./windowEmitter":265}],265:[function(d,g,f){g.exports=d(222)
},{"ac-dom-emitter":65}],266:[function(E,K,v){var A,D=window.mediaConfig,O=E("ac-deferred").Deferred,C=E("ac-deferred").all,F=E("ac-dom-emitter").DOMEmitter,G=E("ac-event-emitter").EventEmitter,w=E("ac-base").Element,y=E("../shared/RenderPlayerEnvironment"),J=E("../shared/RenderPlayerController"),L=E("ac-media-object"),I=E("ac-element-tracker"),M=E("../shared/experienceReport");
var B={heroIntro:"hero-intro",heroScrollable:"hero-scrollable"};var x={introStarted:"intro-started",introEnded:"intro-ended",preventImageLoad:"media",scrollableHero:"scrollable-hero"};
var H=document.body;var z=3500;var N=function(a,b){G.call(this);this.wrapper=w.select(".image-hero-wrapper");
this._scrollableTimePos=0;this.renderPlayerEnhancements=b;this.renderPlayerController=new J([a]);
this.mediaObjects=this.renderPlayerController.mediaObjects;this.renderPlayers=this.renderPlayerController.renderPlayers;
this.domEmitters=[];this.promises=[];this.forceHeroScrollableFalse=false;this.enhancePromises={introComplete:new O(),scrollableEnhanced:new O()};
if(D.videos.indexOf(B.heroIntro)===-1){this._handleHeroIntroFallback();return}this._bindOnReady(this.mediaObjects[B.heroIntro],this._handleHeroIntroLoaded);
C(this.promises).then(this._onHeroEnhanced.bind(this));C([this.enhancePromises.introComplete.promise(),this.enhancePromises.scrollableEnhanced.promise()]).then(this._handleScrollableEnhancedAndIntroFaded.bind(this));
this.heroIntroFallbackTimeout=setTimeout(this._handleHeroIntroFallback.bind(this),z)
};A=N.prototype=new G(null);A._bindOnReady=function(c,a){var b=new O();this.promises.push(b.promise());
if(c.loaded){a();b.resolve();return}c.once("ready",function(){a.call(this);b.resolve()
}.bind(this))};A._handleHeroIntroLoaded=function(){clearTimeout(this.heroIntroFallbackTimeout);
this.heroIntroFallbackTimeout=null;this.mediaObjects[B.heroIntro].once("ended",this._handleIntroFadeOutComplete,this);
w.addClassName(H,x.introStarted);this.mediaObjects[B.heroIntro].play();this.renderPlayerController._initialize(this.renderPlayerEnhancements);
this.mediaObjects[B.heroScrollable].on("enhance",this._handleHeroScrollableEnhanced,this)
};A._handleHeroIntroFallbackFade=function(){var a=new F(this.wrapper);a.once("transitionend webkitTransitionEnd oTransitionEnd",this._handleIntroFadeOutComplete,this);
this.domEmitters.push(a);w.addClassName(H,x.introStarted);w.removeClassName(document.documentElement,x.preventImageLoad);
this.renderPlayerController._initialize(this.renderPlayerEnhancements);this.mediaObjects[B.heroScrollable].on("enhance",this._handleHeroScrollableEnhanced,this)
};A._handleHeroScrollableEnhanced=function(){this.renderPlayers[B.heroScrollable].controllers[0].tracker.on("draw",function(a){this._scrollableTimePos=a.time
}.bind(this));this.enhancePromises.scrollableEnhanced.resolve()};A._handleScrollableEnhancedAndIntroFaded=function(){if(this._heroScrollableShouldShow()){this._showHeroScrollable()
}else{var a=I.addElement(this.wrapper);I.start();var b="enterview";if(a.inView){b="exitview"
}a.once(b,this._showHeroScrollable,this)}};A._showHeroScrollable=function(){w.addClassName(H,x.scrollableHero);
this.trigger("scrollable-activated")};A._handleHeroIntroFallback=function(){try{this.mediaObjects[B.heroIntro].destroy()
}catch(a){}this.forceHeroScrollableFalse=true;this._handleHeroIntroFallbackFade()
};A._handleIntroFadeOutComplete=function(){w.addClassName(H,x.introEnded);w.removeClassName(document.documentElement,x.preventImageLoad);
this.enhancePromises.introComplete.resolve()};A._onHeroEnhanced=function(){this.trigger("complete")
};A._heroScrollableShouldShow=function(){if(!this.forceHeroScrollableFalse&&this._scrollableTimePos<0.02){return true
}return false};K.exports=N},{"../shared/RenderPlayerController":281,"../shared/RenderPlayerEnvironment":282,"../shared/experienceReport":286,"ac-base":false,"ac-dom-emitter":65,"ac-element-tracker":91,"ac-media-object":167}],267:[function(r,t,q){var p,n=r("ac-deferred").Deferred,m=r("ac-dom-emitter").DOMEmitter,o=r("ac-base").Element,l=r("ac-event-emitter").EventEmitter;
var u={introStarted:"intro-started",introEnded:"intro-ended",preventImageLoad:"media"};
var s=function(){l.call(this);this.target=document.body;this.domEmitters=[];this.wrapper=o.select(".image-hero-wrapper");
this._boundFadeInIntro=this._fadeInIntro.bind(this);this._didFadeIn=false;this.loadTimeout=setTimeout(this._boundFadeInIntro,2000);
this._loadHeroImage().then(this._boundFadeInIntro)};p=s.prototype=new l(null);p._loadHeroImage=function(){var c=new n(),a=o.select(".image-hero"),f=o.getStyle(a,"backgroundImage"),d=f.replace(/^url\(["']?/,"").replace(/["']?\)$/,""),b=new Image(),g=new m(b);
g.once("load",c.resolve.bind(c));b.src=d;return c.promise()};p._fadeInIntro=function(){if(this._didFadeIn){return
}this._didFadeIn=true;clearTimeout(this.loadTimeout);var a=new m(this.wrapper);
a.once("transitionend webkitTransitionEnd oTransitionEnd",this._handleIntroFadeOutComplete,this);
this.domEmitters.push(a);o.removeClassName(document.documentElement,u.preventImageLoad);
o.addClassName(this.target,u.introStarted)};p._handleIntroFadeOutComplete=function(){o.addClassName(this.target,u.introEnded)
};t.exports=s},{"ac-base":false,"ac-dom-emitter":65}],268:[function(G,L,v){var w=G("../shared/Shared"),E=G("../shared/PositionedCaptionController"),x=G("ac-base").Element,F,M,I,B,K,A,y,J,H,u,C;
try{F=G("./HeroIntroEnhancer");M=G("./HeroIntroFadeEnhancer");I=G("../shared/ParallaxObjectsController");
B=G("../shared/ElementTrackersController");K=G("../shared/RenderPlayerController");
A=G("../shared/BreakpointsDelegate");y=G("window-delegate").WindowDelegate;H=G("ac-clock");
u=G("../shared/GraphFactory");C=G("../shared/CalloutTrackerFactory")}catch(z){w.initialize();
x.removeClassName(document.documentElement,"hero-intro");x.removeClassName(document.documentElement,"media");
return}var D=(function(){var a=new H.ThrottledClock(30);return{initialize:function(){var c=w.initialize();
var d=new E();this.use2x=false;if(window.devicePixelRatio&&window.devicePixelRatio>1.5){this.use2x=true
}if(c.parallax){var g=new I(this._getParallaxObjects());g.start()}if(c.ambient){var b=new B(this._getElementTrackers());
b.start();x.addClassName(document.body,"animatable")}if(c.media){var f=new F(this._getHeroIntroEnhancement(),this._getRenderPlayerEnhancements())
}else{if(c.heroIntro){var h=new M()}}return this},_getElementTrackers:function(){var b=[];
this._registerCalloutsTracker(b);this._registerFadeInTracker(b);return b},_registerCalloutsTracker:function(b){var c=[{selector:".section-hardware-compare",delay:0},{selector:".section-largest .callout-depth-iphone-6",delay:0},{selector:".section-largest .callout-depth-iphone-6-plus",delay:0},{selector:".section-technology .rounded-callout-container",targets:[".callout"],stagger:150},{selector:".section-display .callout-list",targets:[".callout"],stagger:200},{selector:".section-camera-lense .callout-list",targets:[".callout"],stagger:200},];
C.addToTrackerList(b,c)},_registerFadeInTracker:function(i){var c=[{selector:".section-design-details.section-fade-in",delay:0},{selector:".section-buttons.section-fade-in",delay:0},];
var b=function(j){x.addClassName(j.el,"animated")};for(var h=0,d=c.length;h<d;h++){var g=c[h];
var f=g.selector;i.push({selectorQuery:f,onEnter:b,runOnce:true,options:{timeToEngage:10,inViewThreshold:0.1}})
}},_offsetTopForLinkList:function(){return y.innerHeight*0.52},_offsetBottomForLinkList:function(){return 200*y.innerHeight/986
},_getParallaxObjects:function(){return[{selectorQuery:".video-inline-item-list",type:"videoLinks",options:{smooth:true,startInView:true,offsetTop:this._offsetTopForLinkList,offsetBottom:this._offsetBottomForLinkList,preventStart:true}},{selectorQuery:".section-intro-copy .intro",type:"introCopy",options:{smooth:true,startInView:true,offsetTop:0,offsetBottom:function(){return y.innerHeight*0.5
}}},{selectorQuery:".section-hardware-compare .column-comparison-shot",targets:[".image-size-comparison-left",".image-size-comparison-right"],type:"comparison",options:{smooth:true,startInView:true,offsetTop:0,offsetBottom:function(){return y.innerHeight
}}},{selectorQuery:".section-ios",targets:[".image-ios-release-right",".image-ios-release-left"],type:"biggestRight",options:{smooth:true,startInView:true,offsetTop:0,offsetBottom:function(){return y.innerHeight*1.5
}}},]},_getHeroIntroEnhancement:function(){return{name:"hero-intro",selectorQuery:".image-hero",interaction:"basic",size:"xlarge",subPath:"overview",loadPriority:1,retina:this.use2x}
},_getRenderPlayerEnhancements:function(){return[{name:"hero-scrollable",selectorQuery:".image-hero-scroll",interaction:"scrollable",subPath:"overview",size:"xlarge",loadPriority:2,retina:this.use2x,clock:a,playerOptions:{offsetTop:this._handleHeroScrollOffsetTop,offsetBottom:this._handleHeroScrollOffsetBottom,clock:a,startInView:true}},{name:"largest-scrollable",selectorQuery:".image-largest-hero",interaction:"scrollable",subPath:"overview",size:"xlarge",loadPriority:3,retina:this.use2x,clock:a,playerOptions:{clock:a,offsetTop:this._handleLargestOffsetTop,offsetBottom:this._handleLargestOffsetBottom}},{name:"display-scrollable",selectorQuery:".image-display-hero",interaction:"scrollable",subPath:"overview",loadPriority:3,size:"xlarge",retina:this.use2x,playerOptions:{clock:a,offsetTop:this._handleDisplayOffsetTop,offsetBottom:this._handleDisplayOffsetBottom}},{name:"camera-scrollable",selectorQuery:".image-popular",interaction:"scrollable",subPath:"overview",loadPriority:3,size:"xlarge",retina:this.use2x,playerOptions:{clock:a,offsetTop:this._handleCameraOffsetTop,offsetBottom:this._handleCameraOffsetBottom}},{name:"wireless-scrollable",selectorQuery:".image-wireless",interaction:"scrollable",subPath:"overview",loadPriority:3,size:"xlarge",retina:this.use2x,playerOptions:{clock:a,offsetTop:this._handleWirelessOffsetTop,offsetBottom:this._handleWirelessOffsetBottom}}]
},_handleHeroScrollOffsetTop:function(){var b=-(y.innerHeight*0.14);return b},_handleHeroScrollOffsetBottom:function(){var b=y.innerHeight*0.15;
return b},_handleLargestOffsetTop:function(){var c=x.select(".image-largest-hero"),d=x.getBoundingBox(c),b=d.height-100;
return b},_handleLargestOffsetBottom:function(){var b=y.innerHeight*0.75-300*y.innerHeight/986;
return b},_handleDisplayOffsetTop:function(){var b=0;return b},_handleDisplayOffsetBottom:function(){var c=x.select(".image-display-hero"),d=x.getBoundingBox(c),b=d.height+80;
return b},_handleCameraOffsetTop:function(){var c=x.select(".image-largest-hero"),d=x.getBoundingBox(c),b=d.height*0.55;
return b},_handleCameraOffsetBottom:function(){var b=y.innerHeight*0.75;return b
},_handleWirelessOffsetTop:function(){var b=0;return b},_handleWirelessOffsetBottom:function(){var c=x.select(".image-wireless"),d=x.getBoundingBox(c),b=d.height+80;
return b}}}());L.exports=D.initialize()},{"../shared/BreakpointsDelegate":269,"../shared/CalloutTrackerFactory":270,"../shared/ElementTrackersController":273,"../shared/GraphFactory":275,"../shared/ParallaxObjectsController":278,"../shared/PositionedCaptionController":280,"../shared/RenderPlayerController":281,"../shared/Shared":284,"./HeroIntroEnhancer":266,"./HeroIntroFadeEnhancer":267,"ac-base":false,"ac-clock":56,"window-delegate":263}],269:[function(t,u,r){var q,n=t("ac-base").Element,s=t("ac-object"),l=t("window-delegate").WindowDelegate,m=t("ac-event-emitter").EventEmitter;
var p={xsmall:{width:0,content:288,touch:true},medium:{width:768,content:724},large:{width:1024,content:980,oldIE:true},xlarge:{width:1440,content:980}};
var o=function(){this.breakpoint=null;this._lastBreakpoint=null;this._handleOldIE();
this._handleTouchDevices();this._breakpointOrder=this._setBreakpointOrder();if(!this._isOldIE){l.on("resize orientationchange",this._handleResize,this);
this._handleResize()}};q=o.prototype=new m(null);q._handleResize=function(){var d=l.innerWidth,c;
var f,g,a,b=this._breakpointOrder.length;for(f=0;f<b;f++){g=this._breakpointOrder[f];
a=p[g];if(a.width>d){break}}if(f>0){f=f-1}c=p[this._breakpointOrder[f]];if(!this.breakpoint){this.breakpoint=c;
return}if(c.name===this.breakpoint.name){return}this._lastBreakpoint=this.breakpoint;
this.breakpoint=c;this.trigger("breakpoint",{incoming:this.breakpoint,outgoing:this._lastBreakpoint})
};q._setBreakpointOrder=function(){var a=[],b=[],c;for(c in p){if(p.hasOwnProperty(c)){p[c].name=c;
a.push(p[c].width)}}a.sort(function(d,f){return d-f});a.forEach(function(d){var f;
for(f in p){if(p.hasOwnProperty(f)){if(p[f].width===d){b.push(f)}}}});return b};
q._handleOldIE=function(){if(!n.hasClassName(document.documentElement,"oldie")){return
}this.breakpoint=p.large;this._isOldIE=true;this._replaceBreakpoints(function(a){return a.oldIE===true
})};q._handleTouchDevices=function(){if(n.hasClassName(document.documentElement,"touch")){return
}this._replaceBreakpoints(function(a){return !a.touch})};q._replaceBreakpoints=function(c){var a,d={},b;
for(a in p){if(p.hasOwnProperty(a)){b=p[a];if(c(b)){d[a]=s.clone(p[a])}}}p=d};u.exports=new o()
},{"ac-base":false,"ac-object":182,"window-delegate":263}],270:[function(g,k,h){var j=g("ac-base").Element;
var i=(function(){return{addToTrackerList:function(a,b){var c=this._calloutEnter.bind(this);
b.forEach(function(d,f){a.push({selectorQuery:d.selector,targets:d.targets,stagger:d.stagger,onEnter:c,delay:d.delay,runOnce:true,options:{inViewThreshold:d.inViewThreshold||0.5}})
}.bind(this))},_calloutEnter:function(a){var c=a.delay;var b=a.stagger||200;if(a.targets){a.targets.forEach(function(d,f){this._addClassWithDelay(d,b*f)
}.bind(this))}else{this._addClassWithDelay(a.el,c)}},_addClassWithDelay:function(a,b){if(b){setTimeout(function(){j.addClassName(a,"animated")
},b)}else{j.addClassName(a,"animated")}}}})();k.exports=i},{"ac-base":false}],271:[function(D,F,A){var x=D("./dev");
var s=D("./FitPixelRatioCanvas");var z=D("ac-base").Environment;var v=D("ac-base").Element;
var r=D("ac-curves").Curve;var w=D("ac-curves").Point.BezierPoint;var G=D("./DummyClip");
var E=D("ac-animation-sequencer").BasicPlayer;var u=D("ac-animation-sequencer").Timeline;
var B=z.Feature.threeDTransformsAvailable();F.exports=y;function y(d,b,c,h){this.el=this._createElement();
this.canvas=v.select("canvas",this.el);this.labels=v.selectAll(".graph-label",this.el);
this.context=this.canvas.getContext("2d");this.scale=1;this._progress=0;this._pointProgress=0;
this.linewidth=3;this.dotSize=2;this.pointSize=this.linewidth*1.2;this.colorA=C(b);
this.colorB=C(c);this._originalPoints=d.slice(0);for(var f=0;f<this._originalPoints.length;
f++){var a=this._originalPoints[f];for(var g=0;g<a.length;g++){this._originalPoints[f][g]=a[g]
}}this.padding=5;this.resize(h)}y.prototype.devices=["iPhone","3G","3GS","4","4s","5","5s","iPhone 6"];
y.prototype.appendTo=function(a){a.style.backgroundImage="none";a.appendChild(this.el);
this.positionDOM()};y.prototype.resize=function(a){if("xsmall"===a.name){this.scale=0.78
}else{if("medium"===a.name){this.scale=0.76}else{this.scale=1.075}}this.reset();
this.positionDOM();this.render(this.context)};y.prototype.reset=function(){var a=this._originalPoints;
this.paddingBottom=33*this.scale;this.getDimension(a);this.rulePadding=this.graphHeight*2*this.scale;
this.targetRulePadding=25*this.scale;this.canvas.width=this.width;this.canvas.height=this.height;
s(this.canvas);this.curve=new r([new w([a[0][0]*this.scale,a[0][1]*this.scale],[a[0][0]*this.scale,a[0][1]*this.scale],[a[1][0]*this.scale,a[1][1]*this.scale]),new w([a[3][0]*this.scale,a[3][1]*this.scale],[a[2][0]*this.scale,a[2][1]*this.scale],[a[3][0]*this.scale,a[3][1]*this.scale])]);
this.segment=this.curve.__segments[0];this.preparePoints(a)};y.prototype.positionDOM=function(){for(var b=0,d=this.labels.length;
b<d;b++){var c=this.labels[b];var f=this.points[b];var g=Math.round(f.x-c.offsetWidth/2);
var a=Math.round(f.y);v.setVendorPrefixStyle(c,"transitionDelay",b*100+"ms, 0");
if(B){v.setVendorPrefixStyle(c,"transform","translate3d("+g+"px, "+a+"px, 0)")}else{v.setVendorPrefixStyle(c,"transform","translate("+g+"px, "+a+"px)")
}}};y.prototype.preparePoints=function(b){var k=[];var j=[];var m=[];for(var i=0,l=this.devices.length;
i<l;i++){var c=i/(l-1);var h=this.curve.x(c*this.graphWidth)[0];var d=this.segment.t(h.coords);
var f={x:this.segment.x(d),y:this.segment.y(d),size:this.points?this.points[i].size:0};
var g=this.getColorAt(c);if(!c){f.x=b[0][0];b.y=b[0][1]}f.color="rgb("+[g.r.toString(),g.g.toString(),g.b.toString()].join(",")+")";
k.push(f);var a={x:f.x,y:this.graphHeight+this.paddingBottom,size:this.dotSize,color:"#D6D6D6"};
j.push(a);m.push({start:a,end:f,padding:this.rules?this.rules[i].padding:this.rulePadding})
}this.points=k;this.dots=j;this.rules=m};y.prototype.getColorAt=function(a){return{r:(this.colorA.r+a*(this.colorB.r-this.colorA.r))&255,g:(this.colorA.g+a*(this.colorB.g-this.colorA.g))&255,b:(this.colorA.b+a*(this.colorB.b-this.colorA.b))&255}
};y.prototype.intro=function(){var h=this.context;var d=0;var f=[{clip:G,element:this,startDelay:0.12,duration:1,props:[{property:"_progress",from:0,to:1,easing:[0.35,0,0.03,1]}]}];
for(var c=0;c<this.devices.length;c++){d=0.1+c*0.1;f.push({clip:G,element:this.points[c],startDelay:d,duration:0.75,props:[{property:"size",from:0,to:this.pointSize,easing:"easeOutBack"}]});
f.push({clip:G,element:this.rules[c],startDelay:d-0.3,duration:0.5,props:[{property:"padding",from:this.rulePadding,to:this.targetRulePadding,easing:"easeOutQuint"}]})
}var a=u.create(f);var b=(new E(a));var g=this;b.on("timeupdate",function(i){if(i.time>0.15){v.addClassName(g.el.parentElement,"point-animated")
}if(i.time>0.8){v.addClassName(g.el.parentElement,"animated")}h.clearRect(0,0,h.canvas.width,h.canvas.height);
g.render(h)});b.on("ended",function(){});b.play()};y.prototype.progress=function(a){if(arguments.length){this._progress=a
}else{return this._progress}};y.prototype.render=function(d){var h=d.createLinearGradient(0,0,this.width,0);
var a=this._progress;d.save();d.translate(this.pointSize+this.padding,this.pointSize+this.padding);
h.addColorStop(0,"rgb("+[this.colorA.r,this.colorA.g,this.colorA.b]+")");h.addColorStop(1,"rgb("+[this.colorB.r,this.colorB.g,this.colorB.b]+")");
d.strokeStyle=h;d.beginPath();d.lineWidth=this.linewidth;d.moveTo(this.segment.p0[0],this.segment.p0[1]);
d.bezierCurveTo(this.segment.p1[0],this.segment.p1[1],this.segment.p2[0],this.segment.p2[1],this.segment.p3[0],this.segment.p3[1]);
d.stroke();d.globalCompositeOperation="source-over";for(var b=0,f=this.dots.length;
b<f;b++){var g=this.dots[b];d.beginPath();d.fillStyle=g.color;d.arc(g.x,g.y,g.size,0,Math.PI*2);
d.fill()}d.beginPath();d.strokeStyle="#D6D6D6";d.lineWidth=1;d.moveTo(this.dots[0].x,this.dots[0].y);
d.lineTo(this.dots[this.dots.length-1].x,this.dots[this.dots.length-1].y);d.stroke();
for(var b=0,f=this.points.length;b<f;b++){var g=this.points[b];var c=this.dots[b];
var i=this.rules[b];d.beginPath();d.strokeStyle="#D6D6D6";d.lineWidth=1;d.moveTo(i.start.x,i.start.y);
d.lineTo(i.end.x,Math.min(i.end.y+i.padding,i.start.y));d.stroke();d.beginPath();
d.fillStyle=g.color;d.arc(g.x,g.y,g.size,0,Math.PI*2);d.fill()}d.globalCompositeOperation="destination-in";
d.beginPath();d.fillStyle="white";d.fillRect(-this.padding*2,-10,this.width*a,this.height);
d.restore()};y.prototype.getDimension=function(a){this.width=0;this.height=0;for(var b=0,c=a.length;
b<c;b++){if(this.width<a[b][0]*this.scale){this.width=a[b][0]*this.scale}if(this.height<a[b][1]*this.scale){this.height=a[b][1]*this.scale
}}this.graphWidth=this.width;this.graphHeight=this.height;this.width=this.graphWidth+this.pointSize*2+this.padding*2;
this.height=this.graphHeight+this.pointSize*2+this.padding*2+this.paddingBottom
};y.prototype._createElement=function(){var a=document.createElement("div");var c=document.createElement("canvas");
var f=document.createElement("div");a.className="curve-graph";a.appendChild(c);
f.className="label-container";for(var b=0,g=this.devices.length;b<g;b++){var d=document.createElement("div");
d.className="graph-label graph-label-"+t(this.devices[b]);d.textContent=this.devices[b];
f.appendChild(d)}a.appendChild(f);return a};function C(a){var b=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
return b?{r:parseInt(b[1],16),g:parseInt(b[2],16),b:parseInt(b[3],16)}:null}function t(a){return a.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")
}},{"./DummyClip":272,"./FitPixelRatioCanvas":274,"./dev":285,"ac-animation-sequencer":8,"ac-base":false,"ac-curves":60}],272:[function(q,o,j){var l=q("ac-animation-sequencer").ElementClip;
var m={render:n};o.exports=p;function p(a){this.el=a.element;this.el.nodeType=1;
a.renderer=m;l.call(this,a)}p.create=function(a){return new p(a)};p.validate=function(a){return true
};for(var k in l.prototype){p.prototype[k]=l.prototype[k]}function n(a,b){b.forEach(function(c){a[c.prop]=c.value
})}},{"ac-animation-sequencer":8}],273:[function(j,p,k){var l,n=j("ac-base").Element,q=j("ac-element-engagement").ElementEngagement,o=new q();
var m=function(a){this.elementTracker=o;this.trackedElements=this._initializeElementTrackers(a)
};l=m.prototype;l.start=function(){this.elementTracker.start()};l.stop=function(){this.elementTracker.stop()
};l._initializeElementTrackers=function(a){var b,c=a.length,d=[];for(b=0;b<c;b++){d.push(this._initializeElementTracker(a[b]))
}return d};l._initializeElementTracker=function(c){var b=n.select(c.selectorQuery),d=this.elementTracker.addElement(b,c.options),a="on";
if(c.runOnce){a="once"}if(c.onEnter){d[a]("thresholdenter",c.onEnter,this)}if(c.onExit){d[a]("thresholdexit",c.onExit,this)
}if(c.delay){d.delay=c.delay}if(c.stagger){d.stagger=c.stagger}if(c.targets){d.targets=n.selectAll(c.targets.join(","),b)
}return d};p.exports=m},{"ac-base":false,"ac-element-engagement":78}],274:[function(d,g,f){g.exports=function(b){var c=b.getContext("2d");
var a=window.devicePixelRatio||1;if(1!=a){b.style.width=b.width+"px";b.style.height=b.height+"px";
b.width*=a;b.height*=a;c.scale(a,a)}return b}},{}],275:[function(m,k,h){var l=m("../shared/CurveGraph");
var i=m("./BreakpointsDelegate");var j={create:function(d){var a;var f;var b;var c;
if("cpu"===d){f=[[0/2,380/2],[460/2,380/2],[342/2,3/2],[660/2,3/2]];b="#95C94C";
c="#0088CC"}else{f=[[0/2,379.8/2],[506/2,379.8/2],[552/2,38.8/2],[660/2,2.8/2]];
b="#FCEE21";c="#F15A24"}a=new l(f,b,c,i.breakpoint);BreakpointsDelgate.on("breakpoint",function(g){a.resize(g.incoming)
});return a}};k.exports=j},{"../shared/CurveGraph":271,"./BreakpointsDelegate":269}],276:[function(m,l,h){var k=m("ac-base").Element,i=m("../shared/BreakpointsDelegate");
var j=(function(){var a={medium:function(d,f,c){var b=100;if(i.breakpoint.name==="medium"){b=50
}b=c.time*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")},videoLinks:function(c,g,b){var d=document.body.className;
var f=45;if(!/intro\-ended/.test(d)){return}c.style.transitionDuration="0, 0";c.style.transitionDelay="0, 0";
c.style.opacity=1-b.time;if(/scrollable-hero/.test(d)){k.setVendorPrefixStyle(c,"transform","translate3d(0,"+(-b.time*f)+"px,0)")
}},introCopy:function(d,f,c){var b=75;b=(1-c.time)*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")
},comparison:function(d,g,b){var c=125;var f=200;k.setVendorPrefixStyle(g[0],"transform","translate3d(0,"+c*(1-b.time)+"px,0)");
k.setVendorPrefixStyle(g[1],"transform","translate3d(0,"+f*(1-b.time)+"px,0)")},imagePowerful:function(d,f,c){var b=70;
b=(1-c.time)*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")
},biggestRight:function(d,g,b){var f=220*0.4;var c=150*0.4;g.forEach(function(q,s){var r=(1-b.time)*(s?f:c);
k.setVendorPrefixStyle(q,"transform","translate3d(0,"+r+"px,0)")})},biggestLeft:function(c,d,b){offset=(1-b.time)*offset;
k.setVendorPrefixStyle(c,"transform","translate3d(0,"+offset+"px,0)")},largeUpwards:function(d,f,c){var b=150;
b=(1-c.time)*b;if(f){f.forEach(function(g){k.setVendorPrefixStyle(g,"transform","translate3d(0,"+b+"px,0)")
})}else{k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")}},largeDownwards:function(d,f,c){var b=100;
b=-(1-c.time)*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")
},extraLargeDownwards:function(d,f,c){var b=220;b=-(1-c.time)*b;f.forEach(function(g){k.setVendorPrefixStyle(g,"transform","translate3d(0,"+b+"px,0)")
})},mediumUpwards:function(d,f,c){var b=50;b=(1-c.time)*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")
},mediumTwoUpwards:function(d,g,b){var f=50;var c=100;g.forEach(function(s,v){var u=v?f:c;
var t=(1-b.time)*u;var w=(1-b.time)*10;k.setVendorPrefixStyle(s,"transform","translate3d( "+w+"px, "+t+"px,0)")
})},mediumDownwards:function(d,f,c){var b=50;b=-(1-c.time)*b;k.setVendorPrefixStyle(d,"transform","translate3d(0,"+b+"px,0)")
}};return{getFunctionByKey:function(b){return a[b]}}}());l.exports=j},{"../shared/BreakpointsDelegate":269,"ac-base":false}],277:[function(o,n,i){var l,m=o("ac-event-emitter").EventEmitter,j=o("scroll-time-update").ElementScrollTimeUpdate;
var k=function(b,a,c){this._scrollHandler=new j(b,c);this._scrollHandler.on("draw",a);
if(!c.preventStart){this._scrollHandler.setCurrentTime()}};l=k.prototype=new m(null);
l.start=function(){this._scrollHandler._clock.start();return this};l.stop=function(){this._scrollHandler._clock.stop();
return this};l.resize=function(){this._scrollHandler.setOffsets()};n.exports=k},{"scroll-time-update":260}],278:[function(j,p,k){var m,o=j("ac-base").Element,n=j("./ParallaxFunctions"),l=j("./ParallaxObject");
var q=function(a){this.parallaxObjects=this._initializeParallaxObjects(a);this.resize=this.resize.bind(this)
};m=q.prototype;m.start=function(){this.parallaxObjects.forEach(function(a){a.start()
})};m.resize=function(){this.parallaxObjects.forEach(function(a){a.resize()})};
m.stop=function(){this.parallaxObjects.forEach(function(a){a.stop()})};m._initializeParallaxObjects=function(b){var c=[],d=b.length,a;
for(a=0;a<d;a++){c.push(this._initializeParallaxObject(b[a]))}return c};m._initializeParallaxObject=function(c){var a=o.select(c.selectorQuery),d=c.targets?o.selectAll(c.targets.join(","),a):null,f=n.getFunctionByKey(c.type),b=new l(a,f.bind(null,a,d),c.options);
return b};p.exports=q},{"./ParallaxFunctions":276,"./ParallaxObject":277,"ac-base":false}],279:[function(g,k,h){var j=g("ac-base").Element;
k.exports=i;function i(a){this.el=a;this.container=j.ancestor(this.el,".column");
this.isRight=/right/.test(this.container.className);this.resize=this.resize.bind(this)
}i.prototype.resize=function(a){var b=j.getBoundingBox(this.container);var c=Math.round((b.width-a.width*0.5)/2);
if(b.width===a.width){c=-1}if(c>0){if(this.isRight){c*=-1}j.setVendorPrefixStyle(this.el,"transform","translate3d("+c+"px, 0, 0)")
}else{j.setVendorPrefixStyle(this.el,"transform","")}}},{"ac-base":false}],280:[function(o,m,i){var l=o("ac-base").Element;
var n=o("window-delegate").WindowDelegate;var k=o("./PositionedCaption");m.exports=j;
function j(){this.captions=l.selectAll(this.selector).map(function(a){return new k(a)
});n.on("resize",this.onresize.bind(this));this.onresize()}j.prototype.selector=".section-two-boxes .caption";
j.prototype.onresize=function(){var a=this._getWindowFrame();this.captions.forEach(function(b){b.resize(a)
})};j.prototype._getWindowFrame=function(){return{width:n.innerWidth,height:n.innerHeight}
}},{"./PositionedCaption":279,"ac-base":false,"window-delegate":263}],281:[function(E,I,v){var z,D=window.mediaConfig,L=E("./experienceReport"),M=E("ac-deferred").Deferred,C=E("ac-deferred").all,u=E("ac-object"),w=E("ac-base").Element,B=E("ac-base").Environment,F=E("ac-event-emitter").EventEmitter,J=E("ac-media-object"),A=E("ac-renderplayer"),H=E("ac-element-tracker"),G=E("./BreakpointsDelegate"),x=E("./RenderPlayerEnvironment");
var y={subPath:"",loadPriority:2,interaction:"scroll",filename:"asset",retina:false,playerOptions:{},controllerOptions:{hideOutOfView:true}};
var K=function(a){F.call(this);this.promises=[];this.elementTrackers=[];this.enhancements={};
this.mediaObjects={};this.renderPlayers={};this._initialize(a)};z=K.prototype=new F(null);
z._initialize=function(l){var g,a,i,j,m,b,h,d,k,c,f=l.length;for(g=0;g<f;g++){if(D&&D.videos&&D.videos.indexOf(l[g].name)===-1){continue
}b=u.defaults(y,l[g]);b=this._mixinExperienceReportOptions(b);i=w.select(b.selectorQuery);
a=b.key||b.name;k=b.filename;if(typeof b.size==="undefined"){b=this._setEnhancementSize(b);
k=b.filename}else{if(b.size&&b.size.length>0){k=b.filename+"_"+b.size}}if(b.retina){k=k+"_2x"
}c=false||b.forceElementLoading;m=J.cname(x.getBasePath()+"/"+b.subPath+"/"+b.name+"/");
h=J.create(i,{basePath:m,filename:k,fileFormat:b.fileFormat},{preload:false,type:b.type,forceElementLoading:c});
if(b.interaction==="ambient"){d=A.createAmbient(h,b.playerOptions)}else{if(b.interaction==="scrollable"){d=A.createScrubOnScroll(h,b.playerOptions)
}else{if(b.interaction==="basic"){d=A.createBasicPlayer(h,b.playerOptions)}else{throw new TypeError("Interaction not defined for RenderPlayer asset");
return}}}j=new M();this.promises.push(j.promise());this.enhancements[a]=b;this.mediaObjects[a]=h;
this.renderPlayers[a]=d;this._bindEvents(a,h,d,j,b,i)}C(this.promises).then(this._handleAssetsReady.bind(this))
};z._mixinExperienceReportOptions=function(b){if(!b.type){var a=b.interaction;if(a==="basic"){a="ambient"
}b.type=L[a].experience;b.fileFormat=x.getEnhancementFileFormats()[b.type]}return b
};z._bindEvents=function(c,g,f,b,d,a){g.once("ready",this._handleMediaObjectReady.bind(this,c,b));
g.once("enhance",this._handleMediaObjectEnhanced.bind(this,c,g));var h;if(d.controllerOptions.hideOutOfView){this._addTracker(g,a,h,c)
}};z._addTracker=function(f,c,a,d){var b=H.addElement(c);b.on("enterview",this._onElementEnter.bind(this,f,c,a,d));
b.on("exitview",this._onElementExit.bind(this,f,c,a,d));this.elementTrackers.push(b)
};z._onElementEnter=function(a,c,b,d){b=b||a._mediaElement;w.removeClassName(b,"hidden")
};z._onElementExit=function(a,c,b,d){if(d==="hero-intro"){a.destroy();c.parentNode.removeChild(c);
return}b=b||a._mediaElement;w.addClassName(b,"hidden")};z._handleMediaObjectReady=function(c,a,b){this.trigger("assetReady",{key:c,asset:b});
a.resolve()};z._handleMediaObjectEnhanced=function(b,a){this.trigger("enhanced",{key:b,asset:a})
};z._setEnhancementSize=function(a){var b=G.breakpoint.name;if(b==="xsmall"){b="medium"
}a.size=b;a.filename=a.filename+"_"+a.size;return a};z._handleAssetsReady=function(){this.trigger("complete",this.renderPlayers)
};I.exports=K},{"./BreakpointsDelegate":269,"./RenderPlayerEnvironment":282,"./experienceReport":286,"ac-base":false,"ac-element-tracker":91,"ac-media-object":167,"ac-object":182,"ac-renderplayer":226}],282:[function(k,j,h){var i=window.mediaConfig;
var g=(function(){var b="us",c={basePath:"/105/media",hash:"cb62df28-5fd5-4ca9-a9be-78f836f209b0",baseSubdirectory:"iphone-6/2014"};
var a={h264:"mp4"};return{getBasePath:function(){var f=b,d=c.hash;if(i&&i.locale){f=i.locale
}if(i&&i.hash){d=i.hash}return c.basePath+"/"+f+"/"+c.baseSubdirectory+"/"+d},getEnhancementFileFormats:function(){return a
}}}());j.exports=g},{}],283:[function(q,n,j){var o=q("scroll-time-update").ScrollTimeUpdate;
var l=q("ac-event-emitter").EventEmitter;var m=q("ac-base").Element;var p=q("window-delegate").WindowDelegate;
n.exports=k;function k(c){this.el=c?m.select(this.selector,c):m.select(this.selector);
if(!this.el){return}this.scrollTimeUpdate=new o(0,1,{startInView:true,smooth:true});
this.prev=this.el.previousElementSibling;this.isFixed=false;this.onscroll=this.onscroll.bind(this);
this.readPosition=this.readPosition.bind(this);this.start=this.start.bind(this);
this.figure=m.select("figure",this.el);p.on("scroll",this.onscroll);p.on("resize",this.readPosition);
var a=100;var d=this;var b=m.select(".section-copy",this.el);this.scrollTimeUpdate.on("update",function(f){m.setVendorPrefixStyle(d.figure,"transform","translate3d(0,"+(1-f.time)*a+"px,0)");
d.el.style.opacity=f.time})}k.isSupported=(function(){var a=document.createElement("div");
return !!(a.getBoundingClientRect)})();k.prototype.selector=".section-next";k.prototype.onscroll=function(){var f=p.scrollY;
var c=this.prevOffsetBottom;var d=p.innerHeight;var a=0;var b;if(!c||c>=f+d){b=false
}else{b=c>f+this.delta;a=1-(c-(f+this.delta))/this.height}if(b===this.isFixed){return
}if(b){this.el.style.position="fixed";this.el.style.bottom="0";this.prev.style.marginBottom=this.height+"px"
}else{this.el.style.position="";this.el.style.bottom="";this.prev.style.marginBottom=""
}this.isFixed=b};k.prototype.readPosition=function(){var a=this.prev.getBoundingClientRect();
this.height=this.el.clientHeight;this.delta=p.innerHeight-this.height;this.prevOffsetBottom=p.scrollY+a.top+a.height;
var b=this.scrollTimeUpdate.min=this.prevOffsetBottom-p.innerHeight;var c=this.scrollTimeUpdate.max=this.prevOffsetBottom-p.innerHeight+this.height;
this.scrollTimeUpdate._distance=c-b};k.prototype.start=function(){this.readPosition();
this.scrollTimeUpdate.start()}},{"ac-base":false,"scroll-time-update":260,"window-delegate":263}],284:[function(q,s,o){var p=q("./localnav");
var r=q("./RevealNext");var k=q("./BreakpointsDelegate");var n=q("ac-base").Environment;
var l=q("ac-base").Element;var m=(function(){var a=false,b=null,c=false;return{initialize:function(){if(a){return
}p.initialize();if(c){this.appRouter=new AppRouter();this.ajaxPageLoader=new AjaxPageLoader();
this.pageTransitionDelegate=new PageTransitionDelegate(this.appRouter,this.ajaxPageLoader)
}a=true;var d={ambient:true,parallax:true,media:false,heroIntro:false};if(k.breakpoint.name==="xsmall"||n.Feature.touchAvailable()){d.parallax=false;
d.media=false;d.ambient=false}if(l.hasClassName(document.documentElement,"media")&&(!n.Feature.touchAvailable())&&this.canUseMP4Video()){d.media=true
}else{if(l.hasClassName(document.documentElement,"hero-intro")){d.heroIntro=true
}}return d},getInitialized:function(){return a},getRoutingEnabled:function(){return c
},setRoutingEnabled:function(d){if(typeof d!=="boolean"){return}c=d},canUseMP4Video:function(){if(b!==null){return b
}try{var f=document.createElement("VIDEO");if(f.canPlayType&&f.canPlayType("video/mp4").replace(/no/," ")){b=true;
return true}}catch(d){}b=false;return false}}}());s.exports=m},{"./BreakpointsDelegate":269,"./RevealNext":283,"./localnav":287,"ac-base":false}],285:[function(i,h,f){h.exports=g;
function g(a,b){if(/dev/.test(window.location.host)){a._=b;a.setAttribute("inspectable","")
}}},{}],286:[function(m,k,h){var l=m("ac-experience-reporter");var i=m("../../../build/asset-type-matrix.json");
function j(){var a={};Object.keys(i).forEach(function(b){a[b]=l.newExperience(i[b])
});return a}k.exports=j()},{"../../../build/asset-type-matrix.json":1,"ac-experience-reporter":101}],287:[function(j,p,k){var m=j("ac-dom-emitter").DOMEmitter;
var o=j("ac-base").Element;var q=j("window-delegate").WindowDelegate;var n=j("ac-analytics");
var l=(function(){return{opened:false,closeThreshold:0,initialize:function(){var a=o.getElementById("globalheader");
this.globalheaderHeight=a?a.offsetHeight:46;this.localNav=o.getElementById("localnav");
this.menu=o.getElementById("menu");this.curtain=o.getElementById("curtain");this.main=o.getElementById("main");
this.footer=o.select(".footer-wrapper");var b=o.getElementById("explore-btn");this.menuEmitter=new m(this.menu);
q.on("scroll",this.navTrackPosition.bind(this));o.addEventListener(b,"click",this.toggle.bind(this));
o.addEventListener(this.curtain,"click",this.onCurtainTouch.bind(this));this.menuEmitter.on("transitionend webkitTransitionEnd oTransitionEnd",this.onTransitionEnd.bind(this));
if(typeof n==="object"){new n.observer.Event(this.menuEmitter,{interactionEvents:["localnav-open"]})
}return this},onTransitionEnd:function(){o.removeClassName(this.menu,"translating");
o.addClassName(this.menu,"translate-ended")},translate:function(){o.removeClassName(this.menu,"translate-ended");
o.addClassName(this.menu,"translating")},open:function(){o.addClassName(this.localNav,"open");
o.addClassName(this.curtain,"open");this.translate();this.opened=true;this.openedAt=q.scrollY;
var a=o.hasClassName(this.localNav,"lock")?"locked":"unlocked";this.menuEmitter.trigger("localnav-open",{prop3:"{PAGE_NAME_NO_LOCALE} - explore - "+a,title:"{PAGE_NAME_NO_LOCALE} - explore - "+a})
},close:function(){o.removeClassName(this.localNav,"open");o.removeClassName(this.curtain,"open");
this.translate();this.opened=false},toggle:function(){if(this.opened){this.close()
}else{this.open()}},onCurtainTouch:function(a){if(this.opened){this.close()}},withinThreshold:function(a){return(a>this.openedAt+this.closeThreshold)||(a<this.openedAt-this.closeThreshold)
},navTrackPosition:function(b){var a=q.scrollY;if(a>=this.globalheaderHeight){o.addClassName(this.localNav,"lock")
}else{o.removeClassName(this.localNav,"lock")}if(this.opened&&this.withinThreshold(a)){this.close()
}}}}());p.exports=l},{"ac-base":false,"ac-dom-emitter":65,"window-delegate":263}]},{},[268]);