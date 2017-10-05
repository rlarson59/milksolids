const tabPerSingle = document.getElementById("tabPerSingle");
const tabPerBatch = document.getElementById("tabPerBatch");

const frmPerSingle = document.getElementById("frmPerSingle");
const frmPerBatch = document.getElementById("frmPerBatch");

//const btnSingleReset = document.getElementById("btnSingleReset");
//const btnSingleCalculate = document.getElementById("btnSingleCalculate");

//const btnBatchfReset = document.getElementById("btnBatchReset");
//const btnBatchCalculate = document.getElementById("btnBatchCalculate");

const btnCalculate = document.getElementById("btnCalculate");

const footerLogo = document.getElementById("footerLogo");
let unknownParameter = "";
let changedParameter = "";
let volumeFactor = 2.15;
let tabType = "Single";
let entryCounter = 0;

tabPerSingle.addEventListener("click", function(event) {
    event.preventDefault();
    clearInputs();
    //frmPerBatch.setAttribute("class", "hide"); 
    frmPerBatch.style.display = "none";
    frmPerSingle.style.display = "block";
    //divPerSingle.setAttribute("class", "content");
    //frmPerSingle.setAttribute("class", "content");
    document.getElementById("lblOunces").innerHTML = ""; 
    document.getElementById("lblMessage").innerHTML = ""; 
    volumeFactor = 2.15;
    unknownParameter = "";
    changedParameter = "";        
    tabType = "Single";
    let entryCounter = 0;
    generateFooterLogo();
    });

tabPerBatch.addEventListener("click", function(event) {
    event.preventDefault();
    clearInputs();
    //frmPerSingle.setAttribute("class", "hide");
    //tabPerBatch.style.zIndex = "-3";
    frmPerSingle.style.display = "none";
    frmPerBatch.style.display = "block";
    //frmPerBatch.setAttribute("class", "content");
    document.getElementById("lblGallons").innerHTML = "";
    document.getElementById("lblMessage").innerHTML = ""; 
    volumeFactor = 1.0;
    unknownParameter = "";
    changedParameter = "";
    tabType = "Batch";
    let entryCounter = 0;
    generateFooterLogo();
    });

/*btnReset.addEventListener("click", function() {
    clearInputs();
    unknownParameter = "";
    changedParameter = "";
    document.getElementById("lblOunces").innerHTML = "";  
    document.getElementById("lblGallons").innerHTML = "";
    generateFooterLogo();
});*/


/*
btnCalculate.addEventListener("click", function() {
    if (tabType == "Single")
    {
        if (unknownParameter != "")
        {
            if (changedParameter != unknownParameter)
            {
                updateUnknownSingleParameter();
            }
            else
            {
                processSingleParameters();
            }      
        }
        else
        {
            processSingleParameters()
        }
    }
    else
    {
          if (unknownParameter != "")
          {
            if (changedParameter != unknownParameter)
            {
                updateUnknownBatchParameter();
            }
            else
            {
                processBatchParameters();
            }      
          }
          else
          {
              processBatchParameters()
          }        
    }
    generateFooterLogo();
});    
*/

btnCalculate.addEventListener("click", Calculate, false);
//btnCalculate.addEventListener("touchstart", Calculate, false);


//*******************
//Functions
//*******************

function Reset()
{
    clearInputs();
    unknownParameter = "";
    changedParameter = "";
    document.getElementById("lblOunces").innerHTML = "";  
    document.getElementById("lblGallons").innerHTML = "";
    //event.preventDefault();
    //generateFooterLogo();    
}

function Calculate(event)
{
    if (tabType == "Single")
    {
        if (unknownParameter != "")
        {
            if (changedParameter != unknownParameter)
            {
                updateUnknownSingleParameter();
            }
            else
            {
                processSingleParameters();
            }      
        }
        else
        {
            processSingleParameters()
        }
    }
    else
    {
          if (unknownParameter != "")
          {
            if (changedParameter != unknownParameter)
            {
                updateUnknownBatchParameter();
            }
            else
            {
                processBatchParameters();
            }      
          }
          else
          {
              processBatchParameters()
          }        
    }
    generateFooterLogo();
    event.preventDefault();
}

function valueVolumeChanged()
{
    changedParameter = "valueVolume";
    if (tabType == "Batch")
    {
        let indexVolume = checkTextEntry(document.getElementById("batchVolume").value.trim());
        if (indexVolume == 0)
        {
            document.getElementById("lblGallons").innerHTML = (document.getElementById("batchVolume").value/8.3).toFixed(1) + " gal";                        
        }
        else
        {
            document.getElementById("lblGallons").innerHTML = "";                       
        }
    }
    if (unknownParameter != "")
    {
        if (changedParameter != unknownParameter)
        {
            if (tabType == "Single")
            {
                updateUnknownSingleParameter();                                                    
            }
            else
            {
                updateUnknownBatchParameter(); 
          }
        }
        else
        {
            if (tabType == "Single")
            {
                processSingleParameters();                
            }
            else
            {
                processBatchParameters();                                
            }
        }
    }
}

