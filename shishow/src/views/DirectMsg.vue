<template></template>

 <script> 
import firebase from 'firebase' 
export default { 
    name:'Chat'
     ,
    props:[ 'SignIn', 'userName', 'userImage' ], 
    data(){ 
        return{ 
            msgList:[], 
            msg:null, 
            errorMsg:null 
            }, 
        },
    created(){ 
        this.loadMsg() 
    }, 
    methods:{
        sengMsg(){
            if(!this.SignIn || !this.msg)return
            firebase.database.ref('')
        }
    }
    }
 </script> 
 <style>
</style>