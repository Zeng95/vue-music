<template>
  <nav id="tabs">
    <ul class="tab-list flex">
      <router-link
        tag="li"
        v-for="tab in tabs"
        :key="tab.name"
        class="tab-item flex-1 text-center"
        :to="tab.location"
      >
        <span class="item-name">{{ tab.name }}</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {
      tabs: [
        {
          location: '/recommendation',
          name: '推荐'
        },
        {
          location: '/singer',
          name: '歌手'
        },
        {
          location: '/toplist',
          name: '排行榜'
        },
        {
          location: '/search',
          name: '搜索'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#tabs {
  height: 44px;
  line-height: 44px;
  .tab-item {
    &.router-link-active {
      .item-name {
        color: $color-theme-yellow;
        border-bottom: 2px solid $color-theme-yellow;
      }
    }

    .item-name {
      padding-bottom: 5px;
      color: $color-text-light;
    }
  }
}
</style>
