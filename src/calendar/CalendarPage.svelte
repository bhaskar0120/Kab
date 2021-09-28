<script >
	import Calendar from "./Calendar.svelte";
	import Button from '../comp/Button.svelte';
	import {createEventDispatcher} from 'svelte';
	import USER from './../user';
	import {getFirestore, doc, updateDoc, getDoc,} from 'firebase/firestore';
	import {monthNumber, nextMonth} from '../helper';

	const blob = $USER;
	
	let left = true;

	let taken = [];
	let docName = monthNumber();

	let taken2 = [];
	let nDocName = nextMonth();

	const db = getFirestore();
	function add(monthnum){
		let toAdd = {}
		toAdd[monthnum] = [];
		const ref = doc(db,`user/${blob.uid}`);
		updateDoc(ref,toAdd);
		blob[monthnum] = [];
		USER.set(blob);
	}

	const dtt = new Date();

	if(docName in blob) taken = blob[docName];
	else add(docName);

	if(nDocName in blob) taken2 = blob[nDocName];
	else add(nDocName);

	function updateTaken(event){
		const idx = taken.indexOf(event.detail.num);
		if(idx > -1)
			taken.splice(idx,1);
		
		else
			taken.push(event.detail.num);
		taken = taken;
	}

	function updateTaken2(event){
		const idx = taken2.indexOf(event.detail.num);
		if(idx > -1)
			taken2.splice(idx,1);
		
		else
			taken2.push(event.detail.num);
		taken2 = taken2;
	}


	async function update(){ //Biggeest function
		for(let i = 0; i < blob.groups.length; ++i){
			const refDoc = doc(db, `group/${blob.groups[i].id}`);
			updateDoc(refDoc,{update:true});
		}
		
		let obj  = {};
		obj[docName] = taken;
		obj[nDocName] = taken2;
		updateDoc(doc(db,`user/${blob.uid}`),obj);
	}

	const disp = createEventDispatcher();
	function back(){
		disp('pageChange',{page:"main"});
	}

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
	}
	.active{
		color:#bbb;
	}
</style>
<nav> 
	<div>
		<span on:click={back} class="material-icons-outlined">arrow_back</span>
		<span>My Calendar</span> 
	</div>

</nav>

<!-- svelte-ignore missing-declaration -->
<div style="display:flex;justify-content: space-between;">
	<span style="font-size:x-large;" class:active={left} on:click={()=>left=true} class="material-icons-outlined">navigate_before</span>
	<span style="font-size:x-large;"  class:active={!left} on:click={()=>left=false} class="material-icons-outlined">navigate_next</span>
</div>
{#if left}
	<Calendar move={-100} on:highlight={updateTaken} taken={taken} calendar={true}/>
{:else}
	<Calendar on:highlight={updateTaken2} taken={taken2} calendar={true} showtoday={false} d={new Date(dtt.getFullYear(),dtt.getMonth()+1,1)}/>
{/if}
<div style="display: flex; flex-direction: row-reverse; padding:20px 20px">
	<!-- svelte-ignore missing-declaration -->
	<Button name="Update" on:click={update}/>
</div>