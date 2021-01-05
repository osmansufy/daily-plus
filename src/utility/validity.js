
export const checkValidity = (inputType) => {
  
    let isValid = true;
    let errors={}
    if (inputType.password) {
  
      isValid = false;
  
      errors= "Please enter your password.";
  
    }
  
  
  
    if (!inputType.confirmPassword) {
  
      isValid = false;
  
      errors = "Please enter your confirm password.";
  
    }
  
  
  
    if (typeof inputType.password !== "undefined" && typeof inputType.confirmPassword !== "undefined") {
  
        
  
      if (inputType.password != inputType.confirmPassword) {
  
        isValid = false;
  
        errors = "Passwords don't match.";
  
      }
  
    } 
    if (!inputType.phone) {

        isValid = false;

        // errors["phone"] = "Please enter your phone number.";

      }

  

      if (typeof inputType.phone !== "undefined") {

          

        var pattern = new RegExp(/^[0-9\b]+$/);

        if (!pattern.test(inputType.type)) {

          isValid = false;

        //   errors["phone"] = "Please enter only number.";

        }else if(inputType.phone.length != 10){

          isValid = false;

        //   errors["phone"] = "Please enter valid phone number.";

        }

      }
    return isValid
}
 
