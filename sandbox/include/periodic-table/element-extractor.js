function extractFirstText(c) {
	var firstStuff = $(c).contents()[0];

	if(firstStuff === undefined)
		return "";
	if(firstStuff.nodeType == 3)
		return firstStuff.data;

	var s = $(c).children("span.sorttext");
	if(s.length != 0)
		return extractFirstText(s);
	else
		return extractFirstText(firstStuff);
}

var elements = $('.wikitable:first tr').map(function(i,tableLine) {
	if(i <= 1 || i > 119) return null;

	var cells = $(tableLine).children('td').map(function(j,c) {
		return extractFirstText(c);
	});

	return {
		number:    cells[0],
		symbol:    cells[1],
		name:      cells[2],
//		etymology: cells[3],
		group:     cells[4],
		period:    cells[5],
		weight:    cells[6],
		density:   cells[7],
		meltK:     cells[8],
		boilK:     cells[9],
		heatJgK:   cells[10],
		neg:       cells[11],
		abundance: cells[12]
	};
}).toArray();

console.log(JSON.stringify(
	elements.map(function(e) {
		e.name = e.name.toLowerCase();
		return e;
	})
));
