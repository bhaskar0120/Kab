<svelte:head>
      <script src="https://cdn.jsdelivr.net/npm/jdenticon@3.1.1/dist/jdenticon.min.js" async
        integrity="sha384-l0/0sn63N3mskDgRYJZA6Mogihu0VY3CusdLMiwpJ9LFPklOARUcOiWEIGGmFELx"
        crossorigin="anonymous">
</script>
</svelte:head>
<script>
    export let name = "My Calendar"
    export let calendar = false;
    export let showBorder= true;
    export let id = "";
    import { createEventDispatcher } from "svelte";
    const disp = createEventDispatcher();
    function activate(){
        disp('pageChange',{page:(calendar)?"cal":"groupCal", props:(calendar)? {}: {id:id,name:name}});
    }
</script>
<style>
    div{
        height:56px;
        padding: 12px 0 0 12px  ;
        font-size:large;
        background-color: #f6f6f6;
        display: flex;
        gap:5px;
    }
    .border{
        border-bottom: 1px #ccc solid;
    }
    svg{
        height:36;
        width:36;
        border-radius: 50%;
        position: relative;
        top:-5px;
    }
</style>

<div class:border={showBorder} on:click={activate}>
    {#if calendar}
    <span class="material-icons-outlined"> today </span> 
    {:else}
    <svg data-jdenticon-value={name}/>
    {/if}
    {name}
</div>