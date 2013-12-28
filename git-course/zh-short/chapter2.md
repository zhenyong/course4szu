# Git 基础 #

- 初始化一个新的代码仓库，做配置
- 开始或停止跟踪某些文件
- 暂存或提交某些更新
- 忽略某些文件
- 撤消
- 浏览更新历史，查看某两次更新之间的差异
- 从远程仓库 拉取数据 或者 推送数据。

## 取得项目的 Git 仓库 ##

- 第一种是在现存的目录下，通过导入所有文件来创建新的 Git 仓库。
- 第二种是从已有的 Git 仓库克隆出一个新的镜像仓库来。

### 在工作目录中初始化新仓库 ###

要对现有的某个项目开始用 Git 管理，只需到此项目所在的目录，执行：

	$ git init

初始化后，在当前目录下会出现一个名为 `.git` 的目录，所有 Git 需要的数据和资源都存放在这个目录中。

新建README文件
	
	echo "Hello World!">README.md

新建的文件 “未纳入git管理” 先用 `git add` 命令告诉 Git 开始对这些文件进行跟踪，然后提交：

	$ git add README.md
	$ git commit -m 'initial project version'

提交之后，我们项目就作了一次快照

### 从现有仓库克隆 ###

	$ git clone git://github.com/schacon/grit.git [自定义名称]

## 记录每次更新到仓库 ##

生命周期

- 跟踪 / 未跟踪
- 未修改 / 修改 / 暂存

![18333fig0201](figures/18333fig0201-tn.png){:caption="文件的状态变化周期"}

### 检查当前文件状态 ###

	$ git status
	# On branch master
	nothing to commit (working directory clean)

创建一个新文件 README，保存退出后运行 `git status` 会看到该文件出现在未跟踪文件列表中：

	$ vim README
	$ git status
	# On branch master
	# Untracked files:
	#   (use "git add <file>..." to include in what will be committed)
	#
	#	README
	nothing added to commit but untracked files present (use "git add" to track)

### 跟踪新文件 ###

使用命令 `git add` 开始跟踪一个新文件。所以，要跟踪 `README` 文件，运行：

	$ git add README

此时再运行 `git status` 命令，会看到 `README` 文件已被跟踪，并处于暂存状态：

	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	new file:   README
	#

只要在 “Changes to be committed” 这行下面的，就说明是已暂存状态。如果此时提交，那么该文件此时此刻的版本将被留存在历史记录中。

### 暂存已修改文件 ###

现在我们修改下之前已跟踪过的文件 `benchmarks.rb`，然后再次运行 `status` 命令，会看到这样的状态报告：

	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	new file:   README
	#
	# Changes not staged for commit:
	#   (use "git add <file>..." to update what will be committed)
	#
	#	modified:   benchmarks.rb
	#

文件 `benchmarks.rb` 出现在 “Changes not staged for commit” 
说明已跟踪文件的内容发生了变化，但还没有放到暂存区。

 `git add` 多功能命令

- 可以用它开始跟踪新文件
- 已跟踪的文件放到暂存区
- 合并时把有冲突的文件标记为已解决状态等

运行 `git add` 将 `benchmarks.rb` 放到暂存区，然后再看看 `git status` 的输出：

	$ git add benchmarks.rb
	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	new file:   README
	#	modified:   benchmarks.rb
	#

现在两个文件都已暂存，下次提交时就会一并记录到仓库。此时，你想要在 `benchmarks.rb` 里加条注释，运行 `git status` 看看：

	$ vim benchmarks.rb
	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	new file:   README
	#	modified:   benchmarks.rb
	#
	# Changes not staged for commit:
	#   (use "git add <file>..." to update what will be committed)
	#
	#	modified:   benchmarks.rb
	#

