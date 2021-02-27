create table contatos (
    id serial primary key,
    nome varchar(120) not null,
    contato varchar(12) not null unique
);