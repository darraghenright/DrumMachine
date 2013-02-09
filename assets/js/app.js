/*jshint globalstrict: true */
/*global $: true */

'use strict';

// Create a decent drum module. DrumMachine
// refactoring... Stepper, Sequencer
// how do we attach DrumMachine to Sequencer
// cool stuff, randomise patterns, randomise pitch etc. shuffle


/**
 * log
 */
function log() {
  console.log(arguments);
}

var Wave = {
  SINE: 0,
  SQUARE: 1,
  SAW: 2,
  TRIANGLE: 3
};

var Sound = (function() {

  var a, v;

  a = new webkitAudioContext();
  v = a.createGainNode();

  v.connect(a.destination);
  v.gain.value = 0.1;

  return function(hz, wf, ms) {

    var o;

    wf = wf || Wave.SINE;
    ms = ms || 1000;

    o = a.createOscillator();

    o.type = wf;
    o.frequency.value = hz;

    o.connect(v);
    o.noteOn(0);

    setTimeout(function() {
      o.noteOff(0);
    }, ms);

  };
})();

/**
 * Sequencer
 */
var Sequencer = function() {

  this.sounds = function() {
    var i = this.step.current;

    var rand = function() {
      return !!Math.round(Math.random());
    };

    var rand2 = function(n) {
      return Math.random() * n;
    };

    if (!!this.pattern.kick[i]) { //if (rand()) {
      Sound(110, Wave.SINE, 60);
    }

    if (!!this.pattern.snare[i]) { //if (rand()) {
      Sound(220, Wave.SINE, 60);
    }

    if (!!this.pattern.hats[i]) { //if (rand()) {
      Sound(rand2(10000), Wave.SINE, 40);
    }
  };

  this.ms = 125;

  this.step = {
    current: 0,
    total: 8
  };

  this.pattern = {
    kick:  [1, 0, 0, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 1],
    hats:  [1, 0, 1, 1, 0, 0, 1, 0]
  };

  this.isRunning = false;
  this.timeout   = false;

  this.run = function() {

    var _this = this;

    function timer() {
      _this.next();

      // messing...shuffler
      var x = _this.ms;
      if (_this.step.current % 2 === 0) {
        x -= _this.ms / 5;
      }  else {
        x += _this.ms / 5;
      }

      _this.timeout = setTimeout(timer, x);
    }

    this.toggleIsRunning();
    timer();
  };

  this.stop = function() {
    this.toggleIsRunning();
    clearTimeout(this.timeout);
  };

  this.current = function() {
    return this.step.current;
  };

  this.valid = function() {
    return this.step.current !== this.step.total;
  };

  this.next = function() { // @TODO: step()

    if (!this.valid()) {
      this.reset();
    }
    this.sounds();
    this.step.current++;
  };

  this.reset = function() {
    this.step.current = 0;
  };

  this.toggleIsRunning = function() {
    this.isRunning = !this.isRunning;
  };

  this.toggle = function() {
    if (this.isRunning) {
      log('stop!');
      this.stop();
    } else {
      log('run!');
      this.run();
    }
  };
};

/**
 * Initialise
 */
(function() {

  var seq,
      btn;

  seq = new Sequencer();
  btn = $('#btn-run');

  btn.on('click', function() {
    seq.toggle();
  });

})();