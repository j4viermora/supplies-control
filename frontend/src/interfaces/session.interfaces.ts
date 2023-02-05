// Generated by https://quicktype.io

export interface ISession {
  user: User;
  company: Company;
}

export interface Company {
  _id: string;
  name: string;
  owner: string;
  status: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  roles: string[];
}
