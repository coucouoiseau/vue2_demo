<template>
	<div class="box">
		<el-button @click="setCale('0.7')">
			设置缩放 cale 0.7
		</el-button>
		<el-button @click="setCale('1')">
			设置缩放 cale 1
		</el-button>
		<el-button @click="setCale('1.5')">
			设置缩放 cale 1.5
		</el-button>
		<div class="container" :class="{ cale1: cale1, cale2: cale2 }">
			<div>
<!--				<el-popover-->
<!--					:appendToBody="false"-->
<!--					:popperOptions="{positionFixed:true}"-->
<!--					placement="top-start"-->
<!--					title="标题"-->
<!--					width="200"-->
<!--					trigger="hover"-->
<!--					content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
<!--					<el-button slot="reference">hover 激活</el-button>-->
<!--				</el-popover>-->
				<el-popover
					:appendToBody="false"
					:popperOptions="{
						positionFixed:true
					}"
					placement="bottom"
					title="标题"
					width="200"
					trigger="click"
					content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
					<el-button slot="reference">click 激活</el-button>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script>
import './ceshi.js'
export default {
	name: "popperDemo",
	data() {
		return {
			cale1: false,
			cale2: false,
		}
	},
	mounted() {
		console.log(a)
	},
	methods: {
		setCale(v) {
			switch (v) {
				case '0.7':
					this.cale1 = true
					break;
				case '1':
					this.cale1 = this.cale2 = false
					break;
				case '1.5':
					this.cale2 = true
					break;
			}
		}
	}
}
</script>

<style scoped>
.box {
	width: 100%;
	height: 1000px;
	border: 1px solid red;
}

.container {
	width: 800px;
	height: 500px;
	border: 1px solid green;
	margin: 100px;
}

.cale1 {
	transform: scale(0.7);
	transform-origin: top left;
}

.cale2 {
	transform: scale(1.5);
	transform-origin: top left;
}
</style>
