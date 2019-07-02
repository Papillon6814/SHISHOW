<template>
  <div id="root">
    <navi></navi>
    <div id="notificationField">
      <div v-for="N in 30" :key="N" v-bind:class="'n'+N">
        <notificationBanner></notificationBanner><!--通知された分のみ表示する-->
      </div>
    </div>
  </div>
</template>

<script>

import navi from '../components/NavigationBar.vue'
import notificationBanner from '../components/NotificationBanner.vue'

export default {
  name: 'home',
  components: {
    navi,
    notificationBanner
  }
}
</script>

<style lang='scss'>

$i: 1;
@while $i <= 30 {
  .n#{$i} {
    padding-top: 141px; /* + (200px * $i);*/
    left: 10%;
  }
  $i: $i + 1;
}

  body {
    padding: 0;
    margin: 0;
    width: 100%;
    overflow: hidden;

    background-color: $dark_color;
  }

  #notificationField {
    position: absolute;

    top: 150px;
    left: 5%;

    width: 90%;
    height: 87%;

    background-color: #fff;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);

  }

</style>
