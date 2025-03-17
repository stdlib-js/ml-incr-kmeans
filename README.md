<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrkmeans

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Incrementally partition data into `k` [clusters][k-means-clustering].

<section class="intro">

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/ml-incr-kmeans
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var incrkmeans = require( '@stdlib/ml-incr-kmeans' );
```

#### incrkmeans( k\[, ndims]\[, options] )

Returns an accumulator `function` which incrementally partitions `k` [clusters][k-means-clustering].

```javascript
// Create an accumulator for partitioning 2-dimensional data into 5 clusters:
var accumulator = incrkmeans( 5, 2 );
```

To specify initial centroids, provide a 2-dimensional `k`-by-`ndims` [`ndarray`][@stdlib/ndarray/ctor] containing centroid locations.

<!-- eslint-disable array-element-newline -->

```javascript
var Float64Array = require( '@stdlib/array-float64' );
var ndarray = require( '@stdlib/ndarray-ctor' );

// Specify initial centroids:
var buffer = new Float64Array([
    0.0, 0.0,
    1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
    -1.0, 1.0
]);
var shape = [ 5, 2 ];
var strides = [ 2, 1 ];

var centroids = ndarray( 'float64', buffer, shape, strides, 0, 'row-major' );

// Create an accumulator for partitioning 2-dimensional data into 5 clusters:
var accumulator = incrkmeans( centroids );
```

The function accepts the following `options`:

-   **metric**: distance metric. Must be one of the following:

    -   `'euclidean'`: Euclidean distance (default).
    -   `'cosine'`: cosine distance.
    -   `'correlation`': correlation distance.

-   **init**: an `array` containing the centroid initialization method and associated (optional) parameters. The first array element specifies the initialization method and must be one of the following:

    -   `'kmeans++'`: k-means++ initialization (default).
    -   `'sample'`: randomly sample from a specified number of data points.
    -   `'forgy'`: randomly assign data points to one of `k` clusters and compute cluster centroids.

    The second array element specifies the number of data points to use when calculating initial centroids. When performing kmeans++ initialization, the third array element specifies the number of trials to perform when randomly selecting candidate centroids. Typically, more trials is correlated with initial centroids which lead to better clustering; however, a greater number of trials increases computational overhead. Default: `[ 'kmeans++', k, 2+⌊ln(k)⌋ ]`.

-   **normalize**: `boolean` indicating whether to normalize incoming data. This option is only relevant for non-Euclidean distance metrics. If set to `true`, an accumulator partitioning data based on cosine distance normalizes provided data to unit Euclidean length. If set to `true`, an accumulator partitioning data based on correlation distance first centers provided data and then normalizes data dimensions to have zero mean and unit variance. If this option is set to `false` and the metric is either cosine or correlation distance, then incoming data **must** already be normalized. Default: `true`.

-   **copy**: `boolean` indicating whether to copy incoming data to prevent **mutation** during normalization. Default: `true`.

-   **seed**: PRNG seed. Setting this option is useful when wanting reproducible centroid initialization.

#### accumulator( \[vector] )

If provided a data point vector, the accumulator function returns updated cluster results. If not provided a data point vector, the accumulator function returns the current cluster results.

```javascript
var Float64Array = require( '@stdlib/array-float64' );
var ndarray = require( '@stdlib/ndarray-ctor' );

// Create a data vector:
var buffer = new Float64Array( 2 );
var shape = [ 2 ];
var strides = [ 1 ];
var vec = ndarray( 'float64', buffer, shape, strides, 0, 'row-major' );

// Create an accumulator for partitioning 2-dimensional data into 5 clusters:
var accumulator = incrkmeans( 5, 2 );

// Provide data to the accumulator:
vec.set( 0, 2.0 );
vec.set( 1, 1.0 );

var out = accumulator( vec );
// e.g., returns {...}

vec.set( 0, 1.0 );
vec.set( 1, -5.0 );

out = accumulator( vec );
// e.g., returns {...}

vec.set( 0, 3.0 );
vec.set( 1, 3.14 );

out = accumulator( vec );
// e.g., returns {...}

out = accumulator();
// e.g., returns {...}
```

If not provided initial centroids, an accumulator caches data point vectors for subsequent centroid initialization. Until an accumulator computes initial centroids, an accumulator returns `null`. Once an accumulator has initial centroids (either provided or computed), an accumulator returns cluster results.

Cluster results are comprised of the following:

