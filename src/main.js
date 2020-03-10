import Vue from 'vue'
import Route from './components/Route';
import VueRouter from 'vue-router'
import Routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter);
const router = new VueRouter({
  routes : Routes 
  
})




new Vue({
  render: h => h(Route),
  router:router
}).$mount('#app')
