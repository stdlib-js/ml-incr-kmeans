/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isObject = require( '@stdlib/assert-is-plain-object' );
var hasOwnProp = require( '@stdlib/assert-has-own-property' );
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var isArrayLike = require( '@stdlib/assert-is-array-like-object' );
var isPositiveInteger = require( '@stdlib/assert-is-positive-integer' ).isPrimitive;
var contains = require( '@stdlib/assert-contains' );
var format = require( '@stdlib/error-tools-fmtprodmsg' );
var METRICS = require( './metrics.json' );
var INIT_METHODS = require( './init_methods.json' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {string} [options.metric] - distance metric
* @param {ArrayLikeObject} [options.init] - method for determining initial centroids
* @param {boolean} [options.normalize] - boolean indicating whether to normalize incoming data
* @param {boolean} [options.copy] - boolean indicating whether to copy incoming data to prevent mutation during normalization
* @param {*} [options.seed] - PRNG seed
* @returns {(Error|null)} null or an error object
*
* @example
* var opts = {};
* var options = {
*     'metric': 'euclidean',
*     'init': [ 'kmeans++', 1, 1 ]
* };
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( '0LR2h', options ) );
	}
	if ( hasOwnProp( options, 'metric' ) ) {
		opts.metric = options.metric;
		if ( !contains( METRICS, opts.metric ) ) {
			return new TypeError( format( '0LR3t', 'metric', METRICS.join( '", "' ), opts.metric ) );
		}
	}
	if ( hasOwnProp( options, 'init' ) ) {
		if ( !isArrayLike( options.init ) ) {
			return new TypeError( format( '0LR4y', 'init', options.init ) );
		}
		if ( !contains( INIT_METHODS, options.init[ 0 ] ) ) {
			return new TypeError( format( '0LR5B', 'init', INIT_METHODS.join( '", "' ), options.init[ 0 ] ) );
		}
		opts.init[ 0 ] = options.init[ 0 ];
		if ( options.init.length > 1 ) {
			opts.init[ 1 ] = options.init[ 1 ];
			if ( !isPositiveInteger( opts.init[ 1 ] ) ) {
				return new TypeError( format( 'invalid option. First `%s` parameter option must be a positive integer. Option: `%s`.', 'init', opts.init[ 1 ] ) );
			}
		}
		if ( options.init.length > 2 ) {
			opts.init[ 2 ] = options.init[ 2 ];
			if ( !isPositiveInteger( opts.init[ 2 ] ) ) {
				return new TypeError( format( 'invalid option. Second `%s` parameter option must be a positive integer. Option: `%s`.', 'init', opts.init[ 2 ] ) );
			}
		}
	}
	if ( hasOwnProp( options, 'normalize' ) ) {
		opts.normalize = options.normalize;
		if ( !isBoolean( opts.normalize ) ) {
			return new TypeError( format( '0LR30', 'normalize', opts.normalize ) );
		}
	}
	if ( hasOwnProp( options, 'copy' ) ) {
		opts.copy = options.copy;
		if ( !isBoolean( opts.copy ) ) {
			return new TypeError( format( '0LR30', 'copy', opts.copy ) );
		}
	}
	if ( hasOwnProp( options, 'seed' ) ) {
		opts.seed = options.seed;
	}
	return null;
}


// EXPORTS //

module.exports = validate;