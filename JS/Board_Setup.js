// Oppsett av brett

function createSquare(squareColor, squareId, row) {
    var container = document.createElement("div");
    container.className = `square ${squareColor}`;
    container.id = `${squareId}`;
    
    document.getElementById(`row-${row}`).appendChild(container);
    return container;
}

var a1 = createSquare("black", "a1", 1);
var b1 = createSquare("white", "b1", 1);
var c1 = createSquare("black", "c1", 1);
var d1 = createSquare("white", "d1", 1);
var e1 = createSquare("black", "e1", 1);
var f1 = createSquare("white", "f1", 1);
var g1 = createSquare("black", "g1", 1);
var h1 = createSquare("white", "h1", 1);

var a2 = createSquare("white", "a2", 2);
var b2 = createSquare("black", "b2", 2);
var c2 = createSquare("white", "c2", 2);
var d2 = createSquare("black", "d2", 2);
var e2 = createSquare("white", "e2", 2);
var f2 = createSquare("black", "f2", 2);
var g2 = createSquare("white", "g2", 2);
var h2 = createSquare("black", "h2", 2);

var a3 = createSquare("black", "a3", 3);
var b3 = createSquare("white", "b3", 3);
var c3 = createSquare("black", "c3", 3);
var d3 = createSquare("white", "d3", 3);
var e3 = createSquare("black", "e3", 3);
var f3 = createSquare("white", "f3", 3);
var g3 = createSquare("black", "g3", 3);
var h3 = createSquare("white", "h3", 3);

var a4 = createSquare("white", "a4", 4);
var b4 = createSquare("black", "b4", 4);
var c4 = createSquare("white", "c4", 4);
var d4 = createSquare("black", "d4", 4);
var e4 = createSquare("white", "e4", 4);
var f4 = createSquare("black", "f4", 4);
var g4 = createSquare("white", "g4", 4);
var h4 = createSquare("black", "h4", 4);

var a5 = createSquare("black", "a5", 5);
var b5 = createSquare("white", "b5", 5);
var c5 = createSquare("black", "c5", 5);
var d5 = createSquare("white", "d5", 5);
var e5 = createSquare("black", "e5", 5);
var f5 = createSquare("white", "f5", 5);
var g5 = createSquare("black", "g5", 5);
var h5 = createSquare("white", "h5", 5);

var a6 = createSquare("white", "a6", 6);
var b6 = createSquare("black", "b6", 6);
var c6 = createSquare("white", "c6", 6);
var d6 = createSquare("black", "d6", 6);
var e6 = createSquare("white", "e6", 6);
var f6 = createSquare("black", "f6", 6);
var g6 = createSquare("white", "g6", 6);
var h6 = createSquare("black", "h6", 6);

var a7 = createSquare("black", "a7", 7);
var b7 = createSquare("white", "b7", 7);
var c7 = createSquare("black", "c7", 7);
var d7 = createSquare("white", "d7", 7);
var e7 = createSquare("black", "e7", 7);
var f7 = createSquare("white", "f7", 7);
var g7 = createSquare("black", "g7", 7);
var h7 = createSquare("white", "h7", 7);

var a8 = createSquare("white", "a8", 8);
var b8 = createSquare("black", "b8", 8);
var c8 = createSquare("white", "c8", 8);
var d8 = createSquare("black", "d8", 8);
var e8 = createSquare("white", "e8", 8);
var f8 = createSquare("black", "f8", 8);
var g8 = createSquare("white", "g8", 8);
var h8 = createSquare("black", "h8", 8);
