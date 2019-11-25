//Global Initialization
//*******************************************************************//
var main = document.getElementById('main');
var sub = document.getElementById('sub');
var warning = document.getElementById('warning');
var navBar = document.getElementById('nav-bar');
var recipesButton = document.getElementById('recipes-button');
var searchButton = document.getElementById('search-button');
var uploadButton = document.getElementById('upload-button');
var settingsButton = document.getElementById('settings-button');

var displayContainer = document.getElementById('display');

var searchField = document.createElement('DIV');
var recipeList = document.createElement('DIV');
var recipeUploadField = document.createElement('DIV');
var settingsField = document.createElement('DIV');

var recipeCardsBuffer = [];
//*******************************************************************//

//Naive router implementation
function route(){
    var route = location.hash;
    if(!route)
        route = '#recipes';
    switch(route){
        case '#recipes': recipesButton.onclick(); break;
        case '#search': searchButton.onclick(); break;
        case '#upload': uploadButton.onclick(); break;
        case '#settings': settingsButton.onclick(); break;
    }
}
window.onhashchange = route;

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
            var hash = elem.getAttribute('href');
            if(hash != 'recipes' && app.userID == '')
                return displayWarning('This function is not accessible, Please login first...');
            elem.style.backgroundColor = '#00DAA7';
            elem.style.color = '#FFFFFF';
            location.href = location.href.split('#')[0] + '#' + elem.getAttribute('href');
            updateDisplayPage(elem.associatedElement);
        },
        function(elem){
            if(location.hash == '#' + elem.getAttribute('href'))
                return;
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
    searchAlgorithmButton.children[0].children[0].innerHTML = 'search';
    searchAlgorithmButton.children[1].innerHTML = 'Search with Selected Ingredients';
    searchAlgorithmButton.style.color = '#FFF';
    searchAlgorithmButton.style.backgroundColor = '#00B58B';
    searchAlgorithmButton.onclick = function(){searchRecipe()};
    var innerBox = TE.fetchTemplate('innerBox');
    innerBox.appendChild(searchAlgorithmButton);
    field.appendChild(innerBox);

    AJAXPost(
        'fetchTags.php',
        null,
        function(data){
            var col = {};
            col['Others'] = createCollapsible(searchField.children[0], 'Others');
            var tagName, subTag;
            var i, item, len = data.length; for(i = 0; i < len; i++){
                item = data[i];
                tagName = item.tagName,
                subTag = item.subTag.length == 0 ? 
                    'Others' : item.subTag;
                if(subTag != 'Others' && col[subTag] === undefined)
                    col[subTag] = createCollapsible(searchField.children[0], subTag);
                createCheckListItem(col[subTag], tagName);
            }
        }
    );

}

//Initialise the recipeList
function createRecipeList(){
    recipeList.classList.add('mg');
    recipeList.style.overflowX = 'visible';
    recipeList.style.overflowY = 'scroll';
    recipeList.scrollPosition = 0;
    listInit(recipeList, 10);
}

function createRecipeUploadField(){
    var field = utilCreateField(recipeUploadField);
    var uploadTemplate = TE.fetchTemplate('upload');
    field.appendChild(uploadTemplate);
}

function createSettingsField(){
    var field = utilCreateField(settingsField);
    var settingsTemplate = TE.fetchTemplate('setting');
    field.appendChild(settingsTemplate);
}

function searchRecipe(input){
    var tags = input ? input : app.extract('searchCheckList');
    var userID = app.userID;
    var formData = new FormData();
    formData.append('userID', userID.length ? userID : '');
    formData.append('tags', tags);
    AJAXPost(
        'search.php',
        formData,
        function(data){
            app.recipes = data.list;
            if(location.hash != '#recipe')
                recipesButton.onclick();
        }
    );
}

function createCollapsible(parent, title){
    var collapsible = TE.fetchTemplate('collapsible');
    var toggle = collapsible.children[0];
    var body = collapsible.children[1];
    
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
    return body;
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

function displayWarning(msg){
    document.getElementById('warning-msg').innerHTML = msg;
    warning.style.zIndex = 11;
    warning.style.opacity = 1;
    warning.style.transition = 'opacity 0.5s ease-in-out';
    main.classList.add('blur');
}

function hideWarning(){
    warning.style.opacity = 0;
    setTimeout(
        () => warning.style.zIndex = -1,
        500
    );
    main.classList.remove('blur');
}

function displaySub(){
    sub.style.opacity = 1;
    sub.style.zIndex = 10;
    sub.style.left = '100%';
    navBar.classList.add('blur');
    displayContainer.classList.add('blur');
    setTimeout(
        function(){
            sub.style.transition = '0.2s';
            sub.style.left = '0';
        },
        10
    );
    setTimeout(
        () => sub.style.transition = '',
        210
    );
}

function exitSub(){
    sub.style.transition = '0.2s';
    sub.style.left = '100%';
    navBar.classList.remove('blur');
    displayContainer.classList.remove('blur');
    setTimeout(
        function(){
            sub.style.zIndex = -1;
            sub.style.transition = ''
            sub.style.left = '0';
        },
        200
    );
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
        createRecipeUploadField();
        createSettingsField();
        route();
        Colorant.paint();

        //Using watcher to create searchField
        //By setting app.searchCheckList to [] will clear all entries
        //Using Watcher to buffer recipe cards rendering
        //Any change to app.recipes will be rendered immediately
        app
        .watch(
            'userID', 
            '', 
            function(prop, userID){
                document.getElementById('user-id').innerHTML = userID == '' ? 'Login Now!' : userID;
            }
        )
        .watch(
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
        )
        .inspect('searchCheckList')
        .watch(
            'recipes',
            [],
            function(prop, list){
                renderList(list, 10);
            }
        );

        app.userID = getCookie('userID');

        searchRecipe([]);

    }
);
