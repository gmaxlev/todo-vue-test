<template>
  <button class="undo-redo-button" @click="$emit('click')">
    <template v-if="type === 'redo'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.697 20.697">
        <path
          d="M.358 16.978A.447.447 0 010 16.542c0-7.253 8.61-8.798 10.61-9.059V4.155c0-.164.09-.314.235-.393a.451.451 0 01.456.024l9.202 6.194a.442.442 0 01.194.369.442.442 0 01-.194.366l-9.197 6.193a.446.446 0 01-.693-.371v-3.58c-1.447.009-2.645.073-3.642.193-4.785.567-6.064 3.44-6.116 3.563a.447.447 0 01-.41.271c-.03.002-.06 0-.087-.006z"
        />
      </svg>
    </template>
    <template v-if="type === 'undo'">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.676 26.676">
        <path
          d="M26.105 21.891a.568.568 0 01-.529-.346c-.066-.156-1.716-3.857-7.885-4.59-1.285-.156-2.824-.236-4.693-.25v4.613a.574.574 0 01-.304.508.577.577 0 01-.588-.033L.254 13.815a.573.573 0 010-.953l11.857-7.979a.563.563 0 01.588-.029c.19.102.303.295.303.502v4.293c2.578.336 13.674 2.33 13.674 11.674a.574.574 0 01-.459.562c-.037.006-.076.006-.112.006z"
        />
      </svg>
    </template>
  </button>
</template>

<script>
export default {
  name: "VUndoRedoButton",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.undo-redo-button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
  transition: opacity var(--transition-time);
  &:disabled {
    cursor: default;
    opacity: 0.3;
  }
  &:hover {
    &:not(:disabled) {
      svg {
        fill: var(--color-main---hover);
      }
    }
  }
  svg {
    width: 30px;
    height: 30px;
    fill: var(--color-main);
    transition: fill var(--transition-time);
  }
}
</style>
