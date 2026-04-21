import { SitePage } from '../site-page'

const projects = [
  {
    id: 'ontrack',
    eyebrow: 'Mobile product',
    title: 'OnTrack',
    summary:
      'A habit and goal-tracking app focused on daily follow-through, clean progress visibility, and thoughtful recurring-task logic.',
    repoHref: 'https://github.com/KyleNewbigging/OnTrack',
    doc: [
      'OnTrack is built around the idea that habit tracking should make progress visible without turning the product into a dashboard chore. The interesting product work is in the recurring-task behavior, date-aware summaries, and views that let someone understand consistency over time rather than only checking whether today is complete.',
      'The project gives me a place to think through mobile product quality: how small state decisions affect long-term usage, how visual summaries should behave across different time windows, and how to keep daily workflows fast enough that people actually return to them.',
    ],
    imageNotes: ['Heatmap and streak views', 'Date-aware progress summaries', 'Radar and trend visualizations'],
  },
  {
    id: 'hugo',
    eyebrow: 'AI workflow system',
    title: 'Hugo, my OpenClaw dev agent',
    summary:
      'A personal OpenClaw developer agent set up for practical AI-assisted development inside a real repository workflow.',
    repoHref: 'https://github.com/openclaw/openclaw',
    doc: [
      'Hugo is less about making a flashy chatbot and more about building a useful engineering workflow. The agent is configured to operate around real repository constraints: issue pickup, branch creation, review boundaries, schedules, GitHub pull requests, and explicit human approval before work moves too far.',
      'The project is a way to test what agentic development feels like when it is treated as software process instead of vague automation. The useful parts are the guardrails: when the agent should act, when it should stop, how it should present work for review, and how much structure is needed before automation starts helping instead of creating cleanup work.',
    ],
    imageNotes: ['Issue pickup and scheduling flow', 'Branch and pull request lifecycle', 'Human review and approval boundaries'],
  },
]

export default function ProjectsPage() {
  return (
    <SitePage
      eyebrow="Projects"
      title="Selected work"
      description="Software projects, experiments, and systems built across product, workflow, and infrastructure thinking."
      details={
        <div className="space-y-16">
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                className="group block rounded-md border border-border bg-card/55 p-5 shadow-[0_10px_30px_rgba(82,64,39,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-card/80 hover:shadow-[0_18px_42px_rgba(82,64,39,0.18)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <p className="text-sm font-medium uppercase text-muted-foreground">{project.eyebrow}</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
              </a>
            ))}
          </div>

          <div className="space-y-20">
            {projects.map((project) => (
              <section key={project.id} id={project.id} className="scroll-mt-32 border-t border-border pt-12">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase text-muted-foreground">{project.eyebrow}</p>
                    <h2 className="mt-2 text-3xl font-semibold">{project.title}</h2>
                  </div>
                  <a
                    href={project.repoHref}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    View repo
                  </a>
                </div>

                <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
                  {project.doc.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {project.imageNotes.map((note) => (
                    <div
                      key={note}
                      className="flex aspect-[4/3] items-end rounded-md border border-dashed border-border bg-card/35 p-4 text-sm font-medium text-muted-foreground"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      }
    />
  )
}
