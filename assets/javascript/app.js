$(document).ready(function(){
    let topicsArr = ['nhl', 'nfl', 'nba', 'mlb', 'world cup soccer', 'ncaa football', 'ncaa basketball'];

    function renderButtons(arr){
        //Empty button area when page loads
        $('#button-area').empty();

        //Loop through topics array and display buttons on page
        for (let i = 0; i < arr.length; i++){
            //Create a button
            let button = $('<button>');
            // Adds a class of movie to our button
            button.addClass("topics-button");
            // Added a data-attribute
            button.attr("data-name", arr[i]);
            // Provided the initial button text
            button.text(arr[i]);
            // Added the button to the buttons-view div
            $("#button-area").append(button);
        }
    }

    //When user clicks on one of the topics buttons the gifs will display
    $(document.body).on('click', '.topics-button', function(){
        event.preventDefault();
        //Set the query term to the data attribute of the specific button
        let query = $(this).attr('data-name');
        //Create the search url
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=aHrYwuW1RaZZ5C0X3U1k5mAGammpCr92&q=${query}&limit=10&offset=0&rating=PG-13&lang=en`

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response){
            //Clear gif div of old gifs when button is clicked
            $('#gif-area').empty();

            //Loop through the responses and create gifs for each in the #gif-area
            for (let i = 0; i < response.data.length; i++){
                //Set src to responses fixed_height_still and add images to gif area div
                let src = response.data[i].images.fixed_height_still.url;
                console.log(src);
                let img = `<img src="${src}">`
                $('#gif-area').append(`

                    <div class="gifs">
                        <p class="rating">${response.data[i].rating}</p>
                        ${img}
                    </div>
                `);
            }

            //When user clicks on the gif it will start/stop it
            $('img').on('click', function(){
                let src = $(this).attr('src');
                if (src.substr(src.length - 5) === 's.gif'){
                    $(this).attr('src', src.replace('_s.gif', '.gif'));
                } else if (src.substr(src.length - 5) === '0.gif'){
                    $(this).attr('src', src.replace('.gif', '_s.gif'));
                }
            });
        });
    });

    //Lets users add their own buttons to the page using the form
    $('#submit-button').on('click', function(){
        event.preventDefault();
        let topic = $('#topic-text').val();
        topicsArr.push(topic);
        renderButtons(topicsArr);
        $('#topic-text').val('');
    });

    renderButtons(topicsArr);
});