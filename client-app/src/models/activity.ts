export interface Activity {
  id?: string;
  title: string;
  category: number;
  description: string;
  due_date: Date;
  category_name?: string;
}