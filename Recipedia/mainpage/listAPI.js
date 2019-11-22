var vdom, listIndexing = {}, maxLength = 0;

function listInit(listElement, listCount){
    maxLength = listCount;
    vdom = new MinVDOM(listElement);
    var i; for(i = 0; i < listCount; i++){
        var card = vdom.vnode('div', 
            {
                class : 'mg d20 w18 x1 screen h10 h-auto margin elevate-3 border-2', 
                style : 'overflow : hidden; margin-top: 10px;'
            },
            {
                dishID : -1
            }
        );
        var imgField = vdom.vnode('div', 
            {
                class : 'mr d12 screen h7',
                style : 'background-color: #EEE;border-bottom: 1px solid #EEEEEE;'
            },
            {
                dishID : -1,
                onclick : function(){
                    
                }
            }
        );
        var imgBucket = vdom.vnode('div', 
            {
                class : 'media-bucket mr d20 h19 v-center'
            },
            {}
        );
        var img = vdom.vnode('img', {src : ''}, {});
        var bottBar = vdom.vnode('div', 
            {
                class : 'mr d12 screen h1',
                style : 'border-bottom: 1px solid #EEEEEE; background-color: white'
            },
            {}
        );
        var textCol = vdom.vnode('div', 
            {
                class : 'mc d12 w8'
            },
            {}
        );
        var textFie = vdom.vnode('div',
            {
                class : 'text-bucket huge d12 x1 v-center'
            },
            {}
        );
        var text = vdom.vtext('TITLE');
        var like = vdom.vnode('div',
            {
                class : 'mc d12 w2',
            },
            {}
        );
        var likeIcon = vdom.vnode('i',
            {
                class : 'material-icons center',
                style : 'font-size: 36px; color: #BBB; cursor: pointer;'
            },
            {
                dishID : -1,
                onclick : function(){
                    var userID = getCookie('userID');
                    var dishID = this.getAttribute('dishID');
                    var cardLocation = this.getAttribute('cardLocation');
                    var formData = new FormData();
                    formData.append('userID', userID);
                    formData.append('dishID', dishID);
                    formData.append('like', 1);
                    AJAXPost(
                        'likes.php',
                        formData,
                        function(data){
                            if(data.valid == 'F')
                                return console.warn('[Like]: Invalid userID...');
                            if(data.status == 'F')
                                return console.warn('[Like]: Error! Unable to like...');
                            app.recipes[cardLocation].like = data.status;
                        }
                    );
                }
            }
        );
        var likeIconDes = vdom.vtext('thumb_up_alt');
        var dislike = vdom.vnode('div',
            {
                class : 'mc d12 w2',
            },
            {}
        );
        var dislikeIcon = vdom.vnode('i',
            {
                class : 'material-icons center',
                style : 'font-size: 36px; color: #BBB; cursor: pointer;'
            },
            {
                dishID : -1,
                onclick : function(){
                    var userID = getCookie('userID');
                    var dishID = this.getAttribute('dishID');
                    var cardLocation = this.getAttribute('cardLocation');
                    var formData = new FormData();
                    formData.append('userID', userID);
                    formData.append('dishID', dishID);
                    formData.append('like', -1);
                    AJAXPost(
                        'likes.php',
                        formData,
                        function(data){
                            if(data.valid == 'F')
                                return console.warn('[Dislike]: Invalid userID...');
                            if(data.status == 'F')
                                return console.warn('[Dislike]: Error! Unable to dislike...');
                            app.recipes[cardLocation].like = data.status;
                        }
                    );
                }
            }
        );
        var dislikeIconDes = vdom.vtext('thumb_down_alt');

        vdom.push(imgField, card);
        vdom.push(imgBucket, imgField);
        vdom.push(img, imgBucket);
        
        vdom.push(bottBar, card);
        vdom.push(textCol, bottBar);
        vdom.push(textFie, textCol);
        vdom.push(text, textFie);

        vdom.push(like, bottBar);
        vdom.push(likeIcon, like);
        vdom.push(likeIconDes, likeIcon);

        vdom.push(dislike, bottBar);
        vdom.push(dislikeIcon, dislike);
        vdom.push(dislikeIconDes, dislikeIcon);

        listIndexing[i] = {
            main : card,
            image : img,
            title : text,
            likeIcon : likeIcon,
            dislikeIcon : dislikeIcon
        }
    }
}

function renderList(list, count){
    var len = list.length;
    var i, item, card, like; for(i = 0; i < maxLength; i++){
        card = listIndexing[i];
        if(i >= len || i >= count){
            vdom.pull(card.main);
            continue;
        }
        vdom.push(card.main);
        item = list[i];
        vdom.content(card.title, item.title);
        vdom.attribute(card.image, 'src', item.imgUrl);
        vdom.attribute(card.image, 'dishID', item.dishID);
        like = item.like;
        vdom.attribute(
            card.likeIcon, 
            'style', 
            like == 1 ?
                'font-size: 36px; color: #20E371; cursor: pointer;' :
                'font-size: 36px; color: #BBB; cursor: pointer;'
        );
        vdom.attribute(card.likeIcon, 'dishID', item.dishID);
        vdom.attribute(card.likeIcon, 'cardLocation', i);
        vdom.attribute(
            card.dislikeIcon,
            'style',
            like == -1 ?
                'font-size: 36px; color: #FF4D00; cursor: pointer;' :
                'font-size: 36px; color: #BBB; cursor: pointer;'
        );
        vdom.attribute(card.dislikeIcon, 'dishID', item.dishID);
        vdom.attribute(card.dislikeIcon, 'cardLocation', i);
    }
    vdom.render();
}