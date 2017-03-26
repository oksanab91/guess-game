
var dynamicgroup = undefined;
var hiddengroup = undefined;
var answergroup = undefined;
var answertxt = undefined;
var btTower = document.getElementById("buttonTower");
var btQueen = document.getElementById("buttonQueen");
var btKing = document.getElementById("buttonKing");
var i = 0;

var guessPlace = function () {

    var classtower = "glyphicon glyphicon-tower";
    var classqueen = "glyphicon glyphicon-queen";
    var classking = "glyphicon glyphicon-king";

    hiddengroup = document.getElementById("hide-group");
    dynamicgroup = document.getElementById("dynamic-group");
    answergroup = document.getElementById("result-group");
    answertxt = document.getElementById("guessanswer");
    answertxt.innerHTML = "Where is the Queen?";

    dynamicgroup.style.visibility = 'visible';
    hiddengroup.style.visibility = 'hidden';
    answergroup.style.visibility = 'hidden';
    //answertxt.style.visibility = 'hidden';

    //var btTower = document.getElementById("buttonTower");
    //var btQueen = document.getElementById("buttonQueen");
    //var btKing = document.getElementById("buttonKing");
    var bt = null;

    swapTimer(bt, 5);

};

var swapButtons = function (bt) {
    if (dynamicgroup != undefined) {
        var btNew = bt.cloneNode(true);
        dynamicgroup.removeChild(bt);
        dynamicgroup.appendChild(bt);
    }    
};



var swapTimer = function (bt, i) {
    
    setTimeout(function () {
        
        if (i --) {
            switch (i) {
                case 1:
                    bt = btTower;
                    break;
                case 2:
                    bt = btQueen;
                    break;
                case 3:
                    bt = btKing;
                    break;
                case 4:
                    bt = btTower;
                    break;
                default:
                    break;
            }

            swapButtons(bt);
            swapTimer(bt, i);
        }
        else {
            hideButtons();
        }
    }, 1000);

};

var hideButtons = function () {

    dynamicgroup.style.visibility = 'hidden';
    hiddengroup.style.visibility = 'visible';    
    answergroup.style.visibility = 'visible';

    //var btnId = "buttonTower";
    //bt = document.createElement("button")
    //bt.className = "btn btn-warning";
    //bt.id = btnId;
    ////bt.innerHTML = "<button type='button' class='btn btn-default'></button> id='" + btnId  + "'";
    //bt.textContent = "         ";

    //dynamicgroup.removeChild(btTower);
    //dynamicgroup.appendChild(bt);
};

var getAnswer = function (data) {
    if (data.id = "btnQueen") {
        answertxt = document.getElementById("guessanswer");
        answertxt.innerHTML = "Congratulations! You won!";        
    } else {
        answertxt.innerHTML = "Nice try! But Queen is in another place!";
    }
    hiddengroup.style.visibility = 'hidden';
}
