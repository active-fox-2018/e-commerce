<template>
  <div class="columns" style="flex">
    <aside class="column is-2 aside hero is-fullheight" id="sidebar" style="height: 20vh;">
      <AdminSidebar></AdminSidebar>
    </aside>
    <div class="column is-8" style="height: 150vh;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AdminSidebar from '@/components/AdminSidebar.vue';
import swal from 'sweetalert';
// import api from '@/api/e-commerce';

export default {
  mounted() {
    // verify ADMIN WITH $STORE
    if (!this.isAdmin) {
      this.$router.push('/');
    } else {
      this.$store.dispatch('getAllTransaction')
      swal('Welcome Admin!', {
        button: true,
        timer: 1750,
        icon: 'success',
      });
    }
  },
  name: 'admin',
  components: {
    AdminSidebar,
  },
  data() {
    return {
      menu: 'home',
    };
  },
  computed: {
    isAdmin() {
      return this.$store.state.isAdmin;
    },
  },
};
</script>
