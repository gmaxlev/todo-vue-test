<template>
  <div class="note-item">
    <div class="note-item__header">
      <template v-if="readOnly">{{ value.name }}</template>
      <input
        v-else
        type="text"
        v-model="value.name"
        placeholder="Name"
        :disabled="disabled"
        class="note-item__nameInput"
      />
    </div>
    <todo-list
      v-model="value.todo"
      :limited-todos="readOnly ? 5 : Infinity"
      :read-only="readOnly"
      :disabled="disabled"
    />
    <div
      v-if="showEditLink || value.id !== undefined"
      class="note-item__actions"
      :class="{ 'note-item__actions_one': !showEditLink && value.id !== undefined }"
    >
      <RouterLink
        v-if="showEditLink && value.id !== undefined"
        :to="{ name: 'Edit', params: { noteId: value.id } }"
        >Edit</RouterLink
      >
      <VButton
        v-if="value.id !== undefined"
        :disabled="disabled"
        theme="danger"
        @click="$emit('delete', value)"
        >Delete</VButton
      >
    </div>
  </div>
</template>

<script>
import VButton from "../UI/VButton/VButton";
import TodoList from "../TodoList/TodoList";
export default {
  name: "NoteItem",
  components: { VButton, TodoList },
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
    showEditLink: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.note-item {
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}
.note-item__header {
  background-color: var(--color-main);
  color: var(--color-main-text);
  border-radius: var(--border-radius) var(--border-radius) 0 0;
  padding: 20px;
  font-size: 1.4rem;
  font-weight: 600;
}
.note-item__actions {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &_one {
    justify-content: flex-end;
  }
}

.note-item__nameInput {
  background-color: transparent;
  border: 0;
  outline: none;
  color: var(--color-main-text);
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
  &::placeholder {
    color: #fff;
    opacity: 0.5;
  }
}
</style>
