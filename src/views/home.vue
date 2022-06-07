<template>
	<div id="myScreen">
		<Button>Primary</Button>
		<a-button @click="screenClick('myScreen')">页面全屏</a-button>
		<button @click="arrProxy.push(11)">添加</button>

		<a-table
			:columns='columnsParent'
			:data-source='data'
			:expanded-row-keys.sync="expandedRowKeys"
		>
			<a slot="expandIcon" slot-scope="props"></a>
			<a slot="name" slot-scope="text, record" href="javascript:;"
			   @click="expand(null,record)">{{ record.name }}</a>
			<!--    <a slot="name" slot-scope="text, record" href="javascript:;" @click="expand(null,record)">{{text}}</a>-->
			<a slot="action" slot-scope="text" href="javascript:;">Delete</a>
			<p slot="expandedRowRender" slot-scope="record" style="margin: 0">
				{{ record.description }}
			</p>
			<a-table
				:pagination="false"
				slot="expandedRowRender" slot-scope="record" style="margin: 0"
				:columns="columnsChildren" :data-source="record.description"
			>
				<span slot="status" slot-scope="text"> <a-badge status="success"/>Finished </span>
				<span slot="operation" slot-scope="text" class="table-operation">
        <a>Pause</a>
        <a>Stop</a>
        <a-dropdown>
          <a-menu slot="overlay">
            <a-menu-item>
              Action 1
            </a-menu-item>
            <a-menu-item>
              Action 2
            </a-menu-item>
          </a-menu>
          <a> More <a-icon type="down"/> </a>
        </a-dropdown>
      </span>
			</a-table>
		</a-table>
		<div style="width: 300px;height: 300px;background-color: #ffbaba;" id="mydiv">
			<button @click="screenClick('mydiv')">局部全屏</button>
		</div>
	</div>
</template>


<script>
let flag = 0;  // 历史数组长度记录

/**
 * 递归
 * @param data proxy代理对象
 * @param ms 延迟时间
 * @param callback
 */
function delayRecursive(data, ms, callback) {
	console.log('delayRecursive-data-length', data.length)
	flag = data.length
	if (data.length) {
		setTimeout(() => {
			callback()
			data.shift() && delayRecursive(data, ms, callback)
		}, ms)
	}
}

/**
 * 创建代理
 * @param arr 原始数组
 */
function createTaskQueueProxy(arr) {
	return new Proxy(arr, {
		get: function (target, key, receiver) {
			/*switch (key) {
				case 'push':
					console.log('push-length',receiver.length)
					if(receiver.length === 1) {
						console.log(11111111)
						delayRecursive(receiver,3000,()=>{console.log('*******',receiver)})
					}
					break;
				case 'pop':
					break;
				case 'shift':
					break;
				case 'unshift':
					break;
				default:
					console.log('get的key为 ===>' + key);
					break;
			}*/
			return Reflect.get(target, key, receiver);
		},
		set(target, key, value, receiver) {
			console.log('set的key为 ===>' + key, value);
			console.log('flag', flag);
			if (!flag && receiver.length === 1) {
				delayRecursive(receiver, 3000, () => {
					console.log('*******', new Date().getTime() ,receiver)
				})
			}
			return Reflect.set(target, key, value, receiver);
		}
	})
}

export default {
	data() {
		return {
			data: [
				{
					key: 1,
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					description: [
						{
							key: 0,
							name: '1',
							platform: 'iOS',
							version: '10.3.4.5654',
							upgradeNum: 500,
							creator: 'Jack',
							createdAt: '2014-12-24 23:12:00',
						}
					],
				},
				{
					key: 2,
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					description: [
						{
							key: 0,
							name: '2',
							platform: 'iOS',
							version: '10.3.4.5654',
							upgradeNum: 500,
							creator: 'Jack',
							createdAt: '2014-12-24 23:12:00',
						}
					],
				},
				{
					key: 3,
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					description: [
						{
							key: 0,
							name: '11111',
							platform: 'iOS',
							version: '10.3.4.5654',
							upgradeNum: 500,
							creator: 'Jack',
							createdAt: '2014-12-24 23:12:00',
						}
					]
				},
			],
			columnsParent: [
				{title: 'Name', dataIndex: '', key: 'name', scopedSlots: {customRender: 'name'}},
				{title: 'Age', dataIndex: 'age', key: 'age'},
				{title: 'Address', dataIndex: 'address', key: 'address'},
				{title: 'Action', dataIndex: '', key: 'x', scopedSlots: {customRender: 'action'}},
			],
			columnsChildren: [
				{title: 'Name', dataIndex: 'name', key: 'name'},
				{title: 'Platform', dataIndex: 'platform', key: 'platform'},
				{title: 'Version', dataIndex: 'version', key: 'version'},
				{title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum'},
				{title: 'Creator', dataIndex: 'creator', key: 'creator'},
				{title: 'Date', dataIndex: 'createdAt', key: 'createdAt'},
				{title: 'Action', key: 'operation', scopedSlots: {customRender: 'operation'}},
			],
			expandedRowKeys: [],
			rowSelection: {
				onChange: (selectedRowKeys, selectedRows) => {
					console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
				},
				onSelect: (record, selected, selectedRows) => {
					console.log(record, selected, selectedRows);
				},
				onSelectAll: (selected, selectedRows, changeRows) => {
					console.log(selected, selectedRows, changeRows);
				},
			},
			arr: [],
			arrProxy: null
		};
	},
	mounted() {
		this.arrProxy = createTaskQueueProxy(this.arr)
	},
	methods: {
		expand(expanded, record) {
			if (this.expandedRowKeys == record.key) {
				this.expandedRowKeys = []
			} else {
				this.expandedRowKeys = [record.key]
			}
		},
		// 进入全屏
		fullScreen(elementId) {
			// let el = document.documentElement;
			let el = document.getElementById(elementId);
			let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
			if (typeof rfs != "undefined" && rfs) {
				rfs.call(el);
			}
		},
		//退出全屏
		exitScreen() {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			if (typeof cfs != "undefined" && cfs) {
				cfs.call(el);
			}
		},
		// 判断是否为全屏
		isFullScreen() {
			return !!(
				document.fullscreen ||
				document.mozFullScreen ||
				document.webkitIsFullScreen ||
				document.webkitFullScreen ||
				document.msFullScreen
			);
		},
		/* 是否为全屏 */
		screenClick(elementId) {
			if (!this.isFullScreen()) {
				this.fullScreen(elementId);
			} else {
				this.exitScreen();
			}
		},
	}
};
</script>

<style scoped>
body {
	background-color: #fff;
}

#myScreen {
	width: 100%;
	height: 100%;
	background-color: #71BCE1;
}
</style>