<template>
  <v-system-bar window>
    <v-menu
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          slot="activator"
          text
          small
          right
          v-on="on"
        >
          <v-icon>mdi-headphones</v-icon> MENU
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click.stop="dialog = true">
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>
        <v-dialog
          v-model="dialog"
          max-width="300"
        >
          <v-card>
            <v-card-title><h2>Vue Music Player</h2></v-card-title>
            <v-card-text>Version 1.0.0</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                @click.stop="dialog = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list>
    </v-menu>
    <v-spacer />
    VUE MUSIC PLAYER
    <v-spacer />
    <v-icon>mdi-window-minimize</v-icon>
    <v-icon>mdi-window-maximize</v-icon>
    <v-icon>mdi-window-close</v-icon>
  </v-system-bar>
</template>

<script>
export default ({
  data () {
    return {
      dialog: false
    }
  }
})
</script>

<style scoped>
h1 {
  color: purple;
}
</style>
