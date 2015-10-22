define(['knockout', 'jquery'], function(ko, $) {
  
  ko.bindingHandlers.starRating = {
    init: function(element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
           $("<span>").appendTo(element);
       
        // Handle mouse events on the stars
        $("span", element).each(function(index) {
            $(this).hover(
                function() { $(this).prevAll().add(this).addClass("hoverChosen") }, 
                function() { $(this).prevAll().add(this).removeClass("hoverChosen") }                
            ).click(function() { 
                var observable = valueAccessor();  // Get the associated observable
                observable(index+1);               // Write the new rating to it
            });
        });            
    },
    update: function(element, valueAccessor) {
        // Give the first x stars the "chosen" class, where x <= rating
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).toggleClass("chosen", index < observable());
        });

        console.log("I update!");
    }    
  };
});