-   **centroids**: a `k`-by-`ndims` matrix containing centroid locations. Each centroid is the component-wise mean of the data points assigned to a centroid's corresponding cluster.
-   **stats**: a `k`-by-`4` matrix containing cluster statistics.

Cluster statistics consists of the following columns:

-   `0`: number of data points assigned to a cluster.
-   `1`: total within-cluster sum of squared distances.
-   `2`: arithmetic mean of squared distances.
-   `3`: corrected sample standard deviation of squared distances.

#### accumulator.predict( \[out,] X )

Predicts centroid assignment for each data point in a provided matrix `X`.

```javascript
var Float64Array = require( '@stdlib/array-float64' );
var ndarray = require( '@stdlib/ndarray-ctor' );

// Create a data vector:
var buffer = new Float64Array( 2 );
var shape = [ 2 ];
var strides = [ 1 ];
var vec = ndarray( 'float64', buffer, shape, strides, 0, 'row-major' );

// Create an accumulator for partitioning 2-dimensional into 2 clusters:
var accumulator = incrkmeans( 2, 2, {
    'init': [ 'sample', 2 ]
});

// Provide data to the accumulator:
vec.set( 0, 2.0 );
vec.set( 1, 1.0 );
accumulator( vec );

vec.set( 0, 1.0 );
vec.set( 1, -5.0 );
accumulator( vec );

vec.set( 0, 3.0 );
vec.set( 1, 3.14 );
accumulator( vec );

// Create a matrix containing the data points for which we want to predict cluster assignment:
buffer = new Float64Array( 4 );
shape = [ 2, 2 ];
strides = [ 2, 1 ];
var mat = ndarray( 'float64', buffer, shape, strides, 0, 'row-major' );

mat.set( 0, 0, 0.0 );
mat.set( 0, 1, 0.0 );

mat.set( 1, 0, 0.5 );
mat.set( 1, 1, -0.5 );

var out = accumulator.predict( mat );
// returns <ndarray>
```

To specify an output vector, provide a 1-dimensional [`ndarray`][@stdlib/ndarray/ctor] as the first argument. Each element in the returned vector corresponds to a predicted cluster index for a respective data point.

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Because an accumulator incrementally partitions data, one should **not** expect cluster statistics to match similar statistics had provided data been analyzed via a batch algorithm. In an incremental context, data points which would not be considered part of a particular cluster when analyzed via a batch algorithm may contribute to that cluster's statistics when analyzed incrementally. In general, the more data provided to an accumulator, the more reliable the cluster statistics.
-   Forgy's method for centroid initialization is generally discouraged, as the method generates initial clusters without internal homogeneity and no theoretical basis. The method's inclusion is due to its historical usage.

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint-disable array-element-newline -->

<!-- eslint no-undef: "error" -->

