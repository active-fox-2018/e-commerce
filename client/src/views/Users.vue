<template>
  <v-container fill-height>
    <v-layout row align-center justify-space-between>
      <v-flex xs6>
        <img src="@/assets/login.png" style="width: 100%"/>
      </v-flex>

      <v-flex xs5>
        <v-card>
          <v-container>
            <router-view @logged_in="$emit('logged_in')" @admin="$emit('admin')"/>

          </v-container>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>
