    // The amount of symbol we want to place;
    var count = 100;
    var starList = []
    var userStarList = []
    var lineHash = {}
    tool.minDistance = 200;

    // Create a symbol, which we will use to place instances of later:
    var path = new Path.Circle({
        center: new Point(0, 0),
        radius: 13,
        fillColor: 'white'
    });

    // bright white
    var c = 'white';
    var c2 = new Color(1, 1, 1, 0.1);
    var c3 = new Color(0.15, 0.13, 0.27, 0.0);

    path.fillColor = {
        gradient: {
            stops: [
                [c, 0.01],
                [c2, 0.1],
                [c3, 1]
            ],
            radial: true
        },
        origin: path.bounds.center,
        destination: path.bounds.rightCenter,
    };

    var symbol = new Symbol(path);

    var path2 = new Path.Circle({
        center: new Point(0, 0),
        radius: 13,
        fillColor: 'white'
    });

    // dull blue
    var c4 = new Color(0.23, 0.22, 0.55, 0.3);
    var c5 = new Color(0.23, 0.22, 0.55, 0.1);
    var c6 = new Color(0.15, 0.13, 0.27, 0.0);

    path2.fillColor = {
        gradient: {
            stops: [
                [c4, 0.01],
                [c5, 0.3],
                [c6, 0.7]
            ],
            radial: true
        },
        origin: path.bounds.center,
        destination: path.bounds.rightCenter,
    };

    var symbol2 = new Symbol(path2);

    var path3 = new Path.Circle({
        center: new Point(0, 0),
        radius: 13,
        fillColor: 'white'
    });

    // dull orange
    var c7 = new Color(0.8, 0.69, 0.45, 0.5);
    var c8 = new Color(0.8, 0.69, 0.45, 0.2);
    var c9 = new Color(0.15, 0.13, 0.27, 0.0);

    path3.fillColor = {
        gradient: {
            stops: [
                [c7, 0.0],
                [c8, 0.3],
                [c9, 0.7]
            ],
            radial: true
        },
        origin: path.bounds.center,
        destination: path.bounds.rightCenter,
    };

    var symbol3 = new Symbol(path3);

    for (var i = 0; i < count; i++) {

        if (i % (count * 0.2) == 0) {
            var center = Point.random() * view.size;
            var placed = symbol2.place(center);
            var scale = (Math.random() * (0.5)) + 1;
            console.log(i)
        }
        if (i % (count * 0.9) == 0) {
            var center = Point.random() * view.size;
            var placed = symbol3.place(center);
            var scale = (Math.random() * (0.5)) + 1;
            console.log(i)
        } else {
            var center = Point.random() * view.size;
            var placed = symbol.place(center);
            var scale = (i + 1) / count;
        }
        placed.scale(scale);

        starList.push(placed);

        placed.onFrame = function(event) {
            if (event.count % 5 == 0) {
                for (var i = 0; i < starList.length; i++) {
                    var item = starList[i];
                    if (item.opacity == 0.8) {
                        item.opacity = 1;
                    } else {
                        var random = Math.floor(Math.random() * (starList.length - 1)) + 3;
                        // console.log(random)
                        // console.log(random)
                        if (i % random == 0 || i == 0) {
                            item.opacity = 0.8;
                        }
                    }
                }
            }
        }

        placed.onMouseEnter = function(event) {
            this.scale(1.5);
        }
    }

    function onKeyDown(event) {
        if (event.key == 'space') {}
    }

    // function onMouseDown(event) {
    //     var clickStar = symbol.place(event.point);
    //     clickStar.scale(2);
    //     userStarList.push(clickStar);
    //     for (var i = 0 ; i < userStarList.length; i++) {
    //         var item = userStarList[i];
    //         var threshold = 100;
    //         for (var j = i + 1; j < userStarList.length; j++) {
    //             if (Math.abs(clickStar.position.y - userStarList[j].position.y) < threshold && 
    //                 Math.abs(clickStar.position.x - userStarList[j].position.x) < threshold){

    //                 var line = new Path.Line( clickStar.position, userStarList[j].position ) ;
    //                 line.strokeColor = new Color(.9, .9, .9, .9);
    //                 line.strokeWidth = 1;
    //                 line.smooth();
    //             } else{
    //                 console.log(lineHash);
    //                 // console.log(lineHash.j);
    //             }
    //     }
    // }

    function onMouseMove(event) {
        // if(userStarList.length == 0){
        //     userStarList.push('0');
        // } else {
        //     var clickStar = symbol.place(event.point);
        //     clickStar.scale((Math.random() * 2) + 1);
        //     userStarList.push(clickStar);
        //     var threshold = 2000;
        //     if (Math.abs(clickStar.position.y - userStarList[userStarList.length-2].position.y) < threshold && 
        //         Math.abs(clickStar.position.x - userStarList[userStarList.length-2].position.x) < threshold){

        //         var line = new Path.Line( clickStar.position, userStarList[userStarList.length-2].position ) ;
        //         line.strokeColor = new Color(.9, .9, .9, .05);
        //         line.strokeWidth = 1;
        //         line.smooth();
        //     } else{
        //         console.log(nothin);
        //     }
        // }

    }

    function onFrame(event) {

        for (var i = 0; i < starList.length; i++) {
            var item = starList[i];
            item.position += new Point(item.scaling.x * 0.02, 0.0);
            keepInView(item);
        }

        // for (var i = 0; i < userStarList.length; i++) {
        //     var item = userStarList[i];
        //     item.position += new Point(item.scaling.x * 0.08,0.0);
        //     keepInView(item);
        // }

        // if(event.count % 5 == 0){
        //     for (var i = 0; i < starList.length; i++) {
        //         var item = starList[i];
        //         var random = Math.floor(Math.random() * (3)) + 2;
        //         if(i % random == 0 || i == 0){
        //             if(item.opacity == 0.9){
        //                 item.opacity = 1;
        //             } else {
        //                 item.opacity = 0.9;
        //             }
        //         }
        //     }
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
