import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapVue from "bootstrap-vue";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

// // Initialize Application Insights
// const appInsights = new ApplicationInsights({
//   config: {
//     instrumentationKey: process.env.VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY,
//     enableAutoRouteTracking: true, // Automatically track route changes
//     enableDebug: process.env.VUE_APP_ENV !== "prod", // Debugging for non-prod environments
//   },
// });
// appInsights.loadAppInsights();
// Vue.prototype.$appInsights = appInsights; // Make appInsights globally available

// // 1. Track Initial Page View
// appInsights.trackPageView({ name: "InitialPageLoad" });

// // 2. Track Frontend Health Check (Every 5 minutes)
// const trackFrontendHealth = () => {
//   try {
//     appInsights.trackEvent({
//       name: "FrontendHealthCheck",
//       properties: { status: "Healthy", timestamp: new Date().toISOString() },
//     });
//     console.log("Frontend health event logged.");
//   } catch (error) {
//     appInsights.trackException({ exception: error });
//   }
// };
// setInterval(trackFrontendHealth, 300000); // 5 minutes

// // 3. Log Uncaught Errors
// window.addEventListener("error", (event) => {
//   appInsights.trackException({ exception: event.error });
// });

// // 4. Log Unhandled Promise Rejections
// window.addEventListener("unhandledrejection", (event) => {
//   appInsights.trackException({ exception: event.reason });
// });

// // 5. Log Resource Load Failures
// window.addEventListener(
//   "error",
//   (event) => {
//     if (
//       event.target instanceof HTMLImageElement ||
//       event.target instanceof HTMLScriptElement
//     ) {
//       appInsights.trackEvent({
//         name: "ResourceLoadFailure",
//         properties: { resourceUrl: event.target.src || event.target.href },
//       });
//     }
//   },
//   true // Capture during the capturing phase
// );

// // 6. Track User Device and Browser Info
// appInsights.trackEvent({
//   name: "DeviceInfo",
//   properties: {
//     userAgent: navigator.userAgent,
//     platform: navigator.platform,
//   },
// });

// // 7. Track Page View for Route Changes (using Vue Router)
// router.afterEach((to, from) => {
//   appInsights.trackPageView({ name: to.name || to.path });
// });

// // 8. Monitor Component Load Times (Global Mixin for Vue Components)
// Vue.mixin({
//   beforeCreate() {
//     this.startTime = Date.now();
//   },
//   mounted() {
//     const loadTime = Date.now() - this.startTime;
//     appInsights.trackMetric({
//       name: `ComponentLoadTime-${this.$options.name}`,
//       average: loadTime,
//     });
//   },
// });

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");