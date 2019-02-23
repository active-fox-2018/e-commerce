<template>
<nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to="/"  class="navbar-brand">
        ComeCom
    </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
        <div class="col">
            <form @keyup.prevent="search" class="form-inline my-2 my-lg-0">
                <input v-model="name" style="width: 100%" class="form-control mr-sm-2" type="text" placeholder="Search">
            </form>
        </div>

        <div class="col-lg-1">
             <ul class="navbar-nav">
                <li class="nav-item active">

                    <div class="btn-group mt-2 " role="group" aria-label="Button group with nested dropdown">
                        <div class="btn-group show " role="group">
                            <h3 style="cursor: pointer" id="dropdownMenuButton" data-toggle="dropdown"  >
                                <i class="mt-2 text-white far fa-user"></i>
                            </h3>
                            <div class="dropdown-menu show" aria-labelledby="btnGroupDrop1" x-placement="bottom-start" style="cursor: pointer; position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 48px, 0px);margin-left: -100px">
                                <div  v-if="user" >
                                    <router-link to="/profile" class="mx-auto col dropdown-item">
                                        Dashboard
                                    </router-link>
                                    <router-link v-if="user.role == 'admin'" to="/sell" class="mx-auto col dropdown-item">
                                        Sell
                                    </router-link>
                                    <div class="mx-auto col dropdown-item" @click.prevent="logout">
                                        Logout
                                    </div>

                                </div>

                                <div v-else>
                                    <router-link v-if="!user" to="/register" class="mx-auto col dropdown-item">
                                        Register
                                    </router-link>
                                    <router-link v-if="!user" to="/login" class="mx-auto col dropdown-item">
                                        Login
                                    </router-link>
                                </div>

                            </div>
                        </div>
                    </div>

                </li>
                <li class="nav-item" >
                    <router-link to="/cart" class="mx-auto col">
                        <h3>
                            <i class="text-white fas fa-shopping-basket"></i>
                        </h3>
                    </router-link>
                </li>
            </ul>
        </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'myNav',
  props: ['user'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    logout () {
      this.$emit('logout')
    },
    search () {
      this.$emit('search', this.name)
    }
  }
}
</script>

<style>

</style>
