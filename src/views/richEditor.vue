<template>
	<editor id="tinymce" v-model="tinymceHtml" :init="einit"></editor>
</template>

<script>
//导入
// 导入富文本
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";

import "tinymce/skins/ui/oxide/skin.min.css"; //富文本样式
import "tinymce/icons/default"; //富文本样式
// 配置富文本
import "tinymce/themes/silver/theme.min.js"; //引入富文本的主要脚本

export default {
	components: { Editor },
	data(){
		return{
			einit: {
				skin_url: require("@/assets/tinymce/skins/ui/oxide/skin.min.css"),
				language_url: require("@/assets/tinymce/langs/zh-Hans.js"),
				language: "zh_CN",
				height: 300,
			},
		}
	},
	mounted() {
		tinymce.init({});
	}
}
</script>

<style scoped>

</style>