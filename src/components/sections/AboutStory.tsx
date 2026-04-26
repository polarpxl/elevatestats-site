import { Container } from '@/components/ui/Container'

export function AboutStory() {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-4xl">
            Our story
          </h2>
          <div className="mt-6 flex flex-col gap-5 text-lg text-brand-gray">
            <p>
              Amateur hockey deserves better tools. The pro game has had AI-driven analytics for
              years. Meanwhile, most youth coaches are still tracking games with pencil and paper,
              or fighting with clunky apps that feel like spreadsheets pretending to be software.
            </p>
            <p>
              We built Elevate Stats to close that gap. Real-time tracking that works offline in a
              cold rink. Shot maps that tell you where your team actually generates chances. AI
              insights that translate raw data into practice plans. All in one app, designed for
              the tap-and-go reality of tracking a game from the bench.
            </p>
            <p>
              This is just the beginning. Hockey today. More sports tomorrow. Always built with
              coaches, parents, and players in mind.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
