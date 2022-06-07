<template>
	<div id="myScreen">
		<button @click="arrProxy.push(11)">添加</button>
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
			arr: [],
			arrProxy: null
		};
	},
	mounted() {
		this.arrProxy = createTaskQueueProxy(this.arr)
	},
	methods: {

	}
};
</script>

<style scoped>

</style>