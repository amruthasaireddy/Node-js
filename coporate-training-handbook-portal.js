const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'bookstoreDB.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDBAndServer()

app.get('/books/', async (request, response) => {
  const {
    limit = 10,
    offset = 0,
    order_by = 'book_id',
    order = 'ASC',
  } = request.query

  const allowedColumns = ['book_id', 'title', 'author', 'price', 'publish_date']
  const allowedOrders = ['ASC', 'DESC']

  const sortColumn = allowedColumns.includes(order_by) ? order_by : 'book_id'
  const sortOrder = allowedOrders.includes(order.toUpperCase())
    ? order.toUpperCase()
    : 'ASC'

  const getBooksQuery = `
    SELECT *
    FROM book
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT ${limit} OFFSET ${offset};
  `

  const books = await db.all(getBooksQuery)
  response.json(books)
})

app.get('/books/:id', async (request, response) => {
  const {id} = request.params

  const getBookQuery = `
    SELECT *
    FROM book
    WHERE book_id = ${id};
  `

  const book = await db.get(getBookQuery)

  if (book) {
    response.json(book)
  } else {
    response.status(404).json({message: 'Book not found'})
  }
})

app.post('/books/', async (request, response) => {
  const {title, author, price, publish_date} = request.body

  const addBookQuery = `
    INSERT INTO book (title, author, price, publish_date)
    VALUES (
      '${title}',
      '${author}',
      ${price},
      '${publish_date}'
    );
  `

  const dbResponse = await db.run(addBookQuery)
  const bookId = dbResponse.lastID

  response.json({
    message: 'Book added successfully',
    book_id: bookId,
  })
})

app.put('/books/:id', async (request, response) => {
  const {id} = request.params
  const {title, author, price, publish_date} = request.body

  const updateBookQuery = `
    UPDATE book
    SET
      title = '${title}',
      author = '${author}',
      price = ${price},
      publish_date = '${publish_date}'
    WHERE book_id = ${id};
  `

  await db.run(updateBookQuery)

  response.json({message: 'Book updated successfully'})
})

app.delete('/books/:id', async (request, response) => {
  const {id} = request.params

  const deleteBookQuery = `
    DELETE FROM book
    WHERE book_id = ${id};
  `

  await db.run(deleteBookQuery)

  response.json({message: 'Book deleted successfully'})
})

app.get('/orders/', async (request, response) => {
  const getOrdersQuery = `
    SELECT *
    FROM orders;
  `

  const orders = await db.all(getOrdersQuery)
  response.json(orders)
})

module.exports = app
