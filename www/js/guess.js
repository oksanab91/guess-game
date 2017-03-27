
//Create by Blagutin O. on 2017-03-26

//Display buttons with pictures
var dynamicgroup = undefined;
//Display buttons for guessing
var answergroup = undefined;
//Display messages
var resultgroup = undefined;
//Display the result of the game
var answertxt = undefined;
//html dynamic group original appearance
var originButtonsSetting = undefined;

//Which button to swith in each try
var startRandomButton = 0;

//Buttons in html dynamic-group
var btTower = undefined;
var btQueen = undefined;
var btKing = undefined;

//Initialization
var init = function () {
 
    //html dynamic group original appearance
    var group = document.getElementById("dynamic-group");
    originButtonsSetting = group.innerHTML;

    //Buttons in html dynamic-group
    btTower = document.getElementById("buttonTower");
    btQueen = document.getElementById("buttonQueen");
    btKing = document.getElementById("buttonKing");

    startRandomButton = 0;
};

//Run the game - swap the buttons
var guessPlace = function () {

    //Set the groups of the html elements and their properties
    answergroup = document.getElementById("answer-group");
    dynamicgroup = document.getElementById("dynamic-group");
    resultgroup = document.getElementById("result-group");    

    //Reset html dynamic group
    dynamicgroup.innerHTML = originButtonsSetting;

    //Buttons of html dynamic-group
    btTower = document.getElementById("buttonTower");
    btQueen = document.getElementById("buttonQueen");
    btKing = document.getElementById("buttonKing");

    answertxt = document.getElementById("guessanswer");
    answertxt.innerHTML = "";
    
    dynamicgroup.style.visibility = 'visible';
    answergroup.style.visibility = 'hidden';
    resultgroup.style.visibility = 'hidden';
      
    //Start timer and swapping the buttons
    var randomCount = Math.floor((Math.random() * 10) + 1);
    if (randomCount < 3) {
        randomCount = 3;
    }
    //Prevent full circule
    if (3 - (randomCount % 3) === 1) {
        randomCount++;
    }
    var bt = null;
    swapTimer(bt, randomCount); 

    //Increase the ind for the next button to swith in each try
    startRandomButton++;
};

//Swap the buttons in the html dynamic-group 
var swapButtons = function (bt) {
    if (dynamicgroup != undefined) {
        //var btNew = bt.cloneNode(true);        
        try {
            dynamicgroup.removeChild(bt);
            dynamicgroup.appendChild(bt);
        } catch (e) {
            console.log(e.message);
        }        
    }    
};

//Timer and swapping buttons in the html dynamic-group
//Each third try the pattern to choose the button is changed
var swapTimer = function (bt, i) {
    
    setTimeout(function () {
       
        //Set the button to move
        if (i--) {
            var ind = i < 3 ? i : (i % 3);

            switch (ind) {
                case 0:
                    if ((startRandomButton % 3) === 0)
                    { bt = btTower; }
                    else if ((startRandomButton % 3) === 1)
                    { bt = btKing; }
                    else
                    { bt = btQueen; }

                    break;
                case 1:
                    if ((startRandomButton % 3) === 0)
                    { bt = btKing; }
                    else if ((startRandomButton % 3) === 1)
                    { bt = btQueen; }
                    else
                    { bt = btTower; }

                    break;
                case 2:
                    if ((startRandomButton % 3) === 0)
                    { bt = btQueen; }
                    else if ((startRandomButton % 3) === 1)
                    { bt = btTower; }
                    else
                    { bt = btKing; }

                    break;                
                default:
                    break;
            }

            //Swap the button with another
            if (bt != null) {
                swapButtons(bt);
                swapTimer(bt, i);
            }
        }
        else {
            //If completed, hide the html dynamic-group
            hideButtons();
        }
    }, 500);

};

//Hide and display html groups
var hideButtons = function () {

    dynamicgroup.style.visibility = 'hidden';
    answergroup.style.visibility = 'visible';    
    resultgroup.style.visibility = 'visible';
    answertxt.innerHTML = "Where is the Queen?";
};

//Check the answer
var getAnswer = function (btnData) {
   
    var queenInd = findItemNode(btQueen);

    //Compare Queen button id with the selected answer button
    //The answer is correct
    if (queenInd + 1 === parseInt(btnData.id)) {        
        answertxt.innerHTML = "Congratulations! You won!";
    //The answer is incorrect
    } else {
        answertxt.innerHTML = "Nice try! But the Queen is in another place";
    }

    //Set global index
    lastResultInd = queenInd;

    //Hide buttons and not relevant messages
    answergroup.style.visibility = 'hidden';
    resultgroup.style.visibility = 'hidden';
};

//Return current index of the node (button) 
var findItemNode = function (node) {    
    var itemIndex = 0;
    var i = 0;

    while (i < dynamicgroup.children.length && itemIndex === 0) {
        if (dynamicgroup.children.item(i) === node) {
            itemIndex = i;
        }
        i++;
    }
    
    return itemIndex;
}
