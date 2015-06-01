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
    
});