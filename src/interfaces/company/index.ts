import { EmployeeInterface } from 'interfaces/employee';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  address?: string;
  industry?: string;
  size?: number;
  founded_year?: any;
  name: string;
  created_at?: any;
  updated_at?: any;
  tenant_id: string;
  employee?: EmployeeInterface[];
  job_posting?: JobPostingInterface[];

  _count?: {
    employee?: number;
    job_posting?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  address?: string;
  industry?: string;
  name?: string;
  tenant_id?: string;
}
