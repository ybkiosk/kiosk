sudo cp -r Client/default/announcements /var/www/html/
sudo chmod -R 775 /var/www/html/announcements/*
sudo cp -r Client/broadcast /var/www/html/
sudo chmod -R 775 /var/www/html/broadcast/*
sudo cp -r Server/public /var/www/html/
sudo chmod -R 775 /var/www/html/public/*
sudo cp -r * /var/www/html/kiosk
sudo chmod -R 775 bin/*
sudo chmod 777 /var/www/html/public/HostPage/switches.json
sudo chmod -R 777 /var/www/html/public/HostPage/video
#crontab bin/crontab.txt
