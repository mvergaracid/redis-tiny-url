const dotenv = require('dotenv')
const express = require('express');
const app = express();
const redis = require('redis')
const middleware = require('./middleware')
const http = require('http');

client = redis.createClient(process.env.REDIS_URL);
const server = http.createServer(app);

dotenv.config()
middleware(app);

generateString = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";  
  const length = 7
  let result = ''
  for (let i= 0; i< length; i++) {
      const value = Math.floor(Math.random() * chars.length);
      result += chars.substring(value, value + 1)
  }
  return result
}

app.get('/tiny/:url', (req, res) => {
    if (!req.params.url) {
        return res.status(400).json({ message: 'BAD REQUEST'})
    }
    const hash = generateString()
    const tinyObject = { url: req.params.url, hash }
    client.set(`url:${hash}`, req.params.url)
    client.rpush('url.ids', hash)
    client.incr(`stats:${+hash}`)
    res.status(200).json({tiny_url: hash})
})

app.get('/long/:hash', async (req, res) => {
    try {
        if (!req.params.hash) {
            return res.status(400).json({ message: 'BAD REQUEST'})
        }
        const db = `stats:${req.params.hash}`
        await new Promise((resolve, reject) => {
            client.get(db, (err, reply) => {
                if (err) return reject(false)
                client.get(db, function(err, reply) {
                    client.get('url:'+req.params.hash, (err, value) => {
                        long_url = value;
                        res.status(200).json({ hash: req.params.id, long_url });
                        return resolve(true)
                  });
                });
            })
        })
       
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'BAD REQUEST'})
    }
})

server.listen(process.env.PORT || 3000)

module.exports = server;
