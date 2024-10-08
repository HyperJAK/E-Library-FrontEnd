'use client'
import {useState} from "react";
import {fetchAndFormatBooks} from "@/config/API/book/bookService";
import BookSearch from "@/components/home/BookSearch";
import InterestingInfo from "@/components/home/InterestingInfo";
import GenresBrowsing from "@/components/home/GenresBrowsing";


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
    <main className="flex min-h-screen flex-col overflow-hidden items-center justify-between p-24">
      {/*All home page features*/}
      <BookSearch />
      <GenresBrowsing />
      <InterestingInfo />
    </main>
  );
}
