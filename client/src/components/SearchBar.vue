<template>
    <q-input light-dimmed dark rounded outlined v-model="text" style="width:100%; height:10vh;">
        <template v-slot:append>
            <q-icon name="search" />
        </template>
    </q-input>
</template>

<script>
export default {
  name: 'SearchBar',
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style>

</style>
