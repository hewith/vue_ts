import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
      {
        text: "ts测试111111",
        complete: false,
      },
      {
        text: "ts测试222222",
        complete: false,
      },
    ],
  },
  mutations: {
    addTodoList(state, item) {
      state.todoList.push(item);
    },
    updateTodoList(state, { index, content }) {
      state.todoList[index].text = content;
    },
    todoItemComplete(state, index) {
      state.todoList[index].complete = !state.todoList[index].complete;
    },
  },
  actions: {},
  modules: {},
});
