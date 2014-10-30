/* ---------------------------------------------------------------------------

	Toolkit
	=======

	A handful of helper mixins for common patterns.

--------------------------------------------------------------------------- */


/* ---------------------------------------------------------------------------

	Toolkit: Rem
	============

	.rem() takes a @property, and @list of values (in px or unitless) and
	converts to rem.

	e.g.,
	.selector {
		.rem( margin, 20 auto eggs 666% );
		.rem( font-size, 12 );
	}

	Makes life a little easier when working from designs specced in pixels.

--------------------------------------------------------------------------- */

.rem( @property, @list, @base: 16 ) {
	@n: length(@list);

	// Only convert numbers that are not percentages or 0;
	._merge( @px ) when ( isnumber(@px) ) and not ( ispercentage(@px) ) and not ( @px = 0 ) {
		@rem: ( @px / @base );
		@{property}+_: unit(@rem, rem);
	}
	._merge( @px ) when ( default() ) {
		@{property}+_: @px;
	}

	._loop( @n ) when ( @n > 0 ) {
		._loop((@n - 1));

		@val: extract(@list, @n);
		._merge( @val ); // merges values onto @property with space character.
	}

	._loop( @n );
}



/* ---------------------------------------------------------------------------

	Toolkit: Media Queries
	======================


	These mq abstractions don't overlap:

	from( n ) { ... }
		Styles elements from (and inclusive) of n.
		Useful for adding complexity as viewport size increases.

	to( n ) { ... }
		Styles elements up to but not including n.
		Effectively, max-width n-1
		Useful for the occasional small screen only style.

	n must be unitless CSS pixels; e.g., 768 or 1024
	It gets converted to em.

--------------------------------------------------------------------------- */

// Inclusive of the value and above.
.from( @unitlessPx, @rules, @base: 16 ) {
	@ems: ( @unitlessPx / @base );
	@media screen and (min-width: ~"@{ems}em") {
		@rules();
	}
}

// Up to but not inclusive (1px less) the value:
.to( @unitlessPx, @rules ) {
	@ems: ( ( @unitlessPx - 1 ) / @base );
	@media screen and ( max-width: ~"@{ems}em" ) {
		@rules();
	}
}

.from-to( @from, @to, @rules ) {
	@fromEms: ( @from / @base );
	@toEms: ( ( @to - 1 ) / @base );
	@media screen and (min-width: ~"@{fromEms}em") and (max-width: ~"@{toEms}em") {
		@rules();
	}
}



/* ---------------------------------------------------------------------------

	Toolkit: Clear
	==============

	Clears without margin containment.
	http://www.cssmojo.com/latest_new_clearfix_so_far/

--------------------------------------------------------------------------- */

.clear() {
	&:after {
		content: "";
		display: table;
		clear: both;
	}
}



/* ---------------------------------------------------------------------------

	Toolkit: Contain Margins
	========================

--------------------------------------------------------------------------- */

.contain-margins() {
	&:before,
	&:after {
		content: "";
		display: table;
	}
}



/* ---------------------------------------------------------------------------

	Toolkit: Font Smoothing
	=======================

	Added 09.09.2014
	Read: http://maximilianhoffmann.com/posts/better-font-rendering-on-osx

--------------------------------------------------------------------------- */

.font-smoothing( @value ) when ( @value = on ) {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

.font-smoothing( @value ) when ( @value = off ) {
	-webkit-font-smoothing: subpixel-antialiased;
	-moz-osx-font-smoothing: auto;
}



/* ---------------------------------------------------------------------------

	Toolkit: Inline Transitions
	===========================

	A mixin for transitioning properties that don't typically effect an
	element's layout. It's especially useful for anchors where transitioning
	"all" would animate background position and mess with images sprites.

--------------------------------------------------------------------------- */

@transition-speed: 0.2s;

.inline-transitions( @s: @transition-speed ) {
	transition: background-color @s, color @s, border-color @s, text-shadow @s, opacity @s, box-shadow @s;
}



/* ---------------------------------------------------------------------------

	Ratio
	=====

	@since 0.0.1

	This mixin used to preserve img/video width:height ratio.
	Also useful for elements with background images, or just to preserve a
	space for an img to be dynamically loaded into.

	What's wrong with img { max-width: 100% }, eh?
	Nothing. Except until the asset is downloaded, the browser doesn't know
	its dimensions and therefore how much space to reserve for the img in the
	layout. The result is the user getting shunted about the page as the content
	loads in and vertical space is calculated.

	<figure class="ratio">
		<img class="ratio__child" alt src />
	</figure>

--------------------------------------------------------------------------- */

.ratio( @width: 16; @height: 9 ) {
	position: relative;
	overflow: hidden;
	padding: 0;
	margin: 0;
	padding-bottom: @height / @width * 100%; // default 16:9
}

.ratio-child() {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: auto;
	// Use height: 100%; for video, iframe etc.
}



/* ---------------------------------------------------------------------------

	Toolkit: Triangles
	==================

	Triangles that inherit font as the triangle color.
	Could probably update the API on this to @width, @direction

--------------------------------------------------------------------------- */

.triangle-up( @width: 0.3em ) {
	display: inline-block;
	height: 0;
	width: 0;
	border-style: solid;
	border-width: @width;
	border-top-color: rgba(0,0,0,0);
	border-right-color: rgba(0,0,0,0);
	border-left-color: rgba(0,0,0,0);
	border-top-width: 0;
}

.triangle-down( @width: 0.3em ) {
	display: inline-block;
	height: 0;
	width: 0;
	border-style: solid;
	border-width: @width;
	border-right-color: rgba(0,0,0,0);
	border-bottom-color: rgba(0,0,0,0);
	border-left-color: rgba(0,0,0,0);
	border-bottom-width: 0;
}

.triangle-left( @width: 0.3em ) {
	display: inline-block;
	height: 0;
	width: 0;
	border-style: solid;
	border-width: @width;
	border-top-color: rgba(0,0,0,0);
	border-bottom-color: rgba(0,0,0,0);
	border-left-color: rgba(0,0,0,0);
	border-left-width: 0;
}

.triangle-right( @width: 0.3em ) {
	display: inline-block;
	height: 0;
	width: 0;
	border-style: solid;
	border-width: @width;
	border-top-color: rgba(0,0,0,0);
	border-right-color: rgba(0,0,0,0);
	border-bottom-color: rgba(0,0,0,0);
	border-right-width: 0;
}
