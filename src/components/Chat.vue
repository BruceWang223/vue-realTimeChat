<template>
    <div class="chat container">
        <h2 class="center teal-text">Real-Time Chat</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="teal-text">{{ message.name }}:</span>
                        <span class="grey-text time">{{ message.timestamp }} </span>
                        <span class="grey-text text-darken-3 content">{{ message.content }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name = 'name' />
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'
import NewMessage from '@/components/NewMessage'
export default {
    name: 'Chat',
    data(){
        return {
            messages: []
        }
    },
    props: ['name'],
    components:{
        NewMessage
    },
    created(){
        // order it by the timestamp
        let ref = db.collection('messages').orderBy('timestamp');

        ref.onSnapshot(snapshot => {
            // listen for the docChanges event; exploit the real-time updating capability
            snapshot.docChanges.forEach(change => {
                if(change.type == 'added'){
                    let data = change.doc;
                    this.messages.push({
                        id: data.id,
                        name: data.data().name,
                        content: data.data().content,
                        timestamp: moment(data.data().timestamp).format('lll')
                    })
                }
            })
        })

    }
}
</script>

<style>
    .chat h2{
        font-size: 2.6em;
        margin-bottom: 40px;
    }

    .chat span{
        display: inline-block;
        font-size: .9em;
    }
    .chat li{
        margin: 10px;
    }
    .chat .content{
        display: block;
        font-size: 1.2em;
        margin-top: 5px;
    }

    .messages{
        max-height: 300px;
        overflow: auto;
    }
    .messages::-webkit-scrollbar {
        width: 5px;
    }
    
    .messages::-webkit-scrollbar-track {
        background: #ddd;
    }
    
    .messages::-webkit-scrollbar-thumb {
        background: #aaa; 
    }
</style>
