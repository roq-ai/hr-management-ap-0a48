import { ApplicationInterface } from 'interfaces/application';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface JobPostingInterface {
  id?: string;
  company_id: string;
  title?: string;
  description?: string;
  requirements?: string;
  salary_range?: string;
  posted_date?: any;
  closing_date?: any;
  created_at?: any;
  updated_at?: any;
  application?: ApplicationInterface[];
  company?: CompanyInterface;
  _count?: {
    application?: number;
  };
}

export interface JobPostingGetQueryInterface extends GetQueryInterface {
  id?: string;
  company_id?: string;
  title?: string;
  description?: string;
  requirements?: string;
  salary_range?: string;
}
