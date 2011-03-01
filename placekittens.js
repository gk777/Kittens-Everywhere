

$(document).ready(function(){
    chrome.extension.sendRequest({are_kittens_on: true}, function(response) {
        if(response.kittens)
            placeKittens();
    })
});

function placeKittens(){
    $(document).find('img').each(function(i,img) {
               if (!img.kittened)
                   img.old_src = img.src;
               var w = img.width;
               var h = img.height;
               if (w && h) {
                   if(!img.kittened){
                        var src =  'http://placekitten.com/'+w+'/'+h;
                        img.kittened = true;
                    }
                   else{
                        var src = img.old_src;
                        img.kittened = false;
                    }
                   img.src = src;
               }
       });
}

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
        placeKittens();
        sendResponse({});
  });