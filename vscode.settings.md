# VSCODE SETTINGS

## User and Workspace Settings

VS Code provides `two` different scopes for settings:

- `User Settings` - Settings that apply globally to any instance of VS Code you open.
- `Workspace Settings` - Settings stored inside your workspace and only apply when the workspace is opened.

Workspace settings override user settings. Workspace settings are specific to a project and can be shared across developers on a project.

> Note: A VS Code "workspace" is usually just your project root folder. Workspace settings as well as debugging and task configurations are stored at the root in a .vscode folder. You can also have more than one root folder in a VS Code workspace through a feature called Multi-root workspaces.

上面的意思大致就是允许 workspace 套 workspace 这样的，然后以最近的 workspace 为准。

## Settings file locations

Depending on your platform, the `user settings` file is located here:

- Windows %APPDATA%\Code\User\settings.json
- macOS \$HOME/Library/Application Support/Code/User/settings.json
- Linux \$HOME/.config/Code/User/settings.json

The `workspace settings` file is located under the `.vscode` folder in your root folder.

> [gist](https://gist.github.com/) 是一个不错的东西，如果网络允许的情况下可以用它分享一些代码片段。某些配置同步工具就是采用 gist 来实现配置同步功能的。

## 配置文件的优先级

`user settings` < `workspace settings` 优先级的。

差不多可以理解为 npm 的 `--global` 和 `--local` 的关系。

所以为了对工作中的项目进行合理化的配置，应该采用 `workspace settings`，这样不会影响其他不相关或不同类型的项目的配置。

## [更多详细信息请参考官方文档](https://code.visualstudio.com/docs/getstarted/settings)
