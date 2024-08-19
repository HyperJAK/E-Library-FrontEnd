'use client'
import {useState} from "react";
import {fetchAndFormatBooks} from "@/config/API/book/bookService";

export default function Home() {

  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    try {
      const fetchedBooks = await fetchAndFormatBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    }
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <button
            onClick={handleFetchBooks}
            className="px-6 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Fetch Books
        </button>

        {books.length > 0 && (
            <div className="mt-8 w-full max-w-4xl">
              <h2 className="text-2xl font-semibold">Book List:</h2>
              <ul className="mt-4">
                {books.map((book) => (
                    <li key={book.id} className="mb-2 p-2 border rounded">
                      <h3 className="font-bold">{book.title}</h3>
                      <p>Published Date: {book.formattedDate}</p>
                    </li>
                ))}
              </ul>
            </div>
        )}
      </div>
    </main>
  );
}
