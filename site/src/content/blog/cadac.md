---
title: "CADAC: A guide to building data-driven products and teams as a data person"
date: "2025-09-01"
author:
  name: "Jan Hoon"
  url: "https://janhoon.com"
description: "Exploring what it takes to build data-driven products and teams using CADAC."
---

So, you've been reading about data quality, data governance, data mesh, and
data fabric, and not quite sure where to start when working with data at your
company. These concepts contain guidelines or principles that can help you reach
a goal. In a previous team, we found that although these principles share some
common themes, they do not provide a lot of direction. So, we decided to distill
them into something more measurable and actionable.

We held a workshop with some friendly competition to see who could come up with
the best proposal for how we could continue to expand and improve on our data platform.
As part of this workshop, we sat down and got to thinking, _what does improving
actually mean_?

Throughout this blog post, we'll be interactively exploring what it takes to build
data-driven products and teams using CADAC, a way of ensuring focus is directed
in the right areas when building your data products or teams.

## CADAC

Any data frameworks and/or concepts mean nothing if the business doesn't have confidence
and trust in the data provided. We'll get into how ownership and data quality discussion
a bit deeper later on, but for now we just need to focus on direction. So, the first
letter of our acronym was defined: **Complete**.

## Complete

By completeness in data, we implied that we cannot build trust and confidence on
weak foundations. This foundation is what we build our businesses and products
on, and should be reliable and broad. If your data is not complete or lacking
any information, you're not going to be able to build the trust and confidence
you need to achieve "data-drivenness," "data mesh," or whatever you are aiming for.

So, how do we ensure completeness? Here are my two key areas/sources for getting
data:

### 1. Business and Application Data

This should be the starting point. Insights and value will not necessarily only come
from the places you expect to find them. Thus, you should always keep an eye on
your own data, both reviewing the data you already have as well as finding new
sources to grow your foundation. But what do I mean by business and application
data? Let's go through some examples:

- **Databases and Data Stores**: Your services and applications will generate
  data as they are used. Don't just use the tables you think are
  useful-bring everything, even if you don't need all of it at first. Also
  revise and update your databases to match your needs. If there is something
  you can track and store to follow an experiment or new feature, do it and store
  it.
- **App Metrics**: If your business exposes APIs to customers or other services,
  you are likely already recording metrics to track issues and performance. These
  metrics can often tell you a lot about how your customers are using your product
  and what they are interested in.
- **Logs**: These are commonly used by developers to find issues and bugs in
  services, but they can also be used to track user behavior and other patterns in
  how your services are used.
- **External Data Providers**: Find data providers that can give you insights into
  your customers, your market, or competitors. This can be used to both enrich and
  benchmark your own business as you grow.

Be creative and make sure you are generating the data necessary to make the right
decisions.

### 2. ELT, ETL Or Whatever You Want To Call It

You've selected your sources and have set up some data integration service to
pull all of the data into a central location-be it Snowflake, Databricks, or
Excel-but the job is not done. To build trust in the completeness of your
data, you need to not just cover a wide range of data, but be able to ensure how
complete the datasets are.

One way to improve the trust in your data completeness is to run periodic checks
comparing the source data with the data in your data warehouse, making sure
there are no discrepancies. There are many ways of doing this. Examples include:
doing a sum of a numeric column and comparing it to the source, checking for
missing values, checking for duplicates, ensuring the same number of rows, etc.

When you do find any discrepancies, you need to have a process in place to
notify both those responsible for the data and those who are using it. Building
trust in the completeness of your data means having open lines of communication
and transparency with your "data customers."

## Accurate

## Discoverable

## Actionable

## Compliant
