echo debian | sudo -S rtcwake -m mem -s 30 && echo debian | sudo -S -u debian -i bash /home/debian//kiosk/bin/startup.sh &
