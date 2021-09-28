<script>
    import People from "../comp/NewPeople.svelte";
    import Search from "../comp/Search.svelte";
    import {createEventDispatcher } from 'svelte';
    import { arrayRemove, arrayUnion, collection, deleteDoc, doc,  getDoc, getDocs, getFirestore, query,  updateDoc, where } from "@firebase/firestore";
    import USER from '../user';

    export let id;

    let name;
    const disp = createEventDispatcher();
    function back() {
        disp('pageChange', {
            page:'groupCal', props:{id:id}
        });
    }

    let membernew = [];

    const db = getFirestore();
    const ref = collection(db, 'user');
    let groupmembers = [];
    let removed = []

    async function already(){
        let blob = await getDoc(doc(db,`group/${id}`));
        let dat = blob.data()
        member = dat.member;
        name = dat.name;
        const Allmem = query(collection(db,'user'), where('uid','in',member));
        const pagess = await getDocs(Allmem);
        pagess.forEach(elem=>{
            const dat2 = elem.data();
            groupmembers.push({name: dat2.name, email:dat2.email,id:dat2.uid});
        });
        groupmembers = groupmembers;
    }




    async function add(){
        membernew.forEach(async element => {
            await updateDoc(doc(db,`user/${element}`),{groups:arrayUnion({name:name,id:id})})
        });        
        removed.forEach(async element => {
            await updateDoc(doc(db,`user/${element}`),{groups:arrayRemove({name:name,id:id})})
        });        
        if(member.length === removed.length ){
            await deleteDoc(doc(db,`group/${id}`));
        }
        else{
            await updateDoc(doc(db,`group/${id}`),{name:name,member:member});
        }
        const dat = await getDoc(doc(db,`user/${$USER.uid}`));
        USER.set(dat.data());
        disp('pageChange',{page:'main'});
    }
    
    function AddMember(event){
        if(member.includes(event.detail.id)){
            const idx = removed.indexOf(event.detail.id)
            if(idx >-1){
                removed.splice(idx,1);
            }
            else{
                removed.push(event.detail.id);
            }
        }
        else{
            const idx = membernew.indexOf(event.detail.id)
            if(idx >-1)
                membernew.splice(idx,1);
            else membernew.push(event.detail.id)
        }
        member = member;
    }

    let result =[];
    let member = [];
    already();

    async function search(event){
        const res = query(ref,where('username' ,'==',event.detail.term));
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
    <People {...people} add={(!member.includes(people.id) && !membernew.includes(people.id)) || (member.includes(people.id) &&removed.includes(people.id)) } on:Add={AddMember}/>
{/each}
<hr>
<h2>Members</h2>
{#each groupmembers as people} 
    <People {...people} add={(!member.includes(people.id) && !membernew.includes(people.id)) || (member.includes(people.id) &&removed.includes(people.id)) } on:Add={AddMember}/>
{/each}