// A function that takes an image URL, a width and a height as parameters
// and returns a resized image using the HTML canvas element
function resizeImage(imageUrl, width, height) {
    // Create a new image object
    var image = new Image();
    // Set the image source to the URL
    image.src = imageUrl;
    // Create a new canvas element
    var canvas = document.createElement("canvas");
    // Set the canvas width and height to the desired values
    canvas.width = width;
    canvas.height = height;
    // Get the canvas context
    var context = canvas.getContext("2d");
    // Draw the image on the canvas with the specified dimensions
    context.drawImage(image, 0, 0, width, height);
    // Return the canvas data as a data URL
    return canvas.toDataURL();
  }
  
  // A function that takes a request object as a parameter
  // and checks if it is from a CSS file
  function isCssRequest(request) {
    // Get the request header
    var header = request.getHeader("Content-Type");
    // Return true if the header contains "text/css"
    return header && header.includes("text/css");
  }
  
  // A function that handles a request for an image URL
  function handleImageRequest(request) {
    // Get the image URL from the request
    var imageUrl = request.getUrl();
    // Get the query parameters from the request
    var params = request.getQueryParams();
    // Get the width and height from the parameters
    var width = params.get("width");
    var height = params.get("height");
    // If the width and height are valid numbers
    if (width && height && !isNaN(width) && !isNaN(height)) {
      // Resize the image and return it as a response
      var resizedImage = resizeImage(imageUrl, width, height);
      return new Response(resizedImage, 200, "image/png");
    } else {
      // Return the original image as a response
      return new Response(imageUrl, 200, "image/png");
    }
  }
  
  // A function that handles a request for any URL
  function handleRequest(request) {
    // If the request is for an image URL
    if (request.isImageUrl()) {
      // If the request is from a CSS file
      if (isCssRequest(request)) {
        // Return the resized image as a response
        return handleImageRequest(request);
      } else {
        // Return the original image as a response
        return new Response(request.getUrl(), 200, "image/png");
      }
    } else {
      // Return a 404 not found response
      return new Response("Not found", 404, "text/plain");
    }
  }
  