git 常用命令

git clone 'github路径'  ==> 克隆GitHub上的一个项目
git init ==> 把当前目录变成Git可以管理的仓库
git add "文件名"/ .  ==> 需要添加到仓库的文件 / 如果是一个点那么久代表添加所有文件
git commit -m "提交文件的描述信息" ==> 把文件提交到仓库
git log ==> 可以查看提交的历史记录，以便要回退到哪个版本
git log --pretty=oneline ==> 修改显示历史记录的格式
git reflog ==> 查看命令历史，以便要确定回到未来的哪个版本
cat "文件名" ==> 浏览对应得文件
git reset --hard "指定版本的commit id" ==> 调整到指定的版本去
git reset --hard HEAD^ ==> 回到上一个版本
git status ==> 查看仓库的当前状态
git diff ==> 显示当前版本和上一个版本修改额内容
git mv old文件名 new文件名  ==> 修改指定的文件名

git remote add origin '你的远程库地址' ==> 光联到远程库
git pull --rebase origin master ==> 获取远程库于本地同步合并
git push -u origin master ==> 把本地库的内容推送到远程



