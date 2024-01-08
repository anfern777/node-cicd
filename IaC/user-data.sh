#!/bin/bash
sudo apt update

# npm & node js
sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=18
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y

# pm2
sudo npm install pm2 -g

# code deploy
sudo apt install -y ruby-full
sudo apt install -y wget
cd /home/ubuntu
wget https://bucket-name.s3.region-identifier.amazonaws.com/latest/install

CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
sudo $CODEDEPLOY_BIN stop
sudo apt-get remove -y codedeploy-agent
cd /home/ubuntu  # Assuming user is ubuntu, adjust as needed
wget https://aws-codedeploy-me-south-1.s3.me-south-1.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto > /tmp/logfile
sudo service codedeploy-agent start

sudo apt  install awscli -y

sudo apt install at -y
sudo systemctl start atd
sudo systemctl enable atd

sudo setcap 'cap_net_bind_service=+ep' /usr/bin/node
