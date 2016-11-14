/*!
 * jQuery Browser Plugin v0.0.6
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */

(function(jQuery, window, undefined) {
    "use strict";

    var matched, browser;

    jQuery.uaMatch = function(ua) {
        ua = ua.toLowerCase();

        var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
                /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                [];

        var platform_match = /(ipad)/.exec(ua) ||
                /(iphone)/.exec(ua) ||
                /(android)/.exec(ua) ||
                /(windows phone)/.exec(ua) ||
                /(win)/.exec(ua) ||
                /(mac)/.exec(ua) ||
                /(linux)/.exec(ua) ||
                /(cros)/i.exec(ua) ||
                [];

        return {
            browser: match[ 3 ] || match[ 1 ] || "",
            version: match[ 2 ] || "0",
            platform: platform_match[ 0 ] || ""
        };
    };

    matched = jQuery.uaMatch(window.navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
        browser.versionNumber = parseInt(matched.version);
    }

    if (matched.platform) {
        browser[ matched.platform ] = true;
    }

    // These are all considered mobile platforms, meaning they run a mobile browser
    if (browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ]) {
        browser.mobile = true;
    }

    // These are all considered desktop platforms, meaning they run a desktop browser
    if (browser.cros || browser.mac || browser.linux || browser.win) {
        browser.desktop = true;
    }

    // Chrome, Opera 15+ and Safari are webkit based browsers
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true;
    }

    // IE11 has a new token so we will assign it msie to avoid breaking changes
    if (browser.rv)
    {
        var ie = "msie";

        matched.browser = ie;
        browser[ie] = true;
    }

    // Opera 15+ are identified as opr
    if (browser.opr)
    {
        var opera = "opera";

        matched.browser = opera;
        browser[opera] = true;
    }

    // Stock Android browsers are marked as Safari on Android.
    if (browser.safari && browser.android)
    {
        var android = "android";

        matched.browser = android;
        browser[android] = true;
    }

    // Assign the name and platform variable
    browser.name = matched.browser;
    browser.platform = matched.platform;


    jQuery.browser = browser;
})(jQuery, window);


var qs = (function(a) {
    if (a == "")
        return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p = a[i].split('=');
        if (p.length != 2)
            continue;
        b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null)
        return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)
        return false;
    if (obj.length === 0)
        return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))
            return false;
    }

    return true;
}

function getCounter(mode) {
    
	var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();

    $.get($('base').attr('href') + 'en/index/counter/?widgetId=' + widgetId + '&mode=' + mode + '&compId=' + Wix.Utils.getCompId() + '&viewMode=' + Wix.Utils.getViewMode() + '&instance='+instance, function(data) {
        $('.wrapper').html(data);
        resizeCounter();
        $(".wrapper").removeClass('hidden');

        var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();

        if (mode == 'editor') {
            var url = $('base').attr('href') + 'en/settings/loadeditor/?id=' + widgetId + '&instance='+instance;
			$.get(url, function(data){
				if (isEmpty(data)){
					showCounter(dataSettings);
				} else {
					showCounter(data);
				}
			});
        } else {
			showCounter(dataSettings);
		}
		
		function showCounter(settings){
			var dataSettings = settings;
			var animations = ['slideExpandUp','fadeIn','slideUp','hatch','rotateIn','bounceIn'];
			var spanner = $('.counter div span');
			var temp;
			var spannerClasses = spanner.attr('class').split(" ");
			$.each(animations,function(index, value){
				if( $.inArray(value, spannerClasses) !== -1 ) {
					spanner.removeClass(value);
					temp = (value == 'bounceIn')?'bounce':value;
				} 
			});
			var ds = setInterval(function() {
				if(dataSettings && dataSettings.animationMode.index == 1){
					spanner.each(function(index, value) {
						var nvm = $(this);
						var timerr = setTimeout(function() {
							$('.wrapper #preloader').remove();
							nvm.addClass('visible');
							nvm.addClass(temp);
						}, dataSettings.animationTimeout * index);
					});
				} else {
					$('.wrapper #preloader').remove();
					spanner.addClass(temp);
					spanner.addClass('visible');
				}
				resizeCounter();
				$(window).bind('resize', function() { resizeCounter(); });
				clearInterval(ds);
			},2200);
		}
		
	}).fail(function(jqXHR, textStatus) {
    });
}

