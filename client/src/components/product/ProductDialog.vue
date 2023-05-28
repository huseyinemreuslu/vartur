<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ showText }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  class="mx-2"
                  v-model="productName"
                  label="Product Name"
                  variant="outlined"
                  rows="1"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close()">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { createProduct, updateProduct } from "@/util/request";

export default {
  props: ["dialog", "name", "info", "id"],
  computed: {
    showDialog() {
      return this.dialog;
    },
    showText() {
      return this.info;
    },
    getProductName() {
      return this.name;
    },
    getProductId() {
      return this.id;
    },
  },
  watch() {
    this.name((old) => {
      this.productName = old;
    });
  },
  data() {
    return {
      productName: this.name,
      productId: this.id,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      if (this.getProductId) {
        await updateProduct(this.getProductName, this.getProductId);
      } else {
        await createProduct(this.productName);
      }
      this.$emit("close");
    },
  },
};
</script>
