(function(){
    "use strict";
    // the variable 'colors' is global
    var colors = ['#red', '#yellow', '#blue', '#green'];
    // the variable 'sequence' is global and is also an empty array that stores the sequence of random numbers/squares generated by the randomizer
    var sequence = [];

    // this is the click event that changes the opacity of any square that is clicked
    colors.forEach(function(color){
        $(document).on('click', color, function(clickSquare){
            $(color).animate({
                opacity: 0
            },100);
            $(color).animate({
                opacity: 1
            });

            // this plays a beep when the square is clicked
            $(this).children().get(0).play();
        });
    });

    // this function generates a random number (that's associated with one of the squares)
    function clickStart(){

        // this is the randomizer
        var randomNum = Math.floor((Math.random() * 4));

        // this pushes my random number into an array
        sequence.push(randomNum);

        // this loops through my 'sequence' array
        var count = 0;
        var interval = 1000; // interval time in milliseconds

        var simonsTurn = setInterval(function () {
            if (count == sequence.length) {
                count = 0;
                clearInterval(simonsTurn);
            } else {
                var colorsIndex = sequence[count];
                var color = colors[colorsIndex];

                $(color).animate({
                    opacity: 0
                },100);
                $(color).animate({
                    opacity: 1
                });
                count++;

                // this plays the a beep tone when the random square is selected by the randomizer
                $(color).children().get(0).play();
            }
        }, interval);
    }

    // this runs the function clickStart when the 'Go' button is clicked
    $(document).on('click', '#start', clickStart);

    // this checks if the user clicked the correct sequence and runs clickStart again if they are correct
    var currentClick = 0;

    function checkClicks(clicks) {
        return clicks == squaresClicked;
    }

    $('#game').click(function(event){
        var id = event.target.id;
        var colorsIndex = sequence[currentClick];
        var color = colors[colorsIndex];

        if ('#' + id == color) {
            currentClick++;
        } else {
            currentClick = 0;
            // this shows a meme when you get the sequence wrong
            $('#game').html('<img src="/img/you-lose.jpg">');
            $('#game').css('background-color', '#fff');
            $('#motivation').html('<h2>' + ' ' + '</h2>');
            $('#fail').get(0).play();
        }

        if (currentClick == sequence.length) {
            currentClick = 0;

            // this spits out a random message when you get the sequence correct
            var winner = [
                "You won Jevi!",
                "Shake and Bake!",
                "You did well in Algorithms!",
                "Yes, we can!",
                "You are doing well i gaming!",
                "Great Star You are!",
                "Strategy!",
                "You are a good boy!",
                "Is the game going well!",
                "You Won a ticket to Wonders of the Cross !",
                "Hope That's Special",
                "Thank you, Ambusi!",
                "Abang is a great place to be!",
                "Refreshment from the Presence of Christ",
                "December retreat is coming!",
                "Get ready to be there!",
                "I will be there!",
                "Deeper Life Bible Church Nearest to you",
                "Another one",
                "Ps Dr William F Kumuyi Preaching"
            ];
            var winnerCount = 0;
            var winnerSequence = [];
            var randomWinner = Math.floor((Math.random() * 20));

            winnerSequence.push(randomWinner);
            var winnerIndex = winnerSequence[winnerCount];

            var msg = winner[winnerIndex];

            $('#motivation').html('<h2>' + msg + '</h2>');
            winnerCount++;

            // this runs the clickStart function again with one more square added to the sequence if you get the sequence right
            clickStart();
        }
    });
})();