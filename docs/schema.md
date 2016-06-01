# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
email           | string    | not null

## favorites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | text      | not null
author_id   | integer   |
pet_type_id | integer   | not null, foreign key (references pet types)
description | text      | not null
breed       | string    |
sex         | string    |
age         | integer   |
