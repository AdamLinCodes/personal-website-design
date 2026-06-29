'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { SitePage } from '../site-page'

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-foreground underline decoration-accent-teal/50 underline-offset-4 transition-colors hover:text-accent-teal"
    >
      {children}
    </a>
  )
}

type BlogPost = {
  id: string
  eyebrow: string
  title: string
  date: string
  summary: string
  body: ReactNode
}

const blogPosts: BlogPost[] = [
  {
    id: 'e2b-and-ponytail',
    eyebrow: 'Tools',
    title: 'A shout-out to E2B, and a lazy little experiment',
    date: 'June 2026',
    summary:
      'On sandboxes that spin up before you finish the thought, and a Claude Code plugin that keeps talking me out of over-building.',
    body: (
      <div className="space-y-10">
        <section>
          <h3 className="font-display text-2xl font-semibold text-foreground">The thing about instant</h3>
          <div className="mt-5 space-y-4">
            <p>
              Here is a small, unglamorous truth about AI agents: the magic dies the second you have to wait. An agent
              that takes thirty seconds to find somewhere to run is not an assistant — it is a loading spinner with
              ambitions. So a good chunk of my week at Expertise goes into obsessing over the boring milliseconds, and
              the single biggest reason those milliseconds stay boring is{' '}
              <Link href="https://e2b.dev/">E2B</Link>.
            </p>
            <p>
              E2B hands you a real, isolated sandbox — a whole little computer an agent can write files in, run code in,
              and break things in — and it does it in what feels like no time at all. I keep bracing for a cold start. I
              keep not getting one. You ask for a sandbox and it is just… there, the way a light is there when you flip
              the switch. For something doing this much underneath, that is genuinely hard, and they make it look
              effortless.
            </p>
            <p>
              The part I did not expect to care about, and now do, is the community around it. Fast, generous, and
              refreshingly free of the open-a-ticket-and-wait-two-weeks energy. When something is confusing you get a
              real answer from a real person who has obviously been in the same weeds. That is rarer than it should be.
              So — thank you,{' '}
              <Link href="https://github.com/e2b-dev/E2B">the E2B folks</Link>. You are great software, and you ship the
              kind of speed that makes everything built on top of you feel smarter than it has any right to.
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-display text-2xl font-semibold text-foreground">The lazy experiment</h3>
          <div className="mt-5 space-y-4">
            <p>
              The other thing I am trying out runs on almost the opposite instinct. It is called{' '}
              <Link href="https://github.com/DietrichGebert/ponytail">ponytail</Link> — a Claude Code plugin that
              channels a senior engineer who has been paged at 3 a.m. one too many times and now refuses to write a
              single line of code that does not need to exist.
            </p>
            <p>
              The pitch is laziness as a discipline. Before it builds anything, it climbs a tiny ladder: does this need
              to exist at all? Is it already in the codebase? Will the standard library do it? A native feature? One line
              instead of fifty? It stops at the first rung that holds. Sounds obvious, until you notice how much of
              modern software is the exact opposite — a factory wrapping a wrapper around a config for a value that will
              never change.
            </p>
            <p>
              I write a lot of code with agents now, and the default failure mode of an eager agent is not getting things
              wrong. It is getting them too right: ten files where one would do, an abstraction for a case that never
              arrives. ponytail leans hard the other way, and I genuinely want to know whether that makes the output
              better or merely smaller.
            </p>
          </div>
        </section>

        <section>
          <h3 className="font-display text-2xl font-semibold text-foreground">Stay tuned</h3>
          <div className="mt-5 space-y-4">
            <p>
              I have been running it on real work — including, full disclosure, the rebuild of this very site. Whether
              “do less, but mean it” holds up over weeks instead of a single afternoon is the actual question, and I do
              not have the answer yet.
            </p>
            <p>Results to follow. Stay tuned.</p>
          </div>
        </section>
      </div>
    ),
  },
]

export default function BlogPage() {
  const [openPostId, setOpenPostId] = useState<string | null>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const openPost = blogPosts.find((post) => post.id === openPostId)

  useEffect(() => {
    if (!openPostId) {
      return
    }

    window.requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [openPostId])

  return (
    <SitePage
      eyebrow="Blog"
      title="Notes and shout-outs"
      description="Short posts on the tools I am betting on, the experiments I am running, and the occasional thing I learned the hard way."
      details={
        <div className="space-y-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {blogPosts.map((post) => (
              <button
                key={post.id}
                type="button"
                aria-expanded={openPostId === post.id}
                aria-controls={`${post.id}-article`}
                onClick={() => setOpenPostId((currentId) => (currentId === post.id ? null : post.id))}
                className={`group block rounded-md border p-5 text-left shadow-[0_10px_30px_rgba(82,64,39,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-teal/35 hover:bg-card/80 hover:shadow-[0_18px_42px_rgba(82,64,39,0.18)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  openPostId === post.id ? 'border-accent-teal/35 bg-card/85 shadow-[0_18px_42px_rgba(82,64,39,0.16)]' : 'border-border bg-card/55'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{post.eyebrow}</p>
                  <p className="font-mono text-xs text-muted-foreground">{post.date}</p>
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-accent-teal">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.summary}</p>
              </button>
            ))}
          </div>

          {openPost ? (
            <article
              id={`${openPost.id}-article`}
              ref={detailsRef}
              className="scroll-mt-32 border-t border-border pt-10"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{openPost.eyebrow}</p>
                <p className="font-mono text-xs text-muted-foreground">{openPost.date}</p>
              </div>
              <h2 className="mt-2 font-display text-3xl font-semibold">{openPost.title}</h2>
              <div className="mt-8 text-base leading-8 text-muted-foreground">{openPost.body}</div>
            </article>
          ) : null}
        </div>
      }
    />
  )
}
