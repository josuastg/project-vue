<template>
    <div class="content">
    
    
    
    
    
        <input type="text" placeholder="Search agent name..." v-model="searchAgent" />
        <div class="striped-table">
            <table>
                <thead>
                      <tr>
                        <th>NAME</th>
                             <th>ADDRESS</th>
                        <th>PHONE</th>
                        <th>LATITUDE</th>
                        <th>LONGITUDE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
            <tr v-for="agent in resultAgent" :key="agent.id">
    
                        <td v-if="editing === agent.agent_id">
    
                            <input type="text" v-model="updatedAgent.name"  :class="{ 'has-error': submitting && invalidName }"  @focus="clearStatus" @keypress="clearStatus" >
    
                            <label> {{agent.name}} </label>
    
                        </td>
    
                        <td v-else>{{agent.name}}</td>
    
                        <td v-if="editing === agent.agent_id">
    
                            <input type="text" v-model="updatedAgent.address"  @focus="clearStatus"   :class="{ 'has-error': submitting && invalidAddress }" />
    
                            <label> {{agent.address}} </label>
    
    
    
                        </td>
    
                        <td v-else> {{agent.address}} </td>
    
                        <td v-if="editing === agent.agent_id">
    
                            <input type="text" v-model="updatedAgent.phone"  @focus="clearStatus"   :class="{ 'has-error': submitting && invalidPhone }"/>
    
                            <label>{{agent.phone}} </label>
    
    
    
                        </td>
    
                        <td v-else>{{agent.phone}} </td>
    
                        <td v-if="editing === agent.agent_id">
    
                            <input type="text" v-model="updatedAgent.latitude"  @focus="clearStatus"   :class="{ 'has-error': submitting && invalidLatitude }"/>
    
                            <label>{{agent.latitude}} </label>
    
    
    
                        </td>
    
                        <td v-else>{{agent.latitude}} </td>
    
                        <td v-if="editing === agent.agent_id">
    
                            <input type="text" v-model="updatedAgent.longitude"  @focus="clearStatus"   :class="{ 'has-error': submitting && invalidLatitude }" />
    
                            <label>{{agent.longitude}} </label>
    
                        </td>
    
                        <td v-else>{{agent.longitude}} </td>
    
                        <div>
    
                            <td v-if="editing === agent.agent_id">
    
                                <b-button @click.prevent="handleUpdate(agent.agent_id)" b-button variant="secondary">Save</b-button>
    
                            </td>
    
                            <td v-if="editing === agent.agent_id">
                                <b-button variant="light" @click="cancelable">Cancel</b-button>
                            </td>
                            <td>
                                <b-button variant="info" @click="editMode(agent.agent_id)">Update</b-button>
                            </td>
                            <td>
                             <b-button variant="danger" @click.prevent="handleDelete(agent.agent_id)" v-if="showing"  >Delete </b-button>
                            </td>
    
                        </div>
    
    
    
                    </tr>
    
                </tbody>
    
    
    
            </table>
    
    
    
        </div>
    
    
    
    </div>
</template>
 
