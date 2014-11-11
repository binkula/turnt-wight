var typeahead = {
    TA: null,
    parentDiv: null,
    suggestionsDiv: null,
    matches: {},

    searchObject: {
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
    },
    

    init: function(){
        TA = document.getElementById("typeahead-input");
        TA.oninput = typeahead.search;

        parentDiv = TA.parentNode,

        suggestionsDiv = parentDiv.getElementsByClassName("typeahead-suggestions")[0];
    },

    search: function(){
        suggestionsDiv.innerHTML = "";

        var searchValue = TA.value;

        setTimeout(function() {
            typeahead.findSuggestions(searchValue); 
        }, 100);
    },

    findSuggestions: function(searchValue){
        var key;

        for (key in typeahead.searchObject) {
            if (typeahead.searchObject.hasOwnProperty(key)) {
                typeahead.matchPattern(searchValue, key);
            }
        }
    },

    matchPattern: function(searchValue, key){
        var pattern = new RegExp(searchValue, 'i');
        var highlighted = key + "";
        var result;

        result = pattern.test(key);
   
        if(result){
            highlighted = key.replace(pattern, "<strong>" + searchValue + "</strong>");
            typeahead.matches[key] = highlighted;    

            typeahead.addMatch(key, highlighted);
        }
        else{
            delete typeahead.matches[key]; 
        }

        console.log(typeahead.matches);
    },

    addMatch: function(key, highlighted){
        var li = document.createElement("li");
        li.setAttribute("data-key", key);
        li.innerHTML = highlighted;
        li.onclick = function(e){typeahead.completeInput(e)};
        suggestionsDiv.appendChild(li);
    },


    completeInput: function(e){
        var text = e.target.getAttribute("data-key");
        console.log(text);
        TA.value = text;
        suggestionsDiv.innerHTML = "";
    }

};

new typeahead.init();
