"use client";

import BlogFooter from "@/components/BlogFooter";
import BlogH2 from "@/components/BlogH2";
import BlogH3 from "@/components/BlogH3";
import BlogH4 from "@/components/BlogH4";
import BlogTitle from "@/components/BlogTitle";

export default function Cadac() {
  return (
    <div className="flex flex-col items-start justify-start w-full gap-6 sm:text-2xl text-lg">
      <BlogTitle
        title="CADAC: A guide to building data-driven products and teams as a data person"
        date="2025-01-27"
        author={{ name: "Jan Hoon", url: "https://janhoon.com" }}
      />
      <BlogH2>Introduction</BlogH2>
      <p>
        So, you&apos;ve been reading about data quality, data governance, data
        mesh and data fabric and not quite sure where to start when working with
        data at your company. These concepts contain guidelines or principles
        that can help you reach a goal, but in a previous team we found that
        although these principles share some common themes they do not provide a
        lot of direction. So we decided to distill them into something more
        measurable and actionable.
      </p>
      <p>
        We held a workshop with some friendly competition to see who could come
        up with the best proposal for how we could continue to expand and
        improve on our data platform. As part of this workshop we sat down and
        got to thinking,
        <span className="italic"> what does improving actually mean</span>?
      </p>
      <p>
        Throughout this blog post we&apos;ll be interactively exploring what it
        takes to build a data-driven products and teams using CADAC, a way of
        ensuring focus is directed in the right areas when building your data
        products or teams
      </p>
      <BlogH2>CADAC</BlogH2>
      <p>
        Any data frameworks and/or concepts mean nothing if the business
        doesn&apos;t have confidence and trust in the data provided. We&apos;ll
        get into how ownership and data quality discussion a bit deeper later
        on, but for now we just need to focus on direction. So first letter of
        our acronym was defined: <span className="font-bold">Complete</span>.
      </p>
      <BlogH3>Complete</BlogH3>
      <p>
        By completeness in data we implied that we cannot build trust and
        confidence on weak foundations. This foundation is what we build our
        businesses and products on and should reliable and broad. If your data
        is not complete or lacking any information, you&apos;re not going to be
        able to build the trust and confidence you need to achieve
        &quot;data-driveness&quot; or &quot;data mesh&quot; or whatever you are
        aiming for.
      </p>
      <p>
        So how do we ensure completeness? I have 2 key areas of focus for
        completeness:
      </p>
      <BlogH4>1. Business and Application Data</BlogH4>
      <p>
        This should be the starting point. Insights and value will not
        necessarily only come from the places you expect to find them, thus you
        always keep an eye on your own data, both reviewing the data you already
        have as well as finding new sources to grow your foundation. But what do
        I mean by business and application data? Let&apos;s go through some
        examples:
      </p>
      <ul className="flex flex-col list-disc list-outside pt-2 pl-8 gap-2">
        <li>
          <span className="font-bold">Databases:</span> Your services and
          applications will generate data as they are used, don&apos;t just
          think use tables you think are useful, bring everything even if you
          don&apos;t need all of it at first. Also revise and update your
          databases to match your needs. If there is something you can track and
          store to follow and experiment or new feature, do it and store it.
        </li>
        <li>
          <span className="font-bold">API Metrics:</span> If your business
          exposes APIs to customers or other services, you are likely already
          recording metrics to track issues and performance. These metrics can
          often tell you a lot about how your customers are using your product
          and what they are interested in.
        </li>
        <li>
          <span className="font-bold">Logs:</span> These are commonly used by
          developers to find issues and bugs in services, but they can also be
          used to track user behavior and other patterns in how your services
          are used.
        </li>
        <li>
          <span className="font-bold">External Data Providers:</span> Find data
          providers that can give you insights into your customers, your market
          or competitors. This can be used to both enrich and benchmark your own
          business as you grow
        </li>
      </ul>
      <p>
        Be creative and make sure you are generating the data necessary to make
        the right decisions.
      </p>
      <BlogH4>2. ETL, ELT or whatever you want to call it</BlogH4>
      <p>
        You&apos;ve selected your sources and have setup some data integration
        service to pull all of the data into a central location, be it
        Snowflake, Databricks or Excel, but the job is not done. To build trust
        on the completeness of you data, you need to not just cover a wide range
        of data, but without losing any data in the moving process.
      </p>
      <p>
        One way to improve the trust in your data completeness is to run
        periodic checks comparing the source data with the data in you data
        warehouse, making sure there are no discrepancies. There are many ways
        of doing this, examples include: doing a sum of a numeric column and
        comparing it to the source, checking for missing values, checking for
        duplicates, ensuring same number of rows, etc.
      </p>
      <p>
        When you do find any discrepancies, you need to have a process in place
        to notify both those responsible for the data, but also those who are
        using it. Building trust on completeness of your data means having open
        lines of communication and transparency in your data with your data
        &quot;customers&quot;.
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
