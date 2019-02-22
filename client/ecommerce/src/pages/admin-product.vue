<template>
  <div class="row">
    <div class="col">
      <h1>Admin Product</h1>
      <table>
        <tr>
          <td>name</td>
          <td>description</td>
          <td>price</td>
          <td>photo</td>
          <td>action</td>
        </tr>
        <tr>
          <td>
            <input type="text" v-model="productNameAdd">
          </td>
          <td>
            <input type="text" v-model="productDescriptionAdd">
          </td>
          <td>
            <input type="number" v-model="productPricesAdd">
          </td>
          <td>
            <input type="file" id="productFileAdd">
          </td>
          <td>
            <button class="btn btn-success" @click="addProduct()">Add new</button>
          </td>
        </tr>
        <tbody v-for="(product,index) in productData" :key="index">
          <tr v-if="!productShowEditPanel[index]">
            <td>{{product.name}}</td>
            <td>{{product.description}}</td>
            <td>{{product.price}}</td>
            <td>
              <img :src="product.fileUrl" height="36">
            </td>
            <td>
              <button class="btn btn-primary" @click="showHideEditPanel(index,true)">Edit</button>
            </td>
          </tr>
          <tr v-if="productShowEditPanel[index]">
            <td>
              <input type="text" v-model="productNames[index]">
            </td>
            <td>
              <input type="text" v-model="productDescriptions[index]">
            </td>
            <td>
              <input type="number" v-model="productPrices[index]">
            </td>
            <td>
              <input type="file" :id="'productFiles-'+index">
            </td>
            <td>
              <button class="btn btn-success" @click="updateProduct(index)">Save</button>
              <button class="btn btn-warning" @click="showHideEditPanel(index,false)">Cancel</button>
              <button class="btn btn-danger" @click="deleteProduct(index)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["productData", "userRole"],
  created() {
    this.$emit("get-products", null);
  },
  data() {
    return {
      productNames: [],
      productDescriptions: [],
      productPrices: [],
      productShowEditPanel: [],
      productNameAdd: "",
      productDescriptionAdd: "",
      productPricesAdd: ""
    };
  },
  methods: {
    showHideEditPanel(index, condition) {
      this.$set(this.productShowEditPanel, index, condition);
      this.$set(this.productNames, index, this.productData[index].name);
      this.$set(
        this.productDescriptions,
        index,
        this.productData[index].description
      );
      this.$set(this.productPrices, index, this.productData[index].price);
    },
    async addProduct() {
      try {
        let productItem = await axios({
          method: "POST",
          baseURL,
          url: "/api/products",
          headers: { token },
          data: {
            name: this.productNameAdd,
            description: this.productDescriptionAdd,
            price: this.productPricesAdd
          }
        });
        let formData = new FormData();
        let productFileAdd = document.querySelector("#productFileAdd");
        formData.append("productFile", productFileAdd.files[0]);
        let fileResponse = await axios({
          baseURL,
          url: "/api/products/file/" + productItem.data._id,
          method: "POST",
          headers: { token, "Content-Type": "multipart/form-data" },
          data: formData
        });
        this.productNameAdd = "";
        this.productDescriptionAdd = "";
        this.productPricesAdd = "";
        this.$emit("get-products", null);
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async updateProduct(index) {
      try {
        let productItem = await axios({
          method: "PUT",
          baseURL,
          url: "/api/products/" + this.productData[index]._id,
          headers: { token },
          data: {
            name: this.productNames[index],
            description: this.productDescriptions[index],
            price: this.productPrices[index]
          }
        });
        let formData = new FormData();
        let productFileAdd = document.querySelector("#productFiles-" + index);
        formData.append("productFile", productFileAdd.files[0]);
        let fileResponse = await axios({
          baseURL,
          url: "/api/products/file/" + productItem.data._id,
          method: "POST",
          headers: { token, "Content-Type": "multipart/form-data" },
          data: formData
        });
        this.$set(this.productShowEditPanel, index, false);
        this.$emit("get-products", null);
      } catch (err) {
        this.$emit("display-error", err);
      }
    },
    async deleteProduct(index) {
      try {
        let productItem = await axios({
          method: "DELETE",
          baseURL,
          url: "/api/products/" + this.productData[index]._id,
          headers: { token }
        });
        this.$set(this.productShowEditPanel, index, false);
        this.$emit("get-products", null);
      } catch (err) {
        this.$emit("display-error", err);
      }
    }
  }
};
</script>

