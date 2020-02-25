## Simple tiny url codifier with Redis cache

To run:

docker-compose up

1. To get tiny url:

curl http://127.0.0.1:3000/tiny/www.google.com
Response: {"tiny_url":"c4X02Xt"}

2. To get long url:

curl http://127.0.0.1:3000/long/c4X02Xt
Response: {"long_url":"www.google.com"}