const swiper = new Swiper('.clients-swiper', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    autoplay: true
});

const swiper2 = new Swiper('.case-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 39,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

document.addEventListener("DOMContentLoaded", function() {

    const accordionButtons = document.querySelectorAll('.accordion-action');

    accordionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            debugger
            const accordion = button.closest('.accordion');
            accordion.classList.toggle('expanded');

            const isExpanded = accordion.classList.contains('expanded');
            button.setAttribute('aria-expanded', isExpanded);
        });
    });
});
