<template>
  <div class="about">
    <p
      v-for="(item, index) in list"
      :key="`todo_item_${index}`"
      :style="{textDecoration: item.complete ? 'line-through' : ''}">{{ item.text }}</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";

import { Item } from '../types/vue-ts-todo-item';

@Component({
  name: "About",
})
export default class About extends Vue {
  @State("todoList") private list!: Array<Item>;
}
</script>

<style lang="scss"></style>
