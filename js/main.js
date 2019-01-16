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
        var id = this.firstElementChild.id;
        if (pageState !== id) {
            updatePage(id);
            $(this).siblings('li').removeClass('items__item--active');
            $(this).addClass('items__item--active');
            $('#content').hide().load(`ajax/${pageState}.html`).fadeIn(500);
        }
    });

}