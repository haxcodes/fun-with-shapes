$(function() {

    var elem = document.getElementById('draw-animation');

    var two = new Two({
      fullscreen: true,
      autostart: true
    }).appendTo(elem);

    var dimensions = 800;
    var shapes = [];
    var dots = [];
    var index = 0;
    var length = 0;
    var scale = 1;
    var easing = 0.05;
    var init = true;

    $('#assets svg').each(function(i, el) {
      var shape = two.interpret(el);

      shape.fill = 'white';
      shape.visible = true;
      shape.scale = ((two.width + 100) < 640 ) ? 0.5 : 1;
      shape.noStroke();
      var h_padding = (two.width - (shape.getBoundingClientRect().width * shape.scale)) / 2,
          v_padding = (two.height - (shape.getBoundingClientRect().height * shape.scale)) / 2;
        console.log(two.width, two.height);
      shape.translation.set(h_padding, v_padding);
      shapes.push(shape);

    });

    _.times(50, function(n) {
      var dot = two.makeCircle(_.random(0, two.width), _.random(0, two.height), _.random(1,4));
      dot.noStroke();
      dot.opacity = Math.random();
      dot.velocity = new Two.Vector(dot.opacity * 5, dot.opacity * 5);
      dot.fill = 'white';
      dot.rect = dot.getBoundingClientRect();
      dots.push(dot);
    });

    console.log(dots)



    length = shapes.length;

    two.bind('resize', function() {

      var shape = shapes[index];
      shape.scale = ((two.width + 100) < 640 ) ? 0.5 : 1;

      var h_padding = (two.width - (shape.getBoundingClientRect(true).width * shape.scale)) / 2,
          v_padding = (two.height - (shape.getBoundingClientRect(true).height * shape.scale)) / 2;
        console.log(two.width, two.height);

      shape.translation.set(h_padding, v_padding);
    });

    two.bind('update', function(frameCount) {


      var shape = shapes[index];
      shape.scale = ((two.width + 100) < 640 ) ? 0.5 : 1;

      _.each(dots, function(particle) {

          var w = particle.scale * particle.rect.width / 2;
          var h = particle.scale * particle.rect.height / 2;

          particle.translation.addSelf(particle.velocity)

          if ((particle.translation.x < w && particle.velocity.x < 0)
            || (particle.translation.x > two.width - w && particle.velocity.x > 0)) {
            particle.velocity.x *= -1;
          }

          if ((particle.translation.y < h && particle.velocity.y < 0)
            || (particle.translation.y > two.height - h && particle.velocity.y > 0)) {
            particle.velocity.y *= -1;
          }

      });

      console.log(two.scene.children.length)

      // console.log(two.scene.children.length);

    });

  });
