// Oppsett av brikker
let pieceAMT = 0

function createPiece(pieceColor, pieceType, idPrefix, squareId) {
    pieceAMT++;
    
    var container = document.createElement("div");
    container.className = `piece ${pieceType} color${pieceColor}`;
    container.id = `${idPrefix}${pieceAMT}`;
    container.style.userSelect = "none";
  
    var img = document.createElement("img");
    img.className = pieceType;
    img.src = `../IMAGES/${pieceColor}${pieceType}.png`;
    img.draggable = true;
    
    document.getElementById(`${squareId}`).appendChild(container);
    container.appendChild(img);
    
    return container;
}

// Hvite brikker
var pwhite1 = createPiece("white", "pawn", "pwhite", "a2");
var pwhite2 = createPiece("white", "pawn", "pwhite", "b2");
var pwhite3 = createPiece("white", "pawn", "pwhite", "c2");
var pwhite4 = createPiece("white", "pawn", "pwhite", "d2");
var pwhite5 = createPiece("white", "pawn", "pwhite", "e2");
var pwhite6 = createPiece("white", "pawn", "pwhite", "f2");
var pwhite7 = createPiece("white", "pawn", "pwhite", "g2");
var pwhite8 = createPiece("white", "pawn", "pwhite", "h2");

var rwhite1 = createPiece("white", "rook", "rwhite", "a1");
var rwhite2 = createPiece("white", "rook", "rwhite", "h1");

var knwhite1 = createPiece("white", "knight", "knwhite", "b1");
var knwhite2 = createPiece("white", "knight", "knwhite", "g1");

var bwhite1 = createPiece("white", "bishop", "bwhite", "c1");
var bwhite2 = createPiece("white", "bishop", "bwhite", "f1");

var qwhite = createPiece("white", "queen", "qwhite", "d1");

var kwhite = createPiece("white", "king", "kwhite", "e1");


// Svarte brikker
var pblack1 = createPiece("black", "pawn", "pblack", "a7");
var pblack2 = createPiece("black", "pawn", "pblack", "b7");
var pblack3 = createPiece("black", "pawn", "pblack", "c7");
var pblack4 = createPiece("black", "pawn", "pblack", "d7");
var pblack5 = createPiece("black", "pawn", "pblack", "e7");
var pblack6 = createPiece("black", "pawn", "pblack", "f7");
var pblack7 = createPiece("black", "pawn", "pblack", "g7");
var pblack8 = createPiece("black", "pawn", "pblack", "h7");

var rblack1 = createPiece("black", "rook", "rblack", "a8");
var rblack2 = createPiece("black", "rook", "rblack", "h8");

var knblack1 = createPiece("black", "knight", "knblack", "b8");
var knblack2 = createPiece("black", "knight", "knblack", "g8");

var bblack1 = createPiece("black", "bishop", "bblack", "c8");
var bblack2 = createPiece("black", "bishop", "bblack", "f8");

var kblack = createPiece("black", "king", "kblack", "e8");

var qblack = createPiece("black", "queen", "qblack", "d8");