function valueSolidsPctChanged()
{
    changedParameter = "valuePct";
    if (unknownParameter != "")
    {
        if (changedParameter != unknownParameter)
        {
            if (tabType == "Single")
            {
                updateUnknownSingleParameter();                                                    
            }
            else
            {
                updateUnknownBatchParameter();                                
            }
        }
        else
        {
            if (tabType == "Single")
            {
                processSingleParameters();                
            }
            else
            {
                processBatchParameters();                                
            }
        }
    }
}

function valueSolidsAmtChanged()
{
    changedParameter = "valueAmt";
    if (tabType == "Single")
    {
        let indexAmt = checkTextEntry(document.getElementById("singleSolidsAmt").value.trim());  
        if (indexAmt == 0)
        {
            document.getElementById("lblOunces").innerHTML = document.getElementById("lblOunces").innerHTML = (document.getElementById("singleSolidsAmt").value*16).toFixed(1) + " oz";                     
        }
        else
        {
            document.getElementById("lblOunces").innerHTML = "";                       
        }
    }    
    if (unknownParameter != "")
    {
        if (changedParameter != unknownParameter)
        {
            if (tabType == "Single")
            {
                updateUnknownSingleParameter();                                                    
            }
            else
            {
                updateUnknownBatchParameter();                                
            }
        }
        else
        {
            if (tabType == "Single")
            {
                processSingleParameters();                
            }
            else
            {
                processBatchParameters();                                
            }
        }
    }
}

function processSingleParameters()
{
        let indexVolume = checkTextEntry(document.getElementById("singleVolume").value.trim());
        let indexPct = checkTextEntry(document.getElementById("singleSolidsPct").value.trim());
        let indexAmt = checkTextEntry(document.getElementById("singleSolidsAmt").value.trim());    
        let indexSum = indexVolume + indexPct + indexAmt;
        if (indexSum == 0)
        {
            document.getElementById("lblMessage").innerHTML = 'At least one of the parameters needs to be blank. ';
        }
        else if (indexSum >= 2)
        {
            document.getElementById("lblMessage").innerHTML = 'Make sure two parameters contain numbers and the third one is blank. ';        
        }
        else
        {
            let valueVolume = Number(document.getElementById("singleVolume").value.trim());
            let valuePct = Number(document.getElementById("singleSolidsPct").value.trim());
            let valueAmt = Number(document.getElementById("singleSolidsAmt").value.trim());
            if (indexVolume == 1)
            {
                unknownParameter = "valueVolume";
                valueVolume = ((valueAmt / (valuePct/100)) / volumeFactor).toFixed(2); 
                document.getElementById("singleVolume").value = valueVolume;
                document.getElementById("singleVolume").style.backgroundColor = "lightblue"
                //document.getElementById("lblOunces").innerHTML = "";  
            }
            if (indexPct == 1)
            {
                unknownParameter = "valuePct";
                valuePct = (valueAmt / (valueVolume * volumeFactor)*100).toFixed(1);
                document.getElementById("singleSolidsPct").value = valuePct;
                document.getElementById("singleSolidsPct").style.backgroundColor = "lightblue"
                //document.getElementById("lblOunces").innerHTML = "";  
            }
            if (indexAmt == 1)
            {
                unknownParameter = "valueAmt";
                valueAmt = ((valuePct/100) * (valueVolume * volumeFactor)).toFixed(3);
                document.getElementById("singleSolidsAmt").value = valueAmt;
                document.getElementById("singleSolidsAmt").style.backgroundColor = "lightblue"
                document.getElementById("lblOunces").innerHTML = (valueAmt*16).toFixed(1) + " oz";
            }
        }
}

function updateUnknownSingleParameter()
{
        let valueVolume = Number(document.getElementById("singleVolume").value.trim());
        let valuePct = Number(document.getElementById("singleSolidsPct").value.trim());
        let valueAmt = Number(document.getElementById("singleSolidsAmt").value.trim());
        if (unknownParameter == "valueVolume")
        {
            unknownParameter = "valueVolume";
            valueVolume = ((valueAmt / (valuePct/100)) / volumeFactor).toFixed(2); 
            document.getElementById("singleVolume").value = valueVolume;
            document.getElementById("singleVolume").style.backgroundColor = "lightblue"
            //document.getElementById("lblOunces").innerHTML = "";  
        }
        if (unknownParameter == "valuePct")
        {
            unknownParameter = "valuePct";
            valuePct = (valueAmt / (valueVolume * volumeFactor)*100).toFixed(1);
            document.getElementById("singleSolidsPct").value = valuePct;
            document.getElementById("singleSolidsPct").style.backgroundColor = "lightblue"
            //document.getElementById("lblOunces").innerHTML = "";  
            
        }
        if (unknownParameter == "valueAmt")
        {
            unknownParameter = "valueAmt";
            valueAmt = ((valuePct/100) * (valueVolume * volumeFactor)).toFixed(3);
            document.getElementById("singleSolidsAmt").value = valueAmt;
            document.getElementById("singleSolidsAmt").style.backgroundColor = "lightblue"
            document.getElementById("lblOunces").innerHTML = (valueAmt*16).toFixed(1) + " oz";
        }
}
    
