
export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage?: string;
  genre?: string;
  description?: string;
  year?: number;
  rating?: number;
}

// Sample book database
// You can replace this with your own data later
export const sampleBooks: Book[] = [
  { 
    id: 1, 
    title: 'Война и мир', 
    author: 'Лев Толстой',
    genre: 'Роман',
    description: 'Эпический роман о России во время наполеоновских войн',
    year: 1869,
    rating: 9.8
  },
  { 
    id: 2, 
    title: 'Преступление и наказание', 
    author: 'Фёдор Достоевский',
    genre: 'Психологический роман',
    description: 'Психологический роман о моральной дилемме главного героя',
    year: 1866,
    rating: 9.6
  },
  { 
    id: 3, 
    title: 'Мастер и Маргарита', 
    author: 'Михаил Булгаков',
    genre: 'Мистика',
    description: 'Сатирический роман о визите дьявола в Москву',
    year: 1967, 
    rating: 9.8
  },
  { 
    id: 4, 
    title: 'Анна Каренина', 
    author: 'Лев Толстой',
    genre: 'Роман',
    description: 'Реалистичный роман о жизни и судьбе русской аристократки',
    year: 1877,
    rating: 9.4
  },
  { 
    id: 5, 
    title: 'Идиот', 
    author: 'Фёдор Достоевский',
    genre: 'Роман',
    description: 'История о князе Мышкине, возвращающемся в русское общество',
    year: 1869,
    rating: 9.2
  },
  { 
    id: 6, 
    title: 'Евгений Онегин', 
    author: 'Александр Пушкин',
    genre: 'Поэма',
    description: 'Роман в стихах, шедевр русской литературы',
    year: 1833,
    rating: 9.6
  },
  { 
    id: 7, 
    title: 'Тихий Дон', 
    author: 'Михаил Шолохов',
    genre: 'Эпопея',
    description: 'Эпическое повествование о судьбе донского казачества',
    year: 1940,
    rating: 9.4
  },
  { 
    id: 8, 
    title: 'Герой нашего времени', 
    author: 'Михаил Лермонтов',
    genre: 'Роман',
    description: 'Психологический роман о судьбе поколения',
    year: 1840,
    rating: 9.0
  },
  { 
    id: 9, 
    title: 'Мёртвые души', 
    author: 'Николай Гоголь',
    genre: 'Поэма',
    description: 'Сатирическое произведение о похождениях Чичикова',
    year: 1842,
    rating: 9.2
  },
];

// Function to get all books
export const getAllBooks = (): Book[] => {
  return sampleBooks;
};

// Function to get a book by ID
export const getBookById = (id: number): Book | undefined => {
  return sampleBooks.find(book => book.id === id);
};

// Function to search books
export const searchBooks = (query: string): Book[] => {
  const lowerCaseQuery = query.toLowerCase();
  return sampleBooks.filter(book => 
    book.title.toLowerCase().includes(lowerCaseQuery) ||
    book.author.toLowerCase().includes(lowerCaseQuery) ||
    (book.genre && book.genre.toLowerCase().includes(lowerCaseQuery))
  );
};

// Function to filter books by genre
export const filterBooksByGenre = (genre: string): Book[] => {
  return sampleBooks.filter(book => 
    book.genre && book.genre.toLowerCase() === genre.toLowerCase()
  );
};
