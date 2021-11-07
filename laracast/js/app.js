//shared event handler emit and listener (this.$on)
window.Event = new class{
    constructor(){
        this.vue = new Vue();
    }

    fire(event, data =null){
        this.vue.$emit(event, data);
    }

    listen(event, callback){
        this.vue.$on(event, callback);
    }
}

//Parent Component
Vue.component('task-list',{
    props:[
        'nk'
    ],
    template:`
    <div>
        <task v-for="(item, idx) in nk" @emitMethod="emitWork" :key="idx" :task="item.task" :complete="item.complete" ></task>
    </div>    
    `,
    data (){
        return {

        }
    },
    methods:{
        emitWork (){
            alert("Emitted!!!")
        }
    },
    created(){
        Event.listen('acction-on-second', () => alert("Handling from second root"))
    }
})

//Child Component
Vue.component('task',{
    props:[
        'task','complete'
    ],
    template:`
    <div>
        <li @click="emitEvent2" :style="[complete ? {'text-decoration' : 'line-through'} : '']"  style="display: inline-block; "
        >{{task}}</li><input type="checkbox" @click="emitEvent(task)" :checked="complete"/>
    </div>    
    `,
    methods:{
        emitEvent(item){
            Event.fire('acction-on-root',item);
        },
        emitEvent2(){
            Event.fire('acction-on-second');
        }
    }
})


//Root component
var app = new Vue({
    el: '#app',
    created(){
        Event.listen('acction-on-root', item => this.done(item));
    },
    data:{
        taskList:[
            {task: "Make todo app", complete: false},
            {task: "Complete gym app", complete: true},
            {task: "Drink water", complete: true},
        ]
    },
    methods:{
        done(item){
            let obj = this.taskList.find(f => f.task == item);
            if(obj)
                obj.complete = !obj.complete;

        }
    }
});