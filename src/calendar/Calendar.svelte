<script>
	import DateBox from './DateBox.svelte';
	import DateDay from './DateDay.svelte';
	import {fly} from 'svelte/transition';

	export let taken = [];  
	export let move = 100;
	export let calendar = false;
	export let showtoday = true;
	export let d = new Date();
	
	let days = ['Sunday' , 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	let list = [];
	let months = ['January','February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"];
	let firstDay = new Date(d.getFullYear(),d.getMonth(),1).getDay();
	let noDays = new Date(d.getFullYear(), d.getMonth()+1,0).getDate();

	for(let i = 1-firstDay; i <= noDays; ++i)
			list.push(i);
	let size;
	let today = d.getDate();

</script>
<style>
	.cont{
		display : grid;
		gap: 1vh 1vw;
		grid-template-columns: repeat(7,13vw);
	}
	.title{
		display: flex;
		justify-content: center;
	}
	
</style>
<svelte:window bind:innerWidth={size}/>
<div in:fly={{x:move}}>
	<div class="title">
		<span style="font-weight: 600; font-size:xx-large">{months[d.getMonth()]}</span>
	</div>
	<div class="cont">
		{#each days as day}
			{#if size < 600}
			<DateDay name={day.slice(0,2)}/>
			{:else}
			<DateDay name={day}/>
			{/if}
		{/each}
		{#each list as item}
			<DateBox showtoday={showtoday} on:highlight num={item} today={today} highlightable={calendar} taken={taken.includes(item)}/>
		{/each}
	</div>
</div>