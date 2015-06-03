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
            $(this).changeCurrent();
            $('#main').load(this.attr('href'));
        }
    });
    
    jQuery.fn.extend({
        redirect2: function (ev) {
            ev.preventDefault();
            $(this).changeCurrent2();
            $('#main').load(this.attr('href'));
        }
    });
    
    jQuery.fn.extend({
        changeCurrent: function () {
        $("a").removeClass("currentAnchor");
        $(this).addClass("currentAnchor");
       }
    });
// ChangeCurrent2 does not work since it's overloaded by the new meny that's bound to the new todo page.
    jQuery.fn.extend({
        changeCurrent2: function () {
        $("a").removeClass("currentSubAnchor");
        $(this).addClass("currentSubAnchor2");
       }
    });
    
    jQuery.fn.extend({
        redirectInit: function (ev) {
            ev.preventDefault();
            this.redirect(ev);
            //initActivities();
        }
    });
    
    
});

var contentLanguage = "eng";
var dataContent = dataContent_en;

var dataContent_en = {
	todo: "See Mongolia",
    news: "News",
    activities: "Tours and Travels",
    tickets: "Travel to Mongolia",
    rental: "Rental",
    contact: "Contact Us",
    showFilter: "Show Filter",
    searchOption: "Search Option",
    searchByName: "Search by name:",
    tourType: "Tour type",
    typeShort: "&nbsp;Short&nbsp;",
    typeClassic: "&nbsp;Classic&nbsp;",
    typeSpecial: "&nbsp;Special&nbsp;",
    bookNow: "Book Now!",
    readMore: "Read More",
    collapse: "Collpase",
    description1 : "en",
    description2 : "en",
    description3 : "en",
    description4 : "en",
    description5 : "en"
};
    
var dataContent_sv = {
	todo: "Se Mongoliet",
    news: "Nyheter",
    activities: "Turer & Resor",
    tickets: "Resa till Mongoliet",
    rental: "Nummer",
    contact: "Kontakta Oss",
    showFilter: "Visa Filtret",
    searchOption: "Sök Alternativ",
    searchByName: "Sök efter namn:",
    tourType: "Tour typ",
    typeShort: "&nbsp;Kort&nbsp;",
    typeClassic: "&nbsp;Klassisk&nbsp;",
    typeSpecial: "&nbsp;Speciell&nbsp;",
    bookNow: "Boka Nu!",
    readMore: "Läs Mer",
    collapse: "Kollaps",
    description1 : "sv",
    description2 : "sv",
    description3 : "sv",
    description4 : "sv",
    description5 : "sv"
};

function changeLanguage(inputLang)
{
    if(inputLang != 'swe' && inputLang != 'eng')
        return;

    if(inputLang == 'swe')
    {
        contentLanguage = "swe";
        var langPack = dataContent_sv;
        document.getElementById('engFlag').style.borderColor = '#F9F9F9';
        document.getElementById('sweFlag').style.borderColor = '#8E0070'; 
        dataContent = dataContent_sv;
    }
    else if(inputLang == 'eng')
    {
        contentLanguage = "eng";
        var langPack = dataContent_en;
        document.getElementById('engFlag').style.borderColor = '#8E0070';
        document.getElementById('sweFlag').style.borderColor = '#F9F9F9';
        dataContent = dataContent_en;
    }
    else
        return;

    // data-locale for innerHTML Properties
    var data = getAllElementsWithAttribute("data-locale");
    
    if(data.length == 0)
        return;

    for(var i = 0; i < data.length; i++)
        data[i].innerHTML = langPack[data[i].getAttribute("data-locale")];
    
}

function getAllElementsWithAttribute(input)
{
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++)
    {
        if (allElements[i].getAttribute(input) !== null)
            matchingElements.push(allElements[i]);
    }
    return matchingElements;
}
