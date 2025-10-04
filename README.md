# api-express-prisma

npm init -y
npm install express prisma cors dotenv
npm install @prisma/client
npx prisma init
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"
npx prisma migrate dev --name init
npx prisma generate
sudo nano /etc/nginx/sites-available/express-api
server {
    listen 80;
    server_name api.avantoriq.cloud;

    location / {
        proxy_pass http://127.0.0.1:2000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
sudo ln -s /etc/nginx/sites-available/express-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.avantoriq.cloud
https://api.avantoriq.cloud/products
