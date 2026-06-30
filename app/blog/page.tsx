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

function Heading({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-2xl font-semibold text-foreground">{children}</h3>
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
    id: 'fable',
    eyebrow: 'Models',
    title: 'My one glorious day with Fable',
    date: 'June 2026',
    summary: 'I had Fable for a single day, shipped 78 pull requests, and every one of them was fire. Word is it comes back this week.',
    body: (
      <div className="space-y-5">
        <p>
          For exactly one day, I had{' '}
          <Link href="https://www.anthropic.com/news/claude-fable-5-mythos-5">Fable</Link>. Claude Fable 5, the
          Mythos-class model Anthropic briefly let loose on the world. I am not being dramatic when I say it was glorious.
          It did not feel like an assistant so much as a second version of me who never got tired, never guessed, and
          never needed a second pass.
        </p>
        <p>
          Seventy-eight pull requests. In a single day. Every last one of them fire. I have shipped a lot of code with a
          lot of agents, and I have never had a day like that, where the only bottleneck was how fast I could read the
          diffs and hit merge. Then, just as quickly, it was gone.
        </p>
        <p>
          But here is the good part: there are rumors it switches back on{' '}
          <Link href="https://gizmodo.com/expect-claude-fable-5-to-be-turned-back-on-in-a-matter-of-days-report-says-2000778672">
            sometime this week
          </Link>
          . So if you blinked and missed it, do not worry. Stay tuned, people.
        </p>
      </div>
    ),
  },
  {
    id: 'e2b',
    eyebrow: 'Tools',
    title: 'A shout-out to E2B',
    date: 'June 2026',
    summary: 'On sandboxes that spin up before you finish the thought, and a community that answers like a real person.',
    body: (
      <div className="space-y-5">
        <p>
          Here is a small, unglamorous truth about AI agents: the magic dies the second you have to wait. An agent that
          takes thirty seconds to find somewhere to run is not an assistant. It is a loading spinner with ambitions. So a
          good chunk of my week at Expertise goes into obsessing over the boring milliseconds, and the single biggest
          reason those milliseconds stay boring is <Link href="https://e2b.dev/">E2B</Link>.
        </p>
        <p>
          E2B hands you a real, isolated sandbox, a whole little computer an agent can write files in, run code in, and
          break things in. And it does this in what feels like no time at all. I keep bracing for a cold start. I keep
          not getting one. You ask for a sandbox and it is just there, the way a light is there when you flip the switch.
          For something doing this much underneath, that is genuinely hard, and they make it look effortless.
        </p>
        <p>
          The part I did not expect to care about, and now do, is the community around it. Fast, generous, and
          refreshingly free of the open-a-ticket-and-wait-two-weeks energy. When something is confusing you get a real
          answer from a real person who has obviously been in the same weeds. That is rarer than it should be. So a
          genuine thank-you to <Link href="https://github.com/e2b-dev/E2B">the E2B folks</Link>: you are great software,
          and you ship the kind of speed that makes everything built on top of you feel smarter than it has any right to.
        </p>
      </div>
    ),
  },
  {
    id: 'ponytail',
    eyebrow: 'Experiments',
    title: 'An experiment in being lazy on purpose',
    date: 'June 2026',
    summary: 'Trying out ponytail, a Claude Code plugin that keeps talking me out of over-building. Results to follow.',
    body: (
      <div className="space-y-5">
        <p>
          Lately I have been running an experiment that goes against every instinct an eager coding agent has. It is
          called <Link href="https://github.com/DietrichGebert/ponytail">ponytail</Link>, a Claude Code plugin that
          channels a senior engineer who has been paged at 3 a.m. one too many times and now refuses to write a single
          line of code that does not need to exist.
        </p>
        <p>
          The pitch is laziness as a discipline. Before it builds anything, it climbs a tiny ladder: does this need to
          exist at all? Is it already in the codebase? Will the standard library do it? A native feature? One line
          instead of fifty? It stops at the first rung that holds. Sounds obvious, until you notice how much of modern
          software is the exact opposite: a factory wrapping a wrapper around a config for a value that will never change.
        </p>
        <p>
          I write a lot of code with agents now, and the default failure mode of an eager agent is not getting things
          wrong. It is getting them too right: ten files where one would do, an abstraction for a case that never
          arrives. ponytail leans hard the other way, and I genuinely want to know whether that makes the output better
          or merely smaller.
        </p>
        <p>
          I have been running it on real work, including, full disclosure, the rebuild of this very site. Whether “do
          less, but mean it” holds up over weeks instead of a single afternoon is the actual question, and I do not have
          the answer yet. Results to follow. Stay tuned.
        </p>
      </div>
    ),
  },
  {
    id: 'openclaw-journey',
    eyebrow: 'Agent infrastructure',
    title: 'The OpenClaw Journey',
    date: 'May 2026',
    summary: 'Where I hosted my dev agent, the API bills I nearly racked up, and the container fix that finally made it work.',
    body: (
      <div className="space-y-10">
        <p>
          Hugo is my personal OpenClaw dev agent: a scheduled, GitHub-integrated agent that picks up issues I have
          approved, opens pull requests, and talks to me over WhatsApp. Getting him running was not smooth. Here is the
          full account of where I tried to host him, the bills I nearly racked up, and the container fix that finally did
          the trick.
        </p>

        <section>
          <Heading>Where to host?</Heading>
          <div className="mt-5 space-y-5">
            <p>
              The first decision I had to make was where I wanted my agent to live. I was presented with three main
              contenders.
            </p>
            <div className="space-y-6 border-l border-border pl-5">
              <section>
                <h4 className="text-lg font-semibold text-foreground">1. Hosting it locally</h4>
                <div className="mt-3 space-y-3">
                  <p>
                    Running the agent directly on my laptop seemed convenient at first. I&apos;d have total control and
                    easy access. But it didn&apos;t take long to realize how fragile that would be. My laptop isn&apos;t
                    always on, and if it crashed or ran out of battery, the agent would go down with it.
                  </p>
                  <p>
                    Plus, it&apos;s strongly advised online not to host OpenClaw locally, even if you have a standalone
                    PC, because OpenClaw works best when it is relatively unfettered. But giving an agent that kind of
                    access on your personal laptop comes with serious risks I would not be willing to take.
                  </p>
                </div>
              </section>
              <section>
                <h4 className="text-lg font-semibold text-foreground">2. Mac Mini</h4>
                <div className="mt-3 space-y-3">
                  <p>
                    I did seriously consider buying a Mac mini. This seemed like a stable, dedicated machine that I could
                    leave running. It would give me control similar to hosting locally, but without tying it to my
                    personal computer&apos;s files.
                  </p>
                  <p>
                    The downside? The cost. I wasn&apos;t ready to pay around $700 just to host my agent. It felt like an
                    overcommitment before I knew how well my system would evolve.
                  </p>
                </div>
              </section>
              <section>
                <h4 className="text-lg font-semibold text-foreground">3. Cloud</h4>
                <div className="mt-3 space-y-3">
                  <p>
                    So, I moved to the cloud. As a former Amazonian, EC2 was the natural first thought. EC2 instances are
                    flexible and powerful, and I also looked at Amazon Lightsail as a simpler AWS alternative. But once I
                    compared the numbers for roughly comparable specs, Hostinger started to look much more attractive.
                  </p>
                  <p>
                    Hostinger&apos;s KVM 2 was CA$12.59/month for the first year, while Amazon Lightsail&apos;s 8 GB, 2
                    vCPU Linux plan was US$80/month. EC2 was better, but still came to more than double the price for the
                    closest configuration. A t4g.large instance with 8 GB memory and 2 vCPUs would cost around
                    US$30/month, and that is without the 100 GB of storage that the KVM 2 plan provides.
                  </p>
                  <p>
                    On top of that, Hostinger had clearly designed its offering with this kind of self-hosted agent
                    workflow in mind, and their 30-day full refund policy made the decision feel much lower-risk in case
                    the whole experiment did not work out.
                  </p>
                  <p>
                    In the end, I decided to go with the Fully Self-Managed OpenClaw KVM 2 plan, which then led to some
                    other issues...
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section>
          <Heading>Issue with the self-managed plan</Heading>
          <div className="mt-5 space-y-3">
            <p>
              The self-managed KVM 2 OpenClaw plan was promising. If you followed its intended setup, everything would
              run smoothly. But there was a catch: it only supported API key setups.
            </p>
            <p>
              I tested OpenAI and racked up $6 in a day before it even wrote a single line of code. I thought that was the
              only path until my roommate pointed out that the OpenClaw CLI allows setup using Codex OAuth. With Codex
              OAuth, if you have ChatGPT Plus, which I do, you can use Codex through your subscription without extra API
              charges.
            </p>
            <p>But this plan didn&apos;t allow that. It only allowed API keys, likely so that it can force you into massive API bills. GRRR!</p>
            <p>
              Thankfully, Hostinger&apos;s 30-day refund policy saved me. I canceled KVM 2, assumed I could save more, and
              went for a raw KVM 1. And that&apos;s where the next fun adventure began.
            </p>
          </div>
        </section>

        <section>
          <Heading>Contain OpenClaw</Heading>
          <div className="mt-5 space-y-3">
            <p>
              After canceling the fully self-managed KVM 2 plan, I went for KVM 1, hoping to save some cash. One key
              reason for switching was that the fully managed plan didn&apos;t allow me to SSH in. With raw KVM, I could
              finally see what was happening under the hood.
            </p>
            <p>
              So, I got onto the KVM 1, SSH&apos;d in, installed OpenClaw via the CLI, and from there on the setup was
              pretty smooth. But after all that, my agent was failing to handle even a single, minute task.
            </p>
            <p>
              When I asked it to do a simple task via WhatsApp, like updating a README, nothing happened. I&apos;d message
              it, and... silence.
            </p>
            <p>
              So, I checked the VPS. Every time I messaged it, a swarm of OpenClaw processes would spawn, the CPU would
              hit 100%, and then it would all crash. I figured maybe KVM 1 was too weak.
            </p>
            <p>
              So I upgraded to KVM 2, tried again, but now it would just max out one core, leaving the other completely
              untouched. Still no dice.
            </p>
            <p>
              This is when I realized the fully self-managed plan ran OpenClaw inside a Docker container. My guess was
              that the container was optimized for performance and resource allocation. So, on my upgraded KVM 2, I set up
              OpenClaw with its Docker container, along with Traefik for handling network communication.
            </p>
            <p>Finally, it worked. The containerized environment clearly managed OpenClaw&apos;s processes in a way that raw installs didn&apos;t.</p>
          </div>
        </section>

        <section>
          <Heading>Conclusion</Heading>
          <div className="mt-5 space-y-3">
            <p>
              I hope you found something helpful in all of my pain and struggling. I especially wanted to share this
              because one of the most common warnings I hear about OpenClaw is that, if you want to do anything meaningful
              with it, you&apos;ll end up running up a huge bill.
            </p>
            <p>
              But these days, most people I know have ChatGPT Plus or some other LLM subscription, and you can likely use
              that to mess around with OpenClaw and hopefully build something cool with it.
            </p>
          </div>
        </section>

        <section>
          <Heading>PS</Heading>
          <p className="mt-5">
            This video by Brian Casel was especially helpful to me:{' '}
            <Link href="https://youtu.be/bzWI3Dil9Ig?si=5yNAO_w9H9BlZJoc">Brian Casel video</Link>.
          </p>
        </section>
      </div>
    ),
  },
]

export default function BlogPage() {
  const [openPostId, setOpenPostId] = useState<string | null>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const openPost = blogPosts.find((post) => post.id === openPostId)

  // Support deep links like /blog#openclaw-journey (e.g. from the Projects page).
  useEffect(() => {
    const postId = window.location.hash.replace('#', '')

    if (blogPosts.some((post) => post.id === postId)) {
      setOpenPostId(postId)
    }
  }, [])

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
