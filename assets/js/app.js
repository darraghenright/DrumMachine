/*jshint globalstrict: true */
/*global Sequencer: true */
/*global Sound: true */
/*global Wave: true */
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
  var seq,
      btnToggle,
      btnReset;

  seq = new Sequencer();

  seq.sounds.kick  = new Sound(80,   Wave.SINE, 100);
  seq.sounds.snare = new Sound(320,  Wave.TRIANGLE);
  seq.sounds.hats  = new Sound(8000, Wave.SQUARE);

  btnToggle = $('#btn-toggle');
  btnReset  = $('#btn-reset');

  btnToggle.on('click', function() {
    seq.toggle();
  });

  btnReset.on('click', function() {
    seq.reset();
  });

  $('#step').on('step', function(e, step) {
    $(this).text(step);
  });

})();