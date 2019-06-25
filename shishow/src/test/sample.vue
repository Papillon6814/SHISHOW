<template>
    <div>
        <input type="file" accept="image/*" id="file" @change="filechange">
        <input type="text" v-model="text">
        <button type="button" @click="click">aaa</button>
        <img :src='url' id="image">
        <div v-for="N in 2" :key="N">
            {{N}}
        </div>
    </div>
    
</template>


<script>


    import firebase from '../plugin/firestore'
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
   
    var db = firebase.firestore();
   

    

    export default{
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
                const currentUser = firebase.auth().currentUser;
                db.collection("USER").doc(currentUser.email).get().then(doc =>{
                    this.text= doc.data()["username"];
                })

                /*
                db.collection("USER").doc("SampleImage").get().then(doc =>{
                    this.url = doc.data()["image"];
                })
                
                
                if(this.task)console.log
                this.photo.get().then(doc =>{
                    console.log(doc.data()["name"]);
                });.where("email","==",this.text)*/
                /*db.collection("USER").doc("mikan4@gmail.com").get().then(doc =>{
                    doc.collection("friend").get().then(doc =>{
                        console.log(doc.docs[0].id);
                    })
                })
                db.collection("USER").doc("mikan4@gmail.com").collection("friend").limit(1).get().then(querySnapshot => {
                    //this.url = querySnapshot.docs[0].data()["image"];
                    //if(!querySnapshot.docs[0])console.log("bbb");
                    querySnapshot.forEach(doc =>{
                        //this.url = doc.data()["image"]
                        
                        db.collection("USER").doc("mikan4@gmail.com").collection("friend").doc(doc.id).collection("CHAT").limit(1).get().then(query =>{
                            query.forEach(doc =>{
                                console.log(doc.data()["date"])
                            })
                        })
                    })
                
                }).catch(e =>{
                    console.log("aaa")
                })
                db.collection("USER").doc("aaa").collection("user").doc();
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