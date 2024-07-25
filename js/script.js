let slideIndex = 0;
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const hoverClass = document.querySelector(".header-link:nth-child(3)");
const collectionClass = document.querySelector(".collection-section");
var pdBoxStatus = "unclicked";


function showSlide(index) {
    const slides = document.querySelectorAll('.slide-content');
    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`;
    });
    // If the prevButton is present in the current page
    if(prevButton) {
        if (slideIndex === 0) {
            prevButton.disabled = true;
            prevButton.style.backgroundColor = "#BEBEBE";
            prevButton.style.cursor = "default";
        } 
        else {
            prevButton.disabled = false;
            prevButton.style.backgroundColor = "grey";
            prevButton.style.cursor = "pointer";
        }
    }
     // If the nextButton is present in the current page
    if(nextButton){
        if (slideIndex === slides.length - 1) {
            nextButton.disabled = true;
            nextButton.style.backgroundColor = "#BEBEBE";
            nextButton.style.cursor = "default";
        } 
        else {
            nextButton.disabled = false;
            nextButton.style.backgroundColor = "grey";
            nextButton.style.cursor = "pointer";
        }
    }
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
}

showSlide(slideIndex);

document.addEventListener('DOMContentLoaded', function(){
    const textFloat = document.querySelector('.text-1');
    // If textFloat is present in the current page
    if(textFloat){
        textFloat.style.transform = 'translateX(0%)';
    }
    const sliderImage1 = document.getElementById("sliderImage1");
    // If the sliderImage1 is present in the current page
    if(sliderImage1) {
        // Slider Image Fade In 
    sliderImage1.style.opacity = '100';
    }
    
    
    // Navbar Active Links
    const navLinks = document.querySelectorAll('.header-link a, .header-link-2 a');
    const windowPathname = window.location.pathname;

    navLinks.forEach(navLink => {
        try {
            // Creates new URL using the href value from link
            const navLinkURL = new URL(navLink.getAttribute('href'), document.baseURI);
            const navLinkPathname = navLinkURL.pathname;
            // Adds active-link class to link if the window pathname equals the navlink pathname
            if ((windowPathname === navLinkPathname) || (windowPathname === '/home.html' && navLinkPathname === '/')) {
                navLink.classList.add('active-link');
            }
        } 
        // Returns error if link is invalid
        catch (error) {
            console.error(`Invalid URL for navLink: ${navLink.href}`, error);
        }
    });
    
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function() {
            // Remove the active-link class from all links
            navLinks.forEach(link => link.classList.remove('active-link'));
            
            // Add the active-link class to the clicked link
            this.classList.add('active-link');
        });
    });


    
})

hoverClass.addEventListener("mouseover", function(){
    collectionClass.style.display = "block";
})

collectionClass.addEventListener("mouseover", function(){
    collectionClass.style.display = "block";
})

collectionClass.addEventListener("mouseout", function(){
    collectionClass.style.display = "none";
})

hoverClass.addEventListener("mouseout", function(){
    collectionClass.style.display = "none";
})

// Header Scrolled Animation
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');

     if(window.scrollY > 0) {
        header.classList.add('scrolled');
     }
     else {
        header.classList.remove('scrolled');
     }
});




// Featured Products Implementation
// Featured Products Container
const fProductsContainer = document.getElementById("featuredProductContainer")
// Function to get data from products json file
const getProductData = async () => {
    const response = await fetch("js/products.json");
    const data = await response.json();
    return data
}
// Function to map and display the data received from products json file
const displayProductData = async () => {
    const productData = await getProductData();
    // Map individual objects 
    let products = productData.map((product) => {
        // Deconstructs each object and assigns their properties to a constant
        const {id, name, oldPrice, newPrice, images, category} = product;
        // Returns the html for each featured product
        
        
        
        return `
        <div class = "featured-product" id = "product${id}">
            <div class="product-image-container">
                <img src="${images.front}" alt="product image" class="featured-product-image">
            </div>
            <p>${name}</p>
            <p>${category}</p>
            <div>
                <p>$${oldPrice}</p>
                <p>$${newPrice}</p>
            </div>
            
        </div>
        `

        // joins array of product without commas
    }).join(''); 
    // Adds the products to the Featured Products Container 
    fProductsContainer.innerHTML = products;

    // Featured Products Image Hover Function
const featuredProductImages = document.querySelectorAll(".featured-product-image");
const productImageContainer = document.querySelectorAll(".product-image-container");
// Hover Function display back view of Each Product When Hovered On
featuredProductImages.forEach(image => {
    image.addEventListener("mouseover", () => {
        if(pdBoxStatus == "unclicked"){
            // Gets Value of image Src and replaces it with Back view Image keyword 
            var newSrc = image.getAttribute("src")
            var finalSrc = newSrc.replace("Front", "Back")
            image.setAttribute("src", finalSrc);
            // Assigns the closest Parent with the class name specified to a variable
            const productImageContainer = image.closest(".product-image-container");
            if (productImageContainer) {
                // Changes the background image (linear Gradient) direction from right to left
                productImageContainer.style.backgroundImage = "linear-gradient(to left, #f5f5f5, #c1c1c1)";
            }
        }
        
    });
        // Resets to the original value
    image.addEventListener("mouseout", () => {
        var newSrc = image.getAttribute("src")
        var finalSrc = newSrc.replace("Back", "Front")
        image.setAttribute("src", finalSrc);
        // Assigns the closest Parent with the class name specified to a variable
        const productImageContainer = image.closest(".product-image-container");
        if (productImageContainer) {
            // resets the background image (linear gradient) to original value
            productImageContainer.style.backgroundImage = "linear-gradient(to right, #f5f5f5, #c1c1c1)";
        }
    });
});
// // Hover Function Changes the direction of the linear gradient of each image container
// productImageContainer.forEach(container => {
//     // Changes the direction from right to left
//     container.addEventListener("mouseover", () => {
//         container.style.backgroundImage = "linear-gradient(to left, #f5f5f5, #c1c1c1)";
//     })
//     // Resets the direction to the original value
//     container.addEventListener("mouseout", () => {
//         container.style.backgroundImage = "linear-gradient(to right, #f5f5f5, #c1c1c1)";
//     })
// })
// Specific Product Detail Implementation
const featuredProduct = document.querySelectorAll(".featured-product");
const productDetailsBox = document.getElementById("productDetailsBox")
featuredProduct.forEach(product => {
    
    product.addEventListener("mouseover", () => {
        for(var i = 0; i < productData.length; i++){
            if(pdBoxStatus == "unclicked") {
                var productId = product.id.replace("product","");
            var productDetails = productData[i];
            var productSizes = productDetails.sizes;
            if(productId == productDetails.id) {
                var boxDetails = 
                `
                <div class="pd-images-container">
                    <div class="pd-main-image-container">
                        <img src="${productDetails.images.front}" id="pdCurrentImage">
                    </div>
                    <div class="pd-thumbnails-container">
                        <div class="pd-thumbnail">
                            <img src="${productDetails.images.front}" id="defaultThumbnail">
                        </div>
                        <div class="pd-thumbnail">
                            <img src="${productDetails.images.rear}">
                        </div>
                        <div class="pd-thumbnail">
                            <img src="${productDetails.images.back}">
                        </div>
                    </div>
                </div>
                <div class="pd-content-container">
                    <div class="pd-main-content">
                        <h3>${productDetails.name}</h3>
                        <p>${productDetails.category}</p>
                        <div class="pd-prices-container">
                            <p>$${productDetails.oldPrice}</p>
                            <p>$${productDetails.newPrice}</p>
                        </div>
                    </div>
                    <div class="pd-color-options">
                        <h3>Color: ${productDetails.colors[0]}</h3>
                        <div class="pd-color-thumbnails">
                            <img src="${productDetails.images.front}">
                        </div>
                    </div>
                    <div class="pd-size-options">
                         <h3>Size</h3>
                         <div class="pd-size-options-container"></div>
                    </div>
                    <div class="pd-buy-options">
                        <button>Add to Cart</button>
                        <button>Buy Now</button>
                    </div>
                    <div class="pd-description-container">
                        <h3>Description</h3>
                        <p>${productDetails.description}</p>
                    </div>
                </div>
                <span class="pd-box-cancel" id="pdBoxCancel">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" style="color: black;"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" fill="currentColor"/></svg>
                </span>
                `;
                
                productDetailsBox.innerHTML = boxDetails;
                // Size Options Implementation
                const productSizesContainer = document.querySelector(".pd-size-options-container");
                //Creates a button element with the value of Each item inside the sizes object of each product 
                productSizes.forEach(size => {
                    var sizeBox = document.createElement("button")
                    sizeBox.textContent = size;
                    productSizesContainer.appendChild(sizeBox);
                })
                //  Image View Hover Implementation
                const pdImageThumbnails = document.querySelectorAll(".pd-thumbnail")
                var previousThumbnail = null;
                const pdCurrentImage = document.getElementById("pdCurrentImage");
                const defaultThumbnail = document.getElementById("defaultThumbnail").parentElement;
                // Sets Current Thumbnail Styling for Default Thumbnail 
                defaultThumbnail.style.border = "1px solid #8a8a8a";
                defaultThumbnail.style.transform = "scale(1.2)";
                defaultThumbnail.style.boxShadow = "2px 2px 5px #d3d3d3"

                var currentThumbnail;
                previousThumbnail = defaultThumbnail;
                pdImageThumbnails.forEach(thumbnail => {
                    // Hover Effects for each Pd Thumbnail
                    thumbnail.addEventListener("mouseover", () => {
                        // Removes current Thumbnail Styling from thumbnails previously hovered on
                        if(previousThumbnail) {
                            previousThumbnail.style.border = "none";
                            previousThumbnail.style.transform = "none";
                            previousThumbnail.style.boxShadow = "none";
                        }

                        currentThumbnail = thumbnail.querySelector("img");
                        var currentThumbnailSrc = currentThumbnail.getAttribute("src");
                        console.log(currentThumbnailSrc);
                        // Sets the Main Image Src value with the value of the thumbnail Hovered on
                        pdCurrentImage.setAttribute("src", currentThumbnailSrc);
                        // Current Thumbnail Styling
                        thumbnail.style.border = "1px solid #8a8a8a";
                        thumbnail.style.transform = "scale(1.2)";
                        thumbnail.style.boxShadow = "2px 2px 5px #d3d3d3"
                        // Sets thumbnail currently hovered on as previous thumbnail
                        previousThumbnail = thumbnail;        
                    })        
                });

                
                
                
            }
            }
            
            console.log();
        }
          
    });
    product.addEventListener("click", () => {
        // Sets Product Detail box Status to Clicked 
        pdBoxStatus = "clicked";
        
        productDetailsBox.style.visibility = "visible";
        productDetailsBox.style.opacity = "1";
        
        // Align Product Detail Box and Fix Position Implementation 
        const pdBoxPosition = productDetailsBox.getBoundingClientRect().top + window.scrollY;
        const pdBoxOffset = window.innerHeight / 1.85 - productDetailsBox.offsetHeight / 2;
    
        // Scrolls the page to the Product Detail Box element, aligning it to the center
        window.scrollTo({
            top: pdBoxPosition - pdBoxOffset,
            behavior: 'smooth'
        });
        // Fixes page to Product Details Box Position
        document.body.style.overflow = "hidden";
        fProductsContainer.style.filter = "blur(5px) brightness(30%)";
        
        // Cancel Button Implementation
        const pdBoxCancel = document.getElementById("pdBoxCancel");
        // Resets all product details box changes
        pdBoxCancel.addEventListener("click", () => {
            pdBoxStatus = "unclicked";
            productDetailsBox.style.visibility = "hidden";
            productDetailsBox.style.opacity = "0";
            fProductsContainer.style.filter = "none";
            document.body.style.overflow = "visible";
        });
    });
   
    
});

}

displayProductData();



const goBackToTop = document.getElementById("top")

goBackToTop.addEventListener("click", function(){
    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })

})