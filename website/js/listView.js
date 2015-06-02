// Global Variable
// dataContent is a variable that store all needed info
var expandingStage;
var searchIndex;
var checkTourType;
var filterState = false;
var contentLanguage = "eng";
var dataContent = dataContent_en;

// Constructor that initialize everything
// window.onload = function(){
function initActivities(){
    // Initialize expanding stage
    expandingStage  = new Array(dataContent.length)
    searchIndex = new Array(dataContent.length);
    
    for(var i = 0; i < expandingStage.length; i++){
        expandingStage[i] = "collapsed";
        searchIndex[i] = true;
    }
    
    // Add Event #searchKey
    var txtSearchBox = document.getElementById("searchKey");
    txtSearchBox.addEventListener("keypress", function(){
        // Search for title
        searchCondition();
    })
    
    checkTourType = new Array();
    checkTourType.push('short');
    checkTourType.push('classic');
    checkTourType.push('special');

    
    // Bind event to the filter button
    document.getElementById("filterButton").addEventListener("click", function() {
        if(filterState)
        {
            document.getElementById("filterPanel").style.display = "none";
            this.innerHTML = "Show Filter";
            filterState = false;
            
                
            // Reset search
            document.getElementById("searchKey").value = "";
            document.getElementById('chkShort').checked = true;
            document.getElementById('chkClassic').checked = true;
            document.getElementById('chkSpecial').checked = true;
            
            for(var j = 0; j < dataContent.length; j++)
                searchIndex[j] = true;
            
            redrawContent();
        
        }
        else
        {
            document.getElementById("filterPanel").style.display = "block";
            this.innerHTML = "Hide Filter";
            filterState = true;
        }    
    });
    // Hide Filter First as default //
    document.getElementById("filterPanel").style.display = "none";
    
    redrawContent();
}

function searchCondition()
{   
    var txtSearchBox = document.getElementById("searchKey");    
    var isChanged = false;
    for(var j = 0; j < dataContent.length; j++){
        if(txtSearchBox.value.trim().length > 0) 
        {
            console.log(checkTourType.indexOf(dataContent[j].tourType) > -1);
            console.log(txtSearchBox.value.trim().toLowerCase());
            if(dataContent[j].tourName.toLowerCase().contains(txtSearchBox.value.trim().toLowerCase()) && checkTourType.indexOf(dataContent[j].tourType) > -1 )
            {
                if(searchIndex[j] != true)
                    isChanged = true;
                searchIndex[j] = true;
            }
            else
            {
                if(searchIndex[j] != false)
                    isChanged = true;
                searchIndex[j] = false;   
            }
        }
        else{
            if(checkTourType.indexOf(dataContent[j].tourType) > -1 )
            {
                if(searchIndex[j] != true)
                    isChanged = true;
                searchIndex[j] = true;
            }
            else
            {
                if(searchIndex[j] != false)
                    isChanged = true;
                searchIndex[j] = false;   
            }
        }
    }
    if(isChanged)
        redrawContent();
}

function chkUpdate(tourType)
{
    //var tourTypeCheckShort = true;
    //var tourTypeCheckClassic = true;
    //var tourTypeCheckSpecial = true;
    checkTourType = new Array();
    /*
    if(tourType == 'Short' && document.getElementById('chk' + tourType).checked)
        checkTourType.push('short');
        //tourTypeCheckShort = document.getElementById('chk' + tourType).checked;
    else if(tourType == 'Classic' && document.getElementById('chk' + tourType).checked)
        checkTourType.push('classic');
        //tourTypeCheckShort = document.getElementById('chk' + tourType).checked;
    else if(tourType == 'Special' && document.getElementById('chk' + tourType).checked)
        checkTourType.push('special');
        //tourTypeCheckShort = document.getElementById('chk' + tourType).checked;
    */
    
    // Force check
    if(document.getElementById('chkShort').checked)
        checkTourType.push('short');
        //tourTypeCheckShort = document.getElementById('chk' + tourType).checked;
    if(document.getElementById('chkClassic').checked)
        checkTourType.push('classic');
        //tourTypeCheckShort = document.getElementById('chk' + tourType).checked;
    if(document.getElementById('chkSpecial').checked)
        checkTourType.push('special');
    
    for(var i = 0; i < checkTourType.length; i++)
        console.log(checkTourType[i]);
    
    searchCondition();
}

