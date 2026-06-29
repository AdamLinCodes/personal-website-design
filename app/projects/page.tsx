'use client'

import { useEffect, useRef, useState } from 'react'
import { SitePage } from '../site-page'

const projects = [
  {
    id: 'ontrack',
    eyebrow: 'Mobile product',
    title: 'OnTrack',
    summary:
      'A habit and goal tracker built on one stubborn idea: progress should be visible at a glance, not buried in a dashboard chore.',
    repoHref: 'https://github.com/KyleNewbigging/OnTrack',
    doc: [
      'OnTrack is built around the idea that habit tracking should make progress visible without turning the product into a dashboard chore. The interesting product work is in the recurring-task behavior, date-aware summaries, and views that let someone understand consistency over time rather than only checking whether today is complete.',
      'The project gives me a place to think through mobile product quality: how small state decisions affect long-term usage, how visual summaries should behave across different time windows, and how to keep daily workflows fast enough that people actually return to them.',
      'OnTrack is currently being tested through TestFlight with friends and family, and I am planning to bring it to the Apple App Store very soon. If you would like to beta test it, send me a message.',
    ],
    images: [
      {
        src: '/heat-map.PNG',
        alt: 'OnTrack heat map progress view',
        caption: 'Heatmap and streak views',
      },
      {
        src: '/goal.PNG',
        alt: 'OnTrack goal progress view',
        caption: 'Date-aware goal progress',
      },
      {
        src: '/radar-chart.PNG',
        alt: 'OnTrack radar chart view',
        caption: 'Radar and trend visualizations',
      },
    ],
    imageNotes: ['Heatmap and streak views', 'Date-aware progress summaries', 'Radar and trend visualizations'],
  },
  {
    id: 'hugo',
    eyebrow: 'AI workflow system',
    title: 'Hugo, my OpenClaw dev agent',
    summary:
      'My personal OpenClaw developer: a scheduled, GitHub-integrated agent that can pick up approved issues, open pull requests, and coordinate with me through WhatsApp.',
    repoHref: 'https://github.com/openclaw/openclaw',
    doc: [
      'I am sure many of you, especially my developer friends and colleagues, have heard murmurs of OpenClaw, which is essentially an AI assistant framework. Since I have some free time on my hands #opentowork, I decided to play around with it and wanted to share some of my discoveries, my setup, and the challenges I faced setting it up.',
      'Without further ado, I would like to introduce Hugo, my personal OpenClaw developer.',
      'Once the PR is up, I personally review and test everything. If it all looks good, I merge it myself. Then, at 10:00 p.m. each day, Hugo creates three new issues for me to review. If I approve any of them, I add the agent label, which effectively gives Hugo permission to work on them in the future.',
      'Although I had to SSH into the VPS hosting Hugo while setting everything up, I now interact with him mostly through WhatsApp, which is honestly one of the coolest parts of the whole system. If I think of a feature, a larger idea, or notice a bug in my app, I can just message him directly.',
    ],
    richDoc: [
      <>
        Hugo operates under my personal GitHub account using a restricted personal access token, along with strict
        instructions defined in its workspace context files. Three times a day, cron jobs notify Hugo to pick up an
        issue from the repo that I have personally labeled agent. From there, he creates a local branch, implements a
        solution, and opens a pull request. In that PR, he identifies himself as my personal development agent, provides
        a detailed summary of the changes, and includes a single command for checking out the branch locally for testing
        by me and my collaborator,{' '}
        <a
          href="https://www.linkedin.com/in/kyle-newbigging/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-accent-teal/40 underline-offset-4 transition-colors hover:text-accent-teal"
        >
          Kyle Newbigging
        </a>
        .
      </>,
    ],
    conversation: [
      {
        speaker: 'Adam',
        text: 'Hey, could you add an issue for adding left/right buttons for the date context? Label it agent and enhancement.',
      },
      {
        speaker: 'Hugo',
        content: (
          <>
            Done.
            {'\n\n'}
            Created:
            {'\n'}- Issue #18:{' '}
            <a
              href="https://github.com/KyleNewbigging/OnTrack/issues/18"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline decoration-accent-teal/40 underline-offset-4 transition-colors hover:text-accent-teal"
            >
              https://github.com/KyleNewbigging/OnTrack/issues/18
            </a>
            {'\n\n'}
            Labels:
            {'\n'}- agent
            {'\n'}- enhancement
          </>
        ),
      },
    ],
    researchHref: '/blog#openclaw-journey',
    images: [
      {
        src: '/openclaw.png',
        alt: 'OpenClaw agent interface',
        caption: 'OpenClaw agent workspace',
        href: 'https://github.com/openclaw/openclaw',
      },
      {
        src: '/hostinger.png',
        alt: 'Hostinger VPS hosting view',
        caption: 'VPS hosting setup',
        href: 'https://www.hostinger.com/support/vps/',
      },
    ],
    imageNotes: ['Issue pickup and scheduling flow', 'Branch and pull request lifecycle', 'Human review and approval boundaries'],
  },
]

