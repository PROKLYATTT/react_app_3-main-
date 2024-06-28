import express from 'express';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

const testMiddleware = (req, res, next) => {
  let { id } = req.params

  if (id && id === '22') {
    next()
  }else {
    res.sendStatus(500)
  }
}

const authCheckMiddleware = (req, res, next) => {
  const { authorization} =  req.headers

  if(!authorization) res.status(401).json({ok: false, message: 'Unauthorized'}).send()


  if (authorization) {
    let token = authorization.split(' ')[1]

    if (token) {
      jwt.verify(token, 'MY_SECRET_KEY', (err, result) => {
        console.log(err, result)

        if (err) res.status().json({ok: false, message: 'error'}).send()
        if (result ) {
          req.hey = 'Hey alo'
          next()
        }


      })
    }
  }
}

router.get('/', (req, res) => {
  res.json({ok: true, message: 'is path /'}).send()
})

// req.params
router.post('/test_params/:id', testMiddleware, (req, res) => {
  res.json({ok: true, message: 'is path /test_post', params: req.params}).send()
})


// /test_post?id=22&userId=1&...... -- req.query
router.post('/test_query', (req, res) => {
  res.json({ok: true, message: 'is path /test_post', query: req.query}).send()
})


// /test_post --- req.body
router.post('/test_body', (req, res) => {
  res.json({ok: true, message: 'is path /test_post', body: req.body}).send()
})

// Generate token
router.get('/test_getToken', (req, res) => {

  let user = {
    id: 1,
    login: 'test_login',
    name: 'Author',
  }

  let token = jwt.sign(user, 'MY_SECRET_KEY', { expiresIn: '1d' } )

  res.json({ok: true, token}).send()
})




// Hash password
router.post('/test_hash_pwd', async (req, res) => {

  const { password } = req.body
  
  let hashed_pwd = await bcrypt.hash(password, 3)

  res.json({ok: true, hash: hashed_pwd}).send()
})

// Hash password compare
router.post('/test_hash_pwd_check', async (req, res) => {

  const { password, hash} = req.body
  
  let compare = await bcrypt.compare(password, hash)

  res.json({ok: true, compare}).send()
})





// Check is auth with middleware
router.get('/test_verify', authCheckMiddleware, (req, res) => {
  res.json({ok: true, message: 'token verifyed', hey: req.hey || ''}).send()
})

export default router