var previousUrl = null;
var currentUrl = null;
// The forbiddenWixIds array contains the wixIds of free websites that make too many worker requests.
// If a request is related to one of the array's elements, it will be ingored.
forbiddenWixIds = ["cc73b3b7-294a-4a4c-ae36-034e7c9c34cc",
  "d0c7757d-5cc6-40ee-a813-1cafc5e905ff",
  "6eaee44b-c4b0-4098-b4cc-4068ff25fc09",
  "5b909e76-520a-4951-ad2e-ac6c67a6ccd5",
  "3abe3829-e952-47ad-b045-c23a7957fe65",
  "0b779ae1-c4f6-4651-9f31-e8110ac95c91",
  "5ffa3383-a5aa-4ddf-a192-157e8d9ade76",
  "bfbf8aad-dfa7-4bff-bb87-d2139ca01b1b",
  "8c5c15b0-e85e-4c2c-821a-3e2756f917c0",
  "68fe48ae-c69a-4530-a04e-a7ae5413d8af",
  "4bc03921-8bda-4def-8d8f-51480b42a445",
  "d417033b-c5b1-48d5-9312-3c31b7a49113",
  "3cb17528-e1e7-4e88-a3c9-b79eef3e5ddb",
  "cd6709ed-32e4-42de-9048-fcc9678bddd0",
  "267f8d8f-4cfc-4be4-a816-2943c6873b9b",
  "431d5c60-cb95-4c34-9195-946a5dcb750e",
  "87095c04-a916-4cc1-aba9-cb63668cc044",
  "ef760717-a8f9-466e-a8c5-f14018401312",
  "b9072eb2-8010-44a1-94b9-829be95fff28",
  "1c54a08e-5b4d-430f-a07d-596c90c68e56",
  "ada5b52d-e43c-4133-b92a-62990e42eb70",
  "4cf1e638-307d-45b9-bc7b-bc7c1e14086c",
  "cafe559a-c043-4a39-affb-6d7d98f6ae67",
  "f5ff1133-00da-46ca-a622-beaa6bf2578e",
  "825d4d49-caa0-4866-8457-7303982473f0",
  "5e8368b8-bfbf-4bc4-b6d1-3f92a4470a2b",
  "b7012ea0-9a73-4524-8de0-0a28475d3007",
  "cdb52099-b9aa-4a97-8cfe-6e197145562a",
  "1babcde3-fb0c-496f-821a-38816b41acbf",
  "c77c7595-b3d7-4c8f-af4c-b744d16e14ab",
  "d0eec0bb-7db1-43de-a0e2-fd195b2114e2",
  "b161ac86-df8c-402c-aa0c-4d87ea1a75d5",
  "3ada7b34-c61e-4e0e-95f5-d30711241a0b",
  "3f7fc48e-e8aa-48a6-9d2c-ba3ff71f81c3",
  "2458cd87-beef-4cd6-9964-776a8c783f26",
  "880af388-ef47-4e11-b113-c29ec8ac2192",
  "1e90c2d1-5344-4a11-8010-24b67dde1454",
  "3cd5d0e2-e0b8-4524-bb80-631370e93c6c",
  "a5f209cb-9ee7-48ce-91ff-171a833530ae",
  "fafcabb6-4222-4f93-82fb-066035112188",
  "e234639b-d5b6-4e9f-8ce4-43b56283b7a4",
  "872a8b26-8172-493d-93ca-eaac98fad873",
  "0f33984d-85c0-4ec4-aa1f-f8d18b776135",
  "3ee5d716-680f-46cb-8f56-adad6dcca3b2",
  "b58e4c78-d779-4e79-b891-c67aef61f288",
  "0ef954f0-384d-41d4-a692-a39ac9511e49",
  "86a6fc10-1e50-4f89-b374-56cd2ee4d82f",
  "1ac43014-cf99-4035-92e8-1cd2fdb0baad",
  "f1383f33-5556-484e-be29-d6acf9479f9b",
  "48d2ede5-8ce2-4346-a068-371f25e4b7a6",
  "be733f12-69f0-4f99-8987-bb0e19e84494",
  "79874929-de2c-4bc6-a4cf-3157ea2f103c",
  "dfbff72b-9782-4bad-8666-9a9ecd5dc0cf",
  "702fd7fd-8cef-49a1-bb13-f877e5c3cc90",
  "0b64117e-2274-4ae4-83b3-88137b111798",
  "30147242-8e27-483a-bd47-4784560b46c5",
  "ba0df5e4-9392-4bb2-81b6-7369f8adc6e4",
  "1808b258-d9db-4ec2-918f-d90fad2c151c",
  "80989c61-e7d5-45a7-a21d-88e58af8ce90",
  "6cf51d14-efbc-48b0-bd0a-657a26bdcaaf",
  "888bc6dc-5c96-4c69-850a-9596c7919714",
  "ae873130-d0fc-484e-a384-de90193fcef5",
  "b2af1afb-5c97-4f6b-9939-99962dde81e3",
  "f478ce29-e0fe-40e4-a0cd-4be5cd0a3f16",
  "96bf6424-eb69-4e5c-8689-8cfd9a0c9f84",
  "ddeaaa14-d9d8-4fd7-a552-5ee13d35ebcb",
  "e55f649b-5aed-42e0-adab-00a03e4d95c8",
  "b481acac-9c58-4ce5-a0ae-96938b958609",
  "7aa74f7c-e10b-483b-a5f8-708c3993745a",
  "6ddd411b-080b-45b1-b218-c595523b75f0",
  "364f2cc8-7016-4ec2-a2ec-9f5b9d70f988",
  "017c5dd6-6371-429b-ab26-2bd2b209ebb4",
  "c51c7795-653f-415c-bd83-e6e21edc9c9f",
  "fd16c9ed-6d1d-48cc-8f15-5e818d47086b",
  "31bfb3be-fcac-480e-87c2-054907489187",
  "427ac5fb-0cc4-41c3-abb5-ddf2497f7d5c",
  "fd9e519f-b3e2-4237-b815-41fb45811840",
  "045731fd-fd09-4fb7-99a1-944ac5468365",
  "0e3d884b-bf94-4a58-a2c5-59fd11a15a43",
  "a1738c91-63a3-42f6-9152-4c22d45a1fcd",
  "db2d0ebc-ded6-4c16-8bf3-58dc6c37554c",
  "ccb67183-2ae3-4382-9e4c-0d29cf5983f8",
  "9ad0edc2-3d5c-4d41-9188-1ecc0c35d00f",
  "f7fe74c4-cdcb-4581-8f8f-7bab8f23c73b",
  "15c9aa8e-09b9-4eb2-bbd3-c9ecd33b2ef4",
  "ee7e38ee-bc0d-44bd-b03f-44ecb463f3fb",
  "1c6b8774-a98e-487f-a0ad-f4a4a949075c",
  "232f0bf9-f031-4e81-9fac-d6d46d429f83",
  "8e028609-d331-47f1-abe4-305478edba75"];

