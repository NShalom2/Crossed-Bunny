
document.addEventListener('DOMContentLoaded', function(){
    const contactUsForm = document.querySelector(".contact-form-container");

    contactUsForm.addEventListener("mouseover", function(){
        contactUsForm.classList.add("active");
    });

    contactUsForm.addEventListener("mouseout", function(){
        contactUsForm.classList.remove("active");
    });
});

