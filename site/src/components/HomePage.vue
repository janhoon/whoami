<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BlogPreview from "./BlogPreview.vue";
import ProjectShowcase from "./ProjectShowcase.vue";
import SocialLinks from "./SocialLinks.vue";

type BlogPost = {
  id: string;
  title: string;
  date: string;
  description?: string;
};

defineProps<{
  posts: BlogPost[];
}>();

const skillCategories = [
  {
    name: "Platform and Infrastructure",
    icon: "lucide:server",
    skills: [
      { name: "Kubernetes", icon: "simple-icons:kubernetes" },
      { name: "Docker", icon: "simple-icons:docker" },
      { name: "Terraform", icon: "simple-icons:terraform" },
      { name: "AWS", icon: "simple-icons:amazonwebservices" },
      { name: "Azure", icon: "mdi:microsoft-azure" },
      { name: "GCP", icon: "simple-icons:googlecloud" },
    ],
  },
  {
    name: "Data Engineering",
    icon: "lucide:database",
    skills: [
      { name: "Databricks", icon: "simple-icons:databricks" },
      { name: "Snowflake", icon: "simple-icons:snowflake" },
      { name: "Grafana", icon: "simple-icons:grafana" },
    ],
  },
  {
    name: "Languages and Frameworks",
    icon: "lucide:code",
    skills: [
      { name: "Go", icon: "simple-icons:go" },
      { name: "Python", icon: "simple-icons:python" },
      { name: "TypeScript", icon: "simple-icons:typescript" },
      { name: "React", icon: "simple-icons:react" },
    ],
  },
];
</script>

