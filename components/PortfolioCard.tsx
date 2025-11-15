import Image from 'next/image'
import Link from 'next/link'
import { type Project } from '@/constants/data'
import { JSX } from 'react'


interface Props{
    title: string;
    tags: string[];
    image: string;
    slug: string;
    href: string;
}

export default function PortfolioCard({ title , image, slug, href, tags }: Props): JSX.Element {
  return (
    <article className="bg-white rounded-2xl p-5 md:p-6 ring-1 ring-black/10 shadow-sm">
      {/* Screenshot */}
      <div className="relative overflow-hidden rounded-xl bg-neutral-200 aspect-[16/11]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width:1024px) 560px, 100vw"
          className="object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[15px] md:text-base font-medium text-black">
        {title}
      </h3>

      {/* Tags + Arrow */}
      <div className="mt-4 flex items-center justify-between">
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-white px-3 py-1 text-xs md:text-[13px] text-black ring-1 ring-black/20"
            >
              {tag}
            </li>
          ))}
        </ul>

        {href ? (
          <Link
            href={href}
            aria-label={`Open ${title}`}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/30 hover:bg-black/[0.04] transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </Link>
        ) : (
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full ring-1 ring-black/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </div>
        )}
      </div>
    </article>
  )
}