<template>
  <div>
    <div v-if="entriesData.length > 0">
      <table>
        <thead>
        <tr>
          <th>Select</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Gender</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(entry, index) in entriesData" :key="index">
          <td><input type="checkbox" v-model="entry.selected" /></td>
          <td>{{ entry.username }}</td>
          <td>{{ entry.email }}</td>
          <td>{{ entry.phone }}</td>
          <td>{{ entry.gender }}</td>
          <td>
            <button @click="duplicateRow(index)">Duplicate</button>
            <button @click="deleteRow(index)">Delete</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button @click="deleteSelectedRows">Delete Selected</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserTable',
  props: {
    entries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      entriesData: JSON.parse(JSON.stringify(this.entries)),
    };
  },
  watch: {
    entries: {
      handler(newEntries) {
        this.entriesData = JSON.parse(JSON.stringify(newEntries));
      },
      deep: true,
    },
  },
  methods: {
    duplicateRow(index) {
      const entryToDuplicate = { ...this.entriesData[index], selected: false };
      this.entriesData.splice(index + 1, 0, entryToDuplicate);
      this.emitEntriesUpdate();
    },
    deleteRow(index) {
      this.entriesData.splice(index, 1);
      this.emitEntriesUpdate();
    },
    deleteSelectedRows() {
      this.entriesData = this.entriesData.filter(entry => !entry.selected);
      this.emitEntriesUpdate();
    },
    emitEntriesUpdate() {
      this.$emit('update:entries', this.entriesData);
    },
  },
};
</script>
