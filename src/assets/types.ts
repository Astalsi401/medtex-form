export type Discussion = {
  teamId: string;
  nameZh: string;
  nameEn: string;
  established: string;
  capital: number;
  type: string;
  aum: number;
  fundSize: number;
  investmentFields: string[];
  fundingRounds: string[];
  contact: { nameZh: string; nameEn: string; occupationZh: string; occupationEn: string; tel: string; email: string };
};

export type DiscussionFormValue = Omit<Discussion, "contact" | "teamId"> & {
  contactNameZh: string;
  contactNameEn: string;
  contactOccupationZh: string;
  contactOccupationEn: string;
  contactTel: string;
  contactEmail: string;
};

export type DiscussionOther = {
  type: string;
  investmentFields: string;
};

export type TeamInfo = {
  teamId: string;
  logoUrl: string;
  contact: { name: string; occupation: string; avatarUrl: string };
  established: string;
  fundingAmount: string;
  annualRevenue: string;
  currentFundingRound: string;
  currentFundingAmount: string;
  postMoneyValuation: string;
  project: string;
  region: string;
  company: string;
  mainInvester: string;
  highlights: string[];
  coreTech: string;
  coreTechKeywords: string[];
  targetMarket: string;
  coreProducts: { name: string; type: string; progress: number; countries: string }[];
  milestones: string[];
  error?: string;
};