```javascript
var discreteUniform = require( '@stdlib/random-base-discrete-uniform' );
var normal = require( '@stdlib/random-base-normal' ).factory;
var ndarray = require( '@stdlib/ndarray-ctor' );
var Float64Array = require( '@stdlib/array-float64' );
var Int8Array = require( '@stdlib/array-int8' );
var incrkmeans = require( '@stdlib/ml-incr-kmeans' );

// Define the number of data points to simulate:
var N = 1e4;

// Define the number of clusters:
var k = 5;

// Define cluster properties:
var clusters = new Float64Array([
    0.0, 1.0, 0.0, 1.0, // meanX, stdevX, meanY, stdevY
    -5.0, 1.0, 5.0, 1.0,
    5.0, 1.0, 5.0, 1.0,
    5.0, 1.0, -5.0, 1.0,
    -5.0, 1.0, -5.0, 1.0
]);
clusters = ndarray( 'float64', clusters, [ k, 4 ], [ 4, 1 ], 0, 'row-major' );

// Define accumulator options:
var opts = {
    'metric': 'euclidean',
    'init': [ 'kmeans++', 100 ]
};

// Initialize a 2-dimensional k-means accumulator:
var acc = incrkmeans( k, 2, opts );

// Create PRNGs for generating pseudorandom numbers drawn from 2-d uncorrelated normal distributions...
var randn = ndarray( 'generic', new Array( k*2 ), [ k, 2 ], [ 2, 1 ], 0, 'row-major' );
var i;
for ( i = 0; i < k; i++ ) {
    randn.set( i, 0, normal( clusters.get( i, 0 ), clusters.get( i, 1 ) ) );
    randn.set( i, 1, normal( clusters.get( i, 2 ), clusters.get( i, 3 ) ) );
}

// Create a vector for storing simulated data:
var v = ndarray( 'float64', new Float64Array( 2 ), [ 2 ], [ 1 ], 0, 'row-major' );

// Wrap the vector in a matrix for generating cluster predictions:
var m = ndarray( 'float64', v.data, [ 1, 2 ], [ 2, 1 ], 0, 'row-major' );

// Create a vector for storing cluster predictions:
var p = ndarray( 'int8', new Int8Array( 1 ), [ 1 ], [ 1 ], 0, 'row-major' );

// Simulate data points and incrementally perform k-means clustering...
var totals = [ 0, 0, 0, 0, 0 ];
var X = [];
var Y = [];
for ( i = 0; i < k; i++ ) {
    X.push( [] );
    Y.push( [] );
}

var results;
var x;
var y;
var c;
var r;
for ( i = 0; i < N; i++ ) {
    // Pick a random cluster from which to sample:
    c = discreteUniform( 0, k-1 );
    totals[ c ] += 1;

    // Generate a random cluster data point:
    x = randn.get( c, 0 )();
    v.set( 0, x );
    X[ c ].push( x );

    y = randn.get( c, 1 )();
    v.set( 1, y );
    Y[ c ].push( y );

    // Generate a cluster prediction:
    r = acc.predict( p, m );
    if ( r ) {
        console.log( 'Data point: (%d, %d). Prediction: %d.', x.toFixed( 3 ), y.toFixed( 3 ), r.get( 0 )+1 );
    }
    // Update the accumulator:
    results = acc( v );
}

// Print cluster results:
results = acc();
if ( results ) {
    console.log( '' );
    for ( i = 0; i < k; i++ ) {
        console.log( 'Cluster %d', i+1 );
        console.log( '  centroid: (%d, %d)', results.centroids.get( i, 0 ), results.centroids.get( i, 1 ) );
        console.log( '  size: %d', results.stats.get( i, 0 ) );
    }
    console.log( '' );
}

console.log( '' );
console.log( 'True cluster distribution: %s', totals.join( ', ' ) );
console.log( '' );
```

</section>

<!-- /.examples -->

<section class="references">

## References

-   Forgy, E. 1965. "Cluster Analysis of Multivariate Data: Efficiency versus Interpretability of Classification." _Biometrics_ 21 (3): 768–69.
-   MacQueen, J. 1967. "Some methods for classification and analysis of multivariate observations." In _Proceedings of the Fifth Berkeley Symposium on Mathematical Statistics and Probability, Volume 1: Statistics_, 281–97. Berkeley, California, USA: University of California Press. <https://projecteuclid.org/euclid.bsmsp/1200512992>.
-   Lloyd, S. 1982. "Least Squares Quantization in PCM." _IEEE Transactions on Information Theory_ 28 (2). Piscataway, NJ, USA: IEEE Press: 129–37. doi:[10.1109/TIT.1982.1056489][@lloyd:1982a].
-   Arthur, David, and Sergei Vassilvitskii. 2007. "K-means++: The Advantages of Careful Seeding." In _Proceedings of the Eighteenth Annual Acm-Siam Symposium on Discrete Algorithms_, 1027–35. SODA '07. Philadelphia, PA, USA: Society for Industrial and Applied Mathematics. <http://dl.acm.org/citation.cfm?id=1283383.1283494>.

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2025. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ml-incr-kmeans.svg
[npm-url]: https://npmjs.org/package/@stdlib/ml-incr-kmeans

[test-image]: https://github.com/stdlib-js/ml-incr-kmeans/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/ml-incr-kmeans/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ml-incr-kmeans/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ml-incr-kmeans?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ml-incr-kmeans.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ml-incr-kmeans/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ml-incr-kmeans/tree/deno
[deno-readme]: https://github.com/stdlib-js/ml-incr-kmeans/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ml-incr-kmeans/tree/umd
[umd-readme]: https://github.com/stdlib-js/ml-incr-kmeans/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ml-incr-kmeans/tree/esm
[esm-readme]: https://github.com/stdlib-js/ml-incr-kmeans/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ml-incr-kmeans/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ml-incr-kmeans/main/LICENSE

[k-means-clustering]: https://en.wikipedia.org/wiki/K-means_clustering

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor

[@lloyd:1982a]: https://doi.org/10.1109/TIT.1982.1056489

</section>

<!-- /.links -->
