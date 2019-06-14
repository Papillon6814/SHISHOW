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
        sendMsg(){
            if(!this.SignIn || !this.msg)return
            firebase.database.ref('/messages/').push({
                name:this.userName,
                text:this.msg,
                profileImgUrl:this.userImage
            }).then(data =>{
                this.errorMsg = null
                this.msg = null
            }).catch(error=>{
                this.errorMsg = '正しく入力してください'
            });
        },
        loadMsg(){
            firebase.database().ref('/messages/').on('value',(snapshot) =>{
                if(snapshot){
                    let rootList = snapshot.val()
                    let msgList = []
                    Object.keys(rootList).forEach((val,key)=>{
                        rootList[val].id = val
                        msgList.push(rootList[val])
                    })
                    this.msgList = msgList
                }
            })
        }
    }
    }
 </script> 
 <style>
</style>