import Link from 'next/link'
import { SitePage } from '../../site-page'

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-2xl font-semibold text-foreground">{children}</h2>
}

export default function LanePostPage() {
  return (
    <SitePage
      eyebrow="Tools"
      title="Lane, because Jira had too many buttons"
      description="I wanted one simple answer: what is my team working on, and what is the status?"
      actions={
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="https://lane-rho.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Check out Lane
          </a>
          <Link
            href="/blog"
            className="rounded-md border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-card"
          >
            Back to blog
          </Link>
        </div>
      }
      details={
        <article className="max-w-3xl space-y-10">
          <div className="space-y-5">
            <p>
              I sometimes worry about AI. Then I build something like Lane, and I absolutely love it again.
            </p>
            <p>
              We used Jira for a while. It is a serious piece of software, but for our use it felt like walking into a cockpit to turn on a light. There were a thousand features and ten thousand buttons. I only wanted to know what my team was working on and where each piece of work stood.
            </p>
            <p>
              So I built Lane. The first version came together in one shot with Fable 5 Ultra. No lie. Since then, we have added little things only when we actually needed them. That is the whole product philosophy: start with the work, then earn every extra feature.
            </p>
          </div>

          <section>
            <Heading>Useful beats comprehensive</Heading>
            <div className="mt-5 space-y-5">
              <p>
                The goal was never to recreate Jira. The goal was to make the daily question effortless: what are we doing, who owns it, and what is the status?
              </p>
              <p>
                That constraint has been helpful. It keeps Lane opinionated, legible, and calm. If something does not help the team see the work or move it forward, it probably does not belong yet.
              </p>
            </div>
          </section>

          <section>
            <Heading>The stack</Heading>
            <div className="mt-5 space-y-5">
              <p>
                Under the hood, Lane is a small TypeScript web app built with Next.js 15 and React 19. Prisma handles the data layer, and Tailwind CSS keeps the interface fast to iterate on without turning every small visual change into a project.
              </p>
              <p>
                There is nothing exotic about that stack, and that is intentional. The interesting part is not the technology. It is being able to shape the product around real team behavior, then ship the next improvement when it earns its place.
              </p>
            </div>
          </section>

          <section>
            <Heading>The best part</Heading>
            <div className="mt-5 space-y-5">
              <p>
                There is a particular builder feeling that never gets old: seeing something you made become part of how people work, then watching them appreciate it. Lane has been that for me.
              </p>
              <p>
                If you want to take a look, <a href="https://lane-rho.vercel.app" target="_blank" rel="noreferrer" className="font-medium text-foreground underline decoration-accent-teal/50 underline-offset-4 transition-colors hover:text-accent-teal">Lane is here</a>.
              </p>
            </div>
          </section>
        </article>
      }
    />
  )
}
