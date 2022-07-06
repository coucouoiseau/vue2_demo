<template>
	<div class="box">
		<div>{{drag?'拖拽中':'拖拽停止'}}</div>
		<!--使用draggable组件-->
		<draggable v-model="myArray"  chosenClass="chosen" forceFallback="true" group="people" animation="1000" @start="onStart" @end="onEnd">
			<transition-group>
				<div class="item" v-for="item in myArray" :key="item._id + item.sequence">{{item.name}}</div>
			</transition-group>
		</draggable>
	</div>
</template>

<script>
import draggable from 'vuedraggable'
let arr = [
	{
		"code": "2333",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "南瓜",
		"sequence": 1657004649363,
		"type": 4,
		"_id": "62c3e269be08240018535f02"
	},
	{
		"code": "222",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "阔落",
		"sequence": 1656926202601,
		"type": 4,
		"_id": "62c2affa1eb44c00183530b7"
	},
	{
		"code":"123",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "同读一本书",
		"sequence": 1656924173153,
		"type": 4,
		"_id": "62c2a80d1eb44c001835303c"
	},
	{
		"code": "2333",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "果冻",
		"sequence": 1656402881624,
		"type": 0,
		"_id": "62bab3c11567c900182caf68"
	},
	{
		"code": "",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "广告",
		"sequence": 1657004649363,
		"type": 4,
		"_id": "62b941e51567c900182c89a9"
	},
	{
		"code": "2333",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "挺好的",
		"sequence": 1634026366265,
		"type": 4,
		"_id": "62c3e269be08240018535f02"
	},
	{
		"code": "2333",
		"company": "5bf50760facb21000721eaec",
		"count": 0,
		"name": "de的",
		"sequence": 1634020562608,
		"type": 4,
		"_id": "61652cd25509f0001872e606"
	}
]

export default {
	name: "draggableDemo",
	components: {
		draggable,
	},
	data() {
		return {
			drag: false,
			//定义要被拖拽对象的数组
			myArray:[],
			sequenceMap:[]
		};
	},
	mounted() {
		this.myArray = arr.sort((a,b)=>a.sequence - b.sequence)
		this.sequenceMap = this.myArray.map(item=>item.sequence)
	},
	methods: {
		//开始拖拽事件
		onStart(){
			this.drag=true;
		},
		//拖拽结束事件
		onEnd() {
			this.drag=false;
			this.myArray.forEach((item,index)=>{
				item.sequence = this.sequenceMap[index]
			})
		},
	},
}
</script>

<style scoped lang="scss">
.box{
	padding: 50px;
}
.item{
	width: 100%;
	border: 1px solid black;
	margin: 10px ;
}
</style>
