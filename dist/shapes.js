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

    var mouse = new Two.Vector();

    $('#assets svg').each(function(i, el) {
      var shape = two.interpret(el);

      shape.fill = 'white';
      shape.visible = true;
      shape.scale = ((two.width + 100) < 640 ) ? 0.5 : 1;
      shape.noStroke();
      var h_padding = (two.width - (shape.getBoundingClientRect().width * shape.scale)) / 2,
          v_padding = (two.height - (shape.getBoundingClientRect().height * shape.scale)) / 2;
      shape.translation.set(h_padding, v_padding);
      shapes.push(shape);

    });

    _.times(50, function(n) {
      var size = _.random(1,10)
      var dot = two.makeCircle(_.random(0, two.width), _.random(0, two.height), size*2);
      dot.noStroke();
      dot.opacity = parseFloat(size/10);
      dot.velocity = new Two.Vector(dot.opacity * 15 - _.random(15), dot.opacity * 15 - _.random(15));
      dot.fill = 'white';
      dot.rect = dot.getBoundingClientRect();
      dots.push(dot);
    });

    var $window = $(window)
      .bind('mousemove', function(e) {
        mouse.x = two.width / 2 - e.clientX;
        mouse.y = two.height / 2 - e.clientY;
      })
      .bind('touchstart', function() {
        e.preventDefault();
        return false;
      })
      .bind('touchmove', function(e) {
        e.preventDefault();
        var touch = e.originalEvent.changedTouches[0];
        mouse.x = touch.pageX;
        mouse.y = touch.pageY;
        return false;
      });

      var updateDots = function() {
        _.each(dots, function(particle) {

          var w = particle.scale * particle.rect.width / 2;
          var h = particle.scale * particle.rect.height / 2;

          var newVect = mouse.clone()
          newVect.multiplyScalar(0.02).addSelf(particle.velocity).multiplyScalar(0.5)
          particle.translation.addSelf(newVect)


          if (particle.translation.x > two.width) particle.translation.x = 0;
          if (particle.translation.x < 0) particle.translation.x = two.width;
          if (particle.translation.y > two.height) particle.translation.y = 0;
          if (particle.translation.y < 0) particle.translation.y = two.height;

          // if ((particle.translation.x < w && particle.velocity.x < 0)
          //   || (particle.translation.x > two.width - w && particle.velocity.x > 0)) {
          //   particle.velocity.x *= -1;
          // }

          // if ((particle.translation.y < h && particle.velocity.y < 0)
          //   || (particle.translation.y > two.height - h && particle.velocity.y > 0)) {
          //   particle.velocity.y *= -1;
          // }

        });

      };

    length = shapes.length;

    two.bind('resize', function() {

      var shape = shapes[index];
      shape.scale = ((two.width + 100) < 640 ) ? 0.5 : 1;

      var h_padding = (two.width - (shape.getBoundingClientRect(true).width * shape.scale)) / 2,
          v_padding = (two.height - (shape.getBoundingClientRect(true).height * shape.scale)) / 2;
        // console.log(two.width, two.height);

      shape.translation.set(h_padding, v_padding);
    });

    two.bind('update', function(frameCount) {
        updateDots();
      // console.log(two.scene.children.length)


    });

  });
