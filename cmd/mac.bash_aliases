#!/bin/sh
cmd=/Users/wilson/Dev/cfg/cmd
export PATH="$PATH:$cmd"
alias l="ls -CF"
alias ll="ls -AlF"
alias sshproxy="ssh -CqTfnN -D 7070 myyapps@myyapps.dreamhosters.com"
#alias cnsshproxy="ssh -CqTfnN -D 7070 yyfearth@211.152.59.113"
alias ramdisk="diskutil erasevolume HFS+ Ramdisk `hdiutil attach -nomount ram://2048000`"
