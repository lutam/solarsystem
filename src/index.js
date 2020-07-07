import Vue from 'vue';
import App from './app/App.vue';
import './assets/scss/globals.scss';

// eslint-disable-next-line no-undef
if (document.getElementById('app')) {
  new Vue({
    components: {
      'app-root': App,
    },
  }).$mount('#app');
}
