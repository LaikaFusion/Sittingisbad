//All credit robbmj on stack overflow, modifications by myself
var RunningTimer=false;
var setTimeoutID;

function CountDownTimer(duration) {
  this.duration = duration;
  this.granularity = 1000;
  this.tickFtns = [];
  RunningTimer = false;
}

CountDownTimer.prototype.start = function() {

  RunningTimer = true;
  var start = Date.now(),
      that = this,
      diff, obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
     setTimeoutID = setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      RunningTimer = false;
    }

    obj = CountDownTimer.parse(diff);
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this, obj.minutes, obj.seconds);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !RunningTimer;
};

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};

CountDownTimer.stop = function() {

        clearTimeout(setTimeoutID);
        setTimeoutID = 0;
        RunningTimer = false;
};
