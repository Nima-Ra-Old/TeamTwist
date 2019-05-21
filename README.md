# Quick Installation Guide
1. Installing Git

`sudo apt install git`

2. Cloning the repository

`git clone https://github.com/nima-ra/TeamTwist.git`

3. CD to the directory

`cd TeamTwist`

4. Installing dependencies

`npm install`

5. Installing pm2

`npm install -g pm2`

6. Marking main.js executable:

`chmod +x ./main.js`

7. Getting into editor mode for editing nginx defaults

`nano /etc/nginx/sites-available/default`

8. Adding this code to the server block

```
location / {

                proxy_pass http://localhost:8545;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
```

9. Restarting Nginx

`sudo systemctl restart nginx`

10. Launching code

`pm2 start main.js`
