# 1. 安装Git

## 1.1 在Windows系统上安装Git

		1. 在 Git 官网上直接下载安装程序，选择默认安装。
  		2. 安装完成后，在开始菜单里找到 ``Git -> Git Bash`` ，出现Git命令行窗口即安装成功。
                		3. 安装成功后，需要在Git 设置 名字 和 邮箱

```git
git config --global user.name "名字"
git config --global user.email "邮箱"
```

> 注：使用了 ``git config`` 命令的 ``--global`` 参数，就表示本机上所有Git仓库都会使用这个配置，当然也可以对某个仓库单独设置。



# 2. 创建版本库

## 2.1 创建空仓库

 1. 新建文件夹，在 cmd 中使用 ``dir`` 命令查看该文件夹的路径

    * 新建文件夹命令： ``mkdir 文件名`` 

    <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405135856123.png" alt="image-20220405135856123" style="zoom:67%;" />

    * 进入该文件夹命令： `` cd 文件名``

    <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405140218603.png" alt="image-20220405140218603" style="zoom:67%;" />

    * 查看该文件夹信息： ``dir``

    <img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405135944424.png" alt="image-20220405135944424" style="zoom:55%;" />

    

	2. 使用 ``git init`` 命令将这个目录编程Git可以管理的仓库，即仓库初始化：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405140137624.png" alt="image-20220405140137624" style="zoom:60%;" />



# 3. 将文件放到Git仓库

1. 首先要确保待提交文件存在于本地的 Git 仓库中。
2. 使用 ``git add 文件路径.文件类型名`` 命令将文件添加到仓库中。如果没有任何返回则表示添加成功。（可反复使用，添加多个文件）

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405141643183.png" alt="image-20220405141643183" style="zoom:67%;" />



3. 使用 ``git commit -m "提交说明" `` 命令将所有添加的文件提交到仓库。如果不加 ``-m`` 参数则会调用编译器让你进行输入说明。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405141732565.png" alt="image-20220405141732565" style="zoom: 60%;" />

​		``1 file changed`` ： 1个文件被改动

​		``2 insertions(+)`` ： 插入两行内容



# 4. 查看仓库状态

​		使用 ``git status`` 命令查看当前仓库状态：

1. 文件已被修改：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405143109205.png" alt="image-20220405143109205" style="zoom:67%;" />



2. 文件待提交：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405143255770.png" alt="image-20220405143255770" style="zoom:67%;" />



3. 没有需要提交的修改，工作目录是干净的：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405143754310.png" alt="image-20220405143754310" style="zoom:67%;" />



# 5. 查看修改文件的内容

​		使用 ``git diff <file>`` 命令查看文件修改的内容，`git diff`顾名思义就是查看difference。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405144048868.png" alt="image-20220405144048868" style="zoom:67%;" />



# 6. 查看提交历史记录

​		使用 ``git log`` 命令查看版本修改历史记录：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405144412993.png" alt="image-20220405144412993" style="zoom: 50%;" />



​		也可以加上 `--pretty=oneline` 参数查看简要输出信息：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405144521852.png" alt="image-20220405144521852" style="zoom: 60%;" />



# 7. 回退版本

​		在Git中，用 `HEAD` 表示当前版本，上一个版本就是`HEAD^`，上上一个版本就是`HEAD^^`，当然往上100个版本写100个`^`比较容易数不过来，所以写成`HEAD~100`。所以回退 n 个版本也可以写成 `HEAD~n`。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405145107297.png" alt="image-20220405145107297" style="zoom:67%;" />

> 注： 在Windows系统中，cmd控制台的换行默认符是^，会被忽略，所以需要用 `""` 括起来，或者使用 `~` 的方式回退。



​	但是回退版本后，Git记录的版本个数也会减少，内容也会减少。如果是不小心回退，且控制台尚未关闭，可找到误回退版本的版本号，再次使用 `git reset --hard <版本号>` 就可以回到未来版本，当然版本号没必要写全，只要输入前几位，Git就能自动去找，只要不存在过个版本号前几位都相同就行。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405150601961.png" alt="image-20220405150601961" style="zoom: 60%;" />



# 8. Git版本库（Repository）

​		工作区有一个隐藏目录`.git`，这个不算工作区，而是Git的**版本库**。

​		Git的**版本库**里存了很多东西，其中最重要的就是称为**stage**（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支`master`，以及指向`master`的一个指针叫`HEAD`。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405151010662.png" alt="image-20220405151010662" style="zoom:60%;" />



