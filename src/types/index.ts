
export type EmailSender = {
  email: string;
  name: string;
}
  
export type EmailItem = {
  id: string;
  from: EmailSender;
  date: number;
  subject: string;
  short_description: string;
}
  

export type EmailListResponse = {
  list: EmailItem[];
  total: number; 
}


export type EmailBodyResponse = {
  id: string;
  body: string;
}