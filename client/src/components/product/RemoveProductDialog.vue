<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> Info </v-card-title>
        <v-card-text>{{ showText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="close()">
            Cancel
          </v-btn>
          <v-btn color="green-darken-1" variant="text" @click="remove">
            Remove
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { removeProduct } from "@/util/request";

export default {
  props: ["dialog", "info", "id"],
  computed: {
    showDialog() {
      return this.dialog;
    },
    showText() {
      return this.info;
    },
    getProductId() {
      return this.id;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async remove() {
      this.$emit("close");
      await removeProduct(this.getProductId);
    },
  },
};
</script>
