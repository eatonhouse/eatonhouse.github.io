/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 navbar.js
 script to handle display of the navbar for mobile devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

(function(){

//if page navigation should preserve the navbar state
var preserveNavbarState = true;

//match dimensions for mobile view
var matchOn = "(max-width: 80em)";

/*	showNavbar()
		show the navbar menu
*/
var showNavbar = function(){
	//set the navbar to visible for page navigation
	localStorage.setItem('navbarVisible',true);
	//remove hiding classes
	document.getElementById('navbar').classList.remove('sxl');
	document.getElementById('burger').classList.remove('burger-relative');
	//set main content height
	onMediaMatch(window.matchMedia(matchOn))
}

/*	onMediaMatch(x)
		resize the content height based on media
*/
var onMediaMatch = function(x){
	//if we are currently on mobile view
	if(x.matches){
		//if the navbar is visible, offset by navbar height
		if(localStorage.getItem('navbarVisible'))
			document.getElementById('main-content').style.height = `calc(100% - ${
				document.getElementById('navbar').clientHeight
			}px`;
		//otherwise offset by burger height
		else
			document.getElementById('main-content').style.height = `calc(100% - ${
				document.getElementById('burger').clientHeight
			}px)`;
	}
	//otherwise fill the height
	else {
		document.getElementById('main-content').style.height = "100%";
	}
}

/*	hideNavbar()
		hide the navbar menu
*/
var hideNavbar = function(){
	//set the navbar to invisible for page navigation
	localStorage.removeItem('navbarVisible');
	//add hiding classes
	document.getElementById('navbar').classList.add('sxl');
	document.getElementById('burger').classList.add('burger-relative');
	//set main content height
	onMediaMatch(window.matchMedia(matchOn))
}

/*	toggleNavbar()
		set the navbar to the next state
*/
var toggleNavbar = function(){
	//if visible, set to hidden
	if(localStorage.getItem('navbarVisible'))
		hideNavbar();
	//else set to shown
	else
		showNavbar();
}

/*	init()
		initialise the navbar upon page load
*/
var init = function(){
	//attach click event to the tongue
	document.getElementById('burger-tongue').addEventListener('click',toggleNavbar);

	//if set to visible, display the navbar
	if(preserveNavbarState && localStorage.getItem('navbarVisible'))
		showNavbar();
	else
		hideNavbar();

	//create a listener for media size changes
	var mediaMatch = window.matchMedia(matchOn);
	onMediaMatch(mediaMatch);
	mediaMatch.addListener(onMediaMatch);
}

//listen for page load event
document.addEventListener("DOMContentLoaded", function(event){
	//perform initialisation
	init();
});

})();
