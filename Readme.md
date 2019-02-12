Multiple Choice Text Adventure jQuery Plugin (beta)
====================

A jQuery plugin that allows for the easy creation of a multiple choice text adventure. 

Built with [Twitter Bootstrap](http://getbootstrap.com/) in mind, but Bootstrap is not required.

Installation
============

Download the latest beta release. ([.zip](https://github.com/jrue/text-adventure/archive/v0.0.1-beta.zip))([.tar.gz](https://github.com/jrue/text-adventure/archive/v0.0.1-beta.tar.gz))

Or optionally install with package installer:

**bower**

```
bower install https://github.com/jrue/text-adventure.git
```

**NPM (development)**
```
npm install jrue/text-adventure
```

Include the `dist/textadventure.min.js` file after the jQuery library.

Activate with the following command:

```javascript
$("#game").textadventure();
```

This will initiate the plugin with default settings on a containing element. 

Look at the example folder for more info.

JSON Data File
==============

By default, the plugin will look for a `questions.json` file, with a **questions** key in the following format.

```json
{
    "questions": [
    
        {
            "id": "intro",
            "text": "This is the first question to be asked",
            "image": "http://placehold.it/500x300",
            "options": [
                {
                    "text": "Option 1",
                    "goto": "part2"
                },
                {
                    "text": "Option 2",
                    "goto": "part2"
                }
            ]
        },
        {
            "id": "part2",
            "text": "This is the second question to be asked. There is no image on this one.",
            "options": [
                {
                    "text": "Restart the Game",
                    "goto": "reset"
                },
                {
                    "text": "Go Back One",
                    "goto": "goback"
                }
            ]
        }
    ]
}
``` 

Here is the meaning to the key pairs in the JSON file:

* the **id** key will create a unique identifier for each question
* the **text** key has the actual text of the question
* the **image** key is for a URL to an optional image file
* the **options** key should be an array that will present buttons to display for the user
* the **goto** key will specify which question should be displayed next (by its identifier, or id)

There are two special "goto" values built-in. They are:

1. "reset" &mdash; This will reset the game to the first question, unless turned off in settings.
2. "goback" &mdash; this will go back one question, ideally for situations where where they reached a dead-end

Options
=======

These are the default options:

```javascript
$("#game").textadventure({
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
});
```

**jsonfile**
The url to the JSON data file. Should be on your own server to prevent CORS.

**questionClass**
An array of strings that will become a hierachy of &lt;div&gt; tags with the respective classes to hold each question. By default, the following format is used based on the data above:

```html
<div class="row">
    <div class="col-sm-8 col-sm-offset-2">
        <img src="http://placehold.it/500x300" class="img-responsive center-block">
        <p>This is the first question to be asked</p>
        <button class="btn btn-default btn-block">Option 1</button>
        <button class="btn btn-default btn-block">Option 2</button>
    </div>
</div>
```

**buttonClass**
A string for the class attribute on the buttons.

**imgClass**
A string for the class attribute on the images.

**questionIndex**
Internal, but you could start on a question other than the first for some reason.

**scroll**
Set to false to turn off scrolling.

**scrollSpeed**
Milliseconds to scroll.

**scrollTopPad**
When scrolling, this is the amount of space from the question to the top of the viewport, defined as a percentage of the viewport's height.

**goback**
Boolean of whether or not to support "goback" as special id that will always go back one question.

**reset**
Boolean of whether or not to support "reset" as a special id that will reset the game.

ChangeLog
=========
* 2015-03-11   v0.0.1   Initial beta release. Work in progress. Expect bugs.




