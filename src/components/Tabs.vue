<template>
  <nav id="tabs">
    <ul class="tab-list flex w-full h-full">
      <router-link
        tag="li"
        v-for="tab in tabs"
        :key="tab.name"
        :to="tab.location"
        class="tab-item flex-1 flex justify-center items-center leading-none"
      >
        <span class="item-link">{{ tab.name }}</span>
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
          location: '/recommendations',
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
  width: 100%;
  height: 44px;
  line-height: 44px;
  .tab-item {
    &.router-link-active {
      .item-link {
        color: $color-theme-yellow;
        border-bottom: 2px solid $color-theme-yellow;
      }
    }

    .item-link {
      padding-bottom: 5px;
      color: $color-text-light;
      font-size: $font-size-md;
    }
  }
}
</style>
