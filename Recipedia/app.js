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

function utilArrayToggleValue(arr, val){
    if(!arr.includes(val)){
        arr.push(val);
        return;
    }
    arr.splice(arr.indexOf(val), 1);
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
    htmlElement.className = 'mg d15 w14 screen h13 elevate-3 center border-3';
    htmlElement.style.overflowY = 'scroll';
    htmlElement.style.backgroundColor = '#FFF';

    htmlElement.scrollPosition = 0;

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
    field.currentTags = [];
    var searchAlgorithmButton = TE.fetchTemplate('search');
    searchAlgorithmButton.classList.add('click-effect');
    searchAlgorithmButton.children[0].children[0].innerHTML = 'publish';
    searchAlgorithmButton.children[1].innerHTML = 'Search with Selected Ingredients';
    searchAlgorithmButton.style.color = '#FFF';
    searchAlgorithmButton.style.backgroundColor = '#00B58B';
    searchAlgorithmButton.onclick = function(){
        recipesButton.onclick();
    }
    var innerBox = TE.fetchTemplate('innerBox');
    innerBox.appendChild(searchAlgorithmButton);
    field.appendChild(innerBox);

    createCollapsible(searchField.children[0], 'Meat');
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
        container.style.backgroundColor = '#FFF';
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

function renderCheckList(parent, json){

}

function createCollapsible(parent, title){
    var collapsible = TE.fetchTemplate('collapsible');
    var toggle = collapsible.children[0];
    var body = collapsible.children[1];
    createCheckListItem(body, 'Beef');
    createCheckListItem(body, 'Chicken');
    createCheckListItem(body, 'Ham');
    createCheckListItem(body, 'Salmon');
    createCheckListItem(body, 'Tuna');
    
    toggle.children[1].innerHTML = title;
    toggle.toggle = false;
    toggle.associateElement = body;
    toggle.onclick = function(){
        if(!this.toggle){
            this.toggle = true;
            this.children[0].children[0].innerHTML = 'keyboard_arrow_down';
            this.associateElement.style.maxHeight = '500vh';
        }else{
            this.toggle = false;
            this.children[0].children[0].innerHTML = 'keyboard_arrow_right';
            this.associateElement.style.maxHeight = '0px';
        }
    }

    parent.appendChild(collapsible);
}

function createCheckListItem(parent, itemName){
    var checkListItem = TE.fetchTemplate('checkListItem');
    checkListItem.itemName = itemName;
    checkListItem.checked = false;
    checkListItem.children[1].innerHTML = itemName;
    checkListItem.onclick = function(){
        utilArrayToggleValue(app.searchCheckList, this.itemName);
    }
    parent.appendChild(checkListItem);
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
        
        switch(recipe.like){
            case 0: break;
            case 1: bottomBar.children[1].children[0].style.color = '#20E371'; break;
            case -1: bottomBar.children[2].children[0].style.color = '#FF4D00'; break;
            default: break;
        }

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

var app = new Watcher();

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
        routerStart('recipes');

        //Using watcher to create searchField
        //By setting app.searchCheckList to [] will clear all entries
        app.watch(
            'searchCheckList', 
            [], 
            function(prop, list){
                var checkListItems = document.getElementsByName('tag');
                var checkListItem; for(checkListItem of checkListItems)
                    if(list.includes(checkListItem.itemName)){
                        checkListItem.children[0].children[0].innerHTML = 'clear';
                        checkListItem.style.backgroundColor = '#00EDB6';
                        checkListItem.style.color = '#FFF';
                    }else{
                        checkListItem.children[0].children[0].innerHTML = 'add';
                        checkListItem.style.backgroundColor = '#EEE';
                        checkListItem.style.color = '#4D4D4D';
                    }
            }, 
            null
        ).inspect('searchCheckList');

        renderRecipeList(
            [
                {dishID: 0, title: "Scrambled Eggs", tags : [{name:'Beef', color:'lightblue'}], like: 0, imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'},
                {dishID: 1, title: "Scrambled Eggs", tags : [{name:'Beef', color:'lightblue'}], like: -1, imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'},
                {dishID: 3, title: "Crab Eggs", tags : [{name:'Crab', color:'pink'}], like: 1, imgUrl : 'https://www.thespruceeats.com/thmb/TyflISuULW9eX8K_mj7whZWfODM=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/super-easy-bread-for-beginners-428108-14_preview-5aff40a26bf06900366f617b.jpeg'}
            ], 3);
    }
);
