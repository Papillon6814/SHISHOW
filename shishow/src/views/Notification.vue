<template>
  <div id="root">
    <navi></navi>
    <div id="notificationField">
      <span v-if="!notice.length" class="no_notification">no notification</span>
      <div v-if="notice.length">
      <div v-for="N in notice.length" 
      :key="N" 
      v-bind:class="'not'+N">
      
        <notificationBanner 
        :user="users[N-1]" 
        :notice="notice[N-1]">
        </notificationBanner>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import navi from '../components/NavigationBar.vue'
import notificationBanner from '../components/NotificationBanner.vue'
import firebase from '../plugin/firestore'
import 'firebase/firestore'

const db = firebase.firestore();

export default {
  name: 'home',
  components: {
    navi,
    notificationBanner
  },
  data:function(){
    return{
      notice:[],
      users:[],
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn;
    }
  },
  created:function(){
    db.collection("USER").doc(this.user.email).collection("notice").orderBy("date").get().then(querydocs=>{
      querydocs.forEach(docu=>{
        this.notice.push(docu.data());
        db.collection("USER").doc(docu.id).get().then(doc=>{
          this.users.push(doc.data());
        })
      })
    })

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

    $i: 2;
    @while $i<=30 {
      .not#{$i}{
        padding-top: $not_banner_height + 1.2px;
      }
      $i: $i + 1;
    }
  }
  #notificationField::webkit-scrollbar{
    display: none;
  }

  .no_notification{
    position: relative;
    top:250px;
    font-size: 130px;
    color:rgba(122,122,122,122)
  }

</style>
