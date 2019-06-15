<template>
  <div id="inputBar">
    <div class="smileEmojiPlace">
      <i class="fas fa-smile"></i>
    </div>
    <input type="text" class="inputText" />
    <div class="checkEmojiPlace">
      <i class="fas fa-check"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'inputArea'
  }
</script>

<style lang='scss'>
  #inputBar {
    width: 100%;
    height: 100%;;

    background-color: #ddddff;

    .smileEmojiPlace {
      position: absolute;

      left: 3px;
      top: 5px;

      font-size: 40px;
    }

    .inputText {
      position: absolute;

      left: 45px;
      top: 10px;

      width: 300px;
      height: 30px;
    }

    .checkEmojiPlace {
      position: absolute;

      left: 355px;
      top: 5px;

      font-size: 40px;
    }
  }
</style>
