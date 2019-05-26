<template>
  <div id="header"></div>
</template>

<style lang="scss">
  @import url('../../static/scss/ColorSettings.scss');

  $header_color: #ff6f61;
  $dark_color: #104f58;
  $footer_color: #23272a;
  $banner_color: #137480;

  $header_height: 100px;

  #header {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: $header_height;

    background-color: $header_color;
  }
</style>
