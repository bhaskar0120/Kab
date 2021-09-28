<script>
    export let placeholder = "Search groups";
    import {createEventDispatcher} from 'svelte';
    const disp = createEventDispatcher();
    let value;
    function send(event){
        if(event.keyCode === 13)
            disp('search', {term: value})
    }
</script>
<style>
  .search{
        border: 2px white solid;
        width:90vw;
        height:36px;
        margin-left:auto;
        margin-right:auto;
        border-radius: 30px 30px 30px 30px / 30px 30px 30px 30px;
        display : flex;
    }
    input[type=text]{
        margin: 4px 2vw;
        background-color: transparent;
        width:65vw;
        height:28px; 
        border:none;
        outline: none;
        font-size: large;
        color:white;
        font-weight: 300;
    }
    ::-webkit-input-placeholder{
        color:white;
        font-size: large;
        font-weight: 300;
    }
</style>
<div class="search">
    <span class="material-icons-outlined" style="color:white;margin: 6px 0 0 20px">search</span>
    <input type="text" placeholder={placeholder} on:keypress={send} bind:value>

</div>