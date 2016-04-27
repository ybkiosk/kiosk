HOME="/home/debian"

#shutdown
killall chromium-browser
killall chromium-browse
crontab -r -u debian

#echo 'standby 0' | cec-client -s /dev/device >> ceclog.txt


echo "Shutting down at" $(date) >> logs/shutdown.log


if [ $(date +%a) != "Fri" ]
then
#echo debian | sudo -S rtcwake -m mem -u -t $(date +%s -d 'tomorrow 07:45') && echo debian | sudo -S -u debian -i bash $HOME/kiosk/bin/startup.sh &
echo debian | sudo -S rtcwake -m mem -u -t $(date +%s -d 'tomorrow 07:45') && echo debian | sudo -S reboot
#echo debian | sudo -S rtcwake -m mem -u -t $(date +%s -d '3 days 7:45') && echo debian | sudo -S -u debian -i bash $HOME/kiosk/bin/startup.sh &
else
echo debian | sudo -S rtcwake -m mem -u -t $(date +%s -d '3 days 7:45') && echo debian | sudo -S reboot
fi
