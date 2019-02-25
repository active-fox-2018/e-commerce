<template>
  <div class="row" style="height: 100vh">
    <div class="col-6 d-flex"></div>
    <div class="col-6 d-flex justify-content-center">
      <div class="box-model">
        <h2>Signup</h2>
        <input v-model="name" name="name" placeholder="Name" type="text">
        <input v-model="email" name="email" placeholder="E-Mail Address" type="text">
        <input v-model="password" id="pw" name="password" placeholder="Password" type="password">
        <input @click.prevent="signup" class="animated" type="submit" value="Submit">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    signup() {
      this.$axios({
        method: 'POST',
        url: '/users/signup',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.name = '';
          this.email = '';
          this.password = '';
          this.$alertify.success(response.data.message);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Sofia");

h2 {
  font-family: "Sofia", cursive;
  font-size: 15px;
  font-weight: bold;
  font-size: 3.6em;
  text-align: center;
  margin-bottom: 20px;
}

.box-model {
  width: 350px;
  position: absolute;
  top: 10%;
  left: 50%;
  margin-left: -175px;
}

input[type="text"],
input[type="password"] {
  width: 350px;
  padding: 20px 0px;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #435160;
  outline: none;
  color: #6d7781;
  font-size: 16px;
}

input[type="submit"] {
  background: #1fb7ce;
  border: 0;
  width: 350px;
  height: 40px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
}
input[type="submit"]:hover {
  background: #16aa56;
  animation-name: shake;
}

::-webkit-input-placeholder {
  color: #435160;
  font-size: 12px;
}

.animated {
  margin-top: 20px;
  animation-fill-mode: both;
  animation-duration: 1s;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}
</style>
