export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai-saas' | 'telegram-bots' | 'corporate' | 'ecommerce' | 'games-bots-apps';
  categoryLabel: string;
  badge: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  features: string[];
  challenges: string[];
  businessResult: string[];
  techStack: { name: string; category: string }[];
  liveUrl?: string;
  githubUrl?: string;
  accentColor: 'cyan' | 'emerald' | 'amber' | 'violet' | 'orange';
  interactiveType?: 'lumina-interactive' | 'doner-customizer' | 'nexora-lead-scoring' | 'nakaio-doc-generator' | 'law-calculator' | 'twogis-lead-scraper' | 'sushi-cart' | 'foodrush-game' | 'psn-manager-demo' | 'vk-promoter-demo';
}

export interface ServiceCategory {
  id: string;
  title: string;
  iconName: string;
  description: string;
  items: string[];
  badge?: string;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: { name: string; level: string; description: string; icon?: string }[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface StrongPoint {
  title: string;
  desc: string;
  iconName: string;
}
