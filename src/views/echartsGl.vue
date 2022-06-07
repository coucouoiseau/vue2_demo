<template>
	<div style="width:100%;height: 100%;">
		<div style="width:100%;height: 100%;" ref="chart"></div>
	</div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl'
import continent from "../assets/json/continent.json"
import world from "../assets/json/world.json"
export default {
	name: "echartsGl",
	mounted() {
		this.init()
	},
	methods:{
		init(){
			echarts.registerMap('continent', continent);
			let myChart = echarts.init(this.$refs.chart)
			let option = {
				backgroundColor: '#cdcfd5',
				geo3D: {
					map: 'continent',
					shading: 'lambert',
				},
			}
			myChart.setOption(option);
		}
	}
}
</script>

<style scoped>

</style>