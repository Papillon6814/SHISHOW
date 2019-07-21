<template>
  <div class="popupNormalBanner">
    <div class="closeBtn" @click="fade()">
      <i class="fas fa-times"></i>
    </div>

    <span class="iconPicPosition">
    </span>
  </div>


</template>

<script>

export default {
  name: 'popupNormalBanner',

  methods: {
    fade: function() {
      this.$emit("callFade");
    }
  }
}

</script>

<style lang="scss" scoped>
.popupNormalBanner {
  position: absolute;

  width: 100%;
  height: 380px;

  background-color: $dark_color;

  border-radius: 15px;

  .closeBtn {
    position: absolute;

    top: 10px;
    right: 10px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    cursor: pointer;
  }
}
</style>
