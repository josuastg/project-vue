<template>

    <div>
    
        <b-form >
    
            <label for="feedback-user">Name </label>
    
            <b-input  type="text" id="feedback-user" placeholder="Enter name" ></b-input>
    
            <label for="feedback-user">Address </label>
    
            <b-input type="text" placeholder="Enter address"></b-input>
    
            <label for="feedback-user">Phone Number</label>
    
            <b-input type="text"  placeholder="Enter phone number"></b-input>
    
            <label for="feedback-user">Latitude </label>
    
            <b-input type="number"  placeholder="Enter latitude"></b-input>
    
            <label for="feedback-user">Longitude </label>
    
            <b-input type="number"  placeholder="Enter longitude"></b-input>
    
        </b-form>
    
    </div>
</template>

<script>
export default {
    name: 'agent-form',
    data() {
        return {
            id: this.$route.params.id,
            agent:{}
        }
    },

}
</script>

<style scope>

</style>