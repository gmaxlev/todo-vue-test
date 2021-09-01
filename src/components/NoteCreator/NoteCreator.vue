<template>
  <div>
    <note-item
      v-model="created"
      :can-edit="true"
      :can-todo-edit="true"
      :can-todo-delete="true"
      :disabled="noteSavingIsFetching || todoIsFetching"
    />
    <v-progress v-if="noteSavingIsFetching" />
    <Alert v-if="noteSavingError">Error</Alert>
    <div class="note-creator__save">
      <v-button :disabled="noteSavingIsFetching || todoIsFetching" @click="submit">Save</v-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VButton from "../UI/VButton/VButton.vue";
import VProgress from "../UI/VProgress/VProgress";
import Alert from "../UI/VAlert/VAlert";
import NoteItem from "../NoteItem/NoteItem";

export default {
  name: "NoteCreator",
  components: {
    VButton,
    VProgress,
    Alert,
    NoteItem,
  },
  data() {
    return {
      noteSavingIsFetching: false,
      noteSavingError: false,
      created: {
        name: "",
        todo: [
          {
            text: "",
            completed: false,
            id: Math.random(),
          },
        ],
      },
    };
  },
  computed: {
    ...mapState({
      todoIsFetching: (state) => state.todo.isFetching,
    }),
  },
  methods: {
    reset() {
      this.created = {
        name: "",
        todo: [
          {
            text: "",
            completed: false,
            id: Math.random(),
          },
        ],
      };
    },
    submit() {
      this.noteSavingIsFetching = true;
      this.noteSavingError = false;
      this.addNote(this.created)
        .then(() => {
          this.reset();
        })
        .catch((Error) => {
          this.noteSavingError = Error;
        })
        .finally(() => {
          this.noteSavingIsFetching = false;
        });
    },
    ...mapActions({
      addNote: "todo/addNote",
    }),
  },
};
</script>

<style lang="scss" scoped>
.note-creator__save {
  margin-top: 20px;
  text-align: right;
}
</style>
