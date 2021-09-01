<template>
  <div>
    <ul class="todo-list">
      <todo-item
        v-for="(item, index) in limitedTodosSlice"
        :key="item.id"
        :read-only="readOnly"
        :disabled="disabled"
        v-model="limitedTodosSlice[index]"
        @delete="deleteTodo"
      />
    </ul>
    <div v-if="value.length > limitedTodos" class="todo-list__rest">and other...</div>
    <div v-if="!readOnly" class="todo-list__add">
      <VButton :disabled="disabled" theme="text" @click="addTodo">Add</VButton>
    </div>
  </div>
</template>

<script>
import { createUniqueId } from "../../shared/utils";
import TodoItem from "../TodoItem/TodoItem";
import VButton from "../UI/VButton/VButton";
export default {
  name: "TodoList",
  components: { TodoItem, VButton },
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limitedTodos: {
      type: Number,
      default: Infinity,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    limitedTodosSlice() {
      return this.value.slice(0, this.limitedTodos);
    },
  },
  methods: {
    addTodo() {
      this.value.push({
        text: "",
        completed: false,
        id: createUniqueId((newId) => this.value.id !== newId),
      });
    },
    deleteTodo(todo) {
      if (this.value.length > 1) {
        this.$emit(
          "input",
          this.value.filter((todoItem) => todoItem.id !== todo.id)
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  list-style: none;
  padding: 0px;
  margin: 0;
}

.todo-list__rest {
  padding: 20px;
  padding-left: 60px;
  border-bottom: 1px solid var(--border-color);
  font-weight: 600;
}
.todo-list__add {
  padding-left: 41px;
}
</style>
