import { createUniqueId } from "../shared/utils";
import storage from "../storage";

const moduleTodo = {
  namespaced: true,
  state: () => ({
    notes: [],
    // true if processing some actions
    isFetching: false,
  }),
  mutations: {
    SET_NOTES(state, newNote) {
      state.notes = newNote;
    },
    SET_FETCHING_STATUS(state, status) {
      state.isFetching = status;
    },
  },
  actions: {
    /**
     * Get all notes
     * @param commit
     * @returns {Promise<unknown>}
     */
    getAllNotes({ commit }) {
      commit("SET_FETCHING_STATUS", true);
      return storage
        .get("notes")
        .then((notes) => {
          commit("SET_NOTES", notes);
          return notes;
        })
        .catch(() => {
          return storage.add("notes", []);
        })
        .finally(() => {
          commit("SET_FETCHING_STATUS", false);
        });
    },

    /**
     * Add new note
     * @param commit
     * @param state
     * @param newNote
     * @returns {Promise<unknown>}
     */
    addNote({ commit, state }, newNote) {
      if (state.isFetching) {
        return;
      }

      commit("SET_FETCHING_STATUS", true);

      return storage
        .get("notes")
        .then((notes) => {
          const newNoteId = createUniqueId(
            (newId) => newId !== notes.find((note) => note.id !== newId)
          );
          notes.unshift({ ...newNote, id: newNoteId });
          return storage.addOrReplace("notes", notes).then((notesAfterAdd) => {
            commit("SET_NOTES", notesAfterAdd);
          });
        })
        .finally(() => {
          commit("SET_FETCHING_STATUS", false);
        });
    },

    /**
     * Delete note by note id
     * @param commit
     * @param state
     * @param noteId
     * @returns {Promise<unknown>}
     */
    deleteNote({ commit, state }, noteId) {
      if (state.isFetching) {
        return;
      }

      commit("SET_FETCHING_STATUS", true);
      return storage
        .get("notes")
        .then((notes) => {
          const filteredNotes = notes.filter((note) => note.id !== noteId);
          return storage.addOrReplace("notes", filteredNotes).then((notesAfterAdd) => {
            commit("SET_NOTES", notesAfterAdd);
          });
        })
        .finally(() => {
          commit("SET_FETCHING_STATUS", false);
        });
    },

    /**
     * Get note by note id
     * @param commit
     * @param state
     * @param nodeId
     * @returns {Promise<unknown>}
     */
    getNote({ commit, state }, nodeId) {
      if (state.isFetching) {
        return;
      }

      commit("SET_FETCHING_STATUS", true);
      return storage
        .get("notes")
        .then((notes) => {
          const foundNote = notes.find((note) => note.id === nodeId);
          if (foundNote) {
            return foundNote;
          }
          return Promise.reject(new Error("Note wasn't found"));
        })
        .finally(() => {
          commit("SET_FETCHING_STATUS", false);
        });
    },

    /**
     * Replace note by new note
     * @param commit
     * @param state
     * @param note
     * @returns {Promise<unknown>}
     */
    editNote({ commit, state }, note) {
      if (state.isFetching) {
        return;
      }
      commit("SET_FETCHING_STATUS", true);
      return storage
        .get("notes")
        .then((notes) => {
          const foundNote = notes.findIndex((noteItem) => noteItem.id === note.id);
          if (foundNote !== -1) {
            notes[foundNote] = note;
            return storage.addOrReplace("notes", notes).then((notesAfterAdd) => {
              commit("SET_NOTES", notesAfterAdd);
            });
          }
          return Promise.reject(new Error("Note wasn't found"));
        })
        .finally(() => {
          commit("SET_FETCHING_STATUS", false);
        });
    },
  },
};

export default moduleTodo;
