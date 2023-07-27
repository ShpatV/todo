CREATE DATABASE Postgres;

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category INTEGER REFERENCES categories(id),
  description TEXT NOT NULL,
  due_date DATE
);


CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category INTEGER REFERENCES categories(id),
  description TEXT NOT NULL,
  due_date DATE
);

create or replace function validate_due_date()
returns trigger as $$
begin 
	 if new.due_date < Current_date then 
	 raise exception 'Data e percaktuar eshte ne te kaluaren';
	end if;
	RETURN  NEW;
end;
$$ language plpgsql;

create trigger check_due_date
before insert or update on tasks 
for each row 
execute function validate_due_date();

select * from tasks
select * from categories c 
insert into categories (name)
Values('Devops');
