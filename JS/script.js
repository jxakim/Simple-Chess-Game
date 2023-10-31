let SelectedPiece = null;
let SelectedSquare = null;

const colorBlack = "rgb(64, 117, 64)";
const colorWhite = "rgb(255, 255, 234)";

const highlightBlack = "rgb(153, 255, 153)";
const highlightWhite = "rgb(102, 255, 102)";

const pieces = document.querySelectorAll(".piece");
const squares = document.querySelectorAll(".square");

const output = document.getElementById("output");
const output2 = document.getElementById("output2");
const whitePoints = document.getElementById("whitepoints");
const blackPoints = document.getElementById("blackpoints");

let turn = "white";
output2.innerHTML = `Turn: ${turn}`

function switchTurn() {
    turn = (turn === "white") ? "black" : "white";
    output2.innerHTML = `Turn: ${turn}`
}

let taken_pieces = [];

let points_black = 0;
let points_white = 0;

let pawn_Value = 1;
let rook_Value = 5;
let knight_Value = 3;
let bishop_Value = 3;
let queen_Value = 9;


function updatePoints(piece, taken) {
    let pointDiff = 0;

    if (taken) {
        pointDiff = getPieceValue(taken);
        if (turn == "white") {
            points_black -= pointDiff;
        } else if (turn == "black") {
            points_white -= pointDiff;
        }
    }

    let whiteText = "White:";
    let blackText = "Black:";
    if (points_white > points_black) {
        whiteText = `White: +${points_white - points_black}`;
    } else if (points_black > points_white) {
        blackText = `Black: +${points_black - points_white}`;
    } else {
        whiteText = "White:";
        blackText = "Black:";
    }
    whitePoints.innerHTML = whiteText;
    blackPoints.innerHTML = blackText;
}


// Main Loop
squares.forEach(square => { 
    square.addEventListener("click", () => {
        if (square === SelectedSquare) {
            deselectSquare();
        
        } else if (SelectedPiece && isValidMove(SelectedPiece, SelectedSquare, square)) {
            const colorSelected = SelectedPiece.classList.contains("colorwhite") ? "white" : "black";
            
            if(turn == colorSelected) {
                movePiece(SelectedPiece, SelectedSquare, square);
            }

        } else {
            deselectSquare();
            selectSquare(square);
        }
    });
});


// Visual Handling
function movePiece(piece, fromSquare, toSquare) {
    const takenPiece = toSquare.firstChild;
    if (takenPiece) {
        taken_pieces.push(takenPiece.id);
        takenPiece.remove();
    }

    // Move piece to new square
    toSquare.appendChild(piece);
    deselectSquare();

    updatePoints(piece, takenPiece)

    switchTurn();
    output.innerHTML = `${capitalizeFirstLetter(piece.classList[1])} ${fromSquare.id} > ${toSquare.id}`;

    
}

function displayAvailableMoves(piece, sq) {
    squares.forEach(move => {
        if (getValidMoves(piece, sq).includes(move.id)) {
            if (move.classList.contains("black")) {
                move.style.backgroundColor = highlightBlack;
            } else {
                move.style.backgroundColor = highlightWhite;
            }
        }
    });
}


// Selection Handling
function selectSquare(square) {
    squares.forEach(sq => {
        sq.removeEventListener("click", selectSquare);
        sq.removeEventListener("click", movePiece);
    });

    square.style.backgroundColor = "yellow";
    SelectedSquare = square;
    if (square.firstChild) {
        const colorSelected = square.firstChild.classList.contains("colorwhite") ? "white" : "black";
        if(turn == colorSelected) {
            SelectedPiece = square.firstChild;
            displayAvailableMoves(SelectedPiece, square);
        }
    }
}

function deselectSquare() {
    resetBoardColors();
    SelectedPiece = null;
    SelectedSquare = null;
}


// Movement logic

function getPieceValue(piece) {
    if (piece.classList.contains("pawn")) {
        return pawn_Value;
    } else if (piece.classList.contains("rook")) {
        return rook_Value;
    } else if (piece.classList.contains("queen")) {
        return queen_Value;
    } else if (piece.classList.contains("bishop")) {
        return bishop_Value;
    } else if (piece.classList.contains("knight")) {
        return knight_Value;
    }

    return [];
}

function getValidMoves(piece, fromSquare) {
    if (piece.classList.contains("pawn")) {
        return getValidPawnMoves(piece, fromSquare);
    } else if (piece.classList.contains("rook")) {
        return getValidRookMoves(piece, fromSquare);
    } else if (piece.classList.contains("king")) {
        return getValidKingMoves(piece, fromSquare);
    } else if (piece.classList.contains("queen")) {
        return getValidQueenMoves(piece, fromSquare);
    } else if (piece.classList.contains("bishop")) {
        return getValidBishopMoves(piece, fromSquare);
    } else if (piece.classList.contains("knight")) {
        return getValidKnightMoves(piece, fromSquare);
    }

    return [];
}

function isValidMove(piece, fromSquare, toSquare) {
    if (piece.classList.contains("piece")) {
        if (getValidMoves(piece, fromSquare).includes(toSquare.id)) {
            return true;
        }
    }

    return false;
}

