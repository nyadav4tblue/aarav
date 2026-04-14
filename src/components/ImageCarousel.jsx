import { useEffect, useState } from 'react'
import { publicUrl } from '../utils/publicUrl'

/**
 * @param {{ images: string[]; alt: string; className?: string }} props
 */
export function ImageCarousel({ images, alt, className = '' }) {
  const [index, setIndex] = useState(0)
  const safe = images.length > 0 ? images : ['images/gods-surya-1.svg']
  const n = safe.length

  const prev = () => setIndex((i) => (i - 1 + n) % n)
  const next = () => setIndex((i) => (i + 1) % n)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setIndex((i) => (i - 1 + n) % n)
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setIndex((i) => (i + 1) % n)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [n])

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-stone-200 shadow-inner ring-1 ring-stone-200/80 ${className}`}
    >
      <div className="aspect-[4/3] w-full">
        <img
          src={publicUrl(safe[index])}
          alt={`${alt} — ${index + 1} of ${n}`}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
        />
      </div>

      {n > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-stone-800 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-stone-800 shadow-md backdrop-blur transition hover:bg-white hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Next image"
          >
            ›
          </button>
          <div
            className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/35 px-2 py-1.5 backdrop-blur"
            role="tablist"
            aria-label="Image indicators"
          >
            {safe.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
