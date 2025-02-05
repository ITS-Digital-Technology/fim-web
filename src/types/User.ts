export type User = {
  nuId: string;
  firstName: string;
  lastName: string;
  prefix: string;
  email: string;
  displayName: string;
  shortDescription: string;
  academicTitle: string;
  biography: string;
  accomplishments: string;
};

export type Employment = {
  nuId: string;
  employmentType: string;
  academicTitle: string;
  division: string;
  department: string;
  college: string;
  mailDrop: string;
  city: string;
  postalCode: string;
  degrees: string[];
};

export type WorkProfile = {
  nuId: string;
  resumeUrl: string;
  areasOfExpertise: string[];
  trainingAndCertifications: string[];
  links: any;
  articles: any;
  labWebsites: any;
};
