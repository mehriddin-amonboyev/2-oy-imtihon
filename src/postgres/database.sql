CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id SMALLINT,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);
INSERT INTO category VALUES
    (1, 'Qushlar'),
    (2, 'Baliqlar'),
    (3, 'Egzotik hayvonlar');


CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2),
    information TEXT,
    image_url VARCHAR(255),
    category_id SMALLINT,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE
);

INSERT INTO product(id,name, price, information, category_id)VALUES 
    (1, 'Ara', '100000', 'Amazonka o`rmonining yovvoyi qushi', 1),
    (2, 'Kakadu', '300000', 'Amazonka o`rmonining yovvoyi qushi', 1),
    (3, 'Tovus', '1000', 'Xonaki qush', 1),
    (4, 'Burgut', '50000', 'Qushlar qiroli', 1);

CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(13) NOT NULL,
    image_url VARCHAR(255),
    all_backlog DECIMAL(10, 2)
);

INSERT INTO customer(id, full_name, email, password, phone, all_backlog) 
    VALUES
    (1, 'Mehriddin Amonboyev', 'mehriddin@gmail.com', '12345', '+998943772959', 0),
    (2, 'Toshmatov Tesha', 'tesha@gmail.com', '12345', '+998943770000', 0),
    (3, 'Aliyev Vali', 'ali@gmail.com', '12345', '+998940001234', 0),
    (4, 'Azamov Ali', 'aza@gmail.com', '12345', '+998943770987', 1000),
    (5, 'Ramazon', 'raza@gmail.com', '12345', '+998943770987', 1000);


CREATE TABLE contracts(
    id SERIAL PRIMARY KEY,
    create_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contract_type SMALLINT,
    total_price DECIMAL(10,2),
    customer_id SMALLINT,

    FOREIGN KEY (customer_id) 
    REFERENCES customer(id) 
    ON DELETE CASCADE
);


INSERT INTO contracts(id, contract_type, total_price, customer_id)   
    VALUES
    (1, 5, 1),
    (2, 10, 2),
    (3, 15, 3),
    (4, 10, 4);


CREATE TABLE contracts_item(
    id SERIAL PRIMARY KEY,
    product_id SMALLINT,
    count SMALLINT,
    price DECIMAL(10,2),
    contract_id SMALLINT,

    FOREIGN KEY(contract_id) 
    REFERENCES contracts(id) 
    ON DELETE CASCADE
    ON UPDATE NO ACTION,

    FOREIGN KEY(product_id) 
    REFERENCES product(id) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

INSERT INTO contracts_item(id, count, price, product_id, contract_id)
    VALUES
    (1, 2, 100000, 1, 1),
    (2, 1, 50000, 4, 1),
    (3, 3, 1000, 3, 1),
    (4, 2, 100000, 1, 2),
    (5, 2, 1000, 3, 2),s
    (6, 2, 300000, 2, 2);


CREATE TABLE payment(
    id SERIAL PRIMARY KEY,
    amount DECIMAL(20, 2),
    amount_due DECIMAL(20, 2),
    create_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    contract_id SMALLINT,
    customer_id SMALLINT,

    FOREIGN KEY(contract_id) 
    REFERENCES contracts(id) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION,

    FOREIGN KEY(customer_id) 
    REFERENCES customer(id) 
    ON DELETE CASCADE 
    ON UPDATE NO ACTION
);

INSERT INTO payment(id, amount, amonunt_due, create_data, contract_id, customer_id)
    VALUES
    (1, )