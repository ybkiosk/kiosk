cd /home/debian/kiosk/bin/git
date >> /home/debian/kiosk/bin/git/ip
echo debian | sudo -S ifconfig | grep inet >> /home/debian/kiosk/bin/git/ip
git add /home/debian/kiosk/bin/git/.
git commit -m "daily ip update"
git push ipaddr master