function processBatchParameters()
{ 
    let indexVolume = checkTextEntry(document.getElementById("batchVolume").value.trim());
    let indexPct = checkTextEntry(document.getElementById("batchSolidsPct").value.trim());
    let indexAmt = checkTextEntry(document.getElementById("batchSolidsAmt").value.trim());    
    let indexSum = indexVolume + indexPct + indexAmt;
    if (indexSum == 0)
    {
        document.getElementById("lblMessage").innerHTML = 'At least one of the parameters needs to be blank. ';
    }
    else if (indexSum >= 2)
    {
        document.getElementById("lblMessage").innerHTML = 'Make sure two parameters contain numbers and the third one is blank. ';        
    }
    else
    {
        let valueVolume = Number(document.getElementById("batchVolume").value.trim());
        let valuePct = Number(document.getElementById("batchSolidsPct").value.trim());
        let valueAmt = Number(document.getElementById("batchSolidsAmt").value.trim());
        if (indexVolume == 1)
        {
            unknownParameter = "valueVolume";
            valueVolume = ((valueAmt / (valuePct/100)) / volumeFactor - valueAmt).toFixed(1); 
            document.getElementById("batchVolume").value = valueVolume;
            document.getElementById("batchVolume").style.backgroundColor = "lightblue"
            document.getElementById("lblGallons").innerHTML = (valueVolume/8.3).toFixed(1) + " gal";
        }
        if (indexPct == 1)
        {
            unknownParameter = "valuePct";
            valuePct = (valueAmt / (valueVolume * volumeFactor + valueAmt)*100).toFixed(1);
            document.getElementById("batchSolidsPct").value = valuePct;
            document.getElementById("batchSolidsPct").style.backgroundColor = "lightblue"
            //document.getElementById("lblGallons").innerHTML = "";  
        }
        if (indexAmt == 1)
        {
            unknownParameter = "valueAmt";
            valueAmt = ((valuePct/100) * (valueVolume * volumeFactor)).toFixed(1);
            document.getElementById("batchSolidsAmt").value = valueAmt;
            document.getElementById("batchSolidsAmt").style.backgroundColor = "lightblue"
            //document.getElementById("lblGallons").innerHTML = "";  
        }
    }    
}
    
function updateUnknownBatchParameter()
{
        let valueVolume = Number(document.getElementById("batchVolume").value.trim());
        let valuePct = Number(document.getElementById("batchSolidsPct").value.trim());
        let valueAmt = Number(document.getElementById("batchSolidsAmt").value.trim());
        if (unknownParameter == "valueVolume")
        {
            unknownParameter = "valueVolume";
            valueVolume = ((valueAmt / (valuePct/100)) / volumeFactor - valueAmt).toFixed(1); 
            document.getElementById("batchVolume").value = valueVolume;
            document.getElementById("batchVolume").style.backgroundColor = "lightblue"
            document.getElementById("lblGallons").innerHTML = (valueVolume/8.3).toFixed(1) + " gal";
        }
        if (unknownParameter == "valuePct")
        {
            unknownParameter = "valuePct";
            valuePct = (valueAmt / (valueVolume * volumeFactor + valueAmt)*100).toFixed(1);
            document.getElementById("batchSolidsPct").value = valuePct;
            document.getElementById("batchSolidsPct").style.backgroundColor = "lightblue"
            //document.getElementById("lblGallons").innerHTML = ""; 
            
        }
        if (unknownParameter == "valueAmt")
        {
            unknownParameter = "valueAmt";
            valueAmt = ((valuePct/100) * (valueVolume * volumeFactor)).toFixed(1);
            document.getElementById("batchSolidsAmt").value = valueAmt;
            document.getElementById("batchSolidsAmt").style.backgroundColor = "lightblue"
            //document.getElementById("lblGallons").innerHTML = "";
        }    
}
    
function checkTextEntry(inputtedText)
{
    let index = 0;
    //let _blnTextOK = true;
    document.getElementById("lblMessage").innerHTML = '';
    if (isNaN(inputtedText) || inputtedText == '')
    {
        index += 1;
    }
    return index;
}

function clearInputs()
{
    var x = document.getElementsByName("textinput");
    var i;
    for (i = 0; i < x.length; i++) 
    {
        x[i].style.backgroundColor = "white";
        x[i].value = "";
    } 
}


function generateFooterLogo()
{
    let num = Math.floor(Math.random()*10)
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
    if (num == 9)
    {
        footerLogo.src="css/Turba.jpg"
    }    

}



