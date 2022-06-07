<template>
	<div class="count-flop" :key="'countFlop-element'">
		<div class="count-flop-box" v-for="(item, index) in value" :key="'countFlop-value'+index">
			<div class="count-flop-content" :style="{top:`-${item*48}px`}">
				<div v-for="(item2,index2) in 10" :key="'countFlop-value2'+index2">
					{{ index2 }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "countFlop",
	props:["val"],
	data(){
		return{
			value: [],
		}
	},
	watch: {
		val() {
			this.value = this.val.toString().split("").map(item=>Number(item));
		}
	},
	created() {
		this.value = this.val.toString().split("").map(item=>Number(item));
	},
}
</script>

<style scoped>
.count-flop {
	display: inline-block;
	/* 可更改 */
	height: 50px;
	line-height: 50px;
	font-size: 36px;
	color: #4898f1;
}

.count-flop > div {
	position: relative;
	display: inline-block;
	overflow: hidden;
	height: 100%;
}

.count-flop-box {
	/* 可更改 */
	margin-right: 5px;
	width: 36px;
	border: 1px solid red;
	line-height: 48px;
	border-radius: 6px;
	position: relative;
}

.count-flop-content {
	font-family: MicrosoftYaHei-Bold;
	text-align: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	animation-fill-mode: forwards !important;
	transition: all 2s ease;
}
</style>