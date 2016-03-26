$('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
});
window.onload = function () {

    //$(window).resize(function () {
    //    if ($(window).width() < 800) {
    //        $('.addclass').toggleClass('slide2');
    //    }
    //    if ($(window).width() > 800) {
    //        $('.addclass').toggleClass('slide2');
    //    }
    //});

    $('.slider').each(function () {
        var $this = $(this);
        var $slides = $('.slide2');
        var buttonArray = [];
        var currentIndex = 0;
        var timeout;

        function move(newIndex) {
            var animateLeft, slideLeft;
            advance();

            if ($slides.is(':animated') || currentIndex === newIndex) {
                return;
            }

            buttonArray[currentIndex].removeClass('active');
            buttonArray[newIndex].addClass('active');

            if (newIndex > currentIndex) {
                slideLeft = '100%';
                animateLeft = '-100%';

            } else {
                slideLeft = '-100%';
                animateLeft = '100%';
            }

            $slides.eq(newIndex).css({
                display: 'block',
                left: slideLeft,
            });


            //cunrrent slide medium speed
            $slides.eq(currentIndex).animate({
                left: animateLeft
            }, 1500, function () {
                $slides.eq(currentIndex).css({
                    display: 'none'
                });

            });

            //new slide medium speed
            $slides.eq(newIndex).animate({
                left: 0
            }, 1500, function () {

                currentIndex = newIndex;
            });



        }

        function advance() {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                if (currentIndex < ($slides.length - 1)) {
                    move(currentIndex + 1);
                } else {
                    move(0);
                }
            }, 7000);
        }


        //dots
        $.each($slides, function (index) {
            var $button = $('<a class="slide_btn">&bull;</a>');
            if (index === currentIndex) {
                $button.addClass('active');
            }
            $button.on('click', function () {
                move(index);
            }).appendTo('.slide_buttons');
            buttonArray.push($button);
        });

        //buttons
        $('.next_btn').on('click', function () {
            if (currentIndex < ($slides.length - 1)) {
                move(currentIndex + 1);
            } else {
                move(0);
            }
        });

        $('.previous_btn').on('click', function () {
            if (currentIndex !== 0) {
                move(currentIndex - 1);
            } else {
                move(3);
            }
        });

        advance();

    });

    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });

    var elem = document.querySelector('#draggable');
    var draggie = new Draggabilly(elem, {
        axis: 'x',
        containment: true
    });

    var $box2 = $('.box2'), $picture = $('#picture')
    var pictureleft = $picture.position().left;
    
    // bind event listener
    draggie.on('dragMove', function () {
        $box2.css({
            left: $('#draggable').position().left + 'px',
        });
        $picture.css({
            left: -$('#draggable').position().left + 'px',
        });
        //$box2.css('background-attachment', 'fixed');
    });
    draggie.on('dragEnd', function () {
        $box2.css('background-attachment', 'scroll');
    });

    var shine = new Shine(document.getElementById('shine'));

    function handleMouseMove(event) {
        shine.light.position.x = event.clientX;
        shine.light.position.y = event.clientY;
        shine.draw();
    }

    window.addEventListener('mousemove', handleMouseMove, false);

    $('.switch__label').click(function () {
        $('.partonetitle2').toggleClass('changeopacity');
    });

    $(window).scroll(function () {
        $(".slideanim").each(function () {
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slide");
            }
        });
    });

}