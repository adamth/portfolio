// Function to test if an element is in the viewport
$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(window).on('scroll', function() {
    // Test if elements are on screen and do something
    const chart = $('.chart');
    const sosmePhone = $('#sosme-phone');
    const sosmeLanding = $('#sosme-landing');
    const profile = $('.profile');
    const skills = $('.skills');
    const keyItem = $('.item');
    const grid = $('.grid');

    if(chart.isInViewport()) {
        const fills = document.querySelectorAll('.fill');
        for(let i = 0; i < fills.length; i++) {
            const fill = fills[i];
            setTimeout(function() {
                $(fill).addClass('grow');
            }, 800 + (200 * i));
        }
    }
    if(keyItem.isInViewport()) {
        const items = document.querySelectorAll('.item');
        for(let i = 0; i < items.length; i++) {
            const item = items[i];
            setTimeout(function() {
                $(item).addClass('fadeIn');
            }, 100 * i);   
        }
    }
    if(grid.isInViewport()) {
        grid.children().each(function(i) {
            const item = this;
            setTimeout(function(i) {
                $(item).addClass('fadeUpIn');
            }, i * 100);
        });
    }
    if(sosmeLanding.isInViewport()) {
        sosmePhone.addClass('fadeUpIn');
    }
    if(profile.isInViewport()) {
        profile.addClass('slideRight');
    }
    if(skills.isInViewport()) {
        skills.addClass('slideLeft');
    }
});

// rotate the arrow on 'my work' button on mouse hover
$('.button-work').hover(function() {
    $('.arrow-right').addClass('rotate');
}, function() {
    $('.arrow-right').removeClass('rotate');
});

// scroll to my work on button click
$('.button-work').click(function() {
    $('html,body').animate({
        scrollTop: $('.work').offset().top
    },'slow');
});

// Modal

let currentImage = 1;
let modalOpen = false;

$('.close').on('click', function() {
    closeModal();
});

$('.grid-image').on('click', function() {
    const id = $(this).attr('id');
    setImage(id);
    openModal();
});

function setImage(n) {
    currentImage = n;
    openModal();
}

function changeImage(n) {
    currentImage = parseInt(currentImage) + n;
    openModal();
}

function closeModal() {
    modalOpen = false;
    $('.modal').addClass('hide');
    setTimeout(function() {
        $('.modal').css('display', 'none');
        $('.modal').removeClass('show');
        $('.modal').removeClass('hide');
    }, 500);
}

function openModal() {
    modalOpen = true;
    const images = document.querySelectorAll('.modal-image');
    for(let i = 0; i < images.length; i++) {
        $(images[i]).css('display', 'none');
    }
    $(images[currentImage - 1]).css('display', 'flex');
    $('.modal').css('display', 'flex');
    $('.modal').addClass('show');
}

// Key functions

function right() {
    if(parseInt(currentImage) + 1 > document.querySelectorAll('.modal-image').length) {
        return setImage(1);
    }
    changeImage(1);
}

function left() {
    if(parseInt(currentImage) - 1 <= 0) {
        return setImage(document.querySelectorAll('.modal-image').length);
    }
    changeImage(-1);
}

$('.left').on('click', function() {
    left();
});

$('.right').on('click', function() {
    right();
});

$(document).bind('keydown', function(e) {
    if(modalOpen) {
        switch (e.which) {
            case 37: // left
                left();
            break;
    
            case 39: // right
                right();
            break;

            case 27: // exit
                closeModal();
            break;
        }
    }
  });