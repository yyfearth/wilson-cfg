#!/bin/sh

echo Key Repeat
defaults write -g ApplePressAndHoldEnabled -bool false

echo Change Default Saving Place to Local Disk
defaults write NSGlobalDomain NSDocumentSaveNewDocumentsToCloud -bool false

echo Show All Files
defaults write com.apple.Finder AppleShowAllFiles YES

echo Advanced Air Drop
defaults write com.apple.NetworkBrowser BrowseAllInterfaces 1 && killall Finder

echo Show Library
chflags nohidden ~/Library/

echo Hide a volume in Mac OS X
SetFile -a V /Volumes/Name

echo Sublime Test Cmd Line
ln -s "/Applications/Sublime Text 2.app/Contents/SharedSupport/bin/subl" /usr/local/bin/subl

# echo Disable Hibernate
# sudo pmset -a hibernatemode 0
# sudo rm /var/vm/sleepimage
