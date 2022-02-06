<template>
  <div>
    <v-text-field
      v-model="text"
      label="text here"
    />
    <v-btn
      color="success"
      @click="onSend"
    >
      Send
    </v-btn>
    <v-list>
      <v-list-item v-for="(message, i) in messages" :key="i">
        {{ message }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ChatPage',
  data: () => ({
    text: '',
    messages: ['test', 'test1']
  }),
  mounted: () => {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => console.log('socket connected')
  },
  methods: {
    async onSend () {
      const res = await this.$axios.$get('http://localhost:3000/test')
      console.log(res)
    }
  }
}
</script>