<script>
import axios from 'axios';
export default {
    name: 'agent-table',
    data() {
        return {
            agents: [],
            message: null,
            editing: null,
            searchAgent: null,
            success: true,
            error: true,
            submitting: true,
            showing : true,
            updatedAgent: {
                name: '',
                address: '',
                phone: '',
                latitude: null,
                longitude: null
            }
        }
    },
    methods: {
        editMode(id) {
            this.editing = id;
            this.showing = false
        },
        cancelable(){
            this.editing = null,
            this.showing = true
        },
        editingAgent(agent) {
            if (agent.name === '' || agent.address === '' || agent.phone === '' || agent.latitude || agent.longitude) {
                return
            }
            this.$emit('edit:agent', agent.agent_id, agent)
            this.editing = null
        },
        getAgent() {
            let apiUrl = "/api/v1/shipment/agent?page=1&per_page=100";
            let token =
                "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODE1NzUzMTQsImlhdCI6MTU2NjIxNTMxNCwiYWNjb3VudF9pZCI6Mywicm9sZV9pZCI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbi1kZWZhdWx0In0.g-DcUvVftYV87T_Ecx2RBEhbIzWtFH7KX8JNENZVAbDqgPm6I54Kh_RYC5fqreCM8SP1cQAj7ZP1VHXB3fo2PXaxImkCE6ADchcIDtCETiqzyhaU8wau6v8HXjqb3VuNXNlhSyQcQMZfwSLC16uQfojy28_lbvGYBoSJpcBQ6AALDan6zJTwkPg2JpmC26irxykTfUX5fAwAkyZNa8wvfipEFE0KP72J4mTSpsmmovxsiE9662dRsb3rei-WmycAeMEfVJUwEyHoibn8IHmWpjvvMKrcA0hd5Nt8i_alHc4PAy3yEJ_--Za2vK3bg-0drpAdEc9DDEQdZKyko6pkeA";
            axios.get(apiUrl, { headers: { 'Authorization': `${token}` } })
                .then((res) => {
                    this.agents = res.data.data;
                }).catch((error) => {
                    alert(this.message = error.message);
                })
        },
        clearStatus() {
            this.success = false
            this.error = true
        },
        handleUpdate(id) {
            this.clearStatus();
            this.submitting = true;
            if (this.invalidAddress || this.invalidName || this.invalidLatitude || this.invalidLongitude || this.invalidPhone) {
                this.error = true;
            }
            var data = {
                name: this.updatedAgent.name,
                address: this.updatedAgent.address,
                phone: this.updatedAgent.phone,
                latitude: Number(this.updatedAgent.latitude),
                longitude: Number(this.updatedAgent.longitude)
            }
            console.log('ini data ', data);
            let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODE1NzUzMTQsImlhdCI6MTU2NjIxNTMxNCwiYWNjb3VudF9pZCI6Mywicm9sZV9pZCI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbi1kZWZhdWx0In0.g-DcUvVftYV87T_Ecx2RBEhbIzWtFH7KX8JNENZVAbDqgPm6I54Kh_RYC5fqreCM8SP1cQAj7ZP1VHXB3fo2PXaxImkCE6ADchcIDtCETiqzyhaU8wau6v8HXjqb3VuNXNlhSyQcQMZfwSLC16uQfojy28_lbvGYBoSJpcBQ6AALDan6zJTwkPg2JpmC26irxykTfUX5fAwAkyZNa8wvfipEFE0KP72J4mTSpsmmovxsiE9662dRsb3rei-WmycAeMEfVJUwEyHoibn8IHmWpjvvMKrcA0hd5Nt8i_alHc4PAy3yEJ_--Za2vK3bg-0drpAdEc9DDEQdZKyko6pkeA";
            axios.post(`/api/v1/shipment/agent/${id}`, data, { headers: { 'Authorization': `${token}`, 'Content-Type': 'application/json' } })
                .then((res) => {
                    alert('Updated', this.message = res.data.message);
                    this.getAgent();
                }).catch((err) => {
                    alert('an error occured ', this.message = err.data.message);
                })
        },
        handleDelete(id){
            let token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODE1NzUzMTQsImlhdCI6MTU2NjIxNTMxNCwiYWNjb3VudF9pZCI6Mywicm9sZV9pZCI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbi1kZWZhdWx0In0.g-DcUvVftYV87T_Ecx2RBEhbIzWtFH7KX8JNENZVAbDqgPm6I54Kh_RYC5fqreCM8SP1cQAj7ZP1VHXB3fo2PXaxImkCE6ADchcIDtCETiqzyhaU8wau6v8HXjqb3VuNXNlhSyQcQMZfwSLC16uQfojy28_lbvGYBoSJpcBQ6AALDan6zJTwkPg2JpmC26irxykTfUX5fAwAkyZNa8wvfipEFE0KP72J4mTSpsmmovxsiE9662dRsb3rei-WmycAeMEfVJUwEyHoibn8IHmWpjvvMKrcA0hd5Nt8i_alHc4PAy3yEJ_--Za2vK3bg-0drpAdEc9DDEQdZKyko6pkeA";
            axios.delete(`api/v1/shipment/agent/${id}`, {headers :{'Authorization' : `${token}`}})
            .then(()=>{
                this.getAgent();
            }).catch((err)=>{
                alert('an error occured ',this.message = err);
            })
        }
    },
    mounted() {
        this.getAgent();
    },
    computed: {
        resultAgent() {
            if (this.searchAgent) {
                return this.agents.filter((agent) => {
                    return this.searchAgent.toLowerCase().split(' ').every(v => agent.name.toLowerCase().includes(v))
                })
            } else {
                return this.agents;
            }
        },invalidName() {
            return this.updatedAgent.name === ''
        },
        invalidAddress() {
            return this.updatedAgent.address === ''
        },
        invalidPhone() {
            return this.updatedAgent.phone === ''
        },
        invalidLatitude() {
            return this.updatedAgent.latitude === null
        },
        invalidLongitude() {
            return this.updatedAgent.longitude === null
        },

    },

}
</script>

<style scope>
.content {
    justify-content: 'center';
    margin: 2rem;
}

#btn: {
    border-radius: 10px;
}
</style>