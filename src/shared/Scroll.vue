<template>
  <div id="scroll" ref="wrapper">
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
      console.info('TEST Leo --- Ready To Refresh Scroll')
      this.scroll && this.scroll.refresh()
    }
  },
  watch: {
    scrollData(newValue) {
      if (newValue.length > 0) {
        console.info('TEST Leo --- Receive Scroll Data:', newValue)
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
#scroll {
  width: 100%;
  height: 100%;
}
</style>
