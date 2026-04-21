import { ExternalLink } from 'lucide-react'
import { SitePage } from '../site-page'

const experienceSections = [
  {
    title: 'Amazon RDS Aurora',
    href: 'https://aws.amazon.com/rds/aurora/',
    image: '/amazon-aurora.jpg',
    imageAlt: 'Amazon Aurora interface and database infrastructure graphic',
    body: [
      'My current work is on the Amazon RDS Aurora control plane, where I build and operate distributed backend systems that manage production database infrastructure. That has shaped how I think about software: correctness matters, but so do startup time, memory footprint, operational simplicity, secure service-to-service communication, and what happens when a system is under real load.',
      'A lot of the work has lived close to the boundary between product capability and infrastructure efficiency. I have worked in Java and Rust on Aurora Serverless v2 initiatives, streaming update systems, lightweight agents, authorization, and runtime migrations such as moving JVM services toward Quarkus and GraalVM Native Image. The common thread is making cloud systems smaller, faster, more observable, and easier to operate without losing reliability.',
    ],
  },
  {
    title: 'Level Access',
    href: 'https://www.levelaccess.com/',
    image: '/level-access.jpg',
    imageAlt: 'Level Access brand visual',
    body: [
      'Level Access was where I first got to work inside a professional full-stack engineering team. I built product features across the MEAN stack, moving between Angular, Node.js, Express, and MongoDB while learning how frontend choices, backend validation, data access patterns, and tests all affect the quality of a user-facing workflow.',
      'The accessibility focus of the product stuck with me. It made engineering feel less abstract: a feature is not done just because it works locally or passes a happy path. It has to be understandable, maintainable, testable, and usable by the people it is meant to serve.',
    ],
  },
  {
    title: 'Contract And Community Websites',
    body: [
      'Outside of larger engineering organizations, I have built and shipped smaller web experiences where the feedback loop is much more direct. Lume is a good example: I contributed as a full-stack engineer on a small team, building responsive product features with React, TypeScript, Next.js, and Tailwind while helping with planning, GitHub workflow, and customer-facing polish.',
      'That kind of work exercises a different muscle than infrastructure engineering. It is about turning a loose product need into something people can use, making pragmatic UI decisions, keeping the implementation simple, and carrying a feature from idea to release without a large process around it.',
    ],
  },
]

export default function AboutPage() {
  return (
    <SitePage
      eyebrow="About"
      title="About Adam"
      description="I am a software engineer in Toronto, working across backend systems, cloud infrastructure, and product-focused web applications."
      details={
        <div className="space-y-10">
          {experienceSections.map((section) => (
            <section key={section.title}>
              {'href' in section && section.href ? (
                <a
                  href={section.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block w-full max-w-sm overflow-hidden rounded-md border border-border bg-card/45 shadow-[0_10px_30px_rgba(82,64,39,0.1)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_18px_42px_rgba(82,64,39,0.2)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <img
                    src={section.image}
                    alt={section.imageAlt}
                    className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                  />
                </a>
              ) : null}
              <h2 className="mt-5 text-xl font-semibold">
                {'href' in section && section.href ? (
                  <a
                    href={section.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 transition-colors hover:text-primary"
                  >
                    {section.title}
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </a>
                ) : (
                  section.title
                )}
              </h2>
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
