<template>
    <div>
        <textarea v-model="bio" name="freeans" rows="4" cols="40"></textarea>
        <div class="refresh" type="button" @click="txtchange()">更新</div>
    </div>
</template>
<script>
import firebase from "../plugin/firestore";
import "firebase/firestore";
import "@firebase/auth";

const db = firebase.firestore();

export default {
    name: "Edit",

    data:function(){
        return{
            bio: " 自由に意見を記述してください ",
        }
    },
    created:function(){
        console.log()
        var User = firebase.auth().currentUser;
        var email;
        
        email = User.email;
        console.log(email);
        db.collection("USER").doc(email).get()
        .then(doc =>{

            if(doc.data()["bio"] != ""){
                this.bio =  doc.data()["bio"];
            }

        })
    },
    methods:{
        txtchange(){
            var User = firebase.auth().currentUser;
            var email;

            email = User.email;
            var root = this;
            db.collection("USER").doc(email).set({
                bio: root.bio
            })
            console.log(this.bio);

        }
    }
}
</script>

<style lang="scss" scoped>
    textarea{
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
</style>

