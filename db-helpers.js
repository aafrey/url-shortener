const mongo = require('mongodb').MongoClient

const mongoUri = process.env.MONGO_URI
const shortUrl = process.env.SHORT_URL

const getUrl = (urlId, res) => {
   mongo.connect(mongoUri, (err, db) => {
      if (err) {
         throw err
      }
      const collection = db.collection('urls')
      collection.findOne(
      {_id: parseInt(urlId, 10)}
    ).then(doc => {
       db.close()
       res.redirect(doc.url)
    }).catch(err => console.log(err))
   })
}

const connect = (url, res) => {
   mongo.connect(mongoUri, (err, db) => {
      if (err) {
         throw err
      }
      const collection = db.collection('urls')
      collection.find({_id: 'url info'}).toArray((err, docs) => {
         if (err) {
            throw err
         }
         if (docs.length === 0) {
            collection.insertMany(
               [{_id: 'url info', numIds: 0}, {_id: 0, url}]
            ).then(() => {
               const urlsToSend = {normal: url, shortened: shortUrl + '0'}
               db.close()
               res.end(JSON.stringify(urlsToSend))
            }).catch(err => console.log(err))
         } else {
            collection.update(
               {_id: 'url info'}, {$inc: {numIds: 1}}
            ).then(() => {
               const urlId = docs[0].numIds + 1
               collection.insert({_id: urlId, url})
               return urlId
            }).then(urlId => {
               const urlToSend = {normal: url, shortened: shortUrl + urlId}
               res.end(JSON.stringify(urlToSend))
               db.close()
            }).catch(err => console.log(err))
         }
      })
   })
}

module.exports = {
   connect,
   getUrl
}