Wix.addEventListener(Wix.Events.EDIT_MODE_CHANGE, function(data) {
    var editMode = data.editMode;

    if(editMode == 'preview') {

        var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();
        var url = $('base').attr('href') + 'en/settings/loadeditor/?id=' + widgetId + '&instance='+instance;

        $.get(url, function(data) {
            if (isEmpty(data)) {
                //console.log("// data is empty");
            } else {

                dataAnimation = data.animation.value;
                if(dataAnimation == 6) {
                    var tempAnim = 'bounce';
                }
                else if (dataAnimation == 1) {
                    var tempAnim = 'hatch';
                }        
                else if (dataAnimation == 2) {
                    var tempAnim = 'slideUp';
                }
                else if (dataAnimation == 3) {
                    var tempAnim = 'expandUp';
                }
                else if (dataAnimation == 4) {
                    var tempAnim = 'fadeIn';
                }
                else if (dataAnimation == 5) {
                    var tempAnim = 'rotateIn';
                }
                else if (dataAnimation == 0) {
                    var tempAnim = '';
                }

                dataAnimationMode = data.animationMode.index;
                dataAnimationTimeout = data.animationTimeout;

                if (dataAnimationMode === 0) {
                    counterds = $('.counter div span');
                    counterds.removeClass('visible animated');
                    counterds.removeClass('bounce hatch slideUp expandUp fadeIn rotateIn');
                    counterds.addClass(tempAnim);
                    setTimeout(function(){
                        counterds.addClass('visible animated');
                    },100);
                } else {
                    counterds = $('.counter div span');
                    counterds.removeClass('visible animated');
                    counterds.removeClass('bounce hatch slideUp expandUp fadeIn rotateIn');


                    $('.counter div span').each(function(index, value) {
                        var ths = $(this);
                        var timerr = setTimeout(function() {
                            $('.wrapper #preloader').remove();
                            ths.addClass('visible animated');
                            ths.addClass(tempAnim);
                        }, dataAnimationTimeout * index);

                    });
                }
            }
        });
    }              

});

var ratio = 0.2;
var defaultFontSize = 25; // ALL OTHERS
var defaultWindowWidth = 300;
var defaultWindowHeight = 60;
var counterDiv = $('.counter');
var wrapperInnerDiv = $('.counter div');
var span = $('.counter div span');


/* IF STATEMENTS */

if ($.browser.webkit)
{
    var half = 2;
}

if ($.browser.mozilla)
{
    var half = 2;
}

/* END */


function resizeCounter() {
    /* VARIABLES */
    var wrapperWidth = $(window).width();
    var wrapperHeight = $(window).height();
    /* END */

    /* DO NOT ALLOW VERTICAL RESIZE */
    windowHeight = wrapperWidth * ratio;
    Wix.setHeight(windowHeight);
    /* END */

    /* SETTING COUNTER HEIGHT */
    $('.counter div').css('height', wrapperHeight + 'px');
    $('.counter div.clear').attr('style','width:0px !important;');
    $('#countdown-3.counter div').css('height', wrapperHeight - 10 + 'px');
    $('#countdown-3.counter div.clear').attr('style','width:0px !important;');
    $('#countdown-4.counter div').css('height', wrapperHeight - 8 + 'px');
    /* END */

    /* FONT SIZE CALCULATION */

    var FontPercentage = (wrapperWidth / defaultWindowWidth);

    /* FONT SIZE */
    var newFontSize = Math.floor(defaultFontSize * FontPercentage) + 1;
    /* END */

    /* COUNTERS STYLING */
    //$('#countdown-1.counter div, #countdown-2.counter div, #countdown-3.counter div, #countdown-4.counter div, #countdown-5.counter div, #countdown-6.counter div').css('font-size', newFontSize + 'px');

    /* END */

    $('#countdown-1.counter div span').css('margin-top', '-' + Math.floor($('#countdown-1.counter div span').height() / 2) + 'px');
    $('#countdown-2.counter div span').css('margin-top', '-' + Math.floor($('#countdown-2.counter div span').height() / 2) + 'px');
    $('#countdown-3.counter div span').css('margin-top', '-' + Math.floor($('#countdown-3.counter div span').height() / 2) + 'px');
    $('#countdown-4.counter div span').css('margin-top', '-' + Math.floor($('#countdown-4.counter div span').height() / 2) + 'px');
    $('#countdown-5.counter div span').css('margin-top', '-' + Math.floor($('#countdown-5.counter div span').height() / 2) + 'px');
    $('#countdown-6.counter div span').css('margin-top', '-' + Math.floor($('#countdown-6.counter div span').height() / 2) + 'px');

    if (wrapperWidth < '100')
    {
        //alert("Counter cannot be smaller than 100px");
    }

    if (wrapperWidth < '250')
    {
        $('#countdown-3.counter div .custom_border').css('top', '0px');
    }
}




	