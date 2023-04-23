<template>
	<div class="container gunter">
		<div ref="gantt" class="gantt-container"></div>
	</div>
</template>
<script>
import {gantt} from 'dhtmlx-gantt';
export default {
	name: 'gantt',
	data() {
		return {
			tasks:{
				data: [
					{
						id: 1,
						text: 'Task1',
						start_date: '2020-12-15',
						personName: '张总',
						duration: 3,
						progress: 0.6,
						color: '#1890FF'
					},
					{
						id: 2,
						text: 'Task2',
						start_date: '2020-12-18',
						personName: '李总',
						duration: 6,
						progress: 0.4,
						color: '#1890FF '
					},
					{
						id: 3,
						text: 'Task3',
						start_date: '2020-12-18',
						personName: '赵总',
						duration: 4,
						progress: 0.2,
						color: '#1890FF '
					},
					{
						id: 4,
						text: 'Task4',
						start_date: '2020-12-21',
						personName: '赵总',
						duration: 3,
						progress: 0,
						color: '#1890FF ',
						parent: 3
					}
				],
				links: [{ id: 1, source: 1, target: 2, type: '0' }]
			}
		}
	},
	mounted() {
		this.init2()
	},
	methods: {
		init() {
			this.tasks = {
				data: [
					{
						id: 1,
						text: '已执行',
						start_date: '2020-04-08',
						duration: 10,
						open: true,
						toolTipsTxt: 'xxx项目概念设计',
						// progress: 0.6,
						status: "parent",
						color: "#526ade"
					},
					{
						toolTipsTxt: 'xxx项目-项目启动会',
						text: '执行中', // 任务名
						start_date: '2020-04-08', // 开始时间
						id: 11, // 任务id
						duration: 3, // 任务时长，从start_date开始计算
						parent: 1, // 父任务ID
						type: 1,
						open: true,
						status: "yellow",
						color: "#f7cf5e"
					},
					{
						toolTipsTxt: 'xxx项目-项目启动会议',
						text: '待开展',
						start_date: '2020-04-11',
						id: 12,
						duration: 2,
						parent: 11,
						type: 2,
						status: "pink",
						color: "#5dbeee"
					}
				]
			},
			//自适应甘特图的尺寸大小, 使得在不出现滚动条的情况下, 显示全部任务
			gantt.config.autosize = true
			//只读模式
			gantt.config.readonly = true
			//是否显示左侧树表格
			gantt.config.show_grid = true
			//表格列设置
			gantt.config.columns = [
				{
					name: 'text',
					label: '阶段名字',
					tree: true,
					width: '280',
					onrender: function (task, node) {
						node.setAttribute("class", "gantt_cell gantt_last_cell gantt_cell_tree " + task.status);
					}
				},
				{
					name: 'duration',
					label: '时长',
					align: 'center',
					template: function (obj) {
						return obj.duration + '天'
					},
					hide: true
				}
			]


			var weekScaleTemplate = function (date) {
				var dateToStr = gantt.date.date_to_str("%m %d");
				var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
				var weekNum = gantt.date.date_to_str("第 %W 周");
				return weekNum(date)
			};
			var daysStyle = function (date) {
				var dateToStr = gantt.date.date_to_str("%D");
				if (dateToStr(date) == "六" || dateToStr(date) == "日") return "weekend";
				return "";
			};
			gantt.config.subscales = [
				// {
				// 	unit: "week",
				// 	step: 1,
				// 	template: weekScaleTemplate
				// },
				{
					unit: "day",
					step: 1,
					format: "%d"
				}
			];

			gantt.plugins({
				tooltip: true,
				keyboard_navigation: true
			});
			gantt.attachEvent("onGanttReady", function () {
				var tooltips = gantt.ext.tooltips;
				gantt.templates.tooltip_text = function (start, end, task) {

					return task.toolTipsTxt + "<br/>" +
						"阶段：" + task.text + "<br/>" +
						gantt.templates.tooltip_date_format(start)
				};
			});


			//设置任务条进度内容
			gantt.templates.progress_text = function (start, end, task) {
				return "<div style='text-align:left;color:#fff;padding-left:20px'>" + Math.round(task.progress * 100) +
					"% </div>";
			};

			//任务条显示内容
			gantt.templates.task_text = function (start, end, task) {
				// return task.text + '(' + task.duration + '天)';
				return "<div style='text-align:left;color:#fff'>" + task.text + '(' + task.duration + '天)' +
					"</div>";
			}


			// gantt.templates.scale_cell_class = function(date) {
			//     /*if(date.getDay()== 0 || date.getDay()== 6){
			//       return "weekend";
			//     }*/
			//     return 'weekend'
			// }


			//任务栏周末亮色
			/*gantt.templates.task_cell_class = function(item,date){
			  if(date.getDay()== 0 || date.getDay()== 6){
				return "weekend";
			  }
			};*/


			//任务条上的文字大小 以及取消border自带样式
			gantt.templates.task_class = function (start, end, item) {
				return item.$level == 0 ? 'firstLevelTask' : 'secondLevelTask'
			}

			gantt.config.layout = {
				css: "gantt_container",
				cols: [
					{
						width: 280,
						min_width: 280,
						rows: [
							{
								view: "grid",
								scrollX: "gridScroll",
								scrollable: true,
								scrollY: "scrollVer"
							},
							{
								view: "scrollbar",
								id: "gridScroll",
								group: "horizontal"
							}
						]
					},
					{
						resizer: true,
						width: 1
					},
					{
						rows: [
							{
								view: "timeline",
								scrollX: "scrollHor",
								scrollY: "scrollVer"
							},
							{
								view: "scrollbar",
								id: "scrollHor",
								group: "horizontal"
							}
						]
					},
					{
						view: "scrollbar",
						id: "scrollVer"
					}
				]
			};

			//时间轴图表中，任务条形图的高度
			// gantt.config.task_height = 28
			//时间轴图表中，甘特图的高度
			// gantt.config.row_height = 36
			//时间轴图表中，如果不设置，只有行边框，区分上下的任务，设置之后带有列的边框，整个时间轴变成格子状。
			gantt.config.show_task_cells = true
			//当task的长度改变时，自动调整图表坐标轴区间用于适配task的长度
			gantt.config.fit_tasks = true
			gantt.config.min_column_width = 50;
			gantt.config.auto_types = true;
			gantt.config.xml_date = "%Y-%m-%d";
			gantt.config.scale_unit = "month";
			gantt.config.step = 1;
			gantt.config.date_scale = "%Y年%M";
			gantt.config.start_on_monday = true;
			gantt.config.scale_height = 90;
			gantt.config.autoscroll = true;
			gantt.config.calendar_property = "start_date";
			gantt.config.calendar_property = "end_date";
			gantt.config.readonly = true;
			gantt.i18n.setLocale('cn');

			// 初始化
			gantt.init(this.$refs.gantt)
			// 数据解析
			gantt.parse(this.tasks)
		},
		init2(){
			gantt.config.columns = [
				{
					name: 'text',
					label: '标题1',
					width: 217,
					tree: true,
					align: 'center',
					template: function (obj) {
						return `${obj.text}` // 通过 template 回调可以指定返回内容值
					}
				},
				{
					name: 'text',
					label: '标题2',
					width: 217,
					tree: true, // 如果有子元素是否遍历
					align: 'center',
					template: function (obj) {
						return `${obj.text}` // 通过 template 回调可以指定返回内容值
					}
				}
			]
			// 配置右侧头部
			//   gantt.config.subscales = [
			//     {
			//       unit: 'day',
			//       step: 4,
			//       date: '%Y/%m/%d'
			//     }
			//   ]
			gantt.config.autoscroll = true
			//   gantt.config.autosize = 'xy'
			// 设置表头的高度
			gantt.config.scale_height = 66
			//   gantt.config.duration_unit = 'hour'
			//   gantt.config.duration_step = 6
			//   gantt.config.date_scale = '%H: %i'
			// 是否显示依赖连线
			gantt.config.show_links = true
			// 隐藏所有标记
			gantt.config.show_markers = true
			gantt.config.xml_date = '%Y-%m-%d'
			// 表头设置
			gantt.config.scales = [
				{ unit: 'day', step: 1, format: '%Y/%m/%d' },
				{ unit: 'hour', step: 6, format: '%H:%i' }
			]
			gantt.init(this.$refs.gantt)
			gantt.parse(this.tasks)
		},
		//开始时间-结束时间参数
		DateDifference: function (strDateStart, strDateEnd) {
			var begintime_ms = Date.parse(new Date(strDateStart.replace(/-/g, '/'))) //begintime 为开始时间
			var endtime_ms = Date.parse(new Date(strDateEnd.replace(/-/g, '/'))) // endtime 为结束时间
			var date3 = endtime_ms - begintime_ms //时间差的毫秒数
			var days = Math.floor(date3 / (24 * 3600 * 1000))
			return days
		},
	},
}
</script>
<style lang="scss" scoped>
.firstLevelTask {
	border: none;

	.gantt_task_content {
		font-size: 13px;
	}
}

