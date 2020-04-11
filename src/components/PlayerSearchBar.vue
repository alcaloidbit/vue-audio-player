<template>
  <v-toolbar text>
    <v-text-field
      v-model="searchString"
      clearable
      prepend-icon="mdi-card-search"
      placeholder="Quick search"
      @input="searchPlaylist"
    />
    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  props: {
    playlist: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      searchString: ''
    }
  },
  methods: {
    searchPlayList () {
      this.playlist.forEach((track) => {
        if (this.searchString) {
          if (!track.title.toLowerCase().includes(this.searchString.toLowerCase()) && !track.artist.toLowerCase().includes(this.searchString.toLowerCase())) {
            track.display = false
          } else {
            track.display = true
          }
        } else if (this.searchString === '' || this.searchString === null) {
          track.display = true
        }
      })
    }
  }
}
</script>
