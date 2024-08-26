import Image from 'next/image'
import Logo from '@/components/shared/Logo'
import Nav from '@/components/shared/Nav'
import BookCategories from '@/components/book/BookCategories'
import ProfessionalTips from '@/components/book/ProfessionalTips'
import GenresBrowsing from "@/components/home/GenresBrowsing";

export default function Recipes() {
  return (
    <>
      <main
        className={
          'relative z-30 flex h-auto flex-col justify-center gap-y-[150px]'
        }>
          <GenresBrowsing />
          <ProfessionalTips />
      </main>
    </>
  )
}
