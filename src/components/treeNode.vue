<template>
	<div class="box" v-if="JSON.stringify(val)!=='{}'">
		{{val.name}}
		<treeNode :val="nodeData"></treeNode>
	</div>
</template>

<script>
import treeNode from "@/components/treeNode";

export default {
	name:'treeNode',
	components:{treeNode},
	props:{
		val:{
			type: Object,
			default: ()=>{
				return {}
			}
		}
	},
	computed:{
		nodeData(){
			return this.val?.child || {}
		}
	}
}
</script>

<style scoped>
.box{
	width: 95%;
	height: 95%;
	margin: 3% 2% 2% 3%;
	border: 1px solid red;
}
</style>