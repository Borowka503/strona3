(function ($) {
    // fixed carousel inside full-width-row when row resized
    $(document).on('vc-full-width-row', function (e, rows, a, b, c) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (args.length) {
            $rows = $(args);

            var $carousels = $rows.find('.nk-carousel-inner');
            if ($carousels.length && typeof $carousels.flickity !== 'undefined') {
                $carousels.flickity('resize');
            }
        }
    });
    $(document).on( 'tinymce-editor-init', function( event, editor) {
        if ((editor.id == 'bbp_reply_content' || editor.id == 'bbp_topic_content' || $('#buddypress').length) && editor.dom) {
            var body = editor.dom.select('body');
            if (typeof body[0] !== 'undefined') {
                body[0].style.backgroundColor = "#151515";
                body[0].style.color = "white";
                body[0].style.margin = "0px";
                body[0].style.padding = "0px";
                var css = 'a { color: #b56d19;}',
                    head = editor.dom.doc.head || editor.dom.doc.getElementsByTagName('head')[0],
                    style = editor.dom.doc.createElement('style');
                style.type = 'text/css';
                if (style.styleSheet){
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(editor.dom.doc.createTextNode(css));
                }
                head.appendChild(style);
            }
        }
    });
    $(document.body).on('country_to_state_changed', function (event, country, wrapper) {
        var statebox   = wrapper.find( '#billing_state, #shipping_state, #calc_shipping_state' );

            statebox.addClass('form-control');
        
    });
    $( document ).on('change input', 'div.woocommerce > form .cart_item :input', function () {
        $('#godlike-cart-update').removeClass('godlike-shadow-button');
    });
    $(document.body).on('updated_cart_totals', function () {
        $('#godlike-cart-update').addClass('godlike-shadow-button');
    });

//Called when woocommerce finishes the adding to cart process and produce fragments with the new data
    $( document.body ).on( "added_to_cart", function( event, fragments, cart_hash, $thisbutton ){
        var smallCart;
        var countContainer = $('#godlike_small_cart_count');
        $.each( fragments, function(name, item) {
            smallCart = $(item).find('.godlike_hide_small_cart');
        });
        if(smallCart !== undefined){
            //remove small cart modal container
            $('#godlike_small_cart').html(smallCart.html());
            if(smallCart.attr('data-cart-count') > 0){
                countContainer.removeClass('fade out');
                countContainer.addClass('fade show');
            }
            countContainer.text(smallCart.attr('data-cart-count'));
        }
        //hide add to cart button
        $('.added_to_cart').prev('.add_to_cart_button').hide();
    });
    $( document.body ).on( "wc_fragments_loaded wc_fragments_refreshed", function(){
        var countContainer = $('#godlike_small_cart_count');
        var smallCart =  $('#godlike_small_cart .widget_shopping_cart_content .godlike_hide_small_cart');
        if(smallCart.length){
            //remove small cart modal container
            $('#godlike_small_cart').html(smallCart.html());
            if(smallCart.attr('data-cart-count') > 0){
                countContainer.removeClass('fade out');
                countContainer.addClass('fade show');
            }
            countContainer.text(smallCart.attr('data-cart-count'));
        }
    });
    $('.price_slider_amount .button')
        .addClass('nk-btn pull-left nk-btn-sm')
        .removeClass('button');
    $('.widget_product_categories .product-categories').addClass('nk-widget-categories');

    $('#godlike-check-age').on('change', function(){
        var month = $(this).find('[name="godlike_age_check_month"]').val();
        var year = $(this).find('[name="godlike_age_check_year"]').val();
        var $days_container = $(this).find('[name="godlike_age_check_day"]');

        if(month && year){
            var $day_options = $days_container.find('option');
            var number_days = new Date(year, month, 0).getDate();
            var current_days = $day_options.length - 1;
            var selected_day = $days_container.val();

            if(number_days < current_days) {

                // delete extra date
                $day_options.filter(':eq('+ number_days + ')').nextAll().remove();

                // clear selection if selected day is gone
                if (selected_day > number_days) {
                    $days_container.val('');
                }
            } else if(number_days > current_days) {

                // add date
                for(var i = current_days + 1; i < number_days + 1; i++){
                    $days_container.append('<option value="' + i + '">' + i + '</option>');
                }
            }
        }
    });

    // add top padding when disabled header and main navigation is opaque
    var $padding = false;
    var $content = $('.nk-main .row:eq(0) > div');
    var $headerNotOpaq = $('.nk-header:not(.nk-header-opaque)');
    var $page = $('article.page');
    var $headerTitle = $('.nk-header-title');
    function updateTopContentPadding () {
        $padding.height($headerNotOpaq[0].getBoundingClientRect().height);
    }
    if (!$headerTitle.length && $headerNotOpaq.length && (!$page.length || $page.length && $page.prev('.nk-gap-4').length)) {
        // generate paddings
        $content.each(function () {
            var $newPadding = $('<div>');
            var $isSidebar = $(this).children('.nk-sidebar');

            // is sidebar
            if ($isSidebar.length) {
                $newPadding.addClass('hidden-md-down').prependTo($isSidebar);
            } else {
                $newPadding.prependTo($(this));
            }

            $padding = $padding ? $padding.add($newPadding) : $newPadding;
        });
        Godlike.debounceResize(updateTopContentPadding);
        updateTopContentPadding();
    }

    // BuddyPress fields fixed
    $('.godlike-select select').addClass('form-control');
    $('.godlike-datetime select').addClass('form-control');
    // BuddyPress tabs fixed
    $('.godlike_tabs li').each(function(i,elem) {
        if ($(this).hasClass("current")) {
            $(this).find('a').addClass('active');
        }
    });
    $('.godlike_notification_order form').addClass('nk-social-sort');
    $('.godlike_notification_order select').addClass('form-control');
    $('.godlike_notification_actions .mark-read.primary').prepend('<span class="ion-eye"></span> ');
    $('.godlike_notification_actions .mark-unread.primary').prepend('<span class="ion-eye-disabled"></span> ');
    $('.godlike_notification_actions .delete.secondary.confirm').prepend('<span class="ion-trash-b"></span> ');


    /* Star action */
    // threads stars
    $('#message-threads .thread-star').each(function() {
        var className = $(this).find('a.message-action-unstar').length ? 'ion-android-star' : 'ion-android-star-outline';
        $(this).parents('tr:eq(0)').find('.nk-social-messages-description .nk-social-messages-favorite span').addClass(className);
    });
    $('#message-threads').on('click', '.nk-social-messages-favorite', function(e){
        e.preventDefault();
        $(this).parents('tr:eq(0)').find('td.thread-star a').click();
        $(this).find('span').toggleClass('ion-android-star-outline ion-android-star');
    });

    // single thread stars
    $('#message-thread .message-metadata.nk-social-messages-single-meta').each(function() {
        var className = $(this).find('a.message-action-unstar').length ? 'ion-android-star' : 'ion-android-star-outline';
        $(this).find('.nk-social-messages-single-meta-favorite span').addClass(className);
    });
    $('#message-thread').on('click', '.nk-social-messages-single-meta-favorite', function(e){
        e.preventDefault();
        $(this).parents('.message-metadata.nk-social-messages-single-meta:eq(0)').find('.message-star-actions a').click();
        $(this).find('span').toggleClass('ion-android-star-outline ion-android-star');
    });

    $('.members.friends .friendship-button, .godlike_group_buttons .group-button').addClass('nk-btn-xs');
    $('#settings-form select').addClass('form-control');

    var groupSettingsSubmit = $('#group-settings-form input[type=submit]');
    if(groupSettingsSubmit.length){
        groupSettingsSubmit.after('<button class="nk-btn link-effect-4 pull-right">'+groupSettingsSubmit.val()+'</button>');
        groupSettingsSubmit.remove();
    }

    /*rtMedia fixed*/
    $('#rtm-media-gallery-uploader #rtmedia-upload-container #drag-drop-area .rtm-album-privacy select').addClass('form-control')

    var startMediaUpload = $('.start-media-upload');
    var startMediaUploadValue = startMediaUpload.val();
    startMediaUpload.after("<button class='start-media-upload nk-btn text-white' value='" + startMediaUploadValue + "'>" + startMediaUploadValue + "</button>");
    startMediaUpload.remove();

    /*rtMedia fixed Load More button*/
    var rtMediaGalleryNext = $('#rtMedia-galary-next');
    if(rtMediaGalleryNext.attr('href') === ''){
        rtMediaGalleryNext.attr('href', '#');
    }

    $('.rtmedia-title-editor, .rtm-form-select, .rtmedia-desc-textarea, .rtmedia-merge-user-album-list').addClass('form-control');
    $('.rtm-single-actions.rtm-item-actions button.rtmedia-edit').removeClass('button');
    $('.rtm-single-actions.rtm-item-actions button.rtmedia-edit').addClass('nk-btn');
    $('.rtm-single-actions.rtm-item-actions button.rtmedia-delete-media').removeClass('button');
    $('.rtm-single-actions.rtm-item-actions button.rtmedia-delete-media').addClass('nk-btn');

    $('#bbp_forum_type_select.bbp_dropdown, #bbp_forum_status_select.bbp_dropdown, #bbp_forum_visibility_select.bbp_dropdown').addClass('form-control');


    /* WooCommerce prevent review without rating */
    $('body').on( 'click', '#respond #submit', function() {
        console.log('test');
        if (typeof wc_single_product_params === 'undefined') {
            return;
        }

        var $rating = $(this).closest('#respond').find('.nk-rating');
        var $form = $(this).closest('form');
        var formData = $form.serializeArray();
        var rating = false;

        for (var k = 0; k < formData.length; k++) {
            if (formData[k].name === 'rating') {
                rating = formData[k].value;
                break;
            }
        }

        if ( $rating.length > 0 && !rating && wc_single_product_params.review_rating_required === 'yes' ) {
            window.alert( wc_single_product_params.i18n_required_rating_text );

            return false;
        }
    });

})(jQuery);