
import GenresBrowsing from "@/components/home/GenresBrowsing";

export default function Recipes() {
  return (
    <>
      <main
        className={
          'relative z-30 flex h-auto flex-col justify-center gap-y-[150px] overflow-hidden'
        }>
          <GenresBrowsing />
      </main>
    </>
  )
}
