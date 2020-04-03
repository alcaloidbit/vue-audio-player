<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <player-title-bar />
        <player-playlist-panel :playlist="playlist" />
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import PlayerTitleBar from './components/PlayerTitleBar.vue'
import PlayerPlaylistPanel from './components/PlayerPlaylistPanel.vue'
export default {
  components: {
    PlayerTitleBar,
    PlayerPlaylistPanel
  },
  data: () => ({
    drawer: null,
    playlist: [
      { title: 'Piste Bleue', artist: 'Para One', howl: null, display: true },
      { title: 'Turtle Trouble', artist: 'Para One', howl: null, display: true },
      { title: 'Midnight Swim', artist: 'Para One', howl: null, display: true },
      { title: 'F.U.D.G.E', artist: 'Para One', howl: null, display: true },
      { title: 'Dudun-dun', artist: 'Para One', howl: null, display: true },
      { title: 'Musclor (Feat TTC)', artist: 'Para One', howl: null, display: true },
      { title: 'Def Tea Machine', artist: 'Para One', howl: null, display: true },
      { title: 'Les soleils artificiels', artist: 'Para One', howl: null, display: true },
      { title: 'Sages-femmes', artist: 'Para One', howl: null, display: true },
      { title: 'Liege', artist: 'Para One', howl: null, display: true },
      { title: 'Clubhoppn', artist: 'Para One', howl: null, display: true },
      { title: 'Nobody Cares', artist: 'Para One', howl: null, display: true },
      { title: 'Bobble', artist: 'Para One', howl: null, display: true },
      { title: 'Ski Lesson Blues', artist: 'Para One', howl: null, display: true }
    ]
  }),
  created () {
    this.$vuetify.theme.dark = true
    this.playlist.forEach((track) => {
      const file = track.title.replace(/\s/g, '_')
      /* eslint-disable-next-line no-undef */
      track.howl = new Howl({
        src: [`./playlist/${file}.mp3`]
      })
    })
  }
}
</script>
