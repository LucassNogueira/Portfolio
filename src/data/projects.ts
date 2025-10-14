import { Project } from '@/types'

export const projects: Project[] = [
  {
    project: 1,
    title: "PogDog",
    img: "/images/1.png",
    creation:
      "PogDog was created in a 10 day sprint during my time at DevMountain coding boot-camp.",
    tech: "Javascript, HTML, CSS, Express, Node.JS, and Axios.",
    hosted: "https://pogdog.herokuapp.com/",
    github: "https://github.com/LucassNogueira/pogdog",
  },
  {
    project: 5,
    title: "FStop",
    img: "/images/fstop.png",
    creation:
      "Built a Formula1 companion app that users are able to register/login and select favorite drivers,tracks,teams, and compare drivers stats.",
    tech: "ReactJS, FirebaseDB, TailwindCSS, Firebase Hosting, Sweetalert2, Axios.",
    hosted: "https://fstop-nextjs.vercel.app/",
    github: "https://github.com/LucassNogueira/Fstop",
  },
  {
    project: 2,
    title: "Beautiful Photos",
    img: "/images/beautifulphotos.png",
    creation:
      "Beautiful photos is a online image gallery of what makes you happy. no descriptions, no like button. Simply a photo that makes you happy.",
    tech: "ReactJS, CSS, FirebaseDB,Framer Motion, Netlify.",
    hosted: "https://happyphotos.netlify.app/",
    github: "https://github.com/LucassNogueira/ReactImageGal",
  },
  {
    project: 3,
    title: "Expense Tracker ",
    img: "/images/expense.png",
    creation:
      "Built a simple intuitive expense tracker to stay on top of your money coming in and out!",
    tech: "ReactJS, CSS, MongoDB, Morgan, Netlify, Express.",
    hosted: "https://expencetrackerln.netlify.app/",
    github: "https://github.com/LucassNogueira/MERNexpenceTracker",
  },
  {
    project: 4,
    title: "E-Commerce Project",
    img: "/images/onlineStore.png",
    creation:
      "This online store was built to further my knowledge on how E-Commerce applications are set up and created.",
    tech: "ReactJS, Commerce.JS, Stripe, Netlify, MaterialUI.",
    hosted: "https://onlinestorefront.netlify.app/",
    github: "https://github.com/LucassNogueira/OnlineStore",
  },
]
