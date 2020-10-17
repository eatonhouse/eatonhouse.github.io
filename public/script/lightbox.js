/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 lightbox.js
 script to show expanded images upon click
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

(function(){

/*  showLightbox()
    set the image to the given source
*/
var showLightbox = function(){
  var src = this.firstElementChild.dataset.src;
  document.getElementById("lightbox-image").src = src;
}

/*  hideLightbox()
    unset the image source
*/
var hideLightbox = function(){
  document.getElementById("lightbox-image").src = undefined;
}

//listen for page load event
document.addEventListener("DOMContentLoaded", function(event){

  //find the lightbox and listen for the click
  document.getElementById("lightbox").addEventListener('click',hideLightbox,false);

  //find all lightbox links and listen for the click
  var elements = document.getElementsByClassName("lightbox-link");
  for(var i = 0; i < elements.length; i++){
    elements[i].addEventListener('click',showLightbox,false);
  }

})


})();