<template>
  <main id="main-content" class="page-shell py-6 md:py-10">
    <header class="section-card p-5 md:p-8 lg:p-10">
      <div class="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div class="space-y-4">
          <span class="kicker">Data and Platform Engineer</span>
          <h1
            class="display-heading text-5xl sm:text-6xl leading-[0.95] text-slate-900"
          >
            Jan Hoon
          </h1>
          <p class="text-lg leading-relaxed text-slate-700 max-w-2xl">
            I help teams build reliable data products, modern platform
            foundations, and practical systems that move from concept to
            measurable business value.
          </p>

          <nav aria-label="Homepage sections" class="flex flex-wrap gap-2 pt-2">
            <a href="#about" class="chip focus-ring">About</a>
            <a href="#skills" class="chip focus-ring">Skills</a>
            <a href="#projects" class="chip focus-ring">Projects</a>
            <a href="#writing" class="chip focus-ring">Writing</a>
            <a href="#agent-brief" class="chip focus-ring">Agent Brief</a>
          </nav>
        </div>

        <div class="space-y-4">
          <img
            src="/images/pfp.jpg"
            alt="Profile photo of Jan Hoon"
            width="240"
            height="240"
            class="h-28 w-28 rounded-3xl border border-white/80 object-cover shadow-lg"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />

          <dl class="grid grid-cols-2 gap-2 text-sm">
            <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
              <dt class="text-slate-500">Base</dt>
              <dd class="font-semibold text-slate-900">Europe</dd>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
              <dt class="text-slate-500">Focus</dt>
              <dd class="font-semibold text-slate-900">Data Platforms</dd>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
              <dt class="text-slate-500">Current role</dt>
              <dd class="font-semibold text-slate-900">Engineer</dd>
            </div>
            <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
              <dt class="text-slate-500">Writes about</dt>
              <dd class="font-semibold text-slate-900">Data Teams</dd>
            </div>
          </dl>

          <SocialLinks />
        </div>
      </div>
    </header>

    <div class="grid gap-6 mt-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section id="about" class="section-card p-5 md:p-8">
        <p class="kicker mb-4">About</p>
        <h2 class="display-heading text-3xl text-slate-900 mb-3">
          Building data product systems teams can trust
        </h2>
        <p class="text-slate-700 leading-relaxed">
          I work at the intersection of engineering, analytics, and platform
          design. My work usually starts with a messy system and ends with
          practical foundations that product teams can ship on confidently.
        </p>
        <ul class="mt-6 space-y-3 text-slate-700">
          <li class="flex gap-3">
            <Icon
              icon="lucide:check-circle-2"
              class="w-5 h-5 mt-0.5 text-teal-700 shrink-0"
              aria-hidden="true"
            />
            Design data platforms that are observable, dependable, and easy to
            operate.
          </li>
          <li class="flex gap-3">
            <Icon
              icon="lucide:check-circle-2"
              class="w-5 h-5 mt-0.5 text-teal-700 shrink-0"
              aria-hidden="true"
            />
            Support product and business teams with clear data contracts and
            healthy pipelines.
          </li>
          <li class="flex gap-3">
            <Icon
              icon="lucide:check-circle-2"
              class="w-5 h-5 mt-0.5 text-teal-700 shrink-0"
              aria-hidden="true"
            />
            Translate technical decisions into outcomes that non-engineers can
            measure.
          </li>
        </ul>
      </section>

      <section id="agent-brief" class="section-card p-5 md:p-8">
        <p class="kicker mb-4">For agents</p>
        <h2 class="display-heading text-3xl text-slate-900 mb-3">
          Machine-readable brief
        </h2>
        <p class="text-slate-700 leading-relaxed">
          This section is intentionally direct so indexing and LLM-style
          crawlers can extract context quickly.
        </p>
        <dl class="mt-5 grid gap-3 text-sm">
          <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
            <dt class="text-slate-500">Name</dt>
            <dd class="font-semibold text-slate-900">Jan Hoon</dd>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
            <dt class="text-slate-500">Primary role</dt>
            <dd class="font-semibold text-slate-900">
              Data and Platform Engineer
            </dd>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
            <dt class="text-slate-500">Topics</dt>
            <dd class="font-semibold text-slate-900">
              Data platforms, observability, data product strategy
            </dd>
          </div>
          <div class="rounded-xl border border-slate-200 bg-white/80 p-3">
            <dt class="text-slate-500">Canonical domain</dt>
            <dd class="font-semibold text-slate-900">janhoon.com</dd>
          </div>
        </dl>
        <a
          href="/llms.txt"
          class="link-underline inline-flex mt-4 text-sm text-slate-700 font-semibold focus-ring rounded-md"
        >
          View llms.txt
        </a>
      </section>
    </div>

    <section id="skills" class="section-card deferred-section p-5 md:p-8 mt-6">
      <p class="kicker mb-4">Capability map</p>
      <h2 class="display-heading text-3xl text-slate-900 mb-6">
        Tools and systems I work with
      </h2>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        <article
          v-for="category in skillCategories"
          :key="category.name"
          class="rounded-2xl border border-slate-200 bg-white/80 p-4"
        >
          <h3
            class="font-semibold text-slate-900 flex items-center gap-2 text-lg"
          >
            <Icon
              :icon="category.icon"
              class="w-5 h-5 text-teal-700"
              aria-hidden="true"
            />
            {{ category.name }}
          </h3>
          <div class="flex flex-wrap gap-2 mt-4">
            <span
              v-for="skill in category.skills"
              :key="skill.name"
              class="chip"
            >
              <Icon
                :icon="skill.icon"
                class="w-4 h-4 text-teal-700"
                aria-hidden="true"
              />
              <span class="font-mono text-[0.74rem] tracking-wide">{{
                skill.name
              }}</span>
            </span>
          </div>
        </article>
      </div>
    </section>

    <section
      id="projects"
      class="section-card deferred-section p-5 md:p-8 mt-6"
    >
      <p class="kicker mb-4">Selected work</p>
      <ProjectShowcase />
    </section>

    <section id="writing" class="section-card deferred-section p-5 md:p-8 mt-6">
      <div class="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div>
          <p class="kicker mb-4">Writing</p>
          <h2 class="display-heading text-3xl text-slate-900">
            Notes from platform and data work
          </h2>
        </div>
        <a
          href="/blog"
          class="link-underline text-slate-700 font-semibold focus-ring rounded-md"
        >
          Explore full blog archive
        </a>
      </div>
      <BlogPreview :posts="posts" :limit="3" />
    </section>
  </main>
</template>
