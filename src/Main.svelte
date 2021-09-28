<script>
    import ChatBar from "./comp/ChatBar.svelte";
    import Search from "./comp/Search.svelte";
    import RoundButton from "./comp/RoundButton.svelte";
    import user from './user';
    import {createEventDispatcher} from 'svelte';


    const disp = createEventDispatcher();
    function create(){
        disp('pageChange',{page:'group' })

    }
</script>
<style>
    nav{
        height: 112px;
        background-color: rgb(255, 153, 29);
        border-radius: 0px 0px 30px 30px / 0px 0px 30px 30px ;
    }
    article{
        font-weight: 600;
        font-size: larger;
        margin:12px;
    }
    .user{
        height:64px;
        margin-bottom: 4px;

    }
</style>

<nav >
    <div class="user" ></div>
    <Search/>
</nav>

<ChatBar on:pageChange calendar={true} showBorder={false}/>
<article>Group Calendars</article>
{#each $user.groups as name}
    <ChatBar on:pageChange name={name.name} id={name.id}/>
{/each}
<RoundButton on:click={create}/>