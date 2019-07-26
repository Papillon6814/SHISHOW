<template>
    <div>
        <textarea v-model="bio" name="freeans" rows="4" cols="40"></textarea>

        <router-link to="/">
        <div class="refresh" type="button" @click="txtchange()">更新</div>
        </router-link>
        <input class="email" v-model="username" name="username">
    </div>
</template>
<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
    name: "Edit",

    data: function(){
        return{
            bio: "bio",
            username: ""
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        userStatus() {
            return this.$store.getters.isSignedIn;
        },

        getCurrentUserName: function() {
            return this.$store.getters.user.displayName;
        },
        getCurrentUserId: function() {
            return this.$store.getters.user.uid;
        }
    },
    created:function(){

        var User = this.user;
        var email;

        email = User.email;


        db.collection("USER").doc(email).get()
        .then(doc =>{

            if(doc.data()["bio"] != ""){
                this.bio =  doc.data()["bio"];
            }

            if(doc.data()["username"] != ""){
                this.username =  doc.data()["username"];
            }

        })
    },
    methods:{
        txtchange(){
            var User = firebase.auth().currentUser;
            var email;

            email = User.email;
            var root = this;
            db.collection("USER").doc(email).update({
                bio: root.bio,
                username: root.username
            });


        }
    }
}
</script>

<style lang="scss" scoped>
    textarea{
        position: relative;

        resize: none;
        width: 1293px;
        height: 125px;
    }

    .refresh{
        position: absolute;
        top: 30px;
        right: 5%;
        display: inline-block;
        text-decoration: none;
        background: #ff8181;
        color: #fff;
        width: 130px;
        height: 80px;
        line-height: 79px;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
        overflow: hidden;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
        border-bottom: solid 3px #bd6565;
        transition: 0.4s;

        cursor: pointer;

    }

    .refresh:active{
        -webkit-transform: translateY(2px);
        transform: translateY(2px);
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
        border-bottom: none;
    }

    .email{
        position: absolute;
        height:48%;
        width: 64.5%;
        top: -100px;
        left: 0%;
    }
</style>
