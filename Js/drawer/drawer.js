var divs = ["pinstantHold","pushHold","burntHold","stevieHold","vaultHold","juggernautHold","closed"];
var indexArray={};
	indexArray['pinstant']=0;
	indexArray['push']=1;
	indexArray['burnt']=2;
	indexArray['stevie']=3;
	indexArray['vault']=4;
	indexArray['juggernaut']=5;
	indexArray['closed']=6;
	
var backgroundImg={};
	backgroundImg['pinstant']='url(../pinstant/img/pinstantbackground@2x.png)';
	backgroundImg['push']='#B2221B';
	backgroundImg['burnt']='url(../burnt/img/burntoutbackground@2x.png)';
	backgroundImg['stevie']='url(../stevie/img/steviebackground@2x.png)';
	backgroundImg['vault']='url(../vault/img/myvaultbackground@2x.png)';
	backgroundImg['juggernaut']='url(../juggernaut/img/juggernautbackground@2x.png)';
	backgroundImg['closed']='nothing';
var drawer;
var hasClicked=false;
$(document).ready(function(){
	//set teh divs here so the class can be re used, even in the same applciation and they are not dependant on having those divs as the array. 
	//also infinitely expanding, just keep adding IDs and everything will adjust.
	drawer = new Drawer(200,divs);
	drawer.setDivs(divs);
	// Trigger the event (useful on page load).
	setTimeout(function(){
			$(window).hashchange();
	},500);
});

$('#content a').on('click',function(event){
		event.preventDefault();
	});
