var url = 'http://localhost:8080';

var tabIds = ["tab1", "tab2", "tab3"];
var tabButtonIds = ["tabButton1", "tabButton2", "tabButton3"];
var endpointPaths = ['/api/get-profile','/api/get-education','/api/get-job'];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getData(tabId)
{
    console.log(tabId);
    if(tabId == 1)
    {
        getProfileData();
    } 
    else if(tabId == 2){
        getSchoolData();
    } 
    else if(tabId == 3){
        getJobData();
    }
}

function getProfileData(){

    for(i=1;i<=tabIds.length;i++)
    {
        document.getElementById(tabIds[i-1]).innerHTML = "";
    }

    json = fetch(url+endpointPaths[0])
        .then(response => response.json())
        .then(json => {
            document.getElementById("tab1").innerHTML = document.getElementById("tab1").innerHTML    
            +json.data;
        });
}

function getSchoolData(){

    for(i=1;i<=tabIds.length;i++)
    {
        document.getElementById(tabIds[i-1]).innerHTML = "";
    }

    json = fetch(url+endpointPaths[1])
        .then(response => response.json())
        .then(json => {
            for(let i = 1 ;i<=json.length;i++){
                document.getElementById("tab2").innerHTML = 
                    document.getElementById("tab2").innerHTML + prepareSchoolDiv(i)

                document.getElementById("school"+i).innerHTML = 
                    json[i-1].schoolName+
                    "<br>Od: "+json[i-1].dateFrom+
                    (json[i-1].dateTo == null ? "<br>W trakcie" : "<br>Do: "+json[i-1].dateTo)+
                    "<br>"+json[i-1].additionalInformation;
            }
        });
}

function getJobData(){

    for(i=1;i<=tabIds.length;i++)
    {
        document.getElementById(tabIds[i-1]).innerHTML = "";
    }
    
    json = fetch(url+endpointPaths[2])
        .then(response => response.json())
        .then(json => {
            for(let i = 1 ;i<=json.length;i++){
                document.getElementById("tab3").innerHTML = 
                    document.getElementById("tab3").innerHTML + prepareJobDiv(i);
                
                document.getElementById("job"+i).innerHTML = 
                "Nazwa firmy: "+json[i-1].companyName+
                "<br>Stanowisko: "+json[i-1].positionName+
                "<br>Od: "+json[i-1].dateFrom+
                (json[i-1].dateTo == null ? "<br>W trakcie" : "<br>Do: "+json[i-1].dateTo)+
                "<br>Opis: "+json[i-1].description;
            }
        });
}

function prepareSchoolDiv(i){
    let div = "<div class=\"jobAndEducationElement\" id=\"school"+i+"\"></div>";
    return div;
}

function prepareJobDiv(i){
    let div = "<div class=\"jobAndEducationElement\" id=\"job"+i+"\"></div>";
    return div;
}

$(document).ready(function(){
    $(".tabButton").click(async function(){

        let buttonId = this.id;
        let tabId;
        let sleepDuration = 0;

        for(let i=1; i<=tabIds.length;i++){

            if(window.getComputedStyle(document.getElementById(tabIds[i-1])).display!="none" && buttonId!=tabButtonIds[i-1])
            {
                $('#'+tabIds[i-1]).animate({width: 'toggle'});
                await sleep(300);
                document.getElementById(tabButtonIds[i-1]).style.position = "absolute";
                document.getElementById(tabButtonIds[i-1]).style.marginTop = "1%";
                sleepDuration = 300;
            }

            if(buttonId==tabButtonIds[i-1])
            {
                tabId = i;
            }
        }

        await sleep(sleepDuration);

        if(document.getElementById(buttonId).style.position == "static")
        {
            $('#'+tabIds[tabId-1]).animate({width: 'toggle'});
            await sleep(300);
            document.getElementById(buttonId).style.position = "absolute";
            document.getElementById(buttonId).style.marginTop = "1%";
        }
        else
        {
            $('#'+tabIds[tabId-1]).animate({width: 'toggle'});
            let calculatedTopMargin = window.getComputedStyle(document.getElementById(buttonId)).top;
            let calculatedHeight = window.getComputedStyle(document.getElementById(buttonId)).height;
            let calculatedToolbarHeight = window.getComputedStyle(document.getElementById("toolbar")).height;
            document.getElementById(buttonId).style.position = "static";
            document.getElementById(buttonId).style.marginTop = calculatedTopMargin.slice(0,calculatedTopMargin.length-2) - calculatedToolbarHeight.slice(0,calculatedToolbarHeight.length-2)+"px";
            document.getElementById(buttonId).style.height = calculatedHeight;
            getData(tabId);
        }
        
    })
});