// Redraw the content
function redrawContent() {
    // If dataContent is available, get the data and create an object
    if(dataContent != null)
    {
        // Get container and clear stuffs inside
        var listItemContainer = document.getElementById("filteredData");
        listItemContainer.innerHTML = "";
        
        // Loop through every object
        for(var i = 0; i < dataContent.length; i++)
        {
            if(!searchIndex[i])
                continue;
            
            // Create outer container for margin only
            var mComponent = document.createElement("div");
            mComponent.setAttribute("style","margin: 0.25em");

            // Create a main container
            var component = document.createElement("div");
            component.setAttribute("class","v960 col-sm-6");
            component.setAttribute("id","expandable" + i);
            
            // Create a tour name (Title)
            var titleComponent = document.createElement("a");
            titleComponent.innerHTML = dataContent[i].tourName;
            titleComponent.setAttribute("class","clickableText");
            titleComponent.setAttribute("href","#");
            
            // Create a subcontainer that contain image and basic descriptino
            var subComponent = document.createElement("div");
            subComponent.setAttribute("class","subDetail limitHeight");
            
            // Create image
            var imgSubComponent = document.createElement("img");
            imgSubComponent.setAttribute("src", dataContent[i].photoRef);
            imgSubComponent.setAttribute("alt", dataContent[i].alt);
            imgSubComponent.setAttribute("title", dataContent[i].title);
            imgSubComponent.setAttribute("class","imgFloatLeft");
            subComponent.appendChild(imgSubComponent);
            
            // Create description
            var txtSubComponent = document.createElement("p");
            txtSubComponent.innerHTML = dataContent[i].description;
            subComponent.appendChild(txtSubComponent);
            
            // Create read more button
            var btnComponent = document.createElement("a");
            btnComponent.setAttribute("onclick","expandItem(" + i + ")");
            btnComponent.setAttribute("class", "clickableText");
            if(contentLanguage == "eng")
                btnComponent.innerHTML = "<span data-locale='readMore'>Read More</span>";
            else if(contentLanguage == "swe")
                btnComponent.innerHTML = "<span data-locale='readMore'>Läs Mer</span>";
            
            // insert these all parts into a main container
            component.appendChild(titleComponent);
            component.appendChild(subComponent);
            component.appendChild(btnComponent);
            
            var specialComponent = null;
            if(dataContent[i].priority == 1)
            {
                specialComponent = document.createElement("img");
                specialComponent.setAttribute("src","http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-11/48/new-icon.png");
                specialComponent.setAttribute("title","New");
                specialComponent.setAttribute("class","pin");
                component.appendChild(specialComponent);
            }
            mComponent.appendChild(component);
            
            // insert the master component into the main container
            listItemContainer.appendChild(mComponent);
        }
    }
    else
    {
        console.log("Cannot get data content")   
    }
}

