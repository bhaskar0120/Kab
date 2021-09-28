<script>
	import {initializeApp } from 'firebase/app'
	import {getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
	import {getFirestore,getDoc,doc, setDoc} from 'firebase/firestore'
	import CalendarPage from './calendar/CalendarPage.svelte';
	import GroupCalendar from './calendar/GroupCalendar.svelte';
	import MakeGroup from './group/MakeGroup.svelte';
	import Load from './Load.svelte';
	import Login from "./login/Login.svelte";
	import Main from './Main.svelte';
	import USER from './user';
	import EditGroup from './group/EditGroup.svelte';

	const firebaseConfig = {
		apiKey: "AIzaSyDL_tbGIzUcjaMtej6pSoiglMfJ0DUi5xM",
		authDomain: "freetabs-144.firebaseapp.com",
		projectId: "freetabs-144",
		storageBucket: "freetabs-144.appspot.com",
		messagingSenderId: "1030243753565",
		appId: "1:1030243753565:web:06dd4cb447347ab35137b4",
		measurementId: "G-NRFNHXHD1T"
	};
	const app = initializeApp(firebaseConfig);
	const auth = getAuth();
	const db = getFirestore();

	let page = Load;
	let props;

	onAuthStateChanged(auth, async user=>{
		if(user){

			const docRef = doc(db,`user/${user.uid}`);
			let document = await getDoc(docRef);

			if(!document.exists()){
				console.log("Page Created");
				const toBeWritten = {name:user.displayName, groups:[], email:user.email, username:user.email.split('@')[0].toLowerCase()};
				await setDoc(docRef, toBeWritten);
				USER.set(toBeWritten);
			}
			else{ USER.set(document.data());}
			page = Main

		}
		else page = Login;
	})
	function func(){
		signInWithPopup(auth,new GoogleAuthProvider);
	}


	const pageList = {
		"main": Main,
		"groupCal": GroupCalendar,
		"cal": CalendarPage,
		"group" : MakeGroup,
		"edit": EditGroup,
	}
	function pageSelector(event){
		page = pageList[event.detail.page];
		props = event.detail.props;
	}

</script>
{#if page !== Login }
	<svelte:component this={page} {...props} on:pageChange={pageSelector}/>
{:else}
	<Login on:click={func}/>
{/if}