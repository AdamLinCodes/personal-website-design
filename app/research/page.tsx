'use client'

import { useEffect, useRef, useState } from 'react'
import { SitePage } from '../site-page'

const researchPosts = [
  {
    id: 'openclaw-setup',
    eyebrow: 'Agent infrastructure',
    title: 'OpenClaw Journey',
    summary: 'A practical write-up on hosting, setup issues, API-key costs, Codex OAuth, and containerizing Hugo.',
  },
]

const hostingOptions = [
  {
    title: '1. Hosting it locally',
    paragraphs: [
      "Running the agent directly on my laptop seemed convenient at first. I'd have total control and easy access. But it didn't take long to realize how fragile that would be. My laptop isn't always on, and if it crashed or ran out of battery, the agent would go down with it.",
      "Plus, it's strongly advised online not to host OpenClaw locally, even if you have a standalone PC, because OpenClaw works best when it is relatively unfettered. But giving an agent that kind of access on your personal laptop comes with serious risks I would not be willing to take.",
    ],
  },
  {
    title: '2. Mac Mini',
    paragraphs: [
      "I did seriously consider buying a Mac mini. This seemed like a stable, dedicated machine that I could leave running. It would give me control similar to hosting locally, but without tying it to my personal computer's files.",
      "The downside? The cost. I wasn't ready to pay around $700 just to host my agent. It felt like an overcommitment before I knew how well my system would evolve.",
    ],
  },
  {
    title: '3. Cloud',
    paragraphs: [
      'So, I moved to the cloud. As a former Amazonian, EC2 was the natural first thought. EC2 instances are flexible and powerful, and I also looked at Amazon Lightsail as a simpler AWS alternative. But once I compared the numbers for roughly comparable specs, Hostinger started to look much more attractive.',
      "Hostinger's KVM 2 was CA$12.59/month for the first year, while Amazon Lightsail's 8 GB, 2 vCPU Linux plan was US$80/month. EC2 was better, but still came to more than double the price for the closest configuration. A t4g.large instance with 8 GB memory and 2 vCPUs would cost around US$30/month, and that is without the 100 GB of storage that the KVM 2 plan provides.",
      "On top of that, Hostinger had clearly designed its offering with this kind of self-hosted agent workflow in mind, and their 30-day full refund policy made the decision feel much lower-risk in case the whole experiment did not work out.",
      'In the end, I decided to go with the Fully Self-Managed OpenClaw KVM 2 plan, which then led to some other issues...',
    ],
  },
]

const openClawSections = [
  {
    title: 'Issue with the self-managed plan',
    paragraphs: [
      'The self-managed KVM 2 OpenClaw plan was promising. If you followed its intended setup, everything would run smoothly. But there was a catch: it only supported API key setups.',
      'I tested OpenAI and racked up $6 in a day before it even wrote a single line of code. I thought that was the only path until my roommate pointed out that the OpenClaw CLI allows setup using Codex OAuth. With Codex OAuth, if you have ChatGPT Plus, which I do, you can use Codex through your subscription without extra API charges.',
      "But this plan didn't allow that. It only allowed API keys, likely so that it can force you into massive API bills. GRRR!",
      "Thankfully, Hostinger's 30-day refund policy saved me. I canceled KVM 2, assumed I could save more, and went for a raw KVM 1. And that's where the next fun adventure began.",
    ],
  },
  {
    title: 'Contain OpenClaw',
    paragraphs: [
      "After canceling the fully self-managed KVM 2 plan, I went for KVM 1, hoping to save some cash. One key reason for switching was that the fully managed plan didn't allow me to SSH in. With raw KVM, I could finally see what was happening under the hood.",
      "So, I got onto the KVM 1, SSH'd in, installed OpenClaw via the CLI, and from there on the setup was pretty smooth. But after all that, my agent was failing to handle even a single, minute task.",
      "When I asked it to do a simple task via WhatsApp, like updating a README, nothing happened. I'd message it, and... silence.",
      'So, I checked the VPS. Every time I messaged it, a swarm of OpenClaw processes would spawn, the CPU would hit 100%, and then it would all crash. I figured maybe KVM 1 was too weak.',
      'So I upgraded to KVM 2, tried again, but now it would just max out one core, leaving the other completely untouched. Still no dice.',
      "This is when I realized the fully self-managed plan ran OpenClaw inside a Docker container. My guess was that the container was optimized for performance and resource allocation. So, on my upgraded KVM 2, I set up OpenClaw with its Docker container, along with Traefik for handling network communication.",
      "Finally, it worked. The containerized environment clearly managed OpenClaw's processes in a way that raw installs didn't.",
    ],
  },
  {
    title: 'Conclusion',
    paragraphs: [
      "I hope you guys found something helpful in all of my pain and struggling. I especially wanted to share this information because one of the most common warnings and complaints I hear about OpenClaw is that, if you want to do anything meaningful with it, you'll end up running up a huge bill.",
      'But these days, most people I know have ChatGPT Plus or some other LLM subscription, and you can likely use that to mess around with OpenClaw and hopefully build something cool with it.',
    ],
  },
]

export default function ResearchPage() {
  const [openPostId, setOpenPostId] = useState<string | null>(null)
  const detailsRef = useRef<HTMLElement>(null)
  const openPost = researchPosts.find((post) => post.id === openPostId)

  useEffect(() => {
    const postId = window.location.hash.replace('#', '')

    if (researchPosts.some((post) => post.id === postId)) {
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
      eyebrow="Research"
      title="Research notes"
      description="Research and ideas that I explore while working on my projects."
      details={
        <div className="space-y-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {researchPosts.map((post) => (
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
                <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{post.eyebrow}</p>
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
              <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{openPost.eyebrow}</p>
              <h2 className="mt-2 font-display text-3xl font-semibold">{openPost.title}</h2>

              <div className="mt-10 space-y-10 text-base leading-8 text-muted-foreground">
                <section>
                  <h3 className="border-b border-border pb-3 text-2xl font-semibold text-foreground">Where to host?</h3>
                  <div className="mt-5 space-y-5">
                    <p>
                      The first decision I had to make was deciding where I wanted my agent to live. I was presented with
                      three main contenders.
                    </p>
                    <div className="space-y-6 border-l border-border pl-5">
                      {hostingOptions.map((option) => (
                        <section key={option.title}>
                          <h4 className="text-lg font-semibold text-foreground">{option.title}</h4>
                          <div className="mt-3 space-y-3">
                            {option.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </div>
                </section>

                {openClawSections.map((section) => (
                  <section key={section.title}>
                    <h3 className="border-b border-border pb-3 text-2xl font-semibold text-foreground">
                      {section.title}
                    </h3>
                    <div className="mt-5 space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}

                <section>
                  <h3 className="border-b border-border pb-3 text-2xl font-semibold text-foreground">PS</h3>
                  <p className="mt-5">
                    This video by Brian Casel was especially helpful to me:{' '}
                    <a
                      href="https://youtu.be/bzWI3Dil9Ig?si=5yNAO_w9H9BlZJoc"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-foreground underline decoration-accent-teal/40 underline-offset-4 transition-colors hover:text-accent-teal"
                    >
                      Brian Casel video
                    </a>
                    .
                  </p>
                </section>
              </div>
            </article>
          ) : null}
        </div>
      }
    />
  )
}
