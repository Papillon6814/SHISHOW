<template>
    <div>
        <textarea v-model="bio" name="freeans" rows="4" cols="40"></textarea>
        <button type="button" @click="txtchange()">更新</button>
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
            db.collection("USER").doc(email).update({
                bio: root.bio
            })
            console.log(this.bio);

        }
    }
}
</script>
