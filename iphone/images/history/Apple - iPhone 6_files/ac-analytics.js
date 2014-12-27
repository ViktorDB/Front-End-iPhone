require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** 
 * @module ac-console
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	log: require('./ac-console/log')
};

},{"./ac-console/log":2}],2:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

var debugMessagingKey = 'f7c9180f-5c45-47b4-8de4-428015f096c0';
var allowDebugMessaging = !!(function () {
	try { return window.localStorage.getItem(debugMessagingKey); } catch (err) {}
}());

module.exports = function log (message) {
	if (window.console && typeof console.log !== 'undefined' && allowDebugMessaging) {
		console.log(message);
	}
};

},{}],3:[function(require,module,exports){
'use strict';

/**
 * @module ac-dom-events
 */
var events = {};

/**
 * Cross-browser event handling
 * @param {Element} target Element to listen for event on
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} [useCapture=false]
 * @returns target
 * @name module:ac-dom-events.addEventListener
 * @kind function
 */
events.addEventListener = function (target, type, listener, useCapture) {
	if (target.addEventListener) {
		target.addEventListener(type, listener, useCapture);
	} else if (target.attachEvent) {
		target.attachEvent('on' + type, listener);
	} else {
		target['on' + type] = listener;
	}
	return target;
};

/**
 * Cross-browser event dispatch
 * @param  {Element} target Element that will dispatch the event
 * @param  {String} type   The name of the event to fire
 * @returns {Element}       target
 * @name module:ac-dom-events.dispatchEvent
 * @kind function
 */
events.dispatchEvent = function (target, type) {
	// Expects polyfill for CustomEvent constructor
	if (document.createEvent) {
		target.dispatchEvent(new CustomEvent(type));
	} else {
		target.fireEvent('on' + type, document.createEventObject());
	}
	return target;
};

/**
 * Cross-browser event removing
 * @param {Element} target Element to listen for event on
 * @param {String} type
 * @param {Function} listener
 * @param {Boolean} [useCapture=false]
 * @returns target
 * @name module:ac-dom-events.removeEventListener
 * @kind function
 */
events.removeEventListener = function (target, type, listener, useCapture) {
	if (target.removeEventListener) {
		target.removeEventListener(type, listener, useCapture);
	} else {
		target.detachEvent('on' + type, listener);
	}
	return target;
};

var prefixMatch = /^(webkit|moz|ms|o)/i;

/**
 * Sets all the vendor event listeners of type on element.
 * @param {Element} target Element for which to set the listener upon
 * @param {String} type String representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
 * @param {Function} listener Object that receives a notification when an event of the specified type occurs.
 * @param {Boolean} [useCapture=false] If true, useCapture indicates that the user wishes to initiate capture.
 * @returns target
 * @name module:ac-dom-events.addVendorPrefixEventListener
 * @kind function
 */
events.addVendorPrefixEventListener = function (target, type, listener, useCapture) {
	if (prefixMatch.test(type)) {
		type = type.replace(prefixMatch, '');
	} else {
		type = type.charAt(0).toUpperCase() + type.slice(1);
	}

	// To avoid adding the same event twice, we need to sniff the user agent.
	// Once we've confirmed a browser supports the generic event name, we'll
	// change this if to be < that build.
	if (/WebKit/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, 'webkit' + type, listener, useCapture);
	} else if (/Opera/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, 'O' + type, listener, useCapture);
	} else if (/Gecko/i.test(window.navigator.userAgent)) {
		return events.addEventListener(target, type.toLowerCase(), listener, useCapture);
	} else {
		type = type.charAt(0).toLowerCase() + type.slice(1);
		return events.addEventListener(target, type, listener, useCapture);
	}
};

/**
 * Removes all the vendor event listeners of type on an element.
 * @param {Element} target Element for which to remove the listener from
 * @param {String} type String representing the event type to listen for, e.g. animationEnd, webkitAnimationEnd, etc... IMPORTANT: This value is expected to be a string in camelCase.
 * @param {Function} listener Object that receives a notification when an event of the specified type occurs.
 * @param {Boolean} [useCapture=false] If true, useCapture indicates that the user wishes to initiate capture.
 * @returns target
 * @name module:ac-dom-events.removeVendorPrefixEventListener
 * @kind function
 */
events.removeVendorPrefixEventListener = function (target, type, listener, useCapture) {
	if (prefixMatch.test(type)) {
		type = type.replace(prefixMatch, '');
	} else {
		type = type.charAt(0).toUpperCase() + type.slice(1);
	}

	events.removeEventListener(target, 'webkit' + type, listener, useCapture);
	events.removeEventListener(target, 'O' + type, listener, useCapture);
	events.removeEventListener(target, type.toLowerCase(), listener, useCapture);

	type = type.charAt(0).toLowerCase() + type.slice(1);
	return events.removeEventListener(target, type, listener, useCapture);
};

/**
 * Stop propagation of event and prevent default behavior.
 * @param {Event} evt The event to stop
 * @name module:ac-dom-events.stop
 * @kind function
 */
events.stop = function (evt) {
	if (!evt) {
		evt = window.event;
	}

	if (evt.stopPropagation) {
		evt.stopPropagation();
	} else {
		evt.cancelBubble = true;
	}

	if (evt.preventDefault) {
		evt.preventDefault();
	}

	evt.stopped = true;
	evt.returnValue = false;
};

/**
 * Cross-browser event target getter
 * @param {Event} evt
 * @name module:ac-dom-events.target
 * @kind function
 */
events.target = function (evt) {
	return (typeof evt.target !== 'undefined') ? evt.target : evt.srcElement;
};

module.exports = events;

},{}],4:[function(require,module,exports){
module.exports.DOMEmitter = require("./ac-dom-emitter/DOMEmitter");
},{"./ac-dom-emitter/DOMEmitter":5}],5:[function(require,module,exports){
/*global module */
'use strict';
var proto;

var EventEmitter = require('ac-event-emitter').EventEmitter;

/**
 * @name .DOMEmitter
 * @class DOMEmitter
 * <pre>DOMEmitter = require('/DOMEmitter');</pre>
 */


function DOMEmitter( el ) {
    if ( el === null ) {
        return;
    }
    this.el = el;
    this._bindings = {};
    this._eventEmitter = new EventEmitter();
}


proto = DOMEmitter.prototype;

proto._parseEventNames = function( evt ) {
    // handle any undefined/nulls and send em back
    if ( !evt ) {
        return [ evt ];
    }
    return evt.split(' ');
};

proto._onListenerEvent = function( evtName, e ) {
    this.trigger( evtName, e, false );
};

proto._setListener = function( evt ) {
    this._bindings[ evt ] = this._onListenerEvent.bind( this, evt );
    this._addEventListener( evt, this._bindings[ evt ] );
};

proto._removeListener = function( evt ) {
    this._removeEventListener( evt, this._bindings[ evt ] );
    delete this._bindings[ evt ];
};

proto._addEventListener = function( evt, func, useCapture ) {
    if ( this.el.addEventListener ) {
        this.el.addEventListener( evt, func, useCapture );
    } else if ( this.el.attachEvent ) {
        this.el.attachEvent( 'on' + evt, func );
    } else {
        target[ 'on' + evt ] = func;
    }
    return this;
};

proto._removeEventListener = function( evt, func, useCapture ) {
   if ( this.el.removeEventListener ) {
        this.el.removeEventListener( evt, func, useCapture );
    } else {
        this.el.detachEvent( 'on' + evt, func );
    }

    return this;
};

proto.on = function( evts, callback, context ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, evt ) {

        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }
        this._eventEmitter.on( evt, callback, context );

    }.bind( this, callback, context ));

    return this;
};

proto.off = function( evts, callback, context ) {
    var args = Array.prototype.slice.call( arguments, 0 );
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, args, evt ) {

        // Handle unbinding all events ( this.off(); )
        if ( args.length === 0 ) {
            this._eventEmitter.off();

            // for each event, unbind it
            var i;
            for ( i in this._bindings ) {
                if ( this._bindings.hasOwnProperty( i ) ) {
                    this._removeListener( i );
                }
            }
            return;
        }

        this._eventEmitter.off( evt, callback, context );

        // for specific events
        if ( !this.has( evt ) ) {
            this._removeListener( evt );
        }
            
    }.bind( this, callback, context, args ));

    return this;
};

proto.once = function( evts, callback, context ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( callback, context, evt ) {
        
        if ( !this.has( evt ) ) {
            this._setListener( evt );
        }
    
        this._eventEmitter.once.call( this, evt, callback, context );

    }.bind( this, callback, context ));

    return this;
};

proto.has = function( evt ) {
    if ( this._eventEmitter && this._eventEmitter.has( evt ) ) {
        return true;
    }
    return false;
};

proto.trigger = function( evts, data, doNotPropogate ) {
    evts = this._parseEventNames( evts );
    evts.forEach( function( data, doNotPropogate, evt ) {
        this._eventEmitter.trigger( evt, data, doNotPropogate );
    }.bind( this, data, doNotPropogate ));

    return this;
    
};

proto.destroy = function() {
    this.off();
    this.el = this._eventEmitter = this._bindings = null;
};

module.exports = DOMEmitter;
},{"ac-event-emitter":false}],6:[function(require,module,exports){
module.exports.WindowDelegate = require("./window-delegate/WindowDelegate");
module.exports.windowEmitter = require("./window-delegate/windowEmitter");
},{"./window-delegate/WindowDelegate":7,"./window-delegate/windowEmitter":8}],7:[function(require,module,exports){
/*global module */
"use strict";
var proto;

var windowEmitter = require('./windowEmitter');

/**
 * @name .WindowDelegate
 * @class WindowDelegate
 * <pre>WindowDelegate = require('/WindowDelegate');</pre>
 */
function WindowDelegate() {
	this._emitter = windowEmitter;

	this._setWindowDimensionValues();
	this._setScrollValues();

	this.on( 'resize', this._setWindowDimensionValues.bind( this ) );
	this.on( 'scroll', this._setScrollValues.bind( this ) );

	// scrollStop on touch devices
	this.on('touchstart', this._touchScrollStart.bind(this));

	// zoom events and values
	this.on('touchend', this._setZoomValues.bind(this));
}

proto = WindowDelegate.prototype;

proto.on = function() {
	this._emitter.on.apply( this._emitter, arguments );
	return this;
};

proto.once = function() {
	this._emitter.once.apply( this._emitter, arguments );
	return this;
};

proto.off = function() {
	this._emitter.off.apply( this._emitter, arguments );
	return this;
};

proto.has = function() {
	return this._emitter.has.apply( this._emitter, arguments );
};

proto.trigger = function() {
	this._emitter.trigger.apply( this._emitter, arguments );
	return this;
};

proto.propagateTo = function() {
	this._emitter.propagateTo.apply( this._emitter, arguments );
	return this;
};

proto.stopPropagatingTo = function() {
	this._emitter.stopPropagatingTo.apply( this._emitter, arguments );
	return this;
};

proto.isZoomed = function () {
	return this.clientWidth > this.innerWidth;
};

proto._setWindowDimensionValues = function() {
	this.clientWidth = document.documentElement.clientWidth;
	this.clientHeight = document.documentElement.clientHeight;
	this.innerWidth = window.innerWidth || this.clientWidth;
	this.innerHeight = window.innerHeight || this.clientHeight;
};

proto._setZoomValues = function() {
	var oldWidth = this.innerWidth;

	this.innerWidth = window.innerWidth;

	if (oldWidth !== this.innerWidth) {
		this.innerHeight = window.innerHeight;
		this.trigger('zoom');

		if (oldWidth < this.innerWidth) {
			this.trigger('zoomIn');
		} else {
			this.trigger('zoomOut');
		}

	} else {
		// check for double-tap zoom
		setTimeout(this._setZoomValues.bind(this), 500);
	}
};

proto._updateScrollX = function () {
	this.scrollX = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	this.maxScrollX = document.body.scrollWidth - this.innerWidth;

	return this.scrollX;
};

proto._updateScrollY = function () {
	this.scrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	this.maxScrollY = document.body.scrollHeight - this.innerHeight;

	return this.scrollY;
};

proto._setScrollValues = function () {
	var oldScrollX = this.scrollX,
		oldScrollY = this.scrollY;

	this._updateScrollX();
	this._updateScrollY();

	if (this.scrollX !== oldScrollX) {
		this.trigger('scrollX');
	}

	if (this.scrollY !== oldScrollY) {
		this.trigger('scrollY');
	}

	this._scrollStop();
};

proto._scrollStop = function () {
	if ( typeof window.ontouchstart === 'undefined' ) {
		if (this._scrollStopTimer) {
			clearTimeout(this._scrollStopTimer);
		}

		this._scrollStopTimer = setTimeout(function () {
			clearTimeout(this._scrollStopTimer);
			this.trigger('scrollStop');
		}.bind(this), 300);
	}
};

proto._touchScrollStart = function () {
	this._updateScrollX();
	this._updateScrollY();

	this.once('touchend', this._touchScrollStop.bind(this, this.scrollX, this.scrollY));
};

proto._touchScrollStop = function (startX, startY, moved) {
	this._updateScrollX();
	this._updateScrollY();

	if (startX !== this.scrollX || startY !== this.scrollY) {
		setTimeout(this._touchScrollStop.bind(this, this.scrollX, this.scrollY, true), 300);
	} else if (moved) {
		this.trigger('scrollStop');
	}
};

module.exports = new WindowDelegate();

},{"./windowEmitter":8}],8:[function(require,module,exports){
/*global module */
"use strict";
var DOMEmitter = require('ac-dom-emitter').DOMEmitter;

module.exports = new DOMEmitter( window );
},{"ac-dom-emitter":4}],9:[function(require,module,exports){
var ElementTracker = require("./ac-element-tracker/ElementTracker");
module.exports = new ElementTracker();
module.exports.ElementTracker = ElementTracker;

},{"./ac-element-tracker/ElementTracker":10}],10:[function(require,module,exports){
/**
 *  @desc Tracks, reports metrics, and emits events for various elements on the page
 *  @module ElementTracker
 */

'use strict';

var proto;
var ac_Object = require('ac-object');
var ac_Element = require('ac-base').Element;
var ac_Array = require('ac-base').Array;
var windowDelegate = require('window-delegate').WindowDelegate;
var TrackedElement = require('./TrackedElement');
var EventEmitter = require('ac-event-emitter').EventEmitter;

// default autoStart to false because it gives the user a chance to attach their event listeners
// before things start firing events.
var defaultOptions = {
	autoStart: false
};

/**
 * @constructor
 * @name ElementTracker
 * @param {(Array|NodeList)} elements - Array or Nodelist of DOM elements to track
 * @param {Object} [options] - Hash of user defined options
 */
function ElementTracker (elements, options) {

	this.options = ac_Object.clone(defaultOptions);
	this.options = typeof options === 'object' ? ac_Object.extend(this.options, options) : this.options;
	this.windowDelegate = windowDelegate;

	// are we tracking?
	this.tracking = false;

	// array of tracked element objects
	this.elements = [];

	// add elements if we get a valid Element object, Array or NodeList
	if (elements && (Array.isArray(elements) || this._isNodeList(elements) || ac_Element.isElement(elements))) {
		this.addElements(elements);
	}

	// only start if autoStart
	if (this.options.autoStart) {
		this.start();
	}

}

proto = ElementTracker.prototype = new EventEmitter();

var nodelistToStringPattern = /^\[object (HTMLCollection|NodeList|Object)\]$/;

/**
 * @desc is it a nodeList or an HTMLCollection?
 * @todo This is pulled directly from ac-base.Element v1.6. When ac-base 1.6 is released, use ac-base API for this.
 * @private
 */
proto._isNodeList = function(obj) {

	if(!obj) {
		return false;
	}

	// Is not array like
	if(typeof obj.length !== 'number') {
		return false;
	}

	// Is array like but not a nodelist
	if(typeof obj[0] === 'object' && (!obj[0] || !obj[0].nodeType)) {
		return false;
	}

	return nodelistToStringPattern.test(
		Object.prototype.toString.call(obj)
	);

};


/**
 * @desc Accepts single DOM Elements or an array of DOM Elements. Turns DOM Elements into TrackedElement objects and pushes them to this.elements
 * @private
 */
proto._registerElements = function (elements) {
	// make sure we use an array
	elements = [].concat(elements);

	elements.forEach(function (element) {
		// only register elements that are present in the DOM
		if (this._elementInDOM(element)) {
			var trackedElement = new TrackedElement(element);
			// we only want to get this once intially for now
			trackedElement.offsetTop = trackedElement.element.offsetTop;

			this.elements.push(trackedElement);
		}

	}, this);
};


/**
 * @desc Register objects that are already TrackedElement instances. Will accept a single object or an array of objects
 * @private
 */
proto._registerTrackedElements = function (trackedElements) {
	var objects = [].concat(trackedElements);

	objects.forEach(function (object) {
		// only register objects in DOM
		if (this._elementInDOM(object.element)) {
			object.offsetTop = object.element.offsetTop;
			this.elements.push(object);
		}
	}, this);
};

/**
 * @desc returns true if the element is a valid element and exists in the DOM
 * @private
 */
proto._elementInDOM = function (element) {
	var assertion = false;
	var body = document.getElementsByTagName('body')[0];

	if (ac_Element.isElement(element) && body.contains(element)) {
		assertion = true;
	}

	return assertion;
};

/**
 * @private
 */
proto._onVPChange = function () {
	this.elements.forEach(function (elementObj) {
		this.refreshElementState(elementObj);
	}, this);
};


/**
 * @private
 */
proto._elementPercentInView = function (elementObj) {
	return elementObj.pixelsInView / elementObj.height;
};

/**
 * @private
 */
proto._elementPixelsInView = function (elementObj) {
	// pixels in view will be 0 if none of the conditions below are met
	var pixels = 0;
	var top = elementObj.top;
	var bottom = elementObj.bottom;
	var winHeight = this.windowDelegate.innerHeight;

	// if both element top and bottom extend beyond viewport
	if (top <= 0 && bottom >= winHeight) {
		pixels = winHeight;

	// if element top is in view, but bottom isn't
	} else if (top >= 0 && top < winHeight && bottom > winHeight) {
		pixels = winHeight - top;

	// if element top is not in view, but bottom is
	} else if (top < 0 && (bottom < winHeight && bottom >= 0)) {
		pixels = elementObj.bottom;

	// if element is entirely in view
	} else if (top >= 0 && bottom <= winHeight) {
		pixels = elementObj.height;
	}

	return pixels;
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if is in view, but was not necessarily already in view.
 * @private
 */
proto._ifInView = function (trackedElement, alreadyInView) {
	// if the element enters view
	if (!alreadyInView) {
		trackedElement.trigger('enterview', trackedElement);
	}
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if it was already in view, but not necessarily in view anymore.
 * @private
 */
proto._ifAlreadyInView = function (trackedElement) {
	// if the element exits view
	if (!trackedElement.inView) {
		trackedElement.trigger('exitview', trackedElement);
	}
};

/**
 * Public Methods
 */


/**
 * @name ElementTracker#addElements
 * @desc Add elements to the element index. Accepts single element or array of elements or a nodelist
 * @public
 * @method
 * @param {(Element|Array|NodeList)} collection - A single DOM Element or an array of DOM Elements or a NodeList
 */
proto.addElements = function (collection) {
	collection = this._isNodeList(collection) ? ac_Array.toArray(collection) : [].concat(collection);
	collection.forEach(function (element) {
		this.addElement(element);
	}, this);
};

/**
 * @name ElementTracker#addElement
 * @desc Add a single element to be tracked. Pass just the DOM Element to use the default options, or pass an object with properties that match the `TrackedElement` API.
 * @public
 * @method
 * @param {Element} element - A DOM Element object
 * @returns a new instance of a `TrackedElement` object.
 * @throws TypeError if the supplied element is not a valid DOM Element
 */
proto.addElement = function (element) {
	var trackedElement;

	if (ac_Element.isElement(element)) {
		trackedElement = new TrackedElement(element);
		this._registerTrackedElements(trackedElement);
	}

	return trackedElement;
};

/**
 * @name ElementTracker#removeElement
 * @desc Remove an element object from the element index. Will remove any duplicates of passed element.
 * @public
 * @method
 * @param {(Element|Object)} element - A DOM Element or a valid `TrackedElement` object
 */
proto.removeElement = function (element) {
	var indexes = [];
	var filtered;

	this.elements.forEach(function (elementObj, i) {
		if (elementObj === element || elementObj.element === element) {
			indexes.push(i);
		}
	});

	// remove matched elements at specified indexes
	filtered = this.elements.filter(function (element, i) {
		return indexes.indexOf(i) < 0 ? true : false;
	});

	this.elements = filtered;
};

/**
 * @name ElementTracker#stop
 * @desc Stop tracking. Removes the scroll listener.
 * @public
 * @method
 */
proto.stop = function () {
	if (this.tracking === true) {
		this.tracking = false;
		this.windowDelegate.off('scroll resize orientationchange', this._onVPChange);
	}
};

/**
 * @name ElementTracker#start
 * @desc Start tracking. Adds the scroll listener.
 * @public
 * @method
 */
proto.start = function () {
	if (this.tracking === false) {
		this.tracking = true;
		this.windowDelegate.on('scroll resize orientationchange', this._onVPChange, this);
		this.refreshAllElementStates();
	}
};

/**
 * @name ElementTracker#refershAllElementStates
 * @desc Force a metric and state update on all tracked elements
 * @public
 * @method
 */
proto.refreshAllElementStates = function () {
	this.elements.forEach(function (trackedElement) {
		this.refreshElementState(trackedElement);
	}, this);
};

/**
 * @name ElementTracker#refershAllElementStates
 * @desc Force a metric and state update provided tracked element
 * @param {Object} trackedElement - the `TrackedElement` object of the elemet you want to update.
 * @public
 * @method
 * @returns the passed `trackedElement` object
 */
proto.refreshElementState = function (trackedElement) {
	var box = ac_Element.getBoundingBox(trackedElement.element);
	var alreadyInView = trackedElement.inView;

	trackedElement = ac_Object.extend(trackedElement, box);
	trackedElement.pixelsInView = this._elementPixelsInView(trackedElement);
	trackedElement.percentInView = this._elementPercentInView(trackedElement);
	trackedElement.inView = trackedElement.pixelsInView > 0;

	if (trackedElement.inView) {
		this._ifInView(trackedElement, alreadyInView);
	}

	if (alreadyInView) {
		this._ifAlreadyInView(trackedElement);
	}

	return trackedElement;
};



module.exports = ElementTracker;

},{"./TrackedElement":11,"ac-base":false,"ac-event-emitter":false,"ac-object":13,"window-delegate":6}],11:[function(require,module,exports){
/**
 *  @desc Extends DOMEmitter and wraps a DOM Element with metrics related to its position in the viewport.
 *  @module TrackedElement
 */

'use strict';

var proto;
var DOMEmitter = require('ac-dom-emitter').DOMEmitter;

/**
 * @constructor
 * @name TrackedElement
 * @param {Element} element - A valid DOM element
 */
function TrackedElement (element) {

	// if just an element is passed
	if (element.nodeType && element.nodeType > 0) {
		this.element = element;
	} else {
		throw new TypeError('TrackedElement: ' + element + ' is not a valid DOM element');
	}

	// baseline property values
	this.inView = false;
	this.percentInView = 0;
	this.pixelsInView = 0;
	this.offsetTop = 0;
	this.top = 0;
	this.right = 0;
	this.bottom = 0;
	this.left = 0;
	this.width = 0;
	this.height = 0;

	DOMEmitter.call(this, element);

}

proto = TrackedElement.prototype = new DOMEmitter(null);


module.exports = TrackedElement;

},{"ac-dom-emitter":4}],12:[function(require,module,exports){
/**
 * Object#toString() ref for stringify().
 */

var toString = Object.prototype.toString;

/**
 * Object#hasOwnProperty ref
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Array#indexOf shim.
 */

var indexOf = typeof Array.prototype.indexOf === 'function'
  ? function(arr, el) { return arr.indexOf(el); }
  : function(arr, el) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === el) return i;
      }
      return -1;
    };

/**
 * Array.isArray shim.
 */

var isArray = Array.isArray || function(arr) {
  return toString.call(arr) == '[object Array]';
};

/**
 * Object.keys shim.
 */

var objectKeys = Object.keys || function(obj) {
  var ret = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret.push(key);
    }
  }
  return ret;
};

/**
 * Array#forEach shim.
 */

var forEach = typeof Array.prototype.forEach === 'function'
  ? function(arr, fn) { return arr.forEach(fn); }
  : function(arr, fn) {
      for (var i = 0; i < arr.length; i++) fn(arr[i]);
    };

/**
 * Array#reduce shim.
 */

var reduce = function(arr, fn, initial) {
  if (typeof arr.reduce === 'function') return arr.reduce(fn, initial);
  var res = initial;
  for (var i = 0; i < arr.length; i++) res = fn(res, arr[i]);
  return res;
};

/**
 * Cache non-integer test regexp.
 */

var isint = /^[0-9]+$/;

function promote(parent, key) {
  if (parent[key].length == 0) return parent[key] = {}
  var t = {};
  for (var i in parent[key]) {
    if (hasOwnProperty.call(parent[key], i)) {
      t[i] = parent[key][i];
    }
  }
  parent[key] = t;
  return t;
}

function parse(parts, parent, key, val) {
  var part = parts.shift();

  // illegal
  if (hasOwnProperty.call(Object.prototype, key)) return;

  // end
  if (!part) {
    if (isArray(parent[key])) {
      parent[key].push(val);
    } else if ('object' == typeof parent[key]) {
      parent[key] = val;
    } else if ('undefined' == typeof parent[key]) {
      parent[key] = val;
    } else {
      parent[key] = [parent[key], val];
    }
    // array
  } else {
    var obj = parent[key] = parent[key] || [];
    if (']' == part) {
      if (isArray(obj)) {
        if ('' != val) obj.push(val);
      } else if ('object' == typeof obj) {
        obj[objectKeys(obj).length] = val;
      } else {
        obj = parent[key] = [parent[key], val];
      }
      // prop
    } else if (~indexOf(part, ']')) {
      part = part.substr(0, part.length - 1);
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
      // key
    } else {
      if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
      parse(parts, obj, part, val);
    }
  }
}

/**
 * Merge parent key/val pair.
 */

function merge(parent, key, val){
  if (~indexOf(key, ']')) {
    var parts = key.split('[')
      , len = parts.length
      , last = len - 1;
    parse(parts, parent, 'base', val);
    // optimize
  } else {
    if (!isint.test(key) && isArray(parent.base)) {
      var t = {};
      for (var k in parent.base) t[k] = parent.base[k];
      parent.base = t;
    }
    set(parent.base, key, val);
  }

  return parent;
}

/**
 * Compact sparse arrays.
 */

function compact(obj) {
  if ('object' != typeof obj) return obj;

  if (isArray(obj)) {
    var ret = [];

    for (var i in obj) {
      if (hasOwnProperty.call(obj, i)) {
        ret.push(obj[i]);
      }
    }

    return ret;
  }

  for (var key in obj) {
    obj[key] = compact(obj[key]);
  }

  return obj;
}

/**
 * Parse the given obj.
 */

function parseObject(obj){
  var ret = { base: {} };

  forEach(objectKeys(obj), function(name){
    merge(ret, name, obj[name]);
  });

  return compact(ret.base);
}

/**
 * Parse the given str.
 */

function parseString(str){
  var ret = reduce(String(str).split('&'), function(ret, pair){
    var eql = indexOf(pair, '=')
      , brace = lastBraceInKey(pair)
      , key = pair.substr(0, brace || eql)
      , val = pair.substr(brace || eql, pair.length)
      , val = val.substr(indexOf(val, '=') + 1, val.length);

    // ?foo
    if ('' == key) key = pair, val = '';
    if ('' == key) return ret;

    return merge(ret, decode(key), decode(val));
  }, { base: {} }).base;

  return compact(ret);
}

/**
 * Parse the given query `str` or `obj`, returning an object.
 *
 * @param {String} str | {Object} obj
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if (null == str || '' == str) return {};
  return 'object' == typeof str
    ? parseObject(str)
    : parseString(str);
};

/**
 * Turn the given `obj` into a query string
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

var stringify = exports.stringify = function(obj, prefix) {
  if (isArray(obj)) {
    return stringifyArray(obj, prefix);
  } else if ('[object Object]' == toString.call(obj)) {
    return stringifyObject(obj, prefix);
  } else if ('string' == typeof obj) {
    return stringifyString(obj, prefix);
  } else {
    return prefix + '=' + encodeURIComponent(String(obj));
  }
};

/**
 * Stringify the given `str`.
 *
 * @param {String} str
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyString(str, prefix) {
  if (!prefix) throw new TypeError('stringify expects an object');
  return prefix + '=' + encodeURIComponent(str);
}

/**
 * Stringify the given `arr`.
 *
 * @param {Array} arr
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyArray(arr, prefix) {
  var ret = [];
  if (!prefix) throw new TypeError('stringify expects an object');
  for (var i = 0; i < arr.length; i++) {
    ret.push(stringify(arr[i], prefix + '[' + i + ']'));
  }
  return ret.join('&');
}

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @param {String} prefix
 * @return {String}
 * @api private
 */

function stringifyObject(obj, prefix) {
  var ret = []
    , keys = objectKeys(obj)
    , key;

  for (var i = 0, len = keys.length; i < len; ++i) {
    key = keys[i];
    if ('' == key) continue;
    if (null == obj[key]) {
      ret.push(encodeURIComponent(key) + '=');
    } else {
      ret.push(stringify(obj[key], prefix
        ? prefix + '[' + encodeURIComponent(key) + ']'
        : encodeURIComponent(key)));
    }
  }

  return ret.join('&');
}

/**
 * Set `obj`'s `key` to `val` respecting
 * the weird and wonderful syntax of a qs,
 * where "foo=bar&foo=baz" becomes an array.
 *
 * @param {Object} obj
 * @param {String} key
 * @param {String} val
 * @api private
 */

function set(obj, key, val) {
  var v = obj[key];
  if (hasOwnProperty.call(Object.prototype, key)) return;
  if (undefined === v) {
    obj[key] = val;
  } else if (isArray(v)) {
    v.push(val);
  } else {
    obj[key] = [v, val];
  }
}

/**
 * Locate last brace in `str` within the key.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function lastBraceInKey(str) {
  var len = str.length
    , brace
    , c;
  for (var i = 0; i < len; ++i) {
    c = str[i];
    if (']' == c) brace = false;
    if ('[' == c) brace = true;
    if ('=' == c && !brace) return i;
  }
}

/**
 * Decode `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function decode(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (err) {
    return str;
  }
}

},{}],13:[function(require,module,exports){
/**
 * @module ac-object
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

module.exports = {
	clone: require('./ac-object/clone'),
	create: require('./ac-object/create'),
	defaults: require('./ac-object/defaults'),
	extend: require('./ac-object/extend'),
	getPrototypeOf: require('./ac-object/getPrototypeOf'),
	isDate: require('./ac-object/isDate'),
	isEmpty: require('./ac-object/isEmpty'),
	isRegExp: require('./ac-object/isRegExp'),
	toQueryParameters: require('./ac-object/toQueryParameters')
};

},{"./ac-object/clone":14,"./ac-object/create":15,"./ac-object/defaults":16,"./ac-object/extend":17,"./ac-object/getPrototypeOf":18,"./ac-object/isDate":19,"./ac-object/isEmpty":20,"./ac-object/isRegExp":21,"./ac-object/toQueryParameters":22}],14:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var extend = require('./extend');

/**
 * @name module:ac-object.clone
 *
 * @function
 * 
 * @desc Create a new Object that has the same properties as the original.
 *
 * @param {Object} object
 *        The Object to make a clone of.
 *
 * @returns {Object} The cloned object.
 */
