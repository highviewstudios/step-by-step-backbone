(this.webpackJsonpbackbone=this.webpackJsonpbackbone||[]).push([[0],{38:function(e,t,a){e.exports=a(69)},43:function(e,t,a){},45:function(e,t,a){},69:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(33),c=a.n(r),o=(a(43),a(12)),i=a(5),u=(a(44),a(45),a(13)),m=a.n(u),s=a(15),d=a(18),E=a(11),p=Object(n.createContext)();var f=function(e){var t=Object(n.useState)({name:"",email:""}),a=Object(E.a)(t,2),r=a[0],c=a[1];return l.a.createElement(p.Provider,{value:{user:r,updateUser:function(e,t){c((function(a){return Object(d.a)(Object(d.a)({},a),{},Object(s.a)({},e,t))}))}}},e.children)};var h=function(){var e=Object(i.f)(),t=Object(n.useContext)(p).updateUser;return Object(n.useEffect)((function(){m.a.get("/auth",{withCredentials:!0}).then((function(a){console.log(a.data),a.data.auth?(t("name",a.data.user.displayName),e.push("/home")):e.push("/signin")})).catch((function(e){console.log("E "+e)}))}),[]),l.a.createElement("div",null,l.a.createElement("h1",null,"Auth"))},g="";var b=function(){var e=window.location.hostname,t=window.location.protocol;g="localhost"===e?t+"//"+e+":8080":t+"//"+e};var v=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(E.a)(t,2),r=a[0],c=a[1];return Object(n.useEffect)((function(){b()}),[]),l.a.createElement("div",null,l.a.createElement("h1",null,"Sign In")," ",l.a.createElement("br",null)," ",l.a.createElement("br",null),l.a.createElement("form",null,l.a.createElement("label",{id:"lblEmail"},"Email:"),l.a.createElement("input",{id:"txtEmail",name:"email",type:"text"}),l.a.createElement("br",null),l.a.createElement("label",{id:"lblPassword"},"Password"),l.a.createElement("input",{id:"txtPassword",name:"password",type:"password"}),l.a.createElement("button",{onClick:function(t){t.preventDefault();var a=document.getElementById("txtEmail").value,n=document.getElementById("txtPassword").value;m.a.get("/login?email="+a+"&password="+n).then((function(t){"Logged in successful"===t.data.message?e.push("/"):c(t.data.info)})).catch((function(e){console.log(e)}))}},"LogIn"),l.a.createElement("p",null,r)),l.a.createElement("a",{href:g+"/auth/google"},"Sign In With Google"),l.a.createElement(o.b,{to:"/register"},l.a.createElement("p",null,"Register")))};var w=function(){Object(n.useEffect)((function(){b()}),[]);var e=Object(n.useContext)(p).user;return l.a.createElement("div",null,l.a.createElement("h1",null,"Home Page"),l.a.createElement("h2",null,e.name),l.a.createElement("a",{href:g+"/logout"},"Sign Out"))},O=a(21),y=a(35),j=a(37),C=a(14);var x=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(E.a)(t,2),r=a[0],c=a[1],o=Object(n.useState)(!1),u=Object(E.a)(o,2),s=u[0],d=u[1];return Object(n.useEffect)((function(){document.title="Register"}),[]),l.a.createElement("div",{className:"body"},l.a.createElement(y.a,{className:"p-3"},l.a.createElement(j.a,{className:"back-color"},l.a.createElement("div",{className:"header"},l.a.createElement("h1",null,"Register"),s?l.a.createElement("div",null,l.a.createElement("h2",null," You have successfully been registered"),l.a.createElement("br",null),l.a.createElement("p",null,"Please log in"),l.a.createElement(O.a,{type:"submit",onClick:function(){d(!1),e.push("/signin")},variant:"primary"},"Login")):l.a.createElement(C.a,{action:"/form",method:"POST"},l.a.createElement(C.a.Control,{id:"name",size:"sm",type:"text",placeholder:"Name",required:!0}),l.a.createElement("br",null),l.a.createElement(C.a.Control,{id:"email",size:"sm",type:"email",placeholder:"Email",required:!0}),l.a.createElement("br",null),l.a.createElement(C.a.Control,{id:"password",size:"sm",type:"password",placeholder:"Password",required:!0}),l.a.createElement("br",null),l.a.createElement(C.a.Control,{id:"confirmpassword",size:"sm",type:"password",placeholder:"Confirm Password",required:!0}),l.a.createElement("br",null),l.a.createElement("p",null,r),l.a.createElement(O.a,{type:"submit",onClick:function(e){e.preventDefault(),c("");var t="/register/"+document.getElementById("name").value+"/"+document.getElementById("email").value+"/"+document.getElementById("password").value+"/"+document.getElementById("confirmpassword").value;m.a.get(t).then((function(e){"User registered successfully"===e.data.message?d(!0):"Yes"===e.data.userError&&c(e.data.message)})).catch((function(e){console.log(e)}))},variant:"primary"},"Register"))))))};var k=function(){return l.a.createElement("div",null,l.a.createElement("h1",null," Admin Auth"))};var I=function(){return l.a.createElement(f,null,l.a.createElement(o.a,null,l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/",exact:!0,component:h}),l.a.createElement(i.a,{path:"/signin",component:v}),l.a.createElement(i.a,{path:"/home",component:w}),l.a.createElement(i.a,{path:"/register",component:x}),l.a.createElement(i.a,{path:"/administrator",component:k}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[38,1,2]]]);
//# sourceMappingURL=main.2b3ce883.chunk.js.map