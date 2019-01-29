'use strict';

window.onload = function() {
    // Site fade in animation
    $('body')
        // .hide()
        .css("display", "flex")
        // .fadeIn(750);

    // Menu toggle button
    document.querySelector('.navbar__toggle').addEventListener('click', menuToggle);

    function menuToggle(e) {
        var sibling = this.previousElementSibling;
        sibling.getElementsByClassName('navbar__items')[0].classList.toggle('navbar__items--active');
    }

    function getCurrentYear() {
        var date = new Date();
        return date.getFullYear();
    }

    // Copyright in footer
    $('.footer__copyright').html(`${getCurrentYear()} Developed by Ofen`);

    // Page content
    var pageState = 'home';

    // Load by dafault page
    $('#content').load(`ajax/${pageState}.html`);

    function updatePage(state) {
        pageState = state;
    }

    // Basic plugin that is waiting for all images to load
    (function($) {
        $.fn.waitImage = function(callback) {
            var images = this.length;

            if (callback) {

                if (images == 0) {
                    callback.apply(this);
                    return this;
                }

                var counter = 0;
                
                this.each(function(index, img) {
                    $(img).on('load', incrementCounter);
                });

                function incrementCounter() {
                    counter++;

                    if(counter == images) {
                        callback.apply(this);
                        return this;
                    }
                }

            }

            return this;

        }

    })($);

    // Router
    $('.navbar__items li').click(function(e) {
        e.preventDefault();
        var loadingBlock = `
            <section class="content">
                <div class="content__body">
                    <p>Loading...</p>
                </div>
            </section>
        `;
        var id = this.firstElementChild.id;
        if (pageState !== id) {
            // Updating current view
            updatePage(id);
            // Removing active class from each menu items
            $(this).siblings('li').removeClass('items__item--active');

            // Adding active class to clicked item
            $(this).addClass('items__item--active');

            $(this).parent()
                // Removing active class from menu
                .removeClass('navbar__items--active')
                // Removing active class from menu toggle button
                .siblings('.navbar__toggle').removeClass('navbar__toggle--active');

            
            // $('#content').pageOut(function() {
            //     var content = $(this);
            //     content.load(`ajax/${pageState}.html`, function() {
            //         $('img').imagesLoaded(function() {
            //             content.pageIn();
            //         })
            //     });
            // });
            
            // $('#content').animate({left: '-50px', opacity: 0}, 700, function() {
            //     $(this).css({left: '50px'}).load(`ajax/${pageState}.html`, function() {
            //         $(this).animate({left: '0', opacity: 1}, 700);
            //     });
            // });
            // Injecting page content
            $('#content').animate({opacity: 0}, 300, function() {
                var content = $(this);
                content.load(`ajax/${pageState}.html`, function() {
                    $('img').waitImage(function() {
                        content.animate({opacity: 1}, 300);
                    });
                });
            });

        }
    });

    $(document).on('submit', 'form', function(e) {
        e.preventDefault();
        var form = $(this);
        var data = form.serializeArray();
        var obj = {};

        for(item of data) {
            obj[item.name] = item.value;
        }

        console.log(obj);

        // $.ajax({
        //     type: 'POST',
        //     url: '',
        //     data: data,
        //     success: function() {
        //         console.log('OK');
        //     },
        //     dataType: 'JSON'
        // });
    });
}
    

    // (function($) {
    //     $.fn.pageOut = function(callback) {
    //         var selector = this;
    //         selector.addClass('fadeOut');

    //         setTimeout(function() {
                
    //             if (callback) {
    //                 callback.apply(selector);
    //             }

    //         }, 1000);

    //         return selector;
    //     }

    //     $.fn.pageIn = function(callback) {
    //         var selector = this;

    //         selector.removeClass('fadeOut');
    //         selector.addClass('bounceIn');

    //         setTimeout(function() {
    //             selector.removeClass('bounceIn');

    //             if (callback) {
    //                 callback.apply(selector);
    //             }
                
    //         }, 1000);

    //         return selector;
    //     }

    // })(jQuery);