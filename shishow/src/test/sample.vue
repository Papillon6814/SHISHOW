<template>
    <div>


        <input type="file" accept="image/*" id="file" @change="filechange">
        <input type="text" v-model="text">
        <button type="button" @click="click">aaa</button>
        <img :src='url' id="image">
        <div id="sample" ><div v-for="N in 3" :key="N">{{N}}</div></div>
    </div>
</template>


<script>
import firebase from 'firebase'
import 'firebase/firestore'


    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyD2D42pBXU_nXpo2wTd_IFs-4hogXE8Dq0",
    authDomain: "shishow-7cc37.firebaseapp.com",
    databaseURL: "https://shishow-7cc37.firebaseio.com",
    projectId: "shishow-7cc37",
    storageBucket: "shishow-7cc37.appspot.com",
    messagingSenderId: "476890822571",
    appId: "1:476890822571:web:508b49508a91c0d3"
    };
    // Initialize Firebase

   const db = firebase.firestore()
    
export default {
    name:"sample",
    created:function() {
       
    },
        components:{
        },
        data(){
            return{
                url:"",
                data:"",
                name:"",
                task:"",
                photo:db.collection('users').doc("photo"),
                text:"aaa",

                
            }
        },
        methods: {
            filechange(e){
                let fileList = e.target.files || e.dataTransfer.files
                Array.from(Array(fileList.length).keys()).map(x => {
                this.upload(fileList[x])
                })
                },

            upload(file){
                let reader = new FileReader();
                reader.onload = (event) => {
                    db.collection("Image").doc("SampleImage").set({image:event.target.result});
                }
                reader.readAsDataURL(file);
                this.name = file.name;
                
            },

            aaa(){
                let pro = new Promise((res,rej)=>{
                    db.collection("USER").doc("mikan@gmail.com").get().then(doc=>{
                    console.log("ccc")
                    res(doc.data())
                })
                console.log("abc")
                })
                
                pro.then(doc=>{
                    console.log("aaaa")
                    return doc
                })
                
            },

            click(){
                console.log(this.aaa())
                
                console.log("aaa")
            }

             

        }
}
</script>