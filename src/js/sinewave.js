import { CanvasSpace, Form, Line, Const } from 'ptjs';

//// 1. Define Space and Form
var colors = {
  a1: '#ff2d5d', a2: '#42dc8e', a3: '#2e43eb', a4: '#ffe359',
  b1: '#96bfed', b2: '#2E2520', b3: '#f1f3f7', b4: '#e2e6ef'
};
var space = new CanvasSpace('pt').setup( {bgcolor: colors.b2} );
var form = new Form( space );


//// 2. Create Elements
var line = new Line( 0, space.size.y / 2).to( space.size.x, space.size.y / 2);
var steps = 100;
var amp = Math.min( space.size.x, space.size.y ) / 2;
var angle = 0;


//// 3. Visualize, Animate, Interact
space.add({
  animate: function(time, fps, context) {

    // for each step, draw a perpendicular line on the path, whose length is derived from a sine wave.
    for (var i=0; i<steps; i++) {
      var t = i/steps;
      var ln = line.getPerpendicular( t, Math.sin( t*2.3*Const.two_pi + (window.scrollY * 0.008 + 0.8) )* amp );
      var ln2 = line.getPerpendicular( t+0.5/steps, Math.cos( t*2.3*Const.two_pi - (window.scrollY * 0.008) )* amp );
      form.stroke(colors.a1).line( ln );
      form.stroke(colors.a3).line( ln2 );
    }
  }
});


// 4. Start playing
space.play();