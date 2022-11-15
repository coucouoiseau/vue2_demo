let str = "测试测试\n\n\n```javascript\n<template>\n  <div class=\"detail\">\n    <el-row :gutter=\"20\">\n      <el-col :xs=\"24\" :sm=\"24\" :md=\"24\" :lg=\"24\">\n        <el-card class=\"box-card margin-bottom box-shadow-my\">\n          <div slot=\"header\" class=\"clearfix\">\n            <h1>{{ detailData.title }}</h1>\n          </div>\n          <div class=\"para-text\">\n            <div class=\"yuan-chuang\">\n              <img src=\"@/static/img/yuan-chuang.png\" />\n            </div>\n            <div>\n              <span class=\"margin-right\">创作人：{{ detailData.author }} </span>\n              <span class=\"margin-right\">发布日期： {{ detailData.time }}</span>\n              <span class=\"margin-right\"\n                >更新日期： {{ detailData.updateTime }}</span\n              >\n\n              <span\n                @click=\"addLikes\"\n                class=\"margin-right detail-content hover-pointer\"\n              >\n                <svg-icon icon-class=\"like\" className=\"like\" />\n                <span>{{ likes }}</span>\n              </span>\n              <span class=\"margin-right detail-content\">\n                <svg-icon icon-class=\"read\" className=\"read\" />\n                <span>{{ read }}</span>\n              </span>\n              <div class=\"tag-content\">\n                <span>标签：</span>\n                <el-tag\n                  v-for=\"item in detailData.tagList\"\n                  :key=\"item.id\"\n                  :type=\"item.colorType\"\n                  class=\"tag\"\n                  effect=\"dark\"\n                >\n                  {{ item.name }}\n                </el-tag>\n              </div>\n            </div>\n          </div>\n          <div\n            v-if=\"detailData && detailData.data && detailData.data.quillEditor\"\n            class=\"content ql-editor\"\n            id=\"article\"\n          >\n            <mavon-editor\n              v-model=\"detailData.data.quillEditor\"\n              :ishljs=\"false\"\n              default-open=\"preview\"\n              :editable=\"false\"\n              :subfield=\"false\"\n              :toolbarsFlag=\"false\"\n            />\n          </div>\n          <!-- style=\"height: calc(100vh - 342px)\" -->\n          <el-empty v-else description=\"暂无数据\"></el-empty>\n        </el-card>\n      </el-col>\n      <!-- <el-col :xs=\"0\" :sm=\"24\" :md=\"6\" :lg=\"6\">\n        <el-card\n          class=\"box-card margin-bottom\"\n          style=\"\n            box-shadow: rgba(240, 46, 170, 0.4) 5px 5px,\n              rgba(240, 46, 170, 0.3) 10px 10px,\n              rgba(240, 46, 170, 0.2) 15px 15px,\n              rgba(240, 46, 170, 0.1) 20px 20px,\n              rgba(240, 46, 170, 0.05) 25px 25px;\n          \"\n        >\n          <div slot=\"header\" class=\"clearfix\">导航栏</div>\n          <div>\n            <div>01.视频目录</div>\n            <div>02. Nuxt3简介和环境搭建</div>\n            <div>03. Nuxt3简介和环境搭建</div>\n            <div>04. Nuxt3简介和环境搭建</div>\n            <div>05. Nuxt3简介和环境搭建</div>\n            <div>06. Nuxt3简介和环境搭建</div>\n          </div>\n        </el-card>\n      </el-col> -->\n    </el-row>\n  </div>\n</template>\n```\n\n\n```java\n<script>\nimport \"mavon-editor/dist/markdown/github-markdown.min.css\";\nimport hljs from \"mavon-editor/dist/highlightjs/highlight.min.js\";\nimport \"mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css\";\nimport { queryArticle, addLikes, addRead } from \"../../api/home\";\nexport default {\n  head() {\n    return {\n      title: `${this.detailData.title} - 安哥技术博客`,\n      meta: [\n        {\n          hid: \"keywords\",\n          name: \"keywords\",\n          content: this.detailData.keywords,\n        },\n        {\n          hid: \"description\",\n          name: \"description\",\n          content: this.detailData.details,\n        },\n      ],\n    };\n  },\n  components: {\n    // quillEditor\n  },\n  data() {\n    return {\n      detailData: [],\n      likes: \"\",\n      read: \"\",\n    };\n  },\n  mounted() {\n    addRead(this.$route.query.id).then((res) => {});\n    this.$nextTick(() => {\n      const code = document.querySelectorAll(\"pre\");\n      code.forEach((item) => {\n        console.log(item);\n        // 取出 code 的父元素 pre（后面方便使用）\n        let pre = item.parentElement;\n\n        // 添加拖动属性\n        this.dragAround(item);\n\n        // 新建元素 代码块序号\n        let lineNumBox = document.createElement(\"div\");\n        lineNumBox.setAttribute(\"style\", \"height: \" + item.offsetHeight + \"px\");\n        lineNumBox.className = \"line-num-box\";\n        // 插入序号 计算方式：获取code元素的高并除以行高，得到行数，根据行数插入序号\n        let num = \"\"; // 设行高二十\n        for (let i = 1; i <= Math.ceil(item.offsetHeight / 20); i++) {\n          num += i + \"\\n\"; // 序号加上换行符\n        }\n        lineNumBox.innerText = num; // 插入序号\n        item.parentElement.insertBefore(lineNumBox, item);\n\n        let codeBox = document.createElement(\"div\");\n        codeBox.className = \"code-box\";\n        codeBox.appendChild(item);\n        pre.appendChild(codeBox);\n        let icon =\n          `<div class=\"mac-icon\">` +\n          `<button class=\"copy-button\">复制</button>` +\n          `</div>`;\n        pre.insertAdjacentHTML(\"afterbegin\", icon);\n        console.log(\n          pre.firstElementChild.getElementsByClassName(\"copy-button\")[0]\n        );\n        // return;\n        // 获取复制元素\n        let copyButton =\n          pre.firstElementChild.getElementsByClassName(\"copy-button\")[0];\n        copyButton.onclick = function () {\n          // https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard/writeText\n          const copyPromise = navigator.clipboard.writeText(\n            pre.lastElementChild.innerText\n          );\n          copyPromise\n            .then(() => {\n              console.log(\"复制成功\");\n            })\n            .catch(() => {\n              console.log(\"复制失败\");\n            });\n        };\n        hljs.highlightBlock(codeBox.firstElementChild);\n      });\n    });\n  },\n  async fetch() {\n    const data = {\n      id: this.$route.query.id,\n      pageNum: 0,\n      pageSize: 0,\n    };\n    await queryArticle(data).then((res) => {\n      this.detailData = res.list[0];\n      this.likes = res.list[0].likes;\n      this.read = res.list[0].read;\n    });\n  },\n  methods: {\n    // 给某个元素添加左右拖动属性\n    dragAround(anyElement) {\n      let mouseDown = false; // 鼠标是否按下\n      let x = 0; // 鼠标点击的下标\n      let left = 0; // 当前滚动条位置\n      anyElement.onmousedown = function (e) {\n        mouseDown = true; // 鼠标按下\n        x = e.clientX; // 获取鼠标点击位置 （x坐标）\n        left = this.scrollLeft; // 滚动条当前位置\n      };\n      anyElement.onmousemove = function (e) {\n        // 鼠标按下\n        if (mouseDown) {\n          let curX = e.clientX; // 鼠标移动到当前的位置\n          let diffX = curX - x; // 鼠标移动距离（当前位置 减去之前的位置）\n          this.scrollLeft = left - diffX;\n        }\n      };\n      anyElement.onmouseup = function () {\n        mouseDown = false;\n      };\n      anyElement.onmouseleave = function () {\n        mouseDown = false;\n      };\n    },\n    addLikes() {\n      addLikes(this.$route.query.id).then((res) => {\n        // 获取点赞+阅读\n        const dataReadLikes = {\n          id: this.$route.query.id,\n          pageNum: 0,\n          pageSize: 0,\n        };\n        queryArticle(dataReadLikes).then((resReadLikes) => {\n          this.likes = resReadLikes.list[0].likes;\n          this.read = resReadLikes.list[0].read;\n        });\n      });\n    },\n  },\n};\n</script>\n\n<style scoped lang=\"scss\">\n@media screen and (max-width: 767px) {\n}\n@media (min-width: 768px) {\n} //>=768的设备  平板\n@media (min-width: 992px) {\n  .detail {\n    max-width: 100%;\n  }\n} //>=992的设备 电脑\n@media (min-width: 1200px) {\n  .detail {\n    max-width: 1440px;\n  }\n} //>=1200的设备 大显示器\n.box-shadow-my {\n  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,\n    rgba(0, 0, 0, 0.22) 0px 10px 10px;\n}\n.margin-right {\n  margin-right: 10px;\n}\n.margin-bottom {\n  margin-bottom: 20px;\n}\n.detail {\n  // max-width: 1280px;\n  // min-width: 1280px;\n  margin: 0 auto;\n  .para-text {\n    position: relative;\n    .yuan-chuang {\n      top: 0;\n      left: 0;\n      position: absolute;\n      img {\n        width: 36px;\n        height: 32px;\n      }\n    }\n    padding: 5px 10px 10px 45px;\n    background-color: #eeeeee;\n  }\n  .content {\n    margin-top: 20px;\n  }\n  .tag-content {\n    margin-top: 10px;\n    .tag {\n      margin-right: 10px;\n    }\n  }\n  .i-count {\n    margin-right: 5px;\n    font-size: 24px;\n    vertical-align: text-bottom;\n  }\n}\n.img {\n  margin-right: 5px;\n  width: 30px;\n  height: 30px;\n}\n\n.box-card {\n  opacity: 0.8;\n}\n\n.detail-content {\n  display: inline-flex;\n  align-items: flex-end;\n  vertical-align: bottom;\n  span {\n    font-size: 18px;\n  }\n}\n\n.hover-pointer {\n  cursor: pointer;\n}\n\n.like,\n.read {\n  margin-right: 5px;\n  font-size: 22px;\n}\n\n#article {\n}\n\n>>> pre {\n  border: 1px solid red;\n  background-color: #1e1e1e !important;\n  border-radius: 15px !important;\n}\n\n/* 自定义全屏样式 */\n>>> .pre-full-screen {\n  position: fixed;\n  left: 0 !important;\n  top: 0 !important;\n  width: 100vw !important;\n  z-index: 100;\n  height: 100vh !important;\n}\n\n>>> .line-num-box {\n  display: inline-block;\n  color: white;\n  border-right: 2px solid white;\n  line-height: 20px !important;\n  font-size: 16px !important;\n  text-align: right;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\n>>> .code-box {\n  display: inline-block;\n  vertical-align: top;\n  width: calc(100% - 50px);\n  border-left-style: none;\n}\n\n/*滚动条样式 https://m.php.cn/article/475268.html*/\n>>> code {\n  line-height: 20px !important;\n  font-size: 16px !important;\n  vertical-align: top;\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n  padding-left: 10px !important;\n}\n\n>>> code::-webkit-scrollbar {\n  /*滚动条整体样式*/\n  /*width: 100px !important;*/\n  height: 10px;\n  border-radius: 5px;\n  background-color: green;\n}\n\n>>> code::-webkit-scrollbar-thumb {\n  /*滚动条里面小方块*/\n  border-radius: 5px;\n  background-color: wheat;\n}\n\n>>> code::-webkit-scrollbar-button {\n  /*滚动条的轨道的两端按钮，允许通过点击微调小方块的位置*/\n  border-radius: 5px;\n  background-color: yellow;\n}\n\n>>> .mac-icon {\n  border-bottom: 1px solid silver;\n  margin-bottom: 5px;\n  color: deeppink;\n}\n\n>>> .mac-icon > span {\n  display: inline-block;\n  letter-spacing: 5px;\n  word-spacing: 5px;\n  width: 16px;\n  height: 16px;\n  border-radius: 8px;\n}\n\n>>> .mac-icon-red {\n  background-color: red;\n}\n\n>>> .mac-icon-yellow {\n  margin-left: 10px;\n  background-color: yellow;\n}\n\n>>> .mac-icon-green {\n  margin-left: 10px;\n  background-color: green;\n}\n\n>>> .mac-icon-lang {\n  width: 50px !important;\n  padding-left: 10px;\n  font-size: 16px;\n  vertical-align: top;\n}\n\n>>> .copy-button,\n>>> .full-screen-button {\n  width: 40px;\n  height: 20px;\n  background-color: wheat;\n  margin-bottom: 3px;\n  border-radius: 5px;\n  outline: none;\n  border: none;\n}\n\n>>> .full-screen-button {\n  width: 40px !important;\n  height: 20px;\n}\n\n>>> .copy-button {\n  /*\n        减去padding 2*16（如果使box-sizing: border-box;则不用减去)，\n        减去图标 3*16\n        图标间隙 10*2\n        语言 宽度 50px\n        减去本身宽 40px\n        全屏按钮 margin-left 10px\n        全屏按钮宽 40px\n    */\n  margin-left: calc(100% - 208px);\n}\n\n>>> .full-screen-button {\n  margin-left: 10px;\n}\n\n>>> .copy-button:hover,\n>>> .full-screen-button:hover {\n  background-color: white;\n}\n</style>\n```\n测试"
export default str