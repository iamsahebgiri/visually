const shared = {
  name: "Visually",
  repo: "https://github.com/iamsahebgiri/visually",
  editUrl: "https://github.com/iamsahebgiri/visually/edit/main/data/",
  website: "https://go-visually.vercel.app",
  title: "Visually - Algorithm made easy",
  description: "A tool to understand data structures and algorithms.",
  image: "https://go-visually.vercel.app/static/images/banner.png",
};

const siteConfig = {
  name: shared.name,
  image: shared.image,
  type: "website",
  title: shared.title,
  titleTemplate: "%s - Visually",
  description: shared.description,
  siteUrl: shared.website,
  profiles: {
    github: "https://github.com/iamsahebgiri",
    twitter: "https://twitter.com/iamsahebgiri",
    linkedin: "https://linkedin.com/in/iamsahebgiri",
    email: "mailto:iamsahebgiri@gmail.com",
  },
  repo: {
    url: shared.repo,
    editUrl: shared.editUrl,
  },
  twitter: {
    handle: "@iamsahebgiri",
    site: "@iamsahebgiri",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: shared.website,
    title: shared.title,
    site_name: shared.name,
    description: shared.description,
    images: [
      {
        url: "https://go-visually.vercel.app/static/images/banner.png",
        width: 1200,
        height: 630,
        alt: "Visually - A tool to understand data structures and algorithms.",
      },
    ],
  },
};

export default siteConfig;
