/*Put in this file small jqueries that are ran when the document is loaded. Might move the loader.js here as well.*/
$(document).ready(function(){
    /*Dynamic targeting of parent containers for rescaling*/
    function rescalehelpfunction(selector) {
        var $target = $(selector);
        $target.each(function () {
            var pheight = $(this).parent().closest('div').height();
            var pwidth = $(this).parent().closest('div').width();
            $(this).aeImageResize({ height: (pheight), width: (pwidth) });
        })
    }

    function rescale(){
        rescalehelpfunction(".resizeable");
    }
    /*Add a jquery tag of style target.resize()*/
    jQuery.fn.extend({
        rescale: function () {
            return rescalehelpfunction(this);
        }
    });
    /*Rescale the resizeable class when document is loaded*/
    rescale();
    
    /*Loading in different parts of the website.*/
    // $("#nav").load("html/header3.html", doStuff());
    $("#nav").load("html/header3.html", function (){
        var tmp = document.getElementById("bs-example-navbar-collapse-2");
        var links = tmp.getElementsByTagName("a");
        for(var i = 0; i < links.length; i++)
            console.log(links[i].href);    
    });
    $("#slider").load("html/slider.html");
    $("#footer").load("html/footer.html");
    
    jQuery.fn.extend({
        redirect: function (ev) {
            ev.preventDefault();
            $('#main').load(this.attr('href'));
            return false;
        }
    });        
    
});