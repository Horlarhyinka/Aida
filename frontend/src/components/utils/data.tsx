export interface TestimonyCardProps {
  profile_pic: string;
  name: string;
  occupation: string;
  bio: string;
}

export interface FeaturesProp {
  title: string;
  details: string;
  icon: string;
}

export interface Solution {
  title: string;
  details: string;
  defaultImage: string;
  hoverImage: string;
}

export const feature: FeaturesProp[] = [
  {
    title: "Real-Time Emergency Response",
    details: `Aider’s AI instantly analyzes your emergency report and provides critical safety instructions whether you need guidance on administering CPR, handling injuries,
        or managing evacuation protocols. The AI operates based on real-time inputs and official guidelines from trusted medical sources,
        ensuring that users receive accurate and actionable advice.`,
    icon: "src/assets/img/time-fill.png",
  },
  {
    title: "Volunteer Network",
    details: `Qualified medical professionals and trained volunteers nearby to provide on-the-spot or remote assistance.
        When an emergency is reported, Aider notifies volunteers based on their proximity, specialization,
        and availability, ensuring that users get the fastest possible help. `,
    icon: "src/assets/img/team-fill.png",
  },
  {
    title: "AI Assistance",
    details: `Aider’s AI adapts its responses based on the detail of the emergency, considering factors like time of day and weather conditions.
        This enables it to offer guidance that’s not only medically accurate but also practical for the specific situation.`,
    icon: "src/assets/img/AI-fill.png",
  },
  {
    title: "Privacy and Anonymity Options",
    details: `Recognizing the importance of privacy, Aider allows users to report emergencies anonymously. Personal and health information shared with volunteers and AI is encrypted, compliant with data protection laws (GDPR, HIPAA), and stored securely,
        ensuring that your information is protected while you get the help you need.`,
    icon: "src/assets/img/security-fill.png",
  },
  {
    title: "Disaster-Ready Technology",
    details: `During large-scale crises like natural disasters, Aider’s system automatically switches to disaster management mode, coordinating resources effectively and prioritizing cases with the most urgent need.
        The app also scales on-demand to handle surges in emergency reports, ensuring availability in critical situations.`,
    icon: "src/assets/img/cpu-fill.png",
  },
];

export const solutions: Solution[] = [
  {
    title: "Real-Time Emergency  Dispatch",
    details:
      "Receive immediate alerts about nearby emergencies and respond quickly.",
    defaultImage: "src/assets/svg/dna.svg",
    hoverImage: "src/assets/svg/dna-hover.svg",
  },
  {
    title: "Medical Guidance",
    details:
      "Follow step-by-step first aid instructions to provide crucial assistance.",
    defaultImage: "src/assets/svg/shield.svg",
    hoverImage: "src/assets/svg/shield-hover.svg",
  },
  {
    title: "Volunteer Management",
    details:
      "Set your availability and skills so the app only notifies you when you’re able to help.",
    defaultImage: "src/assets/svg/medicine.svg",
    hoverImage: "src/assets/svg/medicine-hover.svg",
  },
  {
    title: "Tracking & Reporting",
    details:
      "Track emergency response times and outcomes to improve interventions.",
    defaultImage: "src/assets/img/tracking.png",
    hoverImage: "src/assets/img/tracking-hover.png",
  },
  {
    title: "Secure Communication",
    details:
      "Direct and encrypted communication between volunteers and reporters.",
    defaultImage: "src/assets/img/message.png",
    hoverImage: "src/assets/img/message-hover.png",
  },
  {
    title: "Emergency Training Resources",
    details:
      "Access up-to-date training materials and certifications to stay ready for emergencies",
    defaultImage: "src/assets/img/learning.png",
    hoverImage: "src/assets/img/learning-hover.png",
  },
];

export const testimonies: TestimonyCardProps[] = [
  {
    name: "Dr Derrick L.",
    occupation: "Certified EMT and Aider Responder",
    profile_pic: "src/assets/img/derrick.png",
    bio: `Aider has made it easy for trained responders like me to reach those in need efficiently.
          Knowing that the AI ensures every detail is accurate gives me confidence to jump into action, especially in high-stakes situations.`,
  },
  {
    name: "Rebecca S.",
    occupation: "Volunteer Paramedic",
    profile_pic: "src/assets/img/rebecca.png",
    bio: `I’ve been a paramedic for over five years, but Aider allows me to provide help even when I’m off-duty.
         It’s fulfilling to know that I can be reached quickly and contribute to someone’s safety with just a few taps on my phone.`,
  },
  {
    name: "Anonymous User",
    occupation: "Baston Resident",
    profile_pic: "src/assets/img/anonymous.png",
    bio: `When I witnessed an accident, I used Aider to report it anonymously, which made it easier for me to act fast.
    A responder was dispatched right away, and the app’s directions gave me confidence that I was doing the right thing.`,
  },
  {
    name: "Sofia John",
    occupation: "Community Health Worker",
    profile_pic: "src/assets/img/sofia.png",
    bio: `Being part of Aider has been an amazing experience.
    The AI handles critical information, so I can focus on providing the right care.
    It’s incredible to work with such a responsive system, and it makes volunteering more impactful.`,
  },
  {
    name: "Jamie Lewis",
    occupation: "Student in Chicago",
    profile_pic: "src/assets/img/james.png",
    bio: `Aider has completely transformed how I think about emergencies.
    Having quick access to both real-time AI guidance and trained volunteers nearby gave me peace of mind in a life-threatening situation. I’d recommend it to anyone`,
  },
  {
    name: "Chris Black",
    occupation: "Smal Business Owner in NYC",
    profile_pic: "src/assets/img/chris.png",
    bio: `Aider was there when I needed help with my mother’s asthma attack. The instructions were clear and effective, and a volunteer arrived soon after.
    It was comforting to have immediate guidance in such a scary moment.`,
  }
];
