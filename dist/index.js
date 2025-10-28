/**
* react-lite-youtube-embed v2.5.5
*  git+https://github.com/ibrahimcesar/react-lite-youtube-embed.git
*
*  Copyright (c) Ibrahim Cesar < email@ibrahimcesar.com > and project contributors.
*
*  This source code is licensed under the MIT license found in the
*  LICENSE file in the root directory of this source tree.
*
*  Author site: https://ibrahimcesar.cloud
*/
    'use strict';

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var expectedWidths = {
    default: 120,
    mqdefault: 320,
    hqdefault: 480,
    sddefault: 640,
    maxresdefault: 1280,
};
var useYoutubeThumbnail = function (videoId, vi, format, imageRes) {
    if (imageRes === void 0) { imageRes = "maxresdefault"; }
    var _a = React.useState(""), url = _a[0], setUrl = _a[1];
    React.useEffect(function () {
        var testUrl = "https://img.youtube.com/".concat(vi, "/").concat(videoId, "/").concat(imageRes, ".").concat(format);
        var fallbackUrl = "https://img.youtube.com/".concat(vi, "/").concat(videoId, "/hqdefault.").concat(format);
        var expectedWidth = expectedWidths[imageRes];
        var img = new Image();
        img.onload = function () {
            if (img.width < expectedWidth) {
                setUrl(fallbackUrl);
            }
            else {
                setUrl(testUrl);
            }
        };
        img.onerror = function () { return setUrl(fallbackUrl); };
        img.src = testUrl;
    }, [videoId]);
    return url;
};

function LiteYouTubeEmbedComponent(props, ref) {
    var _a = React__namespace.useState(false), preconnected = _a[0], setPreconnected = _a[1];
    var _b = React__namespace.useState(props.alwaysLoadIframe || false), iframe = _b[0], setIframe = _b[1];
    var videoId = encodeURIComponent(props.id);
    var videoPlaylistCoverId = typeof props.playlistCoverId === "string"
        ? encodeURIComponent(props.playlistCoverId)
        : null;
    var videoTitle = props.title;
    var posterImp = props.poster || "hqdefault";
    var announceWatch = props.announce || "Watch";
    var shouldAddAutoplayParam = props.alwaysLoadIframe
        ? props.autoplay && props.muted
        : true; // When the iframe is not loaded immediately, the video should play as soon as its loaded (which happens when the button is clicked)
    // Iframe Parameters
    var iframeParams = new URLSearchParams(__assign(__assign(__assign(__assign({}, (props.muted ? { mute: "1" } : {})), (shouldAddAutoplayParam ? { autoplay: "1" } : {})), (props.enableJsApi ? { enablejsapi: "1" } : {})), (props.playlist ? { list: videoId } : {})));
    // parse props.params into individual search parameters and append them to iframeParams
    if (props.params) {
        var additionalParams = new URLSearchParams(props.params.startsWith("&") ? props.params.slice(1) : props.params);
        additionalParams.forEach(function (value, key) {
            iframeParams.append(key, value);
        });
    }
    var ytUrl = props.noCookie
        ? "https://www.youtube-nocookie.com"
        : "https://www.youtube.com";
    ytUrl = props.cookie
        ? "https://www.youtube.com"
        : "https://www.youtube-nocookie.com";
    var iframeSrc = !props.playlist
        ? "".concat(ytUrl, "/embed/").concat(videoId, "?").concat(iframeParams.toString())
        : "".concat(ytUrl, "/embed/videoseries?").concat(iframeParams.toString());
    var useDynamicThumbnail = !props.thumbnail && !props.playlist && posterImp === "maxresdefault";
    var format = props.webp ? "webp" : "jpg";
    var vi = props.webp ? "vi_webp" : "vi";
    var dynamicThumbnailUrl = useDynamicThumbnail
        ? useYoutubeThumbnail(props.id, vi, format, posterImp)
        : null;
    var posterUrl = props.thumbnail ||
        dynamicThumbnailUrl ||
        "https://i.ytimg.com/".concat(vi, "/").concat(props.playlist ? videoPlaylistCoverId : videoId, "/").concat(posterImp, ".").concat(format);
    var activatedClassImp = props.activatedClass || "lyt-activated";
    var adNetworkImp = props.adNetwork || false;
    var aspectHeight = props.aspectHeight || 9;
    var aspectWidth = props.aspectWidth || 16;
    var iframeClassImp = props.iframeClass || "";
    var playerClassImp = props.playerClass || "lty-playbtn";
    var wrapperClassImp = props.wrapperClass || "yt-lite";
    var onIframeAdded = props.onIframeAdded || function () { };
    var rel = props.rel ? "prefetch" : "preload";
    var ContainerElement = props.containerElement || "article";
    var style = props.style || {};
    var warmConnections = function () {
        if (preconnected)
            return;
        setPreconnected(true);
    };
    var addIframe = function () {
        if (iframe)
            return;
        setIframe(true);
    };
    React__namespace.useEffect(function () {
        if (iframe) {
            onIframeAdded();
        }
    }, [iframe]);
    return (React__namespace.createElement(React__namespace.Fragment, null,
        React__namespace.createElement("link", { rel: rel, href: posterUrl, as: "image" }),
        React__namespace.createElement(React__namespace.Fragment, null, preconnected && (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("link", { rel: "preconnect", href: ytUrl }),
            React__namespace.createElement("link", { rel: "preconnect", href: "https://www.google.com" }),
            adNetworkImp && (React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement("link", { rel: "preconnect", href: "https://static.doubleclick.net" }),
                React__namespace.createElement("link", { rel: "preconnect", href: "https://googleads.g.doubleclick.net" })))))),
        React__namespace.createElement(ContainerElement, { onPointerOver: warmConnections, onClick: addIframe, className: "".concat(wrapperClassImp, " ").concat(iframe ? activatedClassImp : ""), "data-title": videoTitle, style: __assign(__assign({ backgroundImage: "url(".concat(posterUrl, ")") }, {
                "--aspect-ratio": "".concat((aspectHeight / aspectWidth) * 100, "%"),
            }), style) },
            React__namespace.createElement("button", { type: "button", className: playerClassImp, "aria-label": "".concat(announceWatch, " ").concat(videoTitle) }),
            iframe && (React__namespace.createElement("iframe", { ref: ref, className: iframeClassImp, title: videoTitle, referrerPolicy: "strict-origin-when-cross-origin", width: "560", height: "315", frameBorder: "0", allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, src: iframeSrc })))));
}
var index = React__namespace.forwardRef(LiteYouTubeEmbedComponent);

module.exports = index;
//# sourceMappingURL=index.js.map
