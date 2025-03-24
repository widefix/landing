import { ReactNode } from "react";

export enum CategoryName {
  systemsIntegrations = "systems-integrations",
  optimisations = "optimisations",
  devDesign = "dev-design",
  devops = "devops",
  qualityAssurance = "quality-assurance"
}

export enum ResultBoxColor {
  green = "green",
  blue = "blue",
  red = "red",
  orange = "orange",
  lightBlue = "light-blue",
  lightGreen = "light-green",
  darkBlue = "dark-blue"
}

export enum SwiperSlideColor {
  purple = "purple",
  orange = "orange",
  green = "green",
  blue = "blue",
  yellow = "yellow",
  sea = "sea"
}

export interface ResultBox {
  color: ResultBoxColor;
  imageSrc: string;
  message: string;
  number: string;
}

export interface ShowcasePreview {
  companyName: string;
  solution: string;
  results: string;
  wrapperColor: SwiperSlideColor;
  buttonColor: SwiperSlideColor;
  companyImageSrc: string;
  url: string;
}

export interface ShowcaseBody {
  bannerTopTitle: ReactNode;
  bannerTopImageSrc: string;
  bannerTopImageWebpSrc?: string;
  description: string;
  descriptionText: ReactNode;
  detailsTitle: string;
  detailsText: ReactNode;
  detailsImageSrc: string;
  problemText: ReactNode;
  solutionFirstText: ReactNode;
  solutionSecondText: ReactNode;
  resultBoxes: ResultBox[];
  resultText: ReactNode;
  helpTitle: string;
  related?: ShowcasePreview[];
  bannerProblemWebp?: string;
  bannerProblemPng?: string;
  bannerSolutionWebp?: string;
  bannerSolutionPng?: string;
}

export interface Showcase {
  category: CategoryName;
  slug: string;
  preview: ShowcasePreview;
  body: ShowcaseBody;
  metadata: {
    title: string;
    description: string;
  }
}
