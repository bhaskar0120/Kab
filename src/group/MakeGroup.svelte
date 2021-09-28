<script>
    import People from "../comp/NewPeople.svelte";
    import Search from "../comp/Search.svelte";
    import {createEventDispatcher } from 'svelte';
    import { addDoc, arrayUnion, collection, doc,  getDocs,getDoc, getFirestore, query, updateDoc, where } from "@firebase/firestore";
    import USER from '../user';

    let name = `Group${$USER.groups.length+1}`;
    const disp = createEventDispatcher();
    function back() {
        disp('pageChange', {
            page: "main",
        });
    }



    const db = getFirestore();
    const ref = collection(db, 'user')

    async function add(){
        if(member.length > 0){
            if(name === "") name= `Group${$USER.groups.length+1}`;
            const groupDoc = await addDoc(collection(db,'group'),{name:name,update:true,member:member});
            member.forEach(async element => {
                await updateDoc(doc(db,`user/${element}`),{groups:arrayUnion({name:name,id:groupDoc.id})})
            });        
            const dat = await getDoc(doc(db,`user/${$USER.uid}`));
            USER.set(dat.data());
        }  
        //home
        disp('pageChange',{page:'main'});
    }
    
    function AddMember(event){
        const idx = member.indexOf(event.detail.id);
		if(idx > -1)
			member.splice(idx,1);
		else{
			member.push(event.detail.id);
        }
        member = member;
    }

    let result =[];
    let member = [$USER.uid];
    async function search(event){
        const res = query(ref,where('username' ,'==',event.detail.term.toLowerCase()));
        const docs = await getDocs(res);
        result = [];
        docs.forEach(doc=>{
            const blob = doc.data();
            result.push({add:true,name:blob.name,email:blob.email,id:blob.uid});
        });
        result = result;
    }
</script>

<style>
    nav{
        height:112px;
        color:white;
        padding: 8px;
        -moz-user-select: none;
        -webkit-user-select: none;
        font-size: x-large;
        background-color: rgb(255,155,30);
        font-weight: 400;
        border-radius:  0px 0px 30px 30px / 0px 0px 30px 30px ;
    }
    .head{
        height: 64px;
        margin-bottom: 4px;

    }
    input[type=text]{
        margin: 8px 4vw;
        background-color: transparent;
        width:65vw;
        height:28px; 
        border: none;
        outline: none;
        font-size: large;
        color:white;
        font-weight: 300;
        outline:  red;; 
    }
    ::-webkit-input-placeholder{
        color:  white;
    }
    input:focus::placeholder{
        color: transparent;
    }
</style>

<nav>
    <div class="head">
        <div>
            <span class="material-icons-outlined" on:click={back}>arrow_back</span>
            <input bind:value={name} type="text" name="Name" placeholder="Group Name...">
            <span class="material-icons-outlined" on:click={add}>done</span>
        </div>
    </div>
    <Search placeholder="Find People" on:search={search}/>
</nav>
{#each result as people} 
    <People {...people} add={!member.includes(people.id)} on:Add={AddMember}/>
{/each}