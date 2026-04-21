import { SitePage } from '../site-page'

const experienceSections = [
  {
    title: 'Amazon Web Services',
    body: [
      'My current work is on the Amazon RDS Aurora control plane, where I build and operate distributed backend systems that manage production database infrastructure. That has shaped how I think about software: correctness matters, but so do startup time, memory footprint, operational simplicity, secure service-to-service communication, and what happens when a system is under real load.',
      'A lot of the work has lived close to the boundary between product capability and infrastructure efficiency. I have worked in Java and Rust on Aurora Serverless v2 initiatives, streaming update systems, lightweight agents, authorization, and runtime migrations such as moving JVM services toward Quarkus and GraalVM Native Image. The common thread is making cloud systems smaller, faster, more observable, and easier to operate without losing reliability.',
    ],
  },
  {
    title: 'Level Access',
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
              <h2 className="text-xl font-semibold">{section.title}</h2>
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
