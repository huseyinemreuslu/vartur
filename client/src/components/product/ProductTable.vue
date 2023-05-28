<template>
  <div>
    <RemoveProductDialog
      :dialog="isOpen"
      @close="closeOpen()"
      :id="productId"
      :info="text"
    />
    <ProductDialog
      :name="productName"
      :id="productId"
      :dialog="isOpenCreate"
      @close="closeOpen()"
      :info="text"
    />
    <br />
    <br />
    <v-dialog v-model="dialog" :hidden="dialog" width="auto">
      <v-progress-circular
        :size="70"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-dialog>
    <tr style="width: 300px">
      <v-row>
        <v-textarea
          class="mx-2"
          v-model="name"
          label="Search"
          variant="outlined"
          rows="1"
          :onchange="searchProduct"
          prepend-icon="mdi-magnify"
        ></v-textarea>
        <v-btn @click="add" style="height: 59px"> Create New Product </v-btn>
      </v-row>
    </tr>
    <v-table height="700px">
      <thead>
        <tr>
          <th class="text-left"><h1>Products</h1></th>
        </tr>
        <br />
        <tr>
          <th style="width: 100px">Id</th>
          <th>Name</th>
          <th>Created At</th>
          <th>Edit / Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in productList" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>
            {{ new Date(item.createdAt).toLocaleDateString() }}
          </td>
          <td class="text-left">
            <v-btn @click="edit(item.id, item.name)" class="mr-4">
              <v-icon
                size="large"
                color="green-darken-2"
                icon="mdi-book-edit"
              ></v-icon>
            </v-btn>
            <v-btn @click="remove(item.id)">
              <v-icon
                size="large"
                color="red-darken-2"
                icon="mdi-delete"
              ></v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div>
      <v-pagination
        v-model="page"
        :length="pageLength"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import RemoveProductDialog from "@/components/product/RemoveProductDialog.vue";
import ProductDialog from "@/components/product/ProductDialog.vue";
import { getProducts } from "@/util/request";

export default {
  components: {
    RemoveProductDialog,
    ProductDialog,
  },
  created() {
    this.getProducts().catch((e) => {
      console.log(e);
    });
  },
  data() {
    return {
      productId: "",
      productName: "",
      text: "",
      isOpen: false,
      isOpenCreate: false,
      dialog: false,
      name: "",
      take: 10,
      page: 1,
      showText: "",
      pageLength: 1,
      productList: [],
    };
  },
  methods: {
    async getProducts() {
      this.dialog = true;
      const product = await getProducts(this.name, this.page - 1, this.take);
      this.productList = product.data;
      this.pageLength = parseInt(product.count / this.take);
      if (this.pageLength == 0) this.pageLength = 1;
      this.dialog = false;
    },
    remove(productId) {
      this.text = "Do you want to remove";
      this.isOpen = true;
      this.productId = productId;
    },
    edit(productId, productName) {
      this.productId = productId;
      this.productName = productName;
      this.isOpenCreate = true;
      this.info = "Edit";
    },
    add() {
      this.info = "Add";
      this.productId = null;
      this.productName = null;
      this.isOpenCreate = true;
    },
    async closeOpen() {
      this.isOpen = false;
      this.isOpenCreate = false;
      await getProducts(this.name, this.page - 1, this.take);
    },
    async searchProduct() {
      const product = await getProducts(this.name, this.page - 1, this.take);
      this.productList = product.data;
      this.pageLength = 1;
      this.page = 1;
    },
  },
};
</script>
