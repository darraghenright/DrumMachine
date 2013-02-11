/*jshint globalstrict: true */
/*global Sequencer: true */
/*global Sound: true */
/*global $: true */

'use strict';

/**
 * Invoke
 */
(function() {

  // Create a decent drum module. DrumMachine
  // refactoring... Stepper, Sequencer
  // how do we attach DrumMachine to Sequencer
  // cool stuff, randomise patterns, randomise pitch etc. shuffle

  var seq,
      btn;

  seq = new Sequencer();
  btn = $('#btn-run');

  seq.sounds.kick  = new Sound(110);
  seq.sounds.snare = new Sound(320);
  seq.sounds.hats  = new Sound(10000);

  btn.on('click', function() {
    seq.toggle();
  });
})();