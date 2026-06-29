import { ExternalLink } from 'lucide-react'
import { SitePage } from '../site-page'

type ExperienceSection = {
  title: string
  tag?: string
  href?: string
  image?: string
  imageAlt?: string
  body: string[]
}

const experienceSections: ExperienceSection[] = [
  {
    title: 'Expertise',
    tag: 'Current',
    href: 'https://www.expertise.ai/',
    body: [
      'I am an engineer at Expertise, where we build AI agents that actually do the job — not a chatbot that hands you a to-do list, but an agent that goes and finishes it. Research the account. Draft the outreach. Run the ten-step workflow on a schedule, then report back when it is done.',
      'Most of my work lives underneath that promise. An agent only feels like magic if the sandbox it runs in spins up in about the time it takes to blink, if the tools and connectors it reaches for are wired correctly, and if the whole multi-tenant machine stays honest about credits, errors, and exactly what each agent is allowed to touch. I move across the stack to make that true: the backend, the agent runtime, the dashboard people actually click, and the internal ops tooling that lets us catch a failure before a customer ever feels it.',
    ],
  },
  {
    title: 'Amazon RDS Aurora',
    tag: 'Before that',
    href: 'https://aws.amazon.com/rds/aurora/',
    image: '/amazon-aurora.jpg',
    imageAlt: 'Amazon Aurora interface and database infrastructure graphic',
    body: [
      'On the Amazon RDS Aurora control plane, I helped build and operate the distributed backend that quietly runs a large slice of the world’s production databases. That job rewired how I think about software. Correctness is table stakes. What actually keeps you up is startup time, memory footprint, secure service-to-service communication, and the question every system eventually has to answer at 3 a.m.: what happens under real load, when nobody is watching?',
      'A lot of it lived on the seam between product capability and raw efficiency. I wrote Java and Rust across Aurora Serverless v2 initiatives, streaming update systems, lightweight agents, authorization, and migrations like pulling JVM services onto Quarkus and GraalVM Native Image. Same goal every time: make a cloud system smaller, faster, more observable, and easier to operate without quietly trading away reliability.',
    ],
  },
  {
    title: 'Level Access',
    href: 'https://www.levelaccess.com/',
    image: '/level-access.jpg',
    imageAlt: 'Level Access brand visual',
    body: [
      'Level Access was my first real engineering team, and the place I learned that “it works on my machine” is the start of the conversation, not the end. I built features across the MEAN stack — Angular, Node, Express, MongoDB — and watched how a frontend decision, a missing piece of backend validation, and a thin test all compound into whether a workflow is any good.',
      'The product was about digital accessibility, and that stuck with me. It made the work concrete: a feature is not done because the happy path is green. It is done when it is understandable, maintainable, testable, and genuinely usable by the people it was built for — including the ones the rest of the industry tends to forget.',
    ],
  },
  {
    title: 'Contract and community builds',
    body: [
      'Away from the big orgs, I take on smaller builds where the feedback loop is measured in hours, not quarters. Lume is the clearest example: I worked as a full-stack engineer on a small team, shipping responsive product features in React, TypeScript, Next.js, and Tailwind while pitching in on planning, the GitHub flow, and the customer-facing polish that decides whether a thing feels finished.',
      'It pulls a different muscle than infrastructure work. No process to hide behind, no platform team to escalate to — just a loose product need and the job of turning it into something a real person can use, then shipping it before the moment passes.',
    ],
  },
]

export default function AboutPage() {
  return (
    <SitePage
      eyebrow="About"
      title="About Adam"
      description="I am a software engineer in Toronto. I gravitate to the layers of the stack most people would rather not think about — and lately, to teaching machines to handle the parts nobody wanted to do in the first place."
      details={
        <div className="space-y-12">
          {experienceSections.map((section) => (
            <section key={section.title}>
              {section.image && section.href ? (
                <a
                  href={section.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-full max-w-sm overflow-hidden rounded-md border border-border bg-card/45 shadow-[0_10px_30px_rgba(82,64,39,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-accent-teal/35 hover:shadow-[0_18px_42px_rgba(82,64,39,0.2)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                  />
                </a>
              ) : null}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <h2 className="font-display text-2xl font-semibold">
                  {section.href ? (
                    <a
                      href={section.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 transition-colors hover:text-accent-teal"
                    >
                      {section.title}
                      <ExternalLink className="size-4" aria-hidden="true" />
                    </a>
                  ) : (
                    section.title
                  )}
                </h2>
                {section.tag ? (
                  <span className="rounded-full border border-accent-teal/40 bg-accent-teal/10 px-2.5 py-0.5 font-mono text-xs font-medium uppercase tracking-wide text-accent-teal">
                    {section.tag}
                  </span>
                ) : null}
              </div>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      }
    />
  )
}
