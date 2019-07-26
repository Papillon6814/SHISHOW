<template>
  <div class="editBanner">
    <div class="closeBtn" @click="close()">
      <i class="fas fa-times"></i>
    </div>

    <input class="username" type="text"
      placeholder="Display name" v-model="username" />

  </div>
</template>

<script>

export default {
  name: "EditBanner",

  data: function() {
    return {
      username: ''
    }
  },

  methods: {
    close: function() {
      this.$emit("close");
    }
  }
}

</script>

<style lang="scss" scoped>
// editBannerPositionに適した形に整形してあります
.editBanner {
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: #fff;

  .closeBtn {
    position: absolute;

    top: 20px;
    right: 20px;

    width: 30px;
    height: 30px;

    font-size: 30px;

    color: $secondary_text;
    cursor: pointer;
  }

  .username {
    position: absolute;

    top: 35%;
    left: 50%;

    transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);

    height: 40px;
    width: 80%;

    font-size: 35px;
  }
}
</style>
