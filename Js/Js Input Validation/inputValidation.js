/**
*@class
*@classdesc Create an object of 'formValidator' to validate a form by the form id
*@param{string} form_id 		- Id of the form that needs to be validated
*@param{number} minPassLength	- The minimum length desired for password length
*@param{number} minInputLength	- The minimum length desired for text field length
*@param{string} dontValidate	- any field with this class will be skipped by the validation process
*/
var formValidator = function (form_id, minPassLength, minInputLength, dontValidate) {		
	this.validationCorrect=false;
	this.form_id = form_id;
	this.minPassLength = minPassLength;
	this.dontValidate = dontValidate;
	this.minInputLength = minInputLength;
	this.badInputArray = [];
	this.arrayOfMessages =[];
	/**
	*@constructor 
	*@description This function will validate the form. 
	*/
	this.validateForm = function()
		{
		var self=this;
		/**
		*Self.form_id input) .each will go through all of the input fields and test them depending on type
		*/
		$('#'+self.form_id+" input" ).each(function(){
			var inputType=$(this).attr('type');	
			var input_object=$(this);
			var id=$(input_object).attr('id');
			/**
			*If the input contains the class that was passed to the object it will not get checked by the validation process.
			*/
			if(!$('#'+id).hasClass(self.dontValidate))
			{
				if(inputType==="password")
				{
					self.checkPasswordInput(input_object);
				}
				else if(inputType==="text")
				{
					self.checkTextInput(input_object);
				}
				else if(inputType==="tel")
				{
					self.checkTelInput(input_object);
				}
				else if(inputType==="email")
				{
					self.checkEmailInput(input_object);
				}
			}
		});
		/**
		*'validationCorrect' will go trough the array of 'badInputArray'
		*/
		var val=self.validationCorrect=self.checkValidations();
		if(!val)
		{
			alert(self.arrayOfMessages);	
			return false;
		}
		else
		{
			return true;	
		}
	}
	
	/**
	*@constructor 
	*@description Checks the text fields for validation
	*/
	this.checkTextInput=function (input_object)
	{
		var self=this;
		var textLength=input_object.val().length;
		var inputTitle=input_object.attr('title');
		if(textLength<this.minInputLength)
		{
			this.badInputArray.push(input_object.attr('id'));
			this.arrayOfMessages.push(inputTitle+' is incorrect./n');
		}
	}
	/**
	*@constructor 
	*@description Checks the email fields for valid email using {@link isValidEmailAddress}
	*/
	this.checkEmailInput = function (input_object) 
	{
		var self=this;
		var email=input_object.val();
		var inputTitle=input_object.attr('title');
		var bol=this.isValidEmailAddress(email);
		if(!bol)
		{
			this.badInputArray.push(input_object.attr('id'));
			this.arrayOfMessages.push(inputTitle+' is incorrect./n');
		}
	}
	/**
	*@constructor 
	*@description Checks the tel fields for valid email using {@link validatePhone| Validate Phone}
	*/
	this.checkTelInput = function (input_object)
	{
		var self=this;
		var number=input_object.val();
		var inputTitle=input_object.attr('title');
		var bol=self.validatePhone(number);
		if(!bol)
		{
			console.log('phone '+inputTitle+' not correct!');
			self.badInputArray.push(input_object.attr('id'));
			self.arrayOfMessages.push(inputTitle+' is incorrect./n');
		}
	}
	/**
	*@constructor 
	*@description Checks the password field using the object parameter 'minInputLength'
	*/
	this.checkPasswordInput = function (input_object)
	{
		var self=this;
		var passwordLength=input_object.val().length;
		var inputTitle=input_object.attr('title');
		if(passwordLength<self.minPassLength)
		{
			console.log('password '+inputTitle+' not correct!');
			self.badInputArray.push(input_object.attr('id'));
			self.arrayOfMessages.push(inputTitle+' is incorrect./n');
		}
	}
	/**
	*@constructor 
	*@description 'checkValidations' will check the length of the 'badInputArray' if the array of errors is  
	*0 it will call the {@link ValidationPassed| Validation Succeed} if its greater it will call the {@link ValidationFailed| Validation Failed}
	*/
	this.checkValidations=function ()
	{
		var self=this;
		var numberWrongValidation=self.badInputArray.length;
		var booleanValue=false;
		if(numberWrongValidation==0)
		{
			booleanValue=self.ValidationPassed();
		}
		else
		{
			booleanValue=self.ValidationFailed();
		}
		
		return booleanValue;
	}
	/**
	*@constructor 
	*@description Returns true
	*/
	this.ValidationPassed = function ()
	{
		return true;
	}

	/**
	*@constructor 
	*@description Goes through the array that contains the ids of the inputs that did not meet the criteria
	*for each one of them it will call the {@link animateBadInputFields| Animating function}
	*/
	this.ValidationFailed = function ()
	{
		var self=this;
		var numberWrongValidation=self.badInputArray.length;				
		for(i=0;i<numberWrongValidation;i++)
		{
			self.animateBadInputFields(self.badInputArray[i]);		
		}
		return false;
	}
	/**
	*@constructor 
	*@description changes the color of the background of the field to red and a second later it changes it back to white
	*/
	this.animateBadInputFields=function (id)
	{
		var self=this;
		$('#'+id).css({
			'background':'rgba(255,13,0,.3)'
		});
		setTimeout(function(){											
			$('#'+id).css({
			'background':'white'
			});
		},1000);
	}
	/**
	*@constructor 
	*@description this patter determines whether an email is valid
	*/
	this.isValidEmailAddress=function (email)
	{
		var pattern =/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
		return pattern.test(email);
	}
	/**
	*@constructor 
	*@description this patter determines whether an phone number is valid
	*/
	this.validatePhone=function (phone)
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