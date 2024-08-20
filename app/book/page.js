import Image from 'next/image'
import Logo from '@/components/shared/Logo'
import Nav from '@/components/shared/Nav'
import RecipeCategories from '@/components/recipe/RecipeCategories'
import ProfessionalTips from '@/components/recipe/ProfessionalTips'

export default function Recipes() {
  return (
    <>
      <main
        className={
          'relative z-30 flex h-auto flex-col justify-center gap-y-[150px]'
        }>
        <RecipeCategories />
        <ProfessionalTips />
      </main>
    </>
  )
}
