webpackJsonp([0],{"58J7":function(t,n){},EepQ:function(t,n){},FOlu:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("7+uW"),o={props:{value:{type:[Number,String],default:""},unit:{type:String,default:""}},computed:{formatVal:function(){return console.warn("value changed by user..: "+this.value),"%"===this.unit?(100*this.value).toFixed(2):this.value.toLocaleString()}},methods:{onChange:function(t){console.warn("target.value: "+t.target.value);var n=t.target.value.replace(/,/g,""),e="%"===this.unit?parseFloat(n)/100:parseFloat(n);console.warn("submit newVal : "+e),this.$emit("input",e)}}},r={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"a-input__wrapper"},[t._t("default"),t._v(" "),e("input",{attrs:{type:"text"},domProps:{value:t.formatVal},on:{change:function(n){t.onChange(n)},keyup:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13,n.key,"Enter"))return null;t.$emit("change")}}}),e("span",[t._v(t._s(t.unit))])],2)},staticRenderFns:[]};var l={render:function(){var t=this,n=t.$createElement;return(t._self._c||n)("a",{staticClass:"a-button",attrs:{href:"#"},on:{click:function(n){t.$emit("click")}}},[t._t("default")],2)},staticRenderFns:[]};var s={components:{BaseInput:e("VU/8")(o,r,!1,function(t){e("FOlu")},"data-v-0e6d9869",null).exports,BaseButton:e("VU/8")({},l,!1,function(t){e("EepQ")},null,null).exports},props:{title:{type:String,default:""}},data:function(){return{totalLoan:8e4,totalMonth:36,yearRate:.033,expected_YearEarn:.1,totalEarning:0,cashLeft:this.$props.totalLoan}},mounted:function(){this.calc()},computed:{monthlyPay:function(){return this.totalLoan/this.totalMonth+this.totalLoan*(this.yearRate/12)},totalPay:function(){return this.totalLoan*(this.yearRate*this.totalMonth/12)}},methods:{calc:function(){this.cashLeft=this.totalLoan,this.totalEarning=0;for(var t=0;t<this.totalMonth;t++){this.cashLeft-=this.monthlyPay;var n=(this.cashLeft+this.totalEarning)*this.expected_YearEarn/12;this.totalEarning+=n}return console.warn("calculate loan and invest done"),this.totalEarning}}},i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"calc__container"},[e("h4",[t._v(t._s(t.title))]),t._v(" "),e("base-input",{attrs:{type:"text"},on:{change:t.calc},model:{value:t.totalLoan,callback:function(n){t.totalLoan=t._n(n)},expression:"totalLoan"}},[t._v("total Loan Money:")]),t._v(" "),e("base-input",{attrs:{type:"text",unit:"months"},on:{change:t.calc},model:{value:t.totalMonth,callback:function(n){t.totalMonth=t._n(n)},expression:"totalMonth"}},[t._v("total Month:")]),t._v(" "),e("base-input",{attrs:{type:"text",unit:"%"},on:{change:t.calc},model:{value:t.yearRate,callback:function(n){t.yearRate=t._n(n)},expression:"yearRate"}},[t._v("Loan Year Rate:")]),t._v(" "),e("base-input",{attrs:{type:"text",unit:"%"},on:{change:t.calc},model:{value:t.expected_YearEarn,callback:function(n){t.expected_YearEarn=t._n(n)},expression:"expected_YearEarn"}},[t._v("Expected Earn Rate:")]),t._v(" "),e("base-button",{on:{click:t.calc}},[t._v("Calculate!")]),t._v(" "),e("p",{staticClass:"text--bold"},[t._v("\n    If you can borrow Cash from bank, then invest the money.. "),e("br"),e("br"),t._v("\n    After "+t._s(t.totalMonth)+" months ... "),e("br"),t._v("\n    Monthly pay: "+t._s(t.monthlyPay.toFixed(0))+",\n    Total Loan fee: "),e("span",{staticStyle:{color:"red"}},[t._v(t._s(Math.round(t.totalPay).toLocaleString()))]),t._v(" , "),e("br"),t._v("\n    Invest earned: "),e("span",{staticStyle:{color:"green"}},[t._v(t._s(Math.round(t.totalEarning).toLocaleString()))]),t._v(" , \n    Absolute Earned: "),e("span",{staticClass:"text--bolder"},[t._v(t._s(Math.round(t.totalEarning-t.totalPay).toLocaleString()))])])],1)},staticRenderFns:[]};var c={name:"App",components:{LoanInvest:e("VU/8")(s,i,!1,function(t){e("58J7")},null,null).exports}},u={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("h2",[this._v(" Loan Calculator ")]),this._v(" "),n("loan-invest")],1)},staticRenderFns:[]};var h=e("VU/8")(c,u,!1,function(t){e("mejk")},null,null).exports;a.a.config.productionTip=!1,new a.a({el:"#app",components:{App:h},template:"<App/>"})},mejk:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.f3591f422422a98fa311.js.map