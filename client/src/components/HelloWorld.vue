<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer floating permanent>
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Products"
            value="home"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 800px"></v-main>
    </v-layout>
  </v-card>
</template>
