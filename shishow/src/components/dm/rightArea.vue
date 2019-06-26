<template>
  <div class="rightArea">
    <div v-for="msg in msgList" v-bind:key="msg.id">
      <div class="chatBubble">
        <ul>
          <li>{{msg.msg}}</li>
          <!--日付の変換-->
          <li>{{msg.date.toDate().toLocaleString()}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../../plugin/firestore";
import 'firebase/firestore'
import '@firebase/auth'
import store from '../../store'

const db = firebase.firestore();

let currentUser;

export default {
  name: 'rightArea',

  data() {
    return {
      msgList: ''
    }
  }
};
</script>

<style lang='scss' scoped>
.rightArea {
  position: absolute;

  top: 0;
  right: 0;

  width: 55%;
  height: calc(100% - 50px);

  background-color: $theme_color_dm;

  overflow-y: scroll;

  .chatBubble {
    display: block;

    width: 450px;
    height: auto;

    // temporary color
    background-color: #fff;
  }
}

li {
  list-style: none;
}
</style>
