/*
 * JS Tap Adventure -- By 
 * 
 * Description: A text adventure game engine designed with mobile in mind.
 * Author: ,  
 * License: MIT
 * Version: 0.0.1
 */
(function($) {

    $.textadventure = function(element, options) {

        //defaults can be overrided when calling plugin
        var defaults = {
            jsonfile          : "questions.json",
            questionClass     : ["row", "col-sm-8 col-sm-offset-2"], //each item in array creates an inner div
            buttonClass       : "btn btn-default btn-block",         //classes added to button
            imgClass          : "img-responsive center-block",       //classes added to images
            questionIndex     : 0,
            scroll            : true,
            scrollSpeed       : 1200,
            scrollTopPad      : 0.1,    //percentage of viewport of top padding after scrolling
            goback            : true, //change to true if you want to scroll up when using "goback"
            reset             : true   //use ID "reset" to reset to the first question.
        },
        $element        = $(element), 
        plugin          = this;
        plugin.settings = $.extend({}, defaults, options); //plugin.settings to access all of the above
             
        //called after data is loaded
        plugin.init = function(d) {
            plugin.data = d;
            addEasing();
            plugin.questionIds = [];
            createIndex();
            createQuestion();
        };


        //we need an dictionary index of question ids. Go through data and create them
        var createIndex = function(){
            plugin.data.questions.forEach(function(d, i){
                plugin.questionIds.push(d.id);
            });
        };


        //click handler for buttons
        var clickHandler = function(elm){
            elm.find("button").on("click", function(e){

                var thisData = $(this).data("goto");
                var newIndex = plugin.questionIds.indexOf(thisData);

                //check if the destination ID exists!
                if(newIndex !== -1){
                        plugin.settings.questionIndex = newIndex;
                        createQuestion();
                } else {

                    thisData = thisData.toString();

                    //if they set it up so you can go back one question in plugin settings
                    if(plugin.settings.goback === true && thisData.toLowerCase() === "goback"){
                        goback();
                    }

                    if(plugin.settings.reset === true && thisData.toLowerCase() === "reset"){
                        reset();
                    }
                }
            });
        };

        //Scroll back up one question
        var goback = function(){
            $element.children().last().remove();
            $element.children().last().addClass("active").find("button").removeClass("disabled");
            scrollTo($element.children().last().offset().top);
        };

        //rest game to the beginning
        var reset = function(){
            $element.children().remove();
            scrollTo(0);
            plugin.settings.questionIndex = 0;
            createQuestion();
        };

        //set the minimum height of $element to allow for scrolling
        var minHeight = function(){
            $element.css("min-height", ($(window).height() * 2) + $(window).scrollTop());
        };


        var scrollTo = function(to){
            if(plugin.settings.scroll){
                minHeight();
                $("body, html").animate({"scrollTop": to - ($(window).height() * plugin.settings.scrollTopPad )}, {queue:false, duration:plugin.settings.scrollSpeed, easing:'easeInOutQuint', complete: function(){            //increase min height
            minHeight();}});
            }
        };


        var createQuestion = function() {

            if($element.children().length > 0){
                $element.find("button").addClass("disabled");
                $element.children().last().removeClass("active");
            }

            //build question container, store in q
            var q = $element.append($("<div />").attr("class", plugin.settings.questionClass[0] + " question active")).children().last();

            
            //add inner containers based on plugin settings classes
            for(var i = 1; i < plugin.settings.questionClass.length; i++){
                q = q.append($("<div />").attr("class", plugin.settings.questionClass[i])).children().last();
            }

            //check if there is an image
            if("image" in plugin.data.questions[plugin.settings.questionIndex]){
                if(plugin.data.questions[plugin.settings.questionIndex].image.length > 0){
                    $("<img />")
                        .attr("src", plugin.data.questions[plugin.settings.questionIndex].image)
                        .attr("class", plugin.settings.imgClass)
                        .appendTo(q);
                }
            }

            //add text in paragraph tag
            var qtext  = $("<p />").html(plugin.data.questions[plugin.settings.questionIndex].text).appendTo(q);

            //no buttons, end here
            if(!("options" in plugin.data.questions[plugin.settings.questionIndex])){
                scrollTo(q.offset().top);
                return false;
            }
           
            //add buttons
            plugin.data.questions[plugin.settings.questionIndex].options.forEach(function(d,i){
                $("<button />")
                    .attr("class", plugin.settings.buttonClass)
                    .text(d.text)
                    .data("goto", d.goto)
                    .appendTo(q);
            });

            //scroll to next question automatically
            if(plugin.settings.questionIndex !== 0){
                scrollTo(q.offset().top);
            }
            
            //attach click to this new button
            clickHandler(q);

        };
   
        var addEasing = function(){
            jQuery.easing.easeInOutQuint = function (x, t, b, c, d) {
                if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
                return c/2*((t-=2)*t*t*t*t + 2) + b;
            };
        };


        //load document to kick things off
        $.ajax({
            url: plugin.settings.jsonfile,
            dataType: "json",
        })
        .fail(function(jqxhr, textStatus, errorThrown){
            console.log(textStatus, errorThrown);
        })
        .done(function(data){
            plugin.init(data);
        });

    };

    // add the plugin to the jQuery.fn object
    $.fn.textadventure = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined === $(this).data('textadventure')) {

                var plugin = new $.textadventure(this, options);
                $(this).data('textadventure', plugin);

            }

        });

    };

})(jQuery);