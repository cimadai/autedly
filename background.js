chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command == "like") {
        xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            switch ( xhr.readyState ) {
                case 4: // データ受信完了.
                    if( xhr.status == 200 || xhr.status == 422 ) {
                        console.log('LIKED!');
                    }
            }
        };

        xhr.open("POST", request.likeUrl, true);
        xhr.setRequestHeader("x-csrf-token" , request.csrfToken);
        xhr.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.setRequestHeader("x-requested-with" , "XMLHttpRequest");
        xhr.send("location=post_action_bar");
    }
    return true;
});
