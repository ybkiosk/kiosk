#this document needs to be set up to run on boot!

#run as debian
#sudo -i -u debian

#turn on tv
#$ echo 'on 0' | cec-client -s /dev/device

#set up system and display
echo debian | sudo -S hwclock -w &
export HOME=/home/debian
xset s off
xset -dpms

#log boot time
echo "Booting at" $(date) >> $HOME/kiosk/bin/logs/boot.log

#reconnect to wifi
#echo debian | sudo -S service connman restart

#set shutdown time and ip log
echo debian | sudo -S at 15:30 -f $HOME/kiosk/bin/shutdown.sh
crontab -u debian crontab.txt
bash /home/debian/kiosk/bin/git.sh
#sudo -i -u debian
#start kiosk

#Start kiosk
export DISPLAY=:0
sleep 15 && chromium-browser --kiosk --disable-gpu http://localhost/kiosk/Client/main.html & >> $HOME/kiosk/bin/logs/chrome.log