怎么回事？`benchmarks.rb` 文件出现了两次！一次算未暂存，一次算已暂存，实际上 Git 只不过暂存了你运行 `git add` 命令时的版本，如果现在提交，那么提交的是添加注释前的版本，而非当前工作目录中的版本。所以，运行了 `git add` 之后又作了修订的文件，需要重新运行 `git add` 把最新版本重新暂存起来：

	$ git add benchmarks.rb
	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#	new file:   README
	#	modified:   benchmarks.rb
	#

### 忽略某些文件 ###

创建一个名为 `.gitignore` 的文件，列出要忽略的文件模式。来看一个实际的例子：

	*.log
	~

忽略所有以 `.log`结尾的文件和以波浪符（`~`）结尾的文件。要养成一开始就设置好 `.gitignore` 文件的习惯，以免将来误提交这类无用的文件。

文件 `.gitignore` 的格式规范如下：

* 所有空行或者以注释符号 `＃` 开头的行都会被 Git 忽略。
* 可以使用标准的 glob 模式匹配。
* 匹配模式最后跟反斜杠（`/`）说明要忽略的是目录。
* 可以在模式前加上惊叹号（`!`）取反。

glob 模式 ：

* `*` 匹配零个或多个任意字符；
* `?` 只匹配一个任意字符；
* `[abc]` 匹配任何一个列在方括号中的某一个字符
* `[0-9]` 表示匹配所有 0 到 9 的数字）。

