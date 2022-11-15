<template>
	<!-- 文章 -->
	<div id="article">
<!--		<div class="markdown-body" v-html="article.content"></div>-->
		<mavon-editor
			v-model="article.content"
			:ishljs="false"
			default-open="preview"
			:editable="false"
			:subfield="false"
			:toolbarsFlag="false"
		/>
		<img src="@/assets/logo.png" alt="">
	</div>
</template>

<script>
import str from '@/assets/str'
import 'mavon-editor/dist/markdown/github-markdown.min.css';
import hljs from 'mavon-editor/dist/highlightjs/highlight.min.js';
import 'mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css';

export default {
	name: 'Article',
	data() {
		return {
			article: {
				content: str
			},
		};
	},
	async mounted() {
		this.$nextTick(() => {
			const code = document.querySelectorAll('pre code');
			console.log(code)
			code.forEach((item) => {
				// 取出 code 的父元素 pre（后面方便使用）
				let pre = item.parentElement;

				// 添加拖动属性
				this.dragAround(item);

				// 新建元素 代码块序号
				let lineNumBox = document.createElement('div');
				lineNumBox.setAttribute('style', 'height: ' + item.offsetHeight + 'px');
				lineNumBox.className = 'line-num-box';
				// 插入序号 计算方式：获取code元素的高并除以行高，得到行数，根据行数插入序号
				let num = '';  // 设行高二十
				for (let i = 1; i <= Math.ceil(item.offsetHeight / 20); i++) {
					num += i + '\n'; // 序号加上换行符
				}
				lineNumBox.innerText = num;// 插入序号
				item.parentElement.insertBefore(lineNumBox, item);

				let codeBox = document.createElement('div');
				codeBox.className = 'code-box';
				codeBox.appendChild(item);

				pre.appendChild(codeBox);

				let lang = pre.lastElementChild.firstElementChild.className;
				let icon = `<div class="mac-icon">` +
					`<span class="mac-icon-red"></span>` +
					`<span class="mac-icon-yellow"></span>` +
					`<span class="mac-icon-green"></span>` +
					`<span class="mac-icon-lang">${lang.split('-')[1].toUpperCase()}</span>` +
					`<button class="copy-button">复制</button>` +
					`<button class="full-screen-button">全屏</button>` +
					`</div>`;
				pre.insertAdjacentHTML('afterbegin', icon);

				// 获取复制元素
				let copyButton = pre.firstElementChild.getElementsByClassName('copy-button')[0];
				copyButton.onclick = function () {
					// https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText
					const copyPromise = navigator.clipboard.writeText(pre.lastElementChild.innerText);
					copyPromise.then(() => {
						alert('复制成功');
					}).catch(() => {
						alert('复制失败');
					});
				};

				// 获取全屏按钮元素
				let fullScreenButton = pre.firstElementChild.getElementsByClassName('full-screen-button')[0];
				fullScreenButton.onclick = function () {
					// 此写法基于 pre 元素没有其他任何类名的情况下
					if (pre.className === 'pre-full-screen') {
						this.innerText = '全屏';
						pre.className = '';
						pre.setAttribute("title", "");
					} else {
						this.innerText = '关闭';
						pre.className = 'pre-full-screen';
						pre.setAttribute("title", "双击关闭全屏");
					}
				};
				// 双击关闭全屏
				pre.ondblclick = function () {
					fullScreenButton.innerText = '全屏';
					// 此写法基于 pre 元素没有其他任何类名的情况下
					this.className = '';
					pre.setAttribute("title", "");
				};
				hljs.highlightBlock(codeBox.firstElementChild);
			});
		});
	},
	methods: {
		// 给某个元素添加左右拖动属性
		dragAround(anyElement) {
			let mouseDown = false; // 鼠标是否按下
			let x = 0; // 鼠标点击的下标
			let left = 0; // 当前滚动条位置
			anyElement.onmousedown = function (e) {
				mouseDown = true;       // 鼠标按下
				x = e.clientX;          // 获取鼠标点击位置 （x坐标）
				left = this.scrollLeft; // 滚动条当前位置
			};
			anyElement.onmousemove = function (e) {
				// 鼠标按下
				if (mouseDown) {
					let curX = e.clientX; // 鼠标移动到当前的位置
					let diffX = curX - x; // 鼠标移动距离（当前位置 减去之前的位置）
					this.scrollLeft = left - diffX;
				}
			};
			anyElement.onmouseup = function () {
				mouseDown = false;
			};
			anyElement.onmouseleave = function () {
				mouseDown = false;
			};
		},
	},
};
</script>

<style scoped>
#article {
	width: 100%;
}

>>> pre {
	border: 1px solid red;
	background-color: #1E1E1E !important;
	border-radius: 15px !important;
}

/* 自定义全屏样式 */
>>> .pre-full-screen {
	position: fixed;
	left: 0 !important;
	top: 0 !important;
	width: 100vw !important;
	z-index: 100;
	height: 100vh !important;
}

>>> .line-num-box {
	display: inline-block;
	color: white;
	border-right: 2px solid white;
	line-height: 20px !important;
	font-size: 16px !important;
	text-align: right;
	padding-left: 10px;
	padding-right: 10px;
}

>>> .code-box {
	display: inline-block;
	vertical-align: top;
	width: calc(100% - 50px);
	border-left-style: none;
}

/*滚动条样式 https://m.php.cn/article/475268.html*/
>>> code {
	line-height: 20px !important;
	font-size: 16px !important;
	vertical-align: top;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
	padding-left: 10px !important;
}

>>> code::-webkit-scrollbar { /*滚动条整体样式*/
	/*width: 100px !important;*/
	height: 10px;
	border-radius: 5px;
	background-color: green;
}

>>> code::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
	border-radius: 5px;
	background-color: wheat;
}

>>> code::-webkit-scrollbar-button { /*滚动条的轨道的两端按钮，允许通过点击微调小方块的位置*/
	border-radius: 5px;
	background-color: yellow;
}

>>> .mac-icon {
	border-bottom: 1px solid silver;
	margin-bottom: 5px;
	color: deeppink;
}

>>> .mac-icon > span {
	display: inline-block;
	letter-spacing: 5px;
	word-spacing: 5px;
	width: 16px;
	height: 16px;
	border-radius: 8px;
}

>>> .mac-icon-red {
	background-color: red;
}

>>> .mac-icon-yellow {
	margin-left: 10px;
	background-color: yellow;
}

>>> .mac-icon-green {
	margin-left: 10px;
	background-color: green;
}

>>> .mac-icon-lang {
	width: 50px !important;
	padding-left: 10px;
	font-size: 16px;
	vertical-align: top;
}

>>> .copy-button, >>> .full-screen-button {
	width: 40px;
	height: 20px;
	background-color: wheat;
	margin-bottom: 3px;
	border-radius: 5px;
	outline: none;
	border: none;
}

>>> .full-screen-button {
	width: 40px !important;
	height: 20px;
}

>>> .copy-button {
	/*
		减去padding 2*16（如果使box-sizing: border-box;则不用减去)，
		减去图标 3*16
		图标间隙 10*2
		语言 宽度 50px
		减去本身宽 40px
		全屏按钮 margin-left 10px
		全屏按钮宽 40px
	*/
	margin-left: calc(100% - 208px);
}

>>> .full-screen-button {
	margin-left: 10px;
}

>>> .copy-button:hover, >>> .full-screen-button:hover {
	background-color: white;
}
</style>
