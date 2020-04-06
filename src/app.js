import '../assets/app.scss'

import Vue from 'vue'

import vuetify from './plugins/vuetify' // path to vuetify export

import 'vuetify/dist/vuetify.css'

import Player from './Player.vue'

/* eslint-disable-next-line no-unused-vars */
import { Howl, Howler } from 'howler'

Vue.filter('tracknumber', (value) => {
  const number = value + 1
  if (number < 10) {
    return '0' + number + '.'
  }
  return number + '.'
})

Vue.filter('minutes', (value) => {
  if (!value || typeof value !== 'number') return '00:00'
  let min = parseInt(value / 60)
  let sec = parseInt(value % 60)
  min = min < 10 ? '0' + min : min
  sec = sec < 10 ? '0' + sec : sec
  value = min + ':' + sec
  return value
})
/* eslint-disable-next-line no-new */
new Vue({
  vuetify,
  el: '#app',
  render: (h) => h(Player)
})
