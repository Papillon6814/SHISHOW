<template>
  <div id="root">
    <navi></navi>
    <div id="notificationField">
      <div> 
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
