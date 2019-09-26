<template>
  <div id="root">
    <input type="file" id="icon" @change="onFileChange"
      refs="file">
    <div class="button" @click="click()">
      upload
    </div>
  </div>
</template>

<script>
import firebase from "../plugin/firestore";
import 'firebase/firestore';
import '@firebase/auth';
import store from '../store';

import axios from 'axios';

const db = firebase.firestore();
var dataUri;

export default {
  name: 'uploader',

  data: function() {
    return {
      image: ''
    }
  },

  methods: {
    onAuth: function() {
      firebase.auth().onAuthStateChanged(user => {
        user = user ? user : {};
        store.commit('onAuthStateChanged', user);
        store.commit('onUserStatusChanged', user.uid ? true : false);
      })
    },

    onFileChange: function(e) {
      var file = e.target.files[0];

      var reader = new FileReader();
      reader.onload = function() {
        dataUri = this.result;
      }

      reader.readAsDataURL(file);
    },

    click: function () {
      let url = 'https://thawing-earth-80470.herokuapp.com/image'

      let params = new URLSearchParams();
      params.append('image', dataUri)

      axios.post(url, params, {
        'Content-Type': 'multipart/form-data'
      })
      .then(res => {
        //do nothing
      })
    }
  },

  created: function () {
    this.onAuth();
  }
}

</script>

<style lang="scss" scoped>
.button {
  width: 300px;
  height: 100px;

  background-color: #bd40a1;

  cursor: pointer;
}
</style>
