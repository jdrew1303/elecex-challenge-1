-- Up 
CREATE TABLE sites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);

CREATE TABLE devices (
    id INTEGER PRIMARY KEY,
    siteId INTEGER, 
    name TEXT,
    active BOOLEAN,
    CONSTRAINT device_fk_siteId FOREIGN KEY (siteId)
        REFERENCES sites (id) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO sites
    (name)
VALUES
    ('Site 1'), ('Site 2');

INSERT INTO devices
    (siteId, name, active)
VALUES
    (1, 'Device 1', TRUE),
    (1, 'Device 2', FALSE),
    (2, 'Device 3', TRUE),
    (2, 'Device 4', FALSE);
 
-- Down 
DROP TABLE sites;
DROP TABLE devices;