
function myFunction(copyText) {
  /* Get the text field */
 
	document.getElementById("copyArea").value=document.getElementById("copyArea").value+copyText+"\n";
}

function copyTextArea(copyTo, copyText) {
  /* Get the text field */
 
	document.getElementById(copyTo).value=document.getElementById(copyTo).value+copyText+"\n";
}