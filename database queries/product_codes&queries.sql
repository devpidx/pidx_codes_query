CREATE TABLE product_codes (
	code VARCHAR(6) PRIMARY KEY,
	product_definition VARCHAR(50) NOT NULL,
	description VARCHAR (100),
	cetane_octane VARCHAR (10),
	oxygenated_rbob_type VARCHAR(10),
	oxygenate_percent VARCHAR (10),
	comments_ VARCHAR (100),
	requester VARCHAR (50),
	date_code_assigned VARCHAR (11)
);

CREATE TABLE terminal_countries (
	TERMINAL_ID VARCHAR(20) PRIMARY KEY,
	COUNTRY VARCHAR(30) NOT NULL,
	Submitter VARCHAR (30),
	Terminal_Owner VARCHAR (100),
	Latitude VARCHAR(15),
	Longitude VARCHAR(15)
);

CREATE TABLE terminal_products (
	TERMINAL_ID VARCHAR(20) PRIMARY KEY,
	COUNTRY VARCHAR(30) NOT NULL,
	Submitter VARCHAR (30),
	lat VARCHAR(30),
	long VARCHAR(30),
	B25 VARCHAR(15),
	B29 VARCHAR(15),
	B37 VARCHAR(15),
	D11 VARCHAR(15),
	D2K VARCHAR(15),
	D6N VARCHAR(15),
	D80 VARCHAR(15),
	P18 VARCHAR(15),
	P2R VARCHAR(15),
	P37 VARCHAR(15),
	P42 VARCHAR(15),
	O21 VARCHAR(15),
	O73 VARCHAR(15),
	O8I VARCHAR(15),
	OUB VARCHAR(15)
);

CREATE TABLE product_by_country (
    country VARCHAR(30) NOT NULL,
    b25 numeric,
    b29 numeric,
    b37 numeric,
    d11 numeric,
    d2k numeric,
    d6n numeric,
    d80 numeric,
    p18 numeric,
    p2r numeric,
    p37 numeric,
    p42 numeric,
    o21 numeric,
    o73 numeric,
    o8i numeric,
    oub numeric
);

SELECT * 
FROM product_codes; 

SELECT code
FROM product_codes
WHERE product_definition LIKE '%ethanol%';

SELECT *
FROM product_codes
WHERE oxygenate_percent >=75;
