<template>
  <nav id="tabs">
    <ul class="tab-list flex w-full h-full">
      <router-link
        tag="li"
        v-for="tab in tabs"
        :key="tab.id"
        :to="tab.location"
        class="tab-item flex-1 flex justify-center items-center"
      >
        <span class="item-link-name">{{ tab.name }}</span>
      </router-link>
    </ul>
  </nav>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'Tabs',
  data() {
    return {
      tabs: [
        {
          id: uuidv4(),
          name: '推荐',
          location: '/recommendations'
        },
        {
          id: uuidv4(),
          name: '歌手',
          location: '/singers'
        },
        {
          id: uuidv4(),
          name: '排行榜',
          location: '/toplist'
        },
        {
          id: uuidv4(),
          name: '搜索',
          location: '/search'
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
  .tab-item {
    &.router-link-active {
      .item-link-name {
        color: $color-theme-yellow;
        border-bottom: 2px solid $color-theme-yellow;
      }
    }

    .item-link-name {
      padding-bottom: 5px;
      color: $color-text-light;
      font-size: $font-size-md;
    }
  }
}
</style>
