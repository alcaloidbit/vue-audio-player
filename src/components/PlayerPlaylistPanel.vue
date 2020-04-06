<template>
  <v-card
    height="330"
    :class="playlist"
  >
    <v-list>
      <v-list-item
        v-for="(track, index) in playlist"
        v-show="track.display"
        :key="track.title"
        :class="[{selected: track === selectedTrack}, {even: index % 2 === 0}]"
      >
        <v-list-item-content
          @click="selectTrack(track)"
          @dblclick="playTrack()"
        >
          <v-list-item-title>
            {{ index | tracknumber }} {{ track.artist }} - {{ track.title }}
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer />
        {{ track.howl.duration() | minutes }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Array,
      required: true
    },
    selectedTrack: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectTrack (track) {
      this.$emit('selecttrack', track)
    },
    playTrack (index) {
      this.$emit('playtrack', index)
    }
  }
}
</script>

<style scoped>
  .selected {
    background-color: orange !important;
  }
  .even {
    background-color: #505050;
  }
  .playlist {
    overflow: auto;
  }
</style>
