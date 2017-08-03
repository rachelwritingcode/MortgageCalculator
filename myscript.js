
function validateUserId(errMessages)
{
  var IdLength= document.mortgage.UserId.length;
  var Id = document.mortgage.UserId.value;

  if (IdLength > 10 || IdLength < 10)
  {
    /***Rule #1***/
    errMessages+= "<p> There must be 10 characters in your User Id, please try again.</p>";
    return false;
  }
  else if ( IdLength == 10)
  {
      /***Rule # 2***/
      if (document.mortgage.UserId.value[4] != '-')
      {
        errMessages+= "<p> Please insert a hyphen.</p>";
  
      }
      else if (document.mortgage.UserId.value[4] == '-')
      {
        /***Rule #3***/
        for (var x= 0; x < 5; x++)
        {
            if (Id.charCodeAt(x) < 91 && Id.charCodeAt(x) > 100)
            {
                errMessages+= "<p> Please Enter Numeric Digits.</p>";

            }
            else if (Id.charCodeAt(x) >= 91 && Id.charCodeAt(x) <= 100)
            {
              /***Rule # 4***/
                 for (var x= 5; x < 10; x++)
                 {
                    if (Id.charCodeAt(x) < 49 && Id.charCodeAt(x) > 57)
                    {
                        errMessages+= "<p> Please Enter Numeric Digits.</p>";
                    }
                    else if(Id.charCodeAt(x) >= 49 && Id.charCodeAt(x) <= 57)
                    {
                        /***Rule # 5***/
                        var leftsum= 0;
                        var rightsum=0;
                        for (var x= 0; x < 5; x++)
                        {
                            leftsum += Id[x]
                        }
                        if (leftsum < 0 )
                        {
                            errMessages+= "<p> The sum of the numbers to the left of the hyphen (-) must be greater than zero </p>";
                        }
                        else if (leftsum > 0)
                        {
                          for (var x= 5; x < IdLength; x++)
                          {
                              rightsum += Id[x]
                          }
                          /***Rule # 6***/
                          if (rightsum < 0)
                          {
                            errMessages+= "<p> The sum of the numbers to the right of the hyphen (-) must be greater than zero </p>";
                          }
                          else if(rightsum > 0)
                          {
                            /***Rule # 7***/
                              if (((leftsum * 2) + 1) < rightsum)
                              {
                                errMessages+= "<p>The sum of the numbers to the right of the hyphen (-) must be (double plus 1) 
                                the sum of the numbers to the left of the hyphen (-) </p>";
                              } 
                        }
                 }
            }
        }

      }
  }
  return errMessages;
}

function validateClient(errMessages)
{
    var name= document.mortgage.client.value;
    name = client.trim();
    var nameLength = name.length;
    var lastIndex= nameLength-1;

    if (nameLength == 0)
    {
        errMessages+= "<p> Please Enter a Name </p>"
    }
    else
    {
        name= name.toUpperCase();
        for (var x= 0; x < 3; x++)
        {
            if (!(name.charCodeAt(x) > 64 && name.charCodeAt(x) < 91))
            {
              errMessages+= "<p> Please enter alphabetic characters </p>";
            }
            else 
            {    
              //Loop through all characters to search for atleast one apostrophe and hyphen - BUT not at first and last index
              var countApostrophe = 0; //keeps track of apostrophes
              var countHyphen = 0; // keeps track of hyphens

              for (var i = 0; i < nameLength; i++)
              {
                  if (name.charCodeAt(i) == 39)
                  {
                      countApostrophe += 1;
                  }
              }
              for (var j = 0; j < nameLength; j++)
              {
                  if (name.charCodeAt(j) == 45)
                  {
                      countHyphen += 1;
                  }
              }
              if (countHyphen > 1 || countApostrophe > 1)
              {
                  errMessages+= "<p> Please enter only one hyphen and apostraphe </p>";
              }
              else if (countHyphen == 1 && countApostrophe == 1)
              { 
                  //Check if hyphens or apostrophes are in beginning and last index
                  if (name.charCodeAt(0) == 39 || name.charCodeAt(0) == 45 || name.charCodeAt(lastIndex) == 39 || name.charCodeAt(lastIndex) == 45 )
                  {
                      errMessages+= "<p> Please enter alphabetic characters </p>";
                  }  
                  else 
                  {
                  //Loop for finding first index
                      for(var x= 0; x < nameLength; x++)
                      {
                      //Loop for finding second index
                        for (var y= 1; y <nameLength; y++)
                        {
                            if (name.charCodeAt(x) == 39 &&  name.charCodeAt(y)==45 || name.charCodeAt(x) == 45 &&  name.charCodeAt(y)==39 )
                            {
                              errMessages+= "<p> You cannot have a hyphen and apostrophe beside one another, please re-enter a valid name </p>";
                            }
                        }
                      }
                  }
                }

            }
        }
    }
  return errMessages;
}

function validatePropertyValue(errMessages)
{
    var propertyValue = document.mortgage.propValue.value;
    var propLen = document.mortgage.propValue.length;
    var downPay = document.mortgage.downPay.value;

    if (propLen == 0)
    {
      errMessages +="<p>Please enter the Property Value.</p>";
    }
    else 
    {
        for (var i = 0; i < propLen; i++)
        {  
            if (!(propertyValue.charCodeAt(i) > 47 && propertyValue.charCodeAt(i) < 58))
            {
                errMessages +="<p>Please enter Numeric values.</p>";
            }
            else
            {
                if (propertyValue < (downPay + 65000))
                {
                    errMessages +="<p>Your Property value has to higher!</p>";
                }
            }
        }
    }
    return errMessages;
}  

function validateDownPayment(errMessages)
{
   var downPay = document.mortgage.downPay.value;
   var downPayLen = document.mortgage.downPay.length;
   var propertyValue = document.mortgage.propValue.value;

    if (downPayLen == 0)
    {
      errMessages +="<p>Please enter the a Down Payment value.</p>";
    }
    else 
    {
        for (var i = 0; i < propLen; i++)
        {  
            if (!(downPay.charCodeAt(i) > 47 && downPay.charCodeAt(i) < 58))
            {
              errMessages +="<p>Please enter numeric values.</p>";
            }
            else
            {
              if (downPay < (propertyValue * 0.10))
              {
                errMessages +="<p>Your down payment value has to higher!</p>";
              }
            }
        }
    }
}    

function validateIncome(errMessages)
{
  var selected = document.mortgage.income.selectedIndex;

  if (selected == -1)
  {
    errMessages +="<p>Please select an income value.</p>";
  }
    return errMessages;
}  

function validatePropDetails(errMessages)
{
//two functions to validate if checked and unchecked
//add onclick to html 
//add return to the two validation functions
  var NoOfCheckboxes = document.mortgage.propDetails.length;
  var lastIndex = NoOfCheckboxes - 1;
  for (var x= 0 ; x < NoOfCheckboxes; x++)
  {
    if (document.mortgage.propDetails[x].checked ==  true &&  document.mortgage.propDetails[i] != document.mortgage.propDetails[lastIndex])
    {

    }  
  }
  return errMessages;
}

function validatePropLocation(errMessages)
{
  var NumOfRadios= document.mortgage.propLocation.length;
  var checked= 0;
  for (var x= 0 ; x < NumOfRadios; x ++)
  {
    if (document.mortgage.propLocation[x].checked == true)
    {
        checked = checked + 1;  
    }
  }
 
  if (checked = 0)
  {
      errMessages += "<p>Please select on of the Property Locations </p>"
  }
  
  return errMessages;
}

function validateMortYear(errMessages)
{
    var mortYear = document.mortgage.mortYear.value;
    var mortYearLen = document.mortgage.mortYear.length;
    var myDate = new Date();
    var myYear = myDate.getFullYear();

    if (mortYearLen == 0)
    {
        errMessages +="<p>Please enter an Mortgage Year value </p>";
    }
    else
    {
        mortYear= parseINt(mortYear);
        if(isNaN(mortYear) == false)
        {
          errMessages += "<p> Please enter a Numeric Value.</p>";
        }
        else
        {
            if(mortYear != myYear || mortYear != (myYear + 1 ) )
            {
              errMessages += "<p> Please enter a value within the current year or following year.</p>";
            }

        }
    }

}

function validateMortMonth(errMessages)
{
  var mortMonth= document.mortgage.mortMonth.value;
  var mortMonthLen = document.mortgage.mortMonth.length;
  var myDate = new Date();
  var myMonth = myDate.getMonth();

  if (mortMonthLen == 0)
  {
      errMessages +="<p>Please enter an Mortgage Month value </p>";
  }
  else 
  {
     mortMonth= parseInt(mortMonth);
     if (isNaN(mortMonth) == false)
     {
        errMessages += "<p> Please enter a Numeric Value.</p>";
     }
     else
     {
        if (mortMonth < 0 || mortMonth > 12)
        {
            errMessages += "<p> Please enter a value between 0 and 12.</p>";
        }
        else
        {
            if (mortMonth != myMonth || mortMonth != (myMonth+ 1) )
            {
                errMessages += "<p> Please enter a value within the current or next month</p>";
            }
        }
     }
  }
}

function validateIntRate(errMessages)
{
  var intRate= document.mortgage.intRate.value;
  var intRateLen= document.mortgage.intRate.length;

  if (intRateLen == 0)
  {
      errMessages +="<p>Please enter an Interest Rate value </p>";
  }
  else 
  {
      intRate= parseFloat(intRate);
      if (intRate < 2.00 || intRate > 11.00)
      {
        errMessages +="<p>Please enter an Interest Rate value between 2.00 and 11.00.</p>";
      }
  }
  return errMessages;
}

function validateAmortization(errMessages)
{
  var amortization= document.mortgage.amortization.value;
  var amortLen = document.mortgage.amortization.length;

  if (amortLen == 0)
  {
      errMessages += "<p>Please enter an Amortization value </p>";
  }
  else 
  {
      amortization = parseInt(amortization);
      if(isNaN(amortization) == false)
      {
        errMessages += "<p> Please enter a Numeric value</p>";
      }
      else
      {
          if (amortization < 5 || amortization > 20)
          {
              errMessages += "<p> Please enter a value between 5 and 20 </p>";
          }
      }
  }
  return errMessages;
}  

function validationForPayment() 
{ 
    //*******************************************************************************//
    //*   You will need to call the functions that validate the following:           *//
    //********************************************************************************//
    //*        (1)              (2)              (3)             (4)                 *//
    //********************************************************************************//
    //*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
    //********************************************************************************//
    //*   If there are no errors, then call                                          *//
    //*                                                                              *//
    //*      detailPaymentCalculation(...., ......, ......, ......);                 *//
    //*                                                                              *//
    //*   and make sure to pass the four values in the order shown above.            *//
    //*                                                                              *//
    //********************************************************************************//
    //*   If there are errors, simply update the comments area with the message:     *//
    //*   Please complete the form first and then click on Calculate Monthly Payment *//
    //*                                                                              *//
    //********************************************************************************//
   errMessages = "";
   errMessages = validatePropertyValue(errMessages);
   errMessages = validateDownPayment(errMessages);
   errMessages = validateIntRate(errMessages);
   errMessages = validateAmortization(errMessages);

    if (errMessages != "") 
    {          
          errMessages ="<p> Please complete the form first and then click on Calculate Monthly Payment.</p>";     
          return false;                                  
    }                               
    else 
    {
          detailPaymentCalculation(...., ......, ......, ......);                        
          return true;                  
    }

} // End of validationForPayment function


    //********************************************************************************//
    //*   Do not modify any statements in detailPaymentCalculation function          *//
    //********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) 
{

    //********************************************************************************//
    //*   This function calculates the monthly payment based on the following:       *//
    //*                                                                              *//
    //*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
    //*                                                                              *//
    //********************************************************************************//
     var paymentError = "";
     var v = mortAmount * 1;
     var d = mortDownPayment * 1;
     var i = mortRate * 1;
     var y = mortAmortization * 1;
     var a = v - d;
         i = i/100/12;
         n = y * 12;
     var f = Math.pow((1+i),n);

     var p = (a * ((i*f)/(f-1))).toFixed(2);

     if (p=="NaN" || p=="Infinity") {
         paymentError = "Please complete the form before attempting to calculate the monthly payment" 
         document.forms[0].comments.value = paymentError;
         document.forms[0].payment.value = "";
     }
     else {
           document.forms[0].payment.value = p;
           //document.forms[0].comments.value = "";
     }

} // End of detailPaymentCalculation function

function completeFormValidation() 
{

    //********************************************************************************//
    //*                                                                              *//
    //* This function calls the different functions to validate all required fields  *//
    //*                                                                              *//
    //* Once you have validated all field,                                           *//
    //* determine if any error(s) have been encountered                              *//
    //*                                                                              *//
    //* If any of the required fields are in error:                                  *//
    //*                                                                              *//
    //*    present the client with a list of all the errors in reserved area         *//
    //*         on the form and                                                      *//
    //*          don't submit the form to the CGI program in order to allow the      *//
    //*          client to correct the fields in error                               *//
    //*                                                                              *//
    //*    Error messages should be meaningful and reflect the exact error condition.*//
    //*                                                                              *//
    //*    Make sure to return false                                                 *//
    //*                                                                              *//
    //* Otherwise (if there are no errors)                                           *//
    //*                                                                              *//
    //*    Change the 1st. character in the field called client to upper case        *//
    //*                                                                              *//
    //*    Change the initial value in the field called jsActive from OFF to ON      *//
    //*                                                                              *//
    //*    When a browser submits a form to a CGI program, disabled fields           *//
    //*    like the payment field are not included. To insure that the payment field *//
    //*    is sent to the CGI, include the following JavaScript statement            *//
    //*    document.forms[0].payment.disabled = false;                               *//
    //*                                                                              *//
    //*    Make sure to return true in order for the form to be submitted to the CGI *//
    //*                                                                              *//
    //********************************************************************************//
    var errMessages = "";            
    errMessages = validateForPayment(errMessages);
    errMessages =  validateUserId(errMessages);

    if (errMessages != "") 
    {          
          showErrors(errMessages);     
          return false;                                  
    }                               
    else 
    {
          clearShowErrors();                          
          return true;                  
    }

} // End of completeFormValidation

function showErrors(messages) 
{
    messages += "<p> - Hover over the field title to see the rules</p>";
    document.getElementById('reserved').innerHTML = messages;
} 

function  clearShowErrors() 
{
    document.getElementById('reserved').innerHTML = " ";
    document.getElementById('UserId').focus();         
}  

