import '../assets/app.scss'

import Vue from 'vue'

import vuetify from './plugins/vuetify' // path to vuetify export

import Player from './Player.vue'

/* eslint-disable-next-line no-new */
new Vue({
  vuetify,
  el: '#app',
  render: h => h(Player)
})
