const tabPerSingle = document.getElementById("tabPerSingle");
const tabPerBatch = document.getElementById("tabPerBatch");

const frmPerSingle = document.getElementById("frmPerSingle");
const frmPerBatch = document.getElementById("frmPerBatch");

const btnSingleReset = document.getElementById("btnSingleReset");
const btnSingleCalculate = document.getElementById("btnSingleCalculate");

const btnBatchfReset = document.getElementById("btnBatchReset");
const btnBatchCalculate = document.getElementById("btnBatchCalculate");

const footerLogo = document.getElementById("footerLogo");


tabPerSingle.addEventListener("click", function(event) {
    event.preventDefault();
    frmPerBatch.setAttribute("class", "hide"); 
    frmPerSingle.setAttribute("class", "content");
    });

tabPerBatch.addEventListener("click", function(event) {
    event.preventDefault();
    frmPerSingle.setAttribute("class", "hide"); 
    frmPerBatch.setAttribute("class", "content");
    });

btnSingleReset.addEventListener("click", function() {
    document.getElementById("singleVolume").value = "";
    document.getElementById("singleSolidsPct").value = "";
    document.getElementById("singleSolidsAmt").value = "";    
    document.getElementById("lblOunces").innerHTML = "";  
    document.getElementById("singleVolume").style.backgroundColor = "#fff"
    document.getElementById("singleSolidsPct").style.backgroundColor = "#fff"
    document.getElementById("singleSolidsAmt").style.backgroundColor = "#fff"
    generateFooterLogo();
});

btnBatchReset.addEventListener("click", function() {
    document.getElementById("batchVolume").value = "";
    document.getElementById("batchSolidsPct").value = "";
    document.getElementById("batchSolidsAmt").value = "";   
    document.getElementById("lblGallons").innerHTML = "";
    document.getElementById("batchleVolume").style.backgroundColor = "#fff"
    document.getElementById("batchSolidsPct").style.backgroundColor = "#fff"
    document.getElementById("batchSolidsAmt").style.backgroundColor = "#fff"
    generateFooterLogo();
});

btnSingleCalculate.addEventListener("click", function() {
    document.getElementById("singleVolume").style.backgroundColor = "#fff"
    document.getElementById("singleSolidsPct").style.backgroundColor = "#fff"
    document.getElementById("singleSolidsAmt").style.backgroundColor = "#fff"
    let indexVolume = checkTextEntry(document.getElementById("singleVolume").value.trim());
    let indexPct = checkTextEntry(document.getElementById("singleSolidsPct").value.trim());
    let indexAmt = checkTextEntry(document.getElementById("singleSolidsAmt").value.trim());    
    let indexSum = indexVolume + indexPct + indexAmt;
    if (indexSum == 0)
    {
        document.getElementById("lblSingleMessage").innerHTML = 'At least one of the parameters needs to be blank. ';
    }
    else if (indexSum >= 2)
    {
        document.getElementById("lblSingleMessage").innerHTML = 'Make sure two parameters contain numbers and the third one is blank. ';        
    }
    else
    {
        let valueVolume = Number(document.getElementById("singleVolume").value.trim());
        let valuePct = Number(document.getElementById("singleSolidsPct").value.trim());
        let valueAmt = Number(document.getElementById("singleSolidsAmt").value.trim());
        if (indexVolume == 1)
        {
            valueVolume = ((valueAmt / (valuePct/100)) / 2.15).toFixed(2); 
            document.getElementById("singleVolume").value = valueVolume;
            document.getElementById("singleVolume").style.backgroundColor = "lightblue"
            document.getElementById("lblOunces").innerHTML = "";  
        }
        if (indexPct == 1)
        {
            valuePct = (valueAmt / (valueVolume * 2.15)*100).toFixed(1);
            document.getElementById("singleSolidsPct").value = valuePct;
            document.getElementById("singleSolidsPct").style.backgroundColor = "lightblue"
            document.getElementById("lblOunces").innerHTML = "";  
            
        }
        if (indexAmt == 1)
        {
            valueAmt = ((valuePct/100) * (valueVolume * 2.15)).toFixed(3);
            document.getElementById("singleSolidsAmt").value = valueAmt;
            document.getElementById("singleSolidsAmt").style.backgroundColor = "lightblue"
            document.getElementById("lblOunces").innerHTML = (valueAmt*16).toFixed(1) + " oz";
        }
    }
    generateFooterLogo();
    
});

