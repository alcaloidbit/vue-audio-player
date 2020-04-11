<template>
  <div>
    <v-toolbar
      text
      height="90"
    >
      <v-btn
        text
        icon
        @click="toggleMute"
      >
        <template v-if="!this.muted">
          <v-icon v-if="this.volume >= 0.5">
            mdi-volume-plus
          </v-icon>
          <v-icon v-else-if="this.volume >= 0">
            mdi-volume-minus
          </v-icon>
          <v-icon v-else>
            mdi-volume-mute
          </v-icon>
        </template>
        <v-icon v-show="this.muted">
          mdi-volume-off
        </v-icon>
      </v-btn>
      <v-slider
        v-model="volume"
        max="1"
        step="0.1"
        @input="updateVolume(volume)"
      />
      {{ this.volume * 100 + '%' }}
      <v-spacer />
      <v-btn
        outlined
        small
        fab
        color="light-blue"
        @click="skipTrack('prev')"
      >
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn
        outlined
        fab
        small
        color="light-blue"
        @click="stopTrack"
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn
        outlined
        fab
        color="light-blue"
        @click="playTrack()"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        outlined
        fab
        small
        color="light-blue"
        @click="pauseTrack"
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        outlined
        fab
        small
        color="light-blue"
        @click="skipTrack('next')"
      >
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
      <v-btn
        text
        icon
        @click="toggleLoop"
      >
        <v-icon
          v-if="this.loop"
          color="light-blue"
        >
          mdi-repeat-once
        </v-icon>
        <v-icon
          v-else
          color="blue-grey"
        >
          mdi-repeat-once
        </v-icon>
      </v-btn>
      <v-btn
        text
        icon
        @click="toggleShuffle"
      >
        <v-icon
          v-if="this.shuffle"
          color="light-blue"
        >
          mdi-shuffle
        </v-icon>
        <v-icon
          v-else
          color="blue-gray"
        >
          mdi-shuffle
        </v-icon>
      </v-btn>
      <v-spacer />
    </v-toolbar>
    <v-toolbar
      text
      height="40"
    >
      <v-progress-linear
        v-model="trackProgress"
        height="40"
        @change="updateSeek($event)"
      />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  props: {
    loop: Boolean,
    shuffle: Boolean,
    progress: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      volume: 0.5,
      muted: false
    }
  },
  computed: {
    trackProgress: {
      get: function () {
        return this.progress * 100
      },
      set: function (value) {
        this.$emit('updateseek', value)
      }
    }
  },
  created: function () {
    /* eslint-disable-next-line no-undef */
    Howler.volume(this.volume)
  },
  methods: {
    toggleLoop () {
      this.$emit('toggleloop', !this.loop)
    },
    toggleShuffle () {
      this.$emit('toggleshuffle', !this.shuffle)
    },
    updateVolume (volume) {
      /* eslint-disable-next-line no-undef */
      Howler.volume(volume)
    },
    toggleMute () {
      /* eslint-disable-next-line no-undef */
      Howler.mute(!this.muted)
      this.muted = !this.muted
    },
    playTrack (index) {
      this.$emit('playtrack', index)
    },
    pauseTrack () {
      this.$emit('pausetrack')
    },
    stopTrack () {
      this.$emit('stoptrack')
    },
    skipTrack (direction) {
      this.$emit('skiptrack', direction)
    },
    updateSeek (value) {
      console.log(value)
      this.$emit('updateseek', value)
    }
  }
}
</script>
