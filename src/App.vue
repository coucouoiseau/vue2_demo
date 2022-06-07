<template>
	<div style="width: 100%;height: 100%;">
		<button @click="$router.push('/')">home</button>
		<button @click="$router.push('/echartsgl')">echartsgl</button>
		<button @click="$router.push('/scoreboard')">scoreboard</button>
		<button @click="$router.push('/indexedDB')">indexedDB</button>
		<button @click="$router.push('/elementTableFlxed')">elementTableFlxed</button>
		<button @click="$router.push('/taskQueue')">taskQueue</button>
		<router-view></router-view>
	</div>
</template>
<script>

</script>

<style scoped>

</style>