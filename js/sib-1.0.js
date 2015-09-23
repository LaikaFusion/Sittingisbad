//used to store document query selector
var TimerDisplay;
var timer;

//adds listener for button to initiate timer as well as set TimerDisplay varible

window.onload = function () {
    //starts button listeners for the three buttons
    document.getElementById('StartButton').addEventListener('click', function () {
        TimerStart(($("#minutes").val()*60));
    });

    document.getElementById('ResetButton').addEventListener('click', function () {
        timer.expired();
        Format($("#minutes").val(),0);

    });

    document.getElementById('StopButton').addEventListener('click', function () {
        CountDownTimer.stop();

    });

    $("#minutes").on("input change", function() {

        RangeValue.innerHTML= $("#minutes").val();

     });

     //shortens what you need to do to reference the timer field
    TimerDisplay= document.querySelector('#TimerDisplay');

    $( "#aboutTitle" ).click(function() {
        $( "#aboutText" ).toggle( "fast" );
    });
}

//formats to MM:SS always, and will format 5 seconds as 00:05
function Format(minutes, seconds) {
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    textContent = minutes + ':' + seconds;

    TimerDisplay.innerHTML= textContent;
};

//Activates functions in the countdown "library"
function TimerStart( seconds ){
    if (RunningTimer === true) {
        CountDownTimer.stop();
    }
     timer = new CountDownTimer(seconds);
    var StartTime = CountDownTimer.parse(seconds);

    timer.start();

    Format(StartTime.minutes, StartTime.seconds);
    timer.onTick(Format);

};
