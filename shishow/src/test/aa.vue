<template>
    <div class="aa">
    <input type="text" v-model="text" @change="change()"></div>
</template>
<script>
export default {
    name:"aa",
    created:function(){
        this.$parent.text=this.text;
    },
    data:function(){
        return{
            text:""
        }
    },
    method:{
        change(){
            this.$parent.text=this.text;
        }
    }
}
</script>

