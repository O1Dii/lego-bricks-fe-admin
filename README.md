```bash
chown -R ubuntu:ubuntu frontend-admin
scp -P 32125 -r ./app/* ubuntu@31.130.206.100:/home/ubuntu/frontend-admin
chown -R www-data:www-data frontend-admin
```