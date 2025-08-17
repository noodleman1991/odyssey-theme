// tina/config.ts
import { defineConfig } from "tinacms";
var pageCollection = {
  name: "page",
  label: "Pages",
  path: "src/content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return "/";
      }
      return `/${document._sys.filename}`;
    }
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "SEO Description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "lang",
      label: "Language",
      options: ["nl", "en", "ar"],
      required: true
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Content Blocks",
      templates: [
        {
          name: "hero",
          label: "Hero Section",
          fields: [
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "subheading", label: "Subheading" },
            { type: "rich-text", name: "text", label: "Text" },
            { type: "image", name: "image", label: "Hero Image" },
            {
              type: "object",
              name: "cta",
              label: "Call to Action",
              fields: [
                { type: "string", name: "text", label: "Button Text" },
                { type: "string", name: "href", label: "Link" }
              ]
            },
            {
              type: "string",
              name: "layout",
              label: "Layout",
              options: ["text-left", "text-right", "centered", "full-width"]
            }
          ]
        },
        {
          name: "textBlock",
          label: "Text Block",
          fields: [
            { type: "string", name: "heading", label: "Heading" },
            { type: "rich-text", name: "content", label: "Content", isBody: true },
            {
              type: "string",
              name: "alignment",
              label: "Text Alignment",
              options: ["left", "center", "right", "justify"]
            },
            { type: "boolean", name: "narrow", label: "Narrow Container" }
          ]
        },
        {
          name: "textImage",
          label: "Text & Image",
          fields: [
            { type: "string", name: "heading", label: "Heading" },
            { type: "string", name: "subheading", label: "Subheading" },
            { type: "rich-text", name: "text", label: "Text Content" },
            { type: "image", name: "image", label: "Image" },
            { type: "string", name: "imageAlt", label: "Image Alt Text" },
            {
              type: "string",
              name: "layout",
              label: "Layout",
              options: ["image-left", "image-right"]
            },
            { type: "boolean", name: "sticky", label: "Sticky Image on Scroll" }
          ]
        }
      ]
    }
  ]
};
var blogCollection = {
  name: "blog",
  label: "Blog Posts",
  path: "src/content/blog",
  format: "mdx",
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: { component: "textarea" }
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Publish Date",
      required: true
    },
    {
      type: "image",
      name: "featuredImage",
      label: "Featured Image"
    },
    {
      type: "string",
      name: "excerpt",
      label: "Excerpt",
      ui: { component: "textarea" }
    },
    {
      type: "string",
      list: true,
      name: "tags",
      label: "Tags"
    },
    {
      type: "string",
      list: true,
      name: "authors",
      label: "Authors"
    },
    {
      type: "string",
      name: "lang",
      label: "Language",
      options: ["nl", "en", "ar"],
      required: true
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true
    }
  ]
};
var activitiesCollection = {
  name: "activities",
  label: "Activities",
  path: "src/content/activities",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Activity Title",
      required: true
    },
    {
      type: "string",
      name: "type",
      label: "Activity Type",
      options: ["workshop", "lecture", "field-trip", "soup-kitchen", "farm-reads", "other"]
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true
    },
    {
      type: "string",
      name: "location",
      label: "Location"
    },
    {
      type: "string",
      name: "description",
      label: "Short Description",
      ui: { component: "textarea" }
    },
    {
      type: "image",
      name: "image",
      label: "Activity Image"
    },
    {
      type: "boolean",
      name: "upcoming",
      label: "Upcoming Event"
    },
    {
      type: "string",
      name: "lang",
      label: "Language",
      options: ["nl", "en", "ar"],
      required: true
    },
    {
      type: "rich-text",
      name: "body",
      label: "Full Description",
      isBody: true
    }
  ]
};
var config_default = defineConfig({
  // Use environment variables for authentication
  branch: process.env.TINA_BRANCH || "main",
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [pageCollection, blogCollection, activitiesCollection]
  }
});
export {
  config_default as default
};
