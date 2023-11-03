import { InterviewInterface } from 'interfaces/interview';
import { UserInterface } from 'interfaces/user';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface ApplicationInterface {
  id?: string;
  user_id: string;
  job_posting_id: string;
  application_date?: any;
  status?: string;
  resume?: string;
  cover_letter?: string;
  created_at?: any;
  updated_at?: any;
  interview?: InterviewInterface[];
  user?: UserInterface;
  job_posting?: JobPostingInterface;
  _count?: {
    interview?: number;
  };
}

export interface ApplicationGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  job_posting_id?: string;
  status?: string;
  resume?: string;
  cover_letter?: string;
}