function getValidPawnMoves(piece, fromSquare) {
    const isWhite = piece.classList.contains("colorwhite");
    const file = fromSquare.id.charAt(0);
    const rank = parseInt(fromSquare.id.charAt(1));
    const step = isWhite ? 1 : -1;
    const doubleStep = step * 2;
    const validMoves = [];

    // Check if the pawn is moving one or two squares forward
    const squareInFront = document.getElementById(`${file}${rank+step}`);
    if (squareInFront && !squareInFront.firstChild) {
        validMoves.push(squareInFront.id);
        const doubleSquareInFront = document.getElementById(`${file}${rank+doubleStep}`);
        if ((isWhite && rank === 2) || (!isWhite && rank === 7)) {
            if (!doubleSquareInFront.firstChild) {
                validMoves.push(doubleSquareInFront.id);
            }
        }
    }

    // Check if the pawn is capturing a piece diagonally
    const leftDiagonalSquare = document.getElementById(`${String.fromCharCode(file.charCodeAt(0)-1)}${rank+step}`);
    if (leftDiagonalSquare && leftDiagonalSquare.firstChild && leftDiagonalSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite") && file !== 'a') {
        validMoves.push(leftDiagonalSquare.id);
    }
    const rightDiagonalSquare = document.getElementById(`${String.fromCharCode(file.charCodeAt(0)+1)}${rank+step}`);
    if (rightDiagonalSquare && rightDiagonalSquare.firstChild && rightDiagonalSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite") && file !== 'h') {
        validMoves.push(rightDiagonalSquare.id);
    }

    return validMoves;
}

function getValidBishopMoves(piece, fromSquare) {
    const fromCol = fromSquare.id.charAt(0).charCodeAt(0) - 97;
    const fromRow = parseInt(fromSquare.id.charAt(1)) - 1;
    const isWhite = piece.classList.contains("colorwhite");
    const validMoves = [];

    // Check moves in diagonal directions
    for (let rowDir of [-1, 1]) {
        for (let colDir of [-1, 1]) {
            for (let row = fromRow + rowDir, col = fromCol + colDir; row >= 0 && row < 8 && col >= 0 && col < 8; row += rowDir, col += colDir) {
                const square = document.getElementById(String.fromCharCode(col + 97) + (row + 1));
                if (!square.firstChild) {
                    validMoves.push(square.id);
                } else if (square.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite")) {
                    validMoves.push(square.id);
                    break;
                } else {
                    break;
                }
            }
        }
    }

    return validMoves;
}

function getValidKnightMoves(piece, fromSquare) {
    const isWhite = piece.classList.contains("colorwhite");
    const fromCol = fromSquare.id.charAt(0).charCodeAt(0) - 97;
    const fromRow = parseInt(fromSquare.id.charAt(1)) - 1;
    const validMoves = [];

    // Check all possible knight moves
    const moveOffsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    for (let i = 0; i < moveOffsets.length; i++) {
        const [rowOffset, colOffset] = moveOffsets[i];
        const toRow = fromRow + rowOffset;
        const toCol = fromCol + colOffset;
        if (toRow >= 0 && toRow < 8 && toCol >= 0 && toCol < 8) {
            const toSquare = document.getElementById(String.fromCharCode(toCol + 97) + (toRow + 1));
            if (!toSquare.firstChild || toSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite")) {
                validMoves.push(toSquare.id);
            }
        }
    }

    return validMoves;
}

function getValidRookMoves(piece, fromSquare) {
    const isWhite = piece.classList.contains("colorwhite");
    const fromCol = fromSquare.id.charCodeAt(0) - 97;
    const fromRow = parseInt(fromSquare.id.charAt(1)) - 1;
    const validMoves = [];

    // Check all possible rook moves horizontally and vertically
    for (let delta of [-1, 1]) {
        let toRow = fromRow + delta;
        let toCol = fromCol;
        while (toRow >= 0 && toRow < 8) {
            const toSquare = document.getElementById(String.fromCharCode(toCol + 97) + (toRow + 1));
            if (!toSquare.firstChild || toSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite")) {
                validMoves.push(toSquare.id);
            }
            if (toSquare.firstChild) break;
            toRow += delta;
        }
        toRow = fromRow;
        toCol = fromCol + delta;
        while (toCol >= 0 && toCol < 8) {
            const toSquare = document.getElementById(String.fromCharCode(toCol + 97) + (toRow + 1));
            if (!toSquare.firstChild || toSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite")) {
                validMoves.push(toSquare.id);
            }
            if (toSquare.firstChild) break;
            toCol += delta;
        }
    }

    return validMoves;
}

function getValidQueenMoves(piece, fromSquare) {
    const rookMoves = getValidRookMoves(piece, fromSquare);
    const bishopMoves = getValidBishopMoves(piece, fromSquare);
    return [...rookMoves, ...bishopMoves];
}

function getValidKingMoves(piece, fromSquare) {
    const isWhite = piece.classList.contains("colorwhite");
    const fromCol = fromSquare.id.charAt(0).charCodeAt(0) - 97; // Convert letter to column index
    const fromRow = 8 - parseInt(fromSquare.id.charAt(1)); // Convert number to row index
    const validMoves = [];

    // Check all possible king moves
    const moveOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    for (let i = 0; i < moveOffsets.length; i++) {
        const [rowOffset, colOffset] = moveOffsets[i];
        const toRow = fromRow + rowOffset;
        const toCol = fromCol + colOffset;
        if (toRow >= 0 && toRow < 8 && toCol >= 0 && toCol < 8) {
            const toSquare = document.getElementById(String.fromCharCode(toCol + 97) + (8 - toRow)); // Convert back to square id
            if (!toSquare.firstChild || toSquare.firstChild.classList.contains(isWhite ? "colorblack" : "colorwhite")) {
                validMoves.push(toSquare.id);
            }
        }
    }

    return validMoves;
}


// Global

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function resetBoardColors() {
    squares.forEach((square, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        if ((row + col) % 2 === 0) {
            square.style.backgroundColor = colorWhite;
        } else {
            square.style.backgroundColor = colorBlack;
        }
    });
}


