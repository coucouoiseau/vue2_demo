<template>
	<div class="count-flop" :key="compKey">
		<div :class="item!='.'?'count-flop-box':'count-flop-point'" v-for="(item, index) in value" :key="index">
			<div v-if="item!='.'" class="count-flop-content" :class="['rolling_' + valueTemp[index] + '_' + item]">
				<div v-for="(item2,index2) in numberList" :key="index2" class="count-flop-num">{{ item2 }}</div>
			</div>
			<div v-else class="count-flop-content">.</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "countFlop",
	data() {
		return {
			value: [],
			valueTemp: [],
			numberList: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			compKey: 0
		};
	},
	props: ["val"],
	watch: {
		val() {
			this.valueTemp = JSON.parse(JSON.stringify(this.value));
			this.value = this.val.toString().split("");
			let lengthGap = Math.abs(this.valueTemp.length - this.value.length)
			if(this.valueTemp.length > this.value.length){
				let i = 0;
				while (i<lengthGap){
					this.valueTemp.shift()
					i++
				}
			}
			if(this.valueTemp.length < this.value.length){
				let i = 0;
				while (i<lengthGap){
					this.valueTemp.unshift(0)
					i++
				}
			}

			this.compKey += 1;
		}
	},
	created() {
		this.value = this.val.toString().split("");
		this.valueTemp = this.val.toString().split("").map(()=>0);
	},
};
</script>

<style scoped lang="scss">
body {
	--translateYStart: translateY(0);
}

.count-flop {
	display: inline-block;
	font-size: 0;
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
	border: 1px solid rgba(72, 152, 241, 0.3);
	line-height: 48px;
	border-radius: 6px;
}

.count-flop-point {
	/* 可更改 */
	margin-right: 5px;
	width: 10px;
}

.count-flop-content {
	font-family: MicrosoftYaHei-Bold;
	text-align: center;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	animation-fill-mode: forwards !important;
}

@for $i from 0 through 9 {
	@for $o from 0 through 9 {
		@keyframes rolling_#{$i}_#{$o} {
			from {
				transform: translateY(-#{$i*10 + '%'});
			}
			to {
				transform: translateY(-#{$o*10 + '%'});
			}
		}
		.rolling_#{$i}_#{$o} {
			animation: rolling_#{$i}_#{$o} 2.1s ease;
		}
	}
}
</style>