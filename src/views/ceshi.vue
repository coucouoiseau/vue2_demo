<template>
	<el-button @click="gen">ceshi</el-button>
</template>

<script>
export default {
	name: "ceshi",
	props:{
		onSuccess:Function
	},
	data(){
		return{
			excelData:{
				header:11,
				results:11
			}
		}
	},
	methods:{
		gen({header,results}){
			this.onSuccess(this.excelData)
		}
	}
}
</script>

<style scoped>

</style>