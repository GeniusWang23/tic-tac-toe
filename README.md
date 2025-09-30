### git提交规范
类型[影响范围]: 简单描述
- `fix(购物车): 修复商品数量不显示的bug`（修了 bug，影响 “购物车” 模块）

feat：加新功能    feat(首页): 加轮播图功能
fix：修bug   fix(个人中心): 修复头像上传失败
docs：只改文档   docs: 更新安装步骤的截图
style：格式   style: 统一代码缩进为2个空格
test：加测试代码  test: 给登录功能加测试
chore：改工具配置  chore: 升级npm到最新版本


特殊情况： 如果改了旧的接口或参数名
feat(api)!: 删除旧版用户接口

或者在 “页脚” 加 `BREAKING CHANGE: 描述`（指不兼容的重大变更

- 描述要简洁  
- 动词开头  比如用新增而不是我加了个功能
- 范围可选


### React 的核心思想：

- 组件化
- props传参
- 状态管理（usestate）
- 事件处理
- 不可变数据（不要直接修改原对象或数组，而是要创建一个新的）
- 派生状态
- 条件渲染
- 列表渲染（map）
- 单向数据流（数据由上到下，事件由下到上）子组件不能直接修改父组件状态，只能从函数回调


### 项目运行：
1. `npm install`
2. `npm start`


### 运行截图
<img width="1043" height="1074" alt="image" src="https://github.com/user-attachments/assets/d1683b05-1d9d-4925-a465-960536acfba6" />





