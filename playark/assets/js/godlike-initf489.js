;(function() {
'use strict';
	
var options = {
    enableSearchAutofocus: godlikeInitOptions.enableSearchAutofocus == 1,
    enableActionLikeAnimation: godlikeInitOptions.enableActionLikeAnimation == 1,
    enableShortcuts: godlikeInitOptions.enableShortcuts == 1,
    enableFadeBetweenPages: godlikeInitOptions.enableFadeBetweenPages == 1,
    enableMouseParallax: godlikeInitOptions.enableMouseParallax == 1,
    enableCookieAlert: godlikeInitOptions.enableCookieAlert == 1,
    scrollToAnchorSpeed: godlikeInitOptions.scrollToAnchorSpeed,
    parallaxSpeed: godlikeInitOptions.parallaxSpeed,
    backgroundMusic: godlikeInitOptions.backgroundMusic,
    backgroundMusicVolume: godlikeInitOptions.backgroundMusicVolume,
    backgroundMusicAutoplay: godlikeInitOptions.backgroundMusicAutoplay == 1,

    templates: {
        secondaryNavbarBackItem: godlikeInitOptions.secondaryNavbarBackItem,

        likeAnimationLiked: godlikeInitOptions.likeAnimationLiked,
        likeAnimationDisliked: godlikeInitOptions.likeAnimationDisliked,

        cookieAlert: '<span class="nk-cookie-alert-close"><span class="nk-icon-close"></span></span>\n            '+
        godlikeInitOptions.cookieAlertText+' <a href="'+godlikeInitOptions.cookieAlertLink+'">'+godlikeInitOptions.cookieAlertLinkTitle+'</a>\n            <div class="nk-gap"></div>\n            <span class="nk-cookie-alert-confirm nk-btn link-effect-4 nk-btn-bg-white nk-btn-color-dark-1">'+godlikeInitOptions.cookieAlertButtonTitle+'</span>',

        plainVideoIcon: '<span class="nk-video-icon"><i class="fa fa-play pl-5"></i></span>',
        plainVideoLoadIcon: '<span class="nk-loading-spinner"><i></i></span>',
        fullscreenVideoClose: '<span class="nk-icon-close"></span>',
        gifIcon: '<span class="nk-gif-icon"><i class="fa fa-hand-pointer-o"></i></span>',

        audioPlainButton: '<div class="nk-audio-plain-play-pause">\n                <span class="nk-audio-plain-play">\n                    <span class="ion-play ml-3"></span>\n                </span>\n                <span class="nk-audio-plain-pause">\n                    <span class="ion-pause"></span>\n                </span>\n            </div>',

        instagram: false,
        instagramLoadingText: false,
        instagramFailText: false,
        instagramApiPath: false,

        twitter: false,
        twitterLoadingText: false,
        twitterFailText: false,
        twitterApiPath: false,

        countdown: '<div>\n                <span>%D</span>\n                '+godlikeInitOptions.days+'\n            </div>\n            <div>\n                <span>%H</span>\n                '+godlikeInitOptions.hours+'\n            </div>\n            <div>\n                <span>%M</span>\n                '+godlikeInitOptions.minutes+'\n            </div>\n            <div>\n                <span>%S</span>\n                '+godlikeInitOptions.seconds+'\n            </div>'
    },

    shortcuts: {
        toggleSearch: godlikeInitOptions.toggleSearch,
        showSearch: godlikeInitOptions.showSearch,
        closeSearch: godlikeInitOptions.closeSearch,

        closeFullscreenVideo: godlikeInitOptions.closeFullscreenVideo,

        postLike: godlikeInitOptions.postLike,
        postDislike: godlikeInitOptions.postDislike,
        postScrollToComments: godlikeInitOptions.postScrollToComments,

        toggleSideLeftNavbar: godlikeInitOptions.toggleSideLeftNavbar,
        openSideLeftNavbar: godlikeInitOptions.openSideLeftNavbar,
        closeSideLeftNavbar: godlikeInitOptions.closeSideLeftNavbar,

        toggleSideRightNavbar: godlikeInitOptions.toggleSideRightNavbar,
        openSideRightNavbar: godlikeInitOptions.openSideRightNavbar,
        closeSideRightNavbar: godlikeInitOptions.closeSideRightNavbar,

        toggleFullscreenNavbar: godlikeInitOptions.toggleFullscreenNavbar,
        openFullscreenNavbar: godlikeInitOptions.openFullscreenNavbar,
        closeFullscreenNavbar: godlikeInitOptions.closeFullscreenNavbar,

        toggleCart: godlikeInitOptions.toggleCart,
        showCart: godlikeInitOptions.showCart,
        closeCart: godlikeInitOptions.closeCart,

        toggleSignForm: godlikeInitOptions.toggleSignForm,
        showSignForm: godlikeInitOptions.showSignForm,
        closeSignForm: godlikeInitOptions.closeSignForm
    },
    events: {
        actionHeart: function actionHeart(params) {
            params.updateIcon();
            var post_id = params.$dom.attr("data-post-id");
            var is_comment = params.$dom.attr("data-is-comment");
            var is_activity = params.$dom.attr("data-is-activity");

            var disliked_flag = 0;
            if(!is_comment){
                is_comment=0;
            }
            if(!is_activity){
                is_activity=0;
            }
            var result = params.currentNum;
            jQuery.ajax({
                type: "post",
                url: godlikeInitOptions.url,
                data: "action=godlike-jm-post-like&is_comment="+is_comment+"&is_activity="+is_activity+"&nonce="+godlikeInitOptions.nonce+"&godlike_jm_post_like=&post_id="+post_id+"&disliked_flag="+disliked_flag,
                success: function(data){
                    console.log(data);
                    if(typeof data === 'object' && data.success){
                        params.updateNum(data.count);
                    }
                    else{
                        params.updateNum(result);
                    }
                },
                error: function(data){
                    params.updateNum(result);
                }
            });
        },
        actionLike: function actionLike(params) {
            params.updateIcon();
            var post_id = params.$dom.parent().attr("data-post-id");
            var result = params.currentNum;
                jQuery.ajax({
                    type: "post",
                    url: godlikeInitOptions.url,
                    data: "action=godlike-like-dislike-action-comment&nonce=" + godlikeInitOptions.nonce + "&comment_id=" + post_id + "&type=" + params.type,
                    success: function (data) {
                        if (typeof data === 'object' && data.success) {
                            params.updateNum(data.latest_count);
                        }
                        else {
                            params.updateNum(result);
                        }
                    },
                    error: function (data) {
                        params.updateNum(result);
                    }
                });
        }
    }
};

if (typeof Godlike !== 'undefined') {
    Godlike.setOptions(options);
    Godlike.init();
}
}());
