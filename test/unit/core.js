test("jQuery()", function() {

	var elem, i,
		obj = jQuery("div"),
		code = jQuery("<code/>"),
		img = jQuery("<img/>"),
		div = jQuery("<div/><hr/><code/><b/>"),
		exec = false,
		lng = "",
		expected = 20,
		attrObj = {
			"text": "test",
			"class": "test2",
			"id": "test3"
		};

	// The $(html, props) signature can stealth-call any $.fn method, check for a
	// few here but beware of modular builds where these methods may be excluded.
	if ( jQuery.fn.click ) {
		expected++;
		attrObj["click"] = function() { ok( exec, "Click executed." ); };
	}
	if ( jQuery.fn.width ) {
		expected++;
		attrObj["width"] = 10;
	}
	if ( jQuery.fn.offset ) {
		expected++;
		attrObj["offset"] = { "top": 1, "left": 1 };
	}
	if ( jQuery.fn.css ) {
		expected += 2;
		attrObj["css"] = { "paddingLeft": 1, "paddingRight": 1 };
	}
	if ( jQuery.fn.attr ) {
		expected++;
		attrObj.attr = { "desired": "very" };
	}

	expect( expected );

	// Basic constructor's behavior
	equal( jQuery().length, 0, "jQuery() === jQuery([])" );
	equal( jQuery(undefined).length, 0, "jQuery(undefined) === jQuery([])" );
	equal( jQuery(null).length, 0, "jQuery(null) === jQuery([])" );
	equal( jQuery("").length, 0, "jQuery('') === jQuery([])" );
	equal( jQuery("#").length, 0, "jQuery('#') === jQuery([])" );

	equal( jQuery(obj).selector, "div", "jQuery(jQueryObj) == jQueryObj" );

	// can actually yield more than one, when iframes are included, the window is an array as well
	equal( jQuery(window).length, 1, "Correct number of elements generated for jQuery(window)" );

/*
	// disabled since this test was doing nothing. i tried to fix it but i'm not sure
	// what the expected behavior should even be. FF returns "\n" for the text node
	// make sure this is handled
	var crlfContainer = jQuery('<p>\r\n</p>');
	var x = crlfContainer.contents().get(0).nodeValue;
	equal( x, what???, "Check for \\r and \\n in jQuery()" );
*/

	/* // Disabled until we add this functionality in
	var pass = true;
	try {
		jQuery("<div>Testing</div>").appendTo(document.getElementById("iframe").contentDocument.body);
	} catch(e){
		pass = false;
	}
	ok( pass, "jQuery('&lt;tag&gt;') needs optional document parameter to ease cross-frame DOM wrangling, see #968" );*/

	equal( code.length, 1, "Correct number of elements generated for code" );
	equal( code.parent().length, 0, "Make sure that the generated HTML has no parent." );

	equal( img.length, 1, "Correct number of elements generated for img" );
	equal( img.parent().length, 0, "Make sure that the generated HTML has no parent." );

	equal( div.length, 4, "Correct number of elements generated for div hr code b" );
	equal( div.parent().length, 0, "Make sure that the generated HTML has no parent." );

	equal( jQuery([1,2,3]).get(1), 2, "Test passing an array to the factory" );

	equal( jQuery(document.body).get(0), jQuery("body").get(0), "Test passing an html node to the factory" );

	elem = jQuery("<div/>", attrObj );

	if ( jQuery.fn.width ) {
		equal( elem[0].style.width, "10px", "jQuery() quick setter width");
	}

	if ( jQuery.fn.offset ) {
		equal( elem[0].style.top, "1px", "jQuery() quick setter offset");
	}

	if ( jQuery.fn.css ) {
		equal( elem[0].style.paddingLeft, "1px", "jQuery quick setter css");
		equal( elem[0].style.paddingRight, "1px", "jQuery quick setter css");
	}

	if ( jQuery.fn.attr ) {
		equal( elem[0].getAttribute("desired"), "very", "jQuery quick setter attr");
	}

	equal( elem[0].childNodes.length, 1, "jQuery quick setter text");
	equal( elem[0].firstChild.nodeValue, "test", "jQuery quick setter text");
	equal( elem[0].className, "test2", "jQuery() quick setter class");
	equal( elem[0].id, "test3", "jQuery() quick setter id");

	exec = true;
	elem.trigger("click");

	// manually clean up detached elements
	elem.remove();

	for ( i = 0; i < 3; ++i ) {
		elem = jQuery("<input type='text' value='TEST' />");
	}
	equal( elem[0].defaultValue, "TEST", "Ensure cached nodes are cloned properly (Bug #6655)" );

	// manually clean up detached elements
	elem.remove();

	for ( i = 0; i < 128; i++ ) {
		lng += "12345678";
	}
});
