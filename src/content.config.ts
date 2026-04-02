import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/timeline' }),
  schema: z.object({
    dateRange: z.string(),
    role: z.string(),
    company: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    side: z.enum(['left', 'right']),
    isCurrent: z.boolean().default(false),
    image: z.string(),
    caseStudy: z.boolean().default(false),
    order: z.number(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['main', 'secondary', 'hobby']),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    link: z.string().optional(),
    url: z.string().optional(),
    github: z.string().optional(),
    badge: z.string().optional(),
    hashtags: z.array(z.string()).default([]),
    order: z.number(),
  }),
});

const hobbies = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hobbies' }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
  }),
});

export const collections = { timeline, projects, hobbies };
