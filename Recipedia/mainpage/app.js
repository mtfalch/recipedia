//Global Initialization
//*******************************************************************//
var navBar = document.getElementById('nav-bar');
var recipesButton = document.getElementById('recipes-button');
var searchButton = document.getElementById('search-button');
var uploadButton = document.getElementById('upload-button');
var settingsButton = document.getElementById('settings-button');

var displayContainer = document.getElementById('display');

var searchField = document.createElement('DIV');
var recipeList = document.createElement('DIV');
var recipeUploadField = document.createElement('DIV');
var recipeInfoField = document.createElement('DIV');
var settingsField = document.createElement('DIV');

var recipeCardsBuffer = [];
    //*******************************************************************//

//Create transistion effect for display update
function refreshDisplayAnimation(refreshHandler){
    displayContainer.style.opacity = '0';
    setTimeout(
        function(){
            refreshHandler();
            displayContainer.style.opacity = '1';
        },
        200
    );
}

//This function is used for handling select event of a selection set with common name
//When the selectedHandler will be applied to the clicked element
//The outsiderHandler will be applied to the rest of the elements
//This function is created to handler nav-bar selections
//Can be used to implement a custom radio button or checkbox field
function utilInjectHandlerToNameSelectionSet(name, selectedHandler, outsiderHandler){
    var nameSet = document.getElementsByName(name);
    var setElement; for(setElement of nameSet){
        setElement.siblings = [];
        var elem; for(elem of nameSet)
            if(!elem.isEqualNode(setElement))
                setElement.siblings.push(elem);
        setElement.onclick = function(){
            selectedHandler(this);
            var outsider; for(outsider of this.siblings)
                outsiderHandler(outsider);
        }
    }
}

//Universal function for creating a displayContainer
//fitting field cards for a htmlElement
function utilCreateField(htmlElement){
    htmlElement.className = 'mg d15 w14 screen h13 elevate-3 center';
    htmlElement.style.overflowY = 'scroll';

    //htmlElement.scrollPosition = 0;

    return htmlElement;
}

function utilAddTagToElement(element, tagName, color){
    var tag = document.createElement('DIV');
    tag.classList.add('tag');
    tag.innerHTML = tagName;
    tag.style.color = color;
    tag.style.border = '2px solid ' + color;
    element.appendChild(tag);
}

function initialiseNavBar(){
    recipesButton.style.cursor = 'pointer';
    searchButton.style.cursor = 'pointer';
    uploadButton.style.cursor = 'pointer';
    settingsButton.style.cursor = 'pointer';

    recipesButton.classList.add('animative');
    searchButton.classList.add('animative');
    uploadButton.classList.add('animative');
    settingsButton.classList.add('animative');

    recipesButton.associatedElement = recipeList;
    searchButton.associatedElement = searchField;
    uploadButton.associatedElement = recipeUploadField;
    settingsButton.associatedElement = settingsField;

    utilInjectHandlerToNameSelectionSet(
        'nav',
        function(elem){
            elem.style.backgroundColor = '#00DAA7';
            elem.style.color = '#FFFFFF';
            location.href = location.href.split('#')[0] + '#' + elem.getAttribute('href');
            updateDisplayPage(elem.associatedElement);
        },
        function(elem){
            elem.style.backgroundColor = '#FFFFFF';
            elem.style.color = '#4D4D4D';
        }
    );
}

//Initialise the searchField element
function createSearchField(){
    var field = utilCreateField(searchField);
    var innerBox = TE.fetchTemplate('innerBox');
    field.appendChild(innerBox);
}

//Initialise the recipeList
function createRecipeList(){
    recipeList.classList.add('mg');
    recipeList.style.overflowY = 'scroll';
    recipeList.scrollPosition = 0;
}

function createRecipeUploadField(){
    var field = utilCreateField(recipeUploadField);
}

function createRecipeInfoField(){
    var field = utilCreateField(recipeInfoField);
}

function createSettingsField(){
    var field = utilCreateField(settingsField);
}

//Add a new recipe element to the recipeListBuffer
function createRecipeCards(count){
    var i; for(i = 0; i < count; i++){
        var container = TE.fetchTemplate('recipeCard');
        var likeButton = container.children[1].children[1];
        var dislikeButton = container.children[1].children[2];
        likeButton.onclick = function(){
            var dishID  = 
                this.parentElement
                    .parentElement
                    .dishID;
            //AJAX Post (userID, dishID, Like)
            alert('like:' + dishID);
        }
        dislikeButton.onclick = function(){
            var dishID  = 
                this.parentElement
                    .parentElement
                    .dishID;
            //AJAX Post (userID, dishID, Like)
            alert('dislike:' + dishID);
        }
        recipeCardsBuffer.push(container);
    }
}

function createNewSearchCheckListItem(itemName){
    var checkListItem = TE.fetchTemplate('checkListItem');
    checkListItem.itemName = itemName;
    checkListItem.checked = false;
    checkListItem.children[1].innerHTML = itemName;
    checkListItem.onclick = function(){
        if(!this.checked){
            this.checked = true;
            this.children[0].children[0].innerHTML = 'clear';
            this.style.backgroundColor = '#00DAA7';
            this.style.color = '#FFF';
            return;
        }
        this.checked = false;
        this.children[0].children[0].innerHTML = 'add';
        this.style.backgroundColor = '#FFF';
        this.style.color = '#4D4D4D';
    }
    searchField.children[0].appendChild(checkListItem);
}

function renderRecipeList(recipes, renderCount){
    recipeList.innerHTML = "";
    var i; for(i = 0; i < renderCount; i++){
        var recipe = recipes[i];
        var container = recipeCardsBuffer[i];
        container.dishID = recipe.dishID;
        var imageField = container.children[0];
        var bottomBar = container.children[1];
        var tagBar = container.children[2];
        var titleTextField = bottomBar.children[0].children[0];
        titleTextField.innerHTML = recipe.title;

        imageField.children[0].children[0].src = recipe.imgUrl ? recipe.imgUrl : '';

        var tag; for(tag of recipe.tags)
            utilAddTagToElement(tagBar.children[0], tag.name, tag.color);

        recipeList.appendChild(container);
    }
}

function updateDisplayPage(newPageElement){
    refreshDisplayAnimation(function(){
        var currentNode = displayContainer.childNodes[0];
        currentNode.scrollPosition = currentNode.scrollTop;
        displayContainer.innerHTML = "";
        displayContainer.appendChild(newPageElement);
        newPageElement.scrollTop = newPageElement.scrollPosition;
    });
}

TE.globalInitialise(
    'templates.html', 
    function(){
        //Scripting Starts Here
        initialiseNavBar();
        createSearchField();
        createRecipeList();
        createRecipeInfoField();
        createRecipeUploadField();
        createSettingsField();
        createRecipeCards(10);

        renderRecipeList(
            [
                {dishID: 0, title: "Scrambled Eggs", tags : [{name:'Beef', color:'lightblue'}], imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'},
                {dishID: 1, title: "Scrambled Eggs", tags : [{name:'Beef', color:'lightblue'}], imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'},
                {dishID: 3, title: "Crab Eggs", tags : [{name:'Crab', color:'pink'}], imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'}
            ], 3);

    }
);
