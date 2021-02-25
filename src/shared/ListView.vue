<template>
  <ol id="list-view">
    <li v-for="item in groupList" :key="item.title" class="list-group">
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
  }
}
</script>

<style lang="scss" scoped>
@import '@a/styles/scss/variables';

#list-view {
  .list-group {
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
}
</style>