因为存在暂存区，所以将文件提交至仓库需要两步：

​		第一步：通过 `git add` 命令将文件从工作区推送至暂存区（stage）

​		第二步：通过 `git commit` 命令将文件从暂存区（stage）推送至master

因为有了暂存区的存在，Git可以通过比对暂存区、分支、工作区里的版本，从而达到对版本的控制。



## 8.2 查看工作区和版本库里的最新版本区别

使用 `git diff` 命令 

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405194039208.png" alt="image-20220405194039208" style="zoom:60%;" />



## 8.3 撤销工作区的修改

​		通常我们修改工作区的内容后，想取消刚改的修改，一般可以手动在工作区进行修改，但要是需要修改的文件很多，手动修改就太麻烦了。因此，我们可以选择使用 `git checkout -- file` 命令来进行撤销修改，但是撤销后的状态根据情况会有一下两种：

* 如果文件修改前，还没有放到暂存区，则撤销修改就回到了版本库一模一样的状态，和回退版本的区别是，此时的工作区还没提交版本。（暂存区为空）
* 如果文件修改前，已经存放在修改区，又作了修改，则撤销修改就是回到添加到暂存区的状态。（暂存区不为空）

撤销工作区的修改原理，起始就是逆向的 `git commit` 和 `git add` ，将工作区更改成暂存区或分支版本的状态。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405195836675.png" alt="image-20220405195836675" style="zoom:60%;" />

> `git checkout -- file`命令中的`--`很重要，没有`--`，就变成了“切换到另一个分支”的命令。



## 8.4 撤销暂存区修改

​		当你将文件通过 `git add` 命令提交到暂存区后，需要进行撤销修改，可以使用 `git reset HEAD <file>` 命令

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405200343187.png" alt="image-20220405200343187" style="zoom:50%;" />

`git reset`命令既可以回退版本，也可以把暂存区的修改回退到工作区。



## 恢复工作区删除的文件

使用 `git checkout -- <file>` 命令，将版本库里的文件还原至工作区 

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405200928288.png" alt="image-20220405200928288" style="zoom: 50%;" />



# 9. Git 分支

​		1. Git 普遍默认分支为 **master** 分支，当只有一条分支时，**HEAD**是通过指针指向**master**指针来指向当前的版本。

​		2. 当创建新的分支**newbranch**后，**newbranch**的指针和**master**指针同时指向一个版本，但是**HEAD**指针指向**newbranch**指针。

​		3. 在版本更新之后，**master**指针不动，通过移动**newbranch**指针延伸出新分支，**HEAD**指针继续指向**newbranch**。

​		4. 当分支结束后，若想合并分支只需要将**master**指针指向**newbranch**指针指向的版本，**HEAD**指针继续指**master** 就好。



## 9.2 创建分支并切换分支

* 第一种方法： `git checkout ` 命令可以切换分支，加上 `-b` 参数可以创建分支

```git
$ git checkout -b newbranch
Switched tp a new branch 'newbranch'
```



* 第二种方法： 先使用 `git branch` 命令创建分支，再使用 `git checkout ` 命令分支进行切换。

```
$ git branch newbranch
$ git checkout newbranch
Switched tp a new branch 'newbranch2'
```



* 第三种方法：先使用 `git branch` 命令创建分支，再使用 `git switch` 命令进行切换。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405192206871.png" alt="image-20220405192206871" style="zoom:67%;" />



* **第四种方法**：使用  `git switch` 命令 ，加上 `-c` 参数创建并切换分支。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405192422245.png" alt="image-20220405192422245" style="zoom:60%;" />



> 因为 `git checkout` 命令可以用于撤销工作区的修改，又可以切换分支，一个命令多种功能很迷惑，所以新版Git中使用 `git switch` 命令进行分支切换。



## 9.3 查看分支

使用`git branch` 命令可以查看所有分支，而当前分支前会标记 `*` 号：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405190626891.png" alt="image-20220405190626891" style="zoom:67%;" />



## 9.4 合并分支

使用 `git merge` 命令：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405191635929.png" alt="image-20220405191635929" style="zoom:60%;" />

> 注：这里的 `Fast-forward` 信息表明这次合并是快进模式，但并不是每次合并都能 `Fast-forward` ，还有其他合并方式。



## 9.5 删除分支

