<template>
  <v-card height="330">
    <v-list>
      <v-list-item
        v-for="(track, index) in playlist"
        v-show="track.display"
        :key="track.title"
      >
        <v-list-item-content>
          <v-list-item-title>
            {{ index || numbers }} {{ track.artist }} - {{ track.title }}
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer />
        {{ track.howl.duration() || minutes }}
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
    }
  }
}
</script>
