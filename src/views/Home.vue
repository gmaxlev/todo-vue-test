<template>
  <div class="container">
    <div v-if="!notesWasLoaded || notesLoadingError !== null" class="container">
      <v-progress v-if="!notesWasLoaded && notesLoadingError === null" />
      <v-alert v-if="notesLoadingError !== null">Error</v-alert>
    </div>
    <template v-if="notesWasLoaded">
      <div class="creator">
        <h2>Create note</h2>
        <note-creator />
      </div>
      <h2>Your notes</h2>
      <p v-if="!notes.length">Empty :(</p>
      <notes-list v-if="notes.length" :disabled="notesIsFetching" v-model="notes" />
    </template>
  </div>
</template>

<script>
import NoteCreator from "../components/NoteCreator/NoteCreator.vue";
import NotesList from "../components/NotesList/NotesList.vue";
import VProgress from "../components/UI/VProgress/VProgress";
import VAlert from "../components/UI/VAlert/VAlert";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: { NoteCreator, NotesList, VProgress, VAlert },
  data() {
    return {
      notesWasLoaded: false,
      notesLoadingError: null,
    };
  },
  computed: {
    ...mapState({
      notes: (state) => state.todo.notes,
      notesIsFetching: (state) => state.todo.isFetching,
    }),
  },
  mounted() {
    this.getAllNotes()
      .then(() => {
        this.notesWasLoaded = true;
      })
      .catch((Error) => {
        console.error(Error);
        this.notesLoadingError = Error;
      });
  },
  methods: {
    ...mapActions({
      getAllNotes: "todo/getAllNotes",
    }),
  },
};
</script>

<style lang="scss" scoped>
.creator {
  margin-bottom: 20px;
}
</style>
