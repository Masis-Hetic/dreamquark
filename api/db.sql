create table organizations
(
    id         serial                  not null
        constraint organizations_pk
            primary key
        constraint organization_pk
            unique,
    name       varchar(25),
    created_at timestamp default now() not null
);

alter table organizations
    owner to masis;

create table users
(
    id              serial                                                                not null
        constraint users_pkey
            primary key,
    name            varchar(25) default nextval(('Anonyme'::character varying)::regclass) not null,
    email           varchar(50)                                                           not null,
    created_date    timestamp   default now()                                             not null,
    organization_id integer
        constraint users_organizations_id_fk
            references organizations
);

alter table users
    owner to masis;

create table teams
(
    id         serial                  not null
        constraint teams_pkey
            primary key,
    name       varchar(25),
    created_at timestamp default now() not null
);

alter table teams
    owner to masis;

create table users_teams
(
    users_id integer not null
        constraint users_teams_users_id_fkey
            references users
            on delete cascade,
    teams_id integer not null
        constraint users_teams_teams_id_fkey
            references teams
            on delete cascade,
    constraint users_teams_pkey
        primary key (users_id, teams_id)
);

alter table users_teams
    owner to masis;

