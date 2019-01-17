window.onload = function() {

    // Menu toggle button
    document.querySelector('.navbar__toggle').addEventListener('click', menuToggle);

    function menuToggle(e) {
        this.classList.toggle('navbar__toggle--active');
        var sibling = this.nextElementSibling;
        sibling.classList.toggle('navbar__items--active');
    }

    function getCurrentYear() {
        var date = new Date();
        return date.getFullYear();
    }

    // Copyright in footer
    $('.footer__copyright').html(`${getCurrentYear()} Developed by Ofen`);

    $('body')
        .css("display", "flex")
        .hide()
        .fadeIn(750);

    // Page content
    var pageState = 'home';

    // Load by dafault page
    $('#content').load(`ajax/${pageState}.html`);

    function updatePage(state) {
        pageState = state;
    }

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
            // Removing active class from menu
            $(this).parent().removeClass('navbar__items--active');
            // Removing active class from menu toggle button
            $(this).parent().siblings('.navbar__toggle').removeClass('navbar__toggle--active');
            // Adding active class to clicked item
            $(this).addClass('items__item--active');
            // Injecting page content
            $('#content').animate({opacity: 0}, 300, function() {
                $(this).load(`ajax/${pageState}.html`, function() {
                    $(this).animate({opacity: 1}, 300);
                });
            });

        }
    });
}