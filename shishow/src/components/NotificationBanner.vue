<template>
  <div id = "notificationBanner">
    <div class="userinfo">
      <i class = "fas fa-user human"></i>
      <img class = "iconPic" :src="user.image">
      <span class="name">{{user.username}}</span>
    </div>

    <div class = "messageInfo">
      <div class="message"> {{notice.msg}} </div>
      <div class="date"> {{notice.date.toDate().toLocaleString()}}</div>
    </div>
  </div>
</template>

<script>



export default {
  name: 'notBanner',
  props:["user","notice"],
}

</script>

<style lang='scss' scoped>
  #notificationBanner {
    position: absolute;

    width: $not_banner_width;
    height: $not_banner_height;

    background-color: #fff;

    border-bottom: solid;
    border-width: 1.2px;
    border-color: #ddd;


  .useringo{
    width: 100%;
  }

  .human{
      position: absolute;

      top: 5px;
      left: 15px;

      font-size: 35px;
  }

  .iconPic {
    position: absolute;

    top: 10px;
    left: 60px;

    width: 50px;
    height: 50px;

    background-color: #fff;
  }

  .name{
    position: absolute;

    top: 23px;
    left: 120px;

    font-size: 33px
  }

  .messageInfo{
    position: absolute;

    width:90%;
    height:40%;

    left:90px;
    bottom:10px;
    background-color: #fff;
  }

  .message{
    width: 100%;
  }

  .date{
    position: relative;
    right: 15px;
    float: right;
  }
}


</style>
