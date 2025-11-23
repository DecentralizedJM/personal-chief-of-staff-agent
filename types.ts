export interface SystemBlock {
  title: string;
  description: string;
  id: string;
}

export interface PromptDefinition {
  name: string;
  filename: string;
  description: string;
  content: string;
}

export interface WorkflowDefinition {
  name: string;
  filename: string;
  description: string;
  json: object;
}

export interface NotionField {
  name: string;
  type: string;
  options?: string[];
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  PROMPTS = 'PROMPTS',
  WORKFLOWS = 'WORKFLOWS',
  SETUP = 'SETUP',
  SIMULATION = 'SIMULATION'
}
