/*
	Created by Luis A. Perez
	Date 10/28/2014
	Combustion Innovation
	
To use the inputValidation.js script JQuery is required link it above this script on yout head tags.
EX.
<head>
	<script type= "text/javascript" src="http://code.jquery.com/jquery-2.1.1.min.js"></script> *this version of jquery if up to date as of 10/28/2014*
	<script type= "text/javascript" src="your/path/here/inputValidation.js"></script>
</head>

This is how you use the object
<script>
		var formVal=new formValidator("addcomment",4,1);  //(these are the parameters('form_id','MinumumPasswordLength','MinimumTextInputLength'))
		var bol=formVal.validateForm();
</script>

if one of your fields is optional and you don't want it to be validated
give it the class 'dontValidate'
EX.
	<form id='my_form'>
		<input type="text" class='dontValidate' name="comment" id="comment" title="Comment" placeholder="Comments"/>
		<input type="text" name="pin_id" id="pin_id" title="Pin ID" placeholder="Pin ID"/>
	</form>
*/
var formValidator = function(form_id,minPassLength,minInputLength){			//Object called formValidator Will validate a form before is submitted 
																			//it requires 3 parameters which are 'form_id' which is the id given to 
	this.validationCorrect=false;											//the form to in the HTML code.
	this.form_id = form_id;													//Second parameter is 'minPassLength' to test for minimum input characters
	this.minPassLength = minPassLength;										//when a password is submitted
	this.minInputLength = minInputLength;									//Third is 'minInputLength' to test for minimum input characters on text fields
	this.badInputArray = [];												//The array 'badInputArray' carries the ids of the fields that don't meet the criteria
	this.arrayOfMessages =[];												//The array of 'arrayOfMessages' carries messages that will be alerted to the user

	this.validateForm = function()											//The 'validateForm' will be the only function you will need to call as demonstrated
	{																		//on the top of this file
		var self=this;														//'var self=this;' in some occasions this.yourFunction will be displayed ass an error 
		$('#'+self.form_id+" input" ).each(function(){						//of function undefined instead of calling 'this.' you call 'self' (variable) to call 
				var inputType=$(this).attr('type');							//the object
				var input_object=$(this);									
				var id=$(input_object).attr('id');							//Look for '$('#'+self.form_id+" input" ).each' this line of code will go through
				if(!$('#'+id).hasClass('dontValidate'))						//each 'input' field in the form_id given validating them.
				{															//If you don't want any input to be validated give the class of 'dontValidate'
					if(inputType=="password")								//'<input type="text" class='dontValidate'/>' the validation process wll skip any
					{														//fields that have this class
						self.checkPasswordInput(input_object);				//'var inputType=$(this).attr('type');' will extract the type of every field
					}														//now that we know the type the field is we test them to use the different functions set
					else if(inputType=="text")								//for the different types of fields
					{
						self.checkTextInput(input_object);
					}
					else if(inputType=="tel")
					{
						self.checkTelInput(input_object);
					}
					else if(inputType=="email")
					{
						self.checkEmailInput(input_object);
					}
				}
		});
		var val=self.validationCorrect=self.checkValidations();				//the function 'checkValidations()' uses the array of 'badInputArray' that was populates
		if(!val)															//by the validation functions to return false if any field is incorrect and true if all of the 
		{																	//fields are correct
			alert(self.arrayOfMessages);									//The array of errors will be alerted to the user.
			return false;
		}
		else
		{
			return true;													//if everything is correct the function will return true
		}
	}

	this.checkTextInput=function(input_object)								//this function check for text fields;
	{
		var self=this;
		var textLength=input_object.val().length;							//gets the length of the value at the moment of submitting
		var inputTitle=input_object.attr('title');							//gets the title of the field
		if(textLength<this.minInputLength)									//'if' statement compares  length of the value in the field to the value
		{																	//that was set by the developer
																			//console.log('text '+inputTitle+' not correct!'); user to check
			this.badInputArray.push(input_object.attr('id'));				//this will the the id of the field and will push the string into the
			this.arrayOfMessages.push(inputTitle+' is incorrect./n');		//'badInputArray' array
		}
	}

	this.checkEmailInput = function(input_object)							//this function will test the email input  
	{
		var self=this;
		var email=input_object.val();
		var inputTitle=input_object.attr('title');
		var bol=this.isValidEmailAddress(email);							//this 'isValidEmailAddress' function compares the value in the input
		if(!bol)															//to a pattern to check if what the user imputed is a valid email
		{
																			//console.log('email '+inputTitle+' not correct!');
			this.badInputArray.push(input_object.attr('id'));				//this will the the id of the field and will push the string into the
			this.arrayOfMessages.push(inputTitle+' is incorrect./n');		//'badInputArray' array
		}
	}

	this.checkTelInput = function(input_object)								//this function will test 'tel' input fields 
	{
		var self=this;
		var number=input_object.val();
		var inputTitle=input_object.attr('title');
		var bol=self.validatePhone(number);									//this 'validatePhone' function will test the value of the tel field to see if it's
		if(!bol)															// a valid phone number
		{
			console.log('phone '+inputTitle+' not correct!');
			self.badInputArray.push(input_object.attr('id'));				//this will the the id of the field and will push the string into the
			self.arrayOfMessages.push(inputTitle+' is incorrect./n');		//'badInputArray' array
		}
	}

	this.checkPasswordInput = function(input_object)						//this function will test any fields with the type of password
	{
		var self=this;
		var passwordLength=input_object.val().length;
		var inputTitle=input_object.attr('title');
		if(passwordLength<self.minPassLength)								//the 'if' statement compares the length of the value in the input to 
		{																	//the length in set by the developer
			console.log('password '+inputTitle+' not correct!');
			self.badInputArray.push(input_object.attr('id'));				//this will the the id of the field and will push the string into the
			self.arrayOfMessages.push(inputTitle+' is incorrect./n');		//'badInputArray' array
		}
	}

	this.checkValidations=function()										//this function is the one called at the end of 'validateForm' to test if tehre were any
	{																		//any errors in the validation process 
		var self=this;
		var numberWrongValidation=self.badInputArray.length;				//this line measures the 'badInputArray' if its empty there were no errors
		var booleanValue=false;												//booleanValue is declared and initiated to false by default
		if(numberWrongValidation==0)										//unless all of the fields are correct it will false
		{
			booleanValue=self.ValidationPassed();							//if there are no errors 'ValidationPassed' function s called
		}
		else
		{
			booleanValue=self.ValidationFailed();							//if there are errors 'ValidationFailed' function s called
		}
		
		return booleanValue;												//this will return true or false depending on what function was called
	}
	
	this.ValidationPassed = function()										//this function just returns true.
	{
		return true;
	}


	this.ValidationFailed = function()										//'ValidationFailed' gets the amount of errors in the 'badInputArray' arrray
	{
		var self=this;
		var numberWrongValidation=self.badInputArray.length;				
		for(i=0;i<numberWrongValidation;i++)								//and for each one of the runs the 'animateBadInputFields' function
		{
			self.animateBadInputFields(self.badInputArray[i]);		
		}
		return false;														//and returns the value of false since the validation failed
	}
	
	this.animateBadInputFields=function(id)									//this function animates the field that is incorrect 
	{
		var self=this;
		$('#'+id).css({
			'background':'rgba(255,13,0,.3)'								//gives it a red background
		});
		setTimeout(function(){											
			$('#'+id).css({
			'background':'white'											//Changes color back to white after a second
			});
		},1000);
	}
	
	this.isValidEmailAddress=function(email)								//this function uses a patter to check for valid emails
	{
		var pattern =/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
		return pattern.test(email);
	}
	
	this.validatePhone=function(phone)										//this function uses a pattern to check for valid phone numbers
	{
	   var a = phone;
	   var filter = /^[0-9-+]+$/;
	   if (filter.test(a)) {
		   return true;
	   }
	   else {
		   return false;
	   }
	}
}