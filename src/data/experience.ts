import { Experience } from '@/types'

export const experiences: Experience[] = [
  {
    title: "Frontend Leaning Full Stack Engineer",
    company: "Veryable",
    period: "April 2022 - Present",
    description: [
      "Architected and led migration of core business logic (time, pricing, scheduling) to TypeScript and date-fns, establishing single source of truth for all payouts",
      "Drove end-to-end feature delivery from PRD to production, aligning React/Next.js frontends, TypeScript BFFs, and event-driven microservices",
      "Spearheaded modernization of high-friction operational workflows (bulk Op posting, shift management) into reliable, scalable React components",
      "Built end-to-end attendance and pay automation (NOVA) unifying check-in/out codes, geofencing, NoahFace kiosks, and automatic hour calculation",
      "Implemented payment policies and resolution flows that cut dispute volume and handling time in half",
      "Designed clear, single day scheduling view (WFM ShiftWorks) that became operational source of truth for supervisors"
    ]
  },
  {
    title: "Owner Operator",
    company: "Café Sicilia / Panchos Mexican Buffet Restaurants",
    period: "August 2014 - December 2021",
    description: [
      "Opened two new locations that reached profitability ~50% faster than prior launches",
      "Increased dine-in sales by ~15% via menu redesign and targeted promotions",
      "Revamped take-out strategy with family/date-night packages that outperformed prior years during pandemic",
      "Directed cross-functional teams and marketing campaigns, improving catering sales and overall brand presence"
    ]
  }
]