btnBatchCalculate.addEventListener("click", function() {
    document.getElementById("batchVolume").style.backgroundColor = "#fff"
    document.getElementById("batchSolidsPct").style.backgroundColor = "#fff"
    document.getElementById("batchSolidsAmt").style.backgroundColor = "#fff"
    let indexVolume = checkTextEntry(document.getElementById("batchVolume").value.trim());
    let indexPct = checkTextEntry(document.getElementById("batchSolidsPct").value.trim());
    let indexAmt = checkTextEntry(document.getElementById("batchSolidsAmt").value.trim());    
    let indexSum = indexVolume + indexPct + indexAmt;
    if (indexSum == 0)
    {
        document.getElementById("lblBatchMessage").innerHTML = 'At least one of the parameters needs to be blank. ';
    }
    else if (indexSum >= 2)
    {
        document.getElementById("lblBatchMessage").innerHTML = 'Make sure two parameters contain numbers and the third one is blank. ';        
    }
    else
    {
        let valueVolume = Number(document.getElementById("batchVolume").value.trim());
        let valuePct = Number(document.getElementById("batchSolidsPct").value.trim());
        let valueAmt = Number(document.getElementById("batchSolidsAmt").value.trim());
        if (indexVolume == 1)
        {
            valueVolume = ((valueAmt / (valuePct/100)) / 2.15).toFixed(1); 
            document.getElementById("batchVolume").value = valueVolume;
            document.getElementById("batchVolume").style.backgroundColor = "lightblue"
            document.getElementById("lblGallons").innerHTML = (valueVolume/8.3).toFixed(1) + " gal";
        }
        if (indexPct == 1)
        {
            valuePct = (valueAmt / (valueVolume * 2.15)*100).toFixed(1);
            document.getElementById("batchSolidsPct").value = valuePct;
            document.getElementById("batchSolidsPct").style.backgroundColor = "lightblue"
            document.getElementById("lblGallons").innerHTML = "";  
        }
        if (indexAmt == 1)
        {
            valueAmt = ((valuePct/100) * (valueVolume * 2.15)).toFixed(1);
            document.getElementById("batchSolidsAmt").value = valueAmt;
            document.getElementById("batchSolidsAmt").style.backgroundColor = "lightblue"
            document.getElementById("lblGallons").innerHTML = "";  
        }
    }
    generateFooterLogo();
    
});




//Functions
    function checkTextEntry(inputtedText)
    {
        let index = 0;
        //let _blnTextOK = true;
        document.getElementById("lblSingleMessage").innerHTML = '';
        document.getElementById("lblBatchMessage").innerHTML = '';    
        if (isNaN(inputtedText) || inputtedText == '')
        {
            index += 1;
        }
        return index;
    }


function generateFooterLogo()
{
    let num = Math.floor(Math.random()*9)
    if (num == 0)
    {
        footerLogo.src="css/CalfAllyElectrolytes.JPG"
    }
    if (num == 1)
    {
        footerLogo.src="css/CalfAllyGel.JPG"
    }
    if (num == 2)
    {
        footerLogo.src="css/CalfAllyNT.JPG"
    }
    if (num == 3)
    {
        footerLogo.src="css/Excelerate.JPG"
    }
    if (num == 4)
    {
        footerLogo.src="css/MilkBridge.JPG"
    }
    if (num == 5)
    {
        footerLogo.src="css/MilkEnergizer.JPG"
    }
    if (num == 6)
    {
        footerLogo.src="css/MilkPrimer.JPG"
    }
    if (num == 7)
    {
        footerLogo.src="css/NutraStart.JPG"
    }
    if (num == 8)
    {
        footerLogo.src="css/OrganiCalf.JPG"
    }

    
}