// Expand the item and inject information
function expandItem(itemNum) {
    
    if (expandingStage[itemNum] == "collapsed") {
        
        // Reflag expand stage back to expand
        expandingStage[itemNum] = "expand";
        
        // Get the main container
        var tmp = document.getElementById("expandable" + itemNum);
        tmp.setAttribute("class","v960 col-sm-12 autoHeight");
        
        var injContainer = tmp.getElementsByClassName("subDetail limitHeight")[0];
        
        if(injContainer != null)
        {
            injContainer.innerHTML = "";
            
            injContainer.setAttribute("class","subDetail");
            
            var imgSubComponent = document.createElement("img");
            imgSubComponent.setAttribute("src", dataContent[itemNum].photoRef);
            imgSubComponent.setAttribute("alt", dataContent[itemNum].alt);
            imgSubComponent.setAttribute("title", dataContent[itemNum].title);
            imgSubComponent.setAttribute("style", "width: 75%");
            
            var imgCenter = document.createElement("div");
            imgCenter.setAttribute("style", "margin: 0.5em; text-align: center;");
            imgCenter.appendChild(imgSubComponent);
            
            var tourType = document.createElement("p");
            tourType.innerHTML = "<br><b>Tour Type</b>: " + dataContent[itemNum].tourType;
            tourType.setAttribute("style", "margin: 0.5em");
            
            var tourDescription = document.createElement("p");
            tourDescription.innerHTML = "<br><b>Description</b>:<br/>" + dataContent[itemNum].description;
            tourDescription.setAttribute("style", "margin: 0.5em");
            
            var tourIti = document.createElement("p");
            tourIti.innerHTML =  "<br><b>Itinerary</b><br>" + dataContent[itemNum].itinerary;
            tourIti.setAttribute("style", "margin: 0.5em");

            
            var tourFair = document.createElement("p");
            tourFair.innerHTML = "<br><b>Fair</b><br>" + dataContent[itemNum].fare;
            tourFair.setAttribute("style", "margin: 0.5em");

            
            var tourInfo = document.createElement("p");
            tourInfo.innerHTML = "<br><b>Other Information</b><br>" + dataContent[itemNum].info;
            tourInfo.setAttribute("style", "margin: 0.5em");

            
            var txtSubComponent = document.createElement("p");
            txtSubComponent.innerHTML = dataContent[itemNum].description;
            txtSubComponent.setAttribute("style", "margin: 0.5em");

            var clearComponent = document.createElement("div");
            clearComponent.setAttribute("style", "cleat: both;");

            var readMoreBtn = injContainer.parentNode.getElementsByClassName("clickableText");
            if(contentLanguage == "eng")
                readMoreBtn[1].innerHTML = "<span data-locale='collapse'>Collapse</span>";
            else if(contentLanguage == "swe")
                readMoreBtn[1].innerHTML = "<span data-locale='collapse'>Kollaps</span>";
            
            injContainer.appendChild(imgCenter);
            injContainer.appendChild(tourDescription);
            injContainer.appendChild(tourType);
            injContainer.appendChild(tourIti);
            injContainer.appendChild(tourFair);
            injContainer.appendChild(tourInfo);
            injContainer.appendChild(txtSubComponent);
            injContainer.appendChild(clearComponent);
        }
        else
        {
            console.log("Cannot get internal content");   
        }
        
        /*
        // Push Advertisement
        var adDiv = document.createElement("div");
        adDiv.setAttribute("id","adText");
        adDiv.setAttribute("class","advertisement col-sm-6");    
        adDiv.innerHTML = "<p>Advertisement</p>";
        if(itemNum % 2 == 0){
            document.getElementById("filteredData").insertBefore(adDiv, document.getElementById("expandable" + (itemNum - 1)));
        console.log("expandable" + (itemNum - 1));
        }
        else
        {
            document.getElementById("filteredData").insertBefore(adDiv, tmp);
            console.log(itemNum);
        }
        */
    }
    else if (expandingStage[itemNum] == "expand") {
        // Change state back
        expandingStage[itemNum] = "collapsed";

        var tmp = document.getElementById("expandable" + itemNum);
        tmp.setAttribute("class","v960 col-sm-6");
        
        var injContainer = tmp.getElementsByClassName("subDetail")[0];
        injContainer.setAttribute("class","subDetail limitHeight");
        injContainer.innerHTML = "";
        
        // Create image
        var imgSubComponent = document.createElement("img");
        imgSubComponent.setAttribute("src", dataContent[itemNum].photoRef);
        imgSubComponent.setAttribute("alt", dataContent[itemNum].alt);
        imgSubComponent.setAttribute("title", dataContent[itemNum].title);
        imgSubComponent.setAttribute("class","imgFloatLeft");

        // Create description
        var txtSubComponent = document.createElement("p");
        txtSubComponent.innerHTML = dataContent[itemNum].description;
        
        var readMoreBtn = injContainer.parentNode.getElementsByClassName("clickableText");
        if(contentLanguage == "eng")
            readMoreBtn[1].innerHTML = "<span data-locale='readMore'>Read More</span>";
        else if(contentLanguage == "swe")
            readMoreBtn[1].innerHTML = "<span data-locale='readMore'>Läs Mer</span>";
            
        // insert these all parts into a main container
        injContainer.appendChild(imgSubComponent);
        injContainer.appendChild(txtSubComponent);
    }
}

function changeLanguage(inputLang)
{
    if(inputLang != 'swe' && inputLang != 'eng')
        return;

    if(inputLang == 'swe')
    {
        contentLanguage = "swe";
        var langPack = langPack_sv;
        document.getElementById('engFlag').style.borderColor = '#F9F9F9';
        document.getElementById('sweFlag').style.borderColor = '#8E0070'; 
        dataContent = dataContent_sv;
    }
    else if(inputLang == 'eng')
    {
        contentLanguage = "eng";
        var langPack = langPack_en;
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
    
    redrawContent();
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