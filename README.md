# Filter

![filter.png](https://s1.ax1x.com/2020/05/10/Y1vuLj.png)

## 安装依赖

```bash
npm i
# or
yarn
```

## 开发环境运行

```bash
npm run dev
#or
yarn dev
```

## 字典

`routes/dictionary.js` 文件中都是字典的代理路由，一般来说只有明确了需要代理的字典会在这个位置进行编写。

## MOCK

`routes/mock.js` 文件中都是 Mock 相关的路由，之前写的 `getCaseNo` API 就在其中，如果需要自行添加 API 请在此路由当中添加。

## 自定义路由

`routes/dynamic.js` 文件中属于动态生成的 API 路由，通过站点中的 `在线编辑 Mock API` 生成。