export default function ProjectsPage() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const openProject = projects.find((project) => project.id === openProjectId)
  const openImages = openProject && 'images' in openProject && openProject.images ? openProject.images : []
  const activeImage = activeImageIndex === null ? null : openImages[activeImageIndex]
  const hasMultipleImages = openImages.length > 1

  const closeImageViewer = () => setActiveImageIndex(null)
  const showPreviousImage = () =>
    setActiveImageIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex - 1 + openImages.length) % openImages.length,
    )
  const showNextImage = () =>
    setActiveImageIndex((currentIndex) =>
      currentIndex === null ? currentIndex : (currentIndex + 1) % openImages.length,
    )

  useEffect(() => {
    if (!openProjectId) {
      return
    }

    window.requestAnimationFrame(() => {
      detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [openProjectId])

  return (
    <SitePage
      eyebrow="Projects"
      title="Things I built because I wanted them to exist"
      description="A habit tracker, a dev agent that lives on a VPS, and a few experiments that wandered out of the lab. Click one to read the whole story."
      details={
        <div className="space-y-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                aria-expanded={openProjectId === project.id}
                aria-controls={`${project.id}-details`}
                onClick={() => setOpenProjectId((currentId) => (currentId === project.id ? null : project.id))}
                className={`group block rounded-md border p-5 text-left shadow-[0_10px_30px_rgba(82,64,39,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-teal/35 hover:bg-card/80 hover:shadow-[0_18px_42px_rgba(82,64,39,0.18)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  openProjectId === project.id ? 'border-accent-teal/35 bg-card/85 shadow-[0_18px_42px_rgba(82,64,39,0.16)]' : 'border-border bg-card/55'
                }`}
              >
                <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{project.eyebrow}</p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-foreground transition-colors group-hover:text-accent-teal">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
              </button>
            ))}
          </div>

          {openProject ? (
            <div ref={detailsRef} className="scroll-mt-32">
              <section id={`${openProject.id}-details`} className="border-t border-border pt-12">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-sm font-medium uppercase text-muted-foreground">{openProject.eyebrow}</p>
                    <h2 className="mt-2 font-display text-3xl font-semibold">{openProject.title}</h2>
                  </div>
                  <a
                    href={openProject.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View repo
                  </a>
                </div>

                <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
                  {openProject.doc.slice(0, 2).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {'richDoc' in openProject && openProject.richDoc
                    ? openProject.richDoc.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                    : null}
                  {openProject.doc.slice(2).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {'conversation' in openProject && openProject.conversation ? (
                  <div className="mt-8 rounded-md border border-border bg-card/50 p-5 shadow-[0_12px_36px_rgba(82,64,39,0.1)]">
                    <p className="font-mono text-sm font-medium uppercase text-muted-foreground">Example WhatsApp Interaction</p>
                    <div className="mt-5 space-y-4">
                      {openProject.conversation.map((message, index) => (
                        <div key={`${message.speaker}-${index}`} className="rounded-md bg-background/70 p-4">
                          <p className="text-sm font-semibold text-foreground">{message.speaker}</p>
                          <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                            {'content' in message && message.content ? message.content : message.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {'researchHref' in openProject && openProject.researchHref ? (
                  <div className="mt-8 text-base leading-8 text-muted-foreground">
                    <p>
                      If you want to read more about the findings, setup issues, and fixes I worked through while
                      getting Hugo running, check out the full write-up on my blog:{' '}
                      <a
                        href={openProject.researchHref}
                        className="inline-flex items-center gap-1 font-medium text-foreground underline decoration-accent-teal/40 underline-offset-4 transition-colors hover:text-accent-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        The OpenClaw Journey <span aria-hidden="true">-&gt;</span>
                      </a>
                    </p>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {'images' in openProject && openProject.images
                    ? openProject.images.map((image, index) => (
                        <figure
                          key={image.src}
                          className="group overflow-hidden rounded-md border border-border bg-card/45 shadow-[0_10px_30px_rgba(82,64,39,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(82,64,39,0.18)]"
                        >
                          {'href' in image && image.href ? (
                            <a
                              href={image.href}
                              target="_blank"
                              rel="noreferrer"
                              className="block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                              />
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setActiveImageIndex(index)}
                              className="block w-full cursor-zoom-in overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.035]"
                              />
                            </button>
                          )}
                          <figcaption className="p-3 text-sm font-medium text-muted-foreground">{image.caption}</figcaption>
                        </figure>
                      ))
                    : openProject.imageNotes.map((note) => (
                        <div
                          key={note}
                          className="flex aspect-[4/3] items-end rounded-md border border-dashed border-border bg-card/35 p-4 text-sm font-medium text-muted-foreground"
                        >
                          {note}
                        </div>
                      ))}
                </div>
              </section>
            </div>
          ) : null}
          {activeImage ? (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/55 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={activeImage.caption}
              onClick={closeImageViewer}
            >
              <div className="relative max-h-[92vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={closeImageViewer}
                  className="absolute right-3 top-3 z-10 rounded-md bg-background/85 px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Close
                </button>
                {hasMultipleImages ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={showPreviousImage}
                      className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-2xl font-medium text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      &lt;
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={showNextImage}
                      className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/85 text-2xl font-medium text-foreground shadow-sm transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      &gt;
                    </button>
                  </>
                ) : null}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="max-h-[88vh] w-full rounded-md object-contain shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
                />
                <p className="mt-3 text-center text-sm font-medium text-background">{activeImage.caption}</p>
              </div>
            </div>
          ) : null}
        </div>
      }
    />
  )
}
