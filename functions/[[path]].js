export async function onRequest(context) {

    const url = new URL(context.request.url);

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
                        "11:22:33"
                    ]
                }
            }
        ]);

    }

    return new Response(`
<html>
<head>

<script>

window.location="carrefour://";

setTimeout(function(){

var ua=navigator.userAgent;

if(/iPhone|iPad|iPod/i.test(ua))
{
location.href="https://apps.apple.com/tw/app/家樂福-carrefour-tw/id1142519034";
}
else if(/Android/i.test(ua))
{
location.href="https://play.google.com/store/apps/details?id=com.carrefour.carrefourapp";
}

},1500);

</script>

</head>

<body>

<h2>正在開啟家樂福 APP...</h2>

</body>

</html>
`,{
headers:{
"content-type":"text/html;charset=UTF-8"
}
});

}
