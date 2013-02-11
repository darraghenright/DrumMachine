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
    kick:  [1, 0, 1, 0, 0, 0, 0, 1],
    snare: [0, 0, 0, 0, 1, 0, 0, 0],
    hats:  [1, 0, 0, 1, 0, 0, 1, 0]
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

    console.log('step: ', step);

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

  // init object
  this.init();
};
