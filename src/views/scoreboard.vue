<template>
	<div id="myScreen">
		<div>
			<input type="text" v-model="valTemp">
			<button @click="setVal">设置</button>
		</div>
		<div>
			<countFlop :val="val"></countFlop>
		</div>
	</div>
</template>

<script>
import countFlop from '@/components/countFlop.vue'
import '@/assets/index'
export default {
	name: "scoreboard",
	components: {countFlop},
	data() {
		return {
			val: 0,
			valTemp:0
		}
	},
	methods:{
		setVal(){
			this.val = this.valTemp
		}
	}
}
</script>

<style scoped>
#myScreen{
	width: 100%;
	height: 100%;
	margin: 100px;
	position: relative;
}
</style>