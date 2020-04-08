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
        <player-info-panel
          :track-info="getTrackInfo"
        />
        <player-controls-bars
          :progress="progress"
          :loop="loop"
          :shuffle="shuffle"
          @updateseek="setSeek"
          @skiptrack="skip"
          @toggleloop="toggleLoop"
          @toggleshuffle="toggleShuffle"
          @playtrack="play"
          @pausetrack="pause"
          @stoptrack="stop"
        />

        <player-playlist-panel
          :selected-track="selectedTrack"
          :playlist="playlist"
          @selecttrack="selectTrack"
        />
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
import PlayerControlsBars from './components/PlayerControlsBars.vue'
import PlayerInfoPanel from './components/PlayerInfoPanel.vue'

export default {
  components: {
    PlayerTitleBar,
    PlayerPlaylistPanel,
    PlayerControlsBars,
    PlayerInfoPanel
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
    ],
    // selectedTrack data property
    selectedTrack: null,
    index: 0,
    playing: false,
    loop: false,
    shuffle: false,
    // A Seek property
    seek: 0
  }),
  computed: {
    currentTrack () {
      return this.playlist[this.index]
    },
    progress () {
      if (this.currentTrack.howl.duration() === 0) return 0
      return this.seek / this.currentTrack.howl.duration()
    },
    getTrackInfo () {
      const artist = this.currentTrack.artist
      const title = this.currentTrack.title
      const seek = this.seek
      const duration = this.currentTrack.howl.duration()
      return {
        artist,
        title,
        seek,
        duration
      }
    }
  },
  watch: {
    // We watch the Player's playing property
    // updating the seek property 4 times a sec
    playing (playing) {
      // get the posision of playback for a sound
      // and assign the value to this.seek
      this.seek = this.currentTrack.howl.seek()
      let updateSeek
      if (playing) {
        // Do that 4 times / sec
        updateSeek = setInterval(() => {
          this.seek = this.currentTrack.howl.seek()
        }, 250)
      } else {
        clearInterval(updateSeek)
      }
    }
  },
  created () {
    this.$vuetify.theme.dark = true
    this.playlist.forEach((track) => {
      const file = track.title.replace(/\s/g, '_')
      /* eslint-disable-next-line no-undef */
      track.howl = new Howl({
        src: [`./playlist/${file}.ogg`],
        onend: () => {
          if (this.loop) {
            this.play(this.index)
          } else {
            this.skip('next')
          }
        }
      })
    })
  },
  methods: {
    selectTrack (track) {
      this.selectedTrack = track
    },
    toggleLoop (value) {
      this.loop = value
    },
    toggleShuffle (value) {
      this.shuffle = value
    },
    skip (direction) {
      let index = 0
      const lastIndex = this.playlist.length - 1
      if (this.shuffle) {
        index = Math.round(Math.random() * lastIndex)
        while (index === this.index) {
          index = Math.round(Math.random() * lastIndex)
        }
      } else if (direction === 'next') {
        index = this.index + 1
        if (index >= this.playlist.length) {
          index = 0
        }
      } else {
        index = this.index - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
      }

      this.skipTo(index)
    },
    skipTo (index) {
      if (this.currentTrack) {
        this.currentTrack.howl.stop()
      }

      this.play(index)
    },
    play (index) {
      const selectedTrackIndex = this.playlist.findIndex(track => track === this.selectedTrack)
      if (typeof index === 'number') {
      /* eslint-disable-next-line no-self-assign */
        index = index
      } else if (this.selectedTrack) {
        if (this.selectedTrack !== this.currentTrack) {
          this.stop()
        }
        index = selectedTrackIndex
      } else {
        index = this.index
      }

      const track = this.playlist[index].howl

      if (track.playing()) {
        return
      } else {
        track.play()
      }

      this.selectedTrack = this.playlist[index]
      this.playing = true
      this.index = index
    },
    pause () {
      this.currentTrack.howl.pause()
      this.playing = false
    },
    stop () {
      this.currentTrack.howl.stop()
      this.playing = false
    },
    setSeek (percents) {
      const track = this.currentTrack.howl

      if (track.playing()) {
        track.seek((track.duration() / 100) * percents)
      }
    }

  }
}
</script>
