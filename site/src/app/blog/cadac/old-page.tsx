"use client";

import BlogFooter from "@/components/BlogFooter";
import BlogH2 from "@/components/BlogH2";
import BlogH3 from "@/components/BlogH3";
import BlogH4 from "@/components/BlogH4";
import BlogTitle from "@/components/BlogTitle";

export default function cadac() {
  return (
    <div classname="flex flex-col items-start justify-start w-full gap-6 sm:text-2xl text-lg">
      <blogtitle
        title="cadac: a guide to building data-driven products and teams as a data person"
        date="2025-01-27"
        author={{ name: "jan hoon", url: "https://janhoon.com" }}
      />
      <blogh2>introduction</blogh2>
      <p>
        so, you&apos;ve been reading about data quality, data governance, data
        mesh and data fabric and not quite sure where to start when working with
        data at your company. these concepts contain guidelines or principles
        that can help you reach a goal, but in a previous team we found that
        although these principles share some common themes they do not provide a
        lot of direction. so we decided to distill them into something more
        measurable and actionable.
      </p>
      <p>
        we held a workshop with some friendly competition to see who could come
        up with the best proposal for how we could continue to expand and
        improve on our data platform. as part of this workshop we sat down and
        got to thinking,
        <span classname="italic"> what does improving actually mean</span>?
      </p>
      <p>
        throughout this blog post we&apos;ll be interactively exploring what it
        takes to build a data-driven products and teams using cadac, a way of
        ensuring focus is directed in the right areas when building your data
        products or teams
      </p>
      <blogh2>cadac</blogh2>
      <p>
        any data frameworks and/or concepts mean nothing if the business
        doesn&apos;t have confidence and trust in the data provided. we&apos;ll
        get into how ownership and data quality discussion a bit deeper later
        on, but for now we just need to focus on direction. so first letter of
        our acronym was defined: <span classname="font-bold">complete</span>.
      </p>
      <blogh3>complete</blogh3>
      <p>
        by completeness in data we implied that we cannot build trust and
        confidence on weak foundations. this foundation is what we build our
        businesses and products on and should reliable and broad. if your data
        is not complete or lacking any information, you&apos;re not going to be
        able to build the trust and confidence you need to achieve
        &quot;data-driveness&quot; or &quot;data mesh&quot; or whatever you are
        aiming for.
      </p>
      <p>
        so how do we ensure completeness? i have 2 key areas of focus for
        completeness:
      </p>
      <blogh4>1. business and application data</blogh4>
      <p>
        this should be the starting point. insights and value will not
        necessarily only come from the places you expect to find them, thus you
        always keep an eye on your own data, both reviewing the data you already
        have as well as finding new sources to grow your foundation. but what do
        i mean by business and application data? let&apos;s go through some
        examples:
      </p>
      <ul classname="flex flex-col list-disc list-outside pt-2 pl-8 gap-2">
        <li>
          <span classname="font-bold">databases:</span> your services and
          applications will generate data as they are used, don&apos;t just
          think use tables you think are useful, bring everything even if you
          don&apos;t need all of it at first. also revise and update your
          databases to match your needs. if there is something you can track and
          store to follow and experiment or new feature, do it and store it.
        </li>
        <li>
          <span classname="font-bold">api metrics:</span> if your business
          exposes apis to customers or other services, you are likely already
          recording metrics to track issues and performance. these metrics can
          often tell you a lot about how your customers are using your product
          and what they are interested in.
        </li>
        <li>
          <span classname="font-bold">logs:</span> these are commonly used by
          developers to find issues and bugs in services, but they can also be
          used to track user behavior and other patterns in how your services
          are used.
        </li>
        <li>
          <span classname="font-bold">external data providers:</span> find data
          providers that can give you insights into your customers, your market
          or competitors. this can be used to both enrich and benchmark your own
          business as you grow
        </li>
      </ul>
      <p>
        be creative and make sure you are generating the data necessary to make
        the right decisions.
      </p>
      <blogh4>2. etl, elt or whatever you want to call it</blogh4>
      <p>
        you&apos;ve selected your sources and have setup some data integration
        service to pull all of the data into a central location, be it
        snowflake, databricks or excel, but the job is not done. to build trust
        on the completeness of you data, you need to not just cover a wide range
        of data, but without losing any data in the moving process.
      </p>
      <p>
        one way to improve the trust in your data completeness is to run
        periodic checks comparing the source data with the data in you data
        warehouse, making sure there are no discrepancies. there are many ways
        of doing this, examples include: doing a sum of a numeric column and
        comparing it to the source, checking for missing values, checking for
        duplicates, ensuring same number of rows, etc.
      </p>
      <p>
        when you do find any discrepancies, you need to have a process in place
        to notify both those responsible for the data, but also those who are
        using it. building trust on completeness of your data means having open
        lines of communication and transparency in your data with your data
        &quot;customers&quot;.
      </p>
      <blogh3>accuracy</blogh3>
      <p>
        in this section we will measure accuracy of the data you have now
        collected.
      </p>

      <BlogH3>Completeness</BlogH3>
      <p>
        Well this blog post is incomplete so don't pay too much attention here
        yet. Let me know if you'd like to see more.
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
