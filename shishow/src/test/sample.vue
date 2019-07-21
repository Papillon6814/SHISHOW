<template>
    <div>
        <input type="file" @change="aaaa" >
        <img :src="image" width="200" heigth="200">
        {{text}}
        <button @click="aaa">aaaa</button>
    </div>
</template>
<script>
import axios from 'axios'
import firebase from "../plugin/firestore"

const db = firebase.firestore()

export default {
    name:"Sample",
    data:function(){
        return{
            text:"",
            image:"",
        }
    },
    methods:{
        aaa:async function(){
            //let res = await axios.get('http://localhost:8000/public')
            //this.text = res.data;
            db.collection("Image").doc("SampleImage").get().then(doc=>{
                this.image = doc.data().image
            })
        },
        aaaa:function(event){
            let files = event.target.files || event.dataTransfer.files;
            if (files[0].type.match(/image/)) {
                this.showImage(files[0]);
            }
        },
        showImage:function(file){
            let reader = new FileReader();
      // ファイルが読み込まれたとき、eventを引数とするアロー関数作動
    
      reader.onload = event => {
        // htmlにファイルを反映
        db.collection("Image").doc("SampleImage").set({
         image:event.target.result
        })
        
      };
      // 読み込み開始

      
      reader.readAsDataURL(file);
        }
    }
}
</script>

