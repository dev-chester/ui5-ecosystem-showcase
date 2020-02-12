exports.config = {
    /* no profile: "integration" in order to turn the screenshotting off :) */
    /* instead, copy'pasted https://github.com/SAP/ui5-uiveri5/blob/master/conf/integration.profile.conf.js */

    specResolver: "./resolver/localSpecResolver",
    pageLoading: {
        /* used to overcome issues due to pending async work that was started before the waitForUI5 was injected */
        wait: "3000"
    },
    takeScreenshot: {
        onExpectFailure: false,
        onExpectSuccess: false,
        onAction: false
    },
    reporters: [ /* none! */],

    // continue w/ standard config
    // attention: bootstrapping via local UI5 npm module causes UIveri5 to detect a wrong version number 
    // baseUrl: "http://localhost:4081/index.html" -> reports UI5 0.1.5 :)
    baseUrl: "http://localhost:4081/index-cdn.html" // bootstrapping from CDN works
}
