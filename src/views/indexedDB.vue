<template>
	<div>
		<el-input v-model="input" placeholder="请输入内容"></el-input>
		<el-select v-model="select" placeholder="请选择">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
	</div>
</template>

<script>
import '@/assets/index'
export default {
	name: "indexedDB",
	data(){
		return{
			input:'',
			select: '',
			options: [{
				value: '黄金糕',
				label: '黄金糕'
			}, {
				value: '双皮奶',
				label: '双皮奶'
			}, {
				value: '蚵仔煎',
				label: '蚵仔煎'
			}, {
				value: '龙须面',
				label: '龙须面'
			}, {
				value: '北京烤鸭',
				label: '北京烤鸭'
			}],

			de:[
				{
					id:1,
					pid:null,
					node:'1',
					child:[
						{
							id:123,
							pid:1,
							node:'1_123',
							child:[

							]
						},
						{
							id:2,
							pid:null,
							node:'1_2',
							child:[

							]
						},
					]
				},
				{
					id:2,
					pid:null,
					node:'2',
					child:[

					]
				},
			]
		}
	},
	watch: {
		select(newValue,oldValue) {
			console.log(newValue,oldValue)
			this.input = (!this.input || oldValue == this.input) ? newValue : this.input
		}
	},
	mounted() {
	},
	methods:{

	},
}
</script>
<!--<script>
import '@/assets/index'
export default {
	name: "indexedDB",
	data(){
		return{
			test1:null,
			test2:null,
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		init(){
			this.test1 = this.createIDB('test1')
			this.test2 = this.createIDB('test2')
		},
		createIDB(IDBName){
			let request = window.indexedDB.open(IDBName);
			request.onerror = function (event) {
				return null
			};
			request.onsuccess = function (event) {
				return request.result
			};
		}
	},
}
</script>-->

<style scoped>

</style>