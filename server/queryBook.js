const { sequelize, Book, Author, Author_book, People, Book_rent } = require('./models')

const handleAuthorBook = async country_id => {
  
  const getCountryPeople = await getAllPersonIdByCountry(country_id)

  const top3BooksId = await getTop3BooksID(getCountryPeople)

  const top3BooksDetail = await getBooksDetail(top3BooksId)

  const result = await Promise.all(top3BooksDetail?.map(async i => {
      return ({ 
          name: i.Book.name,
          author: i.dataValues.author_name,
          borrower: await getTop3PeopleById(i.Book.id)
      })
    }
  ))
  return result
}

const getAllPersonIdByCountry = async country_id => { 

  const list = await People.findAll({
    attributes: ['id'],
    where: { country_id }
  })
  return list.map( i => i.id )
}

const getTop3BooksID = async peopleList => {

  const list = await Book_rent.findAll({
    where: { 
      person_id: peopleList
    }, 
    attributes: ["book_id", [sequelize.fn('COUNT', sequelize.col('Book_rent.book_id')), 'bookRentCount']],
    group: ['Book_rent.book_id'],
    order: [[sequelize.col('bookRentCount'), 'DESC']],
    limit: 3
  })
  return list.map(i => i.book_id)
}

const getBooksDetail = async ids => {
  const details = await Author_book.findAll({
    where: {
      book_id: ids
    },
    attributes: ["Book.name", "Book.id", [sequelize.fn('STRING_AGG', sequelize.col('Author.name'), ", "), 'author_name']],
    include: [
      {
        model: Book,
      },
      {
        model: Author,
        attributes: []
      }
    ],
    group: ["Author_book.book_id", "Book.id", "Book.name"]
  })
  return details
}

const getTop3PeopleById = async book_id => {
  const top3RentPeople = await Book_rent.findAll({
    where: {
      book_id
    },
    attributes: ["person_id", [sequelize.fn('COUNT', sequelize.col('Book_rent.person_id')), 'personRentCount']],
    group: ['Book_rent.person_id'],
    order: [[sequelize.col('personRentCount'), 'DESC']],
    limit: 3
  })
  const top3RentPeopleId = await Promise.all(top3RentPeople.map(async i => await getPersonNameByPersonId(i.dataValues.person_id)))
  return top3RentPeopleId
}

const getPersonNameByPersonId = async id => {
  const { name } = await People.findByPk(id)
  return name
}


module.exports = { handleAuthorBook }