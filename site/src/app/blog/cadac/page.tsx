"use client";

import BlogFooter from "@/components/BlogFooter";
import BlogH2 from "@/components/BlogH2";
import BlogH3 from "@/components/BlogH3";
import BlogH4 from "@/components/BlogH4";
import BlogTitle from "@/components/BlogTitle";

// type Rect = {
// 	top: number;
// 	left: number;
// 	width: number;
// 	height: number;
// };

// const chartData = [{ month: "Complete", desktop: 186, mobile: 80 }];

// const chartConfig = {
// 	desktop: {
// 		label: "Desktop",
// 		color: "hsl(var(--chart-1))",
// 	},
// 	mobile: {
// 		label: "Mobile",
// 		color: "hsl(var(--chart-2))",
// 	},
// 	label: {
// 		color: "hsl(var(--background))",
// 	},
// } satisfies ChartConfig;

// const chartInitialRect: Rect = {
// 	top: (33 / 100) * window.innerHeight,
// 	left: (62 / 100) * window.innerWidth,
// 	width: (22 / 100) * window.innerWidth,
// 	height: 300,
// };

export default function Cadac() {
  // refs
  // const chartRef = useRef<HTMLDivElement>(null);

  // scroll listeners
  // const { scrollYProgress: completeScrollYProgress } = useScroll({
  // 	target: completeRef,
  // 	offset: ["start end", "end center"],
  // });
  // const { scrollYProgress: completeInteractScrollYProgress } = useScroll({
  // 	target: completeInteractRef,
  // 	offset: ["start end", "start start"],
  // });

  // state

  // show chart when complete section is in view

  return (
    <div className="flex flex-col items-start justify-start w-full gap-6 sm:text-2xl text-lg">
      <BlogTitle
        title="CADAC: A guide to building data-driven products and teams as a data person"
        date="2025-01-27"
        author={{ name: "Jan Hoon", url: "https://janhoon.com" }}
      />
      {/* <AnimatePresence>
				<motion.div
					ref={chartRef}
					animate={{
						opacity: 1,
						x: 0,
						y: 0,
					}}
					initial={{ opacity: 0, x: 0, y: -20 }}
					exit={{ opacity: 0, x: 0, y: -20 }}
					className="bg-gray-900 p-4 fixed flex flex-col"
				>
					<span className="text-white text-lg font-bold">CADAC Tracker</span>
					<ChartContainer config={chartConfig} className="w-full h-[300px]">
						<BarChart data={chartData} layout="vertical">
							<YAxis dataKey="month" type="category" hide />
							<XAxis dataKey="desktop" hide type="number" />
							<Bar dataKey="desktop" fill="#16a34a" barSize={40}>
								<LabelList
									dataKey="month"
									position="insideLeft"
									fill="#fff"
									fontSize={14}
									fontWeight={600}
								/>
							</Bar>
						</BarChart>
					</ChartContainer>
				</motion.div>
			</AnimatePresence> */}
      <BlogH2>Introduction</BlogH2>
      <p>
        So, you&apos;ve been reading about data quality, data governance, data
        mesh and data fabric and not quite sure where to start when working with
        data at your company. Some of these concepts contain guidelines our
        outline principles that can help you get started, but in a previous team
        I worked with we found that these principles were not enough to get
        started and did not provide any clear direction.
      </p>
      <p>
        Our team held a workshop with some friendly competition to see who could
        come up with some proposals for how we could continue to expand and
        improve on our data platform. As part of this workshop we sat down and
        got to thinking,
        <span className="italic">what does improving actually mean</span>? So we
        sat as a team of 30+ people, data engineers, data analysts, data
        scientists, analytics engineers and started to brainstorm.
      </p>
      <p>
        Throughout this blog post we&apos;ll be interactively exploring what it
        takes to build a data-driven products and teams.
      </p>
      <BlogH2>CADAC</BlogH2>
      <p>
        Where do we start? Well most of these data frameworks and concepts mean
        nothing if the business doesn&apos;t have confidence and trust in the
        data provided. We&apos;ll get into how ownership and data quality
        discussion a bit deeper later on, but for now we just need to focus on
        direction. So first letter of our acronym was defined:{" "}
        <span className="font-bold">Complete</span>.
      </p>
      <BlogH3>Complete</BlogH3>
      <p>
        By completeness in data we implied that we cannot build trust and
        confidence on weak foundations. This foundation is what we build our
        businesses and products on and should maintain a high level of quality.
        If your data is not complete or lacking any value, you&apos;re not going
        to be able to build the trust and confidence you need to acheive
        &quot;data-driven&quot; or &quot;data mesh&quot; or whatever you are
        aiming for.
      </p>
      <p>
        So how do we ensure completeness? For me there are 5 key areas of focus
        for completeness:
      </p>
      <BlogH4>1. Raw Source Data</BlogH4>
      <p>
        Raw source data should always be the starting point. Insights and value
        will not necerily only come from the places you expect to find them,
        thus you always keep an eye on your source data, both reviewing the data
        you already have as well as finding new sources to grow you foundation.
        So then, what does raw source data even mean? Well, anything, but
        let&apos;s go into some examples:
      </p>
      <ul className="flex flex-col list-disc list-outside pt-2 pl-8 gap-2">
        <li>
          <span className="font-bold">Databases:</span> This seems like a
          no-brainer, but don&apos;t just think of databases within you business
          as &quot;another source&quot;, get more involved in the teams
          maintaining the database and guide them with potential improvements.
          Remember, with many datasources your business is not the owner and
          will rely on others to provide the data for you but if you have the
          opportunity to get more value from the sources you use, you should do
          it. Simple example: you have a table in a database containing customer
          phone numbers as a string. Why not ask the team to rather split the
          phone number into country code and number when they request this data
          from the user? Suddenly you you now not only have customer phone
          numbers for operation, but you are able have a proxy to figure out in
          which countries you have more customers.
        </li>
        <li>
          <span className="font-bold">API:</span> Firstly, no, this does not
          mean you should integrate the database behind your APIs. APIs
          generally contain tonnes of valueble data, if you set them up
          correctly. When building APIs you should always think about what data
          you could track regarding the API usage and not just the data it
          generates via interactions with your users. Rather think of metrics
          such as RPS (requests per seconds) or rate limits imposed on clients.
          These can provide powerfull information regarding how and when your
          users are using your services and could teach you a lot about what is
          the best times to reach out to them, or maybe you have a larger
          customer hitting your rate limits and you can now offer them a better
          deal to provide a better, less interrupted experience.
        </li>
        <li>
          <span className="font-bold">Logs:</span> This is a bit more tricky and
          depending on your industry could require a bit more effort, but logs
          are increadably powerful. Engineering and ops teams will often use
          logs to find issues within system, but as the data person you have a
          unique opportunity to use these logs to find insights. Think of logs
          as a &quot;semi&quot; structured list of events you customers perform.
          If you can figure out from a list of log lines what lines are the same
          users, you can start picking up on usage patterns and more commonly
          viewed featers, without the users ever having to input any new data.
          If a GET request is made, we usually don&apos;t get this information
          from a database.
        </li>
        <li>
          <span className="font-bold">External Data Providers:</span> Your own
          services are not the only source of data. You should always be looking
          for more sources of data within your business and industry to ensure
          you a) have a complete picture of your business and b) have a complete
          picture of your industry. Inside your business you might be using a
          CRM and Google Ads to track your existing and potential customers. You
          should have this data in your data platform to do comparisons with
          other sources such as the performance of a new feature or product
          campaign. As for your industry, you should should keep an eye on
          trends of competitors and industry leaders to find more growth
          opportunities in your own business.
        </li>
      </ul>
      <p>
        Be creative and make sure you have the data necessary to make the right
        decisions.
      </p>
      <BlogH4>2. ETL, ELT or whatever you want to call it</BlogH4>
      <p>
        You&apos;ve selected your sources and have setup some data integrations
        service to pull all of the data into a central location, but the job is
        not done. To build trust on the completeness of you data, you need to
        not just cover a wide range of data, but cover a wide range, without
        losing any data in the moving process.
      </p>
      <BlogH4>3. User Generated Data</BlogH4>
      <p>
        User generated data is data that is created by users of your product.
        This could be data such as user feedback, user actions, user
        interactions or any other data that is created by users.
      </p>
      <BlogFooter
        author="Jan Hoon"
        about="Data & Platform Engineer"
        coffeeSlug="janhoon"
        imageUrl="https://github.com/janhoon.png"
        githubUrl="https://github.com/janhoon"
        linkedinUrl="https://www.linkedin.com/in/janhoon"
        xUrl="https://x.com/janhendrikhoon"
      />
    </div>
  );
}
