export interface Task {
  id?: number;
  title: string;
  description?: string;
  complete: boolean;
  dateCreated?: string;
  lastUptated?: string;
  dateDefinitive? : string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  reccurent?:boolean;
  recurentType?:'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  parentTaskId?: number;
  subtasks?: Task[];
}
