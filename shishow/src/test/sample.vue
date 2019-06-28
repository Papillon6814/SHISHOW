<template>
    <div>
        <aa></aa>
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
    import aa from "./aa"
import { Promise } from 'q';

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
   

    var db = firebase.firestore();
export default {
    name:"sample",
        components:{
            aa,
        },
        data(){
            return{
                url:"",
                data:"",
                name:"",
                task:"",
                photo:db.collection('users').doc("photo"),
                text:"",
                
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

            click(){
                
                db.collection("USER").get().then(qudocs=>{
                    qudocs.forEach(qdoc=>{
                        /*
                        db.collection("USER").doc(qdoc.id).collection("incoming").get().then(docs=>{
                            docs.forEach(doc=>{
                                db.collection("USER").doc(qdoc.id).collection("incoming").doc(doc.id).delete();
                            })
                            
                        })
                        
                        db.collection("USER").doc(qdoc.id).collection("outgoing").get().then(docs=>{
                            docs.forEach(doc=>{
                                db.collection("USER").doc(qdoc.id).collection("outgoing").doc(doc.id).delete();
                            })
                            
                        })
                        db.collection("USER").doc(qdoc.id).collection("friends").get().then(docs=>{
                            docs.forEach(doc=>{
                                db.collection("USER").doc(qdoc.id).collection("friends").doc(doc.id).delete();
                            })
                            
                        })*/
                    })
                })



                /*
                let promice = new Promise((res,rej)=>{
                    db.collection("USER").doc("mikan@gmail.com").get().then(doc =>{
                    console.log("aaa");
                    res();
                })
                })
                promice.then(()=>{
                    console.log("bbb")
                    return Promise((res,rej)=>{
                        db.collection("USER").doc("mikan@gmail.com").get().then(doc =>{
                    console.log("ccc");
                    res();
                    })
                })}).then(()=>{
                    console.log("ddd")
                })
                */
                
                
                /*
                if(this.task)console.log
                this.photo.get().then(doc =>{
                    console.log(doc.data()["name"]);
                });.where("email","==",this.text)*/
                /*db.collection("USER").get().then(querySnapshot => {
                    //this.url = querySnapshot.docs[0].data()["image"];
                    if(!querySnapshot.docs[0])console.log("bbb");
                    querySnapshot.forEach(doc =>{
                        //this.url = doc.data()["image"]
                        
                        console.log(doc.data()["email"]+"=>"+doc.id);
                    })
                
                }).catch(e =>{
                    console.log("aaa")
                })
                db.collection("USER").doc("").collection("user").doc();
            },

            delete(){
                db.collection("users").where("name","==","mikan").get().then(querySnapshot => {
                    //db.collection("users").doc(querySnapshot.docs[0].id).delete();

                    /*querySnapshot.forEach(doc =>{
                        db.collection("users").doc(doc.id).delete();
                    }
                
                });*/
            }

             

        }
}
</script>