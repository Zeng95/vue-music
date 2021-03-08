<template>
  <div class="scroll-wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return false
      }

      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // Scroll the contents to the specified dom element
    scrollToElement() {
      console.info('Test Leo - receive arguments:', arguments)
      console.info('------')
      this.scroll && this.scroll.scrollToElement(...arguments)
    }
  },
  mounted() {
    console.info('Test Leo - ready to init scroll')
    this.$forceNextTick(() => this.initScroll())
  }
}
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
