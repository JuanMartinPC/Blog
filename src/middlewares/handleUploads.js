const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split('.').pop()
      const filename = `img-${Date.now()}.${extension}`
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload
  