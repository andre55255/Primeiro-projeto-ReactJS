create database crud_tasks;

create table users(
    id serial primary key not null,
    name varchar(250) not null,
    email varchar(250) not null unique,
    password varchar(250) not null
);

create table tasks(
    id serial primary key not null,
    description varchar(800) not null,
    id_user integer not null,
    foreign key(id_user) references users(id)
);