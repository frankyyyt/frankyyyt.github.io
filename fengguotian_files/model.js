function publishSettings() {
    var widgetId = Wix.Utils.getInstanceId() + '--' + Wix.Utils.getCompId();
    $.get($('base').attr('href') + 'en/settings/publish/?id=' + widgetId + "&compid=" + Wix.Utils.getCompId() + '&instance='+instance, function(data) {
        // callback
    }).fail(function(jqXHR, textStatus) {
    });
}