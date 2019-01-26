"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_native_1 = require("react-native");
// @ts-ignore
var calamari_1 = require("calamari");
function createCalamari(block, elements, styleSrc) {
    return calamari_1.default(block, elements, getNativeNodeCreater(styleSrc));
}
exports.default = createCalamari;
function getNativeNodeCreater(styleSrc) {
    return function (params) { return createNativeNode(params, createStyleApplyer(styleSrc)); };
}
function createNativeNode(_a, styleApplyer) {
    var component = _a.component, rest = __rest(_a, ["component"]);
    return calamari_1.createNode(__assign({}, rest, { component: component || react_native_1.View }), styleApplyer);
}
function createStyleApplyer(styleSrc) {
    var styleApplyer = function (classNameData) { return ({
        style: calamari_1.createClassName(classNameData)
            .split(' ')
            .reduce(function (resultStyle, classNamePart) {
            return resultStyle.concat(styleSrc[classNamePart]);
        }, getInitialStyle(classNameData.style)),
    }); };
    return styleApplyer;
}
;
function getInitialStyle(style) {
    switch (true) {
        case Array.isArray(style):
            return style;
        case typeof style === 'number':
        case typeof style === 'object':
            return [style];
        case typeof style === 'undefined':
            return [];
        default:
            throw new Error('Wrong style type ' + typeof style);
    }
}
