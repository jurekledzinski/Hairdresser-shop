(self.webpackChunkbarbershop=self.webpackChunkbarbershop||[]).push([[3816],{77449:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return _}});var r=t(63038),n=t.n(r),o=t(67294),s=t(84751),u=t(79521),l=(t(17547),t(16550)),c=t(15616),i=t.n(c),d=function(e,a,t,r){var n=(0,s.v9)((function(e){return e.bookedOrdersData})),u=(0,l.k6)();return{columns:(0,o.useMemo)((function(){return[{Header:"Name Surname",accessor:"name"},{Header:"Date booking",accessor:"date",Cell:function(e){var a=e.value;return i()(new Date(a),"dd/MM/yyyy")}},{Header:"Time booking",accessor:"bookTime",Cell:function(e){var a=e.value;return i()(new Date(a),"HH:mm")}},{Header:"Hairdresser",accessor:"hairdresserName"},{Header:"Details",disableSortBy:!0,id:"details",accessor:function(e){return"details"},Cell:function(e){return o.createElement("button",{className:"admin-booked__btn-remove",onClick:function(){u.push("/admin/details-booked-order/".concat(e.row.original._id))}},"Details")}},{Header:"Remove",disableSortBy:!0,id:"remove",accessor:function(e){return"remove"},Cell:function(n){return o.createElement("button",{className:"admin-booked__btn-remove",onClick:function(){r(!0),a(n.row.original._id),t(n.row.original.cancelCode),e(n.row.original.bookingId)}},o.createElement("i",{className:"fas fa-trash-alt"}))}}]}),[n]),data:(0,o.useMemo)((function(){return n}),[n])}},m=t(76961),b=t(73637),p=t(21696),f=t(73680),v=t(16431),g=t(22584),k=t(87757),h=t.n(k),P=t(48926),w=t.n(P),x=t(73406),y=t(65467),C=t(89511),D=t(55948),E=t(6212),I=t(83574),N=t(44056),S=t(45241),H=t(90879),T=function(e,a,t,r){var n=(0,s.I0)();return{handleRemoveItem:function(){var o=w()(h().mark((function o(){var s,u,l,c,i,d;return h().wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,(0,y.XP)(a);case 2:return s=o.sent,u=s.data,l=s.status,o.next=7,(0,y._o)(t);case 7:if(200!==l){o.next=27;break}c=new Date(u.result.dataPayed).getMonth(),i=u.result.bookingWhere,d=u.result.totalPrice,o.t0=i,o.next="Shop"===o.t0?14:"Website"===o.t0?17:19;break;case 14:return n((0,E.Wc)(c)),n((0,N.a$)(c,d)),o.abrupt("break",20);case 17:n((0,I.Cj)(c)),n((0,S.YI)(c,d));case 19:return o.abrupt("break",20);case 20:n((0,x.Ob)(u.success,"removeAtTableAdmin")),n((0,D.Ac)(a)),n((0,C.VJ)(e)),n((0,H.nq)()),r(!1),o.next=28;break;case 27:n((0,x.PA)(u.alert,"removeAtTableAdmin"));case 28:case"end":return o.stop()}}),o)})));return function(){return o.apply(this,arguments)}}()}},_=function(){(0,s.I0)();var e=(0,s.v9)((function(e){return e.useAdminData})),a=(0,s.v9)((function(e){return e.bookedOrdersData})),t=(0,s.v9)((function(e){return e.alertData})),r=(0,o.useState)(null),l=n()(r,2),c=l[0],i=l[1],k=(0,o.useState)(null),h=n()(k,2),P=h[0],w=h[1],x=(0,o.useState)(null),y=n()(x,2),C=y[0],D=y[1],E=(0,o.useState)(!1),I=n()(E,2),N=I[0],S=I[1],H=d(i,w,D,S),_=H.columns,A=H.data,M=T(c,P,C,S).handleRemoveItem;(0,g.Z)();var R=(0,u.useTable)({columns:_,data:A},u.useGlobalFilter,u.useSortBy,u.usePagination),B=R.getTableProps,O=R.getTableBodyProps,Z=R.headerGroups,F=R.page,G=R.nextPage,W=R.previousPage,j=R.canNextPage,q=R.canPreviousPage,J=R.pageOptions,V=R.prepareRow,X=R.state,Y=R.setGlobalFilter,$=X.globalFilter,z=X.pageIndex;return o.createElement("article",{className:"admin-booked"},(t.errorServerMsg,o.createElement(v.Z,null)),o.createElement("div",{className:"admin-booked__wrapper"},o.createElement(b.Z,{data:a,filter:$,setFilter:Y}),o.createElement(p.Z,{getTableProps:B,getTableBodyProps:O,headerGroups:Z,page:F,prepareRow:V}),o.createElement(m.Z,{canNextPage:j,canPreviousPage:q,nextPage:G,pageIndex:z,pageOptions:J,previousPage:W}),o.createElement(f.Z,{enableAction:e.enableBook,isOpenModal:N,handleRemoveItem:M,handleNotRemoveItem:function(){S(!1)},purpose:"order"})))}},17547:function(){}}]);