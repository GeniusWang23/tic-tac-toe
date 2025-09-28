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


**Commitizen安装步骤**

```bash
npm install -D commitizen cz-conventional-changelog
```


打开项目里的 `package.json`，加一段配置

```json
"scripts": { "commit": "git-cz" // 新增这行，以后用npm run commit提交 }, "config": { "commitizen": { "path": "node_modules/cz-conventional-changelog" } }
```



提交代码的时候
把这个：git commit -m "随便写"
改成：
- git add .
- npm run commit
- git push


 **Commitlint + Husky安装步骤**（这个感觉没太必要强制

1. npm install -D @commitlint/config-conventional @commitlint/cli husky@next
2. 在根目录下新建配置文件 `.commitlintrc.js`
	1. module.exports = { extends: ['@commitlint/config-conventional'], rules: {} };
3. 在 `package.json` 加一段配置（提交前自动检查）
	1. "husky": { "hooks": { "commit-msg": "commitlint -e $GIT_PARAMS" } }


作用：强制信息规范


**standard-version自动生成更新日志**

1. npm install -S standard-version
2. package.json："scripts": { "release": "standard-version" // 新增这行 }
3. 想生成日志时执行：`npm run release`
    
    工具会自动：
    - 分析提交记录（哪些是`feat`、哪些是`fix`）；
    - 生成`CHANGELOG.md`文件，列出每个版本的变更；
    - 还能自动升级版本号（比如从 1.0.0 升到 1.1.0）。


总结：
1. 改完代码后（比如新增了登录按钮
2. git add. 暂存
3. npm run commit-feat-登录-新增登录按钮-回车
4. git push 推到远程
5. npm run release-查看CHANGELOG.md-多了一行记录
