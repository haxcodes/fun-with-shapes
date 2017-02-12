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
      var h_padding = (two.width - (shape.getBoundingClientRect(true).width * shape.scale)) / 2,
          v_padding = (two.height - (shape.getBoundingClientRect(true).height * shape.scale)) / 2;
      shape.translation.set(h_padding, v_padding);
      shapes.push(shape);

    });

    var addDots = function(num) {
      dots = [];
      _.times(num, function(n) {
        var size = _.random(1,10)
        var dot = two.makeCircle(_.random(0, two.width), _.random(0, two.height), size*20);
        dot.noStroke();
        dot.opacity = parseFloat(size/20);
        dot.velocity = new Two.Vector(dot.opacity * 15 - _.random(15), dot.opacity * 15 - _.random(15));
        dot.fill = 'white';
        dot.rect = dot.getBoundingClientRect();
        console.log(dot);
        dots.push(dot);
      });
    };

    addDots(15);

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
        _.each(dots, function(dot) {

          var w = dot.scale * dot.rect.width / 2;
          var h = dot.scale * dot.rect.height / 2;

          var newVect = mouse.clone()
          newVect.multiplyScalar(0.02).addSelf(dot.velocity).multiplyScalar(0.1)
          dot.translation.addSelf(newVect)


          if (dot.translation.x - dot.rect.width > two.width) dot.translation.x = 0 - dot.rect.width;
          if (dot.translation.x + dot.rect.width < 0) dot.translation.x = two.width + dot.rect.width;
          if (dot.translation.y - dot.rect.height > two.height) dot.translation.y = 0 - dot.rect.height;
          if (dot.translation.y + dot.rect.height < 0) dot.translation.y = two.height + dot.rect.height;

          // if ((dot.translation.x < w && dot.velocity.x < 0)
          //   || (dot.translation.x > two.width - w && dot.velocity.x > 0)) {
          //   dot.velocity.x *= -1;
          // }

          // if ((dot.translation.y < h && dot.velocity.y < 0)
          //   || (dot.translation.y > two.height - h && dot.velocity.y > 0)) {
          //   dot.velocity.y *= -1;
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
