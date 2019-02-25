<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-12-mobile is-half" v-if="loading">
        <Loading></Loading>
      </div>
      <div class="column is-12-mobile is-half" v-else>
        <form @submit.prevent="submitUpload" class="has-text-white" style="margin: 1em;">

          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Product Name" v-model="title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Description" v-model="description">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Price" v-model="price">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" placeholder="Stock" v-model="stock">
            </div>
          </div>
          <div class="field">
            <div class="file is-boxed is-success is-centered">
              <label class="file-label">
                <input class="file-input" type="file" ref="myFiles"
          @change="previewFiles">
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload"></i>
                  </span>
                  <span class="file-label">
                    Choose a file…
                  </span>
                </span>
              </label>
            </div>
          </div>
          <div class="field">
            <button class="is-medium button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import api from '@/api/e-commerce';
import swal from 'sweetalert';

export default {
  name: 'upload',
  components: {
    Loading,
  },
  data() {
    return {
      title: 'ini product',
      price: '20000',
      stock: '200',
      description: '.....................',
      preview: null,
      files: [],
    };
  },
  methods: {
    previewFiles(e) {
      const file = e.target.files[0];
      this.files = this.$refs.myFiles.files;
      // this.$emit('preview', URL.createObjectURL(file));
      this.preview = URL.createObjectURL(file);
    },
    clearForm() {
      this.title = '';
      this.price = '';
      this.stock = '';
      this.description = '';
      this.preview = null;
      this.files = [];
    },
    submitUpload() {
      // this.$emit('preview', '');
      const dataForm = new FormData();
      dataForm.append('title', this.title);
      dataForm.append('description', this.description);
      dataForm.append('stock', this.stock);
      dataForm.append('price', this.price);
      dataForm.append('image', this.files[0]);
      if (!this.title.length
          || !this.price.length
          || !this.stock.length
          || !this.files.length
          || !this.description.length) {
        swal('Input cannot be blank like heart of yours', {
          buttons: false,
          timer: 1750,
        });
      } else if (!(this.files[0].type.includes('jpeg')
        || this.files[0].type.includes('jpg')
        || this.files[0].type.includes('png'))) {
        swal('Please input image file', {
          button: false,
          timer: 1750,
        });
      } else if (+this.price % 1 !== 0 || +this.stock % 1 !== 0) {
        swal('Please input price or stock with numbers only', {
          button: false,
          timer: 1750,
        });
      } else {
        this.$store.commit('loading', true);
        api({
          method: 'post',
          url: '/products',
          data: dataForm,
          headers: { 'Content-Type': 'multipart/form-data', token: localStorage.getItem('token') },
        })
          .then(({ data }) => {
            this.clearForm();
            console.log(data);
            this.$store.commit('addProduct', data);
            // console.log(data); // nanti masukin ke store.state new product
            this.$store.commit('loading', false);
            swal('Your New Product has been submitted!', {
              icon: 'success',
            });
          })
          .catch(({ response }) => {
            this.$store.commit('loading', false);
            let warning = response.data.message || response.statusText;
            if (response.data.message.includes('Product validation failed: ')) {
              warning = response.data.message.split('Product validation failed: ')[1].split(', ').join('\n');
            }
            swal(warning, {
              timer: 1750,
              button: false,
            });
          });
      }
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>
