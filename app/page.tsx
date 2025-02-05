import HomePageClient from "@/app/page.client";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen mx-auto max-w-2xl text-center">
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Ignite Your Passion. Reach the World
      </h2>
      <p>
        Supareel empowers educators to build thriving online coaching
        businesses, connecting you with students across the globe
      </p>
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors ">
        Overwhelmed by the Admin work?
      </h2>
      <p>
        The logistics of running a business can dim that flame. Supareel was
        born from the belief that every teacher deserves to share their passion
        with the world.
      </p>
      <p>
        We&rsquo;ve built a simple, powerful platform that breaks down the
        barriers of traditional classrooms, empowering educators to connect with
        students anywhere, anytime. Unlock your potential to reach eager minds
        across the globe.
      </p>
      <p>
        Focus on what you do best: inspiring the next generation. Supareel
        handles the rest.
      </p>
      <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors ">
        And there is more to come?
      </h2>
      <p>Supareel is not just a software its an ecosystem</p>
      <HomePageClient />
    </main>
  );
}
