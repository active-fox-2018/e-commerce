<template>
  <div class="q-pa-md">
    <q-btn label="Refresh" color="black" @click="onRefresh" class="q-mb-md" />
    <q-table
      title="Products"
      :data="products"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
    <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name">
              <q-input @change="updateProduct(props.row)" v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="price" :props="props">
            {{ props.row.price }}
            <q-popup-edit
              buttons
              v-model="props.row.price"
            >
              <q-input @change="updateProduct(props.row)" v-model="props.row.price" autofocus/>
            </q-popup-edit>
          </q-td>
          <q-td key="stock" :props="props">
            {{ props.row.stock }}
            <q-popup-edit v-model="props.row.stock">
              <q-input @change="updateProduct(props.row)" v-model="props.row.stock" dense autofocus />
            </q-popup-edit>
          </q-td>
          <q-td key="description" :props="props">
            <div class="text-pre-wrap">{{ props.row.description }}</div>
            <q-popup-edit v-model="props.row.description">
              <q-input 
              @change="updateProduct(props.row)"
              type="textarea"
              counter
              @keyup.enter.stop
              v-model="props.row.description" 
              dense 
              autofocus />
            </q-popup-edit>
          </q-td>
          <q-td style="text-align:right">
            <q-icon @click="deleteProduct(props.row._id)" name="delete" style="font-size: 2em;cursor:pointer"></q-icon>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProductAdmin',
  data () {
    return {
      loading: true,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
        { name: 'stock', label: 'Stock', field: 'stock', sortable: true },
        { name: 'description', label: 'Description', field: 'description' },
       
      ],
      data: []
    }
  },
  mounted () {
    this.onRefresh()
  },
  computed: {
    ...mapState([
      'products'
    ])
  },
  methods: {
    onRefresh () {
      this.loading = true
      this.$store.dispatch('fetchProducts')
      this.loading = false
    },
    updateProduct(product) {
      this.$store.dispatch('updateProduct', {_id: product._id, updateData: product})
      this.$q.notify({icon: 'thumb_up', message: 'You have successfully updated a product', position: 'top-right'})
    },
    deleteProduct(id) {
      this.$store.dispatch('deleteProduct', id)
      this.$q.notify({icon: 'thumb_up', message: 'You have successfully deleted a product', position: 'top-right'})
    }
  }
}
</script>

<style>

</style>
