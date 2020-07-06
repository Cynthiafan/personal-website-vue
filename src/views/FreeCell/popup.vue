<template lang="pug">
  div.popup
    div.popup__container
      div.cancel(v-show="config.mood !== 'joy'" @click="$emit('close')") &times;
      img.mood(:src="moodImage")
      div.title {{ config.title || title }}
      div.content {{ config.content || content }}
      div.btn(v-if="config.buttons.length || buttons.length")
        button(v-for="btn in (config.buttons || buttons)" :key="btn.text" @click="$emit(btn.action)") {{ btn.text }}
</template>
<script>
import { king } from './image-binary';

export default {
  data() {
    return {
      king,
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          mood: '',
          title: '',
          content: '',
          buttons: [],
        };
      },
    },
    mood: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    buttons: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    moodImage() {
      return this.mood || this.config.mood ? this.king[this.config.mood || this.mood] : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100vw;
  height: 100vh;
  background: rgba($fc-black, 0.7);
  color: $fc-black;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 15;
  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: $fc-lightgray;
    width: 80%;
    max-width: 600px;
    border-radius: 10px;
    padding: 50px 60px;
    text-align: center;
    .cancel {
      position: absolute;
      right: 20px;
      top: 10px;
      font-size: 40px;
      color: $fc-black;
      cursor: pointer;
    }
    .mood {
      width: 60px;
      margin-bottom: 15px;
    }
    .title {
      letter-spacing: 2px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .content {
      font-size: 14px;
      margin-bottom: 50px;
    }
    .btn {
      button {
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
