(self.webpackChunkbarbershop=self.webpackChunkbarbershop||[]).push([[2510],{97004:function(e,a,i){"use strict";var s=i(67294);i(6881);a.Z=function(e){var a=e.adminPanelClassDetailsTitle,i=e.adminPanelClassTaxPriceTitle,t=e.adminPanelClassTaxPriceValue,l=e.totalPrice,n=e.subTotalPrice;return s.createElement("div",{className:"bookingDetails__summary"},s.createElement("h4",{className:"adminPanelClassDetailsTitle"===a?"bookingDetails__subtitle--admin":"bookingDetails__subtitle"},"Summary"),s.createElement("div",{className:"bookingDetails__details-summary"},s.createElement("p",{className:"adminPanelClassTaxPriceTitle"===i?"bookingDetails__tax--admin":"bookingDetails__tax"},"Tax:",s.createElement("span",{className:"adminPanelClassTaxPriceValue"===t?"bookingDetails__tax-price--admin":"bookingDetails__tax-price"},(l-n).toFixed(2),"€")),s.createElement("p",{className:"adminPanelClassTaxPriceTitle"===i?"bookingDetails__price--admin":"bookingDetails__price"},"Total price with tax:",s.createElement("span",{className:"adminPanelClassTaxPriceValue"===t?"bookingDetails__total-price--admin":"bookingDetails__total-price"},Boolean(l)&&l.toFixed(2),"€"))))}},7648:function(e,a,i){"use strict";var s=i(67294);i(91330);a.Z=function(e){var a=e.adminPanelClassDetailsTitle,i=e.adminPanelClassServiceName,t=e.adminPanelClassServicePrice,l=e.adminPanelClassStyleScroll,n=e.services;return s.createElement("div",{className:"bookingDetails__services"},s.createElement("h4",{className:"adminPanelClassDetailsTitle"===a?"bookingDetails__subtitle--admin":"bookingDetails__subtitle"},"Ordered service"),s.createElement("div",{className:l?"bookingDetails__service-wrapper bookingDetails__service-wrapper--style-scroll":"bookingDetails__service-wrapper"},Boolean(n)&&n.map((function(e){return s.createElement("div",{className:"bookingDetails__service",key:e._id},s.createElement("div",{className:"bookingDetails__image"},s.createElement("img",{className:"bookingDetails__img",src:e.imageUrl,alt:"Icon"})),s.createElement("div",{className:"bookingDetails__tax-price-wrapper"},s.createElement("p",{className:"adminPanelClassServiceName"===i?"bookingDetails__service-name--admin":"bookingDetails__service-name"},e.title),s.createElement("p",{className:"adminPanelClassServicePrice"===t?"bookingDetails__service-price--admin":"bookingDetails__service-price"},Boolean(e.price)&&e.price.toFixed(2),"€")))}))))}},92723:function(e,a,i){"use strict";var s=i(67294);i(59176);a.Z=function(e){var a=e.adminPanelClassDetailsTitle,i=e.adminPanelClassPersonDetails,t=e.adminPanelClassPersonText,l=e.email,n=e.date,o=e.hairdresserName,r=e.name,c=e.phone;return s.createElement("div",{className:"bookingDetails__personal-details"},s.createElement("h4",{className:"adminPanelClassDetailsTitle"===a?"bookingDetails__subtitle--admin bookingDetails__subtitle--reduce-margin":"bookingDetails__subtitle bookingDetails__subtitle--reduce-margin"},"Personal details"),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"HairDresser:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},o)),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"Day:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},new Date(n).toLocaleDateString())),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"Time:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},new Date(n).toLocaleTimeString().slice(0,5))),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"Name:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},r)),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"Email:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},Boolean(l)&&l)),s.createElement("p",{className:"adminPanelClassPersonDetails"===i?"bookingDetails__service-title--admin":"bookingDetails__service-title"},"Phone number:",s.createElement("span",{className:"adminPanelClassPersonText"===t?"bookingDetails__service-text--admin":"bookingDetails__service-text"},c)))}},43677:function(e,a,i){"use strict";i(67294);var s=i(76213);a.Z=function(){return{initialValues:{agreePolicy:!1},validationSchema:s.Ry({agreePolicy:s.Xg().oneOf([!0],"Accept Terms & Conditions is required")})}}},6881:function(){},91330:function(){},59176:function(){}}]);