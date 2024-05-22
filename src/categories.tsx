export enum CategoryName {
  systemsIntegrations = "systems-integrations",
  optimisations = "optimisations",
  devDesign = "dev-design",
  devops = "devops",
  qualityAssurance = "quality-assurance"
}

export interface Category {
  name: CategoryName;
  title: string;
  imageSrc: string;
  active: boolean;
}

const categories: Category[] = [
  {
    name: CategoryName.systemsIntegrations,
    title: "Systems Integrations",
    imageSrc: "/img/showcases/systems-integrations.svg",
    active: true
  },
  {
    name: CategoryName.optimisations,
    title: "Optimisations",
    imageSrc: "/img/showcases/optimisation.svg",
    active: true
  },
  {
    name: CategoryName.devDesign,
    title: "Development & Design",
    imageSrc: "/img/showcases/dev-design.svg",
    active: false
  },
  {
    name: CategoryName.devops,
    title: "Devops & Maintainance",
    imageSrc: "/img/showcases/devops.svg",
    active: false
  },
  {
    name: CategoryName.qualityAssurance,
    title: "Quality Assurance",
    imageSrc: "/img/showcases/quality-assurance.svg",
    active: false
  }
];

export default categories;
