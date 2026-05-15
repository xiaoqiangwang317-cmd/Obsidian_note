---
up:
related:
date: 2026-05-15
---
```
行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ git status
On branch main
Your branch is ahead of 'origin/main' by 10 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ git add .

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ git commit -m "chore:initial obsidian vault snapshot"
On branch main
Your branch is ahead of 'origin/main' by 10 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ ssh-keygen -t ed25519 -C "xiaoqiangwang317@gmail.com"
Generating public/private ed25519 key pair.
Enter file in which to save the key (/c/Users/行走的面包树/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/行走的面包树/.ssh/id_ed25519
Your public key has been saved in /c/Users/行走的面包树/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:cxLWoO9eNhDPPI8YKDzEvksiiJ9EeBRCDTpz8QaMOUk xiaoqiangwang317@gmail.com
The key's randomart image is:
+--[ED25519 256]--+
|+E*     .        |
|*..B   . o       |
|+.o = . + .      |
| * =   + *       |
|. o = . S *      |
|oo   + . B +     |
|+ o o   o = .    |
| + + . . o .     |
|  o .   .        |
+----[SHA256]-----+

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIHzAkkjsWKPd4B4UFkhMArd+FjT9ic94HnxOStigGydq xiaoqiangwang317@gmail.com

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ ^C

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ ssh -T xiaoqiangwang317@gmail.com
ssh: connect to host gmail.com port 22: Network is unreachable

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ ssh -T git@github.com^C

行走的面包树@LAPTOP-C2P12E8E MINGW64 /d/download/notes/Obsidian_note (main)
$ ssh -T git@github.com
Hi xiaoqiangwang317-cmd! You've successfully authenticated, but GitHub does not provide shell access.







```