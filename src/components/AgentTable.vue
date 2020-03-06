<template>
    <div class="content">
     <b-table :items="agents" head-variant="light" hover></b-table>
        
    </div>
</template>
 
<script>
import axios from 'axios';
export default {
    name:'agent-table',
    data() {
        return {
            agents:[],
            message:null
        }
    },methods: {
        getAgent(){
           let apiUrl = "/api/v1/shipment/agent?page=1&per_page=100";
           let token = 
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE4ODE1NzUzMTQsImlhdCI6MTU2NjIxNTMxNCwiYWNjb3VudF9pZCI6Mywicm9sZV9pZCI6IkFETUlOIiwidXNlcm5hbWUiOiJhZG1pbi1kZWZhdWx0In0.g-DcUvVftYV87T_Ecx2RBEhbIzWtFH7KX8JNENZVAbDqgPm6I54Kh_RYC5fqreCM8SP1cQAj7ZP1VHXB3fo2PXaxImkCE6ADchcIDtCETiqzyhaU8wau6v8HXjqb3VuNXNlhSyQcQMZfwSLC16uQfojy28_lbvGYBoSJpcBQ6AALDan6zJTwkPg2JpmC26irxykTfUX5fAwAkyZNa8wvfipEFE0KP72J4mTSpsmmovxsiE9662dRsb3rei-WmycAeMEfVJUwEyHoibn8IHmWpjvvMKrcA0hd5Nt8i_alHc4PAy3yEJ_--Za2vK3bg-0drpAdEc9DDEQdZKyko6pkeA";
            axios.get(apiUrl, { headers: {'Authorization' : `${token}`}} )
            .then((res)=>{
                this.agents = res.data.data;
            }).catch((error)=>{
                alert(this.message = error.message);
            })
        }
    },mounted() {
        this.getAgent();
    },
    
}
</script>

<style scope>
.content{
    justify-content:  'center';
    margin : 2rem;
}
</style>