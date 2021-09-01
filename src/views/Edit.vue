<template>
  <div class="container">
    <router-link :to="{ name: 'Home' }">Back</router-link>

    <v-progress v-if="!note && !loadingNoteError" />

    <v-alert v-if="loadingNoteError || changeNoteError">Error</v-alert>
    <v-alert v-if="changeNoteSuccess" type="success">Note was changed</v-alert>

    <template v-if="note">
      <v-progress v-if="changeNoteFetching" />
      <div class="edit__actions">
        <div class="edit__undo-redo">
          <v-undo-redo-button
            type="undo"
            :disabled="historyPosition === 0 || isFetching"
            @click="undo"
            >Back</v-undo-redo-button
          >
          <v-undo-redo-button
            type="redo"
            :disabled="historyPosition === history.length - 1 || isFetching"
            @click="redo"
            >Next</v-undo-redo-button
          >
        </div>

        <ul class="edit__save">
          <li>
            <v-button @click="saveNote" :disabled="isFetching">Save</v-button>
          </li>
          <li>
            <v-button @click="cancelChanges" :disabled="isFetching">Cancel</v-button>
          </li>
        </ul>
      </div>
      <note-item
        v-if="note"
        :value="note"
        :editable="true"
        :disabled="isFetching"
        @delete="confirmDeletionNote"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { cloneDeep } from "../shared/utils";
import VButton from "../components/UI/VButton/VButton.vue";
import VUndoRedoButton from "../components/UI/VUndoRedoButton/VUndoRedoButton.vue";
import VProgress from "../components/UI/VProgress/VProgress";
import VAlert from "../components/UI/VAlert/VAlert";
import NoteItem from "../components/NoteItem/NoteItem";

export default {
  name: "Edit",
  components: {
    VButton,
    VUndoRedoButton,
    VProgress,
    VAlert,
    NoteItem,
  },
  data() {
    return {
      // true if note wasn't loaded
      loadingNoteError: false,
      // true if note is being saved
      changeNoteFetching: false,
      // true if note wasn't changed
      changeNoteError: null,
      // true if note was changed
      changeNoteSuccess: false,
      // current note model
      note: null,
      // note history changes
      history: [],
      // current history position
      historyPosition: 0,
      // true, if undo / redo button was clicked
      // if value is true note will not be saved to the change history
      skipSaveNote: false,
    };
  },
  computed: {
    /*
     * Clone note object to avoid memory leak
     * */
    cloneNote() {
      if (this.note === null) {
        return this.note;
      }
      return cloneDeep(this.note);
    },
    ...mapState({
      isFetching: (state) => state.todo.isFetching,
    }),
  },
  watch: {
    /**
     * Watch all note changes to save it to the history changes
     */
    cloneNote: {
      handler(value) {
        this.changeNoteSuccess = false;

        /*
         * Don't save if skipSaveNote is true
         * That is undo/redo button was clicked
         * */
        if (this.skipSaveNote) {
          this.skipSaveNote = false;
          return;
        }
        this.history = this.history.slice(0, this.historyPosition + 1);
        this.history.push(value);
        this.historyPosition = this.history.length - 1;
      },
    },
  },
  mounted() {
    /**
     * Get notes from our storage
     */
    this.getNote(Number(this.$route.params.noteId))
      .then((node) => {
        this.note = node;
      })
      .catch((Error) => {
        this.loadingNoteError = Error;
      });
  },
  methods: {
    undo() {
      if (this.historyPosition > 0) {
        this.skipSaveNote = true;
        this.historyPosition -= 1;
        this.note = cloneDeep(this.history[this.historyPosition]);
      }
    },
    redo() {
      if (this.historyPosition < this.history.length - 1) {
        this.skipSaveNote = true;
        this.historyPosition += 1;
        this.note = cloneDeep(this.history[this.historyPosition]);
      }
    },
    saveNote() {
      this.changeNoteFetching = true;
      this.changeNoteError = null;
      this.changeNoteSuccess = false;
      this.editNote(this.note)
        .then(() => {
          this.changeNoteSuccess = true;
        })
        .catch((Error) => {
          this.changeNoteError = Error;
        })
        .finally(() => {
          this.changeNoteFetching = false;
        });
    },
    cancelChanges() {
      this.$confirm({
        text: "Do you really want to cancel your changes?",
        buttons: {
          yes: {
            text: "Yes",
            callBack: () => this.$router.push({ name: "Home" }),
          },
          no: {
            text: "No",
          },
        },
      });
    },
    confirmDeletionNote() {
      this.$confirm({
        text: "Do you really want to delete this todo?",
        buttons: {
          yes: {
            text: "Yes",
            callBack: () =>
              this.deleteNote(this.note.id).then(() => this.$router.push({ name: "Home" })),
          },
          no: {
            text: "No",
            callBack: null,
          },
        },
      });
    },
    ...mapActions({
      getNote: "todo/getNote",
      editNote: "todo/editNote",
      deleteNote: "todo/deleteNote",
    }),
  },
};
</script>

<style lang="scss" scoped>
.edit__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
.edit__save {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: right;
  display: flex;
  & > li {
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
