import { ApplicationInterface } from 'interfaces/application';
import { GetQueryInterface } from 'interfaces';

export interface InterviewInterface {
  id?: string;
  application_id: string;
  interview_date?: any;
  interviewer?: string;
  interview_notes?: string;
  interview_result?: string;
  next_steps?: string;
  created_at?: any;
  updated_at?: any;

  application?: ApplicationInterface;
  _count?: {};
}

export interface InterviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  application_id?: string;
  interviewer?: string;
  interview_notes?: string;
  interview_result?: string;
  next_steps?: string;
}
