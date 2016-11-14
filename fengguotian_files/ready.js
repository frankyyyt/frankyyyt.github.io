$(document).ready(function() {

    Wix.addEventListener(Wix.Events.SITE_PUBLISHED, function(data) {
        publishSettings();
    });

    if (Wix.Utils.getViewMode() == 'site' || Wix.Utils.getViewMode() == 'preview') {
        getCounter('site');
    } else if (Wix.Utils.getViewMode() == 'editor') {
        getCounter('editor');
    } else if (Wix.Utils.getViewMode() == 'standalone') {
        setTimeout(function() {
            $(".wrapper").removeClass('hidden');
        }, 100);
    }

});