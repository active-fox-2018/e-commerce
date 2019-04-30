<template>
    <div>
      <div class="compose has-text-centered">
        <a class="button is-danger is-block is-bold" @click.prevent="toUpload">
          <p>New
            Product
          </p>
        </a>
      </div>
      <div class="main">
        <a href="#" class="item"><span class="icon">
          <i class="fa fa-inbox"></i>
          </span><span class="name">Home</span>
        </a>
        <a @click.prevent="toTransactions" class="item"><span class="icon">
          <i class="fa fa-check"></i>
          </span><span class="name">Transactions</span>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  methods: {
    toUpload() {
      this.$router.push('/admin/upload');
    },
    toTransactions() {
      this.$router.push('/admin/transactions');
    }
  },
};
</script>

<style>
.aside {
  display:block;
  background-color: #F9F9F9;
  border-right: 1px solid #DEDEDE;
}
.aside .compose {
  height: 95px;
  margin:0 -10px;
  padding: 25px 30px;
}
.aside .compose .button {
  color: #F6F7F7;
}
.aside .compose .button .compose {
  font-size: 14px;
  font-weight: 700;
}
.aside .main {
  padding: 40px;
  color: #6F7B7E;
}
.aside .title {
  color: #6F7B7E;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
}
.aside .main .item {
  display: block;
  padding: 10px 0;
  color: #6F7B7E;
}
.aside .main .item.active {
  background-color: #F1F1F1;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .item:active,.aside .main .item:hover {
  background-color: #F2F2F2;
  margin: 0 -50px;
  padding-left: 50px;
}
.aside .main .icon {
  font-size: 19px;
  padding-right: 30px;
  color: #A0A0A0;
}
.aside .main .name {
  font-size: 15px;
  color: #5D5D5D;
  font-weight: 500;
}

</style>
