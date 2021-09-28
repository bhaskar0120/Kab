<script>
	import {createEventDispatcher} from 'svelte';
	export let num = 0;
	export let today = 0;
	export let taken = false;
	export let highlightable = true;
	export let showtoday = true;

	const disp = createEventDispatcher();
	function clickHandler(){
		if(((num >= today && !showtoday) || (num>today) )&& highlightable){
			highlight = !highlight;
			disp('highlight',{num:num});
		}
	}

	let highlight = false;
	let prevNoDays;
	if(num <= 0 ){
			let d = new Date();
			prevNoDays = new Date(d.getFullYear(), d.getMonth(), 0).getDate();
	}
	if(highlightable){
		highlight = taken;
		taken = false;
	}
</script>

<div  class:dull={num < today} class:highlight={highlight}
	 class:today={num == today && showtoday} class:taken={(num > today || (num == today && !showtoday)) && taken && !highlightable} on:mousedown={clickHandler}>
	<span class="big">
		{num>0?num:num+prevNoDays}
	</span>
</div>

<style>
	.taken{
		background-color: lightcoral;
	}
	.highlight{
		background: #ffc;
	}
	.dull{
		background:#eee;
		opacity: 70%;
	}
	.big{
		font-size:large;
	}
	.today{
		background-color: #cef;
	}

	div{
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
		width: 100%;
		height: 11vw;
		display: flex;
		justify-content: center;
		border: 2px transparent solid;

	}
	.highlight:hover{
		border: 2px #eee solid;
	}
</style>