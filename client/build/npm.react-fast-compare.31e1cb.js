(self.webpackChunkbarbershop=self.webpackChunkbarbershop||[]).push([[4513],{69590:function(e){"use strict";var r=Array.isArray,t=Object.keys,n=Object.prototype.hasOwnProperty,f="undefined"!=typeof Element;function a(e,i){if(e===i)return!0;if(e&&i&&"object"==typeof e&&"object"==typeof i){var o,s,c,u=r(e),p=r(i);if(u&&p){if((s=e.length)!=i.length)return!1;for(o=s;0!=o--;)if(!a(e[o],i[o]))return!1;return!0}if(u!=p)return!1;var g=e instanceof Date,h=i instanceof Date;if(g!=h)return!1;if(g&&h)return e.getTime()==i.getTime();var l=e instanceof RegExp,m=i instanceof RegExp;if(l!=m)return!1;if(l&&m)return e.toString()==i.toString();var b=t(e);if((s=b.length)!==t(i).length)return!1;for(o=s;0!=o--;)if(!n.call(i,b[o]))return!1;if(f&&e instanceof Element&&i instanceof Element)return e===i;for(o=s;0!=o--;)if(!("_owner"===(c=b[o])&&e.$$typeof||a(e[c],i[c])))return!1;return!0}return e!=e&&i!=i}e.exports=function(e,r){try{return a(e,r)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}}}}]);