# SVPT

SIMD Visual Programming Tool

## Usage

Run:

```shell
yarn dev
```

Build:

```shell
yarn build
```

## References & Documents

* [ElementPlus](https://element-plus.org/zh-CN/)
* [Drawflow](https://github.com/jerosoler/Drawflow)
* [drawflow-vue3-example](https://github.com/jerosoler/drawflow-vue3-example)

## Memo

在 Drawflow 库中，你可以监听以下事件：

* nodeCreated: 节点被创建
* nodeRemoved: 节点被移除
* nodeDataChanged: 节点的数据发生变化
* nodeSelected: 节点被选中
* nodeUnselected: 节点取消选中
* nodeMoved: 节点移动
* connectionStart: 开始连接
* connectionCancel: 取消连接
* connectionCreated: 创建连接
* connectionRemoved: 移除连接
* connectionSelected: 连接被选中
* connectionUnselected: 连接取消选中
* addReroute: 添加重定向
* removeReroute: 移除重定向
* rerouteMoved: 重定向移动
* moduleCreated: 模块创建
* moduleChanged: 模块变化
* moduleRemoved: 模块移除
* click: 点击事件
* clickEnd: 点击结束事件
* contextmenu: 上下文菜单事件
* mouseMove: 鼠标移动事件
* mouseUp: 鼠标按键抬起事件
* keydown: 键盘按键按下事件
* zoom: 缩放事件
* translate: 平移编辑器事件
* import: 导入完成事件
* export: 数据导出事件
