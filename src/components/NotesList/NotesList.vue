<template>
  <div class="notes-list">
    <div v-for="(item, index) of value" :key="item.id" class="notes-list__item">
      <note-item
        v-model="value[index]"
        :limited-todos="5"
        :read-only="true"
        :disabled="disabled"
        :show-edit-link="true"
        @delete="confirmDeleteNote"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NoteItem from "../NoteItem/NoteItem";

export default {
  name: "NotesList",
  components: { NoteItem },
  props: {
    value: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState({
      isFetching: (state) => state.todo.isFetching,
    }),
  },
  methods: {
    confirmDeleteNote(deletedNote) {
      this.$confirm({
        text: "Do you really want to delete this note?",
        buttons: {
          yes: {
            text: "Yes",
            callBack: () => this.deleteNote(deletedNote.id),
          },
          no: {
            text: "No",
            callBack: null,
          },
        },
      });
    },
    ...mapActions({
      deleteNote: "todo/deleteNote",
    }),
  },
};
</script>

<style lang="scss" scoped>
.notes-list__item {
  margin-bottom: 20px;
}
</style>
