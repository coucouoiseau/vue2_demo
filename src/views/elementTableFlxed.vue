<template>
	<div class="elementTableFlxed" @click="zuzhiguanbi" v-loading="loading">
		<el-select v-model="form.region" placeholder="请选择活动区域" @blur="ceshi">
			<el-option label="区域一" value="shanghai"></el-option>
			<el-option label="区域二" value="beijing"></el-option>
		</el-select>
<!--		<el-button @click="addData">增加数据</el-button>
		<el-button @click="doLayout">doLayout</el-button>
		<el-table
			:data="tableData"
			style="width: 30%"
			ref="eltablelay"
			height="250">
			<el-table-column
				v-for="(item,index) in tableData"
				:key="index + Math.random()"
				:prop="'ceshi'+index"
				width="120"
				:fixed="index<=2?'left':false"
				:label="'ceshi'+index">
			</el-table-column>
		</el-table>
		<el-cascader
			v-model="value"
			:options="options"
			@change=""></el-cascader>
		<el-date-picker
			v-model="value2"
			align="right"
			type="date"
			placeholder="选择日期"
			:picker-options="pickerOptions">
		</el-date-picker>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="活动名称">
				<el-input v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="活动区域">
				<el-select v-model="form.region" placeholder="请选择活动区域" @blur="ceshi">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="活动时间">
				<el-col :span="11">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.date1"
					                style="width: 100%;"></el-date-picker>
				</el-col>
				<el-col class="line" :span="2">-</el-col>
				<el-col :span="11">
					<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
				</el-col>
			</el-form-item>
			<el-form-item label="即时配送">
				<el-switch v-model="form.delivery"></el-switch>
			</el-form-item>
			<el-form-item label="活动性质">
				<el-checkbox-group v-model="form.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
					<el-checkbox label="地推活动" name="type"></el-checkbox>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="特殊资源">
				<el-radio-group v-model="form.resource">
					<el-radio label="线上品牌商赞助"></el-radio>
					<el-radio label="线下场地免费"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="活动形式">
				<el-input type="textarea" v-model="form.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
		<el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			:fullscreen="true"
			:before-close="handleClose">
			<el-radio label="线上品牌商赞助"></el-radio>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>-->
	</div>
</template>

