const tabPerCalf = document.getElementById("tabPerCalf")
const tabPerBatch = document.getElementById("tabPerBatch")
const frmPerCalf = document.getElementById("frmPerCalf")
const frmPerBatch = document.getElementById("frmPerBatch")

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