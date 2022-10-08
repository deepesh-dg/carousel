$(document).ready( () => {
    
    $(".slider").each( ( i, sliderSingleElement ) => {

        // var sliderSingle = $(this);
        var sliderIndex = undefined;
        var requestIndex = undefined;
        var interval = 4000;
        var btnClicked = false;
        
        // Check the index of active class
        $(sliderSingleElement).find(".slider-item").each( (i, element) => {

            if($(element).hasClass("active")){

                sliderIndex = i;
                requestIndex = i + 1;
                return false;

            } else {

                sliderIndex = 0;
                requestIndex = 1;

            }

        });

        // Slider Autoplay
        if($(sliderSingleElement).attr("slider-interval")){

            interval = $(sliderSingleElement).attr("slider-interval");

        }

        var autoplay = setInterval( () => {

            showSlide(requestIndex);
            requestIndex++;

        }, interval);

        // Next and Previous Button Event
        $(sliderSingleElement).find(".slider-nav.prev").on("click", (event) => {

            event.preventDefault();
            clearTimeout(autoplay);
            if (!btnClicked) {
    
                btnClicked = true;
                setTimeout(() => {
                    btnClicked = false;
                }, 600); 

                requestIndex = sliderIndex - 1;
                showSlide(requestIndex);   
           
            }
            autoplay = setInterval( () => {

                showSlide(requestIndex);
                requestIndex++;
    
            }, interval);

        });
        
        
        $(sliderSingleElement).find(".slider-nav.next").on("click", (event) => {

            event.preventDefault();
            clearTimeout(autoplay);
            if (!btnClicked) {
    
                btnClicked = true;
                setTimeout(() => {
                    btnClicked = false;
                }, 600); 
                
                requestIndex = sliderIndex + 1;
                showSlide(requestIndex); 
           
            }
            autoplay = setInterval( () => {

                showSlide(requestIndex);
                requestIndex++;
    
            }, interval);

        });

        // Navigation Dots Functionality
        $(sliderSingleElement).find(".slider-dot").each( (i, dotElement) => {
            $(dotElement).on("click", (event) => {

                event.preventDefault();
                clearTimeout(autoplay);
                requestIndex = $(dotElement).attr("slider-indicator");
                
                showSlide(requestIndex);

                autoplay = setInterval( () => {
    
                    showSlide(requestIndex);
                    requestIndex++;
        
                }, interval);
    
            });
        });

        // Show Next Slide
        var slides = $(sliderSingleElement).find(".slider-item");
        var dots = $(sliderSingleElement).find(".slider-dot");

        var nextSliding = (reqIndex) => {

            slides.each( (i, element) => {

                if(i == sliderIndex) {

                    $(element).addClass("left");

                }

                if(i == reqIndex) {

                    $(element).addClass("next");

                }

            });

            return true;

        }

        var prevSliding = (reqIndex) => {

            slides.each( (i, element) => {

                if(i == sliderIndex) {

                    $(element).addClass("right");

                }

                if(i == reqIndex) {

                    $(element).addClass("prev");

                }

            });

            return true;

        }

        var SlidingCompleted = (reqIndex) => {

            return new Promise ( (resolve, reject) => {

                setTimeout( () => {

                    slides.each( (i, element) => {

                        if(i == sliderIndex) {
    
                            $(element).removeClass("left active right");
    
                        }

                        if(i == reqIndex) {
    
                            $(element).removeClass("next prev");
                            $(element).addClass("active");
    
                        }
                        
                    });

                    dots.each( (i, element) => {

                        if(i == sliderIndex) {
    
                            $(element).removeClass("active");
    
                        }

                        if(i == reqIndex) {
    
                            $(element).addClass("active");
    
                        }
                        
                    });

                    resolve(true);

                }, 600);

            });

        }

        var sliderAsync = async (reqIndex, side = 'next') => {

            if (side == 'prev') {
                
                if(prevSliding(reqIndex)){
                    console.log("prev sliding function executed");
                }

            } else if (side == 'next') {
                
                if(nextSliding(reqIndex)){
                    console.log("next sliding function executed");
                }

            }

            if( await SlidingCompleted(reqIndex)){
                console.log("next sliding completed function executed");
            }
            sliderIndex = reqIndex;
        }

        // Show Slide Functionality
        function showSlide(requestIndexArgs) {
            
            // Secure Index from excess limit of total slides - necessary for looping of slides
            if(requestIndexArgs >= slides.length) {

                requestIndex = 0;

            } else if( requestIndexArgs < 0  ) {

                requestIndex = slides.length - 1;

            }
            requestIndexArgs = requestIndex;

            if (requestIndexArgs > sliderIndex) {

                sliderAsync(requestIndexArgs, 'next');

            } else if (requestIndexArgs < sliderIndex) {

                sliderAsync(requestIndexArgs, 'prev');

            }

            // sliderAsync(requestIndexArgs, 'next');

        }

    });

});