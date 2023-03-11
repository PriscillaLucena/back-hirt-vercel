-- SQLBook: Code
-- Active: 1673741533992@@35.226.146.116@3306@Hopper-4314151-priscilla-ramos
INSERT INTO nome_obra (id, qty_andares, qty_total_ap)
VALUES ("12EIE12", 2, 3);

INSERT INTO apartamentos (id, numero_ap, andar, limpeza_completa, data, foto)
VALUES ("34eiei12", 101, 1, false, 2023/01/12, ""),
("54IEIE23", 102, 1, true, 2023/01/12, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9kQZpCulhigSwNVjT8hzhKrt-gN0IpR-km2TxGEHlQ&s"),
("78ioio89", 203, 2, false, 2023/01/12, "");

-- CREATE TABLE IF NOT EXISTS Novas_obras( 
-- id VARCHAR(255) PRIMARY KEY NOT NULL,
--   nome_obra varchar(255) NOT NULL,
--   qty_andar integer NOT NULL,
--   qty_ap_andares integer NOT NULL,
--   qty_total_ap integer NOT NULL,
--   responsavel varchar(255) NOT NULL
--   );

-- drop table apartamentos;
-- alter table Novas_obras modify nome_obra varchar(255) NOT NULL

-- CREATE TABLE IF NOT EXISTS apartamentos(
-- id VARCHAR(255) PRIMARY KEY NOT NULL,
-- numero_ap VARCHAR(255) NOT NULL,
-- andar integer NOT NULL,
-- limpeza_completa integer NOT NULL,
-- data VARCHAR(255) NOT NULL,
-- foto varchar(255) NOT NULL,
-- obra_id varchar(255) NOT NULL,
-- FOREIGN KEY (obra_id) REFERENCES Novas_obras(id) ON DELETE CASCADE,
-- user_id VARCHAR(255) NOT NULL,
-- FOREIGN KEY (user_id) REFERENCES Login_Hirt_Admin(id) ON DELETE CASCADE,
-- nome_obra varchar(255) NOT NULL
-- FOREIGN KEY (nome_obra) REFERENCES Novas_obras(nome_obra) ON DELETE CASCADE,
-- );

-- CREATE TABLE IF NOT EXISTS Login_Hirt_Admin(
-- id VARCHAR(255) PRIMARY KEY NOT NULL,
-- nome VARCHAR(255) NOT NULL,
-- email VARCHAR(255) NOT NULL,
-- senha VARCHAR(255) NOT NULL,
-- tipo_acesso VARCHAR(255) NOT NULL
-- );

-- create table IF NOT EXISTS Fotos (
-- id VARCHAR(255) PRIMARY KEY,
-- foto VARCHAR(255) NOT NULL,
-- limpeza integer NOT NULL,
-- user_id VARCHAR(255) NOT NULL,
-- FOREIGN KEY (user_id) REFERENCES Login_Hirt_Admin(id) ON DELETE CASCADE,
-- ap_id VARCHAR(255) NOT NULL,
-- FOREIGN KEY (ap_id) REFERENCES apartamentos(id) ON DELETE CASCADE
-- );

-- INSERT INTO Novas_obras (id, nome_obra, qty_andar, qty_ap_andares, qty_total_ap, responsavel)
-- VALUES ('420ca55d-20ad-4cdc-b732-d7fd642595df', 'Ed. Raimunda', 7, 2, 14, 'Raimundo Nonato'),
-- ('d5a4b55e-51e6-49e6-a257-68e48f371834', 'Ed. Ricardo II', 3, 4, 12, 'Ricardo'),
-- ('f78bdc48-029b-492b-afa1-1d41b64566f1', 'Ed. Dona Dilza', 2, 6, 12, 'Gilberto');

-- insert into Login_Hirt_Admin (id, nome, email, senha, tipo_acesso)
-- values ('01a61102-a439-4bd9-8a4c-80c4b3da5586', 'Genilda4', 'genilda4@hirt.com', '$2a$12$zUgg1c38N.x8t.B53HCbieDLqk.ZH4dLR35tIlsRgkOzb/yveylza', 'collab'),
-- ('de972e50-e450-4e48-9487-dcdbea5906c4', 'Priscilla', 'pri@hirt.com', '$2a$12$.OLxllaWqKgYETZ6xDEGee7XqD4BZL22jAIszmmMIu2miLw.r/MDK', 'admin'); 

-- insert into apartamentos (id, numero_ap, andar, limpeza_completa, data, foto, obra_id, user_id, nome_obra)
-- values ('0r23143rwer45', 5, 55, 1, '2023/02/01', 'https://www.hausbau.com.br/wp-content/uploads/2022/05/decoracao-minimalista-apartamento.jpg', 'f78bdc48-029b-492b-afa1-1d41b64566f1', '01a61102-a439-4bd9-8a4c-80c4b3da5586', 'Ed. Dona Dilza'),
-- ('abcdv8f371834', 7, 701, 2, '2023/02/01', 'https://s2.glbimg.com/2E3rLK3AEKq5IdaSWEhGcuncc9M=/smart/e.glbimg.com/og/ed/f/original/2021/08/04/apartamento-47-m-decoracao-pratica_9.jpg', 'd5a4b55e-51e6-49e6-a257-68e48f371834', '01a61102-a439-4bd9-8a4c-80c4b3da5586', 'Ed. Ricardo II' ),
-- ('120asdfnaiwe8', 88, 81, 3, '2023/02/01', 'https://images.adsttc.com/media/images/6374/e5f6/bd52/ae40/da37/3477/newsletter/apartamento-pepyra-estudio-bra_1.jpg?1668605462' ,'420ca55d-20ad-4cdc-b732-d7fd642595df', '01a61102-a439-4bd9-8a4c-80c4b3da5586', 'Ed. Raimunda');
