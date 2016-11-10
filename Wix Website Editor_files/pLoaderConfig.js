function getPloaderSantaConfig(serviceTopology, baseVersion, PackagesUtil) {

    var isSemver = RegExp.prototype.test.bind(/^(\d*\.\d*\.\d*)$/);
    var isAddress = RegExp.prototype.test.bind(/^https?:\/\//);
    var isCommitSha = RegExp.prototype.test.bind(/^([a-f]|\d){40}$/);

    function isValidBaseVersion(str) {
        var baseVersionWhiteList = ['http://localhost', 'http://s3.amazonaws.com/integration-tests-statics/'];
        function isInWhiteList(paramValue) {
            return baseVersionWhiteList.some(function(address) {
                return str.indexOf(address) === 0;
            });
        }
        return str
            && (isSemver(str)
            || isCommitSha(str)
            || isInWhiteList(str));
    }

    var packages = ["animations","buttonCommon","clipArt","cloud","components","componentsPreviewLayer","container","containerCommon","core","coreUtils","dataFixer","datePicker","dateUtils","displayer","documentServices","editingRendererPlugins","fonts","fontsPrefetch","footerContainer","galleriesCommon","headerContainer","image","imageClientApi","imageCommon","layout","loggingUtils","matrixGallery","paginatedGridGallery","pinItPinWidget","popupCloseTextButton","previewExtensionsCore","qaAutomation","radioButton","radioGroup","render","santaProps","screenWidthContainer","server","siteButton","siteUtils","skins","testUtils","textCommon","tpa","translationsUtils","tweenEngine","utils","wPhoto","wRichText","widgets","wixCode","wixCodeInit","wixCodeSeo","wixSites","wixUrlParser","wixappsBuilder","wixappsClassics","wixappsCore","zoomedImage"];
    /* global joinURL */
function getViewerRjsConfig (serviceTopology) {
    /* eslint strict:0 */

    //TODO: cancel fallback to staticServerUrl when server is stable
    var scriptsLocation = serviceTopology.scriptsDomainUrl;
    var serviceURL = joinURL.bind(null, scriptsLocation, 'services', 'third-party');

    var getIntegrationPath = function () {
        if (window.santaBase === 'http://localhost/') {
            return 'http://localhost:4578'
        } else {
            return 'http://s3.amazonaws.com/integration-tests-statics/SNAPSHOT/runners'
        }
    };

    return {
        //By default load any module IDs from js/lib
        baseUrl: '/',
        //except, if the module ID starts with "app",
        //load it from the js/app directory. paths
        //config is relative to the baseUrl, and
        //never includes a ".js" extension since
        //the paths config could be for a directory.
        paths: {
            experiment: 'js/plugins/experiment/experiment',
            RemoteModelInterface: 'static/wixcode/static/RMI/rmi-bundle.min',
            lodash: serviceURL('lodash/3.10.1/lodash.min'),
            react: {min: serviceURL('react/0.14.3/react-with-addons.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-with-addons'},
            reactDOM: {min: serviceURL('react/0.14.3/react-dom.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom'},
            reactDOMServer: {min: serviceURL('react/0.14.3/react-dom-server.min'), source: '//cdnjs.cloudflare.com/ajax/libs/react/0.14.3/react-dom-server'},
            zepto: serviceURL('zepto/1.1.3/zepto.min'),
            speakingurl: serviceURL('speakingurl/speakingurl.min'),
            immutable: {min: serviceURL('immutable/3.6.2/immutable.min'), source: serviceURL('immutable/3.6.2/immutable')},
            mousetrap: serviceURL('mousetrap/1.4.6/mousetrap.min'),
            swfobject: serviceURL('swfobject/2.3.20130521/swfobject.min'),
            TweenMax: {min: serviceURL('tweenmax/1.18.2/minified/TweenMax.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/TweenMax')},
            TimelineMax: {min: serviceURL('tweenmax/1.18.2/minified/TweenMax.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/TweenMax')},
            ScrollToPlugin: {min: serviceURL('tweenmax/1.18.2/minified/plugins/ScrollToPlugin.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/plugins/ScrollToPlugin')},
            DrawSVGPlugin: {min: serviceURL('tweenmax/1.18.2/minified/plugins/DrawSVGPlugin.min'), source: serviceURL('tweenmax/1.18.2/uncompressed/plugins/DrawSVGPlugin')},
            color: serviceURL('color-convert/0.2.0/color.min'),
            hammer: serviceURL('hammerjs/2.0.8/hammer.min'),
            jasmine: serviceURL('jasmine/2.1.3/jasmine'),
            'jasmine-html': serviceURL('jasmine/2.1.3/jasmine-html'),
            'jasmine-boot': serviceURL('jasmine/2.1.3/jasmine-boot'),
            bluebird: {min: serviceURL('bluebird/2.9.4/bluebird.min'), source: serviceURL('bluebird/2.9.4/bluebird')},
            SoundManager: serviceURL('soundmanager2/V2.97a.20150601/soundmanager2-nodebug-jsmin'),
            'date-fns': {min: serviceURL('date-fns/v1.3.0/date_fns.min'), source: serviceURL('date-fns/v1.3.0/date_fns')},
            ajv: serviceURL('ajv/3.4.0/ajv.min'),
            ReactProxy: 'js/vendor/ReactProxy',
            Squire: 'js/vendor/squire/Squire',
            io: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.0/socket.io.min',
            hot: './node_modules/santa-utils/common/hot/listener',
            patcher: './node_modules/santa-utils/common/hot/patcher',
            fake: 'js/plugins/fake/src/main/fake',
            definition: 'js/plugins/definition/src/main/definition',
            jsonpatch: 'js/vendor/json-patch/json-patch.umd',
            xss: {min: serviceURL('xss/0.2.12/xss.min'), source: serviceURL('xss/0.2.12/xss')},
            immutableDiff: 'js/vendor/immutablejsdiff.min',
            pmrpc: '//static.parastorage.com/services/pm-rpc/1.24.0/lib/pm-rpc.min',
            'ag-grid': {min: 'js/vendor/ag-grid/ag-grid.min', source: 'js/vendor/ag-grid/ag-grid'}
        },
        // generated
        packages: [{
            name: 'tpaIntegration',
            main: 'tpaIntegration',
            location: getIntegrationPath() + '/tpaIntegration/src/main'
        },
        {
            name: 'wixCodeIntegration',
            main: 'wixCodeIntegration',
            location: getIntegrationPath() + '/wixCodeIntegration/src/main'
        }],
        bundles: null,
        shim: {
            zepto: {exports: '$'},
            color: {exports: 'Color'},
            'jasmine-html': {
                deps: ['jasmine']
            },
            'jasmine-boot': {
                deps: ['jasmine', 'jasmine-html']
            },
            bluebird: {exports: 'bluebird'},
            SoundManager: {exports: 'soundManager'},
            ReactProxy: {
                deps: ['react'],
                exports: 'ReactProxy'
            },
            jsonpatch: {exports: 'jsonpatch'},
            xss: {exports: 'filterXSS'}
        },
        waitSeconds: 0
    };
}


    if (!isValidBaseVersion(baseVersion)) {
        baseVersion = serviceTopology.scriptsLocationMap.santa || location.origin;
    }
    var config = getViewerRjsConfig(serviceTopology);

    config.injects = {
        //react: 'react',
        lodash: 'lodash'
    };
    var packagesUtil = new PackagesUtil(packages, window.location.search);
    config = packagesUtil.buildConfig(config);
    var scriptsLocation = serviceTopology.scriptsDomainUrl;
    config.baseUrl = isAddress(baseVersion) ?  baseVersion : joinURL(scriptsLocation, 'services', 'santa', baseVersion);
    config.versions = {};
    return config;
}
