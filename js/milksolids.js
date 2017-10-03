const tabPerCalf = document.getElementById("tabPerCalf");
const tabPerBatch = document.getElementById("tabPerBatch");

const frmPerCalf = document.getElementById("frmPerCalf");
const frmPerBatch = document.getElementById("frmPerBatch");

const btnCalfReset = document.getElementById("btnCalfReset");
const btnCalfCalculate = document.getElementById("btnCalfCalculate");
//const txtcalfVolume = document.getElementById("calfVolume");
//const txtcalfSolidsPct = document.getElementById("calfSolidsPct");
//const txtcalfSolidsAmt = document.getElementById("calfSolidsAmt");

//const btnBatchfReset = document.getElementById("btnBatchReset");
//const btnBatchCalculate = document.getElementById("btnBatchCalculate");

const footerLogo = document.getElementById("footerLogo");


tabPerCalf.addEventListener("click", function(event) {
    event.preventDefault();
    frmPerBatch.setAttribute("class", "hide"); 
    frmPerCalf.setAttribute("class", "content");
});

tabPerBatch.addEventListener("click", function(event) {
    event.preventDefault();
    frmPerCalf.setAttribute("class", "hide"); 
    frmPerBatch.setAttribute("class", "content");
});

btnCalfReset.addEventListener("click", function() {
    document.getElementById("calfVolume").value = "";
    document.getElementById("calfSolidsPct").value = "";
    document.getElementById("calfSolidsAmt").value = "";    
    generateFooterLogo();
    
});

btnCalfCalculate.addEventListener("click", function() {
    //index = 0;
    let indexVolume = checkTextEntry(document.getElementById("calfVolume").value.trim());
    let indexPct = checkTextEntry(document.getElementById("calfSolidsPct").value.trim());
    let indexAmt = checkTextEntry(document.getElementById("calfSolidsAmt").value.trim());    
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
        if (indexVolume == 1)
        {
            let valuePct = Number(document.getElementById("calfSolidsPct").value.trim());
            let valueAmt = Number(document.getElementById("calfSolidsAmt").value.trim());
            document.getElementById("calfVolume").value = ((valueAmt / (valuePct/100)) / 2.15).toFixed(2);
        }
        if (indexPct == 1)
        {
            let valueVolume = Number(document.getElementById("calfVolume").value.trim());
            let valueAmt = Number(document.getElementById("calfSolidsAmt").value.trim());
            document.getElementById("calfSolidsPct").value = (valueAmt / (valueVolume * 2.15)*100).toFixed(2);
        }
        if (indexAmt == 1)
        {
            let valueVolume = Number(document.getElementById("calfVolume").value.trim());
            let valuePct = Number(document.getElementById("calfSolidsPct").value.trim());
            document.getElementById("calfSolidsAmt").value = ((valuePct/100) * (valueVolume * 2.15)).toFixed(3);
        }
    }
    generateFooterLogo();
    
});





//Functions
    function checkTextEntry(inputtedText)
    {
        let index = 0;
        //let _blnTextOK = true;
        document.getElementById("lblMessage").innerHTML = '';
        if (isNaN(inputtedText) || inputtedText == '')
        {
            //document.getElementById("lblMessage").innerHTML += 'Please enter an integer from 1 to 25. ';
            //_blnTextOK = false;
            index += 1;
        }
        //if (inputtedText == '')
        //{
        //    //document.getElementById("lblMessage").innerHTML += 'Please enter an integer from 1 to 25. ';
        //    _blnTextOK = false;
        //}        
        //if (document.getElementById("txtEnterText").value.trim() == '')
        //{
        //    document.getElementById("lblMessage").innerHTML += 'Please enter some text.' ;       
        //    _blnTextOK = false;
        //}
        //return _blnTextOK
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



generateRandomNumber()
