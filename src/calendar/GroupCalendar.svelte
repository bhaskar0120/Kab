<script>
	import Calendar from "./Calendar.svelte";
	import { createEventDispatcher } from "svelte";
	import { doc, getDoc, getFirestore, updateDoc } from "@firebase/firestore";
	import { monthNumber, nextMonth } from "../helper";

	export let id = "head";
	export let name;

	let left = true;

	let taken = [];
	let taken2= [];
	const docName = monthNumber();
	const nDocName = nextMonth();

	const db= getFirestore();

	async function get(){
		const blob = await getDoc(doc(db,`group/${id}`));
		if(blob.exists){
			const data = blob.data();
			name = data.name;
			if(!data.update){
				taken = data[docName];
				taken2 = data[nDocName];
			}
			else{
				let mp = [];
				for(let i = 0; i < 32;++i)
					mp.push(false);

				for(let i = 0; i < data.member.length;++i){
					const temp = await getDoc(doc(db,`user/${data.member[i]}`));
					const busyday = temp.data()[docName];
					for(let j = 0; j < busyday.length;++j)
						mp[busyday[j]] |= true;
				}
				for(let i = 1; i < 32;++i)
					if(mp[i]){
						taken.push(i);
					}
				
				
				for(let i = 0; i < 32;++i)
					mp[i] = false;

				for(let i = 0; i < data.member.length;++i){
					const temp = await getDoc(doc(db,`user/${data.member[i]}`));
					const busyday = temp.data()[nDocName];
					for(let j = 0; j < busyday.length;++j)
						mp[busyday[j]] |= true;
				}
				for(let i = 1; i < 32;++i)
						if(mp[i]){
						taken2.push(i);
					}


				let obj= {};
				obj[docName] = taken;
				obj[nDocName] = taken2;
				obj.update = false;
				updateDoc(doc(db,`group/${id}`),obj);
			}

		}
		return; 
	}
	const disp = createEventDispatcher();

	function back(){
		disp('pageChange',{page:"main"});
	}
	function group(){
		disp('pageChange',{page:"edit", props:{id:id}});
	}

	const dtt = new Date();

</script>

<style>
    nav{
		height:56px;
		background-color: rgb(255, 153, 29);
		font-size: x-large;
		padding:8px;
		color: white;
		font-weight: 400;
        display: flex;
        justify-content: space-between;
        -webkit-user-select: none;
        -moz-user-select: none;
	}
	.active{
		color:#bbb;
	}
</style>

<nav> 
	<div>
		<span class="material-icons-outlined" on:click={back}>arrow_back</span>
		<span>{name}</span> 
	</div>
    <span class="material-icons-outlined" on:click={group}> settings </span>

</nav>

<div style="display:flex;justify-content: space-between;">
	<span style="font-size:x-large;" class:active={left} on:click={()=>left=true} class="material-icons-outlined">navigate_before</span>
	<span style="font-size:x-large;"  class:active={!left} on:click={()=>left=false} class="material-icons-outlined">navigate_next</span>
</div>

{#await get()}
<h3>Wait...</h3>
{:then value}
	{#if left}
	<Calendar taken={taken} move={-100}/>
	{:else}
	<Calendar taken={taken2} d={new Date(dtt.getFullYear(),dtt.getMonth()+1,1)} showtoday={false}/>
	{/if}
{/await}