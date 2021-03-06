/*jshint globalstrict: true */
/*global webkitAudioContext: true */

'use strict';

/**
 * Wave
 *  Some waveform consts
 */
var Wave = {
  SINE: 0,
  SQUARE: 1,
  SAW: 2,
  TRIANGLE: 3
};

/**
 * Sound
 *
 * A very basic sound module (for now)
 */
var Sound = (function() {

  var a,
      v;

  a = new webkitAudioContext();
  v = a.createGainNode();

  v.connect(a.destination);
  v.gain.value = 0.1;

  return function(hz, wf, ms) {

    hz = hz || 440;
    wf = wf || Wave.SINE;
    ms = ms || 40;

    this.play = function() {

      var o = a.createOscillator();

      o.type = wf;
      o.frequency.value = hz;

      o.connect(v);
      o.noteOn(0);

      setTimeout(function() {
        o.noteOff(0);
      }, ms);
    };
  };
})();
