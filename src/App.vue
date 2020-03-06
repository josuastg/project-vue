<template>
    <div id="app">
        <h1> List Agent </h1>
        <div class="btn-modal">
            <b-button id="modal-prevent-closing" v-b-modal.modal-xl @ok="handleOk">Add Agent</b-button>
            <b-modal id="modal-xl" size="xl" centered title="Form Agent" @ok="handleOk">
                <template>
                               <div>
                                <b-form @submit.stop.prevent="handleSubmit">
                                  <label for="feedback-user">Name </label>
                                  <b-input v-model="agent.name" type="text" id="feedback-user" placeholder="Enter name" :state="validationName"></b-input>
                                  <b-form-invalid-feedback :state="validationName">
                                Your user ID must be more than 8 characters long.
                              </b-form-invalid-feedback>
                              <b-form-valid-feedback :state="validationName">
                                Looks Good.
                              </b-form-valid-feedback>
                                   <label for="feedback-user">Address </label>
                                  <b-input v-model="agent.address" type="text" placeholder="Enter address"></b-input>
                             <label for="feedback-user">Phone Number</label>
                                  <b-input v-model="agent.phone" type="text" id="feedback-user" placeholder="Enter phone number"></b-input>
                             <label for="feedback-user">Latitude </label>
                                  <b-input v-model="agent.latitude" type="number" id="feedback-user" placeholder="Enter latitude"></b-input>
                             <label for="feedback-user">Longitude </label>
                                  <b-input v-model="agent.longitude" type="number" id="feedback-user" placeholder="Enter longitude"></b-input>
                                 </b-form>
                              </div>
</template>
  </b-modal>
    </div>
  <agent-table/>
  
  </div>
</template>

<script>
import axios from 'axios';
import AgentTable from '@/components/AgentTable.vue';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);

export default {
    name: 'App',
    components: {
        AgentTable
    },
    data() {
        return {
            agent: {
                name: '',
                address: '',
                phone: '',
                latitude: null,
                longitude: null
            },
            messsage: ''
        }
    },
    methods: {
        handleOk() {
            this.handleSubmit();
        },
        handleSubmit() {
            let token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODE1NzUzMTQsImlhdCI6MTU2NjIxNTMxNCwiYWNjb3VudF9pZCI6Mywicm9sZV9pZCI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbi1kZWZhdWx0In0.g-DcUvVftYV87T_Ecx2RBEhbIzWtFH7KX8JNENZVAbDqgPm6I54Kh_RYC5fqreCM8SP1cQAj7ZP1VHXB3fo2PXaxImkCE6ADchcIDtCETiqzyhaU8wau6v8HXjqb3VuNXNlhSyQcQMZfwSLC16uQfojy28_lbvGYBoSJpcBQ6AALDan6zJTwkPg2JpmC26irxykTfUX5fAwAkyZNa8wvfipEFE0KP72J4mTSpsmmovxsiE9662dRsb3rei-WmycAeMEfVJUwEyHoibn8IHmWpjvvMKrcA0hd5Nt8i_alHc4PAy3yEJ_--Za2vK3bg-0drpAdEc9DDEQdZKyko6pkeA';
            var data = {
                name: this.agent.name,
                address: this.agent.address,
                phone: this.agent.phone,
                latitude: Number(this.agent.latitude),
                longitude: Number(this.agent.longitude)
            };
            axios.post('http://algo-api-dev.lionparcel.com/v1/shipment/agent', data, {  headers: { 'Access-Control-Allow-Origin': '*', 'Authorization': `${token}`, 'Content-Type': 'application/json' } })
                .then((res) => {
                    alert('successfull ',this.messsage = res);
                }).catch((error) => {
                    alert(this.messsage = error);
                })
        }
    },
    computed: {
        validationName() {
            if (this.agent.name === '') {
                return null;
            } else
                return this.agent.name.length > 8;
        },

    },
}
</script>

<style>
#app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.btn-modal {
    display: flex;
    justify-content: flex-end;
    margin-right: 40px
}
</style>
