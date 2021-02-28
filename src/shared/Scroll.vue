<template>
  <div class="scroll" ref="wrapper">
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
      default: true
    },
    scrollData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      scroll: null
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
      console.info('Test Leo - ready to refresh scroll')
      console.info('------')
      this.scroll && this.scroll.refresh()
    },
    // Scroll the contents to the specified dom element
    scrollToElement() {
      console.info('Test Leo - receive arguments:', arguments)
      console.info('------')
      this.scroll && this.scroll.scrollToElement(...arguments)
    }
  },
  watch: {
    scrollData(newValue) {
      if (newValue.length > 0) {
        console.info('Test Leo - receive scroll data:', newValue)
        setTimeout(() => this.refresh(), 500)
      }
    }
  },
  mounted() {
    this.initScroll()
  }
}
</script>

<style lang="scss" scoped>
.scroll {
  width: 100%;
  height: 100%;
}
</style>
