export async function onRequest(context) {

```
const url = new URL(context.request.url);

// iOS Universal Links
if (url.pathname === "/.well-known/apple-app-site-association") {

    return Response.json({
        applinks: {
            details: [{
                appIDs: [
                    "ABCDE12345.com.example.app"
                ],
                components: [{
                    "/": "/*"
                }]
            }]
        }
    });

}

// Android App Links
if (url.pathname === "/.well-known/assetlinks.json") {

    return Response.json([
        {
            relation: [
                "delegate_permission/common.handle_all_urls"
            ],
            target: {
                namespace: "android_app",
                package_name: "com.example.app",
                sha256_cert_fingerprints: [
                    "11:22:33:44"
                ]
            }
        }
    ]);

}

// 首頁
return new Response(`
```

<!DOCTYPE html>

<html>
<head>
<meta charset="utf-8">
<title>開啟 APP</title>

<script>

const iosStore =
"https://apps.apple.com/tw/app/家樂福-carrefour-tw/id1142519034";

const androidStore =
"https://play.google.com/store/apps/details?id=com.carrefour.carrefourapp";

const appScheme =
"carrefour://";

window.location = appScheme;

setTimeout(function(){

    var ua = navigator.userAgent;

    if(/iPhone|iPad|iPod/i.test(ua))
        location.href = iosStore;

    else if(/Android/i.test(ua))
        location.href = androidStore;

},1500);

</script>

</head>

<body>

<h2>正在開啟 APP...</h2>

</body>

</html>
`,
{
headers:{
"content-type":"text/html;charset=UTF-8"
}
});

}
