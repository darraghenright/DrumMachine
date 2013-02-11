/*jshint globalstrict: true */
/*jshint browser: true */

'use strict';

/**
 * Stepper
 */
var Stepper = function() {

  /**
   * isRunning
   * @type {Boolean}
   */
  this.isRunning = false;

  /**
   * timeout
   * @type {Number}
   */
  this.timeout = -1;

  /**
   * listener
   * @type {Object}
   */
  this.listener = null;

  /**
   * ms
   * @type {Number}
   */
  this.ms = 125;

  /**
   * steps
   * @type {Object}
   */
  this.steps = {
    current: 0,
    total: 8
  };

  /**
   * current()
   * Return current step count
   * @return {Number}
   */
  this.current = function() {
    return this.steps.current;
  };

  /**
   * total()
   * Return total step count
   * @return {Number}
   */
  this.total = function() {
    return this.steps.total;
  };

  /**
   * next()
   * Increment current step counter
   */
  this.next = function() {
    this.steps.current++;
  };

  /**
   * reset()
   * Reset current step counter to zero
   */
  this.reset = function() {
    this.steps.current = 0;
  };

  /**
   * start()
   * Run timer and execute steps
   */
  this.start = function() {

    var self = this;

    function timer() {
      self.step();
      self.timeout = setTimeout(timer, self.ms);
    }

    this.isRunning = true;
    timer();
  };

  /**
   * stop()
   * Stop timer
   */
  this.stop = function() {
    this.isRunning = false;
    clearTimeout(this.timeout);
  };

  /**
   * step()
   * Reset completed measure
   * Notify attached sequencer
   * Increment step counter
   */
  this.step = function() {
    this.complete() && this.reset();
    this.notify(this.current());
    this.next();
  };

  /**
   * complete()
   * Check if a measure is complete
   * @return {Boolean}
   */
  this.complete = function() {
    return this.current() === this.total();
  };

  /**
   * attach()
   * Attach a step listener
   * @param  {Object} listener
   */
  this.attach = function(listener) {
    if (!listener.update) {
      throw {
        name:    'StepperAttachException',
        message: 'Listener does not have an "update" method!'
      };
    }

    this.listener = listener;
  };

  /**
   * notify()
   * Notify a step listener
   * @param  {Number} step
   */
  this.notify = function(step) {
    this.listener.update(step);
  };
};
