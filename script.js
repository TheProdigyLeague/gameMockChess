document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    let selectedPiece = null;
    let possibleMoves = [];

    // Initial board setup (using Unicode chess symbols)
    const initialBoard = [
        ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
    ];

    // Map piece codes to Unicode characters
    const pieceSymbols = {
        'wp': '♙', 'wr': '♖', 'wn': '♘', 'wb': '♗', 'wq': '♕', 'wk': '♔',
        'bp': '♟', 'br': '♜', 'bn': '♞', 'bb': '♝', 'bq': '♛', 'bk': '♚',
        '': ''
    };

    // Function to create the chess board
    function createBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.row = row;
                square.dataset.col = col;

                // Determine square color
                if ((row + col) % 2 === 0) {
                    square.classList.add('light');
                } else {
                    square.classList.add('dark');
                }

                // Place initial pieces
                const pieceCode = initialBoard[row][col];
                if (pieceCode) {
                    const piece = document.createElement('span');
                    piece.classList.add('piece');
                    piece.textContent = pieceSymbols[pieceCode];
                    if (pieceCode.startsWith('w')) {
                        piece.classList.add('white-piece');
                    } else {
                        piece.classList.add('black-piece');
                    }
                    piece.dataset.piece = pieceCode; // Store piece type
                    square.appendChild(piece);
                }

                square.addEventListener('click', handleSquareClick);
                chessboard.appendChild(square);
            }
        }
    }

    // Function to handle square clicks
    function handleSquareClick(event) {
        const clickedSquare = event.currentTarget;
        const clickedPiece = clickedSquare.querySelector('.piece');

        // Clear previous highlights
        clearHighlights();

        if (selectedPiece) {
            // A piece is already selected, try to move it
            if (possibleMoves.some(move => move.square === clickedSquare)) {
                movePiece(selectedPiece, clickedSquare);
            }
            selectedPiece = null;
            possibleMoves = [];
        } else if (clickedPiece) {
            // No piece selected, select this one
            selectedPiece = clickedPiece;
            clickedSquare.classList.add('selected');
            // In a real game, you'd calculate legal moves here
            // For this mock, let's just highlight a few arbitrary squares
            calculateMockMoves(clickedSquare);
        }
    }

    // A very simplified mock move calculation
    function calculateMockMoves(currentSquare) {
        const currentRow = parseInt(currentSquare.dataset.row);
        const currentCol = parseInt(currentSquare.dataset.col);

        possibleMoves = [];

        // Example: Highlight adjacent squares (for demonstration)
        const movesToCheck = [
            { row: currentRow - 1, col: currentCol },
            { row: currentRow + 1, col: currentCol },
            { row: currentRow, col: currentCol - 1 },
            { row: currentRow, col: currentCol + 1 }
        ];

        movesToCheck.forEach(move => {
            const targetSquare = getSquare(move.row, move.col);
            if (targetSquare && !targetSquare.querySelector('.piece')) {
                possibleMoves.push({ square: targetSquare, type: 'move' });
                targetSquare.classList.add('highlight-move');
            }
        });
    }

    // Function to move a piece
    function movePiece(pieceToMove, targetSquare) {
        const currentSquare = pieceToMove.parentElement;
        currentSquare.removeChild(pieceToMove);
        targetSquare.appendChild(pieceToMove);
    }

    // Helper to get a square by row and col
    function getSquare(row, col) {
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            return document.querySelector(`.square[data-row="${row}"][data-col="${col}"]`);
        }
        return null;
    }

    // Function to clear all highlights
    function clearHighlights() {
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('selected', 'highlight-move');
        });
    }

    // Initialize the board
    createBoard();
});