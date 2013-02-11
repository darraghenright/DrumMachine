/*jshint globalstrict: true */
/*global Stepper: true */

'use strict';

/**
 * Sequencer
 */
var Sequencer = function() {

  /**
   * sounds
   * @type {Object}
   */
  this.sounds = {};

  /**
   * patterns
   * @type {Object}
   */
  this.patterns = {
    kick:  [1, 0, 0, 1, 0, 0, 1, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0],
    hats:  [0, 0, 1, 0, 0, 0, 1, 0]
  };

  /**
   * init()
   * Create stepper object
   * Wire up sequencer and stepper
   */
  this.init = function() {
    this.stepper = new Stepper();
    this.stepper.attach(this);
  };

  /**
   * update()
   * @param  {Number} step
   */
  this.update = function(step) {

    $('#step').trigger('step', step); // pretty manky

    for (var inst in this.patterns) {
      if (this.patterns[inst][step]) {
        this.sounds[inst].play();
      }
    }
  };

  /**
   * toggle()
   * Play/pause sequencer
   */
  this.toggle = function() {
    if (this.stepper.isRunning) {
      this.stepper.stop();
    } else {
      this.stepper.start();
    }
  };

  /**
   * reset()
   * Reset stepper to zero
   */
  this.reset = function() {
    this.stepper.reset();
  };

  this.init();
};
