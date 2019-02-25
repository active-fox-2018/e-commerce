<template>
  <div class="row" style="height: 100vh">
    <div class="col-6 w-100"></div>
    <div class="col-6 d-flex justify-content-center">
      <div class="box-model">
        <h2>Signin</h2>
        <input v-model="email" name="email" placeholder="E-Mail Address" type="text">
        <input v-model="password" id="pw" name="password" placeholder="Password" type="password">
        <input @click.prevent="signIn" class="animated" type="submit" value="Enter">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      this.$axios({
        method: "POST",
        url: "/users/signin",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(response => {
          this.email = "";
          this.password = "";
          this.$store.commit("signIn", true);
          this.$store.dispatch('checkInStore');
          this.$router.push("/");
          localStorage.setItem("token", response.data.access_token);
          this.$alertify.success(response.data.message);
        })
        .catch(error => {
          // console.log(error.response.data.error);
          const err = error.response.data.message;
          this.$alertify.alertWithTitle("Warning", err, () => {
          });
        });
    },
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