我们再看一个 `.gitignore` 文件的例子：

	# 此为注释 – 将被 Git 忽略
	# 忽略所有 .a 结尾的文件
	*.a

	# 但 lib.a 除外
	!lib.a

	# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
	/TODO

	# 忽略 build/ 目录下的所有文件
	build/

	# 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
	doc/*.txt

### 查看已暂存和未暂存的更新 ###

查看具体修改了什么地方，可以用 `git diff` 命令


 `git status -v` 附加修改差异的每一行信息

 `git diff` 看暂存前后的变化 （尚未暂存的文件修改了哪些部分）


 `git diff --staged` 查看已经暂存起来的变化 （已经暂存起来的文件和上次提交时的快照之间的差异）


### 提交更新 ###

提交只会提交暂存区的数据，先用 `git status` 看下，是不是都已暂存起来了，然后再运行提交命令 `git commit`：

	$ git commit

编辑器会显示类似下面的文本信息（本例选用 Vim 的屏显方式展示）：

	# Please enter the commit message for your changes. Lines starting
	# with '#' will be ignored, and an empty message aborts the commit.
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#       new file:   README
	#       modified:   benchmarks.rb
	~
	~
	~
	".git/COMMIT_EDITMSG" 10L, 283C

- 默认包含最后一次运行 `git status` 的输出
- 开头还有一空行，供你输入提交说明
- `-v` 选项将修改差异的每一行都包含到注释中来
- 退出编辑器时，Git 会丢掉注释行，将说明内容和本次更新提交到仓库。
- `-m` 参数后跟提交说明的方式，在一行命令中提交更新：

	$ git commit -m "Story 182: Fix benchmarks for speed"
	[master]: created 463dc4f: "Fix benchmarks for speed"
	 2 files changed, 3 insertions(+), 0 deletions(-)
	 create mode 100644 README

提交后它会告诉你，当前是在哪个分支（`master`）提交的，本次提交的完整 SHA-1 校验和是什么（`463dc4f`），以及在本次提交中，有多少文件修订过，多少行添改和删改过。

### 跳过使用暂存区域 ###

 `git commit` 加上 `-a` 自动把所有已经跟踪过的文件暂存起来一并提交，从而跳过 `git add` 步骤

### 移除文件 ###

集中情况：

- 从暂存区域移除 && 物理删除, 可以用 `git rm` 命令，然后提交

- 手工删除文件，运行 `git status` 时就会在 “Changes not staged for commit” 再用 `git rm` 记录此次移除文件的操作，然后提交

- 手工删除已经暂存的，需要 `git rm -f`

- 从暂存区域移除，但保留物理文件

	$ git rm --staged readme.txt
	$ git rm --staged log/\*.log

注意到星号 `*` 之前的反斜杠 `\`，因为 Git 有它自己的文件模式扩展匹配方式，所以我们不用 shell 来帮忙展开。此命令删除所有 `log/` 目录下扩展名为 `.log` 的文件。类似的比如：

	$ git rm \*~

会递归删除当前目录及其子目录中所有 `~` 结尾的文件。

### 移动文件 ###

不像其他的 VCS 系统，Git 并不跟踪文件移动操作。如果在 Git 中重命名了某个文件，仓库中存储的元数据并不会体现出这是一次改名操作。不过 Git 非常聪明，它会推断出究竟发生了什么，至于具体是如何做到的，我们稍后再谈。

既然如此，当你看到 Git 的 `mv` 命令时一定会困惑不已。要在 Git 中对文件改名，可以这么做：

	$ git mv file_from file_to

`git mv` 就相当于运行了下面三条命令：

	$ mv README.txt README
	$ git rm README.txt
	$ git add README

## 查看提交历史 ##

在提交了若干更新之后，又或者克隆了某个项目，想回顾下提交历史，可以使用 `git log` 命令查看。

`git log -p -2` `-p` 选项展开显示每次提交的内容差异，用 `-2` 则仅显示最近的两次更新：

`git log --stat` 仅显示简要的增改行数统计：

 `--pretty`  可以自定义格式

## 撤消操作 ##


### 修改最后一次提交 ###

有时候我们提交完了才发现漏掉了几个文件没有加，或者提交信息写错了。想要把最近的提交操作归到这次提交 

	$ git commit --amend

举例：

	$ git commit -m 'initial commit'
	$ git add forgotten_file
	$ git commit --amend

上面的三条命令最终只是产生一个提交，第二个提交命令修正了第一个的提交内容。第一个提交从未发生过。

### 取消已经暂存的文件 ###

`git reset HEAD <file>...` 


### 取消对文件的修改 ###

	$ git checkout -- benchmarks.rb

这条命令有些危险，所有对文件的修改都没有了。如果只是想回退版本，同时保留刚才的修改以便将来继续工作，可以用下章介绍的 stashing 和分支来处理，应该会更好些。

任何已经**提交**到 Git 的都可以被恢复。即便在已经删除的分支中的提交，或者用 `--amend` 重新改写的提交，都可以被恢复。所以，能丢失的都是未提交的。

## 远程仓库的使用 ##

- 远程仓库是指托管在网络上的项目仓库
- 便推送或拉取数据，分享各自的工作进展

### 查看当前的远程库 ###

要查看当前配置有哪些远程仓库，可以用 `git remote` 命令，它会列出每个远程库的简短名字。在克隆完某个项目后，至少可以看到一个名为 `origin` 的远程库，Git 默认使用这个名字来标识你所克隆的原始仓库：

	$ git clone git://github.com/schacon/ticgit.git
	Initialized empty Git repository in /private/tmp/ticgit/.git/
	remote: Counting objects: 595, done.
	remote: Compressing objects: 100% (269/269), done.
	remote: Total 595 (delta 255), reused 589 (delta 253)
	Receiving objects: 100% (595/595), 73.31 KiB | 1 KiB/s, done.
	Resolving deltas: 100% (255/255), done.
	$ cd ticgit
	$ git remote
	origin

也可以加上 `-v` 选项，显示对应的克隆地址：

	$ git remote -v
	origin	git://github.com/schacon/ticgit.git

如果有多个远程仓库，此命令将全部列出。比如在我的 Grit 项目中，可以看到：

	$ cd grit
	$ git remote -v
	bakkdoor  git://github.com/bakkdoor/grit.git
	cho45     git://github.com/cho45/grit.git
	defunkt   git://github.com/defunkt/grit.git
	koke      git://github.com/koke/grit.git
	origin    git@github.com:mojombo/grit.git

这样一来，我就可以非常轻松地从这些用户的仓库中，拉取他们的提交到本地。请注意，上面列出的地址只有 origin 用的是 SSH URL 链接，所以也只有这个仓库我能推送数据上去（我们会在第 4 章解释原因）。

### 添加远程仓库 ###

要添加一个新的远程仓库，可以指定一个简单的名字，以便将来引用，运行 `git remote add [shortname] [url]`：

	$ git remote
	origin
	$ git remote add pb git://github.com/paulboone/ticgit.git
	$ git remote -v
	origin	git://github.com/schacon/ticgit.git
	pb	git://github.com/paulboone/ticgit.git

现在可以用字符串 `pb` 指代对应的仓库地址了。比如说，要抓取所有 Paul 有的，但本地仓库没有的信息，可以运行 `git fetch pb`：

	$ git fetch pb
	remote: Counting objects: 58, done.
	remote: Compressing objects: 100% (41/41), done.
	remote: Total 44 (delta 24), reused 1 (delta 0)
	Unpacking objects: 100% (44/44), done.
	From git://github.com/paulboone/ticgit
	 * [new branch]      master     -> pb/master
	 * [new branch]      ticgit     -> pb/ticgit

现在，Paul 的主干分支（`master`）已经完全可以在本地访问了，对应的名字是 `pb/master`，你可以将它合并到自己的某个分支，或者切换到这个分支，看看有些什么有趣的更新。

### 从远程仓库抓取数据 ###

正如之前所看到的，可以用下面的命令从远程仓库抓取数据到本地：

	$ git fetch [remote-name]

此命令会到远程仓库中拉取所有你本地仓库中还没有的数据。运行完成后，你就可以在本地访问该远程仓库中的所有分支，将其中某个分支合并到本地，或者只是取出某个分支，一探究竟。（我们会在第三章详细讨论关于分支的概念和操作。）

如果是克隆了一个仓库，此命令会自动将远程仓库归于 origin 名下。所以，`git fetch origin` 会抓取从你上次克隆以来别人上传到此远程仓库中的所有更新（或是上次 fetch 以来别人提交的更新）。有一点很重要，需要记住，fetch 命令只是将远端的数据拉到本地仓库，并不自动合并到当前工作分支，只有当你确实准备好了，才能手工合并。

如果设置了某个分支用于跟踪某个远端仓库的分支（参见下节及第 3 章的内容），可以使用 `git pull` 命令自动抓取数据下来，然后将远端分支自动合并到本地仓库中当前分支。在日常工作中我们经常这么用，既快且好。实际上，默认情况下 `git clone` 命令本质上就是自动创建了本地的 `master` 分支用于跟踪远程仓库中的 `master` 分支（假设远程仓库确实有 `master` 分支）。所以一般我们运行 `git pull`，目的都是要从原始克隆的远端仓库中抓取数据后，合并到工作目录中的当前分支。

### 推送数据到远程仓库 ###

项目进行到一个阶段，要同别人分享目前的成果，可以将本地仓库中的数据推送到远程仓库。实现这个任务的命令很简单： `git push [remote-name] [branch-name]`。如果要把本地的 master 分支推送到 `origin` 服务器上（再次说明下，克隆操作会自动使用默认的 `master` 和 `origin` 名字），可以运行下面的命令：

	$ git push origin master

只有在所克隆的服务器上有写权限，或者同一时刻没有其他人在推数据，这条命令才会如期完成任务。如果在你推数据前，已经有其他人推送了若干更新，那你的推送操作就会被驳回。你必须先把他们的更新抓取到本地，合并到自己的项目中，然后才可以再次推送。有关推送数据到远程仓库的详细内容见第三章。

### 查看远程仓库信息 ###

我们可以通过命令 `git remote show [remote-name]` 查看某个远程仓库的详细信息，比如要看所克隆的 `origin` 仓库，可以运行：

	$ git remote show origin
	* remote origin
	  URL: git://github.com/schacon/ticgit.git
	  Remote branch merged with 'git pull' while on branch master
	    master
	  Tracked remote branches
	    master
	    ticgit

除了对应的克隆地址外，它还给出了许多额外的信息。它友善地告诉你如果是在 `master` 分支，就可以用 `git pull` 命令抓取数据合并到本地。另外还列出了所有处于跟踪状态中的远端分支。

上面的例子非常简单，而随着使用 Git 的深入，`git remote show` 给出的信息可能会像这样：

	$ git remote show origin
	* remote origin
	  URL: git@github.com:defunkt/github.git
	  Remote branch merged with 'git pull' while on branch issues
	    issues
	  Remote branch merged with 'git pull' while on branch master
	    master
	  New remote branches (next fetch will store in remotes/origin)
	    caching
	  Stale tracking branches (use 'git remote prune')
	    libwalker
	    walker2
	  Tracked remote branches
	    acl
	    apiv2
	    dashboard2
	    issues
	    master
	    postgres
	  Local branch pushed with 'git push'
	    master:master

它告诉我们，运行 `git push` 时缺省推送的分支是什么。它还显示了有哪些远端分支还没有同步到本地，哪些已同步到本地的远端分支在远端服务器上已被删除，以及运行 `git pull` 时将自动合并哪些分支。

### 远程仓库的删除和重命名 ###

在新版 Git 中可以用 `git remote rename` 命令修改某个远程仓库在本地的简称，比如想把 `pb` 改成 `paul`，可以这么运行：

	$ git remote rename pb paul
	$ git remote
	origin
	paul

注意，对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 `pb/master` 分支现在成了 `paul/master`。

碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 `git remote rm` 命令：

	$ git remote rm paul
	$ git remote
	origin

## 打标签 ##

同大多数 VCS 一样，Git 也可以对某一时间点上的版本打上标签。人们在发布某个软件版本（比如 v1.0 等等）的时候，经常这么做。本节我们一起来学习如何列出所有可用的标签，如何新建标签，以及各种不同类型标签之间的差别。

### 列显已有的标签 ###

列出现有标签的命令非常简单，直接运行 `git tag` 即可：

	$ git tag
	v0.1
	v1.3

显示的标签按字母顺序排列，所以标签的先后并不表示重要程度的轻重。

我们可以用特定的搜索模式列出符合条件的标签。在 Git 自身项目仓库中，有着超过 240 个标签，如果你只对 1.4.2 系列的版本感兴趣，可以运行下面的命令：

	$ git tag -l 'v1.4.2.*'
	v1.4.2.1
	v1.4.2.2
	v1.4.2.3
	v1.4.2.4

### 新建标签 ###

Git 使用的标签有两种类型：轻量级的（lightweight）和含附注的（annotated）。轻量级标签就像是个不会变化的分支，实际上它就是个指向特定提交对象的引用。而含附注标签，实际上是存储在仓库中的一个独立对象，它有自身的校验和信息，包含着标签的名字，电子邮件地址和日期，以及标签说明，标签本身也允许使用 GNU Privacy Guard (GPG) 来签署或验证。一般我们都建议使用含附注型的标签，以便保留相关信息；当然，如果只是临时性加注标签，或者不需要旁注额外信息，用轻量级标签也没问题。

### 含附注的标签 ###

创建一个含附注类型的标签非常简单，用 `-a` 指定标签名字即可：

	$ git tag -a v1.4 -m 'my version 1.4'
	$ git tag
	v0.1
	v1.3
	v1.4

而 `-m` 选项则指定了对应的标签说明，Git 会将此说明一同保存在标签对象中。如果没有给出该选项，Git 会启动文本编辑软件供你输入标签说明。

可以使用 `git show` 命令查看相应标签的版本信息，并连同显示打标签时的提交对象。

	$ git show v1.4
	tag v1.4
	Tagger: Scott Chacon <schacon@gee-mail.com>
	Date:   Mon Feb 9 14:45:11 2009 -0800

	my version 1.4
	commit 15027957951b64cf874c3557a0f3547bd83b3ff6
	Merge: 4a447f7... a6b4c97...
	Author: Scott Chacon <schacon@gee-mail.com>
	Date:   Sun Feb 8 19:02:46 2009 -0800

	    Merge branch 'experiment'

我们可以看到在提交对象信息上面，列出了此标签的提交者和提交时间，以及相应的标签说明。

### 签署标签 ###

如果你有自己的私钥，还可以用 GPG 来签署标签，只需要把之前的 `-a` 改为 `-s` 即可：

	$ git tag -s v1.5 -m 'my signed 1.5 tag'
	You need a passphrase to unlock the secret key for
	user: "Scott Chacon <schacon@gee-mail.com>"
	1024-bit DSA key, ID F721C45A, created 2009-02-09

现在再运行 `git show` 会看到对应的 GPG 签名也附在其内：

	$ git show v1.5
	tag v1.5
	Tagger: Scott Chacon <schacon@gee-mail.com>
	Date:   Mon Feb 9 15:22:20 2009 -0800

	my signed 1.5 tag
	-----BEGIN PGP SIGNATURE-----
	Version: GnuPG v1.4.8 (Darwin)

	iEYEABECAAYFAkmQurIACgkQON3DxfchxFr5cACeIMN+ZxLKggJQf0QYiQBwgySN
	Ki0An2JeAVUCAiJ7Ox6ZEtK+NvZAj82/
	=WryJ
	-----END PGP SIGNATURE-----
	commit 15027957951b64cf874c3557a0f3547bd83b3ff6
	Merge: 4a447f7... a6b4c97...
	Author: Scott Chacon <schacon@gee-mail.com>
	Date:   Sun Feb 8 19:02:46 2009 -0800

	    Merge branch 'experiment'

稍后我们再学习如何验证已经签署的标签。

### 轻量级标签 ###

轻量级标签实际上就是一个保存着对应提交对象的校验和信息的文件。要创建这样的标签，一个 `-a`，`-s` 或 `-m` 选项都不用，直接给出标签名字即可：

	$ git tag v1.4-lw
	$ git tag
	v0.1
	v1.3
	v1.4
	v1.4-lw
	v1.5

现在运行 `git show` 查看此标签信息，就只有相应的提交对象摘要：

	$ git show v1.4-lw
	commit 15027957951b64cf874c3557a0f3547bd83b3ff6
	Merge: 4a447f7... a6b4c97...
	Author: Scott Chacon <schacon@gee-mail.com>
	Date:   Sun Feb 8 19:02:46 2009 -0800

	    Merge branch 'experiment'

### 验证标签 ###

可以使用 `git tag -v [tag-name]` 的方式验证已经签署的标签。此命令会调用 GPG 来验证签名，所以你需要有签署者的公钥，存放在 keyring 中，才能验证：

	$ git tag -v v1.4.2.1
	object 883653babd8ee7ea23e6a5c392bb739348b1eb61
	type commit
	tag v1.4.2.1
	tagger Junio C Hamano <junkio@cox.net> 1158138501 -0700

	GIT 1.4.2.1

	Minor fixes since 1.4.2, including git-mv and git-http with alternates.
	gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
	gpg: Good signature from "Junio C Hamano <junkio@cox.net>"
	gpg:                 aka "[jpeg image of size 1513]"
	Primary key fingerprint: 3565 2A26 2040 E066 C9A7  4A7D C0C6 D9A4 F311 9B9A

若是没有签署者的公钥，会报告类似下面这样的错误：

	gpg: Signature made Wed Sep 13 02:08:25 2006 PDT using DSA key ID F3119B9A
	gpg: Can't check signature: public key not found
	error: could not verify the tag 'v1.4.2.1'

### 后期加注标签 ###

你甚至可以在后期对早先的某次提交加注标签。比如在下面展示的提交历史中：

	$ git log --pretty=oneline
	15027957951b64cf874c3557a0f3547bd83b3ff6 Merge branch 'experiment'
	a6b4c97498bd301d84096da251c98a07c7723e65 beginning write support
	0d52aaab4479697da7686c15f77a3d64d9165190 one more thing
	6d52a271eda8725415634dd79daabbc4d9b6008e Merge branch 'experiment'
	0b7434d86859cc7b8c3d5e1dddfed66ff742fcbc added a commit function
	4682c3261057305bdd616e23b64b0857d832627b added a todo file
	166ae0c4d3f420721acbb115cc33848dfcc2121a started write support
	9fceb02d0ae598e95dc970b74767f19372d61af8 updated rakefile
	964f16d36dfccde844893cac5b347e7b3d44abbc commit the todo
	8a5cbc430f1a9c3d00faaeffd07798508422908a updated readme

我们忘了在提交 “updated rakefile” 后为此项目打上版本号 v1.2，没关系，现在也能做。只要在打标签的时候跟上对应提交对象的校验和（或前几位字符）即可：

	$ git tag -a v1.2 9fceb02

可以看到我们已经补上了标签：

	$ git tag
	v0.1
	v1.2
	v1.3
	v1.4
	v1.4-lw
	v1.5

	$ git show v1.2
	tag v1.2
	Tagger: Scott Chacon <schacon@gee-mail.com>
	Date:   Mon Feb 9 15:32:16 2009 -0800

	version 1.2
	commit 9fceb02d0ae598e95dc970b74767f19372d61af8
	Author: Magnus Chacon <mchacon@gee-mail.com>
	Date:   Sun Apr 27 20:43:35 2008 -0700

	    updated rakefile
	...

### 分享标签 ###

默认情况下，`git push` 并不会把标签传送到远端服务器上，只有通过显式命令才能分享标签到远端仓库。其命令格式如同推送分支，运行 `git push origin [tagname]` 即可：

	$ git push origin v1.5
	Counting objects: 50, done.
	Compressing objects: 100% (38/38), done.
	Writing objects: 100% (44/44), 4.56 KiB, done.
	Total 44 (delta 18), reused 8 (delta 1)
	To git@github.com:schacon/simplegit.git
	* [new tag]         v1.5 -> v1.5

如果要一次推送所有本地新增的标签上去，可以使用 `--tags` 选项：

	$ git push origin --tags
	Counting objects: 50, done.
	Compressing objects: 100% (38/38), done.
	Writing objects: 100% (44/44), 4.56 KiB, done.
	Total 44 (delta 18), reused 8 (delta 1)
	To git@github.com:schacon/simplegit.git
	 * [new tag]         v0.1 -> v0.1
	 * [new tag]         v1.2 -> v1.2
	 * [new tag]         v1.4 -> v1.4
	 * [new tag]         v1.4-lw -> v1.4-lw
	 * [new tag]         v1.5 -> v1.5

现在，其他人克隆共享仓库或拉取数据同步后，也会看到这些标签。

## 技巧和窍门 ##

在结束本章之前，我还想和大家分享一些 Git 使用的技巧和窍门。很多使用 Git 的开发者可能根本就没用过这些技巧，我们也不是说在读过本书后非得用这些技巧不可，但至少应该有所了解吧。说实话，有了这些小窍门，我们的工作可以变得更简单，更轻松，更高效。

### 自动补全 ###

如果你用的是 Bash shell，可以试试看 Git 提供的自动补全脚本。下载 Git 的源代码，进入  `contrib/completion` 目录，会看到一个 `git-completion.bash` 文件。将此文件复制到你自己的用户主目录中[^2-t3]，并把下面一行内容添加到你的 `.bashrc` 文件中：

	source ~/.git-completion.bash

也可以为系统上所有用户都设置默认使用此脚本。Mac 上将此脚本复制到 `/opt/local/etc/bash_completion.d` 目录中，Linux 上则复制到 `/etc/bash_completion.d/` 目录中。这两处目录中的脚本，都会在 Bash 启动时自动加载。

如果在 Windows 上安装了 msysGit，默认使用的 Git Bash 就已经配好了这个自动补全脚本，可以直接使用。

在输入 Git 命令的时候可以敲两次跳格键（Tab），就会看到列出所有匹配的可用命令建议：

	$ git co<tab><tab>
	commit config

此例中，键入 git co 然后连按两次 Tab 键，会看到两个相关的建议（命令） `commit` 和 `config`。继而输入 `m<tab>` 会自动完成 `git commit` 命令的输入。

命令的选项也可以用这种方式自动完成，其实这种情况更实用些。比如运行 `git log` 的时候忘了相关选项的名字，可以输入开头的几个字母，然后敲 Tab 键看看有哪些匹配的：

	$ git log --s<tab>
	--shortstat  --since=  --src-prefix=  --stat   --summary

这个技巧不错吧，可以节省很多输入和查阅文档的时间。

### Git 命令别名 ###

Git 并不会推断你输入的几个字符将会是哪条命令，不过如果想偷懒，少敲几个命令的字符，可以用 `git config` 为命令设置别名。来看看下面的例子：

	$ git config --global alias.co checkout
	$ git config --global alias.br branch
	$ git config --global alias.ci commit
	$ git config --global alias.st status

现在，如果要输入 `git commit` 只需键入 `git ci` 即可。而随着 Git 使用的深入，会有很多经常要用到的命令，遇到这种情况，不妨建个别名提高效率。

使用这种技术还可以创造出新的命令，比方说取消暂存文件时的输入比较繁琐，可以自己设置一下：

	$ git config --global alias.unstage 'reset HEAD --'

这样一来，下面的两条命令完全等同：

	$ git unstage fileA
	$ git reset HEAD fileA

显然，使用别名的方式看起来更清楚。另外，我们还经常设置 `last` 命令：

	$ git config --global alias.last 'log -1 HEAD'

然后要看最后一次的提交信息，就变得简单多了：

	$ git last
	commit 66938dae3329c7aebe598c2246a8e6af90d04646
	Author: Josh Goebel <dreamer3@example.com>
	Date:   Tue Aug 26 19:48:51 2008 +0800

	    test for current head

	    Signed-off-by: Scott Chacon <schacon@example.com>

可以看出，实际上 Git 只是简单地在命令中替换了你设置的别名。不过有时候我们希望运行某个外部命令，而非 Git 的子命令，这个好办，只需要在命令前加上 `!` 就行。如果你自己写了些处理 Git 仓库信息的脚本的话，就可以用这种技术包装起来。作为演示，我们可以设置用 `git visual` 启动 `gitk`：

	$ git config --global alias.visual '!gitk'

## 小结 ##

到目前为止，你已经学会了最基本的 Git 本地操作：创建和克隆仓库，做出修改，暂存并提交这些修改，以及查看所有历史修改记录。接下来，我们将学习 Git 的必杀技特性：分支。

[^2-t1]: 译注：其实 `git add` 的潜台词就是把目标文件快照放入暂存区域，也就是 add file into staged area，同时未曾跟踪过的文件标记为需要跟踪。这样就好理解后续 add 操作的实际意义了。
[^2-t2]: 译注：实际上不加反斜杠也可以运行，只不过按照 shell 扩展的话，仅仅删除指定目录下的文件而不会递归匹配。上面的例子本来就指定了目录，所以效果等同，但下面的例子就会用递归方式匹配，所以必须加反斜杠。
[^2-t3]: 译注：按照下面的示例，还应改名加上点：`cp git-completion.bash ~/.git-completion.bash`