/**
*@constructor 
*@description Every time that we load a page into a div The favicon gets taken down. This function restores the favicon 
*/
function setFavicon() {
  var link = $('link[type="image/x-icon"]').remove().attr("href");
  $('<link href="'+ link +'" rel="shortcut icon" type="image/x-icon" />').appendTo('head');
}
/**
*@class
*@classdesc creates a class top created the drawer animation with different divs. This class was used in {@link http://combustioninnovation.com/projects | Combustion Projects}
*@param{number} height 	- The height of the divs that are being used as a drawer
*@param{array} arrayOfDivs - An array containing the names of the divs being moved
*/
var Drawer = function(height,arrayOfDivs){
	this.height=height;
	this.open = false;
	this.canClick = true;
	this.divarray = null;
	this.array=arrayOfDivs;
	this.objecOpen='new';
	this.oldIndex='';
	this.toTranslate=(this.array.length)*this.height;
	this.perarray = {};//this array holds the original background sizes of the name for every div 
			this.perarray['pinstant'] = 90;//since all the images are different sizes they have to be proportioned different
			this.perarray['burnt'] = 90;//ad the inder we make the name of the name ex perarray['pinstant']
			this.perarray['stevie'] = 70;
			this.perarray['vault'] = 60;
			this.perarray['juggernaut'] = 80;
			this.perarray['push'] = 50;
	/**
	*@constructor
	*@description This function will load the desired page on the div 'appContent'
	*There are some css changes being made to the structure of the page being loaded
	*/
	this.loadPage=function(appName){
			setFavicon();
		$( "#appContent" ).load( "../"+appName, { limit: 25 }, function() {
						$('#phoneimg').css({
							'width':'65%',
						});
						
						$('#appIcon').css({
							'margin-top':'30px',
						});
						$('#blank1').css({
							'height':'30px',
						});
						$('#socialM').css({
							'display':'none',
						});
						
						
					});
	}
	/**
	*@constructor
	*@description This function will give the property of name to the divs in order by index to the divs being animated. 
	*@param{array} arrayOfDivs - divs used for opening and closing animation
	*EX <div name=1></div>
	*   <div name=2></div>
	*/
	this.setDivs = function(arrayOfDivs)
	{
		this.divarray = arrayOfDivs;
		
		for(i=0;i<arrayOfDivs.length;i++){
			var id= arrayOfDivs[i];
			$("#" + id).attr("name",i);
		}
	}
	/**
	*@constructor 
	*@description This function will be the brains behind determining what objects move up what objects move down and what object stays on top 
	*The code also locks teh scroll bar to the top so that the only scrollable object is the div with the content
	*/
	this.openAtObject = function(id)
	{
		lockScroll();
		colorChange(this.array[id].replace('Hold',''));//this code line controls the color change of the background
		this.oldIndex=id;//now we know what was the div that was last clicked
		this.objecOpen=this.array[id];//we store to see what objetc is open at the moment 
		this.shrink(id);//There is a slight shrink of the div that stays as title to half the size 
		this.open=true;//the object s set to state of open
		for(i=0;i<this.array.length;i++)//runs next lines of code for every div in the array
		{
			if(i<=id)
			{
				this.pushUp(i,id);//if the position is less than or equal to the one set to open we call the function push up
			}
			else if(i>id)	
			{
				this.pushDown(i,id);//if the position is greater than the one set to go up it will get pushed down
			}
		}
		appName=this.array[id].replace('Hold','');//we use the the name of the app to load the page 
		setTimeout(function(){
				drawer.loadPage(appName);//set a delay to optimize animations 
			},500);
		
	}
	
	this.bringUpContent=function(){
		$('#appContent').css({
						"-webkit-transition-duration":" 0.4s",
						"-webkit-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"-moz-transition-duration":" 0.4s",
						"-moz-transform": 'translateY('+number +'px)',
						"-o-transition-duration":" 0.4s",
						"-o-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"-ms-transition-duration":" 0.4s",
						"-ms-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"transition-duration":" 0.4s",
						"transform": 'translate3d(0px,'  + number + 'px,0px)',
						"transition": 'all 400ms linear',
						});
	}
	/**
	*@constructor 
	*@description This function uses css to push down the content
	*@param{number} index 		- The position of the div
	*@param{clicked} clicked 	- name of div clicked minus 'Hold'
	*/
	this.pushDown=function(index,clicked){
		var number=this.toTranslate-(index*this.height);//total number of pixels take n by the all the divs minus the position times height of divs
			$('#'+this.divarray[i]).css({
						"-webkit-transition-duration":" 0.4s",
						"-moz-transition-duration":" 0.4s",
						"-o-transition-duration":" 0.4s",
						"-ms-transition-duration":" 0.4s",
						"transition-duration":" 0.4s",
						"-webkit-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"-ms-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"-moz-transform": 'translateY( ' +number + 'px)',
						"-o-transform": 'translate3d(0px,'  + number + 'px,0px)',
						"transform": 'translate3d(0px,'  + number + 'px,0px)',
						"transition": 'all 400ms linear',
						});
			
				$('#'+this.divarray[i]).css({
						'opacity':'0',
						});
	
			//$('#'+this.divarray[i]).fadeOut(500);//gives a second for everything to get organized n the html part
		
				
			
		}
		
	/**
	*@constructor 
	*@description This function uses css to push up the content
	*@param{number} index 		- The position of the div
	*@param{clicked} clicked 	- name of div clicked minus 'Hold'
	*/
	this.pushUp=function(index,clicked){
			$('#'+this.divarray[i]).css({
						"-webkit-transition-duration":" 0.4s",
						//"-moz-transition-duration":" 0.4s",
						"-o-transition-duration":" 0.4s",
						"-ms-transition-duration":" 0.4s",
						"transition-duration":" 0.4s",
						"-webkit-transform": 'translate3d(0px,-'  + (this.height*(clicked)) + 'px,0px)',
						"-moz-transform": 'translatey(-'  + (this.height*(clicked)) + 'px)',
						"-ms-transform": 'translate3d(0px,-'  + (this.height*(clicked)) + 'px,0px)',
						"-o-transform": 'translate3d(0px,-'  + (this.height*(clicked)) + 'px,0px)',
						"transform": 'translate3d(0px,-'  + (this.height*(clicked)) + 'px,0px)',
						"transition": 'all 400ms linear',
						});
				
			
		}
	/**
	*@constructor 
	*@description This function will close the drawer
	*/
	this.closeObject = function(id)
	{
		setFavicon();
		this.unlockScroll();
		colorChange('default');
		this.objecOpen='none';
		this.normal(id);
		this.open=false;
		for(i=0;i<this.array.length;i++)
		{
			if(i<=id)
			{
				//console.log(i+' push back down!');
				this.pushBackDown(i,id);//divs that were pushed up before now get pushed back down to original position
			}
			else if(i>id)	
			{
				//console.log(i+' pushed back up!');
				this.pushBackUp(i,id);//objects that were pushed odwn now ghet pushed back up to original position
			}
		}
		setTimeout(function(){
				$( "#appContent" ).empty();//empty the page prevously laoded
			},500);
	}
	
	/**
	*@constructor 
	*@description This function uses css to shrink the title
	*@param{string} id	- 	Name of div set to srink 	
	*/
	this.shrink=function(id){
		appName = this.divarray[id].replace('Hold','');
		size= this.perarray[appName];
		if(appName=='push'){var border='1px solid black';}else{var border='0px';}
		$('#'+this.divarray[id]).css({
			'height':(this.height/2)+'px',
			'border-bottom':border,
		});
		$('#'+appName+'Name').css({//if its zero it will go to the else part of the statement returning the 
			'background-size':''+(size-30)+'%',	//div to the original size
		});//we subtract 30 from the precentage after testing its the most accurate precentage to have
		$('#'+appName+'Icon').css({
			'background-size':'25%',//we also resize the icon but since all icons are th easme size we dont need to worry about
		});
	}
	/**
	*@constructor 
	*@description This function uses css return the title to original size
	*@param{string} id	- 	Name of div set to return to normal state	
	*/
	this.normal=function(id){
		appName = this.divarray[id].replace('Hold','');
		size= this.perarray[appName];
		$('#'+this.divarray[id]).css({
			'height':this.height+'px',
		});
		$('#'+appName+'Name').css({//if its zero it will go to the else part of the statement returning the 
			'background-size':''+(size)+'%',	//div to the original size
		});//we subtract 30 from the precentage after testing its the most accurate precentage to have
		$('#'+appName+'Icon').css({
			'background-size':'35%',//we also resize the icon but since all icons are th easme size we dont need to worry about
		});
	}
	/**
	*@constructor 
	*@description This function will push any object that was pushed down back up
	*/
	this.pushBackUp=function(index,clicked){
		var number=this.toTranslate-(index*this.height);
			$('#'+this.divarray[i]).css({
						"-webkit-transition-duration":" 0.4s",
						//"-moz-transition-duration":" 0.4s",
						"-o-transition-duration":" 0.4s",
						"-ms-transition-duration":" 0.4s",
						"transition-duration":" 0.4s",
						"-webkit-transform": 'translate3d(0px,-'  + 0 + 'px,0px)',
						"-moz-transform": 'translateY(-'  + 0 + 'px)',
						"-o-transform": 'translate3d(0px,-'  + 0 + 'px,0px)',
						"-ms-transform": 'translate3d(0px,-'  + 0 + 'px,0px)',
						"transform": 'translate3d(0px,-'  + 0 + 'px,0px)',
						"transition": 'all 400ms linear',
						});
			$('#'+this.divarray[i]).css({
						'opacity':'1',
						});
			
			//$('#'+this.divarray[i]).fadeIn(500);//gives a second for everything to get organized n the html part
			
				
			
		}
		
	/**
	*@constructor 
	*@description This function will push any object that was up down back down
	*/
	this.pushBackDown=function(index,clicked){
			$('#'+this.divarray[i]).css({
						"-webkit-transfom-duration":" 0.4s",
						"-moz-transfom-duration":" 0.4s",
						"-o-transfom-duration":" 0.4s",
						"-ms-transfom-duration":" 0.4s",
						"transition-duration":" 0.4s",
						"-webkit-transform": 'translate3d(0px,'  + 0 + 'px,0px)',
						"-moz-transform": 'translateY('  + 0 + 'px)',
						"-o-transform": 'translate3d(0px,'  + 0 + 'px,0px)',
						"-ms-transform": 'translate3d(0px,'  + 0 + 'px,0px)',
						"transform": 'translate3d(0px,'  + 0 + 'px,0px)',
						"transition": 'all 400ms linear',
						});
				
			
		}
		
	this.setClicks = function()
	{
	
		var self = this;
		for(i = 0;i<divarray.length();i++)
		{
		//sets the click event here. now you can use the $("#id").triggerclick because it is attached to a class method.
		var id = divarray[i];
			$("#" + id).attr("name",i);
			$("#"+id).on("click",function(){
				var name = $(this).name();
				self.toggleDrawer(name);
					
			});

		}

	}
	/**
	*@constructor 
	*@description  Lock teh scroll by using css on content
	*/
	this.lockScroll = function()
	{	
		$('#content').css({
			'overflow':'hidden',
		})
	}
	
	/**
	*@constructor 
	*@description  unlock the scroll by using css on content
	*/
	this.unlockScroll = function()
	{	
		$('#content').css({
			'overflow':'auto'
		})
		
	}
	
	
	this.toggleDrawer = function(index)
	{
		//determines whether or not the drawer is open and will toggle appropiately. takes a name param which is the index it is at so technically you can add as many divs as you want.
		var self = this;
		if(this.isOpen() && self.canClick)
		{
				self.closeDrawer(index);
		}
		else
		{
				self.openDrawer(index);
		}
	
	}
		
		
		
		
	this.closeDrawer = function(index)
	{
		var self = this;
		if(!this.isOPen())
		{
			self.canClick = false;
			
			//do the animation here
		
		}
	
	}
	
	this.openDrawer = function(){
		if(!this.isOPen())
		{
			self.canClick = false;
			
			//do the animation here
		
		
		}
	
	}
	
	
	this.setOpenIndex = function(index)
	{
	
	
	}
	
	this.toggleState = function(bool)
	{
		this.open = bool;
	}
	
	this.isOpen = function()
	{
	
	}
	/**
	*@constructor 
	*@description  This is determining whether the drawer is closed or open and from there it will open or close it on click
	*/
	this.toggleDrawer=function(appName,index)
	{
		if(this.objecOpen!='6')
		{
			//console.log(index);
			//console.log(this.objecOpen);
			//console.log(this.oldIndex);
			//console.log(this.open);
			$('#content').scrollTop(0,'fast');
				if(this.open==false)
				{
					$('#appContent').css({
						'background':'url(img/'+appName+'icon@2x.png)',
						'background-repeat':'no-repeat',
						'background-position':'center 100px',
						'background-size':'10%',
						'transition':'0s',
					});
					setTimeout(function(){
							$('#appContent').css({
								'background':backgroundImg[appName],
								'background-repeat':'no-repeat',
								'background-position':'center',
								'background-size':'cover',
								
							});
					},1000);
				}
			if(this.open==true && this.objecOpen==divs[index] )
			{
				this.closeObject(index);
				//console.log('close');
			}
			else if(this.open==false && (this.objecOpen=='none' || this.objecOpen=='new'))
			{
				this.openAtObject(index);
				//console.log('open');
			}
		}
		else
		{
			//console.log('new page');
		}
	}
}