使用 `git branch` 命令加上 `-d` 参数：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405191857782.png" alt="image-20220405191857782" style="zoom:67%;" />



如果分支提交版本后并未合并，则需要加上 `-D` 参数进行强制删除

```
$ git branch -D <branch-name>
```



# 10. 远程仓库

## 10.1 查看远程仓库

1.  使用 `git remote` 命令查看远程仓库信息：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405210101740.png" alt="image-20220405210101740" style="zoom:50%;" />



2. 使用 `git remote -v` 命令查看详细的远程仓库信息：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405210139519.png" alt="image-20220405210139519" style="zoom:60%;" />

> fetch、和 push 分别表示 仓库的 **抓取** 和 **推送 **地址



## 10.2 推送分支

​		使用 `git push` 命令进行推送，如果是第一次推送，需要将本地仓库的主分支和远程仓库的主分支进行关联，则需要加上 `-u` 参数：

```
$ git push -u origin master
```

​		如果不是第一次推送，则可以直接使用：

```
$ git push origin <branch-name>
```



## 10.3 抓取分支

1. 如若本地没有版本库（第一次）则使用 `git clone` 命令进行抓取：

```
$ git clone <path>
```



2. 本地有版本库，只要有过push操作都要先进行 `git pull` 获取远程仓库里的数据与本地进行合并，如果存在冲突则在本体修改后再次提交，以保证远程没有版本冲突：

```
$ git pull
```



## 10.4 创建远程仓库分支并关联

1. 创建本地分支和远程仓库的分支可以使用：

```
$ git checkout -b dev origin/dev
```

2. 设置本地分支与远程分支的链接：

```
$ git branch --set-upstream-to=origin/dev dev
```



## 解决冲突

​		当我们仓库里的主分支修改内容形成新的版本，其他分支也修改了不同的内容形成另一个版本时，如果进行合并则会产生分支冲突。此时Git会提示我们文件存在冲突，必须手动解决后在提交。而冲突的文件打开后还会发现，Git帮我们标注了不同分支的内容。具体举例如下：

	1. 创建新的分支，并修改提交文件：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405202657567.png" alt="image-20220405202657567" style="zoom:50%;"  />

2. 切换至主分支，修改并提交文件：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405202732797.png" alt="image-20220405202732797" style="zoom:50%;" />

3. 合并分支，Git提示冲突：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405202847724.png" alt="image-20220405202847724" style="zoom:50%;" />

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405203038834.png" alt="image-20220405203038834" style="zoom:50%;" />

4. 修改文件内容再次提交，查看分支合并情况：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405203338152.png" alt="image-20220405203338152" style="zoom:50%;" />

​		也可以使用 `git log --graph --pretty=oneline --abbrev-commit` 命令查看简要分支合并图：

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405203602698.png" alt="image-20220405203602698" style="zoom:50%;" />

> `git log` 的 `--abbrev-commit` 参数可以显示版本号的前几个字符；
>
>  `git log` 的`--graph` 参数可以显示图形的分支合并历史。



# 疑难解惑

## 1. 添加文件，得到找不到git仓库的错误

Q：输入`git add readme.txt`，得到错误：`fatal: not a git repository (or any of the parent directories)`。

A：Git命令必须在Git仓库目录内执行（`git init`除外），在仓库目录外执行是没有意义的。



## 2. 添加文件，得到找不到文件的错误

Q：输入`git add readme.txt`，得到错误`fatal: pathspec 'readme.txt' did not match any files`。

A：添加某个文件时，该文件必须在当前目录下存在，用`ls`或者`dir`命令查看当前目录的文件，看看文件是否存在，或者是否写错了文件名。



## 3.  回退版本时，出现 `more` 错误

Q：输入`git reset -hard HEAD^` ，出现 `more` 后报错。

<img src="https://xingqiu-tuchuang-1256524210.cos.ap-shanghai.myqcloud.com/4964/image-20220405145651534.png" alt="image-20220405145651534" style="zoom:50%;" />

A： 这是因为cmd控制台中换行符默认是^，而不是\ ，所以它的more？的意思是问你下一行是否需要再输入，而^ 符号就被当做换行符而被git命令忽略掉了。解决方法有以下几种：

* 加引号： `git reset --hard "HEAD^"`
* 多加一个^： `git reset --hard HEAD^^`
* 换成 `~` ： `git reset --hard HEAD~1`
* 或者使用git bash，powershell等