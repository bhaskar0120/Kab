<script>
    export let name = "Button";
</script>
<style>
    div{
        border-radius: 5px;;
        border: 2px #ccc solid;
        height:32px;
        width:96px;
        text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        transition: 100ms;
    }
    div:active{
        background-color: rgb(255,155,30);
        color: white;
    }
</style>
<div on:click>
    {name}
</div>