module.exports = function clone (object) {
	return extend({}, object);
};

},{"./extend":17}],15:[function(require,module,exports){
/**
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var F = function () {};

/**
 * @name module:ac-object.create
 *
 * @function
 *
 * @desc Create a new Object who’s prototype is the object passed
 *
 * @see  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
 *
 * @param {Object} proto
 *        The prototype for the new Object
 *
 * @returns {Object} The new Object
 */
module.exports = function create(proto) {
	// Don’t support second argument because it is not possible to accurately polyfill
	if (arguments.length > 1) {
		throw new Error('Second argument not supported');
	}

	// Prototype object is required
	if (proto === null || typeof proto !== 'object') {
		throw new TypeError('Object prototype may only be an Object.');
	}

	// If native Object.create exists, use it!
	if (typeof Object.create === 'function') {
		return Object.create(proto);

	// Otherwise create a new Object F with the prototype provided assigned to it
	} else {
		F.prototype = proto;
		return new F();
	}
};

},{}],16:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var extend = require('./extend');

/**
 * @name module:ac-object.defaults
 *
 * @function
 * 
 * @desc Combines defaults and options into a new object and returns it.
 *
 * @param {Object} defaultsObj
 *        The defaults object.
 *
 * @param {Object} options
 *        The options object.
 *
 * @returns {Object} An object resulting from the combination of defaults and options.
 */
module.exports = function defaults (defaultsObj, options) {
	if (typeof defaultsObj !== 'object'){
		throw new TypeError('defaults: must provide a defaults object');
	}
	options = options || {};
	if (typeof options !== 'object'){
		throw new TypeError('defaults: options must be a typeof object');
	}
	return extend({}, defaultsObj, options);
};

},{"./extend":17}],17:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.extend
 *
 * @function
 * 
 * @desc Add properties from one object into another. Not a deep copy.
 *
 * @param {Object} destination
 *        The object where the properties will end up. Properties in this Object
 *        that have the same key as properties in the source object will be
 *        overwritten with the source property’s value. If destination is not
 *        provided a blank object is created.
 *
 * @param {Object} source
 *        The properties to add / overwrite in the destination Object. An infinite
 *        number of source paramaters may be passed.
 *
 * @returns {Object} The extended object.
 */
module.exports = function extend () {
	var args;
	var dest;

	if (arguments.length < 2) {
		args = [{}, arguments[0]];
	} else {
		args = [].slice.call(arguments);
	}

	dest = args.shift();

	args.forEach(function (source) {
		if (source != null) {
			for (var property in source) {
				// Anything that does not prototype Object will not have this method
				if (hasOwnProp.call(source, property)) {
					dest[property] = source[property];
				}
			}
		}
	});

	return dest;	
};

},{}],18:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.getPrototypeOf
 *
 * @function
 * 
 * @desc Returns the prototype (i.e. the internal [[Prototype]]) of the specified object.
 *
 * @param {Object} obj
 *        The object whose prototype is to be returned.
 *
 * @returns {Object} The prototype of the specified object.
 */
module.exports = function getPrototypeOf (obj) {
	if (Object.getPrototypeOf) {
		return Object.getPrototypeOf(obj);
	}
	else {
		if (typeof obj !== 'object') {
			throw new Error('Requested prototype of a value that is not an object.');
		}
		else if (typeof this.__proto__ === 'object') {
			return obj.__proto__;
		}
		else {
			var constructor = obj.constructor;
			var oldConstructor;
			if (hasOwnProp.call(obj, 'constructor')) {
				oldConstructor = constructor;
				// reset constructor
				if (!(delete obj.constructor)) {
					// can't delete obj.constructor, return null
					return null;
				}
				// get real constructor
				constructor = obj.constructor;
				// restore constructor
				obj.constructor = oldConstructor;
			}
			// needed for IE
			return constructor ? constructor.prototype : null;
		}
	}
};

},{}],19:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isDate
 *
 * @function
 * 
 * @desc Test an Object to see if it is an instance of the Date constructor or not.
 *
 * @param {Object} date
 *        The Object to test.
 *
 * @returns {Boolean} If the Object is a Date or not.
 */
module.exports = function isDate (date) {
	return Object.prototype.toString.call(date) === '[object Date]';
};

},{}],20:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * @name module:ac-object.isEmpty
 *
 * @function
 * 
 * @desc Check if an empty object.
 *
 * @param {Object} object
 *        The Object to check if empty.
 *
 * @returns {Boolean} Return true if and only if object is empty ({}).
 */
module.exports = function isEmpty (object) {
	var prop;

	if (typeof object !== 'object') {
		throw new TypeError('ac-base.Object.isEmpty : Invalid parameter - expected object');
	}

	for (prop in object) {
		if (hasOwnProp.call(object, prop)) {
			return false;
		}
	}

	return true;
};

},{}],21:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/**
 * @name module:ac-object.isRegExp
 *
 * @function
 * 
 * @desc Test whether or not an Object is a Regular Expression.
 *
 * @param {Object} obj
 *        Object to test whether or not it is a Regular Expression.
 *
 * @returns {Boolean} Whether or not it is a Regular Expression.
 */