function setCookie(cname, cvalue, exdays) 
{
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) 
{
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
  }
  return "";
}

function discardCurrentVisit(href)
{
  return href.indexOf("editor.wix.com") != -1;
}

// Check if the wixId of the current request is among forbiddenWixIds, and discard visit if that is the case.
// The request won't be discarded in the case of a premium website, even if its wixId is among forbiddenWixIds.
function discardVisitFromForbiddenWebsite()
{
  var instance = jQuery("#instance").val();
  var instanceComponents = instance.split(".");

  if (instanceComponents.length > 1) {
    var wixInfoJSON = window.atob(instanceComponents[1]);
    if (typeof wixInfoJSON !== 'undefined') {
      var wixInfo = JSON.parse(wixInfoJSON);
      var currentWixId = wixInfo.instanceId;
      var isPremiumRequest = wixInfo.vendorProductId == "lmozwcvuly" ? true : false;
      if (isPremiumRequest) {
        return false;
      }
      if (forbiddenWixIds.indexOf(currentWixId) != -1) {
        return true;
      }
    }
  }
  return false;
}

function ignoreCurrentVisit()
{
  // User chose not to track his own visits.
  var cookieName = 'wix_ignoreVisits_' + document.getElementById("websiteMD5").value;

  return getCookie(cookieName) !== '' ? true : false; 
}

