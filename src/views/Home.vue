<template>
  <div class="home">
    <div>
      <todo-item
        v-for="(item, index) in list"
        :length="list.length"
        :key="`todo_${index}`"
        :item="item"
        :index="index"
        :editting-index="edittingIndex"
        @edit="handleEdit"
        @cancel="handleCancel"
        @save="handleSave"
        @complete="handleComplete"
        @on-add="add"
      ></todo-item>
    </div>

    <!-- <a-button @click="add">增加</a-button> -->
    <a-button @click="goto">跳转</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import TodoItem from "../components/todo-item";

import { Item } from "../types/vue-ts-todo-item";

@Component({
  name: "Home",
  components: {
    TodoItem,
  },
})
export default class Home extends Vue {
  @State("todoList") private list!: Array<Item>;
  @Mutation("updateTodoList") public updateList!: (
    index: number,
    content: string
  ) => void;
  @Mutation("todoItemComplete") public handleComplete!: (index: number) => void;
  @Mutation("addTodoList") public handleAdd!: (item: Item) => void;
  public edittingIndex = -1;

  public goto(): void {
    this.$router.push({
      path: "/about",
    });
  }

  public handleEdit(callIndex: number) {
    this.edittingIndex = callIndex;
  }

  public handleCancel() {
    this.edittingIndex = -1;
  }

  public handleSave(index: number, content: string) {
    this.updateList(index, content);
    this.handleCancel();
  }

  public add(item: Item) {
    if(!item.text.trim()){
      alert("请输入内容");
      return false;
    }
    this.handleAdd(item);
  }
}
</script>
