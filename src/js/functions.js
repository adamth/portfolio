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
        $('.fill').each(function(i) {
            const fill = this;
            setInterval(function() {
                $(fill).removeClass('hidden');
            }, i*200);
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
    if(keyItem.isInViewport()) {
        $('.item').each(function(i) {
            const item = this;
            setInterval(function(i) {
                $(item).addClass('fadeIn');
            }, i * 200);
            
        });
    }
    if(grid.isInViewport()) {
        grid.children().each(function(i) {
            const item = this;
            setInterval(function(i) {
                $(item).addClass('fadeUpIn');
            }, i * 100);
            
        });
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
