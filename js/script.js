$(document).on('pagecreate', function (evt) {
    $("#tabPerSingle").on("tap", function (e) {
        clearInputs();
        frmPerBatch.style.display = "none";
        frmPerSingle.style.display = "block";
        document.getElementById("lblOunces").innerHTML = ""; 
        document.getElementById("lblMessage").innerHTML = ""; 
        volumeFactor = 2.15;
        unknownParameter = "";
        changedParameter = "";        
        tabType = "Single";
        let entryCounter = 0;
        generateFooterLogo();
    });
    
    $("#tabPerBatch").on("tap", function (e) {
        clearInputs();
        frmPerSingle.style.display = "none";
        frmPerBatch.style.display = "block";
        document.getElementById("lblGallons").innerHTML = "";
        document.getElementById("lblMessage").innerHTML = ""; 
        volumeFactor = 1.0;
        unknownParameter = "";
        changedParameter = "";
        tabType = "Batch";
        let entryCounter = 0;
        generateFooterLogo();
    });    
    
    $("#btnReset").on("tap", function (e) {
        //e.preventDefault();
        Reset();
    });

    $("#btnCalculate").on("tap", function (e) {
        //e.preventDefault();
        Calculate();
    });
    
    $(document).on("change", "#singleVolume", function () {
        valueVolumeChanged();
    });

        $(document).on("change", "#singleSolidsPct", function () {
        valueSolidsPctChanged();
    });

        $(document).on("change", "#singleSolidsAmt", function () {
        valueSolidsAmtChanged();
    });
    
   $(document).on("change", "#batchVolume", function () {
        valueVolumeChanged();
    });

        $(document).on("change", "#batchSolidsPct", function () {
        valueSolidsPctChanged();
    });

        $(document).on("change", "#batchSolidsAmt", function () {
        valueSolidsAmtChanged();
    });    

          
const footerLogo = document.getElementById("footerLogo");

let unknownParameter = "";
let changedParameter = "";
let volumeFactor = 2.15;
let tabType = "Single";
let entryCounter = 0;    
    
function Reset()
{
    clearInputs();
    unknownParameter = "";
    changedParameter = "";
    document.getElementById("lblOunces").innerHTML = "";  
    document.getElementById("lblGallons").innerHTML = "";
    //event.preventDefault();
    generateFooterLogo();    
}
   
function Calculate()
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
    //event.preventDefault();
}


function valueVolumeChanged()
{
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
    changedParameter = "valueVolume";

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
            document.getElementById("lblGallons").innerHTML = (valueVolume/8.3).toFixed(1) + " lb";
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
                var num = Math.floor(Math.random()*10)
                if (num == 0)
                {
                    footerLogo.src="images/CalfAllyElectrolytes.JPG"
                }
                if (num == 1)
                {
                    footerLogo.src="images/CalfAllyGel.JPG"
                }
                if (num == 2)
                {
                    footerLogo.src="images/CalfAllyNT.JPG"
                }
                if (num == 3)
                {
                    footerLogo.src="images/Excelerate.JPG"
                }
                if (num == 4)
                {
                    footerLogo.src="images/MilkBridge.JPG"
                }
                if (num == 5)
                {
                    footerLogo.src="images/MilkEnergizer.JPG"
                }
                if (num == 6)
                {
                    footerLogo.src="images/MilkPrimer.JPG"
                }
                if (num == 7)
                {
                    footerLogo.src="images/NutraStart.JPG"
                }
                if (num == 8)
                {
                    footerLogo.src="images/OrganiCalf.JPG"
                }
                if (num == 9)
                {
                    footerLogo.src="images/Turba.jpg"
                }    
            }
        });   
