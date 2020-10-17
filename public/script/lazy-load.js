/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 lazy-load.js
 script to perform lazy loading of images
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

(function(){

/*  lazyLoadImage(lazyImage)
    lazy load in the given image
*/
var lazyLoadImage = function(lazyImage){
  //create a new javascript image
  let trueImage = new Image();

  //upon loading the image, update the source in the page
  trueImage.onload = function(){
    lazyImage.src = trueImage.src;
  }

  //set the source to the data source
  trueImage.src = lazyImage.dataset.src;

  //if already complete, perform load callback
  if (trueImage.complete) trueImage.onload();

  //remove the lazy class from the element
  lazyImage.classList.remove("lazy");
}

//listen for page load event
document.addEventListener("DOMContentLoaded", function() {

  //hide the body by default
  document.body.style.display = 'none';

  //fetch the image for the background
  var src = getComputedStyle(document.body).getPropertyValue('--main-image');
  var url = src.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

  //create a new javascript image and listen for load completion
  var img = new Image();
  img.onload = function() {
    //upon load completion, show the body
  	document.body.style.display = 'block';
  }
  img.src = url;
  if (img.complete) img.onload();

  //find all lazy images
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  //if we can use the intersection observer, we can perform lazy loading
  if ("IntersectionObserver" in window) {
    //create a new observer
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      //loop through each observed entry
      entries.forEach(function(entry) {
        //check to see if we can observe the image
        if (entry.isIntersecting) {
          //if so, proceed to load the image and stop observing
					let lazyImage = entry.target;
          lazyLoadImage(lazyImage);
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    //start observing each image
    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
  //otherwise we cannot perform lazy loading, proceed to load all images
  else {
		lazyImages.forEach(lazyLoadImage);
  }
});

})();
