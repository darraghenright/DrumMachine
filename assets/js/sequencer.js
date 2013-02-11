/*jshint globalstrict: true */
/*global Stepper: true */

'use strict';

/**
 * Sequencer
 */
var Sequencer = function() {

  this.sounds = {};

  this.patterns = {
    kick:  [1, 0, 1, 0, 0, 0, 0, 1],
    snare: [0, 0, 0, 0, 1, 0, 0, 0],
    hats:  [1, 0, 0, 1, 0, 0, 1, 0]
  };

  this.init = function(s) {
    this.stepper = new Stepper();
    this.stepper.attach(this);
  };

  this.update = function(step) {

    console.log('step: ', step);

    for (var inst in this.patterns) {
      if (this.patterns[inst][step]) {
        this.sounds[inst].play();
      }
    }
  };

  this.toggle = function() {
    if (this.stepper.isRunning) {
      this.stepper.stop();
    } else {
      this.stepper.start();
    }
  };

  this.init();
};