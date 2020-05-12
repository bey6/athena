# ATHENA

![ATHENA.png](https://s1.ax1x.com/2020/05/10/Y1vuLj.png)

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

## gitlab

### CREATE AN RELEASE

An release base on a tag and a milestone, then add a private token to authorized this project access gitlab api.

How to generate a `private token`?

1. In the upper-right corner, click your avatar and select **Settings**.
2. On the **User Settings** menu, select **Access Tokens**.
3. Choose a name and optional expiry date for the token.
4. Choose the desired scopes.
5. Click the **Create personal access token** button.
6. Copy it!

How to create a `project tag`?

1. git tag -a tag_name -m "tag_message"
2. git push origin tag_name

> Delete tag
>
> git push origin --delete tag tag_name
