
var prev = "";

window.onload = 
    function(){
        window.routerInterval = 
            this.setInterval(
                function(){
                    var current = location.href.split('#')[1];
                    if(!current)
                        current = 'recipes';
                    if(current == prev)
                        return;
                    prev = current;
                    switch(current){
                        case 'recipes': recipesButton.onclick(); break;
                        case 'search': searchButton.onclick(); break;
                        case 'upload': uploadButton.onclick(); break;
                        case 'settings': settingsButton.onclick(); break;
                    }
                },
                100
            );
    }