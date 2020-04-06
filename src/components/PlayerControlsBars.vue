<template>
  <div>
    <v-toolbar
      text
      height="90"
    >
      <v-spacer />
      <v-btn
        outline
        fab
        small
        color="light-blue"
        @click="stopTrack"
      >
        <v-icon>mdi-stop</v-icon>
      </v-btn>
      <v-btn
        outline
        fab
        color="light-blue"
        @click="playTrack()"
      >
        <v-icon>mdi-play</v-icon>
      </v-btn>
      <v-btn
        outline
        fab
        small
        color="light-blue"
        @click="pauseTrack"
      >
        <v-icon>mdi-pause</v-icon>
      </v-btn>
      <v-btn
        outline
        text
        small
        color="light-blue"
        @click="skipTrack('prev')"
      >
        <v-icon>mdi-skip-previous</v-icon>
      </v-btn>
      <v-btn
        outline
        text
        small
        color="light-blue"
        @click="skipTrack('next')"
      >
        <v-icon>mdi-skip-next</v-icon>
      </v-btn>
      <v-spacer />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  methods: {
    playTrack (index) {
      this.$emit('playtrack', index)
    },
    pauseTrack () {
      this.$emit('pausetrack')
    },
    stopTrack () {
      this.$emit('stoptrack')
    }
  }
}
</script>
