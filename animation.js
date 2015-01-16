    // general variables
    var closestMouseStars = [];
    var mouseLoc = new Point(-100, -100);

    // white star variables
    var whiteStarList = []
    var whiteCount = 80;

    // blue star variables
    var blueStarList = []
    var blueCount = 5;

    // red star variables
    var orangeStarList = []
    var orangeCount = 3;


//================================================================================//
// white stars                                                                    //
//================================================================================//
    var whitePath = new Path.Circle({
        center: new Point(0, 0),
        radius: 13,
        fillColor: 'white'
    });

    var c = 'white';
    var c2 = new Color(1, 1, 1, 0.1);
    var c3 = new Color(0.15, 0.13, 0.27, 0.0);

    whitePath.fillColor = {
        gradient: {
            stops: [
                [c, 0.01],
                [c2, 0.1],
                [c3, 1]
            ],
            radial: true
        },
        origin: whitePath.bounds.center,
        destination: whitePath.bounds.rightCenter,
    };

    var whiteStarSymbol = new Symbol(whitePath);


    // WHITE STAR CREATION
    for (var i = 0; i < whiteCount; i++) {
        var center = Point.random() * view.size;
        var placed = whiteStarSymbol.place(center);
        var scale = (i + 1) / whiteCount;
        placed.scale(scale);
        whiteStarList.push(placed);

        var starLine = new Path.Line(mouseLoc, center);
        starLine.strokeColor = new Color(1, 1, 1, 0);
        starLine.strokeWidth = 0.3;

        closestMouseStars.push(starLine);

        placed.onFrame = function(event) {
            if (event.count % 5 == 0) {
                for (var i = 0; i < whiteStarList.length; i++) {
                    var item = whiteStarList[i];
                    if (item.opacity == 0.8) {
                        item.opacity = 1;
                    } else {
                        var random = Math.floor(Math.random() * (whiteStarList.length - 1)) + 3;
                        // console.log(random)
                        // console.log(random)
                        if (i % random == 0 || i == 0) {
                            item.opacity = 0.8;
                        }
                    }
                }
            }
        }
    }


    var dot = new Path.Circle({
        center: new Point(0, 0),
        radius: 0.1,
        fillColor: new Color(1, 1, 1, 0.7)
    });
    var dotSymbol = new Symbol(dot);

    for (var i = 0; i < 3400; i++) {
        var center = Point.random() * view.size;
        var placed = dotSymbol.place(center);
        if(i % 10 == 0){
            placed.scale(Math.abs(1 - (i * 0.001)))
            // placed.style = new Color(1, 1, 1, 1);
        }
    }



//================================================================================//
// blue stars                                                                     //
//================================================================================//
    var bluePath = new Path.Circle({
        center: new Point(0, 0),
        radius: 43,
        fillColor: 'white'
    });

    // dull blue
    var c4 = new Color(0.23, 0.22, 0.55, 0.3);
    var c5 = new Color(0.23, 0.22, 0.55, 0.1);
    var c6 = new Color(0.15, 0.13, 0.27, 0.0);

    bluePath.fillColor = {
        gradient: {
            stops: [
                [c4, 0.01],
                [c5, 0.3],
                [c6, 0.7]
            ],
            radial: true
        },
        origin: bluePath.bounds.center,
        destination: bluePath.bounds.rightCenter,
    };

    var blueStarSymbol = new Symbol(bluePath);



    for (var i = 0; i < blueCount; i++) {
        var center = Point.random() * view.size;
        var placed = blueStarSymbol.place(center);
        var scale = (i + 1) * (blueCount * .02);
        placed.scale(scale);
        blueStarList.push(placed);

    }





//================================================================================//
// orange stars                                                                   //
//================================================================================//

    var orangePath = new Path.Circle({
        center: new Point(0, 0),
        radius: 20,
        fillColor: 'white'
    });

    // dull orange
    var c7 = new Color(0.8, 0.69, 0.45, 0.4);
    var c8 = new Color(0.8, 0.69, 0.45, 0.1);
    var c9 = new Color(0.15, 0.13, 0.27, 0.0);

    orangePath.fillColor = {
        gradient: {
            stops: [
                [c7, 0.0],
                [c8, 0.3],
                [c9, 0.7]
            ],
            radial: true
        },
        origin: orangePath.bounds.center,
        destination: orangePath.bounds.rightCenter,
    };

    var orangeStarSymbol = new Symbol(orangePath);



    for (var i = 0; i < orangeCount; i++) {
        var center = Point.random() * view.size;
        var placed = orangeStarSymbol.place(center);
        var scale = (i + 1) / orangeCount;
        placed.scale(scale);
        orangeStarList.push(placed);

    }

//================================================================================//
// real magic                                                                     //
//================================================================================//


    function onKeyDown(event) {
        if (event.key == 'space') {
        }
    }

    function onMouseDown(event){
        var center = event.point;
        var placed = whiteStarSymbol.place(center);
        whiteStarList.push(placed);

        var starLine = new Path.Line(mouseLoc, center);
        starLine.strokeColor = 'white';
        starLine.strokeWidth = 0.3;

        closestMouseStars.push(starLine);
    }

    function onMouseMove(event) {
        mouseLoc = event.point;
    }

    function onFrame(event) {

        // white stars
        for (var i = 0; i < whiteStarList.length; i++) {
            var item = whiteStarList[i];
            item.position += new Point(item.scaling.x * 0.32, 0.0);
            keepInView(item);
        }

        var threshold = 150;
        for (var j = 0, originalLength = closestMouseStars.length; j < originalLength; j++) {
            var line = closestMouseStars[j];
            line.sendToBack();
            line.segments[0].point = whiteStarList[j].position;
            line.segments[1].point = mouseLoc;
            var xDistance = Math.abs(line.segments[0].point.x - line.segments[1].point.x);
            var yDistance = Math.abs(line.segments[0].point.y - line.segments[1].point.y);
            if(xDistance > threshold || yDistance > threshold){
                line.opacity = 0;
            } else {
                line.opacity = 1;
                var distanceAlpha = 1 - ((xDistance + yDistance) * .007)
                var distanceColor = new Color(1, 1, 1, distanceAlpha);
                line.strokeColor = distanceColor;

                // console.log(endAlpha)
                // line.strokeColor = {
                //     gradient: {
                //         stops: [
                //             ['white', 0.0],
                //             [end, 0.5]
                //         ],
                //         origin: line.segments[0].point,
                //         destination: line.segments[1].point
                //     },
                //     origin: orangePath.bounds.center,
                //     destination: orangePath.bounds.rightCenter,
                // };
                // line.strokeColor = end;
            }
        }

        // // blue stars
        // for (var i = 0; i < blueStarList.length; i++) {
        //     var item = blueStarList[i];
        //     item.position += new Point(0.02, 0.0);
        //     keepInView(item);
        // }

        // // // red stars
        // for (var i = 0; i < orangeStarList.length; i++) {
        //     var item = orangeStarList[i];
        //     item.position += new Point(.03, 0.0);
        //     keepInView(item);
        // }
    }

    function keepInView(item) {
        var position = item.position;
        var itemBounds = item.bounds;
        var bounds = view.bounds;
        if (itemBounds.left > bounds.width) {
            position.x = -item.bounds.width;
        }

        if (position.x < -itemBounds.width) {
            position.x = bounds.width + itemBounds.width;
        }

        if (itemBounds.top > view.size.height) {
            position.y = -itemBounds.height;
        }

        if (position.y < -itemBounds.height) {
            position.y = bounds.height + itemBounds.height / 2;
        }
    }