module.exports = function isRegExp (obj) {
	return window.RegExp ? obj instanceof RegExp : false;
};

},{}],22:[function(require,module,exports){
/** 
 * @copyright 2014 Apple Inc. All rights reserved.
 */
'use strict';

/** @ignore */
var qs = require('qs');

/**
 * @name module:ac-object.toQueryParameters
 *
 * @function
 * 
 * @desc Convert object to query string.
 *
 * @param {Object} object
 *        The Object to convert to a query string.
 *
 * @returns {String} Returns query string representation of object.
 */
module.exports = function toQueryParameters (object) {
	if (typeof object !== 'object'){
		throw new TypeError('toQueryParameters error: argument is not an object');
	}
	return qs.stringify(object);
};

},{"qs":12}],23:[function(require,module,exports){
var ElementEngagement = require('./ac-element-engagement/ElementEngagement');

module.exports = new ElementEngagement();
module.exports.ElementEngagement = ElementEngagement;

},{"./ac-element-engagement/ElementEngagement":24}],24:[function(require,module,exports){
/**
 *  @desc Reports user engagement on tracked elements
 *  @module ElementEngagement
 */

'use strict';

var proto;
var ac_Object = require('ac-object');
var ac_Element = require('ac-base').Element;
var Super = require('ac-element-tracker').ElementTracker;

var trackedElementDefaults = {
	timeToEngage: 500,
	inViewThreshold: 0.75,
	stopOnEngaged: true
};

// defaults for when we decorate the TrackedElement objects
var extendedTrackedElementProps = {
	thresholdEnterTime: 0,
	thresholdExitTime: 0,
	inThreshold: false,
	engaged: false,
	tracking: true
};


/**
 * @constructor
 * @todo Think about implementing real time engagement tracking.
 *         current behavior is to report engagement only on thresholdexit.
 *         This mirrors the current track-section-engagement script.
 * @name ElementEngagement
 */

var ElementEngagement = function () {
	Super.call(this);
};

proto = ElementEngagement.prototype = new Super();

/**
 * @desc decorates the TrackedElement instances with ElementEngagement specific properties
 * @private
 */
proto._decorateTrackedElement = function (trackedElement, options) {
	var extendedDefaults;

	// merge user specified options with defaults
	extendedDefaults = ac_Object.defaults(trackedElementDefaults, options || {});
	ac_Object.extend(trackedElement, extendedDefaults);
	ac_Object.extend(trackedElement, extendedTrackedElementProps);
};


/**
 * @desc Adds EventEmitter listeners to an individual TrackedElement object
 * @private
 */
proto._attachElementListeners = function (trackedElement) {
	trackedElement.on('thresholdenter', this._thresholdEnter, this);
	trackedElement.on('thresholdexit', this._thresholdExit, this);
	trackedElement.on('enterview', this._enterView, this);
	trackedElement.on('exitview', this._exitView, this);
};

/**
 * @desc Removes EventEmitter listeners from an individaul TrackedElement object
 * @private
 */
proto._removeElementListeners = function (trackedElement) {
	trackedElement.off('thresholdenter', this._thresholdEnter);
	trackedElement.off('thresholdexit', this._thresholdExit);
	trackedElement.off('enterview', this._enterView);
	trackedElement.off('exitview', this._exitView);
};

/**
 * @desc Attaches EventEmitter listeners to all TrackedElement objects
 * @private
 */
proto._attachAllElementListeners = function () {
	this.elements.forEach(function (trackedElement) {
		if (!trackedElement.stopOnEngaged) {
			this._attachElementListeners(trackedElement);
		} else if (!trackedElement.engaged){
			this._attachElementListeners(trackedElement);
		}
	}, this);
};

/**
 * @desc Removes EventEmitter listeners from all TrackedElement objects
 * @private
 */
proto._removeAllElementListeners = function () {
	this.elements.forEach(function (trackedElement) {
		this._removeElementListeners(trackedElement);
	}, this);
};


/**
 * @desc is the element in view past its defined threshold? Offset if viewport is >= element height.
 * @private
 */
proto._elementInViewPastThreshold = function (trackedElement) {
	var winHeight = this.windowDelegate.innerHeight;
	var isIt = false;

	// if the whole viewport is filled with the element, then we consider that enough in view
	if (trackedElement.pixelsInView === winHeight) {
		isIt = true;
	} else {
		isIt = (trackedElement.percentInView > trackedElement.inViewThreshold);
	}

	return isIt;
};


/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if is in view, but was not necessarily already in view.
 * @private
 */
proto._ifInView = function (trackedElement, alreadyInView) {
	var alreadyInThreshold = trackedElement.inThreshold;
	Super.prototype._ifInView.apply(this, arguments);

	// if element enters view threshold
	if (!alreadyInThreshold && this._elementInViewPastThreshold(trackedElement)) {
		trackedElement.inThreshold = true;
		trackedElement.trigger('thresholdenter', trackedElement);

		if (typeof trackedElement.timeToEngage === 'number' && trackedElement.timeToEngage >= 0) {
			trackedElement.engagedTimeout = window.setTimeout(this._engaged.bind(this, trackedElement), trackedElement.timeToEngage);
		}
	}
};

/**
 * @desc Conditions to meet and actions to take when refreshing the element's state if it was already in view, but not necessarily in view anymore.
 * @private
 */
proto._ifAlreadyInView = function (trackedElement) {
	var alreadyInThreshold = trackedElement.inThreshold;
	Super.prototype._ifAlreadyInView.apply(this, arguments);

	// if element exits view threshold
	if (alreadyInThreshold && !this._elementInViewPastThreshold(trackedElement)) {
		trackedElement.inThreshold = false;
		trackedElement.trigger('thresholdexit', trackedElement);

		if (trackedElement.engagedTimeout) {
			window.clearTimeout(trackedElement.engagedTimeout);
			trackedElement.engagedTimeout = null;
		}
	}
};

proto._engaged = function (trackedElement) {
	trackedElement.engagedTimeout = null;
	this._elementEngaged(trackedElement);
	trackedElement.trigger('engaged', trackedElement);
	this.trigger('engaged', trackedElement);
};

/**
 * @desc Method that gets fired on EventEmitter 'thresholdenter' event
 * @private
 */
proto._thresholdEnter = function (trackedElement) {
	// replace old values
	trackedElement.thresholdEnterTime = Date.now();
	trackedElement.thresholdExitTime = 0;

	// fire thresholdenter event
	this.trigger('thresholdenter', trackedElement);
};

/**
 * @desc Method that gets fired on EventEmitter 'thresholdexit' event
 * @private
 **/
proto._thresholdExit = function (trackedElement) {
	// set exit time
	trackedElement.thresholdExitTime = Date.now();

	// fire thresholdexit event
	this.trigger('thresholdexit', trackedElement);
};

proto._enterView = function (trackedElement) {
	this.trigger('enterview', trackedElement);
};

proto._exitView = function (trackedElement) {
	this.trigger('exitview', trackedElement);
};

/**
 * @desc Method that fires on EventEmitter 'engaged' event
 * @private
 */
proto._elementEngaged = function (trackedElement) {
	trackedElement.engaged = true;
	// stop tracking element if stopOnEngaged is true
	if (trackedElement.stopOnEngaged) {
		this.stop(trackedElement);
	}
};


/**
 * Public methods
 */

/**
 * @method
 * @public
 * @desc Remove tracking from all elements. Or pass a single TrackedElement object to
 *       remove tracking from only that element.
 * @name ElementEngagement#stop
 * @param {Object} [trackedElement] - A TrackedElement object that is provided to ElementEngagement
 *                                    by ElementTracker.
 */
proto.stop = function (trackedElement) {
	// stop everything
	if (this.tracking && !trackedElement) {
		this._removeAllElementListeners();
		Super.prototype.stop.call(this);
	}

	// just stop tracking the trackedElement
	if (trackedElement && trackedElement.tracking) {
		trackedElement.tracking = false;
		this._removeElementListeners(trackedElement);
	}

};

/**
 * @method
 * @public
 * @desc Start tracking all elements, or pass a single TrackedElement object to start
 *       tracking only that element. Will not resume tracking on elements that have
 *       already been engaged.
 * @name ElementEngagement#start
 * @param {Object} [trackedElement] - A TrackedElement object that is provided to ElementEngagement
 *                                    by ElementTracker.
 */
proto.start = function (trackedElement) {
	// start everything
	if (!trackedElement) {
		this._attachAllElementListeners();
		Super.prototype.start.call(this);
	}

	// just start tracking the trackedElement
	if (trackedElement && !trackedElement.tracking) {
		if (!trackedElement.stopOnEngaged) {
			trackedElement.tracking = true;
			this._attachElementListeners(trackedElement);
		} else if (!trackedElement.engaged) {
			trackedElement.tracking = true;
			this._attachElementListeners(trackedElement);
		}
	}

};

// add a single element
proto.addElement = function (element, options) {
	var trackedElement = Super.prototype.addElement.call(this, element);
	this._decorateTrackedElement(trackedElement, options);

	return trackedElement;
};

// add a bunch of elements that all use the same options
proto.addElements = function (collection, options) {
	// call forEach with collection as context to iterate over nodelist or array
	[].forEach.call(collection, function (element) {
		this.addElement(element, options);
	}, this);
};


module.exports = ElementEngagement;

},{"ac-base":false,"ac-element-tracker":9,"ac-object":13}],25:[function(require,module,exports){
'use strict';

/**
 * @module module:ac-feature
 */
var feature = {
	cssPropertyAvailable: require('./ac-feature/cssPropertyAvailable'),
	localStorageAvailable: require('./ac-feature/localStorageAvailable')
};

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Returns whether the browser supports the 3d media query
 * @returns {Boolean} whether or not the browser supports the 3d media query
 * @name module:ac-feature.threeDTransformsAvailable
 * @kind function
 */
feature.threeDTransformsAvailable = function () {
	// Memoize previously returned value
	if (typeof this._threeDTransformsAvailable !== 'undefined') {
		return this._threeDTransformsAvailable;
	}

	var div, style;

	try {
		this._threeDTransformsAvailable = false;

		if (hasOwnProp.call(window, 'styleMedia')) {
			this._threeDTransformsAvailable = window.styleMedia.matchMedium('(-webkit-transform-3d)');

		} else if (hasOwnProp.call(window, 'media')) {
			this._threeDTransformsAvailable = window.media.matchMedium('(-webkit-transform-3d)');
		}

		// chrome returns all the values as true, but doesn't actually have 3d support
		if (!this._threeDTransformsAvailable) {
			if (!(style = document.getElementById('supportsThreeDStyle'))) {
				style = document.createElement('style');
				style.id = 'supportsThreeDStyle';
				style.textContent = '@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }';
				document.querySelector('head').appendChild(style);
			}

			if (!(div = document.querySelector('#supportsThreeD'))) {
				div = document.createElement('div');
				div.id = 'supportsThreeD';
				document.body.appendChild(div);
			}
			this._threeDTransformsAvailable = (div.offsetHeight === 3) || style.style['MozTransform'] !== undefined || style.style['WebkitTransform'] !== undefined;
		}

		return this._threeDTransformsAvailable;
	} catch (e) {
		return false;
	}
};

/**
 * Detects whether or not the browser understands the HTML5 Canvas API.
 * @returns {Boolean} true if the browser supports canvas.
 * @name module:ac-feature.canvasAvailable
 * @kind function
 */
feature.canvasAvailable = function () {
	// Memoize previously returned value
	if (typeof this._canvasAvailable !== 'undefined') {
		return this._canvasAvailable;
	}

	var canvas = document.createElement('canvas');

	this._canvasAvailable = !!(typeof canvas.getContext === 'function' && canvas.getContext('2d'));
	return this._canvasAvailable;
};

/**
 * Returns whether the browser supports HTML5 sessionStorage, and
 * does not have privacy mode enabled or cookies turned off.
 * @returns {Boolean} true if the browser supports sessionStorage
 * @name module:ac-feature.sessionStorageAvailable
 * @kind function
 */
feature.sessionStorageAvailable = function () {
	// Memoize previously returned value
	if (typeof this._sessionStorageAvailable !== 'undefined') {
		return this._sessionStorageAvailable;
	}

	try {
		if (typeof window.sessionStorage !== 'undefined' && typeof window.sessionStorage.setItem === 'function') {
			window.sessionStorage.setItem('ac_browser_detect', 'test');
			this._sessionStorageAvailable = true;
			window.sessionStorage.removeItem('ac_browser_detect', 'test');
		} else {
			this._sessionStorageAvailable = false;
		}
	} catch (e) {
		this._sessionStorageAvailable = false;
	}
	return this._sessionStorageAvailable;
};

/**
 * Returns whether the browser has cookies enabled.
 * @returns {Boolean} true if cookies are enabled.
 * @name module:ac-feature.cookiesAvailable
 * @kind function
 */
feature.cookiesAvailable = function () {
	// Memoize previously returned value
	if (typeof this._cookiesAvailable !== 'undefined') {
		return this._cookiesAvailable;
	}
	this._cookiesAvailable = (hasOwnProp.call(document, 'cookie') && !!navigator.cookieEnabled) ? true : false;
	return this._cookiesAvailable;
};


// Some devices swap the width/height when in landscape, so we want to make
// sure we're always reporting width as the lesser value. Except when the
// device isn't orientable, then we want to honor window.screen.width.
/** @ignore */
feature.__normalizedScreenWidth = function () {
	// We only care if the device is orientable
	if (typeof window.orientation === 'undefined') {
		return window.screen.width;
	}
	return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
};

/**
 * Tests for touch support on the device.
 * DocumentTouch is specific to Firefox <25 support.
 * @returns {Boolean} true if the device supports touch.
 * @name module:ac-feature.touchAvailable
 * @kind function
 */
feature.touchAvailable = function () {
	return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
};

/**
 * Attempts to determine if device is a desktop. The test is based on the assumptions
 * that desktop machines don't support touch and aren't orientable
 * @returns {Boolean} true if device has no support for touch and orientation
 * @name module:ac-feature.isDesktop
 * @kind function
 */
feature.isDesktop = function () {
	if (!this.touchAvailable() && !window.orientation) {
		return true;
	}
	return false;
};

/**
 * Attempts to determine if device is handheld. e.g. phones and iPod Touches.
 * The test is based on the value of module:ac-feature.isDesktop() and
 * if the device screen width is less than or equal to 480 pixels.
 * @returns {Boolean} true if the device is determined to be handheld
 * @name module:ac-feature.isHandheld
 * @kind function
 */
feature.isHandheld = function () {
	return !this.isDesktop() && !this.isTablet();
};

/**
 * Attempts to determine if device is a tablet. i.e. iPad or Nexus 7.
 * The test is based on the value of module:ac-feature.isDesktop() and
 * if the device screen width is greater than 480 pixels.
 * @returns {Boolean} true if the device is determined to be a tablet
 * @name module:ac-feature.isTablet
 * @kind function
 */
feature.isTablet = function () {
	return !this.isDesktop() && this.__normalizedScreenWidth() > 480;
};

/**
 * Attempts to determine whether the display is retina.
 * @returns {Boolean} true if DPR is determined to be greater than or equal to 1.5
 * @name module:ac-feature.isRetina
 * @kind function
 */
feature.isRetina = function () {
	// Vendor prefixes and media queries for DPR detection are a mess
	var mediaQueryStrings = [
		'min-device-pixel-ratio:1.5',
		'-webkit-min-device-pixel-ratio:1.5',
		'min-resolution:1.5dppx',
		'min-resolution:144dpi',
		'min--moz-device-pixel-ratio:1.5'
	];
	var i;

	// Use devicePixelRatio if available
	if (window.devicePixelRatio !== undefined) {
		if (window.devicePixelRatio >= 1.5) {
			return true;
		}

	// Else resort to matchMedia
	} else {
		for (i = 0; i < mediaQueryStrings.length; i += 1) {
			if (window.matchMedia('(' + mediaQueryStrings[i] + ')').matches === true) {
				return true;
			}
		}
	}

	// Otherwise return false
	return false;
};

/**
 * Browser support for SVG in background images very closely matches that of SVG in <img> tags.
 * Detecting this feature checks for support as both inline and background images.
 * @returns {Boolean} true if SVG support is available
 * @name module:ac-feature.svgAvailable
 * @kind function
 */
feature.svgAvailable = function () {
	return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Image', '1.1');
};

module.exports = feature;

},{"./ac-feature/cssPropertyAvailable":26,"./ac-feature/localStorageAvailable":27}],26:[function(require,module,exports){
'use strict';

var style = null;
var prefixes = null;
var preFixes = null;
var css = null;

/**
 * Sets all the vendor specific style property to value on element.
 * @param {String} property The CSS property to test, can be of the form: webkitBorderRadius, mozBorderRadius, etc.; borderRadius -webkit-border-radius, -moz-border-radius, etc.; border-radius
 * @returns true if the current browser supports the given CSS property, otherwise, returns false.
 * @name module:ac-feature.cssPropertyAvailable
 * @kind function
 */
module.exports = function (property) {

	if (style === null) {
		style = document.createElement('browserdetect').style;
	}
	if (prefixes === null) {
		prefixes = ['-webkit-', '-moz-', '-o-', '-ms-', '-khtml-', ''];
	}
	if (preFixes === null) {
		preFixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml', ''];
	}
	if (css === null) {
		css = {};
	}

	property = property.replace(/([A-Z]+)([A-Z][a-z])/g, '$1\\-$2').replace(/([a-z\d])([A-Z])/g, '$1\\-$2').replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, '').toLowerCase();
	switch (property) {
	case 'gradient':
		if (css.gradient !== undefined) {
			return css.gradient;
		}

		property = 'background-image:';
		var value1 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));';
		var value2 = 'linear-gradient(left top,#9f9, white);';

		style.cssText = (property + prefixes.join(value1 + property) + prefixes.join(value2 + property)).slice(0, -property.length);
		css.gradient = (style.backgroundImage.indexOf('gradient') !== -1);
		return css.gradient;

	case 'inset-box-shadow':
		if (css['inset-box-shadow'] !== undefined) {
			return css['inset-box-shadow'];
		}

		property = 'box-shadow:';
		var value = '#fff 0 1px 1px inset;';

		style.cssText = prefixes.join(property + value);
		css['inset-box-shadow'] = (style.cssText.indexOf('inset') !== -1);
		return css['inset-box-shadow'];

	default:
		var properties = property.split('-');
		var length = properties.length;
		var Property;
		var i;
		var j;

		if (properties.length > 0) {
			property = properties[0];
			for (i = 1; i < length; i += 1) {
				property += properties[i].substr(0, 1).toUpperCase() + properties[i].substr(1);
			}
		}
		Property = property.substr(0, 1).toUpperCase() + property.substr(1);

		if (css[property] !== undefined) {
			return css[property];
		}

		for (j = preFixes.length - 1; j >= 0; j -= 1) {
			if (style[preFixes[j] + property] !== undefined || style[preFixes[j] + Property] !== undefined) {
				css[property] = true;
				return true;
			}
		}
		return false;
	}
};

},{}],27:[function(require,module,exports){
'use strict';

var isAvailable = null;

/**
 * Returns whether the browser supports HTML5 localStorage, and
 * does not have privacy mode enabled or cookies turned off.
 * NOTE: Does not support Firefox <= 13 because of a bug where Firefox interprets a nonexistent item as null instead of undefined
 * @returns {Boolean} true if the browser supports localStorage
 * @name module:ac-feature.localStorageAvailable
 * @kind function
 */
module.exports = function localStorageAvailable() {
	// Memoize previously returned value
	if (isAvailable === null) {
		isAvailable = !!(window.localStorage && window.localStorage.non_existent !== null);
	}
	return isAvailable;
};

},{}],28:[function(require,module,exports){
module.exports=require(12)
},{}],29:[function(require,module,exports){
module.exports=require(13)
},{"./ac-object/clone":30,"./ac-object/create":31,"./ac-object/defaults":32,"./ac-object/extend":33,"./ac-object/getPrototypeOf":34,"./ac-object/isDate":35,"./ac-object/isEmpty":36,"./ac-object/isRegExp":37,"./ac-object/toQueryParameters":38}],30:[function(require,module,exports){
module.exports=require(14)
},{"./extend":33}],31:[function(require,module,exports){
module.exports=require(15)
},{}],32:[function(require,module,exports){
module.exports=require(16)
},{"./extend":33}],33:[function(require,module,exports){
module.exports=require(17)
},{}],34:[function(require,module,exports){
module.exports=require(18)
},{}],35:[function(require,module,exports){
module.exports=require(19)
},{}],36:[function(require,module,exports){
module.exports=require(20)
},{}],37:[function(require,module,exports){
module.exports=require(21)
},{}],38:[function(require,module,exports){
module.exports=require(22)
},{"qs":28}],39:[function(require,module,exports){
'use strict';

var sCode = require('./s-code/s-code');
var plugins = require('./s-code/plugins');

// exported `sCode` is a function that gets passed the
// `s_account` variable, which is a string.
// once the function is executed, all the `s` variables
// will be available on the window.
//
// The plugins.init method can then be ran.
// pass the result of the sCode function plugins.init
module.exports.init = sCode;
module.exports.plugins = plugins;

},{"./s-code/plugins":40,"./s-code/s-code":53}],40:[function(require,module,exports){
'use strict';

function init (sCode) {
	// utilities
	require('./plugins/utilities/utilities')(sCode);

	// require all plugins
	require('./plugins/customLinkHandler')(sCode);
	require('./plugins/detectRIA')(sCode);
	require('./plugins/deviceOrientationChanges')(sCode);
	require('./plugins/downloadLinkHandler')(sCode);
	require('./plugins/getAndpersistValue')(sCode);
	require('./plugins/getPercentPageViewed')(sCode);
	require('./plugins/getPreviousValue')(sCode);
	require('./plugins/getQueryParam')(sCode);
	require('./plugins/getValOnce')(sCode);
	require('./plugins/setClickMapEmail')(sCode);
	require('./plugins/setDynamicObjectIDs')(sCode);
}

module.exports.init = init;

},{"./plugins/customLinkHandler":41,"./plugins/detectRIA":42,"./plugins/deviceOrientationChanges":43,"./plugins/downloadLinkHandler":44,"./plugins/getAndpersistValue":45,"./plugins/getPercentPageViewed":46,"./plugins/getPreviousValue":47,"./plugins/getQueryParam":48,"./plugins/getValOnce":49,"./plugins/setClickMapEmail":50,"./plugins/setDynamicObjectIDs":51,"./plugins/utilities/utilities":52}],41:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: linkHandler 0.5 - identify and report custom links
	 */
	sCode.linkHandler = new Function("p", "t", "" + "var s=this,h=s.p_gh(),i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkN" + "ame)))return '';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h." + "substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkNam" + "e=l=='[['?'':l;s.linkType=t;return h;}return '';");

	sCode.p_gn = new Function("t", "h", "" + "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=" + "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}" + "return 0;");

};

},{}],42:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {
	/*
	 * Plugin: detectRIA v0.1 - detect and set Flash, Silverlight versions
	 */
	sCode.detectRIA = new Function("cn", "fp", "sp", "mfv", "msv", "sf", "" + "cn=cn?cn:'s_ria';msv=msv?msv:2;mfv=mfv?mfv:10;var s=this,sv='',fv=-" + "1,dwi=0,fr='',sr='',w,mt=s.n.mimeTypes,uk=s.c_r(cn),k=s.c_w('s_cc'," + "'true',0)?'Y':'N';fk=uk.substring(0,uk.indexOf('|'));sk=uk.substrin" + "g(uk.indexOf('|')+1,uk.length);if(k=='Y'&&s.p_fo('detectRIA')){if(u" + "k&&!sf){if(fp){s[fp]=fk;}if(sp){s[sp]=sk;}return false;}if(!fk&&fp)" + "{if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv=2;x=s.pl['" + "Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.substring(16" + ",z.indexOf('.'));}}else if(navigator.plugins&&navigator.plugins.len" + "gth){x=navigator.plugins['Shockwave Flash'];if(x){fv=0;z=x.descript" + "ion;if(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length)" + "{x=mt['application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}" + "if(fv<=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&exec" + "Script){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScri" + "pt('on error resume next: result = IsObject(CreateObject(\"Shockwav" + "eFlash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}fr=fv==-1?'Flas" + "h Not Detected':fv==0?'Flash Enabled (No Version)':'Flash '+fv;}if(" + "!sk&&sp&&s.apv>=4.1){var tc='try{x=new ActiveXObject(\"AgControl.A'" + "+'gControl\");for(var i=msv;i>0;i--){for(var j=9;j>=0;j--){if(x.is'" + "+'VersionSupported(i+\".\"+j)){sv=i+\".\"+j;break;}}if(sv){break;}'" + "+'}}catch(e){try{x=navigator.plugins[\"Silverlight Plug-In\"];sv=x'" + "+'.description.substring(0,x.description.indexOf(\".\")+2);}catch('" + "+'e){}}';eval(tc);sr=sv==''?'Silverlight Not Detected':'Silverlight" + " '+sv;}if((fr&&fp)||(sr&&sp)){s.c_w(cn,fr+'|'+sr,0);if(fr)s[fp]=fr;" + "if(sr)s[sp]=sr;}}");

};

},{}],43:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: deviceOrientationChanges v1.1
	 *
	 */
	sCode.p_oc = new Function("evt", "" + "var o=s.wd.orientation,ot=(Math.abs(o)==90)?'l':'p',cv,v;s.lc=(evt." + "type=='load')?s.lc+1:s.lc;if(s.lc==0)return;if(typeof(o)!='undefine" + "d'){ot=(evt.type=='load')?ot:ot+':'+s.c_r('s_orientationHeight');cv" + "=s.c_r('s_orientation');v=cv?cv+=','+ot:ot;s.c_w('s_orientation',v)" + "}");

	sCode.p_och = new Function("", "" + "var dh=Math.max(Math.max(s.d.body.scrollHeight,s.d.documentElement." + "scrollHeight),Math.max(s.d.body.offsetHeight,s.d.documentElement.of" + "fsetHeight),Math.max(s.d.body.clientHeight,s.d.documentElement.clie" + "ntHeight));vph=s.wd.innerHeight||(s.d.documentElement.clientHeight|" + "|s.d.body.clientHeight),st=s.wd.pageYOffset||(s.wd.document.documen" + "tElement.scrollTop||s.wd.document.body.scrollTop),vh=st+vph;s.c_w('" + "s_orientationHeight',vh);");

	sCode.deviceOrientationChanges = new Function("ext", "" + "var s=this,v;s.lc=0;if(typeof(s.linkType)!='undefined'&&s.linkType!" + "='e')return'';var cv=s.c_r('s_orientation'),cva=(cv.indexOf(',')>-1" + ")?cv.split(','):'';if(cv){if(cva){if(!ext){for(i=1;i<cva.length;i++" + "){cva[i]=cva[i].split(':')[0];}}cva[0]+='@s';cva.push(cva[cva.lengt" + "h-1].split(':')[0]+'@e');v=cva.toString();}else{v=cv+'@s,'+cv+'@e';" + "}}s.c_w('s_orientation','');if(s.wd.addEventListener){s.wd.addEvent" + "Listener('orientationchange',s.p_oc,false);s.wd.addEventListener('l" + "oad',s.p_oc,false);s.wd.addEventListener('load',s.p_och,false);s.wd" + ".addEventListener('scroll',s.p_och,false);}return v;");

};

},{}],44:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {
	/*
	 * Plugin: downloadLinkHandler 0.5 - identify and report download links
	 */
	sCode.downloadLinkHandler = new Function("p", "" + "var s=this,h=s.p_gh(),n='linkDownloadFileTypes',i,t;if(!h||(s.linkT" + "ype&&(h||s.linkName)))return '';i=h.indexOf('?');t=s[n];s[n]=p?p:t;" + "if(s.lt(h)=='d')s.linkType='d';else h='';s[n]=t;return h;");

};

},{}],45:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getAndPersistValue 0.3 - get a value on every page
	 */
	sCode.getAndPersistValue = new Function("v", "c", "e", "" + "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(" + "v)s.c_w(c,v,e?a:0);return s.c_r(c);");
	sCode.__se = new Function("" + "var l={'~':'tl:[\\'','^': 'kw:[\\'','%': 'ahoo','|': '\\'],','>': '" + "\\']}','*': '.com','$': 'search',';':'query','#':'land','`':'oogle'" + ",'+':'http://www','<':'keyword'};var f=this.___se+'';var g='';for(v" + "ar i=0;i<f.length;i++){if(l[f.substring(i,i+1)]&&typeof l[f.substri" + "ng(i,i+1)]!='undefined'){g+=l[f.substring(i,i+1)];}else{g+=f.substr" + "ing(i,i+1);}}return eval('('+g+')');");
	sCode.___se = "{}";

	sCode.isEntry = new Function("" + "var s=this;var l=s.linkInternalFilters,r=s.referrer||typeof s.refer" + "rer!='undefined'?s.referrer:document.referrer,p=l.indexOf(','),b=0," + "v='';if(!r){return 1;}while(p=l.indexOf(',')){v=p>-1?l.substring(b," + "p):l;if(v=='.'||r.indexOf(v)>-1){return 0;}if(p==-1){break;}b=p+1;l" + "=l.substring(b,l.length);}return 1;");

	sCode.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");

};

},{}],46:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getPercentPageViewed v1.4 *** Modified for Apple ***
	 */
	sCode.handlePPVevents = new Function("", "" + "if(!s.getPPVid)return;var dh=Math.max(Math.max(s.d.body.scrollHeigh" + "t,s.d.documentElement.scrollHeight),Math.max(s.d.body.offsetHeight," + "s.d.documentElement.offsetHeight),Math.max(s.d.body.clientHeight,s." + "d.documentElement.clientHeight)),vph=s.wd.innerHeight||(s.d.documen" + "tElement.clientHeight||s.d.body.clientHeight),st=s.wd.pageYOffset||" + "(s.wd.document.documentElement.scrollTop||s.wd.document.body.scroll" + "Top),vh=st+vph,pv=Math.min(Math.round(vh/dh*100),100),c=s.c_r('s_pp" + "v'),a=(c.indexOf(',')>-1)?c.split(',',5):[],id=(a.length>0)?(a[0]):" + "escape(s.getPPVid),cv=(a.length>1)?parseInt(a[1]):(0),p0=(a.length>" + "2)?parseInt(a[2]):(pv),cy=(a.length>3)?parseInt(a[3]):(0),pt=s._ct," + "ph=s._ch,t=new Date;t.setTime(t.getTime()+1800000);s._ct=new Date()" + ".getTime();s._ch=vh;var sa='',td=Math.round((s._ct-pt)/1000),hd=Mat" + "h.abs(s._ch-ph),lowerBound,upperBound;if(hd&&td){lowerBound=Math.ce" + "il(st/100)*100;upperBound=Math.ceil(s._ch/100)*100;while(lowerBound" + "<=upperBound){if(lowerBound!=0){var value=lowerBound+':'+(td>10?'>'" + ":td);if(s.pxViewedArray.length==0){s.pxViewedArray.push(value);}els" + "e if(s.pxViewedArray.toString().indexOf(lowerBound)==-1){s.pxViewed" + "Array.push(value);}else{for(i=0;i<s.pxViewedArray.length;i++){var a" + "v=s.pxViewedArray[i].split(':');if(lowerBound==av[0]){if(av[1]!='>'" + "){var totalTime=Math.floor((Number(av[1])+Number(td))*100)/100;if(t" + "otalTime>10){totalTime='>';}s.pxViewedArray[i]=av[0]+':'+totalTime;" + "}break;}}}}lowerBound=lowerBound+100;s.pxViewedArray.sort(function(" + "a,b){return parseInt(a)-parseInt(b)});}}sa=s.pxViewedArray.toString" + "().replace(/,/g,'|');cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+(" + "(vh>cy)?vh:cy)+','+((sa)?sa:'')):'';s.c_w('s_ppv',cn,t);");

	sCode.getPercentPageViewed = new Function("pid", "" + "pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false,t=new Date;t." + "setTime(t.getTime()+1800000);if(typeof(s.linkType)!='undefined'&&s." + "linkType!='e')return'';var v=s.c_r('s_ppv'),a=(v.indexOf(',')>-1)?v" + ".split(',',5):[];if(a.length<5){for(var i=4;i>0;i--){a[i]=(i<a.leng" + "th)?(a[i-1]):('');}a[0]='';}a[0]=unescape(a[0]);s.getPPVpid=pid;s.c" + "_w('s_ppv',escape(pid),t);s.pxViewedArray=[];if(ist){s.getPPVid=(pi" + "d)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('s_pp" + "v',escape(s.getPPVid),0);if(s.wd.addEventListener){s.wd.addEventLis" + "tener('load',s.handlePPVevents,false);s.wd.addEventListener('scroll" + "',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handleP" + "PVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onload" + "',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevents)" + ";s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-')?" + "(a):(a[1]);");

};

},{}],47:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getPreviousValue_v1.0 - return previous value of designated
	 *   variable (requires split utility)
	 */
	sCode.getPreviousValue = new Function("v", "c", "el", "" + "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el" + "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i" + "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)" + ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?" + "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

};

},{}],48:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getQueryParam 2.3
	 */
	sCode.getQueryParam = new Function("p", "d", "u", "" + "var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati" + "on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p" + ".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-" + "1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i=" + "=p.length?i:i+1)}return v");

	sCode.p_gpv = new Function("k", "u", "" + "var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v" + "=s.pt(q,'&','p_gvf',k)}return v");

	sCode.p_gvf = new Function("t", "k", "" + "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T" + "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s." + "epa(v)}return ''");

};

},{}],49:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: getValOnce_v1.0
	 */
	sCode.getValOnce = new Function("v", "c", "e", "" + "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c" + ");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return" + " v==k?'':v");

};

},{}],50:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * Plugin: setClickMapEmail v1.3 - sets ClickMap variables w/ q-string values
	 */
	sCode.setClickMapEmail = new Function("qp", "ot", "" + "var s=this,v=s.getQueryParam(qp,'~'),d,pn,oid,ot=s.getQueryParam(ot)" + ",ot=ot?ot:'A',cv;d=v.indexOf('~');if(!v)return '';if(d>-1){pn=v.subs" + "tring(0,d);oid=v.substring(d+1);}cv='&pid='+s.ape(s.fl(pn,255))+'&pi" + "dt=1&oid='+s.ape(s.fl(oid,100))+'&oidt=1&ot='+ot+'&oi=1';s.sq(cv);");

};

},{}],51:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/*
	 * DynamicObjectIDs v1.4: Setup Dynamic Object IDs based on URL
	 *********** MODIFIED FOR APPLE (DO NOT REPLACE) **************
	 */

	sCode.setupDynamicObjectIDs = new Function("" + "var s=this;if(!s.doi){s.doi=1;if(s.apv>3&&(!s.isie||!s.ismac||s.apv" + ">=5)){if(s.wd.attachEvent)s.wd.attachEvent('onload',s.setOIDs);else" + " if(s.wd.addEventListener)s.wd.addEventListener('load',s.setOIDs,fa" + "lse);else{s.doiol=s.wd.onload;s.wd.onload=s.setOIDs}}s.wd.s_semapho" + "re=1}");

	sCode.setOIDs = new Function("e", "" + "var s=s_c_il[" + s._in + "],b=s.eh(s.wd,'onload'),o='onclick',x,l,u,c,i" + ",a=new Array;if(s.doiol){if(b)s[b]=s.wd[b];s.doiol(e)}if(s.d.links)" + "{for(i=0;i<s.d.links.length;i++){l=s.d.links[i];" + "if(s._isSafari){s.acAnalytics.dynamicObjectIdHandlerSafari(s, l);}" + "c=l[o]?''+l[o]:'';b" + "=s.eh(l,o);z=l[b]?''+l[b]:'';u=s.getObjectID(l);if(u&&c.indexOf('s_" + "objectID')<0&&z.indexOf('s_objectID')<0){u=s.repl(u,'\"','');u=s.re" + "pl(u,'\\n','').substring(0,97);l.s_oc=l[o];a[u]=a[u]?a[u]+1:1;x='';" + "if(c.indexOf('.t(')>=0||c.indexOf('.tl(')>=0||c.indexOf('s_gs(')>=0" + ")x='var x=\".tl(\";';x+='s_objectID=\"'+u+'_'+a[u]+'\";return this." + "s_oc?this.s_oc(e):true';if(s.isns&&s.apv>=5)l.setAttribute(o,x);l[o" + "]=new Function('e',x)}}}s.wd.s_semaphore=0;return true");

};

},{}],52:[function(require,module,exports){
'use strict';

module.exports = function (sCode) {

	/************************ Utility Functions for Plugins ***************************/
	/*
	 * Utility manageVars v0.2 - clear variable values (requires split 1.5)
	 */
	sCode.manageVars = new Function("c", "l", "f", "" + "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa" + "geName,purchaseID,channel,server,pageType,campaign,state,zip,events" + ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar" + "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl" + "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l" + "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}" + "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0" + ");return true;}else{return false;}");

	sCode.clearVars = new Function("t", "var s=this;s[t]='';");

	sCode.lowercaseVars = new Function("t", "" + "var s=this;if(s[t]&&t!='events'){s[t]=s[t].toString();if(s[t].index" + "Of('D=')!=0){s[t]=s[t].toLowerCase();}}");

	/*
	 * s.join: 1.0 - s.join(v,p)
	 */
	sCode.join = new Function("v", "p", "" + "var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back" + ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0" + ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el" + "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

	/*
	 * Utility Function: p_fo - required for detectRIA
	 */
	sCode.p_fo = new Function("n", "" + "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]=" + "new Object;return 1;}else {return 0;}");

	/*
	 * Utility Function: p_gh
	 */
	sCode.p_gh = new Function("" + "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk,y=s.ot(" + "o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){" + "o=o.parentElement?o.parentElement:o.parentNode;if(!o)return '';y=s." + "ot(o);n=s.oid(o);x=o.s_oidt}}return o.href?o.href:'';");

	/*
	 * Plugin Utility: apl v1.1
	 */
	sCode.apl = new Function("L", "v", "d", "u", "" + "var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a." + "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas" + "e()));}}if(!m)L=L?L+d+v:v;return L");

	/*
	 * Plugin Utility: Replace v1.0
	 */
	sCode.repl = new Function("x", "o", "n", "" + "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x." + "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

	/*
	 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
	 */
	sCode.split = new Function("l", "d", "" + "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x" + "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

	/*
	 * Utility Function: vpr - set the variable vs with value v
	 */
	sCode.vpr = new Function("vs", "v", "if(typeof(v)!='undefined'){var s=this; eval('s.'+vs+'=\"'+v+'\"')}");

};

},{}],53:[function(require,module,exports){
(function () {

'use strict';

/**
* @ SiteCatalyst code version: H.27.
* @ Copyright 1996-2014 Adobe, Inc. All Rights Reserved. More info available at http://www.omniture.com
* @Name: s_code { by Adobe }
* @Description: Creates the script tag and injects scode on the page.
* @Event: { window.onload }
*/
var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.27';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(s.rep(m,\"\\\\\",\"\\\\\\"
+"\\\"),\"\\n\",\"\\\\n\"),\"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return "
+"y};s.fl=function(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){return o};s.num=function(x){x=''+x;for(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;retur"
+"n 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',f=\"+~!*()'\",i,c=s.charSet,n,l,e,y='';c=c?c.toUpperCase():'';if(x){x=''+x;if(s.em==3){x=encodeURIComponent(x)"
+";for(i=0;i<f.length;i++) {n=f.substring(i,i+1);if(x.indexOf(n)>=0)x=s.rep(x,n,\"%\"+n.charCodeAt(0).toString(16).toUpperCase())}}else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.subs"
+"tring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h.substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=s.rep(escape(''+x),'+',"
+"'%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+"
+"x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x){var s=this,y,tcf;if(x){x=s.rep(''+x,'+',' ');if(s.em==3){tcf=new Function('x','var y,e;try{y=decodeURIComponent(x)}catch(e){y=unescap"
+"e(x)}return y');return tcf(x)}else return unescape(x)}return y};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s[f](t,a);if(r)return r;z"
+"+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a=a.substring(0,c);if(t.substring(0,"
+"2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s=this;s.fsg='';s.pt(x,',','fsf',f"
+");return s.fsg};s.mpc=function(m,a){var s=this,c,l,n,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(v&&v=='prerender'){if(!s.mpq){s.mpq=new Array;l=s.sp('webkitvisibilitychange,visibi"
+"litychange',',');for(n=0;n<l.length;n++){s.d.addEventListener(l[n],new Function('var s=s_c_il['+s._in+'],c,v;v=s.d.visibilityState;if(!v)v=s.d.webkitVisibilityState;if(s.mpq&&v==\"visible\"){while("
+"s.mpq.length>0){c=s.mpq.shift();s[c.m].apply(s,c.a)}s.mpq=0}'),false)}}c=new Object;c.m=m;c.a=a;s.mpq.push(c);return 1}return 0};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s"
+".sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=undefined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.link"
+"Type=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,"
+"n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.'"
+",'c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?"
+"c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60)"
+";if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');"
+"return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l"
+"[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf="
+"new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.w"
+"d,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;r"
+"eturn true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s."
+"tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for("
+"n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=function(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingS"
+"erverBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Object,l,imn='s_i_'+s._in+'_'+un,im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLower"
+"Case();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.versio"
+"n+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!"
+"s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window.s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r"
+";return ''}imn+='_'+s.rc[un];s.rc[un]++}if(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im=s.wd[im"
+"n];if(!im)im=s.wd[imn]=new Image;im.alt=\"\";im.s_l=0;im.onload=im.onerror=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.bcr();s.mrq(\"'+un+'\");s.nrs--;if(!s."
+"nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;im.src=rs;if(s.useForcedLinkTracking||s.bcf){if(!s.forcedLinkTrackingTimeout)s.forcedLinkTrackingTimeout=250;setTimeout('if(window.s"
+"_c_il)window.s_c_il['+s._in+'].bcr()',s.forcedLinkTrackingTimeout);}else if((s.lnk||s.eo)&&(!ta||ta=='_self'||ta=='_top'||ta=='_parent'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(!im.s_l&&e.g"
+"etTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v"
+"]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l="
+"0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCase();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='http"
+"s://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',"
+"p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.substring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c"
+";else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData"
+"\")k=\"c\";if(v){for(sk in v)if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>=0)&&(!Object||!Object.prototype||!Object.prototype[sk])){nfm=0;if(nfl)for(nf"
+"n=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.indexOf('.');if(nke>0){nk"
+"=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(sv){if(vfp=='retrieveLig"
+"htData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';else if(s.num(ss)){if(sp"
+"=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}if(qs!='')qs+='&.'+k}return q"
+"s};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType){fv=s.linkTrackVars;fe="
+"s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;if(fe){fe=','+fe+',';if("
+"fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&e){v=e;e=''}if(v&&(!fv||"
+"fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='supplementalDataID')q='sdid';else if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';el"
+"se if(k=='marketingCloudVisitorID')q='mid';else if(k=='analyticsVisitorID')q='aid';else if(k=='audienceManagerLocationHint')q='aamlh';else if(k=='audienceManagerBlob')q='aamb';else if(k=='pageURL')"
+"{q='g';if(v.length>255){s.pageURLRest=v.substring(255);v=v.substring(0,255);}}else if(k=='pageURLRest')q='-g';else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigration"
+"Key')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationServerSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}e"
+"lse if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s.em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='coo"
+"kieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='r"
+"esolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';else if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='bro"
+"wserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';"
+"else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q="
+"'mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=='deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k]"
+",fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if(b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'"
+"?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf('?'),hi=h.indexOf('#');if(qi>=0){if(hi>=0&&hi<qi)qi=hi;}else qi=hi;h=qi>=0?h.substring(0"
+",qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;return 0};s.lt=function(h"
+"){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h"
+"))return 'd';if(s.trackExternalLinks&&h.indexOf('#')!=0&&h.indexOf('about:')!=0&&h.indexOf('javascript:')!=0&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';"
+"return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=this;s.t();s.lnk=0;if(b)return this[b](e);return true');s.bcr=function(){var s=this;if(s.bct&&s.bce)s.bct.di"
+"spatchEvent(s.bce);if(s.bcf){if(typeof(s.bcf)=='function')s.bcf();else if(s.bct&&s.bct.href)s.d.location=s.bct.href}s.bct=s.bce=s.bcf=0};s.bc=new Function('e','if(e&&e.s_fe)return;var s=s_c_il['+s."
+"_in+'],f,tcf,t,n,nrs,a,h;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;if(!s.bbc)s.useForcedLinkTracking=0;else if(!s.useForcedLinkTracking){s.b.removeEventListener(\"click\",s.bc,true);s.bbc=s.useForc"
+"edLinkTracking=0;return}else s.b.removeEventListener(\"click\",s.bc,false);s.eo=e.srcElement?e.srcElement:e.target;nrs=s.nrs;s.t();s.eo=0;if(s.nrs>nrs&&s.useForcedLinkTracking&&e.target){a=e.target"
+";while(a&&a!=s.b&&a.tagName.toUpperCase()!=\"A\"&&a.tagName.toUpperCase()!=\"AREA\")a=a.parentNode;if(a){h=a.href;if(h.indexOf(\"#\")==0||h.indexOf(\"about:\")==0||h.indexOf(\"javascript:\")==0)h=0"
+";t=a.target;if(e.target.dispatchEvent&&h&&(!t||t==\"_self\"||t==\"_top\"||t==\"_parent\"||(s.wd.name&&t==s.wd.name))){tcf=new Function(\"s\",\"var x;try{n=s.d.createEvent(\\\\\"MouseEvents\\\\\")}c"
+"atch(x){n=new MouseEvent}return n\");n=tcf(s);if(n){tcf=new Function(\"n\",\"e\",\"var x;try{n.initMouseEvent(\\\\\"click\\\\\",e.bubbles,e.cancelable,e.view,e.detail,e.screenX,e.screenY,e.clientX,"
+"e.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,e.button,e.relatedTarget)}catch(x){n=0}return n\");n=tcf(n,e);if(n){n.s_fe=1;e.stopPropagation();if (e.stopImmediatePropagation) {e.stopImmediatePr"
+"opagation();}e.preventDefault();s.bct=e.target;s.bce=n}}}}}');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||("
+"j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!"
+"='/'?l.pathname.substring(0,i<0?0:i)+'/':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():"
+"'';if(t=='SHAPE')t='';if(t){if((t=='INPUT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;i"
+"f(t&&!o.s_oid){p=o.protocol;c=o.onclick;if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",'')"
+",\"\\t\",''),' ','');x=2}else if(t=='INPUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o."
+"s_oid=s.fl(n,100);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>"
+"=0){if(u!=s.un&&s.un.indexOf(',')>=0)q='&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);"
+"return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){va"
+"r s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if("
+"x&&(!Object||!Object.prototype||!Object.prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+="
+"(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}return s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s"
+".d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s."
+"apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener){if(s.n&&((s.n.userAgent.indexOf('WebKit')>=0&&s.d.createEvent)||(s.n"
+".userAgent.indexOf('Firefox/2')>=0&&s.wd.MouseEvent))){s.bbc=1;s.useForcedLinkTracking=1;s.b.addEventListener('click',s.bc,true)}s.b.addEventListener('click',s.bc,false)}else s.eh(s.wd,'onload',0,s"
+".wdl)}};s.vs=function(x){var s=this,v=s.visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n)"
+"{if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&"
+"&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i"
+";s.un=s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un"
+".substring(0,i)};s.sa=function(un){var s=this;if(s.un&&s.mpc('sa',arguments))return;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,"
+"a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl)s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._i"
+"l;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}e"
+"lse if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g"
+"=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(s.mpc(\"m_a\",arguments))return;if(!c)c=s.wd[\"s_\"+g+\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'"
+"+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);else s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=f"
+"unction(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i];if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m["
+"t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s"
+".m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o.e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h"
+"?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}if((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){i"
+"f(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\""
+"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c',"
+"'i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o.defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChi"
+"ld(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o.n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.l"
+"ength&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;for(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k"
+"==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo,onlySet){var s=this,l=s.va_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!onlySet&&!vo[k])vo['!'+"
+"k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}el"
+"se f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){var s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime"
+"();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s._waitingForMarketingCloudVisitorID = false;s._doneWaitingForMarketingCloudVisitorID = false;s._marketing"
+"CloudVisitorIDCallback=function(marketingCloudVisitorID) {var s=this;s.marketingCloudVisitorID = marketingCloudVisitorID;s._doneWaitingForMarketingCloudVisitorID = true;s._callbackWhenReadyToTrackC"
+"heck();};s._waitingForAnalyticsVisitorID = false;s._doneWaitingForAnalyticsVisitorID = false;s._analyticsVisitorIDCallback=function(analyticsVisitorID) {var s=this;s.analyticsVisitorID = analyticsV"
+"isitorID;s._doneWaitingForAnalyticsVisitorID = true;s._callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerLocationHint = false;s._doneWaitingForAudienceManagerLocationHint = false;s._aud"
+"ienceManagerLocationHintCallback=function(audienceManagerLocationHint) {var s=this;s.audienceManagerLocationHint = audienceManagerLocationHint;s._doneWaitingForAudienceManagerLocationHint = true;s."
+"_callbackWhenReadyToTrackCheck();};s._waitingForAudienceManagerBlob = false;s._doneWaitingForAudienceManagerBlob = false;s._audienceManagerBlobCallback=function(audienceManagerBlob) {var s=this;s.a"
+"udienceManagerBlob = audienceManagerBlob;s._doneWaitingForAudienceManagerBlob = true;s._callbackWhenReadyToTrackCheck();};s.isReadyToTrack=function() {var s=this,readyToTrack = true,visitor = s.vis"
+"itor;if ((visitor) && (visitor.isAllowed())) {if ((!s._waitingForMarketingCloudVisitorID) && (!s.marketingCloudVisitorID) && (visitor.getMarketingCloudVisitorID)) {s.marketingCloudVisitorID = visit"
+"or.getMarketingCloudVisitorID([s,s._marketingCloudVisitorIDCallback]);if (!s.marketingCloudVisitorID) {s._waitingForMarketingCloudVisitorID = true;}}if ((!s._waitingForAnalyticsVisitorID) && (!s.an"
+"alyticsVisitorID) && (visitor.getAnalyticsVisitorID)) {s.analyticsVisitorID = visitor.getAnalyticsVisitorID([s,s._analyticsVisitorIDCallback]);if (!s.analyticsVisitorID) {s._waitingForAnalyticsVisi"
+"torID = true;}}if ((!s._waitingForAudienceManagerLocationHint) && (!s.audienceManagerLocationHint) && (visitor.getAudienceManagerLocationHint)) {s.audienceManagerLocationHint = visitor.getAudienceM"
+"anagerLocationHint([s,s._audienceManagerLocationHintCallback]);if (!s.audienceManagerLocationHint) {s._waitingForAudienceManagerLocationHint = true;}}if ((!s._waitingForAudienceManagerBlob) && (!s."
+"audienceManagerBlob) && (visitor.getAudienceManagerBlob)) {s.audienceManagerBlob = visitor.getAudienceManagerBlob([s,s._audienceManagerBlobCallback]);if (!s.audienceManagerBlob) {s._waitingForAudie"
+"nceManagerBlob = true;}}if (((s._waitingForMarketingCloudVisitorID)     && (!s._doneWaitingForMarketingCloudVisitorID)     && (!s.marketingCloudVisitorID)) ||((s._waitingForAnalyticsVisitorID)     "
+"     && (!s._doneWaitingForAnalyticsVisitorID)          && (!s.analyticsVisitorID)) ||((s._waitingForAudienceManagerLocationHint) && (!s._doneWaitingForAudienceManagerLocationHint) && (!s.audienceM"
+"anagerLocationHint)) ||((s._waitingForAudienceManagerBlob)         && (!s._doneWaitingForAudienceManagerBlob)         && (!s.audienceManagerBlob))) {readyToTrack = false;}}return readyToTrack;};s._"
+"callbackWhenReadyToTrackQueue = null;s._callbackWhenReadyToTrackInterval = 0;s.callbackWhenReadyToTrack=function(callbackThis,callback,args) {var s=this,callbackInfo;callbackInfo = {};callbackInfo."
+"callbackThis = callbackThis;callbackInfo.callback     = callback;callbackInfo.args         = args;if (s._callbackWhenReadyToTrackQueue == null) {s._callbackWhenReadyToTrackQueue = [];}s._callbackWh"
+"enReadyToTrackQueue.push(callbackInfo);if (s._callbackWhenReadyToTrackInterval == 0) {s._callbackWhenReadyToTrackInterval = setInterval(s._callbackWhenReadyToTrackCheck,100);}};s._callbackWhenReady"
+"ToTrackCheck=new Function('var s=s_c_il['+s._in+'],callbackNum,callbackInfo;if (s.isReadyToTrack()) {if (s._callbackWhenReadyToTrackInterval) {clearInterval(s._callbackWhenReadyToTrackInterval);s._"
+"callbackWhenReadyToTrackInterval = 0;}if (s._callbackWhenReadyToTrackQueue != null) {while (s._callbackWhenReadyToTrackQueue.length > 0) {callbackInfo = s._callbackWhenReadyToTrackQueue.shift();cal"
+"lbackInfo.callback.apply(callbackInfo.callbackThis,callbackInfo.args);}}}');s._handleNotReadyToTrack=function(variableOverrides) {var s=this,args,varKey,variableOverridesCopy = null,setVariables = "
+"null;if (!s.isReadyToTrack()) {args = [];if (variableOverrides != null) {variableOverridesCopy = {};for (varKey in variableOverrides) {variableOverridesCopy[varKey] = variableOverrides[varKey];}}se"
+"tVariables = {};s.vob(setVariables,true);args.push(variableOverridesCopy);args.push(setVariables);s.callbackWhenReadyToTrack(s,s.track,args);return true;}return false;};s.gfid=function(){var s=this"
+",d='0123456789ABCDEF',k='s_fid',fid=s.c_r(k),h='',l='',i,j,m=8,n=4,e=new Date,y;if(!fid||fid.indexOf('-')<0){for(i=0;i<16;i++){j=Math.floor(Math.random()*m);h+=d.substring(j,j+1);j=Math.floor(Math."
+"random()*n);l+=d.substring(j,j+1);m=n=16}fid=h+'-'+l;}y=e.getYear();e.setYear(y+2+(y<1900?1900:0));if(!s.c_w(k,fid,e))fid=0;return fid};s.track=s.t=function(vo,setVariables){var s=this,notReadyToTr"
+"ack,trk=1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+"
+"'/'+(y<1900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;if ((!s.supplement"
+"alDataID) && (s.visitor) && (s.visitor.getSupplementalDataID)) {s.supplementalDataID = s.visitor.getSupplementalDataID(\"AppMeasurement:\" + s._in,(s.expectSupplementalData ? false : true));}if(s.m"
+"pc('t',arguments))return;s.gl(s.vl_g);s.uns();s.m_ll();notReadyToTrack = s._handleNotReadyToTrack(vo);if (!notReadyToTrack) {if (setVariables) {s.voa(setVariables);}if(!s.td){var tl=tfs.location,a,"
+"o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.setUTCDate){j='1.3';if(s.isie&&s.isma"
+"c&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){}return i');i=tcf(o);if(i&&i.next){j"
+"='1.7';if(a.reduce){j='1.8';if(j.trim){j='1.8.1';if(Date.parse){j='1.8.2';if(Object.create)j='1.8.5'}}}}}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.ja"
+"vaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.innerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>="
+"5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.offsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\""
+"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)"
+"while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s."
+"browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;s.td=1}if(vo){s.vob(vb);s.voa(vo)}if(!s.analyticsVisitorID&&!s.marketingCloudVisitorID)s.fid=s.gfid();if((vo&&vo._t)||!s.m_m('d')){if("
+"s.usePlugins)s.doPlugins(s);if(!s.abort){var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s._1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');"
+"if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(o){t=s.ot"
+"(o);n=s.oid(o);x=o.s_oidt}}if(!n||t=='BODY')o='';if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if(o){if(n)ta=o.target;h=s.oh(o);"
+"i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'?t:'o');s.pev1=(h?s.ape(h):'');"
+"s.pev2=(l?s.ape(l):'')}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(o.dataset&&o.dataset.sObjectId){s.wd.s_objectID=o.dataset.sObjectId;}else if(o.getAttrib"
+"ute&&o.getAttribute('data-s-object-id')){s.wd.s_objectID=o.getAttribute('data-s-object-id');}else if(s.useForcedLinkTracking){s.wd.s_objectID='';oc=o.onclick?''+o.onclick:'';if(oc){var ocb=oc.index"
+"Of('s_objectID'),oce,ocq,ocx;if(ocb>=0){ocb+=10;while(ocb<oc.length&&(\"= \\t\\r\\n\").indexOf(oc.charAt(ocb))>=0)ocb++;if(ocb<oc.length){oce=ocb;ocq=ocx=0;while(oce<oc.length&&(oc.charAt(oce)!=';'"
+"||ocq)){if(ocq){if(oc.charAt(oce)==ocq&&!ocx)ocq=0;else if(oc.charAt(oce)==\"\\\\\")ocx=!ocx;else ocx=0;}else{ocq=oc.charAt(oce);if(ocq!='\"'&&ocq!=\"'\")ocq=0}oce++;}oc=oc.substring(ocb,oce);if(oc"
+"){o.s_soid=new Function('s','var e;try{s.wd.s_objectID='+oc+'}catch(e){}');o.s_soid(s)}}}}}if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')"
+"+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){if(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?q"
+"s:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq(qs)}}}else s.dl(vo);if(vo)s.voa(vb,1);}s.abort=0;s.pageURLRest=s."
+"lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code};s.trackLink=s.tl=function(o,t,n,vo,f){"
+"var s=this;s.lnk=o;s.linkType=t;s.linkName=n;if(f){s.bct=o;s.bcf=f}s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightIncrementBy=i;s.t(vo)};s."
+"setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t."
+"lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!="
+"'function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f"
+"].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElements"
+"ByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.in"
+"dexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.ap"
+"v=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);"
+"s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='suppleme"
+"ntalDataID,timestamp,dynamicVariablePrefix,visitorID,marketingCloudVisitorID,analyticsVisitorID,audienceManagerLocationHint,fid,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServer"
+"Secure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,contextData,currencyCode,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,"
+"deleteLightProfiles,retrieveLightData';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='timestamp,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,"
+"lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,audienceManagerBlob,linkName,linkType';var n;for(n=1;n"
+"<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resol"
+"ution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage,pageURLRest,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackin"
+"gServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMa"
+"tch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTra"
+"ckVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){return o};s.wd.s_gs=function("
+"un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf();


// export the s_gi function which instantiates s-code
module.exports = s_gi;

}());

},{}],54:[function(require,module,exports){
var sCode = require('./ac-s-code/sCode');

module.exports = {
	init: sCode.init,
	getInstance: sCode.getInstance
};

},{"./ac-s-code/sCode":68}],55:[function(require,module,exports){
 (function() {

	'use strict';

	function sCodeAccount (bucket) {

		var s_account = '';

		if (typeof bucket === 'string') {
			s_account = bucket;
		}

		/* AOS Campaign Check */
		if (document.location.search && s_account) {
			var dls = document.location.search;
			if (dls.indexOf('?cid=AOS-') > -1 || dls.indexOf('&cid=AOS-') > -1) {
				s_account += ',applestoreWW';
			}
		}

		return s_account;
	}

	module.exports = sCodeAccount;

})();

},{}],56:[function(require,module,exports){
(function() {

	'use strict';

	var sCodePlugins                   = require('../plugin/sCodePlugins');
	var sCodeServers                   = require('./server');
	var browserHelper                  = require('./helper/browser');
	var dynamicObjectIdHandlerSafari   = require('./../plugin/helper/dynamicObjectIdHandlerSafari');

	function setDefaults (sCode, options) {
		var date;
		var expires;

		if (typeof sCode.acAnalytics !== 'object') {
			sCode.acAnalytics = {};
		}

		// Expose this method to s-code plugin for dynamic object handling for safari
		sCode.acAnalytics.dynamicObjectIdHandlerSafari = dynamicObjectIdHandlerSafari;

		sCode.pageName = (options.pageName || '');

		sCode.currencyCode = 'USD';

		/* Link Tracking Config */
		sCode.trackDownloadLinks = true;

		sCode.trackExternalLinks = true;

		sCode.trackInlineStats = true;

		sCode.useForcedLinkTracking = true;

		sCode.forcedLinkTrackingTimeout = 100;

		sCode.linkDownloadFileTypes = 'zip,wav,mp3,doc,pdf,xls,dmg,sit,pkg,exe,m4a,rss,xml,extz,safariextz';

		sCode.linkInternalFilters = 'javascript:,apple.com' + ((options.linkInternalFilters) ? '/' + options.linkInternalFilters : '');

		sCode.linkLeaveQueryString = false;

		sCode.linkTrackVars = 'campaign';

		sCode.linkTrackEvents = 'None';

		sCode._isSafari = browserHelper.isSafari(s);

		/* Stop Safari Top Sites Calls to Omniture */
		if (browserHelper.isSafariTopSitesPreview(s) === true) {
			sCode.t = function () { return ''; };
		}

		/*s_vnum cookie date change */
		var s_vi_vnum = sCode.c_r('s_vnum_n2_us');

		if (s_vi_vnum) {
			date = new Date();
			date.setTime(date.getTime()+63072000000);
			expires = '; expires = ' + date.toGMTString();
			document.cookie = 's_vnum_n2_us = ' + s_vi_vnum + expires + '; domain = apple.com; path = /';
		}

		/*s_vi cookie date change */
		var s_vi = sCode.c_r('s_vi');
		if (s_vi) {
			date = new Date();
			date.setTime(date.getTime()+63072000000);
			expires = '; expires = ' + date.toGMTString();
			document.cookie  =  's_vi = ' + s_vi + expires + '; domain = apple.com; path = /';
		}

		/*delete s_pv cookie */
		var s_pv = sCode.c_r('s_pv');
		if (s_pv) {
			expires = ';expires = Thu, 01 Jan 1970 00:00:01 GMT';
			document.cookie = 's_pv = ' + s_pv + expires + '; domain = apple.com; path = /';
		}

		/* DynamicObjectIDs config */
		function s_getObjectID (o) {
			var ID = o.href;
			return ID;
		}

		sCode.getObjectID = s_getObjectID;

		/**
		 * TODO: What is `iTunesDetected` and where the heck does it come from?
		 * Right now this block will never run because in this scope,
		 * `iTunesDetected` is never going to be defined.
		 */
		if (typeof(iTunesDetected) === 'function') {

			var activeX = document.createElement('object');

			activeX.setAttribute('width', 1);
			activeX.setAttribute('height', 1);
			activeX.id = 'iTunesDetectorIE';
			activeX.setAttribute('classid', 'clsid:D719897A-B07A-4C0C-AEA9-9B663A28DFCB');

			document.getElementsByTagName('head')[0].appendChild(activeX);
			sCode.prop12 = iTunesDetected() ? 'itunes' : 'no itunes';
		}

		/* Adding URL and referrer to each request */

		sCode.eVar54 = document.location.href;

		sCode.eVar49 = document.referrer;

		sCode.usePlugins = true;

		sCode.doPlugins = sCodePlugins;

		sCode.trackingServer = sCodeServers.getTrackingServer();

		sCode.trackingServerSecure = sCodeServers.getSecureTrackingServer();

		sCode.dc = sCodeServers.getDataCenterId();
	}

	module.exports = setDefaults;

})();

},{"../plugin/sCodePlugins":67,"./../plugin/helper/dynamicObjectIdHandlerSafari":61,"./helper/browser":57,"./server":58}],57:[function(require,module,exports){
(function() {

	'use strict';

	function isSafariTopSitesPreview () {

		if (navigator && navigator.loadPurpose && navigator.loadPurpose === 'preview') {
			return true;
		}

		return false;
	}

	function isSafari (sCode) {

		if (sCode.u.toLowerCase().indexOf('webkit') > -1) {
			if (sCode.u.toLowerCase().indexOf('safari') > -1 && sCode.u.toLowerCase().indexOf('chrome') < 0) {
				return true;
			}
		}

		return false;
	}

	module.exports = {
		isSafariTopSitesPreview: isSafariTopSitesPreview,
		isSafari: isSafari
	};

})();

},{}],58:[function(require,module,exports){
(function() {

	'use strict';

	var production = ['www.apple.com', 'images.apple.com', 'movies.apple.com', 'ssl.apple.com'];

	function getTrackingServer () {

		return (_isProduction()) ? 'metrics.apple.com' : location.hostname;
	}

	function getSecureTrackingServer () {

		return (_isProduction()) ?  'securemetrics.apple.com' : location.hostname;
	}

	function getDataCenterId () {

		return 112;
	}

	function _isProduction () {

		var hostname = window.location.host;

		if (production.indexOf(hostname) > -1) {
			return true;
		}

		return false;
	}

	module.exports = {
		getTrackingServer: getTrackingServer,
		getSecureTrackingServer: getSecureTrackingServer,
		getDataCenterId: getDataCenterId
	};

})();

},{}],59:[function(require,module,exports){
(function () {

	'use strict';

	function QTCheck (sCode) {

		var isMobile = sCode.u.match(/(iphone|ipod|ipad|android|kindle|silk-accelerated)/i);

		return (isMobile) ? 'mobile' : ((_getQTVersion() === '0') ? 'no quicktime' : ('quicktime ' + _getQTVersion().split(/\./)[0] + ".x"));
	}

	function _getQTVersion () {

		var version = '0';
		var ieQTVersion = null;

		if (navigator.plugins && navigator.plugins.length) {
			for (var i = 0; i < navigator.plugins.length; i++) {

				var plugin = navigator.plugins[i];

				// match: QuickTime Plugin X.Y.Z
				var match = plugin.name.match(/quicktime\D*([\.\d]*)/i);
				if (match && match[1]) {
					version = match[1];
				}
			}
		} else if (typeof(execScript) !== 'undefined') {

			/**
			 * @TODO
			 * DON'T USE `execScript`
			 * It is a deprecated form of eval that is only available in older IEs
			 * http://msdn.microsoft.com/en-us/library/ie/ms536420(v=vs.85).aspx
			 */
			execScript('on error resume next: ieQTVersion = CreateObject("QuickTimeCheckObject.QuickTimeCheck.1").QuickTimeVersion','VBScript');

			if (ieQTVersion) {
				// ieQTVersion is comes back as '76208000' when 7.6.2 is installed.
				version = ieQTVersion.toString(16);
				version = [version.charAt(0), version.charAt(1), version.charAt(2)].join('.');
			}
		}

		return version;
	}

	module.exports = QTCheck;

}());

},{}],60:[function(require,module,exports){
(function () {

	'use strict';

	function cleanPageName (sCode) {

		if (sCode.pageName) {

			var pgEscaped = escape(sCode.pageName);

			pgEscaped = pgEscaped.replace(/(%u2018|%u2019|%u02BC|%u02BD)/g,'%27');

			pgEscaped = pgEscaped.replace(/(%u201C|%u201D|%E2%80%9C|%E2%80%9D)/g,'%22');

			pgEscaped = pgEscaped.replace(/(%09|%0A|%0D)/g,'');

			sCode.pageName = unescape(pgEscaped);
		}
	}

	module.exports = cleanPageName;

}());

},{}],61:[function(require,module,exports){
(function () {

	'use strict';

	/* Function to add mouseup Event handler for exit and download links for Safari */
	function dynamicObjectIdHandlerSafari (sCode, link) {

		if (sCode.lt(link.href)) {

			link.addEventListener('mouseup', function(evt) {

				// Left click only
				if (((evt.which) && (evt.which === 1)) || ((evt.button) && (evt.button === 1))) {

					var linkHref = evt.currentTarget.href;

					var linkType = sCode.lt(linkHref);

					if (linkType === 'd') {

						if (linkHref.match(/\.rss|\.xml/)){

							sCode.eVar16 = sCode.prop16 = 'sign ups';

						} else {

							sCode.eVar11 = ((sCode.pageName && sCode.pageName !== '') ? sCode.pageName : '') + ' - ' + linkHref.substring(linkHref.lastIndexOf('/')+1,linkHref.length);

							sCode.eVar11 = sCode.eVar11.toLowerCase();

							sCode.eVar16 = sCode.prop16 = 'Downloads';

							sCode.events = sCode.apl(sCode.events,'event5','','',1);
						}

						sCode.linkTrackVars = 'prop16,eVar16,eVar11,events';

						sCode.linkTrackEvents = 'event5';
					}

					sCode.linkTrackVars = 'None';

					sCode.linkTrackEvents = 'None';
				}
			}, false);
		}
	}

	module.exports = dynamicObjectIdHandlerSafari;

}());

},{}],62:[function(require,module,exports){
(function () {

	'use strict';

	function getVisitNumPerChannel (sCode) {

		var e = new Date();
		var cl;
		var cs;
		var vn = 0;
		var iv = false;
		var lm = false;
		var ch = 'no channel';
		var ct = e.getTime();
		var xs = ct + 30 * 60 * 1000;
		var xl = ct + 1825 * 24 * 60 * 60 * 1000;
		var pn = sCode.wd.location.pathname;
		var geoCode = 'us';
		var channelMap = '';
		var i;

		/**
		 * @TODO
		 * Whatever this is used for, it should not be here. It should be defined in a module
		 */
		var channelTable = new Array('no channel', 'aos', 'homepage', 'support', 'itunes', 'myappleid.iforgot', 'trailers', 'ip', 'discussions', 'myappleid', 'quicktime', 'ipad', 'ipadmini', 'legal', 'mac', 'macosx', 'safari', 'ipod', 'developer', 'retailstore', 'macbookair', 'retail.concierge', 'macosx.downloads', 'ipodtouch', 'ios', 'macbookpro', 'webapps', 'search', 'retail.onetoone', 'icloud', 'imac', 'macmini', 'ilife', 'other', 'findouthow', 'jobs', 'mobileme', 'whymac', 'macappstore', 'hotnews', 'redirects', 'ipodnano', 'education', 'iwork', 'ipodclassic', 'macpro', 'contact', 'appletv', 'finalcutstudio', 'pr', 'productpromotions', 'ipodshuffle', 'airportexpress', 'environment', 'aperture', 'batteries', 'mac.facetime', 'productpromotions.rebate', 'timecapsule', 'displays', 'airportextreme', 'logicstudio', 'buy', 'about', 'accessibility', 'mightymouse', 'thunderbolt', 'html5', 'remotedesktop', 'magictrackpad', 'keyboard', 'business', 'retail.jointventure', 'itunesappstore', 'pro', 'science', 'logicexpress', 'channelprograms', 'startpage', 'advertising', 'financialservices', 'giftcards', 'xsan', 'server', 'battery', 'companystore', 'ali', 'supplier', 'beatles', 'usergroups', 'webbadges', 'procurement', '802.11n', 'retail', 'itunesnews', 'ibooks-author', 'osx', 'apple-events', 'applewatch');


		if (sCode.wd.location.hostname.match(/apple.com.cn/)) {
			geoCode = 'cn';
		} else if (!pn.match(/^\/(ws|pr|g5|go|ta|wm|kb)\//)) {
			if (pn.match(/^\/(\w{2}|befr|benl|chfr|chde|asia|lae)(?=\/)/)) {
				geoCode = pn.split('/')[1].toLowerCase();
			}
		}

		var c = 's_vnum_n2_' + geoCode;
		var c2 = 's_invisit_n2_' + geoCode;

		if (sCode.channel) {
			ch = sCode.channel.substring(sCode.channel.indexOf('.') + 1, sCode.channel.length);
			ch = ch.substring(ch.indexOf('.') + 1, ch.length);
		}

		function chLookup(channel) {
			for (i = 0; i <= channelTable.length; i++) {
				if (channel === channelTable[i]) {
					return i + 1;
				}
			}
		}

		channelMap = chLookup(ch);
		if (!channelMap) {
			channelMap = '0';
		}

		//remove legacy cookie, write new one
		sCode.c_w('s_vnum_' + geoCode, '', 63072000);
		sCode.c_w('s_invisit_' + geoCode, '', 63072000);
		sCode.c_w('s_invisit_n_' + geoCode, '', 63072000);
		sCode.c_w('s_vnum_n_' + geoCode, '', 63072000);

		cl = sCode.c_r(c);
		cs = sCode.c_r(c2);

		//set new cookie
		if (channelMap) {
			var val;
			if (cs) {
				var csa = cs.split(/,/);
				for (i = 0; (val = csa[i]); i++) {
					if (channelMap.toString() === val) {
						iv = true;
						break;
					}
				}
			}
			if (!iv) {
				var cla = (cl) ? cl.split(/,/) : [];
				var vs;
				for (i = 0; (val = cla[i]); i++) {
					vs = val.split(/\|/);
					if (channelMap.toString() === vs[0]) {
						vn = parseInt(vs[1], 10) + 1;
						cla[i] = vs[0] + '|' + vn;
						lm = true;
						break;
					}
				}

				e.setTime(xs);
				sCode.c_w(c2, (cs ? (cs + ',' + channelMap) : channelMap), e);
				e.setTime(xl);
				if (lm) {
					sCode.c_w(c, cla.toString(), e);
					return ch + '=' + vn;
				} else {
					if (cla.toString()) { 
						cla.push(channelMap + '|' + 1);
					} else {
					 	cla = (channelMap + '|' + 1);
					}

					sCode.c_w(c, cla.toString(), e);
					return ch + '=' + 1;
				}
			}
		}
	}

	module.exports = getVisitNumPerChannel;

}());

},{}],63:[function(require,module,exports){
(function () {

	'use strict';

	function osDetect (sCode) {
		var match;

		if (sCode.u.match(/windows/i)) {
			sCode.prop9 = "windows";
			return;
		}

		if (sCode.u.match(/(kindle|silk-accelerated)/i)) {
			if (sCode.u.match(/(kindle fire|silk-accelerated)/i)) {
				sCode.prop9 = "kindle fire";
			} else {
				sCode.prop9 = "kindle";
			}
			return;
		}

		if (sCode.u.match(/(iphone|ipod|ipad)/i)) {
			match = sCode.u.match(/OS [0-9_]+/i);
			sCode.prop9 = 'i' + match[0].replace(/_/g,'.');
			return;
		}

		if (sCode.u.match(/android/i)) {
			sCode.prop9 = sCode.u.match(/android [0-9]\.?[0-9]?\.?[0-9]?/i);
			return;
		}

		if (sCode.u.match(/webos\/[0-9\.]+/i)) {
			match = sCode.u.match(/webos\/[0-9]\.?[0-9]?\.?[0-9]?/i);
			sCode.prop9 = match[0].replace(/webos\//i,'web os ');
			return;
		}

		if (sCode.u.match(/rim tablet os [0-9\.]+/i)) {
			match = sCode.u.match(/rim tablet os [0-9]\.?[0-9]?\.?[0-9]?/i);
			sCode.prop9 = match[0].replace(/rim tablet os/i,'rim os ');
			return;
		}

		if ((sCode.u.match(/firefox\/(\d{2}||[3-9])/i) || sCode.u.match(/AppleWebKit\//)) && sCode.u.match(/Mac OS X [0-9_\.]+/)) {
			var matches = sCode.u.match(/[0-9_\.]+/g);
			matches = matches[1].split(/_|\./);
			sCode.prop9 = matches[0] + "." + matches[1] + ".x";
			return;
		}

		var mv = sCode.u.match(/AppleWebKit\/\d*/i) && sCode.u.match(/AppleWebKit\/\d*/i).toString().replace(/AppleWebKit\//i,'');

		if (mv > 522) {
			sCode.prop9 = "10.5.x";
		} else if (mv > 400) {
			sCode.prop9 = "10.4.x";
		} else if (mv > 99) {
			sCode.prop9 = "10.3.x";
		} else if (mv > 80) {
			sCode.prop9 = "10.2.x";
		} else {
			sCode.prop9 = "mac unknown or non-safari";
		}
	}

	module.exports = osDetect;

}());

},{}],64:[function(require,module,exports){
(function () {

	'use strict';

	function percentPageViewed (sCode) {

		if (!sCode.prop17) {

			var percent = sCode.getPercentPageViewed(sCode.pageName);

			if (percent && percent.length >= 5 && typeof(percent[1]) !== 'undefined') {
				sCode.prop14 = percent[0];
				sCode.prop17 = percent[1] + ':' + percent[2];
				sCode.prop28 = Math.round(percent[3]/10) * 10;
				sCode.eVar17 = sCode.eVar18 = '';

				if (percent[4]) {

					var sva = percent[4].split(/\|/g);
					var sv = '';
					var svaSize = sva.length;

					for (var i=0; i < svaSize; i++) {
						if (i !== (svaSize-1)) {

							var diff = sva[i + 1].split(/:/)[0] - sva[i].split(/:/)[0];

							if (diff > 100) {

								sv += sva[i].split(/:/)[1];

								var nz = diff/100;

								while (nz > 1) {

									sv += '0';

									nz--;
								}

							} else {

								sv += sva[i].split(/:/)[1];

							}

						} else {

							sv += sva[i].split(/:/)[1];
						}
					}

					if (sv.length > 254) {

						sCode.eVar17 = sv.substring(0,254);

						sCode.eVar18 = sv.substring(255,sv.length);

					} else {

						sCode.eVar17 = sv;
					}
				}

				if (!sCode.tcall) {

					sCode.linkTrackVars = 'prop17,prop28';
				}
			}
		}
	}

	module.exports = percentPageViewed;

}());

},{}],65:[function(require,module,exports){
(function () {

	'use strict';

	function plpChannel (sCode) {

		if (((sCode.pageName && sCode.prop14 && sCode.pageName.toLowerCase() !== sCode.prop14.toLowerCase()) || !sCode.prop14) && sCode.tcall) {
			var ch;
			var pathLengthValue;
			var cookieValue = sCode.c_r('s_pathLength');

			var pathLengthArray = (cookieValue.indexOf(',') > -1) ? cookieValue.split(',') : [];
			var e = new Date();
			var ct = e.getTime();

			e.setTime(ct + 30 * 60 * 1000);

			if (sCode.channel) {

				ch = sCode.channel.substring(sCode.channel.indexOf('.') + 1, sCode.channel.length);

				ch = ch.substring(ch.indexOf('.') + 1, ch.length);

			} else {
				ch = 'no channel';
			}

			if (pathLengthArray.length !== 0 && pathLengthArray.toString().indexOf(ch + '=') > -1) {

				var pathLengthArraySize = pathLengthArray.length;

				for (var i = 0; i < pathLengthArraySize; i++) {

					if (pathLengthArray[i].toString().indexOf(ch + '=') > -1) {

						pathLengthValue = pathLengthArray[i].split('=');

						++pathLengthValue[1];

						pathLengthArray[i] = pathLengthValue[0] + '=' + pathLengthValue[1];

						sCode.prop48 = pathLengthValue[1];
					}
				}

				sCode.c_w('s_pathLength', pathLengthArray,e);

			} else {

				pathLengthValue = cookieValue + ch + '=' + 1 + ',';

				sCode.c_w('s_pathLength', pathLengthValue,e);

				sCode.prop48 = '1';
			}

		}
	}

	module.exports = plpChannel;

}());

},{}],66:[function(require,module,exports){
(function () {

	'use strict';

	function setMembership (sCode) {

		if (sCode.tcall) {

			var membership;

			var pathname = window.location.pathname;

			var newMembership = false;

			var noMatch = true;

			if (sCode.c_r('iTunesPresent') || (sCode.prop12 && sCode.prop12 === 'iTunes')) {
				membership = (membership) ? membership + 'it,' : 'it,';
			}

			if (sCode.c_r('hasMobileMe')) {
				membership = (membership) ? membership + 'mm,' : 'mm,';
			}

			if (sCode.c_r('DefaultAppleID') || (sCode.pageName && sCode.pageName.match(/iforgot - cr or email option/))) {
				membership = membership ? membership + 'aid,' : 'aid,';
			}

			if (sCode.c_r('trackStartpage')) {
				membership = membership ? membership + 'sp,' : 'sp,';
			}

			if (sCode.prop11) {
				if (sCode.prop11.match('3p')) {
					membership = membership ? membership + '3p,' : '3p,';
				}
			}

			if (sCode.pageName) {
				if (sCode.pageName.match(/one to one - index/)) {
					membership = membership ? membership + 'o2o,' : 'o2o,';
				}
			}

			if (pathname.match('/welcomescreen/')) {

				var portion;

				if (portion === pathname.match('ilife.*')) {

					portion = 'il' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('iwork.*')) {

					portion = 'iwk' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('itunes.*')) {

					portion = 'it' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;

				} else if (portion === pathname.match('aperture.*')) {

					portion = 'ap' + portion.toString().match('[0-9]+') + ',';
					membership = membership ? membership + portion : portion;
				}
			}

			if (sCode.getQueryParam('sr') && sCode.getQueryParam('vr')) {

				var ver = sCode.getQueryParam('vr');

				ver = ver.substring(0, ver.indexOf('-')) + ',';

				membership = (membership) ? membership + ver : ver;
			}

			if (typeof(membership) !== 'undefined') {
				var e;
				var ct;
				membership = membership.substring(0, membership.length-1).toLowerCase();
				membership = membership.split(',');

				if (sCode.c_r('s_membership')) {

					var membershipCookie = sCode.c_r('s_membership').split(/:/);

					membershipCookie.splice(0,1);

					for (var i = 0; i < membership.length; i++) {
						for (var j = 0; j < membershipCookie.length; j++) {
							if (membershipCookie[j] === membership[i]) {
								noMatch = false;
							}
						}

						if (noMatch) {
							membershipCookie[membershipCookie.length] = membership[i];
							newMembership = true;
						}

						noMatch = true;
					}

					if (newMembership) {

						e = new Date();

						membership = membershipCookie.length + ':' + membershipCookie.toString().replace(/,/g,':');
						ct = e.getTime();
						e.setTime(ct+63072000);//Two years
						sCode.c_w('s_membership', membership,e);
						sCode.prop31 = membership;
					}
				} else {
					membership = membership.length + ':' + membership.toString().replace(/,/g,':');
					e = new Date();
					ct = e.getTime();
					e.setTime(ct+63072000);//Two years
					sCode.c_w('s_membership', membership,e);
					sCode.prop31 = membership;
				}
			}

			if (!sCode.prop31 && !sCode.c_r('s_pathLength')) {
				sCode.prop31 = sCode.c_r('s_membership');
			}
		}
	}

	module.exports = setMembership;

}());

},{}],67:[function(require,module,exports){
(function() {

	'use strict';

	var plpChannel            = require('./helper/plpChannel');
	var cleanPageName         = require('./helper/cleanPageName');
	var osDetect              = require('./helper/osDetect');
	var percentPageViewed     = require('./helper/percentPageViewed');
	var quicktimeCheck        = require('./helper/QTCheck');
	var setMembership         = require('./helper/setMembership');
	var getVisitNumPerChannel = require('./helper/getVisitNumPerChannel');


	function sCodePlugins (sCode) {

		sCode.tcall = (typeof (sCode.linkType) === 'undefined') ? true : false;

		if (typeof (cleanPageName) === 'function') {
			cleanPageName(sCode);
		}


		/**
		 * DynamicObjectIDs for Clickmap
		 */
		var dynamicObjectPathExp = '/(apple.com\/retail\/.+\/map\/|apple.com\/buy\/locator\/|discussions.apple.com|discussionsjapan.apple.com)/g';

		if (!sCode.d.URL.match(dynamicObjectPathExp)) {
			sCode.setupDynamicObjectIDs();
		}


		/**
		 * Detecting 1x vs 2x Platform and setting Prop 5
		 */
		if (navigator && navigator.platform) {
			if (window.devicePixelRatio >= 1.5) {
				sCode.prop5 = navigator.platform + ' 2x';
			} else {
				sCode.prop5 = navigator.platform;
			}
		}

		/**
		 * Redirect Referrer 'ref' query string
		 */
		var tempVar1 = sCode.getQueryParam('ref');

		if (tempVar1 && sCode.tcall) {
			sCode.referrer = tempVar1;
		} else if (tempVar1 && !sCode.tcall) {
			sCode.referrer = '';
		}


		/**
		 * External Campaigns
		 */
		if (!sCode.campaign) {

			sCode.campaign = sCode.getQueryParam('cid');

			sCode.setClickMapEmail('Email_PageName,Email_OID','Email_OT');

			if (sCode.campaign.match(/OAS-.+?-DOMAINS-/i)) {

				var tempVar0 = 'http://' + sCode.campaign.replace(/OAS-.+?-DOMAINS-/i, '');

				sCode.referrer = (sCode.tcall) ? tempVar0 : '';
			}
		}


		/**
		 * Redirect Alias
		 */
		sCode.server = sCode.getQueryParam('alias');

		if (!sCode.server) {
			sCode.server = 'new approach ac-analytics';
		}


		/**
		 * Set campaign
		 */
		sCode.campaign = sCode.getValOnce(sCode.campaign, 's_campaign', 0);


		/**
		 * Set Campaign Path
		 */
		sCode.prop6 = (!sCode.prop6 && sCode.getQueryParam('cp') && sCode.pageName) ? ('D="' + sCode.getQueryParam('cp').toLowerCase() + ': ' + sCode.pageName + '"') : sCode.prop6;


		/**
		 * Set Campaign Channel
		 */
		sCode.prop11 = sCode.getQueryParam('sr');

		if (!sCode.d.URL.match(/\/channel\//) && !sCode.prop11 && sCode.c_r("s_3p")) {

			sCode.prop11 = sCode.c_r('s_3p');

			sCode.c_w('s_3p', '', -1);
		}



		/**
		 * Internal Campaigns
		 * TODO: Make sure we want this logic. Seems a little blah to me.
		 */
		sCode.eVar7 = (!sCode.eVar7) ? sCode.getQueryParam('aid') : '';

		sCode.eVar7 = sCode.getValOnce(sCode.eVar7, 's_var_7', 0);


		/**
		 * Internal Search
		 */
		if (sCode.eVar2) {

			sCode.events = sCode.apl(sCode.events, 'event6', ', ', 1);
		}

		if ((!sCode.d.URL.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) && !sCode.d.URL.match(/apple.com\/search\//)) && (sCode.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search\//) || sCode.d.referrer.match(/apple.com\/search\//))) {

			sCode.eVar2 = (sCode.d.referrer.match(/\/support\//))?"acs: ":((sCode.d.referrer.match(/\/store\//)?"aos: ":"www: "));

			if (sCode.d.referrer.match(/apple.com\/(\w{2}|befr|benl|chfr|chde|asia|lae)\/search/)) {

				sCode.eVar2 += sCode.getQueryParam('q', '', sCode.d.referrer).replace(/\+/g,' ');

				var geo = sCode.d.referrer.match(/\/(\w{2}|befr|benl|chfr|chde|asia|lae)\//i);

				sCode.eVar2 += " ("+geo[0].replace(/\//g,'') + ")";
			} else {

				sCode.eVar2 += sCode.getQueryParam('q', '', sCode.d.referrer).replace(/\+/g,' ') + " (us)";
			}
		}

		/**
		 * Used to populate the Referrer Type report
		 */
		if (sCode.prop11 === 'em' && sCode.tcall) {

			sCode.referrer = 'imap://chatterbox.com';
		}

		if (sCode.prop11 === 'app' && sCode.tcall) {

			sCode.referrer = 'file://fromApp';
		}

		if (document.referrer && document.referrer.indexOf('apple.com/startpage/') >-1 && sCode.tcall) {

			sCode.referrer = 'news://startpage.com';

			sCode._1_referrer = 1;
		}

		if (typeof (percentPageViewed) === 'function') {
			percentPageViewed(sCode);
		}

		/**
		 * Device orientation changes
		 */
		sCode.prop38 = (sCode.tcall) ? sCode.deviceOrientationChanges(true) : '';


		/**
		 * Product Ownership (from Chatterbox)
		 */
		sCode.prop32 = sCode.eVar32 = sCode.getQueryParam('psid');

		if (sCode.prop32 || sCode.c_r('s_sid')) {

			var e = new Date();

			var ct = e.getTime();

			e.setTime(ct + 630720000); //Two years

			if (sCode.prop32) {
				sCode.c_w('s_psid', sCode.prop32, e);
			} else {
				sCode.c_w('s_psid', sCode.c_r('s_sid'), e);
			}

			sCode.c_w('s_sid', '', -1);
		}

		if (!sCode.prop32 && !sCode.c_r('s_pathLength')) {

			sCode.prop32 = sCode.c_r('s_psid');
		}


		/**
		 * Detect in-store access
		 */
		if (!sCode.prop20) {

			var retailStore = navigator.userAgent.match(/foh:r\d{3}/i);

			sCode.prop20 = retailStore ? ('store kiosk:' + retailStore.toString().replace(/foh:/i,'')) : 'non-store kiosk';
		}


		/**
		 * Enhanced Download Tracking: Populate eVar11 with file name and fire event15
		 */
		sCode.linkLeaveQueryString = true;

		var pageURL = sCode.downloadLinkHandler();

		if (pageURL) {

			if (pageURL.match(/\.rss|\.xml/)) {

				sCode.eVar16 = sCode.prop16 = 'sign ups';

			} else {

				sCode.eVar11 = ((sCode.pageName && sCode.pageName !== '') ? sCode.pageName : '') + ' - ' + pageURL.substring(pageURL.lastIndexOf('/')+1, pageURL.length);

				sCode.eVar16 = sCode.prop16 = 'downloads';

				sCode.events = sCode.apl(sCode.events,'event5', ', ', 1);
			}

			//Track eVar & Event

			sCode.linkTrackVars = 'prop16,eVar16,eVar11,events';

			sCode.linkTrackEvents = 'event5';
		}

		sCode.linkLeaveQueryString = false;



		/**
		 * Plugin Detection
		 */
		if (typeof (quicktimeCheck) === 'function' && sCode.tcall) {
			sCode.prop18 = quicktimeCheck(sCode);
		}


		/**
		 * OS Detection
		 */
		if (typeof (osDetect) === 'function') {
			osDetect(sCode);
		}


		/**
		 * Click Depth Check
		 */
		if (sCode.pageName && sCode.pageName.match(/feedback - thank you/)) {

			sCode.prop16 = sCode.eVar16 = "feedback";
		}

		sCode.linkLeaveQueryString = true;

		var exitUrl = sCode.linkHandler('itms.apple.com|itunes.apple.com', 'e');

		var url = sCode.linkHandler('ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/|rss.support.apple.com', 'o');

		if (url) {

			sCode.eVar16 = sCode.prop16 = 'sign ups';

			sCode.linkTrackVars = 'eVar16,prop16';
		}

		sCode.linkLeaveQueryString = false;

		/**
		 * Membership Tracking
		 */
		if (typeof (setMembership) === 'function') {
			setMembership(sCode);
		}


		/**
		 * Path Per Channel Length
		 */
		if (typeof plpChannel === 'function') {
			plpChannel(sCode);
		}

		/**
		 * Determine the Number of Visits  Per Channel
		 */
		if (sCode.tcall) {

			sCode.prop50 = getVisitNumPerChannel(s);
		}


		/**
		 * Populate channel into hier for adobe insight
		 */
		sCode.hier1 = (sCode.channel) ? sCode.channel : '';

		sCode.linkTrackVars = sCode.apl(sCode.linkTrackVars, 'hier1', ', ', 1);

		// Remove all spaces from linkTrackVars
		sCode.linkTrackVars = sCode.linkTrackVars.replace(new RegExp(' ', 'g'), '');



		/**
		 * Populate Prop 49 with Visitor ID
		 */
		function getCleanVisitorId() {
			var visitorId = (sCode && sCode.c_r) ? sCode.c_r('s_vi') : '';
			var match = visitorId.match(/^\s*\[CS\]v1\|(.+)\[CE\]\s*$/);

			if (match) {
				return match[1];
			}
		}

		sCode.prop49 = 'D=' + (getCleanVisitorId() || 's_vi');


		/**
		 * Copy current URL Dynamically
		 */
		sCode.prop4 = (sCode.prop4) ? sCode.prop4 : 'D=g';


		/**
		 * Manage s_code Vars: Lowercase all variables, except for one specified in the second parameter.
		 */
		sCode.manageVars('lowercaseVars', 'purchaseID,pageType,events,products,transactionID', 2);
	}

	module.exports = sCodePlugins;

})();



},{"./helper/QTCheck":59,"./helper/cleanPageName":60,"./helper/getVisitNumPerChannel":62,"./helper/osDetect":63,"./helper/percentPageViewed":64,"./helper/plpChannel":65,"./helper/setMembership":66}],68:[function(require,module,exports){
(function () {

	'use strict';

	var sCode            = require('s-code');
	var sCodeAccount     = require('./config/account');
	var setDefaults      = require('./config/defaults');
	var sCodeInstance;

	/**
	 * @desc Inits sCode once and returns the instance. Returns existing instance on subsequent calls.
	 * @param  {Object} options Hash of user options
	 * @return {Object} The sCode instance
	 */
	function init (options) {
		if (!sCodeInstance) {
			var bucket      = (options.bucket || '');
			sCodeInstance 	= window.s = sCode.init(sCodeAccount(bucket));
			var plugins     = sCode.plugins.init(sCodeInstance);

			setDefaults(sCodeInstance, options);
		}

		return sCodeInstance;
	}

	function getInstance () {
		return sCodeInstance;
	}

	module.exports = {
		init: init,
		getInstance: getInstance
	};

}());

},{"./config/account":55,"./config/defaults":56,"s-code":39}],69:[function(require,module,exports){
/**
 * @module ac-storage
 * @copyright 2014 Apple Inc. All rights reserved.
 *
 * @description
 * Wrapper for localStorage and sessionStorage for key/value pair storage outside of the page context.
 *
 * Instance of {@link Storage} with empty namespace.
 *
 */
'use strict';

var DEFAULT_NAMESPACE = 'ac-storage-';

var Item             = require('./ac-storage/Item');
var Storage          = require('./ac-storage/Storage');
var storageAvailable = require('./ac-storage/Storage/storageAvailable');

var ac_Storage = new Storage(DEFAULT_NAMESPACE);

// Expose Item constructor
ac_Storage.Item = Item;

// Expose storageAvailable method
ac_Storage.storageAvailable = storageAvailable;

module.exports = ac_Storage;

},{"./ac-storage/Item":70,"./ac-storage/Storage":77,"./ac-storage/Storage/storageAvailable":79}],70:[function(require,module,exports){
'use strict';

var ac_adler32           = require('ac-base').adler32;
var ac_Object            = require('ac-base').Object;
var apis                 = require('./Item/apis');
var createExpirationDate = require('./Item/createExpirationDate');
var encoder              = require('./Item/encoder');

var DAY                       = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr
var DEFAULT_DAYS_TO_EXPIRE_IN = 30; // in days

/**
 * Constructor for objects that contain key and value information for the purpose
 * of storing after the page context unloads. Has additional features as well, such
 * as mimicking cookie expiration, invalidating the value based on a provided checksum
 * and saving various other metadata.
 *
 * Value is allowed to be any object that can be stringified into JSON and parsed back
 * again. It will not provide the object as a pointer to the same place on the disk, which
 * would no longer exist, but it does provide a new object containing the same owned properties.
 *
 * @constructor Item
 *
 * @param {String} key
 *
 * @property {String}  key            Protected; Storage key for this Item
 * @property {String}  checksum       String that describes information about the validity of this Item’s value.
 * @property {Mixed}   value          Value of this Item
 * @property {Integer} expirationDate Date after which this item will expire, as a timestamp
 * @property {Object}  metadata       Extra information that can be stored on this Item and used in other ways
 *
 */
function Item(key) {
	if (!key || typeof key !== 'string') {
		throw 'ac-storage/Item: Key for Item must be a string';
	}

	// New Item has only a key until state is loaded or otherwise manipulated
	this._key            = key;
	this._checksum       = null;
	this._expirationDate = null;
	this._metadata       = null;
	this._value          = null;

	// Getters and setters for properties
	ac_Object.synthesize(this);

	// Set to 30 days from now, as accurate as 1 day
	this.setExpirationDate(Item.createExpirationDate(DEFAULT_DAYS_TO_EXPIRE_IN));
}

Item.prototype = {
	/**
	 * Save the state of this Item in storage
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 */
	save: function () {
		var api;
		var stateObj;
		var value;
		var options = {};

		// Get the best available API for the options
		api = apis.best(options);

		// If an api to store on is available, use it!
		if (api) {
			if (this.value() === null && typeof api.removeItem === 'function') {
				return api.removeItem(this.key());

			} else if (typeof api.setItem === 'function') {

				// Get object that represents the state of the Item
				stateObj = this.__state();

				// Encode the state as a string
				value = encoder.encode(stateObj);

				// Store state in persistent storage
				return api.setItem(this.key(), value, this.expirationDate());
			}

		}

		return false;
	},


	/**
	 * Load the state of this Item from storage
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 *
	 */
	load: function () {
		var api;
		var value;

		// Get the best available API
		api = apis.best();

		// If an api to load from is available, use it!
		if (api && typeof api.getItem === 'function') {
			value = api.getItem(this.key());

			// Update the state of this object based on value
			this.__updateState(encoder.decode(value));

			if (value === null || this.hasExpired()) {
				// Update persistent storage to remove item
				this.remove();

				return false;

			} else {

				return true;
			}

		} else {
			return false;
		}
	},


	/**
	 * Remove this item for storage, no matter which type of storage it was saved in
	 *
	 * @memberOf Item#
	 *
	 * @return {Boolean}
	 *
	 */
	remove: function () {
		var api;
		
		// Clear object state
		this.__updateState(null);

		// Get the best available API
		api = apis.best();

		// Remove the item for this key for the best available API.
		// Most likely if this browser had chosen best api for getItem it will be the same for removeItem
		return api.removeItem(this.key());
	},


	/**
	 * Whether the state of this object is still valid
	 *
	 * @memberOf Item#
	 *
	 * @param {String} checksum Optional;
	 *
	 * @return {Boolean} Is the state still valid?
	 *
	 */
	hasExpired: function (checksum) {
		// Expired if expiration date is in the past (or right now)
		// or that checksum is no longer valid
		// false means session storage, so it’s valid if it exists and checksum is valid!
		if (((this.expirationDate() !== false) && (this.expirationDate() <= Date.now())) || !this.__checksumIsValid(checksum)) {
			return true;
		}

		// We got this far! Item’s value is still good, as long as we loaded state history first.
		return false;
	},


	/**
	 * Getter for `value` property. Removes Item and returns null if it has expired.
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param {String} checksum Optional;
	 *
	 * @return  {Mixed} value `null` if value hasExpired
	 *
	 */
	value: function (checksum) {
		// If value is not valid anymore
		if (this.hasExpired(checksum)) {
			this.remove();
		}

		// Return value. If it has expired, value will be `null`
		return this._value;
	},


	/**
	 * Setter for `checksum` property
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param  {String} checksum A string that represents all the information in a particular syntax that needs to remain consistent for the state of this Item to remain valid. This string is ran through the Adler32 algorithm to save space in storage.
	 *
	 */
	setChecksum: function (checksum) {
		if (checksum === null) {
			this._checksum = checksum;
		} else if (typeof checksum === 'string' && checksum !== '') {
			this._checksum = ac_adler32(checksum);
		} else {
			throw 'ac-storage/Item#setChecksum: Checksum must be null or a string';
		}
	},


	/**
	 * Setter for `expirationDate` property
	 *
	 * @method
	 * @memberOf Item#
	 *
	 * @param  {Mixed} expirationDate Set the expiration date to a certain day in the future. Use a Date object, a date string, or a timestamp to define a date. Use `false` to save this Item just for the user’s session.
	 *
	 */
	setExpirationDate: function (expirationDate) {
		if (expirationDate === null) {
			expirationDate = Item.createExpirationDate(DEFAULT_DAYS_TO_EXPIRE_IN);
		}

		// False means use sessionStorage
		if (expirationDate !== false) {
			// Parse date string to timestamp
			if (typeof expirationDate === 'string') {
				expirationDate = new Date(expirationDate).getTime();
			}

			// Parse date object to timestamp
			if (expirationDate && typeof expirationDate.getTime === 'function') {
				expirationDate = expirationDate.getTime();
			}

			// Validate as timestamp, which is really just a number. 0 is considered invalid as new Date(null).getTime() === 0
			if (!expirationDate || isNaN(expirationDate)) {
				throw 'ac-storage/Item: Invalid date object provided as expirationDate';
			}

			// Round down expiration date to midnight (UTC timezone)
			expirationDate -= expirationDate % DAY;

			// Expiring today or in the past is treated as session storage
			if (expirationDate <= Date.now()) {
				expirationDate = false;
			}
		}

		// Update expiration date in context
		this._expirationDate = expirationDate;
	},


	/**
	 * Represent the state of this Item as an object
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @return {Object} Object that represents the state of the Item, for storing
	 */
	__state: function () {
		var stateObj = {};

		stateObj.checksum = this.checksum();
		stateObj.expirationDate = this.expirationDate();
		stateObj.metadata = this.metadata();
		stateObj.value = this.value();

		return stateObj;
	},


	/**
	 * Update this item based on a stateObj. Used for loading.
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @param  {Object} stateObj Object that represents the state of the Item. Use `null` to clear state (retains key).
	 *
	 */
	__updateState: function (stateObj) {
		var prop;
		var setter;

		// For clearing out state
		if (stateObj === null) {
			stateObj = {
				checksum: null,
				expirationDate: null,
				metadata: null,
				value: null
			};
		}

		// For every proper in the state object
		for (prop in stateObj) {
			// Figure out setter name
			setter = 'set' + prop.charAt(0).toUpperCase() + prop.slice(1);

			// If a setter exists for this prop
			if (typeof this[setter] === 'function') {

				// Set the new value for the property
				this[setter](stateObj[prop]);
			}
		}
	},


	/**
	 * Update this item based on a stateObj. Used for loading.
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 * @param  {String} checksum Checksum value to check against checksum in state
	 *
	 */
	__checksumIsValid: function (checksum) {
		// If a checksum was passed
		if (checksum) {

			// Convert to Adler32 checksum format first
			checksum = ac_adler32(checksum);

			// If the Item’s state does not have a checksum
			if (!this.checksum()) {
				throw 'ac-storage/Item: No checksum exists to determine if this Item’s value is valid. Try loading context from persistent storage first.';

			// If they are exactly equal, our Item’s value is still valid
			} else if (checksum === this.checksum()) {
				return true;
			}

			// If we’ve made it this far, then our value is no longer valid :[
			return false;

		// We were not expecting a checksum to exist in the state because we didn’t pass one!
		} else if (this.checksum()) {
			throw 'ac-storage/Item: No checksum passed, but checksum exists in Item’s state.';
		}

		return true;
	},


	/**
	 *
	 * @memberOf Item#
	 * @private
	 * @ignore
	 *
	 */
	setKey: function () {
		throw 'ac-storage/Item: Cannot set key after synthesizing';
	}
};



/**
 * Getter for `key` property
 *
 * @method
 * @memberOf Item#
 * @name Item#key
 *
 * @return  {String} Key
 *
 */

/**
 * Getter for `checksum` property
 *
 * @method
 * @memberOf Item#
 * @name Item#checksum
 *
 * @return  {String} checksum
 *
 */

/**
 * Getter for `expirationDate` property
 *
 * @method
 * @memberOf Item#
 * @name Item#expirationDate
 *
 * @return  {Date} expirationDate
 *
 */

/**
 * Getter for `metadata` property
 *
 * @method
 * @memberOf Item#
 * @name Item#metadata
 *
 * @return  {Object} metadata
 *
 */

/**
 * Setter for `metadata` property
 *
 * @method
 * @memberOf Item#
 * @name Item#setMetadata
 *
 * @param  {Object} metadata
 *
 */

/**
 * Setter for `value` property
 *
 * @method
 * @memberOf Item#
 * @name Item#setValue
 *
 * @param  {Mixed} value
 *
 */


Item.createExpirationDate = createExpirationDate;

module.exports = Item;

},{"./Item/apis":71,"./Item/createExpirationDate":74,"./Item/encoder":75,"ac-base":false}],71:[function(require,module,exports){
'use strict';

var ac_log = require('ac-base').log;
var api_localStorage = require('./apis/localStorage');
var api_userData     = require('./apis/userData');

/**
 * Method to access Normalized Storage APIs for storing key/value pairs
 * in the browser for use after page context is unloaded.
 *
 * @namespace Item/apis
 *
 * @todo  {@link https://interactive-git.apple.com/Interactive-Interfaces/ac-storage/issues/21 | storage/Item/apis : If feature unavailable, remove from list}
 */
var apis = {
	/**
	 * List of available APIs for storing key/value pairs using
	 *
	 * @memberOf Item/apis
	 * @private
	 *
	 * @type {Array}
	 */
	_list: [
		api_localStorage,
		api_userData
	],


	/**
	 * Access the list of APIs
	 *
	 * @memberOf Item/apis
	 *
	 * @return {Array}
	 */
	list: function () {
		return this._list;
	},


	/**
	 * Run a method on all of the available APIs defined.
	 *
	 * @memberOf Item/apis
	 *
	 * @param  {String} method Name of the method to run
	 *
	 * @return {Array} An array of results for whatever the provided method returns for each api
	 * @deprecated
	 */
	all: function (method) {

		ac_log('ac-storage/Item/apis.all: Method is deprecated');

		// Pass subsequent arguments to method
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof method !== 'string') {
			throw 'ac-storage/Item/apis.all: Method name must be provided as a string';
		}

		var results = this.list().map(function (api) {
			if (api.available()) {
				if (typeof api[method] === 'function') {
					return api[method].apply(api, args);
				} else {
					throw 'ac-storage/Item/apis.all: Method not available on api';
				}
			}

			return false;
		});

		return results;
	},


	/**
	 * Get the best API available to save storage on
	 *
	 * @memberOf Item/apis
	 *
	 * @return {Object} Normalized Storage API
	 */
	best: function () {
		var best = null;

		this.list().some(function (api) {
			if (api.available()) {
				best = api;
				return true;
			}
		});

		return best;
	}
};

module.exports = apis;

},{"./apis/localStorage":72,"./apis/userData":73,"ac-base":false}],72:[function(require,module,exports){
'use strict';

var AC_Environment_Feature = require('ac-base').Environment.Feature;

var api = window.localStorage;
var api_session = window.sessionStorage;

var available;

/**
 * Wrapper for the localStorage API
 *
 * @memberOf Item/apis
 * @namespace Item/apis/localStorage
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage|MDN: DOM Storage guide}
 *
 */
var api_localStorage = {

	name: 'localStorage',
	
	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @return {Boolean}
	 */
	available: function () {
		if (available === undefined) {
			available = AC_Environment_Feature.localStorageAvailable();
		}

		return available;
	},

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 *
	 * @return {String}
	 */
	getItem: function (key) {
		return api.getItem(key) || api_session.getItem(key);
	},

	/**
	 * Store a key/value pair.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 * @param  {String} Value
	 * @param  {Date | Boolean} expirationDate The date on which this Item expires. False means valid only for session.
	 *
	 * @return {Boolean}
	 */
	setItem: function (key, value, expirationDate) {
		// Session Storage
		if (expirationDate === false) {
			api_session.setItem(key, value);

		// Local Storage
		} else {
			api.setItem(key, value);
		}

		return true;
	},

	/**
	 * Remove an item from storage.
	 *
	 * @memberOf Item/apis/localStorage
	 *
	 * @param  {String} key
	 *
	 * @return {Boolean}
	 */
	removeItem: function (key) {
		api.removeItem(key);
		api_session.removeItem(key);

		return true;
	}
};

module.exports = api_localStorage;

},{"ac-base":false}],73:[function(require,module,exports){
'use strict';

var AC_Element  = require('ac-base').Element;

var DAY = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr

var storeID = 'ac-storage';
var available;

/**
 * Wrapper for the IE #userData API, which can be used to shim localStorage for IE < 8
 *
 * @memberOf Item/apis
 * @namespace Item/apis/userData
 *
 * @see {@link http://msdn.microsoft.com/en-us/library/ms531424|Microsoft.com: userData Behavior}
 *
 */
var api_userData = {

	name: 'userData',
	
	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @return {Boolean}
	 */
	available: function () {
		if (available === undefined) {
			available = false;

			// Requires a DOM be available
			if (document && document.body) {
				var el = this.element();

				// IE7 returns typeof el.addBehavior as 'object', even though it is a function...
				if (AC_Element.isElement(el) && el.addBehavior !== undefined) {
					available = true;
				}

				// If userData is not available then remove the element from DOM.
				if (available === false) {
					this.removeElement();
				}
			} else {
				throw 'ac-storage/Item/apis/userData: DOM must be ready before using #userData.';
			}
		}

		return available;
	},

	/**
	 * Whether this API is available to use for this purpose.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 *
	 * @return {String}
	 */
	getItem: function (key) {
		var el = this.element();

		// Load saved #userData attributes
		el.load(storeID);

		return el.getAttribute(key) || null;
	},

	/**
	 * Store a key/value pair.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 * @param  {String} Value
	 * @param  {Date | Boolean} expirationDate The date on which this Item expires. False means valid only for session.
	 *
	 * @return {Promise}
	 */
	setItem: function (key, value, expirationDate) {
		var el = this.element();

		// Storage the value on the attribute
		el.setAttribute(key, value);

		// Session Storage
		if (expirationDate === false) {
			// Set expiration date to tomorrow, as sessionStorage does not exist in #userData
			expirationDate = new Date(Date.now() + DAY);
		}

		// Set expiration date
		if (expirationDate && typeof expirationDate.toUTCString === 'function') {
			el.expires = expirationDate.toUTCString();
		}

		// Save the #userData attributes to the key
		el.save(storeID);

		return true;
	},

	/**
	 * Remove an item from storage.
	 *
	 * @memberOf Item/apis/userData
	 *
	 * @param  {String} key
	 *
	 * @return {Promise}
	 */
	removeItem: function (key) {
		var el = this.element();

		// Remove the attribute with persistent data
		el.removeAttribute(key);

		// Save the #userData to the key
		el.save(storeID);

		return true;
	},


	_element: null,
	/**
	 * @inner
	 */
	element: function () {
		if (this._element === null) {
			this._element = document.createElement('meta');
			this._element.setAttribute('id', 'userData');
			this._element.setAttribute('name', 'ac-storage');
			this._element.style.behavior = "url('#default#userData')";
			document.getElementsByTagName('head')[0].appendChild(this._element);
		}

		return this._element;
	},

	removeElement: function () {
		if (this._element !== null) {
			AC_Element.remove(this._element);
		}

		return this._element;
	}
};

module.exports = api_userData;

},{"ac-base":false}],74:[function(require,module,exports){
'use strict';

var DAY = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr

/**
 * Figure out the expiration date based on the current date or the supplied date object,
 * and the amount of days until it is set to expire.
 *
 * @memberOf Item
 * @static
 *
 * @param  {Integer} days How many days from the fromDate do we want this to expire in?
 * @param  {Date|Integer} fromDate If not right now, when do we start couting? As a Date object or timestamp.
 *
 * @return {Integer} Timestamp
 *
 */
var createExpirationDate = function (days, fromDate) {
	if (typeof days !== 'number') {
		throw 'ac-storage/Item/createExpirationDate: days parameter must be a number.';
	}

	// fromDate can be a Date object or timestamp
	if (fromDate === undefined || typeof fromDate === 'number') {
		fromDate = fromDate === undefined ? new Date() : new Date(fromDate);
	}

	if (typeof fromDate.toUTCString !== 'function' || fromDate.toUTCString() === 'Invalid Date') {
		throw 'ac-storage/Item/createExpirationDate: fromDate must be a date object, timestamp, or undefined.';
	}

	fromDate.setTime(fromDate.getTime() + (days * DAY));

	// Return as time stamp (e.g. 1322849543460)
	return fromDate.getTime();
};


module.exports = createExpirationDate;

},{}],75:[function(require,module,exports){
'use strict';

var compressor = require('./encoder/compressor');

/**
 * Compress an item’s state object before serializing for storage
 *
 * @memberOf Item
 * @namespace Item/encoder
 *
 * @type {Object}
 *
 */
var encoder = {
	/**
	 * Encode and compress JSON string to store state of this Item
	 *
	 * @memberOf Item/encoder
	 *
	 * @param {Object} stateObj Uncompressed state object
	 *
	 * @return {String} Compressed state object string
	 */
	encode: function (stateObj) {
		var stateObjString;
		var compressedStateObj;

		compressedStateObj = compressor.compress(stateObj);

		try	{
			stateObjString = JSON.stringify(compressedStateObj);
		} catch (ignore) { }

		if (!this.__isValidStateObjString(stateObjString)) {
			throw 'ac-storage/Item/encoder/encode: state object is invalid or cannot be saved as string';
		}

		return stateObjString;
	},


	/**
	 * Decode and decompress JSON string to state object
	 *
	 * @memberOf Item/encoder
	 *
	 * @param {String} stateObjString Compressed state object as string
	 *
	 * @return {Object} Decompressed state object
	 */
	decode: function (stateObjString) {
		var stateObj;
		var decompressedStateObj;

		if (!this.__isValidStateObjString(stateObjString)) {
			if (stateObjString === undefined || stateObjString === null || stateObjString === '') {
				return null;
			}

			throw 'ac-storage/Item/encoder/decode: state string does not contain a valid state object';
		}

		try {
			stateObj = JSON.parse(stateObjString);
		} catch (ignore) {
			throw 'ac-storage/Item/encoder/decode: Item state object could not be decoded';
		}

		decompressedStateObj = compressor.decompress(stateObj);

		return decompressedStateObj;
	},


	/**
	 * Check if the state object string containts a valid state object
	 *
	 * @memberOf Item/encoder
	 * @private
	 * @ignore
	 *
	 * @param  {Mixed} stateObjString to be validated
	 *
	 * @return {Boolean} Is the argument passed in a valid state object?
	 */
	__isValidStateObjString: function (stateObjString) {
		try {
			if (stateObjString !== undefined && stateObjString.substring(0,1) === '{') {
				return true;
			}
			return false;
		}
		catch (e) {
			return false;
		}

	}
};

module.exports = encoder;

},{"./encoder/compressor":76}],76:[function(require,module,exports){
/**
 * Compress an item’s state object before serializing for storage
 *
 * @memberOf Item/encoder
 * @namespace Item/encoder/compressor
 *
 * @type {Object}
 *
 */

var DAY      = 1000 * 60 * 60 * 24; // 1000ms * 60s * 60m * 24hr
var DATE_KEY = 14975; // number of days (rounded down) from Jan 01 2011

var compressor = {

	mapping : {
		key :            'k',
		checksum :       'c',
		expirationDate : 'e',
		metadata :       'm',
		value :          'v'
	},

	/**
	 * Compress object to save bytes when storing Item state
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param {Object} stateObj Uncompressed state object
	 *
	 * @return {Object} Compressed state object
	 */
	compress: function (stateObj) {

		var compressedStateObj = {};
		var mapping = compressor.mapping;

		for (var prop in mapping) {

			if(stateObj.hasOwnProperty(prop) && stateObj[prop]) {

				if (prop === 'expirationDate') {
					// convert the expiration date to days
					var days = this.millisecondsToOffsetDays(stateObj[prop]);

					compressedStateObj[mapping[prop]] = days;
				} else {
					compressedStateObj[mapping[prop]] = stateObj[prop];
				}
			}
		}

		return compressedStateObj;
	},

	/**
	 * Compress object to restore Item state
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param {Object} stateObj Compressed state object
	 *
	 * @return {Object} Decompressed state object
	 */
	decompress: function (compressedStateObj) {

		var stateObj = {};
		var mapping = compressor.mapping;


		for (var prop in mapping) {

			if(compressedStateObj.hasOwnProperty(mapping[prop])) {

				if (prop === 'expirationDate') {
					// convert the expiration date back to milliseconds
					var milliseconds = this.offsetDaysToMilliseconds(compressedStateObj[mapping[prop]]);

					stateObj[prop] = milliseconds;
				} else {
					stateObj[prop] = compressedStateObj[mapping[prop]];
				}
			}

		}

		return stateObj;
	},

	/**
	 * Convert milliseconds to days
	 * Rounds down to the nearest day
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param  {Integer} number of milliseconds
	 *
	 * @return {Integer} number of days
	 */
	millisecondsToOffsetDays: function (milliseconds) {
		return Math.floor(milliseconds / DAY) - DATE_KEY;
	},

	/**
	 * Convert days to milliseconds
	 *
	 * @memberOf Item/encoder/compressor
	 *
	 * @param  {Integer} number of days
	 *
	 * @return {Integer} number of milliseconds
	 */
	offsetDaysToMilliseconds: function (days) {
		return (days + DATE_KEY) * DAY;
	}
};

module.exports = compressor;

},{}],77:[function(require,module,exports){
'use strict';

var ac_Object          = require('ac-base').Object;
var api_localStorage   = require('./Item/apis/localStorage');
var registry           = require('./Storage/registry');

/**
 * Default options for Storage instances. Currently there are none.
 *
 * @memberOf Storage~
 * @private
 *
 * @type {Object}
 */
var defaultOptions = {};

/**
 * Wrapper for localStorage and sessionStorage for key/value pair storage outside of the page context.
 *
 * @constructor Storage
 *
 * @param {String} namespace
 * @param {Object} options Optional; Override default options if applicable
 *
 * @property {String} namespace Any item accessed through an instance of Storage will have this string prepending it’s key.
 * @property {Object} options Configuration object for this instance
 *
 */
function Storage(namespace, options) {
	this._namespace = namespace || '';
	this._options = ac_Object.extend(ac_Object.clone(defaultOptions), options || {});

	// Getters and setters for properties
	ac_Object.synthesize(this);
}

Storage.prototype = {
	/**
	 * Get the value of an Item for a key from storage
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 *
	 * @return {Mixed | null} Value of item for key
	 */
	getItem: function (key) {
		// Get the Item object from the registry
		var item = this.__item(key);

		// Load the saved state from storage
		item.load();

		// Return the item’s value
		return item.value();
	},



	/**
	 * Store a value for a key.
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 * @param {Mixed} value Value can be any simple object. It will be stringified into JSON, then parse back when retrieved.
	 *
	 * @return {Boolean}
	 */
	setItem: function (key, value) {

		// Get the Item object from the registry
		var item = this.__item(key);

		if (value === undefined) {
			throw 'ac-storage/Storage#setItem: Must provide value to set key to. Use #removeItem to remove.';
		}

		// Update item’s state
		item.setValue(value);

		return item.save();
	},



	/**
	 * Remove an item from storage
	 *
	 * @memberOf Storage#
	 *
	 * @param {String} key
	 *
	 * @return {Boolean}
	 */
	removeItem: function (key) {
		// Get the Item object from the registry
		var item = this.__item(key);

		// Remove item from registry
		registry.remove(item.key(), true);

		// Remove the item from storage
		return item.save();
	},

	// /**
	//  * Removes all localStorage values that have expired.
	//  * Also removes any #userData values with the same key.
	//  *
	//  * @memberOf Storage
	//  * @name removeExpired
	//  * @method
	//  *
	// */
	removeExpired: function () {
		var item;
		var i;

		// Expiration is only relevant for localStorage and #userData,

		if (api_localStorage.available()) {

			// Iterate over all localStorage items
			for (i = 0; i < window.localStorage.length; i++) {
				// Get the item object from the key
				item = this.__item(window.localStorage.key(i));

				//Remove if expired
				if (item.hasExpired() && JSON.parse(window.localStorage[window.localStorage.key(i)]).v !== 'undefined') {
					item.remove();
				}
			}

		} else {

			// Iterate over all userData items
			var storeID = 'ac-storage';
			var el = document.getElementById('userData');
			el.load(storeID);
			var attr;
			var doc = el.xmlDocument; // the reference to the XMLDocument
			var attributes = doc.firstChild.attributes; // the root element will always be the firstChild of the XMLDocument
			var len = attributes.length;

			i = -1;

			while ( ++i < len ) {
				attr = attributes[i];
				item = this.__item(attr.nodeName);
				if(item.hasExpired() && JSON.parse(attr.nodeValue).v !== 'undefined') {
					item.remove();
				}
			}
		}

	},

	/**
	 * Gets Item instance for key using registry, pre-pending with namespace
	 *
	 * @memberOf Storage#
	 * @private
	 *
	 * @param  {String} key
	 *
	 * @return {Object} Instance of {@link Item} for the key provided, prepended by namespace.
	 *
	 */
	__item: function (key) {
		if (typeof key !== 'string' || key === '') {
			throw 'ac-storage/Storage: Key must be a String.';
		}

		// Get the Item object from the registry
		var item = registry.item(this.namespace() + key);

		return item;
	}
};

module.exports = Storage;

},{"./Item/apis/localStorage":72,"./Storage/registry":78,"ac-base":false}],78:[function(require,module,exports){
'use strict';

var Item = require('../Item');

var items = {};

/**
 * Singleton for storing instances of items for use with storage/storage.
 * Not used when referencing storage/Item directly.
 *
 * @memberOf Storage
 * @namespace Storage/registry
 *
 */
var registry = {
	/**
	 * Get an item from the registry by key. If the item does not exist
	 * in the registry yet, it will create a new Item with that key and
	 * load it’s state from storage.
	 *
	 * @memberOf Storage/registry
	 *
	 * @param  {String} key
	 *
	 * @return {Item}
	 *
	 */
	item: function (key) {
		var item = items[key];

		if (!item) {
			item = this.register(key);
		}

		return item;
	},

	/**
	 * Register a new Item for easy lookup later
	 *
	 * @memberOf Storage/registry
	 *
	 * @param  {String} key
	 *
	 * @return {Item}
	 *
	 */
	register: function (key) {
		var item = items[key];

		if (!item) {
			// Create a new Item in page memory
			item = new Item(key);

			// Add item to registry list
			items[key] = item;
		}

		return item;
	},

	/**
	 * Clear the whole registry
	 *
	 * @memberOf Storage/registry
	 *
	 * @param {Boolean} alsoRemoveItemFromStorage Default is `false`; Whether we should manually clear the page memory as well.
	 *
	 * @return {Promise}
	 */
	clear: function (alsoRemoveItemFromStorage) {
		var key;

		for (key in items) {
			this.remove(key, alsoRemoveItemFromStorage);
		}

		return true;
	},

	/**
	 * Remove an item from the registry
	 *
	 * @memberOf Storage/registry
	 *
	 * @param {String} key
	 * @param {Boolean} alsoRemoveItemFromStorage Default is `false` Whether we should manually clear the page memory as well.
	 *
	 * @return {Promise}
	 */
	remove: function (key, alsoRemoveItemFromStorage) {
		var item = items[key];

		if (item && !!alsoRemoveItemFromStorage) {
			item.remove();
		}

		items[key] = null;

		return true;
	}
};

module.exports = registry;

},{"../Item":70}],79:[function(require,module,exports){
'use strict';

var apis = require('../Item/apis');

var available;

/**
 *
 * @namespace Storage
 *
 * @return {Boolean} Whether or not there are any available APIs for which to store persistent data.
 *
 */
module.exports = function storageAvailable() {
	// Memoize
	if (available !== undefined) {
		return available;
	}

	// If there is no best API, then assume no APIs are available.
	available = !!apis.best();

	return available;
};

},{"../Item/apis":71}],"++O3BW":[function(require,module,exports){
module.exports = {
	observer: {
		Audio:      require("./ac-analytics/observer/Audio"),
		Click:      require("./ac-analytics/observer/Click"),
		Event:      require("./ac-analytics/observer/Event"),
		Exit:       require("./ac-analytics/observer/Exit"),
		Gallery:    require("./ac-analytics/observer/Gallery"),
		Link:       require("./ac-analytics/observer/Link"),
		Overlay:    require("./ac-analytics/observer/Overlay"),
		Page:       require("./ac-analytics/observer/Page"),
		Section:    require("./ac-analytics/observer/Section"),
		Video:      require("./ac-analytics/observer/Video")
	},
	regions: require('./ac-analytics/regions/regions')
};

},{"./ac-analytics/observer/Audio":89,"./ac-analytics/observer/Click":90,"./ac-analytics/observer/Event":91,"./ac-analytics/observer/Exit":92,"./ac-analytics/observer/Gallery":93,"./ac-analytics/observer/Link":94,"./ac-analytics/observer/Overlay":95,"./ac-analytics/observer/Page":96,"./ac-analytics/observer/Section":97,"./ac-analytics/observer/Video":98,"./ac-analytics/regions/regions":121}],"ac-analytics":[function(require,module,exports){
module.exports=require('++O3BW');
},{}],82:[function(require,module,exports){
'use strict';

var proto;
var ac_Array = require('ac-base').Array;
var errorHandler = require('./error-handler/ErrorHandler');
var ac_Storage = require('ac-storage');
var STORAGE_KEY = 'analytics-queue';

function Queue() {
	this._storage = ac_Storage;
	this._arr = [];
	this._length = 0;
}

proto = Queue.prototype;

proto.add = function(item) {
	if (!item) {
		errorHandler.log('Queue', 'add', item + ' is not a valid object');
	}

	if (errorHandler.exception) {
		return;
	}
	
	this._arr.push(item);
	this._updateQueueSize();
};

proto.remove = function () {
	if (this.size() > 0) {
		this._arr.shift();
		this._updateQueueSize();
	}
};

proto.reset = function () {
	this._arr = [];
	this._length = 0;
};

proto.peek = function () {
	if (this.size() > 0) {
		return this._arr[0];
	}
};

proto.isEmpty = function () {
	return (this.size() === 0);
};

proto.size = function () {
	return this._length;
};

proto.load = function () {
	var analyticsData = this._storage.getItem(STORAGE_KEY);

	if (Array.isArray(analyticsData)) {
		this._arr = analyticsData;
		this._storage.removeItem(STORAGE_KEY);
		this._updateQueueSize();
	}
};

proto.save = function () {
	this._storage.setItem(STORAGE_KEY, this._arr);
	this.reset();
};

proto.collect = function () {
	var analyticsQueue = this._arr;
	var analyticsData = this._storage.getItem(STORAGE_KEY);

	if (Array.isArray(analyticsData)) {
		var temp = analyticsData;
		analyticsQueue = temp.concat(analyticsQueue);
	}
	this._storage.setItem(STORAGE_KEY, analyticsQueue);
	this.reset();
};

proto.canSave = function () {
	return this._storage.storageAvailable();
};

proto._updateQueueSize = function () {
	this._length = this._arr.length;
};

module.exports = Queue;

},{"./error-handler/ErrorHandler":86,"ac-base":false,"ac-storage":69}],83:[function(require,module,exports){
'use strict';

var proto;

var Deferred = require('ac-deferred').Deferred;
var Queue = require('./Queue');
var plugins = require('./plugins/plugins');
var translator = require('./translator/translator');
var errorHandler = require('./error-handler/ErrorHandler');
var moduleName = 'Tracker';

// A singleton that collects, queues and runs an analytics queue asynchronously
function Tracker (plugin) {

	if (typeof plugins[plugin] === 'function') {
		this._plugin = new plugins[plugin]();
	} else {
		errorHandler.log(moduleName, null, 'Could not create a Tracker. "' + plugin + '" is not a valid plugin');
	}

	if (errorHandler.exception) {
		return;
	}

	this.paused = false;

	this._queue = new Queue();

	// If there is something left in the storage that we want to flush out
	this.resume();
}

proto = Tracker.prototype;

// Adds an analytics request to the queue and runs the queue
proto.track = function (request) {
	var translatedRequest;

	if (!request || typeof request !== 'object' || !request.type) {
		errorHandler.log(moduleName, 'track', request + ' is not a valid request object');
	}

	if (errorHandler.exception) {
		return;
	}

	// Translate the request into a generic format
	translatedRequest = translator.translate(request);

	// Translate the generic request into plugin (sCode) specific format
	translatedRequest = this._plugin.translate(translatedRequest);
	this._queue.add(translatedRequest);

	if (this.paused === true) {
		this._queue.collect();
		return;
	}

	this._run();
};

// Checks if the Tracker is paused
proto.isPaused = function () {
	return this.paused;
};

// Resumes a paused analytics queue and sets paused property of the Tracker to false
proto.resume = function () {
	
	this._queue.load();

	var queueSize = this._queue.size();

	if (queueSize === 0) {
		return;
	}

	this.paused = false;

	this._run();
};

// Runs the analytics queue by submitting requests to the analytics plugin in sync or async
proto._run = function () {
	var promise;

	if (this._queue.size() === 0) {
		return;
	}

	// Adding logic to run requests synchronously
	var request = this._queue.peek();

	var options = request.options || {};

	// If we didnt find async option then we assume async is true
	if (typeof options.async === 'undefined') {
		options.async = true;
	}

	if (options.async === false) {
		promise = this.sync(this.send.bind(this));
	} else {
		promise = this.async(this.send.bind(this));
	}

	promise.then(function () {			
		if (!this.paused && this._queue.size() > 0) {
			this._run();
		}

	}.bind(this));

};

// Sends the queue for processing single request at a time
proto.send = function () {

	if (typeof this._plugin.submit !== 'function') {
		errorHandler.log(moduleName, 'send', 'provided plugin does not contain a valid submit method');
	}

	if (errorHandler.exception) {
		return;
	}
	
	if (this._queue.size() === 0) {
		return;
	}
	
	var request = this._queue.peek();

	this._plugin.submit(request);
	this._queue.remove();
};

// Pauses an analytics queue and sets paused property of the Tracker to true
proto.pause = function () {

	if (this.paused === true) {
		return;
	}

	if (!this.canPause()) {
		return;
	}

	if (this._queue.size() > 0) {
		this._queue.save();
	}

	this.paused = true;
};

// Checks if the Tracker can be paused
proto.canPause = function () {

	return this._queue.canSave();
};

// Runs a function in a zero second setTimeout
proto.async = function (callback) {

	var defer = new Deferred();

	if ((!callback) || (typeof (callback) !== 'function')) {
		errorHandler.log(moduleName, 'async', 'Provided callback "' + callback + '" is not a function');
	}

	if (errorHandler.exception) {
		return;
	}

	setTimeout(function() {

		callback();

		defer.resolve();

	}, 0);

	return defer.promise();
};

// Executes a callback synchronously
proto.sync = function (callback) {

	var defer = new Deferred();

	if ((!callback) || (typeof (callback) !== 'function')) {
		errorHandler.log(moduleName, 'sync', 'Provided callback "' + callback + '" is not a function');
	}

	if (errorHandler.exception) {
		return;
	}

	callback();

	defer.resolve();

	return defer.promise();
};

module.exports = Tracker;

},{"./Queue":82,"./error-handler/ErrorHandler":86,"./plugins/plugins":99,"./translator/translator":132,"ac-deferred":false}],84:[function(require,module,exports){
'use strict';

var proto;

var ac_Element    = require('ac-base').Element;
var errorHandler  = require('../error-handler/ErrorHandler');

var moduleName = 'TouchController';

/**
 * Tracks an actual click on a DOM element on touch devices.
 * @constructor TouchController
 * @param {object} element A DOM element
 * @requires module:ac-base/Element
 * @requires module:ErrorHandler
 */

function TouchController (element, eventCallback) {

	if (!ac_Element.isElement(element)) {
		errorHandler.log(moduleName, null, element + ' is not a valid DOM element');
	}

	if (typeof eventCallback !== 'function') {
		errorHandler.log(moduleName, null, eventCallback + ' is not a valid function');
	}

	if (errorHandler.exception) {
		return;
	}

	this.element = element;

	this.eventCallback = eventCallback;

	this.addEventListener();
}

proto = TouchController.prototype;

/**
 * @name TouchController#addEventListener
 *
 * @function
 *
 * @desc Adds a touchstart event listener to a DOM element.
 */
proto.addEventListener = function () {
	ac_Element.addEventListener(this.element, 'touchstart', this._onTouchStart.bind(this));
};

/**
 * @name TouchController#_onTouchStart
 *
 * @private
 *
 * @desc Listens to the touchstart event.
 */
proto._onTouchStart = function (e) {
	this.moved = false;

	this._boundOnTouchMove = this._onTouchMove.bind(this);
	this._boundOnTouchEnd = this._onTouchEnd.bind(this);

	ac_Element.addEventListener(this.element, 'touchmove', this._boundOnTouchMove);
	ac_Element.addEventListener(this.element, 'touchend', this._boundOnTouchEnd);
};

/**
 * @name TouchController#_onTouchMove
 *
 * @private
 *
 * @desc Listens to the touchmove event.
 */
proto._onTouchMove = function(e) {
	this.moved = true;
};

/**
 * @name TouchController#_onTouchEnd
 *
 * @private
 *
 * @desc Listens to the touchend event.
 */
proto._onTouchEnd = function(e) {
	ac_Element.removeEventListener(this.element, 'touchmove', this._boundOnTouchMove);
	ac_Element.removeEventListener(this.element, 'touchend', this._boundOnTouchEnd);

	if (!this.moved) {
		this.eventCallback(e);
	}
};

module.exports = TouchController;

},{"../error-handler/ErrorHandler":86,"ac-base":false}],85:[function(require,module,exports){
(function () {
	'use strict';

	// parse options from a data-attribute string
	// returns an object with options
	// assumes string is colon/comma separated
	// e.g. data-foo="color:blue,format:landscape"
	function dataStringToObject (data) {
		var options;
		var optionsObj = {};
		var splitOption;

		if (data && data.length > 0) {
			options = data.split(',');
			if (options && options.length > 0) {
				options.forEach(function (option) {
					splitOption = option.split(':');
					optionsObj[splitOption[0]] = splitOption[1];
				});
			}
		}

		return optionsObj;
	}

	module.exports = {
		dataStringToObject: dataStringToObject
	};
}());
},{}],86:[function(require,module,exports){
'use strict';

var proto;
var ac_console = require('ac-console');
var messagePrefix = 'Analytics';

function ErrorHandler () {
	this.exception = false;
	this.errors = [];
}

proto = ErrorHandler.prototype;

proto.log = function (moduleName, methodName, message) {
	var formattedMessage = this._formatMessage(moduleName, methodName, message);

	this.exception = true;

	this.errors.push({
		instance: moduleName,
		method: methodName,
		message: formattedMessage
	});

	ac_console.log(formattedMessage);

};

proto.report = function (index) {
	var out = '';
	if (typeof index === 'number' && this.errors[index]) {
		out = this.errors[index].message;
		ac_console.log(this.errors[index].message);
	} else {
		this.errors.forEach(function (err) {
			out += err.message + '\r\n';
		});
		ac_console.log(out);
	}

	return out;
};


proto._formatMessage = function (moduleName, methodName, message) {
	var thrower;
	var throwerString = '';
	var separator = ' : ';
	var throwerSep;

	if (!!moduleName || !!methodName) {
		throwerSep = (moduleName && methodName) ? '.' : '';
		throwerString = (moduleName || '') + throwerSep + (methodName || '') + separator;
	}

	return messagePrefix + separator + throwerString + message;
};

module.exports = new ErrorHandler();

},{"ac-console":1}],87:[function(require,module,exports){
(function () {
	'use strict';

	var ac_Array = require('ac-base').Array;
	var errorHandler = require('./error-handler/ErrorHandler');
	var head = document.getElementsByTagName('head')[0];
	var metaTags = ac_Array.toArray(head.getElementsByTagName('meta'));
	var metaPropertyPrefix = 'analytics';
	var prefixPattern = '^' + metaPropertyPrefix + '-';
	var patternRegex = new RegExp(prefixPattern);
	var metaObject;
	var initialTimeStamp = Date.now();
	var moduleName = 'metadata';

	// Gets the name of the product used in the track meta tag
	function _getProductName (metaObject) {

		var analyticsPageTitle = _strToArray(metaObject.track);

		if (!Array.isArray(analyticsPageTitle) || analyticsPageTitle.length === 0) {
			errorHandler.log(moduleName, '_getProductname', '"track" meta tag value is malformed. e.g. "product name - page name"');
		}

		if (errorHandler.exception) {
			return;
		}

		return analyticsPageTitle[0].trim();
	}

	// Gets the page name from track meta tag
	function _getPageName (metaObject) {

		if (!metaObject.track || metaObject.track === '') {
			errorHandler.log(moduleName, '_getPageName', '"track" meta tag value is malformed. e.g. "product name - page name"');
		}

		if (errorHandler.exception) {
			return;
		}

		return metaObject.track.toLowerCase();
	}

	// Gets the current locale
	function _getLocale () {

		var locale = document.documentElement.lang;

		if (!locale) {
			errorHandler.log(moduleName, '_getLocale', 'html lang attribute can not be empty');
		}

		if (errorHandler.exception) {
			return;
		}
		return locale;
	}


	// dump all meta tags into an object where the key/value pairs map to
	// the property/content attributes respectively.
	function _metaTagsToObject (tags) {
		tags = _filterMetaTags(tags);
		var metaObject = {};

		tags.forEach(function (tag) {
			var key = _transformPropertyName(tag.getAttribute('property'));
			var value = tag.getAttribute('content');
			metaObject[key] = value;
		});

		return metaObject;
	}

	// filters out all meta tags not prefixed with our defined prefix
	function _filterMetaTags (tags) {
		var filtered = tags.filter(function (tag) {
			var propName = tag.getAttribute('property');
			return patternRegex.test(propName);
		});

		return filtered;
	}


	// removes analytics property prefix and camelCases what remains
	function _transformPropertyName (name) {
		var transformed = name.replace(metaPropertyPrefix + '-', '');

		return transformed.replace(/-+(.)?/g, function (match, character) {
			return character ? character.toUpperCase() : '';
		});

	}

	// adds some normalized prperties to the meta object that we always
	// want to always provide
	function _augmentMetaObject (metaObject) {
		metaObject.pageName = metaObject.pageName || _getPageName(metaObject);
		metaObject.productName = metaObject.productName || _getProductName(metaObject);
		metaObject.locale = metaObject.locale || _getLocale();
		metaObject.initialTimeStamp = initialTimeStamp;

		return metaObject;
	}

	// converts a string to array based on a separator, defaults to '-'
	function _strToArray (str, separator) {
		separator = separator || '-';

		if (typeof str !== 'string') {
			errorHandler.log(moduleName, '_strToArray', str + ' is not a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		return str.split(separator);
	}

	metaObject = _metaTagsToObject(metaTags);

	module.exports = _augmentMetaObject(metaObject);

}());

},{"./error-handler/ErrorHandler":86,"ac-base":false}],88:[function(require,module,exports){
'use strict';

/** A module that exports a single instance of the Tracker with the default sCode plugin and also exports the Tracker constructor. Also exports the Tracker constructor.
 *  @module metricsTracker
 */
var Tracker = require('./Tracker');

module.exports = new Tracker ('sCode');
module.exports.Tracker = Tracker;

},{"./Tracker":83}],89:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var ac_Element      = require('ac-base').Element;
var ac_Event        = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	mediaEvents: ['play', 'pause', 'ended']
};

var moduleName = 'AudioAnalyticsObserver';

/**
 * Tracks HTML5 audio events and submits it to the Tracker.
 * @constructor AudioAnalyticsObserver
 * @param {object} audio A reference to the audio tag in the dom.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:ac-dom-events
 * @requires module:ac-base/Element
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function AudioAnalyticsObserver(audio, options) {

	if (!audio) {
		errorHandler.log(moduleName, null, audio + ' is not a valid audio object');
	}

	defaultOptions.mediaEventCallbacks = {
		'ended': this._onEnded.bind(this)
	};

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.mediaEvents)) {
		errorHandler.log(moduleName, null, this.options.mediaEvents + ' is not a valid media events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.audio = audio;
	this.tracker = metricsTracker;
	this.defaultTracking = this.track.bind(this);

	this.attachEvents();
}

proto = AudioAnalyticsObserver.prototype;

/**
 * @name AudioAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the audio element.
 */
proto.attachEvents = function () {
	var options = this.options;
	var customCallback;
	var mediaEventCallback;

	options.mediaEvents.forEach(function(mediaEvent) {
		customCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.addListener(mediaEvent, mediaEventCallback);
	}.bind(this));
};

/**
 * @name AudioAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the audio element.
 */
proto.detachEvents = function () {
	var options = this.options;
	var customCallback;
	var mediaEventCallback;

	options.mediaEvents.forEach(function(mediaEvent) {
		customCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.removeListener(mediaEvent, mediaEventCallback);
	}.bind(this));
};

/**
 * @name AudioAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the audio element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventName, callback) {
	ac_Element.addEventListener(this.audio, eventName, callback);
};

/**
 * @name AudioAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the audio element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventName, callback) {
	ac_Element.removeEventListener(this.audio, eventName, callback);
};

/**
 * @name AudioAnalyticsObserver#_onEnded
 *
 * @private
 *
 * @desc Adds an event handler to the 'ended' event of the audio element.
 */
proto._onEnded = function (e) {
	this.ended = true;
	this.track(e);
};

/**
 * @name AudioAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 * @param {object} e The event data object.
 */
proto.track = function(e) {

	var data = {};

	data.ended = this.ended;

	this.tracker.track({
		"type": "audio",
		"event": e,
		"data": data,
		"options": this.options
	});
};

module.exports = AudioAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-base":false,"ac-dom-events":3,"ac-object":29}],90:[function(require,module,exports){
'use strict';

var proto;

var ac_Element      = require('ac-base').Element;
var ac_Object       = require('ac-object');
var ac_Feature      = require('ac-feature');
var ac_Event        = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');
var TouchController = require('../controller/Touch');

var defaultOptions = {
	dataAttribute: 'analytics-click'
};

var moduleName = 'ClickAnalyticsObserver';

/**
 * Tracks click interaction with any DOM element that has the data-analytics-click attribute.
 * @constructor ClickAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-base/onDOMReady
 * @requires module:ac-base/Element
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function ClickAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;

	this.addListener();
}

proto = ClickAnalyticsObserver.prototype;

/**
 * @name ClickAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds a mouseup handler to the DOM Elements that have the data-analytics-click attribute.
 */
proto.addListener = function () {

	var elements = ac_Element.selectAll('*[data-' + this.options.dataAttribute + ']');

	elements.forEach(function (element) {

		if (!ac_Feature.touchAvailable()) {
			ac_Element.addEventListener(element, 'mouseup', this._onMouseUp.bind(this));
		} else {
			new TouchController(element, this._onTouchStart.bind(this));
		}
	}.bind(this));
};

/**
 * @name ClickAnalyticsObserver#_onTouchStart
 *
 * @private
 *
 * @desc Handles the touch start interaction.
 */
proto._onTouchStart = function (e) {
	var targetEl = ac_Event.target(e);
	this._track(e, targetEl);
};

/**
 * @name ClickAnalyticsObserver#_onMouseUp
 *
 * @private
 *
 * @desc Handles the mouse up interaction.
 */
proto._onMouseUp = function (e) {

	var targetEl = (e.currentTarget) ? e.currentTarget : e.srcElement;

	this._track(e, targetEl);
};

/**
 * @name ClickAnalyticsObserver#_track
 *
 * @private
 *
 * @desc Tracks a mouseup event.
 */
proto._track = function (e, targetEl) {

	var data = {};
	var target;

	if (!targetEl.getAttribute('data-' + this.options.dataAttribute)) {
		target = ac_Element.ancestor(targetEl, '[data-' + this.options.dataAttribute + ']');

		if (ac_Element.isElement(target)) {
			targetEl = target;
		}
	}

	if (!ac_Element.isElement(targetEl)) {
		errorHandler.log(moduleName, '_track', targetEl + ' is not a valid DOM element');
	}

	if (errorHandler.exception) {
		return;
	}

	data.targetEl = targetEl;

	this.tracker.track({
		"type": "click",
		"event": e,
		"data": data,
		"options": this.options
	});
};

module.exports = ClickAnalyticsObserver;

},{"../controller/Touch":84,"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-base":false,"ac-dom-events":3,"ac-feature":25,"ac-object":29}],91:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var errorHandler    = require('../error-handler/ErrorHandler');
var metricsTracker  = require('../metricsTracker');

var defaultOptions = {
	interactionEvents: [],
	interactionEventCallbacks: {}
};

var moduleName = 'EventAnalyticsObserver';

/**
 * Tracks any custom events passed to it in options object with the properties passed with options.data object.
 * @constructor EventAnalyticsObserver
 * @param {object} targetObj An object that is an EventEmitter or DOMEmitter.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 */
function EventAnalyticsObserver(targetObj, options) {

	if (!targetObj || typeof targetObj !== 'object' || typeof targetObj.on !== 'function' || typeof targetObj.off !== 'function') {
		errorHandler.log(moduleName, null, targetObj + ' does not appear to be a valid EventEmitter or DOMEmitter');
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.interactionEvents)) {
		errorHandler.log(moduleName, null, this.options.interactionEvents + ' is not an array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.tracker = metricsTracker;
	this.targetObj = targetObj;
	this._callbacks = {};

	this.attachEvents();
}

proto = EventAnalyticsObserver.prototype;

/**
 * @name EventAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the target object. One callback is allowed per event.
 */
proto.attachEvents = function () {
	var options = this.options;
	var interactionEventCallback;
	var instanceCallbackName;

	options.interactionEvents.forEach(function(interactionEvent) {
		// use provided callback for event or default to this.track
		interactionEventCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof interactionEventCallback === 'function') ? interactionEventCallback : this.track.bind(this);

		// store callback for access later
		this._callbacks[interactionEvent] = interactionEventCallback;

		// attach
		this.addListener(interactionEvent, interactionEventCallback);
	}, this);
};

/**
 * @name EventAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the target object.
 */
proto.detachEvents = function () {
	var options = this.options;
	var instanceCallbackName;

	// loop through stashed callbacks and remove the listeners
	Object.keys(this._callbacks).forEach(function(callbackName) {
		this.removeListener(callbackName, this._callbacks[callbackName]);
	}, this);
};

/**
 * @name EventAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the target object.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventType, callback) {
	this.targetObj.on(eventType, callback);
};

/**
 * @name EventAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the target object.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventType, callback) {
	this.targetObj.off(eventType, callback);
};

/**
 * @name EventAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 */
proto.track = function(data) {

	this.tracker.track({
		"type": "event",
		"data": data,
		"options": this.options
	});
};

module.exports = EventAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-object":29}],92:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var ac_Element      = require('ac-base').Element;
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	async: false
};

/**
 * Tracks the exit of a user from a page.
 * @constructor ExitAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:ac-base/Element
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function ExitAnalyticsObserver(options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.addExitListener();
}

proto = ExitAnalyticsObserver.prototype;

/**
 * @name ExitAnalyticsObserver#addExitListener
 *
 * @function
 *
 * @desc Add an event listener to the window onbeforeunload event if it is available.
 */
proto.addExitListener = function () {

	if ('onbeforeunload' in window) {
		ac_Element.addEventListener(window, 'beforeunload', this._onBeforeUnload.bind(this));
	}
};

/**
 * @name ExitAnalyticsObserver#_onBeforeUnload
 *
 * @private
 *
 * @desc Submits a page analytics request when user is exiting the page.
 */
proto._onBeforeUnload = function(e) {

	var data = {};

	data.exitTimeStamp = e.timeStamp;

	this.tracker.track({
		"type": "exit",
		"event": e,
		"data": data,
		"options": this.options
	});
};

module.exports = ExitAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-base":false,"ac-object":29}],93:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var ac_Event        = require('ac-dom-events');
var ac_Element      = require('ac-base').Element;
var metricsTracker  = require('../metricsTracker');
var metadata        = require('../metadata');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	trackAutoRotate: false
};

var moduleName = 'GalleryAnalyticsObserver';

/**
 * Tracks user interaction with ac-gallery.
 * @constructor GalleryAnalyticsObserver
 * @param {object} gallery An instance of ac-gallery.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:ac-dom-events
 * @requires module:ac-base/Element
 * @requires module:metricsTracker
 * @requires module:metadata
 * @requires module:ErrorHandler
 */
function GalleryAnalyticsObserver(gallery, options) {

	if (!gallery || typeof gallery !== 'object') {
		errorHandler.log(moduleName, null, gallery + ' is not an object');
	}

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.gallery = gallery;
	this.tracker = metricsTracker;
	this.galleryTriggerCount = 0;
	this.outgoingSlideInteractionType = 'auto';
	this.incomingSlideTimestamp = metadata.initialTimeStamp;

	this.addListener();
}

proto = GalleryAnalyticsObserver.prototype;

/**
 * @name GalleryAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event listener to the ac-gallery 'didShow' event.
 */
proto.addListener = function() {
	this.gallery.on('willShow',  this._onWillShow, this);
	this.gallery.on('didShow',  this._track, this);
};

/**
 * @name GalleryAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes the event listener to the ac-gallery 'didShow' event.
 */
proto.removeListener = function() {
	this.gallery.off('willShow',  this._onWillShow);
	this.gallery.off('didShow', this._track);
};

/**
 * @name GalleryAnalyticsObserver#_onWillShow
 *
 * @function
 *
 * @desc Tracks event data on ac-gallery 'willShow' event before it gets through any timeouts.
 */
proto._onWillShow = function(d) {

	var interactionEvent;
	this.interactionEvent = null;

	// If interaction event is available then clone the required properties
	if (d.interactionEvent) {
		// Keyboard: interactionEvent and originalEvent both have the event data
		// Touch: originalEvent has the actual event data
		interactionEvent = d.interactionEvent.originalEvent || d.interactionEvent;

		if (interactionEvent) {
			// IE bug when sending Event info in a setTimeOut event reference is lost (member not found)
			this.interactionEvent = {
				type: interactionEvent.type,
				target: interactionEvent.target,
				srcElement: interactionEvent.srcElement
			};
		}
	}
};

/**
 * @name GalleryAnalyticsObserver#_track
 *
 * @private
 *
 * @desc Submits a tracking request to the Tracker on gallery 'didShow' event.
 */
proto._track = function(d) {

	// Don't track an auto rotation that is not triggered by the user
	// On auto interaction ac-gallery can pass no interactionEvent or an instance of gallery
	if (this.options.trackAutoRotate === false) {
		if (!d.interactionEvent || d.interactionEvent.gallery && d.interactionEvent.gallery === this.gallery) {
			return false;
		}
	}

	var data = ac_Object.clone(d);

	data.interactionEvent = this.interactionEvent;

	if (!this.options.galleryName) {
		if (this.gallery.options.engagementElement && this.gallery.options.engagementElement.id) {
			this.options.galleryName = this.gallery.options.engagementElement.id;
		}
	}

	this.outgoingSlideTimestamp = this.incomingSlideTimestamp;
	this.incomingSlideTimestamp = Date.now();

	data.incomingSlideTimestamp = this.incomingSlideTimestamp;
	data.outgoingSlideTimestamp = this.outgoingSlideTimestamp;

	this.tracker.track({
		"type": "gallery",
		"data": data,
		"observer": this,
		"options": this.options
	});
};

module.exports = GalleryAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metadata":87,"../metricsTracker":88,"ac-base":false,"ac-dom-events":3,"ac-object":29}],94:[function(require,module,exports){
'use strict';

var ac_Element      = require('ac-base').Element;
var ac_Object       = require('ac-object');
var ac_Event        = require('ac-dom-events');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var proto;

var defaultOptions = {
	dataAttribute: 'analytics-click',
	silent: true
};

/**
 * Tracks link clicks that bubble up to the document.body and submits tracking requests. If a link needs not to be tracked propogation must be stopped on it.
 * @constructor LinkAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-base/onDOMReady
 * @requires module:ac-base/Element
 * @requires module:ac-dom-events
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function LinkAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;

	this.defaultTracking = this._track.bind(this);

	this.addListener();
}

proto = LinkAnalyticsObserver.prototype;

/**
 * @name LinkAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds a mouseup handler to document.body for anchor tags.
 */
proto.addListener = function () {
	ac_Element.addEventListener(document.body, 'mouseup', this.defaultTracking);
};

/**
 * @name LinkAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes the mouseup handler from document.body for anchor tags.
 */
proto.removeListener = function () {
	ac_Element.removeEventListener(document.body, 'mouseup', this.defaultTracking);
};

/**
 * @name LinkAnalyticsObserver#_track
 *
 * @private
 *
 * @desc Tracks a mouseup event.
 */
proto._track = function (e) {

	var data = {};

	var targetEl;

	var linkAncestor;

	var element = ac_Event.target(e);

	if (element.nodeName.toLowerCase() === 'a' && !element.getAttribute('data-' + this.options.dataAttribute)) {
		targetEl = element;
	}

	if (!targetEl) {

		linkAncestor = ac_Element.ancestor(element, 'a');

		if (linkAncestor && !linkAncestor.getAttribute('data-' + this.options.dataAttribute)) {
			targetEl = linkAncestor;
		}
	}

	if (targetEl) {

		data.targetEl = targetEl;

		this.tracker.track({
			"type": "link",
			"event": e,
			"data": data,
			"options": this.options
		});
	}
};

module.exports = LinkAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-base":false,"ac-dom-events":3,"ac-object":29}],95:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');

var defaultOptions = {
	interactionEvents: ['open', 'close', 'reopen']
};

var moduleName = 'OverlayAnalyticsObserver';

/**
 * Tracks interaction events with an overlay and submits it to the Tracker.
 * @constructor OverlayAnalyticsObserver
 * @param {object} overlay An instance of the overlay.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function OverlayAnalyticsObserver(overlay, options) {

	if (!overlay || typeof overlay !== 'object'  || typeof overlay.on !== 'function' || typeof overlay.off !== 'function') {
		errorHandler.log(moduleName, null, overlay + ' is not an object');
	}

	defaultOptions.interactionEventCallbacks = {
		'open': this._onOpen.bind(this),
		'close': this._onClose.bind(this),
		'reopen': this._onReopen.bind(this)
	};

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.interactionEvents)) {
		errorHandler.log(moduleName, null, this.options.interactionEvents + ' is not a valid interaction events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.overlay = overlay;
	this.tracker = metricsTracker;
	this.active = false;
	this.defaultTracking = this.track.bind(this);
	
	this.attachEvents();
}

proto = OverlayAnalyticsObserver.prototype;

/**
 * @name OverlayAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the overlay element.
 */
proto.attachEvents = function() {
	var options = this.options;
	var customCallback;
	var interactionEventCallback;

	options.interactionEvents.forEach(function(interactionEvent) {
		customCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.addListener(interactionEvent, interactionEventCallback);
	}.bind(this));
};

/**
 * @name OverlayAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the overlay element.
 */
proto.detachEvents = function() {
	var options = this.options;
	var customCallback;
	var interactionEventCallback;

	options.interactionEvents.forEach(function(interactionEvent) {
		customCallback = options.interactionEventCallbacks[interactionEvent];
		interactionEventCallback = (typeof customCallback === 'function') ? customCallback : this.defaultTracking;
		this.removeListener(interactionEvent, interactionEventCallback);
	}.bind(this));
};

/**
 * @name OverlayAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the overlay element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventName, callback) {
	this.overlay.on(eventName, callback);
};

/**
 * @name OverlayAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the overlay element.
 * @param {string} eventName An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventName, callback) {
	this.overlay.off(eventName, callback);
};

/**
 * @name OverlayAnalyticsObserver#_onOpen
 *
 * @private
 *
 * @desc Adds an event handler to the 'open' event of the overlay element.
 */
proto._onOpen = function (e) {
	this.active = true;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#_onReopen
 *
 * @private
 *
 * @desc Adds an event handler to the 'reopen' event of the overlay element.
 */
proto._onReopen = function (e) {
	this.active = true;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#_onClose
 *
 * @private
 *
 * @desc Adds an event handler to the 'close' event of the overlay element.
 */
proto._onClose = function (e) {
	this.active = false;
	this.track(e);
};

/**
 * @name OverlayAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits an overlay interaction event tracking request to the Tracker.
 * @param {object} e The event data object.
 */
proto.track = function(e) {
	var data = this.options.data || {};

	data.active = this.active;

	this.tracker.track({
		"type": "overlay",
		"event": e,
		"data": data,
		"options": this.options
	});
};

module.exports = OverlayAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-object":29}],96:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var metricsTracker  = require('../metricsTracker');
var errorHandler    = require('../error-handler/ErrorHandler');
var defaultOptions  = {};

/**
 * Tracks a single page load request and submits it to the Tracker.
 * @constructor PageAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-base/onDOMReady
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */
function PageAnalyticsObserver(options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.data = this.options.data || {};

	this._track();
}

proto = PageAnalyticsObserver.prototype;

/**
 * @name PageAnalyticsObserver#_track
 *
 * @private
 *
 * @desc Submits a page analytics request.
 */
proto._track = function(e) {

	var data = this.options.data || {};

	this.tracker.track({
		"type": "page",
		"event": e,
		"data": data,
		"options": this.options
	});

};

module.exports = PageAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-object":29}],97:[function(require,module,exports){
'use strict';

var proto;

var ac_Object         = require('ac-object');
var ac_Element        = require('ac-base').Element;
var ElementEngagement = require('ac-element-engagement').ElementEngagement;
var metricsTracker    = require('../metricsTracker');
var errorHandler      = require('../error-handler/ErrorHandler');
var dataAttr          = require('../data-attr/helper');

var defaultOptions = {
	dataAttribute: 'analytics-section-engagement'
};

var trackedElementDefaults = {
	stopOnEngaged: false,
	timeToEngage: 1000
};

/**
 * Tracks section engagement for all elements with a dataAttribute passed in via options (defaults to data-analytics-section-engagement).
 * @constructor SectionAnalyticsObserver
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-base/onDOMReady
 * @requires module:ac-base/Element
 * @requires module:ac-element-engagement/ElementEngagement
 * @requires module:ac-object
 * @requires module:metricsTracker
 * @requires module:ErrorHandler
 */

function SectionAnalyticsObserver (options) {

	if (errorHandler.exception) {
		return;
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});
	this.tracker = metricsTracker;
	this.elementEngagement = new ElementEngagement();

	this._loadSections();
}

proto = SectionAnalyticsObserver.prototype;

/**
 * @name SectionAnalyticsObserver#_onDOMReady
 *
 * @private
 *
 * @desc Selects all elements onDOMReady, instantiates ElementEngagement with those elements and binds events.
 */
proto._loadSections = function () {
	this.sections = ac_Element.selectAll('[data-' + this.options.dataAttribute + ']');

	this.sections.forEach(function (section) {
		var options;
		var dataString = section.getAttribute('data-' + this.options.dataAttribute);

		// apply any options from the data attribute
		options = dataAttr.dataStringToObject(dataString);
		options = this._castDataAttributeOptions(options);

		// apply data attribute options using ttackedElementDefaults as the base
		options = ac_Object.defaults(trackedElementDefaults, options);

		this.elementEngagement.addElement(section, options);
	}, this);

	if (this.sections && this.sections.length > 0) {
		this._setPosition();
		this.options.elements = this.sections;
		this._bindEvents();
		this.elementEngagement.start();
	}
};

/**
 * @name SectionAnalyticsObserver#_setPosition
 *
 * @private
 *
 * @desc Add a section number for each section on the page.
 */
proto._setPosition = function () {
	var i;
	var totalSections = this.sections.length;

	for (i = 0; i < totalSections; i += 1) {
		// Start with 1
		this.sections[i].position = i + 1;
	}
};

/**
 * @desc options from the data attribute arrive in the form of a string.
 *       We need to convert them to their appropriate types
 * @private
 */
proto._castDataAttributeOptions = function (options) {
	var inViewThreshold;
	var timeToEngage;
	var trackOnce;
	options = ac_Object.clone(options);


	Object.keys(options).forEach(function (key) {
		var value = options[key];
		var castValue;

		// if boolean
		if (value === 'false') {
			castValue = false;
		} else if (value === 'true') {
			castValue = true;

		// numbers
		} else if (!isNaN(parseFloat(value))) {
			castValue = parseFloat(value);

		// else, it's just a string
		} else {
			castValue = value;
		}

		options[key] = castValue;
	});

	return options;
};

/**
 * @name SectionAnalyticsObserver#_bindEvents
 *
 * @private
 *
 * @desc Bind event callbacks for section engagement events.
 */
proto._bindEvents = function () {
	this.elementEngagement.on('thresholdexit', this._onThresholdExit, this);
	this.elementEngagement.windowDelegate.on('scroll', this._onScroll, this);
};

/**
 * @name SectionAnalyticsObserver#_onThresholdExit
 *
 * @private
 *
  * @desc ‘thresholdexit‘ event callback.
 */
proto._onThresholdExit = function (trackedElement) {
	if (trackedElement.engaged) {
		var data = {
			element: trackedElement
		};
		this.elementEngagement.stop(trackedElement);
		this._track(data);
	}
};

proto._onScroll = function () {
	var windowDelegate = this.elementEngagement.windowDelegate;
	if (windowDelegate.scrollY >= windowDelegate.maxScrollY) {
		this._pageEnd();
	}
};

/**
 * Since we can't scroll any farther:
 * When we hit the bottom of the page we need to track any sections that are engaged
 * and we need to listen for engaged on inView sections that are not yet engaged
 */
proto._pageEnd = function () {
	var len = this.elementEngagement.elements.length;
	var sectionsInView = [];

	this.elementEngagement.elements.forEach(function (element) {
		if (element.inView && element.inThreshold && element.tracking) {
			sectionsInView.push(element);
		}
	});

	sectionsInView.forEach(function (section) {
		if (section.engaged) {
			this._forceTracking(section);
		} else {
			if (section.has('engaged') === false) {
				section.once('engaged', this._forceTracking, this);
			}
		}
	}, this);
};

proto._forceTracking = function (trackedElement) {
	// we need to enter a valid value for thresholdExitTime
	trackedElement.thresholdExitTime = Date.now();
	this.elementEngagement.stop(trackedElement);
	this._track({ element: trackedElement });
};

/**
 * @name SectionAnalyticsObserver#_track
 *
 * @private
 *
 * @desc Submits a section engaged analytics request to the Tracker.
 */
proto._track = function (data) {
	this.tracker.track({
		type: 'section',
		data: data,
		options: this.options
	});
};

module.exports = SectionAnalyticsObserver;

},{"../data-attr/helper":85,"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-base":false,"ac-element-engagement":23,"ac-object":29}],98:[function(require,module,exports){
'use strict';

var proto;

var ac_Object       = require('ac-object');
var errorHandler    = require('../error-handler/ErrorHandler');
var metricsTracker  = require('../metricsTracker');

/**
 * mediaEventCallbacks object should follow this format
 *
 * mediaEventCallbacks = {
 *   play: myPlaCallback.bind(someContext, 'play'),
 *   ended: myEndedCallback.bind(someContext, 'ended')
 * };
 */
var defaultOptions = {
	mediaEvents: [],
	mediaEventCallbacks: {},
	mediaEventPrefix: 'acv-'
};


var moduleName = 'VideoAnalyticsObserver';

/**
 * Tracks HTML5 video events and submits it to the Tracker.
 * @constructor VideoAnalyticsObserver
 * @param {object} video An instance of ac-video.
 * @param {object} options An options object that hold custom options for the observer.
 * @requires module:ac-object
 * @requires module:metricsTracker
 */
function VideoAnalyticsObserver(video, options) {
	var prefix;

	if (!video || typeof video !== 'object') {
		errorHandler.log(moduleName, null, video + ' is not an object');
	}

	this.options = ac_Object.defaults(defaultOptions, options || {});

	if (!Array.isArray(this.options.mediaEvents)) {
		errorHandler.log(moduleName, null, this.options.mediaEvents + ' is not a valid media events array');
	}

	if (errorHandler.exception) {
		return;
	}

	this.tracker = metricsTracker;
	this.video = video;
	this.playCount = 0;
	this.captionsEnableCount = 0;
	this._callbacks = {};

	prefix = this.options.mediaEventPrefix;

	this._events = {
		play: prefix + 'play',
		ended: prefix + 'ended',
		timeupdate: prefix + 'timeupdate',
		scrubStart: prefix + 'scrub-start',
		scrubEnd: prefix + 'scrub-end',
		captionsEnabled: prefix + 'captions-enabled'
	};

	this.attachEvents();
}

proto = VideoAnalyticsObserver.prototype;

/**
 * @name VideoAnalyticsObserver#attachEvents
 *
 * @function
 *
 * @desc Attach multiple event handlers to the video element. One callback is allowed per event.
 */
proto.attachEvents = function () {
	var options = this.options;
	var mediaEventCallback;

	// Wire up user provided callbacks
	options.mediaEvents.forEach(function(mediaEvent) {
		// use provided callback for event or default to this.track
		mediaEventCallback = options.mediaEventCallbacks[mediaEvent];
		mediaEventCallback = (typeof mediaEventCallback === 'function') ? mediaEventCallback : this._defaultTracking.bind(this, mediaEvent);

		// store callback for access later
		this._callbacks[mediaEvent] = mediaEventCallback;

		// attach
		this.addListener(options.mediaEventPrefix + mediaEvent, this._callbacks[mediaEvent]);
	}.bind(this));

	// attach our private events
	this._bindPlay();
	this.video.on(this._events.ended, this._onEnded, this);
	this.video.on(this._events.captionsEnabled, this._onCaptionsEnabled, this);
	this.video.on(this._events.timeupdate, this._onTimeupdate, this);
};

/**
 * @name VideoAnalyticsObserver#detachEvents
 *
 * @function
 *
 * @desc Detach multiple event handlers from the video element.
 */
proto.detachEvents = function () {
	var options = this.options;

	options.mediaEvents.forEach(function(mediaEvent) {
		this.removeListener(options.mediaEventPrefix + mediaEvent, this._callbacks[mediaEvent]);
	}.bind(this));
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onPlay
 *
 * @private
 *
 * @desc Adds an event handler to the 'play' event of the video element.
 */
proto._onPlay = function (e) {
	var data = this._bundleTrackingData('play', e);
	data.playCount = this.playCount;
	this.track(data);
	this.playCount += 1;
	this._playBound = false;
};

proto._onTimeupdate = function (e) {
	if (e.currentTime === 0) {
		// don't bind on first play since the timeupdate event fires before the play event
		if (this.playCount > 0) {
			this._bindPlay();
		}
	}
};

proto._bindPlay = function () {
	if (!this._playBound) {
		this.video.once(this._events.play, this._onPlay, this);
		this._playBound = true;
	}
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onCaptionsEnabled
 *
 * @private
 *
 * @desc Adds an event handler to the 'captions-enabled' event of ac-video.
 */
proto._onCaptionsEnabled = function (e) {
	var data = this._bundleTrackingData('captions-enabled', e);
	data.captionsEnableCount = this.captionsEnableCount;
	this.track(data);
	this.captionsEnableCount += 1;
};

/**
 * @private
 * @name VideoAnalyticsObserver#_onEnded
 *
 * @private
 *
 * @desc Adds an event handler to the 'ended' event of the video element.
 */
proto._onEnded = function (e) {
	var data = this._bundleTrackingData('ended', e);
	this.ended = true;
	this.track(data);
	// we don't always get a timeupdate back to 0 on ended.
	// so make sure we reattach the play listener
	this._bindPlay();
};

/**
 * @name VideoAnalyticsObserver#addListener
 *
 * @function
 *
 * @desc Adds an event handler to the video element.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.addListener = function(eventType, callback) {
	this.video.on(eventType, callback);
};

/**
 * @name VideoAnalyticsObserver#removeListener
 *
 * @function
 *
 * @desc Removes an event handler from the video element.
 * @param {string} eventType An event name.
 * @param {function} callback A callback function to call at the time of event.
 */
proto.removeListener = function(eventType, callback) {
	this.video.off(eventType, callback);
};

/**
 * @private
 * @name VideoAnalyticsObserver#_setCommonVideoData
 *
 * @private
 *
 * @desc Sets the common properties for each tracking request.
 */
proto._getCommonVideoData = function () {
	var data = {};
	data.targetEl = this.video.element;
	data.videoId = this.video.targetId;
	data.ended = this.ended;

	return data;
};

/**
 * @private
 * @name VideoAnalyticsObserver#_bundleTrackingData
 *
 * @private
 *
 * @desc Gets the currentTime property from an event object.
 */
proto._bundleTrackingData = function (eventType, e) {
	var commonTrackingData = this._getCommonVideoData();
	commonTrackingData.eventType = eventType;
	return ac_Object.extend(ac_Object.clone(e), commonTrackingData);
};

/**
 * @private
 * @name VideoAnalyticsObserver#_defaultTracking
 *
 * @private
 *
 * @desc Default tracking for media events.
 */
proto._defaultTracking = function (eventType, e) {
	var data = this._bundleTrackingData(eventType, e);
	this.track(data);
};

/**
 * @name VideoAnalyticsObserver#track
 *
 * @function
 *
 * @desc Submits a tracking request to the Tracker.
 */
proto.track = function(data) {
	this.tracker.track({
		type: "video",
		data: data,
		options: this.options
	});
};

module.exports = VideoAnalyticsObserver;

},{"../error-handler/ErrorHandler":86,"../metricsTracker":88,"ac-object":29}],99:[function(require,module,exports){
'use strict';

module.exports = {
	sCode: require('./s-code/sCode')
};

},{"./s-code/sCode":104}],100:[function(require,module,exports){
(function() {

	'use strict';

	var ac_Element = require('ac-base').Element;

	function isIntraPageLink (element) {
		var internalLink = true;
		if (ac_Element.isElement(element) && element.href) {
			var href = element.getAttribute('href');
			if (href.charAt(0) !== '#' && href.indexOf('javascript:') === -1) {
				internalLink = false;
			}
		}
		return internalLink;
	}

	module.exports = {
		isIntraPageLink: isIntraPageLink
	};

}());
},{"ac-base":false}],101:[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	var moduleName = 'sCodePluginFormatter';

	// collection of helper methods that deal with formatting strings specifically for s-code requests

	function productName (value) {
		return lowerCaseString(value);
	}

	function channel (value, locale) {
		var prefix = 'www.';
		var customCountryCodeFormat = {
			"fr-ca": "ca.fr"
		};

		prefix += customCountryCodeFormat[locale] ? customCountryCodeFormat[locale] : legacyCountryCode(locale);

		return prefix + '.' + value;
	}

	function pageName (originalPageName, locale) {
		var suffix = '';
		// certain country codes are expressed differently in s-code
		var customCountryCodes = {
			"fr-ca": "ca-fr"
		};
		var customCode = customCountryCodes[locale];

		originalPageName = originalPageName || '';

		if (typeof locale === 'string') {
			locale = locale.toLowerCase();
			suffix = customCode ? customCountryCodes[locale] : legacyCountryCode(locale);
			suffix = _decorateCountryCode(suffix);
		}

		return lowerCaseString(originalPageName) + suffix;
	}


	// takes a prefix and a suffix to return a string used to represent specific events
	// that took place on the page: eg 's@v'
	// This string is typically used at the front of the s_code request strings.
	function eventString (prefix, suffix) {
		prefix = prefix || '';
		suffix = suffix || '';

		return !!prefix ? (prefix + '@' + suffix) : suffix;
	}


	// returns a value suitable for replacing the COUNTRY_CODE_FILTER template variable
	// This is used to identify internal vs outgoing links
	function countryCodeFilter (locale) {
		var translated;
		var customCountryFilter = {
			"fr-ca": "ca/fr",
			"en-419": "lae",
			"en-ap": "asia"
		};

		var reversedLocales = [
			'fr-be',
			'nl-be',
			'fr-ch',
			'de-ch'
		];

		if (customCountryFilter[locale]) {
			translated = customCountryFilter[locale];

		} else if (reversedLocales.indexOf(locale) >= 0) {
			translated = locale.split('-').reverse().join('-');

		} else {
			translated = _getCountryCodeFromLocale(locale);
		}

		return translated;
	}

	// returns the country code format for certain locales used in some of the
	// older metrics implemenation on apple.com
	function legacyCountryCode (locale) {
		var legacy;
		var customCountryCode = {
			"fr-be":  "bf",
			"nl-be":  "bl",
			"fr-ch":  "cr",
			"de-ch":  "ce",
			"en-419": "la",
			"en-gb":  "uk"
		};

		if (customCountryCode[locale]) {
			legacy = customCountryCode[locale];
		} else {
			legacy = _getCountryCodeFromLocale(locale);
		}

		return legacy;
	}

	// Cleans the property values in the properties object from any special characters.
	function cleanProps (properties) {

		var cleanProperties = {};

		if (typeof (properties) === 'object') {

			for (var key in properties) {
				cleanProperties[key] = _sanitize(properties[key]);
			}
		}

		return cleanProperties;
	}

	// Replaces all occurances of a target from a given string.
	function stringReplacer (str, target, replaceWith) {

		var transformedStr = str;

		target = (typeof target === 'string') ? target : '';

		replaceWith = (typeof replaceWith === 'string') ? replaceWith : '';

		if (typeof transformedStr === 'string') {
			transformedStr = transformedStr.replace(new RegExp(target, 'g'), replaceWith);
		}

		return transformedStr;
	}

	/**
	 * PRIVATE FUNCTIONS
	 */

	// returns the lower-cased country abbreviation from a properly formatted locale abbreviation.
	// e.g. en-US => us
	// this appears to only be used for the sole purpose of supporting the legacy country code formats
	function _getCountryCodeFromLocale (locale) {

		if (!locale) {
			errorHandler.log(moduleName, '_getCountryCodeFromLocale', 'locale should be a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		var temp = locale.split('-');
		var country;

		if (temp.length > 1) {
			country = lowerCaseString(temp[1]);
		}

		return country;
	}


	// returns a value appropriate for using in an s_code request string
	function _decorateCountryCode (countryCode) {
		
		if (!countryCode) {
			errorHandler.log(moduleName, '_decorateCountryCode', 'countryCode should be a valid string');
		}

		if (errorHandler.exception) {
			return;
		}

		return ' (' + lowerCaseString(countryCode) + ')';
	}

	// Cleans a string from special characters.

	var whitelist = /[\ì\î\ë\í]/g;

	function _sanitize (value) {

		if (typeof value === 'string') {
			value = value.replace(whitelist, '');
		}

		return value;
	}

	function lowerCaseString(str) {
		if (typeof str === 'string') {
			str = str.toLowerCase();
		}

		return str;
	}

	module.exports = {
		productName: productName,
		channel: channel,
		pageName: pageName,
		eventString: eventString,
		countryCodeFilter: countryCodeFilter,
		legacyCountryCode: legacyCountryCode,
		cleanProps: cleanProps,
		stringReplacer: stringReplacer,
		lowerCaseString: lowerCaseString
	};

}());

},{"../../../error-handler/ErrorHandler":86}],102:[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	var topLevelMetadata = require('./../../../metadata');
	var sProps = {
		channel: 'sChannel',
		campaign: 'sCampaign',
		bucket: 'sBucket',
		bucketProduct: 'sBucketProduct'
	};

	var moduleName = 'sCodePluginMetadataHelper';
	
	function channel () {
		var value = topLevelMetadata[sProps.channel];

		if (!value) {
			errorHandler.log(moduleName, 'channel', 'analytics-s-channel metadata tag must exist');
		}

		if (errorHandler.exception) {
			return;
		}

		value = value.toLowerCase().split(' ').join('.');

		return value;
	}

	function bucket (bucketIndex) {
		var bucketProp = sProps.bucket + bucketIndex;

		if (!topLevelMetadata[bucketProp]) {
			errorHandler.log(moduleName, 'bucket', 'analytics-s-bucket-' + bucketIndex + ' metadata tag must exist');
		}

		if (errorHandler.exception) {
			return;
		}
		
		return topLevelMetadata[bucketProp];
	}

	// Gets the product string for bucket data. The bucket product for bucket 0,1,2 is optional. 
	// If we find it we append it to the bucket.
	function bucketProduct (bucketIndex) {
		var bucketProductProp = sProps.bucketProduct + bucketIndex;
		var bucketProd = topLevelMetadata[bucketProductProp];

		return bucketProd;
	}

	function campaign () {
		return topLevelMetadata[sProps.campaign] || '';
	}

	function platform () {
		var value = 'other';
		var userAgent = navigator.userAgent;
		var patterns = {
			'mobile other': '/(kindle|silk-accelerated|android|webos|rim tablet os|windows phone)/i',
			'windows': /windows/i,
			'iphone/ipod touch': /(iphone|ipod)/i,
			'ipad': /(ipad)/i,
			'Mac': /Mac OS X/i
		};

		for (var key in patterns) {
			if (userAgent.match(patterns[key])) {
				value = key;
				break;
			}
		}

		return value;
	}

	module.exports = {
		channel: channel,
		bucket: bucket,
		bucketProduct: bucketProduct,
		platform: platform,
		campaign: campaign
	};
}());

},{"../../../error-handler/ErrorHandler":86,"./../../../metadata":87}],103:[function(require,module,exports){
(function () {

	'use strict';
	
	var formatter = require('./formatter');

	function set (metadata, originalMetaData) {
		return [
				{ name: "{PAGE_NAME}", value: metadata.pageName},
				{ name: "{PAGE_NAME_NO_LOCALE}", value: originalMetaData.pageName},
				{ name: "{CHANNEL}", value: metadata.channel},
				{ name: "{CAMPAIGN}", value: metadata.campaign},
				{ name: "{COUNTRY_CODE}", value: metadata.legacyCountryCode},
				{ name: "{COUNTRY_CODE_FILTER}", value: metadata.countryCodeFilter},
				{ name: "{PRODUCT_NAME}", value: metadata.productName},
				{ name: "{PLATFORM}", value: metadata.platform}
		];
	}

	function translate (str, templateVarArr) {

		if (typeof str === 'string') {
			templateVarArr.forEach(function(templateVar) {
				if (str.indexOf(templateVar.name) > -1) {
					str = formatter.stringReplacer(str, templateVar.name, templateVar.value);
				}
			});
		}

		return str;
	}

	module.exports = {
		set: set,
		translate: translate
	};
}());
},{"./formatter":101}],104:[function(require,module,exports){
'use strict';

var proto;

var errorHandler        = require('../../error-handler/ErrorHandler');
var ac_Object           = require('ac-object');
var ac_sCode            = require('ac-s-code');
var topLevelMetadata    = require('../../metadata');
var formatter           = require('./helpers/formatter');
var metadataHelper      = require('./helpers/metadata');
var translator          = require('./translator/translator');
var submitMethods       = require('./submit-methods/submitMethods');
var templateVarHelper   = require('./helpers/templateVar');

var countryBucket = [
    'us',
    'au|ca|cn|de|es|fr|it|jp|uk',
    'ap|at|bf|bl|br|ce|cr|dk|fi|hk|ie|in|kr|la|mx|nl|no|nz|pl|pt|ru|se|sg|th|tw|za'
];

var moduleName = 'SCodePlugin';

function SCodePlugin () {
    if (errorHandler.exception) {
        return;
    }

    this.setPageMetadata(topLevelMetadata);
    this.setFormattedValues();
    this.setTemplateVars();
    this.initializeSCode();
}

proto = SCodePlugin.prototype;

proto.initializeSCode = function () {
    var options = {
        bucket: this.getBucket(),
        channel: this.formattedValues.channel,
        pageName: this.formattedValues.pageName,
        linkInternalFilters: this.getLinkInternalFilters()
    };

    ac_sCode.init(options);
};

proto.setPageMetadata = function (topLevelMetadata) {
    this.pageMetadata = ac_Object.clone(topLevelMetadata);
    this.pageMetadata.platform = metadataHelper.platform();
    this.pageMetadata.channel = metadataHelper.channel();
    this.pageMetadata.campaign = metadataHelper.campaign();

    // Lowercase the original metadata as well
    this.pageMetadata.pageName = formatter.lowerCaseString(this.pageMetadata.pageName);
    this.pageMetadata.locale = formatter.lowerCaseString(this.pageMetadata.locale);
};

proto.setFormattedValues = function () {
    this.formattedValues = {
        pageName: formatter.pageName(this.pageMetadata.pageName, this.pageMetadata.locale),
        channel: formatter.channel(this.pageMetadata.channel, this.pageMetadata.locale),
        productName: formatter.productName(this.pageMetadata.productName),
        countryCodeFilter: formatter.countryCodeFilter(this.pageMetadata.locale),
        legacyCountryCode: formatter.legacyCountryCode(this.pageMetadata.locale),
        campaign: this.pageMetadata.campaign,
        platform: this.pageMetadata.platform
    };
};

proto.setTemplateVars = function () {
    this.templateVarArr = templateVarHelper.set(this.formattedValues, this.pageMetadata);
};

// Resets global s_code properties
proto.clearProps = function () {
    var sCode = ac_sCode.getInstance();
    if (typeof sCode === 'object') {
        sCode.prop4 = sCode.g_prop4 =  sCode.prop6 =  sCode.g_prop6 = sCode.pageURL = sCode.g_pageURL = sCode.g_channel = '';
    }
};


// Translates the properties into s_code specific format.
proto.translate = function (request) {
    if (!request || typeof request !== 'object') {
        errorHandler.log(moduleName, 'translate', 'Request param (' + request + ') is not an object');
    }

    if (errorHandler.exception) {
        return;
    }

    // set properties as translated request
    request = translator.translate(request, this.formattedValues, this.pageMetadata);

    return request;
};

// Determines the type of analytics request and fires the appropriate s call.
proto.submit = function (translatedRequest) {

    var options;
    var sCode = ac_sCode.getInstance();

    if (!translatedRequest || typeof translatedRequest !== 'object') {
        errorHandler.log(moduleName, 'submit', 'Request param (' + translatedRequest + ') is not an object');
    }

    if (errorHandler.exception) {
        return;
    }

    if (!translatedRequest.type || typeof translatedRequest.type !== 'string') {
        errorHandler.log(moduleName, 'submit', 'property "type" (' + translatedRequest.type + '") must be a string');
    }

    if (!window.s || typeof window.s !== 'object') {
        errorHandler.log(moduleName, 'submit', 'sCode (' + window.s + ') is not an object');
    }

    if (errorHandler.exception) {
        return;
    }

    options = translatedRequest.options || {};

    // Loop through and assign the properties to s_code before the final call
    this._setSCodeProps(translatedRequest);

    if (options.silent !== true) {
        if (translatedRequest.submitMethod && submitMethods[translatedRequest.submitMethod]) {
            submitMethods[translatedRequest.submitMethod](translatedRequest, this.formattedValues, sCode);
        }
    }
};

// set the s.linkInternalFilters property to let s-code differentiate between internal and external links
proto.getLinkInternalFilters = function () {
    var value;

    if (this.formattedValues.countryCodeFilter !== 'us') {
        value = this.formattedValues.countryCodeFilter;
    }

    return value;
};

// set properties on the global `s` object prior to submitting tracking requests
proto._setSCodeProps = function (request) {
    var properties = request.properties || {};
    var sCode = ac_sCode.getInstance();

    // Reset link tracking events for each request
    sCode.linkTrackEvents = '';

    request.data.linkTrackVars = request.data.linkTrackVars || [];

    for (var key in properties) {
        if (key === 'events') {
            sCode.linkTrackEvents = properties[key];
        }

        if (key !== 'title') {
            request.data.linkTrackVars.push(key);
            sCode[key] = properties[key];
        }
    }
};

proto.getBucket = function () {

    var countryBucketSize = countryBucket.length;

    // Default index to bucket 2
    var index = 2;

    // Determine which tier the country falls under
    for (var i=0; i < countryBucketSize; i++) {
        if (countryBucket[i].indexOf(this.formattedValues.legacyCountryCode) !== -1) {
            index = i;
            break;
        }
    }

    // Get the bucket string from the meta tag for the current tier
    var bucketMetaTagValue = metadataHelper.bucket(index);

    var bucket = this._replaceTemplateVars(bucketMetaTagValue);

    // Get the bucket product string from the meta tag for the current tier
    var bucketProduct = this._replaceTemplateVars(metadataHelper.bucketProduct(index));

    return bucket + (!!bucketProduct ? (',' + bucketProduct) : '');
};

// Replaces template
proto._replaceTemplateVars = function (str) {
    return templateVarHelper.translate(str, this.templateVarArr);
};

module.exports = SCodePlugin;

},{"../../error-handler/ErrorHandler":86,"../../metadata":87,"./helpers/formatter":101,"./helpers/metadata":102,"./helpers/templateVar":103,"./submit-methods/submitMethods":106,"./translator/translator":119,"ac-object":29,"ac-s-code":54}],105:[function(require,module,exports){
(function () {

	'use strict';

	function submit (request, metadata, sCode) {

		var url = window.location.href;
		var title = request.properties.title || '';
		var src;
		var img1x1;

		if (typeof sCode === 'object') {
			src = _getBasePath(url) + ((metadata.countryCodeFilter !== 'us') ? metadata.countryCodeFilter : '') +
					 '/b/ss/' + sCode.un + '/'+ (sCode.mobile ? '5.1':'1') + '/' + sCode.version +
					 '/s0' + Date.now() + '?ndh=1&t=' + _getTimestamp() + '&fid=' + sCode.fid + '&g=' + url +
					 '&pageName=' + metadata.pageName + '&cc=' + sCode.currencyCode + '&c3=' + title + '&h1=' + sCode.channel +
					 '&pe=lnk_e&pev2=' + title + '&s=' + sCode.resolution + '&c=' + sCode.colorDepth +
					 '&j=' + sCode.javascriptVersion + '&v=' + sCode.javaEnabled + '&k=' + sCode.cookiesEnabled + '&bw=' + sCode.browserWidth +
					 '&bh=' + sCode.browserHeight + '&p=' + sCode.plugins + '&r=' + sCode.eVar49;

			img1x1 = document.createElement('img');
			img1x1.setAttribute('width', '1');
			img1x1.setAttribute('height', '1');
			img1x1.setAttribute('border', '0');
			img1x1.src = src;

			return img1x1;
		}
	}

	function _getBasePath (url) {
		var protocol;
		var host;

		url = url.split('/');
		protocol = url[0];
		host = url[2];
		
		return protocol + '//' + host + '/';
	}

	function _getTimestamp () {
		var now = new Date();
		return now.getDate() + '/' + now.getMonth() + '/' + now.getFullYear() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ' ' + now.getDay() + ' ' + now.getTimezoneOffset();
	}

	module.exports = submit;

}());

},{}],106:[function(require,module,exports){
var t = require('./t');
var tl = require('./tl');
var manual = require('./manual');

module.exports = {
	t: t,
	tl: tl,
	manual: manual
};

},{"./manual":105,"./t":107,"./tl":108}],107:[function(require,module,exports){
(function () {

	'use strict';

	function submit (request, metadata, sCode) {

		if (typeof sCode === 'object' && typeof sCode.t === 'function') {
			// Set the global properties for s_code page view tracking.
			sCode.pageName = metadata.pageName;
			sCode.channel = metadata.channel;

			sCode.t();
		}
	}
	
	module.exports = submit;
	
}());

},{}],108:[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../error-handler/ErrorHandler');
	
	var moduleName = 'sCodePluginSubmitMethodtl';

	var DOMHelper = require('../helpers/DOM');

	function submit (request, metadata, sCode) {
		var linkType;
		var targetEl;

		// don't even think about doing anything if sCode or the tl method don't exist.
		if (typeof sCode === 'object' && typeof sCode.tl === 'function') {

			if (typeof request.data !== 'object') {
				errorHandler.log(moduleName, 'submit', 'Request param data (' + request.data + ') is not an object');
			}

			if (typeof request.properties.title !== 'string') {
				errorHandler.log(moduleName, 'submit', 'Request param title (' + request.properties.title + ') is not a string');
			}

			if (errorHandler.exception) {
				return;
			}

			// Set default linkTrackVars for referrer and current location
			sCode.linkTrackVars = 'eVar54,eVar49';

			if (request.data.linkTrackVars && request.data.linkTrackVars.length > 0) {
				sCode.linkTrackVars += ',' + request.data.linkTrackVars.join(',');
			}

			// Default to custom link type if link type is not defined
			linkType = request.data.linkType || 'o';

			// s.tl method needs the first parameter to be either a valid DOM element or `true`
			targetEl = _targetEl(request.data.targetEl);

			// set s_code's internal timeout to 0 if not tracking a link
			sCode.forcedLinkTrackingTimeout = _forcedLinkTrackingTimeout(request);

			// Call s.tl for all other tracking calls
			sCode.tl(targetEl, linkType, request.properties.title);

			_clearTrackingData(sCode);
		}
	}

	/**
	 * Priavte Functions
	 */

	 // Clear the link tracking custom properties and events after each s.tl request
	 function _clearTrackingData (sCode) {
	 	sCode.linkTrackVars = '';
	 	sCode.linkTrackEvents = '';
	 }

	// set s_code's timeout 0 if not tracking a link
	function _forcedLinkTrackingTimeout (request) {
		var duration = 0;
		var element = request.data.targetEl;
		var href;

		if (request.type && request.type === 'link' || request.type === 'click') {
			if (_isOutgoingLink(element) === true) {
				duration = 500;
			}
		}

		return duration;
	}

	function _targetEl (element) {
		var result = _isOutgoingLink(element);
		return (result === true) ? element : true;
	}

	function _isOutgoingLink (element) {
		var isOutgoingLink = true;
		var isIntraPageLink = DOMHelper.isIntraPageLink(element);

		if (!element || isIntraPageLink === true) {
			isOutgoingLink = false;
		}

		return isOutgoingLink;
	}

	module.exports = submit;

}());

},{"../../../error-handler/ErrorHandler":86,"../helpers/DOM":100}],109:[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;
		
		var interactionTypePrefix = {
			"play": "s",
			"replay": "r",
			"ended": "e",
			"pause": "p"
		};

		var divider = ' - ';

		var properties = {};

		properties.prop13 = formatter.eventString('a', interactionTypePrefix[data.interactionType]) + divider + originalMetaData.pageName;

		properties.prop3 = properties.title = formatter.eventString('a', interactionTypePrefix[data.interactionType]) + divider + originalMetaData.pageName + divider + formatter.lowerCaseString(data.title);

		properties.prop4 = data.audioSrc;

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":101}],110:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Storage = require('ac-storage');
	var dataAttrHelper = require('../../../../data-attr/helper');
	var formatter = require('../../helpers/formatter');
	var DOMHelper = require('../../helpers/DOM');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var properties = {};

		var dataAttrValue = data.targetEl.getAttribute('data-' + request.options.dataAttribute);

		var customProperties = dataAttrHelper.dataStringToObject(dataAttrValue);

		var defaultText = originalMetaData.pageName + divider + (translatedRequest.data.linkImg || data.linkText.toLowerCase());

		var postfix;

		var isIntraPageLink = DOMHelper.isIntraPageLink(data.targetEl);

		if (customProperties.prop3) {
			customProperties.prop3 = formatter.lowerCaseString(customProperties.prop3);
		}

		if (customProperties.prefix) {
			defaultText = formatter.eventString(customProperties.prefix, originalMetaData.pageName + divider + (customProperties.prop3 || translatedRequest.data.linkImg || data.linkText.toLowerCase()));
		}

		// If it is an outgoing link then don't run it in async
		translatedRequest.options.async = (!isIntraPageLink) ? false : true;

		properties.prop3 = properties.title = (!customProperties.prefix && customProperties.prop3) ? originalMetaData.pageName + divider + customProperties.prop3 : defaultText;

		if (data.region) {
			ac_Storage.setItem('s_nav', data.region);
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../../../data-attr/helper":85,"../../helpers/DOM":100,"../../helpers/formatter":101,"ac-storage":69}],111:[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	var templateVarHelper = require('../../helpers/templateVar');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var templateVarArr = templateVarHelper.set(metadata, originalMetaData);

		var properties = {};

		for (var key in data) {
			properties[key] = data[key];
			
			if (typeof properties[key] === 'string') {
				properties[key] = templateVarHelper.translate(properties[key], templateVarArr);
			}
		}

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../helpers/formatter":101,"../../helpers/templateVar":103}],112:[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var properties = {};

		var timeSpentOnPage = ((data.exitTimeStamp - originalMetaData.initialTimeStamp) * 0.001).toFixed(2);

		properties.prop3 = timeSpentOnPage;

		properties.title = formatter.eventString(timeSpentOnPage, originalMetaData.pageName);

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'manual';

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../helpers/formatter":101}],113:[function(require,module,exports){
(function () {

	'use strict';

	var errorHandler = require('../../../../error-handler/ErrorHandler');
	var formatter = require('../../helpers/formatter');
	var moduleName = 'sCodePluginGalleryTranslator';

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var interactionTypeMap = {
			"click": "ci",
			"keydown": "ki",
			"swipe": "si",
			"dot": "bi",
			"thumb": "ci",
			"paddle": "pi",
			"auto": "ai"
		};

		var outgoingInteractionType;

		var incomingInteractionType;

		var properties = {};

		var propString = '';

		_clearConditionalsCodeProps(properties);

		if (data.incomingInteractionType) {

			if (interactionTypeMap[data.incomingInteractionType]) {
				incomingInteractionType = interactionTypeMap[data.incomingInteractionType];
			}
		}

		if (data.outgoingInteractionType) {

			if (interactionTypeMap[data.outgoingInteractionType]) {
				outgoingInteractionType = interactionTypeMap[data.outgoingInteractionType];
			}
		}

		if (!incomingInteractionType) {
			errorHandler.log(moduleName, 'translate', incomingInteractionType + '" is not a valid interaction type for the incoming slide');
		}

		if (!outgoingInteractionType) {
			errorHandler.log(moduleName, 'translate', outgoingInteractionType + '" is not a valid interaction type for the outgoing slide');
		}

		if (errorHandler.exception) {
			return;
		}

		propString = originalMetaData.pageName + divider + request.options.galleryName + divider;
		
		properties.prop2 = formatter.eventString(outgoingInteractionType, '') + propString + data.outgoing.id;

		properties.prop3 = properties.title = formatter.eventString(incomingInteractionType, '') + propString + data.incoming.id;

		if (data.galleryFirstTimeTrigger === true) {

			properties.prop16 = 'gallery interaction';

			properties.eVar16 = (request.options.galleryName ? request.options.galleryName + ' ' : '') + 'gallery interaction';

			properties.events = 'event1';
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	// If s. (props) were set in a condition in previous request
	// make sure they are cleared on the next request
	function _clearConditionalsCodeProps (properties) {
		properties.prop16 = properties.eVar16 = '';
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../../../error-handler/ErrorHandler":86,"../../helpers/formatter":101}],114:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Storage = require('ac-storage');
	var formatter = require('../../helpers/formatter');
	var DOMHelper = require('../../helpers/DOM');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var linkUrl = (data.targetEl.href) ? data.targetEl.getAttribute('href') : '';

		var identityStr = (linkUrl.indexOf('http://') > -1 || linkUrl.indexOf('https://') > -1) ? linkUrl.split('/')[2].split('.')[0] + ' link' : '';

		var defaultText = (data.region) ? formatter.eventString(data.region.charAt(0), data.linkImg || data.linkText.toLowerCase() || data.linkId) + divider + originalMetaData.pageName : originalMetaData.pageName + divider + data.linkText.toLowerCase();

		var isIntraPageLink = DOMHelper.isIntraPageLink(data.targetEl);
		
		var properties = {};

		properties.prop3 = properties.title = defaultText + ((identityStr !== '') ? divider + identityStr : '');

		// If it is an outgoing link then don't run it in async
		translatedRequest.options.async = (!isIntraPageLink) ? false : true;
		
		if (data.region) {
			ac_Storage.setItem('s_nav', data.region);
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/DOM":100,"../../helpers/formatter":101,"ac-storage":69}],115:[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');
	
	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var properties = {};

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":101}],116:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Storage = require('ac-storage');

	var formatter = require('../../helpers/formatter');

	var templateVarHelper = require('../../helpers/templateVar');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var templateVarArr = templateVarHelper.set(metadata, originalMetaData);

		var properties = {};

		var entryPoint = _getEntryPointStr();

		var navSource = ac_Storage.getItem('s_nav');

		for (var key in data) {
			properties[key] = data[key];
			
			if (typeof properties[key] === 'string') {
				properties[key] = templateVarHelper.translate(properties[key], templateVarArr);
			}
		}

		if (entryPoint) {
			properties.prop25 = entryPoint;
		}

		if (navSource) {
			ac_Storage.removeItem('s_nav');
			properties.prop25 = navSource;
		}

		if (!properties.prop25) {
			properties.prop25 = 'other nav or none';
		}
		
		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 't';

		return translatedRequest;
	}

	function _getEntryPointStr () {
		var referrer = document.referrer;
		var currentDomain = window.location.host;
		var entryPoint;

		if (!referrer) {
			entryPoint = 'direct entry';
		}

		if (referrer && referrer !== '' && referrer.split('?')[0].indexOf(currentDomain) === -1) {
			entryPoint = 'third party';
		}

		return entryPoint;
	}

	module.exports = {
		translate: translate
	};

}());
},{"../../helpers/formatter":101,"../../helpers/templateVar":103,"ac-storage":69}],117:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var trackedElement = translatedRequest.data.element;

		var divider = ' - ';

		var properties = {};

		var elementName = trackedElement.name || trackedElement.id || '';

		var timeInThreshold = trackedElement.thresholdExitTime - trackedElement.thresholdEnterTime;

		var sectionNumber = (trackedElement.element && trackedElement.element.position) ? ' .' + trackedElement.element.position : '';

		properties.prop34 = properties.title = originalMetaData.pageName + divider + elementName + divider + 'section engaged' + sectionNumber;

		properties.prop35 = (timeInThreshold / 1000).toFixed(2);

		translatedRequest.properties = properties;
		
		translatedRequest.submitMethod = 'tl';
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],118:[function(require,module,exports){
(function () {

	'use strict';

	var formatter = require('../../helpers/formatter');

	function translate (request, metadata, originalMetaData) {

		var translatedRequest = request;

		var data = translatedRequest.data;

		var divider = ' - ';

		var eventTypeMap = {
			"started": "s",
			"replay": "rp",
			"ended": "e",
			"reended": "re",
			"captions-enabled": "ce"
		};

		var eventType = (data.eventType && eventTypeMap[data.eventType]) ? eventTypeMap[data.eventType] : data.eventType;

		var properties = {};

		// If any event is not in our mapping then dont fire an s.tl for it
		// mainly because we want to track one video session per user
		if (!eventTypeMap[data.eventType]) {
			translatedRequest.options.silent = true;
		} else {
			translatedRequest.options.silent = false;
		}

		_clearConditionalsCodeProps(properties);

		properties.title = properties.prop13 = formatter.eventString('v', eventType) + ': ' + originalMetaData.pageName + divider + data.videoId;

		if (data.eventType === 'started') {
			properties.prop16 = properties.eVar16 = 'video plays';
			properties.events = 'event2';

		} else if (data.eventType === 'ended') {
			properties.prop16 = properties.eVar16 = 'video ends';
		}

		if (data.eventType === 'captions-enabled') {
			properties.title = properties.prop2 = originalMetaData.pageName + divider + data.videoId + divider + 'cc';
			properties.prop13 = ''; //We dont need this prop for captions-enabled event
		}

		if (data.videoType && data.playerType) {
			properties.prop18 = data.videoType + ' via ' + data.playerType;
		}

		translatedRequest.properties = properties;

		translatedRequest.submitMethod = 'tl';

		return translatedRequest;
	}

	// If s. (props) were set in a condition in previous request
	// make sure they are cleared on the next request
	function _clearConditionalsCodeProps (properties) {
		properties.prop16 = properties.eVar16 = properties.prop18 = properties.prop2 = '';
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../helpers/formatter":101}],119:[function(require,module,exports){
(function () {
	'use strict';

	var components = {
		audio: require('./component/audio'),
		gallery: require('./component/gallery'),
		link: require('./component/link'),
		click: require('./component/click'),
		overlay: require('./component/overlay'),
		page: require('./component/page'),
		section: require('./component/section'),
		video: require('./component/video'),
		exit: require('./component/exit'),
		event: require('./component/event')
	};

	function translate(request, metaData, originalMetaData) {
		var translatedRequest = request;

		if (request.type && components[request.type]) {
			translatedRequest = components[request.type].translate(request, metaData, originalMetaData);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate,
		components: components
	};
}());

},{"./component/audio":109,"./component/click":110,"./component/event":111,"./component/exit":112,"./component/gallery":113,"./component/link":114,"./component/overlay":115,"./component/page":116,"./component/section":117,"./component/video":118}],120:[function(require,module,exports){
'use strict';

var proto;
var dataAttribute = 'analytics-region';
var validJSONPattern = /(?:\w+:\w+)(?:,(?=(?:\w+:\w+))|$)/;
var singleValuePattern = /[\w\s]+/;
var dataAttrHelper = require('../data-attr/helper');

/**
 * Creates an object for a region element with details about its parent and child regions.
 * @constructor Region
 * @param {object} regionElement A DOM Element.
 */
function Region (regionElement) {
	this.element = regionElement;
	this.childRegions = {};
	this.parentRegion = '';
	this.options = this.getDataOptions();
	this.name = this.setName();
}

proto = Region.prototype;

/**
 * @name Region#setName
 *
 * @function
 *
 * @desc Sets the name for a region.
 */
proto.setName = function () {
	var value = '';

	// pull name from options
	if (this.options.name) {
		value = this.options.name;
	}

	// default to element's id value if not specified
	if (!this.options.name && this.element.id) {
		this.options.name = this.element.id;
	}

	return value;
};

/**
 * @name Region#getDataOptions
 *
 * @function
 *
 * @desc Gets options from the data attribute.
 */
proto.getDataOptions = function () {
	var data = {};
	var value = this.element.getAttribute('data-' + dataAttribute);

	// strip trailing commas
	value = value.charAt(value.length - 1) === ',' ? value.substr(0, value.length - 1) : value;

	if (this._isJSONable(value)) {
		data = dataAttrHelper.dataStringToObject(value);

	// if it's just a single value, set it to the name property
	} else if (this._isSingleValue(value)) {
		data.name = value;
	}

	// return empty object if none of the conditions are met.
	return data;
};

/**
 * @name Region#_isJSONable
 *
 * @private
 *
 * @desc Checks if a string passed can be JSONified.
 */
proto._isJSONable = function (value) {
	return validJSONPattern.test(value);
};

/**
 * @name Region#_isSingleValue
 *
 * @private
 *
 * @desc Checks if a string passed is a single value string.
 */
proto._isSingleValue = function (value) {
	return singleValuePattern.test(value);
};

module.exports = {
	Region: Region,
	dataAttribute: dataAttribute
};
},{"../data-attr/helper":85}],121:[function(require,module,exports){
(function () {

	'use strict';

	/**
	 * Provides different methods to get region information for an element in the DOM.
	 * @name regions
	 * @module
	 */

	var ac_Element = require('ac-base').Element;
	var Region = require('./Region').Region;
	var dataAttribute = require('./Region').dataAttribute;

	var allRegions = [];
	var tree = {};

	// Find all regions in the DOM, store in array and also
	// create a hierarchical tree object of the regions.
	function getAllRegions () {

		if (allRegions.length > 0 ) {
			return allRegions;
		}

		var allRegionsElements = ac_Element.selectAll('[data-' + dataAttribute + ']');
		var topLevelRegion;
		var regionsLen = allRegionsElements.length;
		var i = 0;

		// recursive function that maps nested regions to their parents
		// also creates Region objects of nested regions as it finds them.
		function _getChildRegions (regionObj) {
			var childRegion;
			while (ac_Element.isElement(allRegionsElements[i + 1]) && regionObj.element.contains(allRegionsElements[i + 1])) {
				childRegion = new Region(allRegionsElements[i + 1]);
				allRegions.push(childRegion);
				childRegion.parentRegion = regionObj.name;
				regionObj.childRegions[childRegion.name] = childRegion;
				i += 1;
				_getChildRegions(childRegion);
			}
		}

		// loop through the regions, store all regions in an array and an object
		for (i; i < regionsLen; i += 1) {
			topLevelRegion = new Region(allRegionsElements[i]);
			tree[topLevelRegion.name] = topLevelRegion;
			allRegions.push(topLevelRegion);
			_getChildRegions(topLevelRegion);
		}
		return allRegions;
	}

	// returns a hierarchical tree object of the regions
	function getTree () {

		getAllRegions();

		if (Object.keys(tree).length > 0) {
			return tree;
		}
	}

	// returns the parent region for an element
	function getRegionByElement (element) {
		var parsedRegions = getAllRegions();
		if (ac_Element.isElement(element)) {
			var allAncestorRegions = getRegionAncestryByElement(element);
			if (allAncestorRegions.length > 0) {
				return allAncestorRegions.pop();
			}
		}
	}

	// returns all parent regions of an element
	function getRegionAncestryByElement (element) {
		var parsedRegions = getAllRegions();
		if (ac_Element.isElement(element)) {
			return parsedRegions.filter(function(region) {
				return region.element.contains(element);
			});
		}
	}

	// returns a region by name
	function getRegionByName (name) {
		var parsedRegions = getAllRegions();
		if (typeof name === 'string') {
			return parsedRegions.filter(function(region) {
				return region.name === name;
			});
		}
	}

	// refreshes a region by the region element or object
	function refreshRegion (region) {
		var regionObj = region;
		if (ac_Element.isElement(region)) {
			regionObj = getRegionByElement(region);
		}

		if (typeof regionObj === 'object') {
			allRegions.forEach(function (r) {
				if (r.element === regionObj.element) {
					r.options = r.getDataOptions();
					r.name = r.setName();
				}
			});
		}
	}

	module.exports = {
		/** Returns a hierarchical tree object of all the parent level DOM elements with a data attribute of 'data-analytics-region'. */
		getTree: getTree,
		/** Returns an array of all the DOM elements with a data attribute of 'data-analytics-region'. */
		getAllRegions: getAllRegions,
		/** Returns a parent region object for a given DOM element.*/
		getRegionByElement: getRegionByElement,
		/** Returns a region object for a given region name string. */
		getRegionByName: getRegionByName,
		/** Returns an array of all the parent regions of a given DOM element. */
		getRegionAncestryByElement: getRegionAncestryByElement,
		/** Updates state of a region object to match its current state in the DOM. */
		refreshRegion: refreshRegion
	};
}());

},{"./Region":120,"ac-base":false}],122:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Element = require('ac-base').Element;

	var ac_Event = require('ac-dom-events');

	var interactionTypes = {
		play: function (request) {

			if (request.data.ended === true) {
				return 'replay';
			}

			return 'play';
		},

		ended: function (request) {

			return request.event.type;
		},

		pause: function (request) {

			return request.event.type;
		}
	};

	function translate (request) {

		var translatedRequest = request;

		var targetEl = ac_Event.target(request.event);

		translatedRequest.data.targetEl = targetEl;

		// Determine audio source
		if (targetEl && targetEl.getAttribute('src')) {
			translatedRequest.data.audioSrc = targetEl.getAttribute('src');
		}

		if (!translatedRequest.data.audioSrc) {

			var audioSourceTag = ac_Element.select('source', targetEl);

			if (audioSourceTag && audioSourceTag.getAttribute('src')) {
				translatedRequest.data.audioSrc = audioSourceTag.getAttribute('src');
			}
		}

		translatedRequest.data.interactionType = (interactionTypes[request.event.type]) ? interactionTypes[request.event.type](request) : request.event.type;

		translatedRequest.data.title = translatedRequest.data.targetEl.title || 'No title found';

		translatedRequest.data.duration = translatedRequest.data.targetEl.duration;

		translatedRequest.data.currentTime = translatedRequest.data.targetEl.currentTime;

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"ac-base":false,"ac-dom-events":3}],123:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Element = require('ac-base').Element;

	var regions = require('../../regions/regions');

	function translate (request) {

		var translatedRequest = request;

		var linkImg = ac_Element.select('img', request.data.targetEl);

		var linkImgSrc;

		var targetElParentRegion = regions.getRegionByElement(request.data.targetEl);
		
		if (linkImg) {
			linkImgSrc = linkImg.getAttribute('src');
			translatedRequest.data.linkImg = linkImgSrc.substring(linkImgSrc.lastIndexOf('/') + 1, linkImgSrc.length);

			if (typeof translatedRequest.data.linkImg === 'string') {
				translatedRequest.data.linkImg = translatedRequest.data.linkImg.toLowerCase();
			}
		}

		translatedRequest.data.linkText = (typeof request.data.targetEl.innerText === 'string') ? request.data.targetEl.innerText.trim() : request.data.targetEl.textContent.trim();

		if (typeof targetElParentRegion === 'object') {
			translatedRequest.data.region = targetElParentRegion.name;
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../regions/regions":121,"ac-base":false}],124:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{}],125:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());
},{}],126:[function(require,module,exports){
(function () {
	'use strict';

	var ac_Element = require('ac-base').Element;

	// methods to map interaction types
	var interactionTypes = {

		click: function (request) {
			var type = 'click';
			// if the click happened on a dot/paddle/thumb nav, we want to know
			var navType = _triggerNavType(request);

			return navType || type;
		},

		auto: function (request) {
			var type = 'auto';

			return type;
		},

		keydown: function (request) {
			var type = 'keydown';

			return type;
		},

		touchend: function (request) {
			var type = 'swipe';

			return type;
		},

		touchstart: function (request) {
			var type = 'swipe';

			return type;
		},

		touchmove: function (request) {
			var type = 'swipe';

			return type;
		}

	};

	/**
	 * Exported translate function
	 */
	function translate (request) {
		var interactionEventType = _interactionEventType(request);
		var interactionType = interactionEventType;
		var observer = request.observer;
		var translatedRequest = request;

		if (interactionTypes[interactionEventType]) {
			interactionType = interactionTypes[interactionEventType](request);
		}

		// add props to the request
		translatedRequest.data.targetEl = _getTargetElement(request);
		translatedRequest.data.slideInViewTime = _slideInViewTime(request);
		translatedRequest.data.outgoingInteractionType = request.observer.outgoingSlideInteractionType;
		translatedRequest.data.incomingInteractionType = interactionType;
		translatedRequest.data.galleryFirstTimeTrigger = _isFirstTimeGalleryTrigger(translatedRequest);

		// update the props on the observer
		observer.outgoingSlideInteractionType = interactionType;

		return translatedRequest;
	}


	/**
	 * Private Functions
	 */

	// attempts to determine what type of gallery nav was interacted with
	function _triggerNavType (request) {
		var type = false;
		var trigger = _getTargetElement(request);
		var nav;

		if (trigger) {
			nav = ac_Element.ancestor(trigger, 'nav');
			type = nav ? _getNavTypeFromClassName(nav.className) : type;
		}

		return type;
	}

	// determines if a classname has a specific word.
	// If so, it returns that word, else false.
	function _getNavTypeFromClassName (className) {
		var type = false;

		['paddle', 'dot', 'thumb'].some(function (typeName) {
			if (className.indexOf(typeName) >= 0) {
				type = typeName;
				return true;
			}
		});

		return type;
	}

	// return the target element from the interactionEvent in the request, if there is one.
	// else returns false.
	function _getTargetElement (request) {
		var interactionEvent = request.data.interactionEvent;
		var element = false;

		if (interactionEvent) {
			element = (interactionEvent.target || interactionEvent.srcElement);
		}

		return element;
	}

	// how long was the outgoing slide in view for?
	function _slideInViewTime (request) {
		return request.data.incomingSlideTimestamp - request.data.outgoingSlideTimestamp;
	}

	// We want to know if user has interacted with the gallery
	function _isFirstTimeGalleryTrigger (request) {
		var incomingInteractionType = request.data.incomingInteractionType;
		var observer = request.observer;
		var firstTimeGalleryTrigger = false;

		if (incomingInteractionType !== 'auto') {
			observer.galleryTriggerCount += 1;
		}

		if (observer.galleryTriggerCount === 1) {
			firstTimeGalleryTrigger = true;
		}

		return firstTimeGalleryTrigger;
	}

	// determine event type. Default to 'auto'
	function _interactionEventType (request) {
		var data = request.data;
		var type = 'auto';
		
		if (data.interactionEvent && data.interactionEvent.type) {
			type = data.interactionEvent.type;
		} 

		return type;
	}
	
	module.exports = {
		translate: translate
	};

}());

},{"ac-base":false}],127:[function(require,module,exports){
(function () {

	'use strict';

	var ac_Element = require('ac-base').Element;

	var regions = require('../../regions/regions');

	function translate (request) {

		var translatedRequest = request;

		var linkImg = ac_Element.select('img', request.data.targetEl);

		var linkImgSrc;

		var targetElParentRegion = regions.getRegionByElement(request.data.targetEl);

		translatedRequest.data.linkText = (typeof request.data.targetEl.innerText === 'string') ? request.data.targetEl.innerText.trim() : request.data.targetEl.textContent.trim();

		if (request.data.targetEl.id) {
			translatedRequest.data.linkId = request.data.targetEl.id;
		}

		if (linkImg) {
			linkImgSrc = linkImg.getAttribute('src');
			translatedRequest.data.linkImg = linkImgSrc.substring(linkImgSrc.lastIndexOf('/') + 1, linkImgSrc.length);

			if (typeof translatedRequest.data.linkImg === 'string') {
				translatedRequest.data.linkImg = translatedRequest.data.linkImg.toLowerCase();
			}
		}

		if (typeof targetElParentRegion === 'object') {
			translatedRequest.data.region = targetElParentRegion.name;
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{"../../regions/regions":121,"ac-base":false}],128:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {
		
		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],129:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		var translatedRequest = request;
		
		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],130:[function(require,module,exports){
(function () {

	'use strict';

	function translate (request) {

		return request;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],131:[function(require,module,exports){
(function () {

	'use strict';

	var eventTypes = {

		play: function (request) {

			if (request.data.ended === true) {
				return 'replay';
			}

			return 'started';
		},

		ended: function (request) {

			if (request.data.ended === true) {
				return 'reended';
			}
			return 'ended';
		},

		'captions-enabled': function (request) {

			if (request.data.captionsEnableCount === 0) {
				return 'captions-enabled';
			}
			return 'captions-reenabled';
		}
	};

	var interactionTypes = {

		click: function (request) {
			return request.data.event.type;
		}
	};

	function translate (request) {

		var translatedRequest = request;

		translatedRequest.data.eventType = (eventTypes[request.data.eventType]) ? eventTypes[request.data.eventType](request) : request.data.eventType;

		if (request.data.event && interactionTypes[request.data.event.type]) {
			translatedRequest.data.interactionType = interactionTypes[request.data.event.type](request);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate
	};

}());

},{}],132:[function(require,module,exports){
(function () {
	'use strict';
	var errorHandler = require('../error-handler/ErrorHandler');

	var components = {
		audio: require('./component/audio'),
		gallery: require('./component/gallery'),
		link: require('./component/link'),
		click: require('./component/click'),
		overlay: require('./component/overlay'),
		page: require('./component/page'),
		section: require('./component/section'),
		video: require('./component/video'),
		exit: require('./component/exit'),
		event: require('./component/event')
	};

	function translate(request) {
		var translatedRequest = request;

		if (request.type && components[request.type]) {
			if (typeof request.data !== 'object') {
				errorHandler.log('Translator', 'translate', 'request.data (' + request.data + ') must be an object');
			}

			if (errorHandler.exception) {
				return;
			}
			
			translatedRequest = components[request.type].translate(request);
		}

		return translatedRequest;
	}

	module.exports = {
		translate: translate,
		components: components
	};
}());

},{"../error-handler/ErrorHandler":86,"./component/audio":122,"./component/click":123,"./component/event":124,"./component/exit":125,"./component/gallery":126,"./component/link":127,"./component/overlay":128,"./component/page":129,"./component/section":130,"./component/video":131}]},{},["++O3BW"])