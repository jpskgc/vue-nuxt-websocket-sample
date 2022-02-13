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

<script>
export default {
  name: 'ChatPage',
  data () {
    return {
      text: '',
      messages: [],
      socket: new WebSocket('ws://localhost:8080')
    }
  },
  mounted () {
    this.socket.onopen = () => console.log('socket connected')
    this.socket.onmessage = (event) => {
      if (!event.data) { return }
      const message = event.data
      this.messages.push(message)
    }
  },
  methods: {
    onSend () {
      if (!this.text) {
        return
      }
      this.socket.send(this.text)
      this.text = ''
    }
  }
}
</script>
