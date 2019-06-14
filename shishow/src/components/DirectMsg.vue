<template></template>

 <script> 
import firebase from 'firebase' 
export default { 
    name:'Chat',
    props:[ 
        'SignIn', 
        'userName', 
        'userImage' 
        ], 
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
        //メッセージを送る
        sendMsg(){
            const db = firebase.firestore()
            if(!this.SignIn || !this.msg)return
            //データベースに値をpush
            db.collection("USER").add({
                name:this.userName,
                text:this.msg,
                profileImgUrl:this.userImage
            })
            //正常な時
            .then(data =>{
                this.errorMsg = null
                this.msg = null
            })
            //エラーの時
            .catch(error=>{
                this.errorMsg = '正しく入力してください'
            });
        },
        //これまでのメッセージをロード
        loadMsg(){
            const db = firebase.firestore()
            //データベースから値を持ってきてsnapshotに代入
            db.collection("USER").get().then((snapshot) =>{
                    //snapshotの値はsnapshot.val()で取得できる
                    //let rootList = snapshot.val()
                    let msgList = []
                    /*Object.keys(rootList).forEach((val,key)=>{
                        rootList[val].id = val
                        msgList.push(rootList[val])
                    })*/
                    snapshot.forEach(function(doc){
                        msgList = doc.text
                    })
                    this.msgList = msgList
                )
            }
        }
    }

 </script>

 <style>
</style>