.secondLevelTask {
	border: none;
}

.thirdLevelTask {
	border: 2px solid #da645d;
	color: #da645d;
	background: #da645d;
}

.milestone-default {
	border: none;
	background: rgba(0, 0, 0, 0.45);
}

.milestone-unfinished {
	border: none;
	background: #5692f0;
}

.milestone-finished {
	border: none;
	background: #84bd54;
}

.milestone-canceled {
	border: none;
	background: #da645d;
}


.container {
	height: 100%;
	width: 100%;
	position: relative;

	.gantt_grid_head_cell {
		padding-left: 20px;
		text-align: left !important;
		font-size: 14px;
		color: #333;
	}


	.left-container {
		height: 100%;
	}

	.parent {
		.gantt_tree_icon {
			&.gantt_folder_open {
				//background-image: url(assets/gantt-icon.svg) !important;
			}

			&.gantt_folder_closed {
				//background-image: url(assets/gantt-icon-up.svg) !important;
			}
		}
	}

	.green,
	.yellow,
	.pink,
	.popular {
		.gantt_tree_icon.gantt_file {
			background: none;
			position: relative;

			&::before {
				content: "";
				width: 10px;
				height: 10px;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	.green {
		.gantt_tree_icon.gantt_file {
			&::before {
				background: #84bd54;
			}
		}
	}

	.yellow {
		.gantt_tree_icon.gantt_file {
			&::before {
				background: #fcca02;
			}
		}
	}

	.pink {
		.gantt_tree_icon.gantt_file {
			&::before {
				background: #da645d;
			}
		}
	}

	.popular {
		.gantt_tree_icon.gantt_file {
			&::before {
				background: #d1a6ff;
			}
		}
	}

}

.left-container {
	height: 100%;
}

.gantt_task_content {
	text-align: left;
	padding-left: 10px;
}
</style>
<style lang="scss" scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
.gunter {
	height: 100%;
	margin-top: 11px;
	.gantt-container {
		height: 300px;
	}
}
</style>