/**
	*@constructor 
	*@description  This function controls the drawer object with hash changes to enable back to go a step back
	*/
$(window).hashchange( function(){
		var myApp=location.hash;
		var myString=myApp.replace('#','');
		//console.log(myString);
		if(myString=='' && drawer.objecOpen=='new')
		{
			location.hash='#closed';
		}
		else if(myString!='' && myString!='closed')
		{
			//console.log('hash open');
			drawer.toggleDrawer(myString,indexArray[myString]);
			
		}
		else if(myString=='closed' && drawer.objecOpen!='new')
		{
			//console.log('hash close');
			drawer.toggleDrawer(drawer.objecOpen,drawer.oldIndex);
			
		}
		
	
		
});

/*function toggleDrawer(appName,index)
	{
		if(appName!='default')
		{
			$('#content').scrollTop(0,'fast');
			$('#appContent').css({
				'background':'url(img/'+appName+'icon@2x.png)',
				'background-repeat':'no-repeat',
				'background-position':'center 100px',
				'background-size':'10%',
			});
			if(drawer.open==true && drawer.objecOpen==divs[index] )
			{
				drawer.closeObject(index);
			}
			else if(drawer.open==false && drawer.objecOpen=='none')
			{
				drawer.openAtObject(index);
			}
		}
	}*/

$('.options').on('click',function(){
	hasClicked=true;
	name=$(this).attr('id');
	myApp=name.replace('Hold','');
	if(drawer.open==true)
	{
		(window).location.hash="#closed";
	}
	else if(drawer.open==false)
	{
		(window).location.hash="#"+myApp;
	}
});
function lockScroll()
	{	
		$('#content').css({
			'overflow':'hidden',
		})
	}
