<template>
  <div id="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
      <ul>
        <li>{{msg.msg}}</li>
        <!--日付の変換-->
        <li>{{msg.date.toDate().toLocaleString()}}</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'rightArea'
};
</script>

<style lang='scss' scoped>
#rightArea {
  position: absolute;
  margin: 0 auto;

  top: 0;
  right: 0;

  width: 55%;
  height: calc(100% - 50px);

  background-color: $theme_color_dm;

  overflow-y: scroll;
}

li {
  list-style: none;
}
</style>
