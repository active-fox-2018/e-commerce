<template>
    <q-toolbar-title >
        <img @click="changePath" src="../assets/2f9a621f-a751-4883-b050-ed22910dd027.png" style="height:40px;cursor:pointer">
    </q-toolbar-title>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    changePath () {
      this.$router.push({path: '/user'})
    }
  }
}
</script>

<style>

</style>
