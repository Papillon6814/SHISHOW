<template>
    <div>
        {{text}}
        <button @click="aaa">aaaa</button>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:"Sample",
    data:function(){
        return{
            text:""
        }
    },
    methods:{
        aaa:async function(){
            let res = await axios.get('http://localhost:8000/public')
            this.text = res.data;
        }
    }
}
</script>

