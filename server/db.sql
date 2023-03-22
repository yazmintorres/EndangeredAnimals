CREATE TYPE code AS ENUM ('EX','EW','CR','EN','VU','NT','CD','LC','DD','NE', 'CE');

CREATE TABLE species (
    species_id SERIAL PRIMARY KEY, 
    common_name TEXT NOT NULL, 
    scientific_name TEXT NOT NULL, 
    population SMALLINT NOT NULL CHECK (population > 0),
    conservation_status CODE NOT NULL, 
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Leopard, indian', 'Panthera pardus', '500', 'CE', '1/21/2022');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Vine snake (unidentified)', 'Oxybelis sp.', '985', 'CE', '2/15/2022');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('European badger', 'Meles meles', '489', 'CE', '10/27/2021');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Baboon, yellow', 'Papio cynocephalus', '85', 'CE', '10/14/2021');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Black curlew', 'Haematopus ater', '530', 'CE', '2/1/2022');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Brazilian otter', 'Pteronura brasiliensis', '09', 'CE', '3/29/2022');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Ring-necked pheasant', 'Phasianus colchicus', '2529', 'CE', '5/29/2021');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('American beaver', 'Castor canadensis', '257', 'CE', '7/21/2021');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('European badger', 'Meles meles', '9', 'CE', '8/13/2021');
insert into species (common_name, scientific_name, population, conservation_status, created_on) values ('Scaly-breasted lorikeet', 'Trichoglossus chlorolepidotus', '919', 'CE', '5/15/2021');

CREATE TABLE individuals (
    individual_id SERIAL PRIMARY KEY, 
    nick_name TEXT, 
    species_id INTEGER, 
    seen_on TIMESTAMPTZ,
    CONSTRAINT fk_species
        FOREIGN KEY (species_id)
            REFERENCES species (species_id)
);

insert into individuals (nick_name, seen_on, species_id) values ('Anny', '1/1/2022', 1);
insert into individuals (nick_name, seen_on, species_id) values ('Gabriell', '10/15/2021', 2);
insert into individuals (nick_name, seen_on, species_id) values ('Nani', '7/2/2021', 1);
insert into individuals (nick_name, seen_on, species_id) values ('Leonanie', '7/11/2021', 2);
insert into individuals (nick_name, seen_on, species_id) values ('Duffie', '4/25/2021', 3);
insert into individuals (nick_name, seen_on, species_id) values ('Marshall', '6/29/2021', 3);
insert into individuals (nick_name, seen_on, species_id) values ('Sophia', '6/1/2021', 4);
insert into individuals (nick_name, seen_on, species_id) values ('Angie', '4/30/2021', 4);
insert into individuals (nick_name, seen_on, species_id) values ('Lion', '12/28/2021', 4);
insert into individuals (nick_name, seen_on, species_id) values ('Robinette', '7/16/2021', 5);
insert into individuals (nick_name, seen_on, species_id) values ('Lindi', '10/3/2021', 6);
insert into individuals (nick_name, seen_on, species_id) values ('Duffy', '8/4/2021', 6);
insert into individuals (nick_name, seen_on, species_id) values ('Ax', '6/13/2021', 7);
insert into individuals (nick_name, seen_on, species_id) values ('Kelly', '6/28/2021', 7);
insert into individuals (nick_name, seen_on, species_id) values ('Ulrika', '4/1/2022', 8);
insert into individuals (nick_name, seen_on, species_id) values ('Helyn', '5/6/2021', 8);
insert into individuals (nick_name, seen_on, species_id) values ('Keefer', '5/14/2021', 9);
insert into individuals (nick_name, seen_on, species_id) values ('Johan', '8/16/2021', 9);
insert into individuals (nick_name, seen_on, species_id) values ('Casey', '2/10/2022', 10);
insert into individuals (nick_name, seen_on, species_id) values ('Udall', '3/8/2022', 10);


CREATE TABLE sightings (
    sighting_id SERIAL PRIMARY KEY, 
    date_time TIMESTAMPTZ,
    individual_id INTEGER, 
    location TEXT NOT NULL, 
    healthy BOOLEAN NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    created_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_individual 
        FOREIGN KEY (individual_id)
            REFERENCES individuals (individual_id)
);

insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('6/25/2021', 'Westport', true, 1, '6/14/2021', 'hfeldmus0@cdbaby.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('3/30/2022', 'Express', true, 2, '4/15/2022', 'cupstone1@telegraph.co.uk');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('8/17/2021', 'Homewood', false, 3, '6/12/2021', 'fspreckley2@elegantthemes.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('10/31/2021', 'Waywood', true, 4, '4/26/2021', 'dcarlucci3@tiny.cc');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('10/19/2021', 'Duke', false, 5, '1/10/2022', 'jstracey4@blog.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('4/6/2022', 'Amoth', false, 6, '2/22/2022', 'jbelding5@ow.ly');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('10/26/2021', 'Porter', false, 7, '10/3/2021', 'agerritsma6@desdev.cn');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('6/27/2021', 'Brentwood', false, 8, '4/4/2022', 'kboness7@gmpg.org');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('4/5/2022', 'Hayes', true, 9, '12/27/2021', 'tlarver8@comsenz.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('9/10/2021', 'Lighthouse Bay', true, 10, '8/31/2021', 'lmacmichael9@free.fr');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('9/23/2021', 'Mariners Cove', false, 11, '4/27/2021', 'smeneoa@studiopress.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('5/23/2021', 'Huxley', false, 12, '3/28/2022', 'mcursonb@jimdo.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('6/6/2021', 'Mayer', false, 13, '12/31/2021', 'bedgertonc@wikipedia.org');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('5/26/2021', 'Portage', false, 14, '7/15/2021', 'spersenced@ezinearticles.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('12/15/2021', 'Vahlen', true, 15, '8/18/2021', 'mladewige@ameblo.jp');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('2/14/2022', 'School', false, 16, '5/2/2021', 'bhannef@samsung.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('2/21/2022', 'Goodland', true, 17, '9/8/2021', 'smaccrossong@themeforest.net');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('2/2/2022', 'Spenser', false, 18, '4/12/2022', 'plansdowneh@webs.com');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('10/21/2021', 'Hoepker', true, 19, '6/4/2021', 'nwillmetti@fda.gov');
insert into sightings (date_time, location, healthy, individual_id, created_on, email) values ('3/5/2022', 'Sunnyside', false, 20, '2/28/2022', 'fgarbuttj@mediafire.com');