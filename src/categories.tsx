export interface Category {
  name: string;
  title: string;
  imageSrc: string;
  active: boolean;
}


const categories: Category[] = [
  {
    name: "systems-integrations",
    title: "Systems Integrations",
    imageSrc: "/img/showcases/systems-integrations.svg",
    active: true
  },
  {
    name: "optimisations",
    title: "Optimisations",
    imageSrc: "/img/showcases/optimisation.svg",
    active: true
  },
  {
    name: "dev-design",
    title: "Development & Design",
    imageSrc: "/img/showcases/dev-design.svg",
    active: false
  },
  {
    name: "devops",
    title: "Devops & Maintainance",
    imageSrc: "/img/showcases/devops.svg",
    active: false
  },
  {
    name: "quality-assurance",
    title: "Quality Assurance",
    imageSrc: "/img/showcases/quality-assurance.svg",
    active: false
  }
];

export default categories;
