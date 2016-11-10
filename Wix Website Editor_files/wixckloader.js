(function (factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else {
        window.WIXCKEDITOR = factory();
    }
}(function () {
    var done;

    function init(doneCallback) {
        done = doneCallback;
        initializeCk();
    }

    function getBasePath() {
        var SCRIPT_FILE_NAME = 'wixckloader.js';
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            var script = scripts[i];
            if (script.src && script.src.indexOf(SCRIPT_FILE_NAME) !== -1) {
                return script.src.split(SCRIPT_FILE_NAME)[0];
            }
        }
    }

    function initializeWixCk() {
        CKEDITOR.disableAutoInline = true;
        if (CKEDITOR.status === 'loaded') {
            CKEDITOR.WIX = {
                WIX_CSS: {
                    TYPES: {
                        CSS: 'CSS',
                        LINK: 'LINK'
                    }
                }
            };
            insertScript('wixck.min.js', callDone);

        } else {
            setTimeout(initializeWixCk, 50);
        }
    }

    function callDone() {
        if (CKEDITOR.WIX.status === 'ready') {
            if (done) {
                done();
                done = null;//avoid memory leak
            }
        } else {
            setTimeout(callDone, 50);
        }


    }

    function insertScript(fileName, onLoad) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = function () {
            onLoad();
            script.onload = null;//avoid memory leak
        };
        script.src = getBasePath() + fileName;
        document.body.appendChild(script);
    }

    function initializeCk() {
        if (document.body && ( !document.readyState || document.readyState == 'complete' )) {
            insertScript('ckeditor/ckeditor.js', initializeWixCk);
        } else {
            setTimeout(initializeCk, 150);
        }
    }

    return {
        init: init
    };
}));
