<script>
    import Button from "./Button.svelte";
    export let add = true;

    import {createEventDispatcher} from 'svelte';
    export let name;
    export let email;
    export let id;
    const disp = createEventDispatcher();
    function sendID(){
        disp('Add',{id:id})

    }
</script>
<style>
    .cont{
        height:64px;
        display : flex;
        justify-content: space-around;
        background-color: #f5f5f5;
        margin: 4px 0;
    }
    .name{
        font-weight: 400;
        font-size:x-large;

    }
    .email{
        color:#666;
        font-weight: 300;
        font-size: small;
    }
    .yellow{
        background-color: rgba(255,153,29,0.2);
    }
</style>

<div class='cont' class:yellow={!add}>
    <div style="display:flex; flex-direction:column; margin: auto 0;">
        <span class="name">{name}</span>
        <span class="email">{email}</span>
    </div>
    <div style="margin-top: auto; margin-bottom:auto">
        <Button on:click={sendID} name={(add)?'Add':'Remove'}></Button>
    </div>

</div>