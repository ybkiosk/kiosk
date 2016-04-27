wget -O publicData/conditions.json http://api.wunderground.com/api/2062cf09449e02a3/conditions/q/MN/Albany.json
wget -O publicData/forecast.json http://api.wunderground.com/api/2062cf09449e02a3/forecast/q/MN/Albany.json
wget -O publicData/alerts.json http://api.wunderground.com/api/2062cf09449e02a3/alerts/q/MN/Albany.json

wget -O publicData/icon.gif $(cat conditions.json | jq '.current_observation'.'icon_url' | tr -d '"')
