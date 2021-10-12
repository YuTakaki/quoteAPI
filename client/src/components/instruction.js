import React from 'react'

const Instruction = () => {
    return (
        <section className='instruction'>
        <section>
          <h2>GET /api/quotes/random</h2>
          <p>Will get you a random quote</p>
        </section>
        <section>
          <h2>GET /api/quotes/:id</h2>
          <p>Will get you a specific quote</p>
        </section>
        <section>
          <h2>GET /api/user/:idOrName</h2>
          <p>Will get you all quotes of the user</p>
        </section>
        <section>
          <h2>GET /api/users/:idOrUsername</h2>
          <p>will get the user data</p>
        </section>
        <section>
          <h2 className='post'>POST /api/quotes/:id</h2>
          <p>Will add a quote in the database</p>
        </section>
        <section>
          <h2 className='post'>POST /api/users/</h2>
          <p>will add another user in the database</p>
        </section>
        <section>
          <h2 className='delete'>DELETE /api/quotes/:id</h2>
          <p>Will delete a quote</p>
        </section>
        <section>
          <h2 className='delete'>DELETE /api/users/:idOrUsername</h2>
          <p>will delete the user in the database</p>
        </section>
        <section>
          <h2 className='patch'>PATCH /api/quotes/:id</h2>
          <p>Will update the quote partially</p>
        </section>
        <section>
          <h2 className='patch'>PATCH /api/users/:idOrUsername</h2>
          <p>will update the user partially</p>
        </section>

      </section>
    )
}

export default Instruction
