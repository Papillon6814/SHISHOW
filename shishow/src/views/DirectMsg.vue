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
            if(!this.SignIn || !this.msg)return
            //データベースに値をpush
            firebase.database.ref('/messages/').push({
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
            //データベースから値を持ってきてsnapshotに代入
            firebase.database().ref('/messages/').on('value',(snapshot) =>{
                if(snapshot){
                    //snapshotの値はsnapshot.val()で取得できる
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