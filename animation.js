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
    var orangeCount = 4;


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

    // var dot = new Path.Circle({
    //     center: new Point(0, 0),
    //     radius: 0.1,
    //     fillColor: new Color(1, 1, 1, 1)
    // });
    // var dotSymbol = new Symbol(dot);

    // for (var i = 0; i < 4000; i++) {
    //     var center = Point.random() * view.size;
    //     var placed = dotSymbol.place(center);
    //     if(i % 10 == 0){
    //         placed.scale(Math.abs(1 - (i * 0.001)))
    //         // placed.style = new Color(1, 1, 1, 1);
    //     }
    // }

    // var blueDot = new Path.Circle({
    //     center: new Point(0, 0),
    //     radius: .1,
    //     fillColor: new Color(0.29, 0.32, 0.37, 1)
    // });
    // var blueDotSymbol = new Symbol(blueDot);

    // for (var i = 0; i < 10; i++) {
    //     var center = Point.random() * view.size;
    //     var placed = blueDotSymbol.place(center);
    //     // if(i % 10 == 0){
    //     //     placed.scale(Math.abs(1 - (i * 0.001)))
    //     //     // placed.style = new Color(1, 1, 1, 1);
    //     // }
    // }

    // var superBlueDot = new Path.Circle({
    //     center: new Point(0, 0),
    //     radius: 0.3,
    //     fillColor: new Color(0.22, 0.29, 0.55, 1)
    // });
    // var superBlueDotSymbol = new Symbol(superBlueDot);

    // for (var i = 0; i < 1000; i++) {
    //     var center = Point.random() * view.size;
    //     var placed = superBlueDotSymbol.place(center);
    //     // if(i % 10 == 0){
    //     //     placed.scale(Math.abs(1 - (i * 0.001)))
    //     //     // placed.style = new Color(1, 1, 1, 1);
    //     // }
    // }



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

    //================================================================================//
    // real magic                                                                     //
    //================================================================================//


    function onKeyDown(event) {
        if (event.key == 'space') {}
    }

    function onMouseDown(event) {
        // var center = event.point;
        // var placed = whiteStarSymbol.place(center);
        // whiteStarList.push(placed);

        // var starLine = new Path.Line(mouseLoc, center);
        // starLine.strokeColor = 'white';
        // starLine.strokeWidth = 0.3;

        // closestMouseStars.push(starLine);
    }

    function onMouseMove(event) {
        // mouseLoc = event.point;
    }


    window.onresize = redoStars;

    var resizeTimeout = 0;
    function redoStars(event) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(shuffle, 500);
    }

    function onFrame(event) {
        if (event.count == 0) {
            init();
        }
        else if(resizeTimeout != 0 && project.activeLayer.opacity > 0.06){
            project.activeLayer.opacity -= 0.06;
        }

        else if(resizeTimeout == 0 && project.activeLayer.opacity < 1){
            project.activeLayer.opacity += 0.06;
        }

        // move white stars
        for (var i = 0; i < whiteStarList.length; i++) {
            var item = whiteStarList[i];
            if(event.count % 7 == 0){
                // item.position += new Point(item.scaling.x * 0.35, item.scaling.x * -0.01);
                item.translate(new Point(item.scaling.x * 0.35, item.scaling.x * -0.01))
            }
            if (event.count % 10 == 0) {
                flickr(item);
            }
            keepInView(item);
        }
    }


    function flickr(item){
        if (item.opacity >= 0.75 && item.opacity < 1) {
            item.opacity = 1;
        }
        else if (item.opacity == 1) {
            var random = Math.floor(Math.random() * (whiteStarList.length - 1)) + 3;
            if (random % 15 == 0) {
                item.opacity = 0.75;
            }
        }
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

    function shuffle(){
        for (var i = 0; i < blueStarList.length; i++) {
            shuffleOne(blueStarList[i]);
        }
        for (var i = 0; i < whiteStarList.length; i++) {
            shuffleOne(whiteStarList[i]);
        }
        for (var i = 0; i < orangeStarList.length; i++) {
            shuffleOne(orangeStarList[i]);
        }
        resizeTimeout = 0
    }

    function shuffleOne(item){
        item.position = Point.random() * view.size;
    }


    function init() {
        // project.clear();
        // WHITE STAR CREATION
        project.activeLayer.opacity = 0;
        for (var i = 0; i < whiteCount; i++) {
            var center = Point.random() * view.size;
            var placed = whiteStarSymbol.place(center);
            var scale = (i + 1) / whiteCount;
            placed.scale(scale);
            whiteStarList.push(placed);

        }
        // BLUE STAR CREATION
        for (var i = 0; i < blueCount; i++) {
            var center = Point.random() * view.size;
            var placed = blueStarSymbol.place(center);
            var scale = (i + 1) * (blueCount * .02);
            placed.scale(scale);
            blueStarList.push(placed);


        }
        // ORANGE STAR CREATION
        for (var i = 0; i < orangeCount; i++) {
            var center = Point.random() * view.size;
            var placed = orangeStarSymbol.place(center);
            var scale = (i + 1) / orangeCount;
            placed.scale(scale);
            orangeStarList.push(placed);

        }
    }
