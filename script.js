$( document ).ready( function () {

    var $grid = $( 'main' );
    var $turn = $( '#turn' );
    var $btnNG = $( 'button' );

    var xWin = [
        [ 0, 8, 16, 24 ],
        [ 1, 19, 17, 25 ],
        [ 2, 10, 18, 26 ],
        [ 3, 11, 19, 27 ],

        [ 7, 15, 23, 31 ],
        [ 8, 16, 24, 32 ],
        [ 9, 27, 25, 33 ],
        [ 10, 18, 26, 34 ],

        [ 14, 22, 30, 38 ],
        [ 15, 23, 31, 39 ],
        [ 16, 24, 32, 40 ],
        [ 17, 25, 33, 41 ],

        [ 3, 9, 15, 21 ],
        [ 4, 10, 16, 22 ],
        [ 5, 11, 17, 23 ],
        [ 6, 12, 18, 24 ],

        [ 10, 16, 22, 28 ],
        [ 11, 17, 23, 29 ],
        [ 12, 18, 24, 30 ],
        [ 13, 19, 25, 31 ],

        [ 17, 23, 29, 35 ],
        [ 18, 24, 30, 36 ],
        [ 19, 25, 31, 37 ],
        [ 20, 26, 32, 38 ]
    ];


    // GLOBAL VAR.
    var turnRed = true;
    var turnYellow = false;

    $grid.on( 'click', select );
    $btnNG.on( 'click', newGame );


    /*________________________________________________________________________*/
    // LOGIC UPON SELECTION
    function select( event ) {
        var col; // refers to the whole column

        // check which column was selected
        event.target.classList.forEach( function ( element ) {
            if ( element.includes( 'col' ) ) {
                col = element;
            }
        } );
        // holds all the elements in that column
        var $colList = $( '.' + col );
        // holds the only position that the token can occupy in that column
        var $emptySlots = $colList.not( '.red' ).not( '.yellow' ).last();

        // sets the value of row
        var theRow; // refers just to the most bottom row available in a sel col.
        $emptySlots.attr( 'class' ).split( ' ' ).forEach( function ( cls ) {
            if ( cls.includes( 'row' ) ) {
                theRow = cls;
            }
        } );


        // sets the token in the proper slot and paint it.
        if ( turnRed ) {
            $emptySlots.addClass( 'red' );
            // cb to checkVictory.
            checkVictory( 'red', col, theRow );
            turn();
        } else if ( turnYellow ) {
            $emptySlots.addClass( 'yellow' );
            checkVictory( 'yellow', col, theRow );
            turn();
        }
    }

    /*________________________________________________________________________*/
    // SET TURNS
    function turn() {
        if ( turnRed && !turnYellow ) {
            turnRed = false;
            turnYellow = true;
            $turn.removeClass( 'red' );
            $turn.addClass( 'yellow' );
        } else if ( !turnRed && turnYellow ) {
            turnRed = true;
            turnYellow = false;
            $turn.removeClass( 'yellow' );
            $turn.addClass( 'red' );
        }
    }

    /*________________________________________________________________________*/
    // CHECKING VICTORY CONDITIONS:
    function checkVictory( turn, column, row ) {
        var columnVictory = false;
        var rowVictory = false;
        var crossVictory = false;
        var $column = $( '.' + column );
        var $row = $( '.' + row );
        // check for columns
        columnVictory = checkColumn( $column, turn );
        // check for rows
        rowVictory = checkRow( $row, turn );
        // check for diagonal
        crossVictory = checkCross(turn);

        // victory statements:
        if ( columnVictory ) {
            console.log( turn + ' is the winner!! connect4 in a column' );
        } else if ( rowVictory ) {
            console.log( turn + ' is the winner!! connect4 in a row' );
        } else if ( crossVictory ) {
            console.log( turn + ' is the winner!! connect4 in a cross' );
        }
    }
    /* _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _*/
    // CHECK VERTICAL
    function checkColumn( column, turn ) {
        var str = '';
        for ( var i = 0; i < column.length; i++ ) {
            ( column.eq( i ).hasClass( turn ) ) ? str += 'w': str += 'l';
        }
        if ( str.indexOf( 'wwww' ) >= 0 ) {
            return true;
        }
    }

    /* _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _*/
    // CHECK ORIZZONTAL
    function checkRow( row, turn ) {
        var str = '';
        for ( var j = 0; j < row.length; j++ ) {
            ( row.eq( j ).hasClass( turn ) ) ? str += 'w': str += 'l';
        }
        // console.log( str );
        if ( str.indexOf( 'wwww' ) >= 0 ) {
            return true;
        }
    }
    /* _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _*/
    // CHECK DIAGONAL
    function checkCross(turn) {

        // get an up to date DOM obj holding all the elements in the grid.
        var $grid = $('main > div');
        var victory = false;
        // console.log($grid);
        if (!victory) {
            for (var y = 0; y < xWin.length; y++) {
                var setTest = xWin[y];
                var str = '';

                for (var z = 0; z < setTest.length; z++) {
                    var cellTest = setTest[z];
                    if ($grid.eq(cellTest).hasClass(turn)) {
                        str += 'w';
                    } else {
                        str += 'l';
                    }
                }
                // console.log(str);
                if ( str.indexOf( 'wwww' ) >= 0 ) {
                    victory = true;
                }

            }
        }
        return victory;
    }

    /*________________________________________________________________________*/
    function newGame() {
        turn();
    }

} );


//
