#this document needs to be set up to run on boot!

#boot






#shutdown
sudo rtcwake -m  disk -u -t $(date +%s -d 'tomorrow 07:45')
