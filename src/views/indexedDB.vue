<template>
	<div style="background-color: #00feff">
		<el-input v-model="input" placeholder="请输入内容"></el-input>
		<el-select v-model="select" placeholder="请选择">
			<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
		</el-select>
				<el-upload
					class="upload-demo"
					action="https://jsonplaceholder.typicode.com/posts/"
					:on-preview="handlePreview"
					:on-remove="handleRemove"
					:file-list="fileList"
					list-type="picture">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					<template slot="file" >

					</template>
		<!--			<div slot="file" >只能上传jpg/png文件，且不超过500kb</div>-->
				</el-upload>
		<treeNode style="width: 100px;height: 100px;" :val="treeData"></treeNode>
		<a-button type="primary" @click="showDrawer">Open</a-button>
		<drawerNode :visible="childVvisible"></drawerNode>
		<div style="position: relative">
			<canvas ref="canvas" id="canvas" width="900" height="700"></canvas>
		</div>
	</div>
</template>

<script>
import '@/assets/index';
import treeNode from "@/components/treeNode";
import drawerNode from "@/components/drawerNode";

export default {
	name: "indexedDB",
	components: {treeNode, drawerNode},
	data() {
		return {
			childVvisible: false,
			treeData: {
				name: '11',
				child: {
					name: '22',
					child: {
						name: '33',
						child: {
							name: '44',

						}
					}
				}
			},
			input: '',
			select: '',
			options: [
				{
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

			de: [
				{
					id: 1,
					pid: null,
					node: '1',
					child: [
						{
							id: 123,
							pid: 1,
							node: '1_123',
							child: []
						},
						{
							id: 2,
							pid: null,
							node: '1_2',
							child: []
						},
					]
				},
				{
					id: 2,
					pid: null,
					node: '2',
					child: []
				},
			],
			fileList: [
				{
					name: 'food.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}, {
					name: 'food2.jpeg',
					url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
				}
			]
		}
	},
	watch: {
		select(newValue, oldValue) {
			console.log(newValue, oldValue)
			this.input = (!this.input || oldValue == this.input) ? newValue : this.input
		},
	},
	mounted() {
		let canva = this.$refs.canvas
		let ctx = canva.getContext('2d')
		var img1 = new Image();
		img1.src = require('@/assets/2222.png')
		var img2 = new Image();
		img2.src = require('@/assets/1111.png')
		setTimeout(() => {
			ctx.drawImage(img1, 0, 0, 900, 700)
			ctx.globalCompositeOperation = 'destination-in';
			ctx.drawImage(img2, 0, 0, 900, 700)
		}, 10)
	},
	methods: {

		showDrawer() {
			this.childVvisible = true
		},
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		}
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

::v-deep .el-upload-list__item:after {
	content: "1/2";
	position: absolute;
	bottom: 0;
	right: 0
}
</style>
