<script>
import Google from "./Google.svelte";

</script>
<style>
    .cont{
        height: 30vh;
        width: 60vw;
        background-color: white;
        max-width: 360px;
        animation-name: start;
        animation-duration: 500ms;
        animation-iteration-count: 1;
        animation-timing-function: ease-out;
        margin-left: auto;
        margin-right: auto ;
        margin-top:20vh;
        border-radius: 15px;
        box-shadow: #888 0px 6px 8px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;

    }
    @keyframes start{
        from{
            position: relative;
            top: -10vh;
        }
        to{
            position: relative;
            top: 0px;
        }
    }
    
</style>
<div style="height:100%; width:100%; background:#efefef">
    <div style="height:20px;"/>
    <div class="cont">
        <span style="font-size:xx-large; font-weight:400">Login</span>
        <br>
        <Google on:click/>
    </div>
</div>