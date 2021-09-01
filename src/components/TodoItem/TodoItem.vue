<template>
  <li class="todo-item__item">
    <div class="todo-item__completed">
      <v-checkbox-completed v-model="value.completed" :read-only="readOnly" :disabled="disabled" />
    </div>
    <div class="todo-item__name">
      <template v-if="readOnly">{{ value.text }}</template>
      <input
        v-else
        type="text"
        v-model="value.text"
        placeholder="..."
        class="todo-item__inputText"
        :disabled="disabled"
      />
    </div>
    <div v-if="!readOnly" class="todo-item__delete">
      <v-button-delete :disabled="disabled" @click="$emit('delete', value)" />
    </div>
  </li>
</template>

<script>
import VCheckboxCompleted from "../UI/VCheckboxCompleted/VCheckboxCompleted";
import VButtonDelete from "../UI/VButtonDelete/VButtonDelete";
export default {
  name: "TodoItem",
  components: { VCheckboxCompleted, VButtonDelete },
  props: {
    value: {
      type: Object,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-item__item {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
}
.todo-item__completed {
  margin-right: 20px;
}
.todo-item__name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.todo-item__inputText {
  background-color: transparent;
  border: 0;
  outline: none;
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}
.todo-item__delete {
  margin-left: 20px;
}
</style>
