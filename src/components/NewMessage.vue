<template>
    <div class="new-message">
        <form @submit.prevent='createMsg'>
            <label for="msg">New Message (enter to add): </label>
            <input type="text" name='msg' v-model = 'msg'>
            <p class="red-text" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name: 'NewMessage',
    data(){
        return{
            msg: null,
            feedback: null
        }
    },
    props: ['name'],
    methods: {
        createMsg(){
            if(this.msg){
                this.feedback = null;
                db.collection('messages').add({
                    name: this.name,
                    content: this.msg,
                    timestamp: Date.now()
                }).catch(err => console.log(err));
                this.msg = null;
            }
            else{
                this.feedback = 'You must enter a message in order to send one';
            }
        }
    }
}
</script>

<style>

</style>
