<template>
	<div style="width: 100%;height: 100%;">
		<button @click="$router.push('/')">home</button>
		<button @click="$router.push('/echartsgl')">echartsgl</button>
		<button @click="$router.push('/scoreboard')">scoreboard</button>
		<button @click="$router.push('/indexedDB')">indexedDB</button>
		<button @click="$router.push('/elementTableFlxed')">elementTableFlxed</button>
		<button @click="$router.push('/taskQueue')">taskQueue</button>
		<button @click="$router.push('/richEditor')">richEditor</button>
		<button @click="$router.push('/icon')">icon</button>
		<button @click="$router.push('/tableTree')">tableTree</button>
		<button @click="$router.push('/threeJS')">threeJS</button>
		<button @click="$router.push('/popperDemo')">popperDemo</button>
		<button @click="$router.push('/draggableDemo')">draggableDemo</button>
		<button @click="$router.push('/videoList')">videoList</button>
		<button @click="$router.push('/article')">article</button>
		<button @click="$router.push('/eltableFixed')">eltableFixed</button>
		<button @click="$router.push('/dhtmlxGantt')">dhtmlxGantt</button>
		<button @click="$router.push('/highchartsGantt')">highchartsGantt</button>
		<router-view></router-view>
	</div>
</template>
<script>

</script>

<style scoped>
button{
	margin: 5px;
}
</style>
