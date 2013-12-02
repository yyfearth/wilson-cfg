#!/bin/sh
cmd=/Users/wilson/Dev/cfg/cmd
export PATH="$PATH:$cmd"
alias l="ls -CFG"
alias ll="ls -AlFG"
alias sshproxy="ssh -CqTfnN -D 7070 wilson@aws.yyfearth.com"
alias sshproxy-gao="ssh -CqTfnN -D 7070 wilson@gaosvr01.engr.sjsu.edu"
alias sshproxy-mason="ssh -CqTfnN -D 7070 wilson@masonwan.com"
#alias cnsshproxy="ssh -CqTfnN -D 7070 yyfearth@211.152.59.113"
alias simple-http-server="python -m SimpleHTTPServer"
alias ramdisk="diskutil erasevolume HFS+ Ramdisk `hdiutil attach -nomount ram://2048000`"
