/*jshint globalstrict: true */
/*global Sequencer: true */
/*global Sound: true */
/*global $: true */

'use strict';

/**
 * Run application!
 */
(function() {

  // Create a decent drum module. DrumMachine
  // how do we attach DrumMachine to Sequencer
  // cool stuff, randomise patterns, randomise pitch etc. shuffle

  // declare
  var seq, btn;

  // assign
  seq = new Sequencer();
  btn = $('#btn-run');

  // add some crude sounds
  seq.sounds.kick  = new Sound(110);
  seq.sounds.snare = new Sound(320);
  seq.sounds.hats  = new Sound(10000);

  // btn click handler
  btn.on('click', function() {
    seq.toggle();
  });
})();