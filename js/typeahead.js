(function(){
    var TA = document.getElementById("typeahead-input");
    TA.oninput = search;

    var parentDiv = TA.parentNode;

    var suggestionsDiv = parentDiv.getElementsByClassName("typeahead-suggestions")[0];

    var searchObject = {
        "Aphonopelma":["poop","dick","butt"],
        "Brachypelma":["poop","dick","butt"],
        "Chromatopelma":["poop","dick","butt"],
        "Grammstola":["poop","dick","butt"],
        "Haplopelma":["poop","dick","butt"],
        "Lasiodora":["poop","dick","butt"],
        "Monocepes":["poop","dick","butt"],
        "Nhandu":["poop","dick","butt"],
        "Poecilotheria":["poop","dick","butt"],
        "Platyomma":["poop","dick","butt"],
        "Theriphosa":["poop","dick","butt"],
        "Xenesthis":["poop","dick","butt"]
    }
    
    var matches = {};

    
    function search(){
        suggestionsDiv.innerHTML = "";

        var searchValue = TA.value;

        setTimeout(function() {
            findSuggestions(searchValue); 
        }, 100);
    }

    function findSuggestions(searchValue){
        var key;

        for (key in searchObject) {
            if (searchObject.hasOwnProperty(key)) {
                matchPattern(searchValue, key);
            }
        }
    }

    function matchPattern(searchValue, key){
        var pattern = new RegExp(searchValue, 'i');
        var highlighted = key + "";
        var result;

        result = pattern.test(key);
   
        if(result){
            highlighted = key.replace(pattern, "<strong>" + searchValue + "</strong>");
            matches[key] = highlighted;
            
            suggestionsDiv.innerHTML += highlighted + "<br/>";
        }
        else{
            delete matches[key]; 
        }

        console.log(matches);
    }

})();
