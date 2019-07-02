<template>
  <div>
    <navi></navi>
    <!-- とりあえずクエリしたデータを表示したい -->
  </div>
</template>


<script>
import navi from "../components/NavigationBar.vue";

export default {
  name: "globalChat",
  components: {
    navi
  },
  //クエリしたデータを入れる変数
  data: function() {}
  //チャットのデータベースからデータを取得
};
</script>

<style>
</style>
