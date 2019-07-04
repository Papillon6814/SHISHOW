<template>
  <div id="root">
    <navi></navi>
    <div id="notificationField">
      <div v-for="N in 30" :key="N" v-bind:class="'not'+N">
        <notificationBanner></notificationBanner>
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

  body {
    padding: 0;
    margin: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    background-color: $dark_color;
  }

  #notificationField {
    position: absolute;

    top: 150px;
    left: 5%;

    width: 90%;
    height: 80%;

    background-color: #fff;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);

    overflow-y: scroll;
    overflow-x: hidden;



    .not1{
    }
    $i: 2;
    @while $i<=30 {
      .not#{$i}{
        padding-top: $not_banner_height;
      }
      $i: $i + 1;
    }
  }
  #notificationField::webkit-scrollbar{
    display: none;
  }
</style>
