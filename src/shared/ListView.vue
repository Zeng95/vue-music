<template>
  <div id="list-view">
    <!-- List 歌手列表 -->
    <div class="list-group">
      <ol>
        <li v-for="item in groupList" :key="item.title" class="list-group-item">
          <!-- 标题 -->
          <h2 class="title">{{ item.title }}</h2>
          <!-- 歌手 -->
          <ul class="singers">
            <li
              v-for="singer in item.singers"
              :key="singer.id"
              class="singer flex items-center"
            >
              <div class="avatar">
                <img
                  v-lazy="singer.avatar"
                  alt="singer avatar"
                  class="rounded-full h-full"
                />
              </div>
              <span class="name">{{ singer.name }}</span>
            </li>
          </ul>
        </li>
      </ol>
    </div>
    <!-- IndexBar 索引栏 -->
    <div class="index-bar absolute">
      <ol>
        <li v-for="item in indexList" :key="item" class="index">
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    groupList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    indexList() {
      // returns the array of results
      let result = this.groupList.map(item => {
        return item.title.slice(0, 1)
      })

      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#list-view {
  .list-group-item {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: $font-size-sm;
      color: $color-text-light;
      background: $color-highlight-background;
    }

    .singer {
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
      }

      .name {
        margin-left: 20px;
        color: $color-text-light;
        font-size: $font-size-md;
      }
    }
  }

  .index-bar {
    top: 50%;
    right: 0;
    transform: translate3d(0, -50%, 0);
    width: 20px;
    text-align: center;
    background: $color-background-dark;
    font-family: Helvetica;
    .index {
      padding: 3px;
      font-size: $font-size-sm;
      color: $color-text-light;
    }
  }
}
</style>
