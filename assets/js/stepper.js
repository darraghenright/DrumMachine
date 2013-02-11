/*jshint globalstrict: true */
/*jshint browser: true */

'use strict';

/**
 * Stepper
 */
var Stepper = function() {


  this.isRunning = false;

  this.timeout = false;

  this.listener = null;

  this.ms = 125;

  this.steps = {
    current: 0,
    total: 8
  };

  this.current = function() {
    return this.steps.current;
  };

  this.total = function() {
    return this.steps.total;
  };

  this.next = function() {
    this.steps.current++;
  };

  this.reset = function() {
    this.steps.current = 0;
  };

  this.start = function() {

    var self = this;

    function timer() {
      self.step();
      self.timeout = setTimeout(timer, self.ms);
    }

    this.isRunning = true;
    timer();
  };

  this.stop = function() {
    this.isRunning = false;
    clearTimeout(this.timeout);
  };

  this.step = function() {
    if (this.complete()) {
      this.reset();
    }

    this.notify(this.current());
    this.next();
  };

  this.complete = function() {
    return this.current() === this.total();
  };

  this.attach = function(listener) {
    this.listener = listener;
  };

  this.notify = function(step) {
    this.listener.update(step);
  };
};