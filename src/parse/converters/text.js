define([
	'config/types',
	'parse/Tokenizer/utils/getLowestIndex',
	'parse/Parser/utils/decodeCharacterReferences'
], function (
	types,
	getLowestIndex,
	decodeCharacterReferences
) {

	'use strict';

	var whitespace = /\s{2,}/g;

	return function ( parser ) {
		var index, remaining, barrier, text;

		remaining = parser.remaining();

		barrier = parser.inside ? '</' + parser.inside : '<';

		if ( parser.inside && !parser.interpolate[ parser.inside ] ) {
			index = remaining.indexOf( barrier );
		} else {
			index = getLowestIndex( remaining, [ barrier, parser.delimiters[0], parser.tripleDelimiters[0] ] );
		}

		if ( !index ) {
			return null;
		}

		if ( index === -1 ) {
			index = remaining.length;
		}

		parser.pos += index;

		text = decodeCharacterReferences( remaining.substr( 0, index ) );

		if ( !parser.preserveWhitespace ) {
			text = text.replace( whitespace, ' ' );
		}

		return text;
	};

});
