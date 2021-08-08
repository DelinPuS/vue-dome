import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/rouuter.js'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueRouter,VueQuillEditor)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
