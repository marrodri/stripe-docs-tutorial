// strip secret API KEY
export {}
const stripe = require('stripe')(import.meta.env.VITE_STRIPE_SECRET_KEY)
const express = require('express')
const app = express()
app.use(express.static('public'))

const YOUR_DOMAIN = 'https://localhost:3000'

app.post('create-checkout-session', async (req : any, res:any) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  })
  res.redirect(303, session.url)
})

app.listen(3000, ()=> console.log('running on port 3000'))