<script>
let oneRow = {
	ceshi0: '00000000',
	ceshi1: '11111111',
	ceshi2: '22222222',
	ceshi3: '33333333',
	ceshi4: '44444444',
	ceshi5: '55555555',
	ceshi6: '66666666',
	ceshi7: '77777777',
	ceshi8: '88888888',
	ceshi9: '99999999',
	ceshi10: '00000000',
	ceshi11: '11111111',
	ceshi12: '22222222',
	ceshi13: '33333333',
	ceshi14: '44444444',
	ceshi15: '55555555'
}
export default {
	name: "elementTableFlxed",
	data() {
		return {
			dialogVisible: false,
			tableData: [],
			lineNumber: 0,
			loading: false,
			value: [],
			value2: [],
			options: [
				{
					value: 'zhinan',
					label: '指南',
					children: [{
						value: 'shejiyuanze',
						label: '设计原则',
						children: [{
							value: 'yizhi',
							label: '一致'
						}, {
							value: 'fankui',
							label: '反馈'
						}, {
							value: 'xiaolv',
							label: '效率'
						}, {
							value: 'kekong',
							label: '可控'
						}]
					}, {
						value: 'daohang',
						label: '导航',
						children: [{
							value: 'cexiangdaohang',
							label: '侧向导航'
						}, {
							value: 'dingbudaohang',
							label: '顶部导航'
						}]
					}]
				},
				{
					value: 'zujian',
					label: '组件',
					children: [{
						value: 'basic',
						label: 'Basic',
						children: [{
							value: 'layout',
							label: 'Layout 布局'
						}, {
							value: 'color',
							label: 'Color 色彩'
						}, {
							value: 'typography',
							label: 'Typography 字体'
						}, {
							value: 'icon',
							label: 'Icon 图标'
						}, {
							value: 'button',
							label: 'Button 按钮'
						}]
					}, {
						value: 'form',
						label: 'Form',
						children: [{
							value: 'radio',
							label: 'Radio 单选框'
						}, {
							value: 'checkbox',
							label: 'Checkbox 多选框'
						}, {
							value: 'input',
							label: 'Input 输入框'
						}, {
							value: 'input-number',
							label: 'InputNumber 计数器'
						}, {
							value: 'select',
							label: 'Select 选择器'
						}, {
							value: 'cascader',
							label: 'Cascader 级联选择器'
						}, {
							value: 'switch',
							label: 'Switch 开关'
						}, {
							value: 'slider',
							label: 'Slider 滑块'
						}, {
							value: 'time-picker',
							label: 'TimePicker 时间选择器'
						}, {
							value: 'date-picker',
							label: 'DatePicker 日期选择器'
						}, {
							value: 'datetime-picker',
							label: 'DateTimePicker 日期时间选择器'
						}, {
							value: 'upload',
							label: 'Upload 上传'
						}, {
							value: 'rate',
							label: 'Rate 评分'
						}, {
							value: 'form',
							label: 'Form 表单'
						}]
					}, {
						value: 'data',
						label: 'Data',
						children: [{
							value: 'table',
							label: 'Table 表格'
						}, {
							value: 'tag',
							label: 'Tag 标签'
						}, {
							value: 'progress',
							label: 'Progress 进度条'
						}, {
							value: 'tree',
							label: 'Tree 树形控件'
						}, {
							value: 'pagination',
							label: 'Pagination 分页'
						}, {
							value: 'badge',
							label: 'Badge 标记'
						}]
					}, {
						value: 'notice',
						label: 'Notice',
						children: [{
							value: 'alert',
							label: 'Alert 警告'
						}, {
							value: 'loading',
							label: 'Loading 加载'
						}, {
							value: 'message',
							label: 'Message 消息提示'
						}, {
							value: 'message-box',
							label: 'MessageBox 弹框'
						}, {
							value: 'notification',
							label: 'Notification 通知'
						}]
					}, {
						value: 'navigation',
						label: 'Navigation',
						children: [{
							value: 'menu',
							label: 'NavMenu 导航菜单'
						}, {
							value: 'tabs',
							label: 'Tabs 标签页'
						}, {
							value: 'breadcrumb',
							label: 'Breadcrumb 面包屑'
						}, {
							value: 'dropdown',
							label: 'Dropdown 下拉菜单'
						}, {
							value: 'steps',
							label: 'Steps 步骤条'
						}]
					}, {
						value: 'others',
						label: 'Others',
						children: [{
							value: 'dialog',
							label: 'Dialog 对话框'
						}, {
							value: 'tooltip',
							label: 'Tooltip 文字提示'
						}, {
							value: 'popover',
							label: 'Popover 弹出框'
						}, {
							value: 'card',
							label: 'Card 卡片'
						}, {
							value: 'carousel',
							label: 'Carousel 走马灯'
						}, {
							value: 'collapse',
							label: 'Collapse 折叠面板'
						}]
					}]
				},
				{
					value: 'ziyuan',
					label: '资源',
					children: [{
						value: 'axure',
						label: 'Axure Components'
					}, {
						value: 'sketch',
						label: 'Sketch Templates'
					}, {
						value: 'jiaohu',
						label: '组件交互文档'
					}]
				}
			],
			pickerOptions: {
				disabledDate(time) {
					return time.getDay() != 5;
				}
			},
			form: {
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			}
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		ceshi(){
			console.log(111)
		},
		zuzhiguanbi(){
			console.log(2222)
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done();
				})
				.catch(_ => {
				});
		},
		init() {
			this.addData()
		},
		addData() {
			this.loading = true
			setTimeout(() => {
				++this.lineNumber
				let data = []
				for (let i = 0; i < this.lineNumber; i++) {
					data.push(oneRow)
				}
				this.tableData = data
				this.$nextTick(() => {
					setTimeout(() => {
						this.loading = false
					}, 500)
				})
			}, 500)
		},
		doLayout() {
			this.$refs.eltablelay.doLayout()
			this.loading = false
		}
	}
}
</script>

<style scoped>

.elementTableFlxed /deep/ .el-loading-mask {
	background-color: #FFF;
}

::v-deep .el-radio__label {
	font-size: 20px;
}
</style>
