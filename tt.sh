sudo apt update
sudo apt-get update
sudo apt install git
git clone https://github.com/nima-ra/TeamTwist.git
cd TeamTwist
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install 12.0.0
nvm use 12.0.0
nvm install-latest-npm
npm install
npm install -g pm2
sudo apt install nginx
sudo cp default /etc/nginx/sites-available/default
sudo systemctl restart nginx
chmod +x ./main.js
pm2 start main.js
