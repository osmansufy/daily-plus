
     var x = document.getElementById("catMenu");
     x.style.display = "none";
     function showCat() {
         
         if (x.style.display === "none") {
           x.style.display = "block";
         } else {
           x.style.display = "none";
         }
       }

       

     //* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
     var dropdown = document.getElementsByClassName("dropdown-btn");
     var i;

     for (i = 0; i < dropdown.length; i++) {
     dropdown[i].addEventListener("click", function() {
         this.classList.toggle("active");
         var dropdownContent = this.nextElementSibling;
         if (dropdownContent.style.display === "block") {
         dropdownContent.style.display = "none";
         } else {
         dropdownContent.style.display = "block";
         }
     });
     }


     var noti = document.getElementById("notificationHolder");
       noti.style.display = "none";
       function notificationShow() {
             noti.style.display = "block";
         }
         function notificationHide() {
             noti.style.display = "none";

     //login toggle
     var x = document.getElementById("loginHolder");
     x.style.display = "none";
     function showLogin() {
         
         if (x.style.display === "none") {
           x.style.display = "block";
         } else {
           x.style.display = "none";
         }
       }
// user toggle
     var userBtn = document.getElementById("userHolder");
     userBtn.style.display = "none";
     function userShow() {
         
         if (userBtn.style.display === "none") {
             userBtn.style.display = "block";
         } else {
             userBtn.style.display = "none";
         }
       }
// profile toggle
       var profilebtn = document.getElementById("profileHolder");
       profilebtn.style.display = "none";
       function profileShow(){
         if (profilebtn.style.display === "none") {
             profilebtn.style.display = "block";
         } else {
             profilebtn.style.display = "none";
         }

       }

       //order toggle

       var orderbtn = document.getElementById("orderHolder");
       orderbtn.style.display = "none";
       function orderShow(){
         if (orderbtn.style.display === "none") {
             orderbtn.style.display = "block";
         } else {
             orderbtn.style.display = "none";
         }

       }
       //order tab
       function openOrderTab(tabname) {
         var i;
         var tab = document.getElementsByClassName("tabs");
         for (i = 0; i < tab.length; i++) {
           tab[i].style.display = "none";
         }
         document.getElementById(tabname).style.display = "block";
       }

 
     var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
// This function will display the specified tab of the form ...
var x = document.getElementsByClassName("tab");
x[n].style.display = "block";
// ... and fix the Previous/Next buttons:
if (n == 0) {
 document.getElementById("prevBtn").style.display = "none";
} else {
 document.getElementById("prevBtn").style.display = "inline";
}
if (n == (x.length - 1)) {
 document.getElementById("nextBtn").innerHTML = "Submit";
} else {
 document.getElementById("nextBtn").innerHTML = "Next";
}
// ... and run a function that displays the correct step indicator:
fixStepIndicator(n)
}

function nextPrev(n) {
// This function will figure out which tab to display
var x = document.getElementsByClassName("tab");
// Exit the function if any field in the current tab is invalid:
if (n == 1 && !validateForm()) return false;
// Hide the current tab:
x[currentTab].style.display = "none";
// Increase or decrease the current tab by 1:
currentTab = currentTab + n;
// if you have reached the end of the form... :
if (currentTab >= x.length) {
 //...the form gets submitted:
 document.getElementById("regForm").submit();
 return false;
}
// Otherwise, display the correct tab:
showTab(currentTab);
}

function validateForm() {
// This function deals with validation of the form fields
var x, y, i, valid = true;
x = document.getElementsByClassName("tab");
y = x[currentTab].getElementsByTagName("input");
// A loop that checks every input field in the current tab:
for (i = 0; i < y.length; i++) {
 // If a field is empty...
 if (y[i].value == "") {
   // add an "invalid" class to the field:
   y[i].className += " invalid";
   // and set the current valid status to false:
   valid = false;
 }
}
// If the valid status is true, mark the step as finished and valid:
if (valid) {
 document.getElementsByClassName("step")[currentTab].className += " finish";
}
return valid; // return the valid status
}

function fixStepIndicator(n) {
// This function removes the "active" class of all steps...
var i, x = document.getElementsByClassName("step");
for (i = 0; i < x.length; i++) {
 x[i].className = x[i].className.replace(" active", "");
}
//... and adds the "active" class to the current step:
x[n].className += " active";
}
 


  new WOW().init();
