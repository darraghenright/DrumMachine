/*jshint globalstrict: true */
/*global $: true */

'use strict';

/**
 * log
 */
function log() {
  console.log(arguments);
}

/**
 * Sequencer
 */
var Sequencer = function() {

  this.ms = 500;

  this.steps = {
    current: 0,
    total: 4
  };

  this.pattern = {
    kick:  [1, 0, 0, 0],
    snare: [0, 0, 1, 0],
    hats:  [1, 1, 1, 1]
  };

  this.isRunning = false;
  this.timeout   = false;

  this.run = function() {

    var _this = this;

    function timer() {
      _this.step();
      _this.timeout = setTimeout(timer, _this.ms);
    }

    this.toggleIsRunning();
    timer();
  };

  this.stop = function() {
    this.toggleIsRunning();
    clearTimeout(this.timeout);
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

  this.step = function() {
    log(this.steps.current);
    this.steps.current += 1;

  };

  this.toggleIsRunning = function() {
    this.isRunning = !this.isRunning;
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