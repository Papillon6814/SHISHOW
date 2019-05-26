<template>
  <div id="navigationMenu">

  </div>
</template>

<style lang="scss">
  $header_color: #ff6f61;
  $dark_color: #104f58;
  $footer_color: #23272a;
  $banner_color: #137480;
  //上の4つの変数はサイトの基本的な4色

  $header_height: 100px;

  body {
    margin: 0;
    padding: 0;
    background-color: $dark_color;
  }

  #navigationMenu {
    position: absolute;

    padding: 0;

    top: 0;
    left: 0;

    width: 100%;
    height: $header_height;

    background-color: $header_color;
  }
</style>
