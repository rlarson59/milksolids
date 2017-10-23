  
//$(document).on('pagecreate', function (evt) {
$(document).ready(function(){
    
    $("#btnReset").on("tap", function (e) {
        Reset();
    });

    $("#btnCalculate").on("tap", function (e) {
        Calculate();
    });
    
    $("#btnPerBatch").on("tap", function (e) {
        clearInputs();
        document.getElementById("lblMessage").innerHTML = ""; 
        //let volumeFactor = 2.15;
        unknownParameter = "";
        changedParameter = "";
        formatType = "Batch";
        entryCounter = 0;
        //$("#pageSingle").load("examplehtml.html");
        generateFooterLogo();
        window.location = "perbatch.html";
    });
    
    $("#btnPerFeeding").on("tap", function (e) {
        clearInputs();
        document.getElementById("lblMessage").innerHTML = ""; 
        //let volumeFactor = 2.15;
        unknownParameter = "";
        changedParameter = "";        
        formatType = "Single";
        entryCounter = 0;
        generateFooterLogo();
        window.location = "index.html";
    });
    
    $("#btnProducts").on("tap", function (e) {
        clearInputs();
        document.getElementById("lblMessage").innerHTML = ""; 
        //let volumeFactor = 2.15;
        unknownParameter = "";
        changedParameter = "";        
        formatType = "";
        entryCounter = 0;
        generateFooterLogo();
        window.location = "products.html";
    });    
    
    $("#btnHome").on("tap", function (e) {
        //clearInputs();
        //let volumeFactor = 2.15;
        unknownParameter = "";
        changedParameter = "";        
        formatType = "Single";
        entryCounter = 0;
        window.location = "index.html";
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
    
    $(document).on("change", "#numPerDay", function () {
        if (formatType != "Batch")
        {
            updateSingleCalculations();                
        }
        else
        {
            updateBatchCalculations();                    
        }
    });
    
    $(document).on("change", "#numCalves", function () {
        if (formatType != "Batch")
        {
            updateSingleCalculations();                
        }
        else
        {
            updateBatchCalculations();                    
        }
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

});          


function Reset()
{
    clearInputs();
    unknownParameter = "";
    changedParameter = "";
    
    $('#divSingleOunces').hide();
    $('#divCalfOunces').hide();
    generateFooterLogo();    
}
   
function Calculate()
{
   if (formatType != "Batch")
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
        updateSingleCalculations();
        $("#divSingleOunces").show();
        $("#divCalfOunces").show();
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
        updateBatchCalculations();
        $("#divSingleOunces").show();
        $("#divCalfOunces").show();
    }
    generateFooterLogo();
}


function valueVolumeChanged()
{
    if (formatType == "Batch")
    {
        
        let indexVolume = checkTextEntry(document.getElementById("batchVolume").value.trim());
        if (indexVolume == 0)
        {
            //document.getElementById("lblGallons").innerHTML = (document.getElementById("batchVolume").value/8.3).toFixed(1) + " gal";                        
        }
        else
        {
            //document.getElementById("lblGallons").innerHTML = "";                       
        }
    }
    changedParameter = "valueVolume";

    if (unknownParameter != "")
    {
        if (changedParameter != unknownParameter)
        {
            if (formatType != "Batch")
            {
                updateUnknownSingleParameter();
                updateSingleCalculations();
            }
            else
            {
                updateUnknownBatchParameter();
                updateBatchCalculations();
          }
        }
        else
        {
            if (formatType != "Batch")
            {
                processSingleParameters(); 
                updateSingleCalculations();
            }
            else
            {
                processBatchParameters(); 
                updateBatchCalculations();
            }
        }
    }
    else
    {
        if (formatType != "Batch")
        {
            processSingleParameters();
            updateSingleCalculations();
        }
        else
        {
            processBatchParameters();  
            updateBatchCalculations();
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
            if (formatType != "Batch")
            {
                updateUnknownSingleParameter();
                updateSingleCalculations();
            }
            else
            {
                updateUnknownBatchParameter();
                updateBatchCalculations();
            }
        }
        else
        {
            if (formatType != "Batch")
            {
                processSingleParameters();
                updateSingleCalculations();
            }
            else
            {
                processBatchParameters();  
                updateBatchCalculations();
            }
        }
    }
}

function valueSolidsAmtChanged()
{
    changedParameter = "valueAmt";
    let indexAmt = 1;
    if (formatType != "Batch")
    {
        indexAmt = checkTextEntry($("#singleSolidsAmt").val());
        updateSingleCalculations();
    }
    else
    {
        indexAmt = checkTextEntry($("#batchSolidsAmt").val());    
        updateBatchCalculations();
    }
    if (indexAmt == 0)
    {
        $('#divSingleOunces').show();
        $('#divCalfOunces').show();
    }
    else
    {
        $('#divSingleOunces').hide();
        $('#divCalfOunces').hide();
    }
    if (unknownParameter != "")
    {
        if (changedParameter != unknownParameter)
        {
            if (formatType != "Batch")
            {
                updateUnknownSingleParameter();                                                    
                updateSingleCalculations();
            }
            else
            {
                updateUnknownBatchParameter();
                updateBatchCalculations();
            }
        }
        else
        {
            if (formatType != "Batch")
            {
                processSingleParameters(); 
                updateSingleCalculations();
            }
            else
            {
                processBatchParameters();                                
                updateBatchCalculations();
            }
        }
    }
}


    function processSingleParameters()
    {
        let indexVolume = checkTextEntry($("#singleVolume").val());
        let indexPct = checkTextEntry($("#singleSolidsPct").val());
        let indexAmt = checkTextEntry($("#singleSolidsAmt").val());    
        let indexSum = indexVolume + indexPct + indexAmt;
        if (indexSum == 0)
        {
            $("#lblMessage").html("At least one of the parameters needs to be blank. ");
        }
        else if (indexSum >= 2)
        {
            $("#lblMessage").html("Make sure two parameters contain numbers and the third one is blank. ");
        }
        else
        {
            let valueVolume = Number($("#singleVolume").val());
            let valuePct = Number($("#singleSolidsPct").val());
            let valueAmt = Number($("#singleSolidsAmt").val());
            if (indexVolume == 1)
            {
                unknownParameter = "valueVolume";
                $("#singleVolume").val(((valueAmt / (valuePct/100)) / volumeFactor).toFixed(2));
                $("#singleVolume").css('background-color','lightblue');
            }
            if (indexPct == 1)
            {
                unknownParameter = "valuePct";
                $("#singleSolidsPct").val((valueAmt / (valueVolume * volumeFactor)*100).toFixed(1));
                $("#singleSolidsPct").css('background-color','lightblue');
            }
            if (indexAmt == 1)
            {
                unknownParameter = "valueAmt";
                $("#singleSolidsAmt").val(((valuePct/100) * (valueVolume * volumeFactor)).toFixed(3));
                $("#singleSolidsAmt").css('background-color','lightblue');
                $("#singleSolidsOunces").val((valueAmt*16).toFixed(1));
                $("#divSingleOunces").css('display', 'block');
            }
        }
    }

    function updateUnknownSingleParameter()
    {
        let valueVolume = checkTextEntry($("#singleVolume").val());
        let valuePct = checkTextEntry($("#singleSolidsPct").val());
        let valueAmt = checkTextEntry($("#singleSolidsAmt").val());    
        if (unknownParameter == "valueVolume")
        {
            unknownParameter = "valueVolume";
            $("#singleVolume").val(((valueAmt / (valuePct/100)) / volumeFactor).toFixed(2));
            $("#singleVolume").css('background-color','lightblue');
        }
        if (unknownParameter == "valuePct")
        {
            unknownParameter = "valuePct";
            $("#singleSolidsPct").val((valueAmt / (valueVolume * volumeFactor)*100).toFixed(1));
            $("#singleSolidsPct").css('background-color','lightblue');
        }
        if (unknownParameter == "valueAmt")
        {
            unknownParameter = "valueAmt";
            $("#singleSolidsAmt").val(((valuePct/100) * (valueVolume * volumeFactor)).toFixed(3));
            $("#singleSolidsAmt").css('background-color','lightblue');
            $("#singleSolidsOunces").val(($("#singleSolidsAmt").val()*16).toFixed(1)); 
            $("#divSingleOunces").css('display', 'block');
        }
    }
    
function processBatchParameters()
{ 
    let indexVolume = checkTextEntry($("#batchVolume").val());
    let indexPct = checkTextEntry($("#batchSolidsPct").val());
    let indexAmt = checkTextEntry($("#batchSolidsAmt").val());    
    let indexSum = indexVolume + indexPct + indexAmt;
    if (indexSum == 0)
    {
         $("#lblMessage").html("At least one of the parameters needs to be blank. ");
    }
    else if (indexSum >= 2)
    {
        $("#lblMessage").html("Make sure two parameters contain numbers and the third one is blank. ");        
    }
    else
    {
        let valueVolume = Number($("#batchVolume").val());
        let valuePct = Number($("#batchSolidsPct").val());
        let valueAmt = Number($("#batchSolidsAmt").val());
        if (indexVolume == 1)
        {
            unknownParameter = "valueVolume";
            $("#batchVolume").val(((valueAmt / (valuePct/100)/ volumeFactor)/4).toFixed(2));
            $("#batchVolume").css('background-color','lightblue');
        }
        if (indexPct == 1)
        {
            unknownParameter = "valuePct";
            $("#batchSolidsPct").val((valueAmt / (valueVolume * volumeFactor)/4*100).toFixed(1));
            $("#batchSolidsPct").css('background-color','lightblue');
        }
        if (indexAmt == 1)
        {
            unknownParameter = "valueAmt";
            $("#batchSolidsAmt").val(((valuePct/100) * (valueVolume * volumeFactor)*4).toFixed(1));
            $("#batchSolidsAmt").css('background-color','lightblue');
        }
    }    
}
    
function updateUnknownBatchParameter()
{
        let valueVolume = Number($("#batchVolume").val());
        let valuePct = Number($("#batchSolidsPct").val());
        let valueAmt = Number($("#batchSolidsAmt").val());
        if (unknownParameter == "valueVolume")
        {
            unknownParameter = "valueVolume";
            $("#batchVolume").val(((valueAmt / (valuePct/100) / volumeFactor)/4).toFixed(1));
            $("#batchVolume").css('background-color','lightblue');
        }
        if (unknownParameter == "valuePct")
        {
            unknownParameter = "valuePct";
            $("#batchSolidsPct").val((valueAmt / (valueVolume * volumeFactor)/4*100).toFixed(1));
            $("#batchSolidsPct").css('background-color','lightblue');
        }
        if (unknownParameter == "valueAmt")
        {
            unknownParameter = "valueAmt";
            $("#batchSolidsAmt").val(((valuePct/100) * (valueVolume * volumeFactor)*4).toFixed(2));
            $("#batchSolidsAmt").css('background-color','lightblue');
        }    
}    
    
function updateSingleCalculations()
{
    let qtsToGalFactor = 0.25;
    $("#singleSolidsOunces").val(($("#singleSolidsAmt").val()*16).toFixed(1));                    
    $("#calfSolidsAmt").val(($("#singleSolidsAmt").val()*$("#numPerDay").val()).toFixed(2));                     
    $("#calfSolidsOunces").val(($("#singleSolidsOunces").val()*$("#numPerDay").val()).toFixed(1));     
    $("#batchSolidsAmt").val(($("#calfSolidsAmt").val()*$("#numCalves").val()).toFixed(1));           
        
    $("#calfVolume").val(($("#singleVolume").val()*$("#numPerDay").val()*qtsToGalFactor).toFixed(2));                     
    $("#batchVolume").val(($("#calfVolume").val()*$("#numCalves").val()).toFixed(1));           
}
    
function updateBatchCalculations()
{
    let galToQtsFactor = 4;
                      
    $("#calfSolidsAmt").val(($("#batchSolidsAmt").val()/$("#numCalves").val()).toFixed(2));                     
    $("#calfSolidsOunces").val(($("#calfSolidsAmt").val()*16).toFixed(1));     
    $("#singleSolidsAmt").val(($("#calfSolidsAmt").val()/$("#numPerDay").val()).toFixed(3));           
    $("#singleSolidsOunces").val(($("#singleSolidsAmt").val()*16).toFixed(1));  
        
    $("#calfVolume").val(($("#batchVolume").val()/$("#numCalves").val()).toFixed(2));                     
    $("#singleVolume").val(($("#calfVolume").val()/$("#numPerDay").val()*galToQtsFactor).toFixed(1));           
}    
    
function checkTextEntry(inputtedText)
{
    let index = 0;
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
        x[i].style.backgroundColor = "yellow";
        x[i].value = "";
    }
    var x = document.getElementsByName("textreadonly");
    var i;
    for (i = 0; i < x.length; i++) 
    {
        x[i].style.backgroundColor = "lightblue";
        x[i].value = "";
    }  
 
}

function generateFooterLogo()
{
   var num = Math.floor(Math.random()*10);
   var newImage = "";
    if (num == 0)
    {        
        newImage = "images/CalfAllyElectrolytes.JPG";
        //$("footerLogo").attr("src", newImage).load(function(){});
        //$("#footerLogo").removeAttr("src").attr("src","images/CalfAllyElectrolytes.JPG");
        //$("#footerLogo").src="images/CalfAllyElectrolytes.JPG";
        //document.getElementById("footerLogo").src = "images/CalfAllyElectrolytes.JPG";
    }
    if (num == 1)
    {
        newImage = "images/CalfAllyGel.JPG";
    }
    if (num == 2)
    {
        newImage = "images/CalfAllyNT.JPG";
    }
    if (num == 3)
    {
        newImage = "images/Excelerate.JPG";
    }
    if (num == 4)
    {
        newImage = "images/MilkBridge.JPG";
    }
    if (num == 5)
    {
        newImage = "images/MilkEnergizer.JPG";
    }
    if (num == 6)
    {
        newImage = "images/MilkPrimer.JPG";
    }
    if (num == 7)
    {
        newImage = "images/NutraStart.JPG";
    }
    if (num == 8)
    {
        newImage = "images/OrganiCalf.JPG";
    }
    if (num == 9)
    {
        newImage = "images/Turba.jpg";
    }
    $("#footerLogo").removeAttr("src").attr("src", newImage);
}
    