$(document).ready(function() {
  // Try setting testcookie - if it can be set, we will use cookie tracking.
  setCookie('testcookie', 'testcookie', 730);

  if (Wix.Worker) {	
  Wix.Worker.getSitePages(function(pages) {
    Wix.Worker.getSiteInfo(function(siteInfo) {     
      currentUrl = trimUrlComponents(siteInfo.url, 150);
      
      if (discardCurrentVisit(currentUrl) || discardVisitFromForbiddenWebsite() || ignoreCurrentVisit())
      {
       return;
      }

      $.ajax({
        type: "POST",
        url: jQuery("#worker_ajax_call").val(),
        data: {
          "instance": jQuery("#instance").val(),
          "pages": JSON.stringify(trimWixId(pages, 150)),
          "url": currentUrl,
          "pageTitle": trimDataElement(siteInfo.pageTitle, 150),
          "screenWidth": screen.width,
          "screenHeight": screen.height,
          "referer": siteInfo.referer
        }
      }).done(function(response) {
        if (response != "") {
          var data = JSON.parse(response);
          // Set tracking cookies.
          for (var i = 0; i < data.length; i++) {
            setCookie(data[i]['cookieName'], data[i]['cookieValue'], data[i]['cookieDaysUntilExpiration']);
          }
        }
      });
    });
  });
    
  Wix.Worker.addEventListener(Wix.Events.PAGE_NAVIGATION, function(flow) {
    previousUrl = currentUrl;
    Wix.Worker.getSiteInfo(function(siteInfo) {  
      currentUrl = trimUrlComponents(siteInfo.url, 150);
      if (discardCurrentVisit(currentUrl) || discardVisitFromForbiddenWebsite() || ignoreCurrentVisit())
      {
       return;
      }

      $.ajax({
        type: "POST",
        url: jQuery("#worker_ajax_call").val(),
        data: {
          "instance": jQuery("#instance").val(),
          "currentPageId": trimDataElement(flow.toPage, 150),
          "previousPageId": trimDataElement(flow.fromPage, 150),
          "url": currentUrl,
          "previousUrl": previousUrl,
          "pageTitle": trimDataElement(siteInfo.pageTitle, 150),
          "screenWidth": screen.width,
          "screenHeight": screen.height,          
          "referer": siteInfo.referer
        }
      }).done(function(response) {
        if (response != "") {
          var data = JSON.parse(response);
          // Set tracking cookies.
          for (var i = 0; i < data.length; i++) {
            setCookie(data[i]['cookieName'], data[i]['cookieValue'], data[i]['cookieDaysUntilExpiration']);
          }
        }
      });
    });
  });
  }

  if ($("#demo").val() == "true")
  {
    $.ajax({
    type: "POST",
    url: jQuery("#worker_ajax_call").val(),
    data: {
      "instance": jQuery("#rawInstance").val(),
      "screenWidth": screen.width,
      "screenHeight": screen.height,
      "demo": true
    }
    }).done(function(response) {
      initDemo();
    });
  }
});

//$.ajax({
//  type: "POST",
//  url: jQuery("#worker_ajax_call").val(),
//  data: {
//    "instance": jQuery("#instance").val(),
//    "deviceType": jQuery("#deviceType").val(),
//    "screenWidth": window.screen.width,
//    "screenHeight": window.screen.height
//  }
//}).done(function(response) {
//});

//Parameter "pages" is a JSON object.
function trimWixId(pages, charLimit)
{
  for (var i=0; i<pages.length; i++)
  {
    if (typeof pages[i].subPages !== 'undefined')
    {
      for (var j=0; j<pages[i].subPages.length; j++)
      {
        if (typeof pages[i].subPages[j].id == 'undefined')
        {
          continue;
        }
        pages[i].subPages[j].id = pages[i].subPages[j].id.slice(0, charLimit);
      }
    }
    if (typeof pages[i].id == 'undefined')
    {
      continue;
    }
    pages[i].id = pages[i].id.slice(0, charLimit);
  }

  return pages;
}

function trimUrlComponents(url, charLimit)
{
  var addressComponent = "";
  var wixIdComponent = "";
  var blogpostIdComponent = "";

  var urlComponents = url.split("#!");
  if (urlComponents.length > 1)
  {
    var routeComponents = urlComponents[1].split("/");

    if (typeof routeComponents[0] !== 'undefined') {
      addressComponent = "#!" + routeComponents[0];
    }

    if (typeof routeComponents[1] !== 'undefined') {
      wixIdComponent = "/" + routeComponents[1].slice(0, charLimit);
    }

    if (routeComponents.length > 2) {
      blogpostIdComponent = "/" + routeComponents[routeComponents.length - 1].slice(0, charLimit);
    }
  }
  url = urlComponents[0].concat(addressComponent, wixIdComponent, blogpostIdComponent);

  return url;
}

function trimDataElement(dataElement, charLimit)
{
  if (typeof dataElement !== 'undefined')
  {
    if (dataElement.length > charLimit)
    {
      dataElement = dataElement.slice(0, charLimit);
    }
  }

  return dataElement;
}